import { describe, expect, it } from 'vitest'
import { calculateTotals, stockAfterSale } from './pricing'

describe('pricing', () => {
  it('calculates exclusive tax and discounts without floating point drift', () => {
    expect(calculateTotals([{ price: 12.5, quantity: 2, discount: 2 }], .0825, 3)).toEqual({
      subtotal: 20,
      tax: 1.65,
      total: 21.65,
    })
  })

  it('extracts inclusive tax', () => {
    expect(calculateTotals([{ price: 108.25, quantity: 1 }], .0825, 0, true)).toEqual({
      subtotal: 108.25,
      tax: 8.25,
      total: 108.25,
    })
  })
})

describe('stock', () => {
  it('deducts available stock', () => expect(stockAfterSale(10, 3)).toBe(7))
  it('rejects overselling', () => expect(() => stockAfterSale(2, 3)).toThrow('Insufficient stock'))
})
