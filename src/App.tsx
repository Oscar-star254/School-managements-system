import { useEffect, useMemo, useState } from 'react'
import {
  ArrowDownRight, ArrowUpRight, BarChart3, Bell, Boxes, ChevronDown, ChevronLeft, ChevronRight,
  CircleDollarSign, Clock3, CreditCard, Download, FileBarChart, Grid2X2, HelpCircle, History,
  LayoutDashboard, Menu, Minus, Moon, MoreHorizontal, Package, Plus, ReceiptText, Search, Settings,
  ShoppingBag, ShoppingCart, Store, Sun, Tag, Trash2, TrendingUp, UserRound, Users, Utensils,
  WalletCards, Wifi, WifiOff, X, Zap, Banknote, Pause, ScanLine, Check, Printer, Mail, MessageSquare,
  SlidersHorizontal, Upload, AlertTriangle, ArrowRight, CalendarDays, UserCog,
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { Badge, Button, Card, Input, Modal } from './components/ui'
import { products, sales, trendData, type Product } from './data/pos'
import { money, cn } from './lib/utils'
import { usePOSStore } from './store/usePOSStore'

type Page = 'Dashboard' | 'Checkout' | 'Products' | 'Sales' | 'Customers' | 'Inventory' | 'Reports' | 'Employees' | 'Expenses' | 'Settings'
const navigation: { label: Page; icon: typeof LayoutDashboard }[] = [
  { label: 'Dashboard', icon: LayoutDashboard }, { label: 'Checkout', icon: ShoppingCart },
  { label: 'Products', icon: Package }, { label: 'Sales', icon: ReceiptText }, { label: 'Customers', icon: Users },
  { label: 'Inventory', icon: Boxes }, { label: 'Reports', icon: FileBarChart }, { label: 'Employees', icon: UserCog },
  { label: 'Expenses', icon: WalletCards }, { label: 'Settings', icon: Settings },
]

export default function App() {
  const [page, setPage] = useState<Page>('Checkout')
  const [collapsed, setCollapsed] = useState(false)
  const [mobileNav, setMobileNav] = useState(false)
  const dark = usePOSStore((s) => s.dark)
  const toggleTheme = usePOSStore((s) => s.toggleTheme)
  useEffect(() => document.documentElement.classList.toggle('dark', dark), [dark])

  return (
    <div className="min-h-screen bg-background text-foreground">
      <aside className={cn('fixed inset-y-0 left-0 z-40 flex w-64 flex-col bg-navy text-white transition-all duration-300 lg:translate-x-0', collapsed && 'lg:w-20', !mobileNav && '-translate-x-full')}>
        <div className="flex h-20 items-center gap-3 border-b border-white/10 px-5">
          <div className="grid size-10 shrink-0 place-items-center rounded-xl bg-primary shadow-lg shadow-primary/30"><Zap className="size-5 fill-white" /></div>
          {!collapsed && <div><p className="text-xl font-extrabold tracking-tight">SmartPOS</p><p className="text-xs text-slate-400">Smarter business.</p></div>}
          <Button className="ml-auto lg:hidden" variant="ghost" size="icon" onClick={() => setMobileNav(false)}><X /></Button>
        </div>
        <nav className="flex-1 space-y-1 overflow-y-auto p-3">
          {!collapsed && <p className="px-3 pb-2 pt-3 text-[10px] font-bold uppercase tracking-[.18em] text-slate-500">Workspace</p>}
          {navigation.map(({ label, icon: Icon }) => (
            <Button key={label} variant="ghost" onClick={() => { setPage(label); setMobileNav(false) }} className={cn('w-full justify-start text-slate-300 hover:bg-white/10 hover:text-white', page === label && 'bg-primary text-white hover:bg-primary', collapsed && 'justify-center px-0')} title={label}>
              <Icon className="size-5 shrink-0" />{!collapsed && <span>{label}</span>}
              {label === 'Checkout' && !collapsed && <span className="ml-auto rounded-md bg-white/15 px-1.5 py-0.5 text-[10px]">F1</span>}
            </Button>
          ))}
        </nav>
        <div className="m-3 border-t border-white/10 pt-3">
          <Button variant="ghost" className="w-full justify-start text-slate-300 hover:bg-white/10 hover:text-white" onClick={() => setCollapsed(!collapsed)}>
            {collapsed ? <ChevronRight /> : <><ChevronLeft /><span>Collapse sidebar</span></>}
          </Button>
          {!collapsed && <div className="mt-3 rounded-2xl bg-white/5 p-3"><div className="flex items-center gap-3"><div className="grid size-9 place-items-center rounded-xl bg-blue-400 font-bold">AJ</div><div className="min-w-0 flex-1"><p className="truncate text-sm font-semibold">Alex Johnson</p><p className="text-xs text-slate-400">Store Manager</p></div><MoreHorizontal className="size-4 text-slate-400" /></div></div>}
        </div>
      </aside>
      <div className={cn('transition-all duration-300 lg:pl-64', collapsed && 'lg:pl-20')}>
        <header className="sticky top-0 z-30 flex h-20 items-center gap-3 border-b border-border bg-card/90 px-4 backdrop-blur-xl md:px-6">
          <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setMobileNav(true)}><Menu /></Button>
          <button className="hidden h-11 items-center gap-3 rounded-xl border border-border bg-background px-3 text-left sm:flex">
            <div className="grid size-7 place-items-center rounded-lg bg-primary/10 text-primary"><Store className="size-4" /></div>
            <div><p className="text-[10px] font-semibold uppercase text-muted-foreground">Current store</p><p className="text-sm font-semibold">Downtown Flagship</p></div><ChevronDown className="size-4 text-muted-foreground" />
          </button>
          <div className="relative mx-auto hidden w-full max-w-md md:block"><Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" /><Input className="bg-background pl-10" placeholder="Search sales, products, customers..." /><kbd className="absolute right-3 top-1/2 -translate-y-1/2 rounded border border-border bg-card px-1.5 py-0.5 text-[10px] text-muted-foreground">⌘ K</kbd></div>
          <div className="ml-auto flex items-center gap-1.5">
            <div className="hidden items-center gap-2 rounded-xl bg-success/10 px-3 py-2 text-xs font-semibold text-success sm:flex"><span className="size-2 rounded-full bg-success" />Online</div>
            <div className="hidden items-center gap-2 rounded-xl bg-primary/10 px-3 py-2 text-xs font-semibold text-primary xl:flex"><Clock3 className="size-4" />Shift 04:32:18</div>
            <Button variant="ghost" size="icon" onClick={toggleTheme} aria-label="Toggle theme">{dark ? <Sun className="size-5" /> : <Moon className="size-5" />}</Button>
            <Button variant="ghost" size="icon" className="relative"><Bell className="size-5" /><span className="absolute right-2 top-2 size-2 rounded-full bg-danger ring-2 ring-card" /></Button>
          </div>
        </header>
        <main className={cn(page === 'Checkout' ? 'p-3 md:p-5' : 'p-4 md:p-8')}>
          {page === 'Checkout' ? <Checkout /> : page === 'Dashboard' ? <Dashboard onCheckout={() => setPage('Checkout')} /> : <ManagementPage page={page} />}
        </main>
      </div>
    </div>
  )
}

