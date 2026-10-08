export type PricingLine = { price: number; quantity: number; discount?: number }

export function calculateTotals(lines: PricingLine[], taxRate: number, orderDiscount = 0, taxInclusive = false) {
  const lineSubtotal = lines.reduce((sum, line) => sum + Math.max(0, line.price * line.quantity - (line.discount ?? 0)), 0)
  const subtotal = Math.max(0, lineSubtotal - orderDiscount)
  const tax = taxInclusive ? subtotal - subtotal / (1 + taxRate) : subtotal * taxRate
  const total = taxInclusive ? subtotal : subtotal + tax
  return {
    subtotal: Math.round(subtotal * 100) / 100,
    tax: Math.round(tax * 100) / 100,
    total: Math.round(total * 100) / 100,
  }
}

export function stockAfterSale(current: number, sold: number) {
  if (sold <= 0) throw new Error('Sold quantity must be positive')
  if (sold > current) throw new Error('Insufficient stock')
  return current - sold
}
