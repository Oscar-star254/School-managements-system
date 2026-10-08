import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import { z } from 'zod'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
const app = express()
const secret = process.env.JWT_SECRET ?? 'development-secret'
app.use(helmet())
app.use(cors({ origin: process.env.APP_URL ?? 'http://localhost:5173', credentials: true }))
app.use(express.json({ limit: '2mb' }))
app.use('/api/auth', rateLimit({ windowMs: 60_000, limit: 10 }))

type Claims = { sub: string; businessId: string; role: string }
declare global { namespace Express { interface Request { user?: Claims } } }
const fail = (res: express.Response, status: number, code: string, message: string, details?: unknown) => res.status(status).json({ error: { code, message, details } })
const auth = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    req.user = jwt.verify(req.headers.authorization?.replace('Bearer ', '') ?? '', secret) as Claims
    next()
  } catch { return fail(res, 401, 'UNAUTHORIZED', 'A valid access token is required.') }
}

app.get('/health', (_, res) => res.json({ status: 'ok', service: 'smartpos-api' }))
app.get('/docs', (_, res) => res.json({
  openapi: '3.1.0', info: { title: 'SmartPOS API', version: '1.0.0' },
  paths: {
    '/api/auth/login': { post: { summary: 'Email/password login' } },
    '/api/products': { get: { summary: 'Paginated product list' } },
    '/api/sales': { get: { summary: 'Sales history' }, post: { summary: 'Create an idempotent sale' } },
    '/api/dashboard': { get: { summary: 'Dashboard KPIs' } },
  },
}))

app.post('/api/auth/login', async (req, res) => {
  const parsed = z.object({ email: z.email(), password: z.string().min(6) }).safeParse(req.body)
  if (!parsed.success) return fail(res, 422, 'VALIDATION_ERROR', 'Invalid login payload.', parsed.error.flatten())
  const user = await prisma.user.findUnique({ where: { email: parsed.data.email }, include: { role: true } })
  if (!user || !(await bcrypt.compare(parsed.data.password, user.passwordHash))) return fail(res, 401, 'INVALID_CREDENTIALS', 'Email or password is incorrect.')
  const claims = { sub: user.id, businessId: user.businessId, role: user.role.name }
  const accessToken = jwt.sign(claims, secret, { expiresIn: '15m' })
  const refreshToken = jwt.sign({ ...claims, type: 'refresh' }, secret, { expiresIn: '7d' })
  await prisma.auditLog.create({ data: { businessId: user.businessId, userId: user.id, action: 'LOGIN', entity: 'User', entityId: user.id } })
  res.json({ data: { accessToken, refreshToken, user: { id: user.id, name: user.name, role: user.role.name } } })
})

app.get('/api/products', auth, async (req, res) => {
  const page = Math.max(Number(req.query.page ?? 1), 1)
  const limit = Math.min(Number(req.query.limit ?? 50), 100)
  const search = String(req.query.search ?? '')
  const where = { businessId: req.user!.businessId, active: true, ...(search ? { name: { contains: search, mode: 'insensitive' as const } } : {}) }
  const [data, total] = await prisma.$transaction([prisma.product.findMany({ where, skip: (page - 1) * limit, take: limit, include: { stockLevels: true, variants: true } }), prisma.product.count({ where })])
  res.json({ data, meta: { page, limit, total } })
})

const saleSchema = z.object({
  storeId: z.string(), shiftId: z.string(), customerId: z.string().optional(),
  items: z.array(z.object({ productId: z.string(), variantId: z.string().optional(), quantity: z.number().positive(), unitPrice: z.number().nonnegative(), discount: z.number().nonnegative().default(0) })).min(1),
  payments: z.array(z.object({ method: z.enum(['CASH', 'CARD', 'MOBILE', 'GIFT_CARD', 'STORE_CREDIT']), amount: z.number().positive(), reference: z.string().optional() })).min(1),
})

app.post('/api/sales', auth, async (req, res) => {
  const key = req.header('Idempotency-Key')
  if (!key) return fail(res, 400, 'IDEMPOTENCY_KEY_REQUIRED', 'Idempotency-Key header is required.')
  const parsed = saleSchema.safeParse(req.body)
  if (!parsed.success) return fail(res, 422, 'VALIDATION_ERROR', 'Invalid sale payload.', parsed.error.flatten())
  const replay = await prisma.sale.findUnique({ where: { idempotencyKey: key } })
  if (replay) return res.json({ data: replay, meta: { replayed: true } })
  const subtotal = parsed.data.items.reduce((sum, item) => sum + item.unitPrice * item.quantity - item.discount, 0)
  try {
    const data = await prisma.$transaction(async (tx) => {
      const sale = await tx.sale.create({ data: {
        businessId: req.user!.businessId, storeId: parsed.data.storeId, shiftId: parsed.data.shiftId, userId: req.user!.sub,
        customerId: parsed.data.customerId, receiptNumber: `SP-${Date.now()}`, idempotencyKey: key, subtotal, tax: subtotal * .0825, total: subtotal * 1.0825,
        items: { create: parsed.data.items.map((item) => ({ ...item, total: item.unitPrice * item.quantity - item.discount })) },
        payments: { create: parsed.data.payments },
      } })
      for (const item of parsed.data.items) {
        await tx.stockLevel.update({ where: { storeId_productId: { storeId: parsed.data.storeId, productId: item.productId } }, data: { quantity: { decrement: item.quantity } } })
        await tx.stockMovement.create({ data: { storeId: parsed.data.storeId, productId: item.productId, userId: req.user!.sub, type: 'SALE', quantity: -item.quantity, reference: sale.receiptNumber } })
      }
      return sale
    })
    res.status(201).json({ data })
  } catch { return fail(res, 409, 'SALE_FAILED', 'Sale could not be completed. Stock may have changed.') }
})

app.get('/api/sales', auth, async (req, res) => res.json({ data: await prisma.sale.findMany({ where: { businessId: req.user!.businessId }, take: 50, include: { items: true, payments: true }, orderBy: { createdAt: 'desc' } }) }))
app.get('/api/dashboard', auth, async (req, res) => {
  const start = new Date(); start.setHours(0, 0, 0, 0)
  const result = await prisma.sale.aggregate({ where: { businessId: req.user!.businessId, createdAt: { gte: start } }, _sum: { total: true }, _count: true, _avg: { total: true } })
  res.json({ data: { sales: result._sum.total ?? 0, transactions: result._count, averageBasket: result._avg.total ?? 0 } })
})
app.use((_, res) => fail(res, 404, 'NOT_FOUND', 'The requested resource does not exist.'))
app.listen(Number(process.env.API_PORT ?? 4000), () => console.log('SmartPOS API listening on port 4000'))