function Checkout() {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('All')
  const [payOpen, setPayOpen] = useState(false)
  const [success, setSuccess] = useState(false)
  const [restaurant, setRestaurant] = useState(false)
  const [customer, setCustomer] = useState('Walk-in customer')
  const cart = usePOSStore((s) => s.cart)
  const add = usePOSStore((s) => s.add)
  const quantity = usePOSStore((s) => s.quantity)
  const remove = usePOSStore((s) => s.remove)
  const hold = usePOSStore((s) => s.hold)
  const clear = usePOSStore((s) => s.clear)
  const categories = ['All', 'Kitchen', 'Coffee', 'Bakery', 'Drinks', 'Grocery']
  const filtered = products.filter((p) => (category === 'All' || p.category === category) && p.name.toLowerCase().includes(query.toLowerCase()))
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const tax = subtotal * .0825
  const total = subtotal + tax

  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if (event.key === 'F2') { event.preventDefault(); document.getElementById('product-search')?.focus() }
      if (event.key === 'F8') { event.preventDefault(); hold() }
      if (event.key === 'F9' && cart.length) { event.preventDefault(); setPayOpen(true) }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [cart.length, hold])

  return (
    <>
      <div className="grid min-h-[calc(100vh-7.5rem)] gap-4 xl:grid-cols-[minmax(0,1fr)_26rem]">
        <section className="min-w-0">
          <div className="mb-4 flex flex-wrap items-center gap-3">
            <div className="relative min-w-64 flex-1"><Search className="absolute left-4 top-1/2 size-5 -translate-y-1/2 text-muted-foreground" /><Input id="product-search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search products or scan barcode..." className="h-13 bg-card pl-12 pr-14 text-base shadow-sm" autoFocus /><ScanLine className="absolute right-4 top-1/2 size-5 -translate-y-1/2 text-primary" /></div>
            <Button variant={restaurant ? 'primary' : 'secondary'} className="h-13" onClick={() => setRestaurant(!restaurant)}><Utensils className="size-5" />{restaurant ? 'Table 8' : 'Retail mode'}</Button>
          </div>
          <div className="mb-5 flex gap-2 overflow-x-auto pb-1">
            {categories.map((item) => <Button key={item} variant={category === item ? 'primary' : 'secondary'} className="h-10 rounded-full px-5" onClick={() => setCategory(item)}>{item}</Button>)}
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5">
            <AnimatePresence mode="popLayout">
              {filtered.map((product) => <ProductTile key={product.id} product={product} onAdd={add} />)}
            </AnimatePresence>
          </div>
          {!filtered.length && <Card className="grid min-h-80 place-items-center text-center"><div><Search className="mx-auto mb-3 size-10 text-muted-foreground" /><p className="font-bold">No products found</p><p className="text-sm text-muted-foreground">Try another name or category.</p></div></Card>}
        </section>
        <Card className="flex min-h-[38rem] flex-col overflow-hidden xl:sticky xl:top-24 xl:h-[calc(100vh-7rem)]">
          <div className="flex items-center justify-between border-b border-border p-5">
            <div><div className="flex items-center gap-2"><p className="text-lg font-bold">Current Sale</p><Badge tone="blue">{cart.reduce((n, i) => n + i.quantity, 0)} items</Badge></div><p className="mt-1 text-xs text-muted-foreground">Order #SP-10483 · Dine-in</p></div>
            <Button variant="ghost" size="icon" onClick={clear} disabled={!cart.length} aria-label="Clear cart"><Trash2 className="size-4" /></Button>
          </div>
          <button className="mx-5 mt-4 flex h-12 items-center gap-3 rounded-xl border border-dashed border-primary/40 bg-primary/5 px-4 text-left text-sm font-semibold text-primary" onClick={() => setCustomer(customer === 'Walk-in customer' ? 'Sophia Carter · Gold' : 'Walk-in customer')}><UserRound className="size-5" />{customer}<Plus className="ml-auto size-4" /></button>
          <div className="flex-1 space-y-2 overflow-y-auto p-4">
            <AnimatePresence initial={false}>
              {cart.map((item) => (
                <motion.div key={item.id} layout initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 24 }} className="group rounded-2xl border border-border bg-background p-3">
                  <div className="flex gap-3"><div className={cn('grid size-12 shrink-0 place-items-center rounded-xl text-2xl', item.color)}>{item.emoji}</div><div className="min-w-0 flex-1"><div className="flex justify-between gap-2"><p className="truncate text-sm font-bold">{item.name}</p><p className="price font-bold">{money(item.price * item.quantity)}</p></div><p className="text-xs text-muted-foreground">{money(item.price)} each</p></div></div>
                  <div className="mt-3 flex items-center"><div className="flex items-center rounded-lg border border-border bg-card"><Button variant="ghost" size="icon" className="size-8 rounded-lg" onClick={() => quantity(item.id, -1)}><Minus className="size-3" /></Button><span className="price w-8 text-center text-sm font-bold">{item.quantity}</span><Button variant="ghost" size="icon" className="size-8 rounded-lg" onClick={() => quantity(item.id, 1)}><Plus className="size-3" /></Button></div><Button variant="ghost" size="sm" className="ml-2 h-8 text-xs"><Tag className="size-3" />Discount</Button><Button variant="ghost" size="icon" className="ml-auto size-8 text-muted-foreground hover:text-danger" onClick={() => remove(item.id)}><Trash2 className="size-4" /></Button></div>
                </motion.div>
              ))}
            </AnimatePresence>
            {!cart.length && <div className="flex h-full min-h-64 flex-col items-center justify-center text-center"><div className="mb-4 grid size-16 place-items-center rounded-2xl bg-primary/10 text-primary"><ShoppingBag className="size-8" /></div><p className="font-bold">Your cart is ready</p><p className="mt-1 max-w-52 text-sm text-muted-foreground">Tap a product to add it to the current sale.</p></div>}
          </div>
          <div className="border-t border-border bg-card p-5">
            <div className="space-y-2 text-sm"><div className="flex justify-between text-muted-foreground"><span>Subtotal</span><span className="price">{money(subtotal)}</span></div><div className="flex justify-between text-muted-foreground"><span>Tax (8.25%)</span><span className="price">{money(tax)}</span></div><div className="flex justify-between border-t border-dashed border-border pt-3 text-xl font-extrabold"><span>Total</span><span className="price text-primary">{money(total)}</span></div></div>
            <div className="mt-4 grid grid-cols-[1fr_2fr] gap-2"><Button variant="secondary" size="lg" disabled={!cart.length} onClick={hold}><Pause className="size-5" />Hold</Button><Button size="lg" disabled={!cart.length} onClick={() => setPayOpen(true)}><CreditCard className="size-5" />Pay {money(total)} <span className="ml-auto rounded bg-white/15 px-1.5 py-0.5 text-[10px]">F9</span></Button></div>
          </div>
        </Card>
      </div>
      <PaymentModal open={payOpen} onClose={() => setPayOpen(false)} total={total} onPaid={() => { setPayOpen(false); setSuccess(true); clear() }} />
      <SuccessModal open={success} onClose={() => setSuccess(false)} total={total} />
    </>
  )
}

