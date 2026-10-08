import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  await prisma.business.deleteMany({ where: { name: 'SmartPOS Demo Company' } })
  const business = await prisma.business.create({ data: { name: 'SmartPOS Demo Company', settings: { create: { currency: 'USD', locale: 'en-US' } } } })
  const stores = await Promise.all(['Downtown Flagship', 'Harbor Market', 'Uptown Café'].map((name, i) =>
    prisma.store.create({ data: { businessId: business.id, name, address: `${125 + i * 80} Market Street` } })))
  const roles = await Promise.all(['Owner', 'Admin', 'Manager', 'Cashier'].map((name) =>
    prisma.role.create({ data: { businessId: business.id, name, permissions: { create: [
      { action: 'SALE_CREATE' },
      { action: 'DISCOUNT', approvalLimit: name === 'Cashier' ? 15 : 100 },
      { action: 'REFUND', allowed: name !== 'Cashier' },
      { action: 'VOID', allowed: name !== 'Cashier' },
    ] } } })))
  const passwordHash = await bcrypt.hash('SmartPOS!2025', 12)
  const people = [
    ['Alex Johnson', 'owner@smartpos.demo', '1001', 0],
    ['Jordan Lee', 'admin@smartpos.demo', '1002', 1],
    ['Taylor Reed', 'manager@smartpos.demo', '1003', 2],
    ['Mia Chen', 'cashier@smartpos.demo', '1004', 3],
    ['Sam Rivera', 'sam@smartpos.demo', '1005', 3],
  ] as const
  const users = await Promise.all(people.map(async ([name, email, pin, role]) => prisma.user.create({
    data: { businessId: business.id, storeId: stores[0].id, roleId: roles[role].id, name, email, passwordHash, pinHash: await bcrypt.hash(pin, 10) },
  })))
  const categoryNames = ['Kitchen', 'Coffee', 'Bakery', 'Drinks', 'Grocery']
  const categories = await Promise.all(categoryNames.map((name, sortOrder) => prisma.category.create({ data: { businessId: business.id, name, sortOrder } })))
  const baseNames = ['Avocado Toast', 'Chicken Club', 'Caesar Salad', 'Classic Burger', 'Margherita Pizza', 'Salmon Bowl', 'Flat White', 'Cold Brew', 'Iced Matcha', 'Butter Croissant', 'Blueberry Muffin', 'Cinnamon Roll', 'Berry Smoothie', 'Sparkling Water', 'Fresh Orange Juice', 'Organic Bananas', 'Farm Eggs', 'Whole Milk']
  const products = []
  for (let i = 0; i < 54; i++) {
    const category = categories[i % categories.length]
    const product = await prisma.product.create({
      data: {
        businessId: business.id, categoryId: category.id, name: `${baseNames[i % baseNames.length]}${i >= baseNames.length ? ` ${Math.floor(i / baseNames.length) + 1}` : ''}`,
        sku: `SP-${String(i + 1).padStart(4, '0')}`, barcode: `80012345${String(i).padStart(4, '0')}`,
        cost: 1.5 + (i % 12) * .75, price: 4.5 + (i % 14) * 1.25, reorderLevel: 8,
      },
    })
    products.push(product)
    await Promise.all(stores.map((store, storeIndex) => prisma.stockLevel.create({ data: { storeId: store.id, productId: product.id, quantity: 12 + ((i * 7 + storeIndex * 11) % 50) } })))
  }
  const customer = await prisma.customer.create({ data: { businessId: business.id, name: 'Olivia Martin', email: 'olivia@example.com', phone: '+1 555 010 2211', points: 840, tags: ['VIP'] } })
  const shift = await prisma.shift.create({ data: { storeId: stores[0].id, userId: users[3].id, openingFloat: 200 } })
  for (let day = 29; day >= 0; day--) {
    for (let index = 0; index < 6; index++) {
      const product = products[(day * 6 + index) % products.length]
      const quantity = 1 + (index % 3)
      const subtotal = Number(product.price) * quantity
      const createdAt = new Date(Date.now() - day * 86_400_000 + index * 3_600_000)
      await prisma.sale.create({ data: {
        businessId: business.id, storeId: stores[day % 3].id, userId: users[3 + (index % 2)].id, shiftId: shift.id,
        customerId: index % 3 === 0 ? customer.id : undefined, receiptNumber: `SP-${10000 + day * 6 + index}`,
        idempotencyKey: `seed-${day}-${index}`, subtotal, tax: subtotal * .0825, total: subtotal * 1.0825, createdAt,
        items: { create: { productId: product.id, quantity, unitPrice: product.price, total: subtotal } },
        payments: { create: { method: index % 2 ? 'CARD' : 'CASH', amount: subtotal * 1.0825 } },
      } })
    }
  }
  console.log('Seeded 3 stores, 5 users, 54 products, and 30 days of sales.')
}

main().finally(() => prisma.$disconnect())
