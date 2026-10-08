export type Product = {
  id: number
  name: string
  category: string
  price: number
  cost: number
  stock: number
  sku: string
  emoji: string
  color: string
}

const names = [
  ['Avocado Toast', 'Kitchen', 12.5, '🥑', 'bg-emerald-50 dark:bg-emerald-950/30'],
  ['Chicken Club', 'Kitchen', 14.9, '🥪', 'bg-amber-50 dark:bg-amber-950/30'],
  ['Caesar Salad', 'Kitchen', 11.5, '🥗', 'bg-green-50 dark:bg-green-950/30'],
  ['Classic Burger', 'Kitchen', 15.5, '🍔', 'bg-orange-50 dark:bg-orange-950/30'],
  ['Margherita Pizza', 'Kitchen', 16.9, '🍕', 'bg-red-50 dark:bg-red-950/30'],
  ['Salmon Bowl', 'Kitchen', 18.5, '🍱', 'bg-rose-50 dark:bg-rose-950/30'],
  ['Butter Croissant', 'Bakery', 4.5, '🥐', 'bg-yellow-50 dark:bg-yellow-950/30'],
  ['Blueberry Muffin', 'Bakery', 4.25, '🧁', 'bg-violet-50 dark:bg-violet-950/30'],
  ['Cinnamon Roll', 'Bakery', 5.5, '🥨', 'bg-amber-50 dark:bg-amber-950/30'],
  ['Flat White', 'Coffee', 4.8, '☕', 'bg-stone-100 dark:bg-stone-900'],
  ['Iced Matcha', 'Drinks', 5.9, '🍵', 'bg-lime-50 dark:bg-lime-950/30'],
  ['Berry Smoothie', 'Drinks', 7.5, '🥤', 'bg-pink-50 dark:bg-pink-950/30'],
  ['Sparkling Water', 'Drinks', 3.25, '💧', 'bg-sky-50 dark:bg-sky-950/30'],
  ['Organic Bananas', 'Grocery', 2.8, '🍌', 'bg-yellow-50 dark:bg-yellow-950/30'],
  ['Farm Eggs 12pk', 'Grocery', 6.4, '🥚', 'bg-orange-50 dark:bg-orange-950/30'],
  ['Whole Milk', 'Grocery', 4.2, '🥛', 'bg-blue-50 dark:bg-blue-950/30'],
] as const

export const products: Product[] = names.map((item, index) => ({
  id: index + 1,
  name: item[0],
  category: item[1],
  price: item[2],
  cost: item[2] * 0.48,
  emoji: item[3],
  color: item[4],
  stock: [18, 12, 8, 24, 16, 7, 32, 5, 14, 40, 9, 11, 28, 6, 20, 4][index],
  sku: `SP-${String(index + 1).padStart(4, '0')}`,
}))

export const sales = [
  { id: 'SP-10482', time: '10:42 AM', customer: 'Olivia Martin', items: 4, total: 48.6, payment: 'Card', status: 'Completed' },
  { id: 'SP-10481', time: '10:31 AM', customer: 'Walk-in customer', items: 2, total: 18.25, payment: 'Cash', status: 'Completed' },
  { id: 'SP-10480', time: '10:18 AM', customer: 'Noah Williams', items: 6, total: 84.9, payment: 'Mobile', status: 'Completed' },
  { id: 'SP-10479', time: '9:54 AM', customer: 'Emma Davis', items: 3, total: 31.4, payment: 'Card', status: 'Refunded' },
  { id: 'SP-10478', time: '9:36 AM', customer: 'Walk-in customer', items: 1, total: 15.5, payment: 'Cash', status: 'Completed' },
]

export const trendData = [
  { day: 'Mon', revenue: 3240, previous: 2840 },
  { day: 'Tue', revenue: 3890, previous: 3100 },
  { day: 'Wed', revenue: 3560, previous: 3420 },
  { day: 'Thu', revenue: 4210, previous: 3690 },
  { day: 'Fri', revenue: 4980, previous: 4150 },
  { day: 'Sat', revenue: 5740, previous: 4920 },
  { day: 'Sun', revenue: 4630, previous: 4010 },
]