function ProductTile({ product, onAdd }: { product: Product; onAdd: (p: Product) => void }) {
  return <motion.button layout whileTap={{ scale: .97 }} onClick={() => onAdd(product)} className="group min-h-44 overflow-hidden rounded-2xl border border-border bg-card text-left shadow-card transition hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
    <div className={cn('relative grid h-24 place-items-center text-5xl transition group-hover:scale-105', product.color)}>{product.emoji}{product.stock <= 6 && <Badge tone="danger" className="absolute right-2 top-2">Only {product.stock}</Badge>}</div>
    <div className="p-3"><p className="truncate text-sm font-bold">{product.name}</p><div className="mt-2 flex items-center justify-between"><p className="price font-extrabold text-primary">{money(product.price)}</p><div className="grid size-7 place-items-center rounded-lg bg-primary/10 text-primary transition group-hover:bg-primary group-hover:text-white"><Plus className="size-4" /></div></div></div>
  </motion.button>
}

function PaymentModal({ open, onClose, total, onPaid }: { open: boolean; onClose: () => void; total: number; onPaid: () => void }) {
  const [method, setMethod] = useState('Cash')
  const [tendered, setTendered] = useState(0)
  useEffect(() => { if (open) setTendered(0) }, [open])
  const methods = [{ name: 'Cash', icon: Banknote }, { name: 'Card', icon: CreditCard }, { name: 'Mobile', icon: WalletCards }, { name: 'Gift card', icon: Tag }]
  return <Modal open={open} onClose={onClose} title="Take payment" className="max-w-2xl">
    <div className="p-6">
      <div className="rounded-2xl bg-navy p-6 text-center text-white"><p className="text-sm text-slate-300">Amount due</p><p className="price mt-1 text-4xl font-extrabold">{money(total)}</p></div>
      <div className="mt-5 grid grid-cols-4 gap-2">{methods.map(({ name, icon: Icon }) => <button key={name} onClick={() => { setMethod(name); if (name !== 'Cash') setTendered(total) }} className={cn('flex min-h-20 flex-col items-center justify-center gap-2 rounded-xl border text-xs font-semibold transition', method === name ? 'border-primary bg-primary/10 text-primary' : 'border-border hover:bg-muted')}><Icon className="size-5" />{name}</button>)}</div>
      {method === 'Cash' ? <div className="mt-6"><label className="mb-2 block text-sm font-semibold">Cash received</label><div className="relative"><span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold">$</span><Input value={tendered || ''} onChange={(e) => setTendered(Number(e.target.value))} type="number" className="price h-14 pl-8 text-xl font-bold" placeholder="0.00" /></div><div className="mt-3 grid grid-cols-4 gap-2">{[20, 50, 100, Math.ceil(total)].map((amount, i) => <Button key={`${amount}-${i}`} variant="secondary" onClick={() => setTendered(amount)}>{i === 3 ? 'Exact' : money(amount)}</Button>)}</div><div className="mt-5 flex justify-between rounded-xl bg-success/10 p-4 font-bold text-success"><span>Change due</span><span className="price">{money(Math.max(0, tendered - total))}</span></div></div> : <div className="mt-6 rounded-2xl border border-border bg-muted/50 p-6 text-center"><div className="mx-auto mb-3 grid size-12 place-items-center rounded-full bg-primary/10 text-primary"><Wifi className="size-6" /></div><p className="font-bold">Mock terminal ready</p><p className="text-sm text-muted-foreground">Ask the customer to tap, insert, or swipe.</p></div>}
      <Button size="lg" className="mt-6 w-full" disabled={method === 'Cash' && tendered < total} onClick={onPaid}><Check className="size-5" />Complete {method} Payment</Button>
    </div>
  </Modal>
}

function SuccessModal({ open, onClose, total }: { open: boolean; onClose: () => void; total: number }) {
  return <Modal open={open} onClose={onClose} title="Sale complete">
    <div className="p-7 text-center"><div className="mx-auto grid size-20 place-items-center rounded-full bg-success/10 text-success"><Check className="size-10" strokeWidth={3} /></div><p className="mt-5 text-2xl font-extrabold">Payment received</p><p className="price mt-2 text-lg font-bold text-primary">{money(total)}</p><p className="mt-1 text-sm text-muted-foreground">Receipt SP-10483 · Today, 10:48 AM</p><div className="mt-6 grid grid-cols-3 gap-2"><Button variant="secondary" className="h-20 flex-col"><Printer className="size-5" />Print</Button><Button variant="secondary" className="h-20 flex-col"><Mail className="size-5" />Email</Button><Button variant="secondary" className="h-20 flex-col"><MessageSquare className="size-5" />SMS</Button></div><Button size="lg" className="mt-5 w-full" onClick={onClose}>Start New Sale</Button></div>
  </Modal>
}

function Dashboard({ onCheckout }: { onCheckout: () => void }) {
  const stats = [
    { label: "Today's sales", value: '$12,847.50', change: '+12.5%', icon: CircleDollarSign, tone: 'blue' },
    { label: 'Transactions', value: '186', change: '+8.2%', icon: ReceiptText, tone: 'green' },
    { label: 'Average basket', value: '$69.07', change: '+3.7%', icon: ShoppingBag, tone: 'purple' },
    { label: 'Gross profit', value: '$5,982.15', change: '+10.4%', icon: TrendingUp, tone: 'orange' },
  ]
  return <div className="mx-auto max-w-[1600px]">
    <div className="mb-7 flex flex-wrap items-end justify-between gap-4"><div><p className="text-sm font-semibold text-primary">Monday, May 19</p><h1 className="mt-1 text-3xl font-extrabold tracking-tight">Good morning, Alex</h1><p className="mt-1 text-muted-foreground">Here’s what’s happening at Downtown Flagship.</p></div><div className="flex gap-2"><Button variant="secondary"><CalendarDays className="size-4" />Last 7 days<ChevronDown className="size-4" /></Button><Button onClick={onCheckout}><ShoppingCart className="size-4" />New sale</Button></div></div>
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">{stats.map((stat, i) => <Card key={stat.label} className="p-5"><div className="flex items-start justify-between"><div className={cn('grid size-11 place-items-center rounded-xl', i === 0 ? 'bg-primary/10 text-primary' : i === 1 ? 'bg-success/10 text-success' : i === 2 ? 'bg-violet-500/10 text-violet-600' : 'bg-orange-500/10 text-orange-600')}><stat.icon className="size-5" /></div><Badge tone="success"><ArrowUpRight className="mr-1 size-3" />{stat.change}</Badge></div><p className="mt-5 text-sm text-muted-foreground">{stat.label}</p><p className="price mt-1 text-2xl font-extrabold">{stat.value}</p><p className="mt-1 text-xs text-muted-foreground">vs. yesterday</p></Card>)}</div>
    <div className="mt-5 grid gap-5 xl:grid-cols-[2fr_1fr]"><Card className="p-6"><div className="mb-5 flex items-center justify-between"><div><p className="text-lg font-bold">Revenue overview</p><p className="text-sm text-muted-foreground">Daily sales for this week</p></div><Badge tone="blue">This week</Badge></div><div className="h-72"><ResponsiveContainer width="100%" height="100%"><AreaChart data={trendData}><defs><linearGradient id="revenue" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#2563eb" stopOpacity={.35}/><stop offset="100%" stopColor="#2563eb" stopOpacity={0}/></linearGradient></defs><CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--color-border)" /><XAxis dataKey="day" axisLine={false} tickLine={false} /><YAxis axisLine={false} tickLine={false} tickFormatter={(v) => `$${v / 1000}k`} /><Tooltip contentStyle={{ borderRadius: 12, border: '1px solid var(--color-border)' }} formatter={(v) => money(Number(v))} /><Area type="monotone" dataKey="revenue" stroke="#2563eb" strokeWidth={3} fill="url(#revenue)" /></AreaChart></ResponsiveContainer></div></Card>
      <Card className="p-6"><div className="flex items-center justify-between"><div><p className="text-lg font-bold">AI business pulse</p><p className="text-sm text-muted-foreground">Updated 5 min ago</p></div><div className="grid size-10 place-items-center rounded-xl bg-violet-500/10 text-violet-600"><Zap className="size-5" /></div></div><div className="mt-5 rounded-2xl bg-primary/5 p-4"><p className="text-sm leading-6"><strong>Sales are up 12.5%</strong> today, led by Kitchen items between 8–10 AM. Your average basket also improved.</p></div><div className="mt-4 space-y-3"><p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Suggested actions</p><div className="flex gap-3 rounded-xl border border-border p-3"><AlertTriangle className="mt-0.5 size-4 shrink-0 text-warning" /><div><p className="text-sm font-semibold">Reorder Whole Milk</p><p className="text-xs text-muted-foreground">Only 4 units remain</p></div><ArrowRight className="ml-auto size-4" /></div><div className="flex gap-3 rounded-xl border border-border p-3"><TrendingUp className="mt-0.5 size-4 shrink-0 text-success" /><div><p className="text-sm font-semibold">Extend breakfast promo</p><p className="text-xs text-muted-foreground">18% higher conversion</p></div><ArrowRight className="ml-auto size-4" /></div></div></Card></div>
    <Card className="mt-5 overflow-hidden"><div className="flex items-center justify-between border-b border-border p-5"><div><p className="font-bold">Recent transactions</p><p className="text-sm text-muted-foreground">Latest sales across this store</p></div><Button variant="ghost">View all<ArrowRight className="size-4" /></Button></div><SalesTable /></Card>
  </div>
}

function SalesTable() {
  return <div className="overflow-x-auto"><table className="w-full min-w-[700px] text-left text-sm"><thead className="bg-muted/60 text-xs uppercase text-muted-foreground"><tr><th className="px-5 py-3">Receipt</th><th className="px-5 py-3">Customer</th><th className="px-5 py-3">Items</th><th className="px-5 py-3">Payment</th><th className="px-5 py-3">Status</th><th className="px-5 py-3 text-right">Total</th></tr></thead><tbody className="divide-y divide-border">{sales.map((sale) => <tr key={sale.id} className="hover:bg-muted/30"><td className="px-5 py-4"><p className="font-bold">{sale.id}</p><p className="text-xs text-muted-foreground">{sale.time}</p></td><td className="px-5 py-4">{sale.customer}</td><td className="px-5 py-4">{sale.items}</td><td className="px-5 py-4">{sale.payment}</td><td className="px-5 py-4"><Badge tone={sale.status === 'Completed' ? 'success' : 'danger'}>{sale.status}</Badge></td><td className="price px-5 py-4 text-right font-bold">{money(sale.total)}</td></tr>)}</tbody></table></div>
}

function ManagementPage({ page }: { page: Exclude<Page, 'Checkout' | 'Dashboard'> }) {
  const config = {
    Products: ['Products', 'Manage your catalog, pricing, and product availability.', 'Add product'],
    Sales: ['Sales history', 'Review transactions, reprint receipts, and process returns.', 'Export sales'],
    Customers: ['Customers', 'Build relationships with profiles, loyalty, and store credit.', 'Add customer'],
    Inventory: ['Inventory', 'Track stock levels and movements across every store.', 'Stock adjustment'],
    Reports: ['Reports', 'Understand performance with real-time business intelligence.', 'Export report'],
    Employees: ['Employees', 'Manage staff access, roles, shifts, and performance.', 'Invite employee'],
    Expenses: ['Expenses', 'Track operating costs and protect your margins.', 'Record expense'],
    Settings: ['Settings', 'Configure your business, payments, hardware, and preferences.', 'Save changes'],
  }[page]
  return <div className="mx-auto max-w-[1500px]"><div className="mb-7 flex flex-wrap items-end justify-between gap-4"><div><h1 className="text-3xl font-extrabold tracking-tight">{config[0]}</h1><p className="mt-2 text-muted-foreground">{config[1]}</p></div><Button>{page === 'Reports' || page === 'Sales' ? <Download className="size-4" /> : <Plus className="size-4" />}{config[2]}</Button></div>
    {page === 'Products' || page === 'Inventory' ? <ProductManagement inventory={page === 'Inventory'} /> : page === 'Sales' ? <Card className="overflow-hidden"><Toolbar placeholder="Search receipt or customer..." /><SalesTable /></Card> : page === 'Settings' ? <SettingsPage /> : <GenericManagement page={page} />}
  </div>
}

function Toolbar({ placeholder }: { placeholder: string }) {
  return <div className="flex flex-wrap gap-3 border-b border-border p-4"><div className="relative min-w-60 flex-1"><Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" /><Input className="pl-9" placeholder={placeholder} /></div><Button variant="secondary"><SlidersHorizontal className="size-4" />Filters</Button><Button variant="secondary"><Download className="size-4" />Export</Button></div>
}

function ProductManagement({ inventory }: { inventory: boolean }) {
  return <Card className="overflow-hidden"><Toolbar placeholder="Search name, SKU, or barcode..." /><div className="overflow-x-auto"><table className="w-full min-w-[800px] text-left text-sm"><thead className="bg-muted/60 text-xs uppercase text-muted-foreground"><tr><th className="px-5 py-3">{inventory ? 'Product' : 'Name'}</th><th className="px-5 py-3">SKU</th><th className="px-5 py-3">Category</th><th className="px-5 py-3">{inventory ? 'Stock on hand' : 'Price'}</th><th className="px-5 py-3">{inventory ? 'Reorder level' : 'Margin'}</th><th className="px-5 py-3">Status</th><th className="px-5 py-3" /></tr></thead><tbody className="divide-y divide-border">{products.slice(0, 10).map((p) => <tr key={p.id} className="hover:bg-muted/30"><td className="px-5 py-3"><div className="flex items-center gap-3"><div className={cn('grid size-11 place-items-center rounded-xl text-xl', p.color)}>{p.emoji}</div><div><p className="font-bold">{p.name}</p><p className="text-xs text-muted-foreground">{inventory ? 'Downtown Flagship' : `${p.stock} in stock`}</p></div></div></td><td className="px-5 py-3 font-mono text-xs">{p.sku}</td><td className="px-5 py-3">{p.category}</td><td className="price px-5 py-3 font-bold">{inventory ? p.stock : money(p.price)}</td><td className="price px-5 py-3">{inventory ? '8' : `${Math.round((1 - p.cost / p.price) * 100)}%`}</td><td className="px-5 py-3"><Badge tone={p.stock <= 6 ? 'warning' : 'success'}>{p.stock <= 6 ? 'Low stock' : 'Active'}</Badge></td><td className="px-5 py-3"><Button variant="ghost" size="icon"><MoreHorizontal className="size-4" /></Button></td></tr>)}</tbody></table></div></Card>
}

function GenericManagement({ page }: { page: string }) {
  const cards = page === 'Reports' ? [['Net revenue', '$28,941', '+14.2%'], ['Gross margin', '48.6%', '+2.1%'], ['Tax collected', '$2,184', '+9.8%']] : page === 'Customers' ? [['Total customers', '2,481', '+84 this month'], ['Loyalty members', '1,264', '51% enrolled'], ['Customer LTV', '$428.20', '+7.4%']] : page === 'Employees' ? [['Active employees', '12', '3 on shift'], ['Hours this week', '384.5', '+4.2%'], ['Sales per hour', '$142.80', '+8.1%']] : [['This month', '$8,420', '+6.2%'], ['Recurring', '$4,180', '12 expenses'], ['Pending review', '$680', '4 receipts']]
  return <><div className="grid gap-4 md:grid-cols-3">{cards.map(([label, value, detail]) => <Card key={label} className="p-5"><p className="text-sm text-muted-foreground">{label}</p><p className="price mt-2 text-2xl font-extrabold">{value}</p><p className="mt-2 text-xs font-semibold text-success">{detail}</p></Card>)}</div><Card className="mt-5 p-6"><div className="flex items-center justify-between"><div><p className="text-lg font-bold">{page === 'Reports' ? 'Performance overview' : `Recent ${page.toLowerCase()}`}</p><p className="text-sm text-muted-foreground">Live data from Downtown Flagship</p></div><Button variant="secondary"><SlidersHorizontal className="size-4" />Filter</Button></div><div className="mt-6 grid min-h-64 place-items-center rounded-2xl border border-dashed border-border bg-muted/30"><div className="text-center"><BarChart3 className="mx-auto mb-3 size-10 text-primary" /><p className="font-bold">Your workspace is connected</p><p className="mt-1 text-sm text-muted-foreground">Data will update automatically as activity happens.</p></div></div></Card></>
}

function SettingsPage() {
  const items = [{ title: 'Business profile', text: 'Name, logo, contact details and tax ID', icon: Store }, { title: 'Taxes & currency', text: 'Tax rates, inclusive pricing and locale', icon: CircleDollarSign }, { title: 'Receipts', text: 'Template, printer size and footer message', icon: ReceiptText }, { title: 'Payment methods', text: 'Cash, card, mobile wallet and gift cards', icon: CreditCard }, { title: 'Hardware', text: 'Printers, scanners, displays and cash drawer', icon: ScanLine }, { title: 'Team & permissions', text: 'Roles, approval limits and access control', icon: Users }]
  return <div className="grid gap-5 lg:grid-cols-[18rem_1fr]"><Card className="h-fit p-3">{items.map((item, i) => <button key={item.title} className={cn('flex w-full items-center gap-3 rounded-xl p-3 text-left transition hover:bg-muted', i === 0 && 'bg-primary/10 text-primary')}><item.icon className="size-5" /><span className="text-sm font-semibold">{item.title}</span><ChevronRight className="ml-auto size-4" /></button>)}</Card><Card className="p-6"><p className="text-xl font-bold">Business profile</p><p className="mt-1 text-sm text-muted-foreground">This information appears on receipts and invoices.</p><div className="mt-6 grid gap-5 md:grid-cols-2"><label className="space-y-2 text-sm font-semibold">Business name<Input defaultValue="SmartPOS Demo Company" /></label><label className="space-y-2 text-sm font-semibold">Tax ID<Input defaultValue="US-84-2190483" /></label><label className="space-y-2 text-sm font-semibold">Email<Input defaultValue="hello@smartpos.demo" /></label><label className="space-y-2 text-sm font-semibold">Phone<Input defaultValue="+1 (555) 014-8820" /></label><label className="space-y-2 text-sm font-semibold md:col-span-2">Business address<Input defaultValue="125 Market Street, San Francisco, CA 94105" /></label></div><div className="mt-6 border-t border-border pt-5"><Button>Save changes</Button></div></Card></div>
}
