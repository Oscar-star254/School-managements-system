import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Product } from '../data/pos'

export type CartItem = Product & { quantity: number }

type Store = {
  cart: CartItem[]
  dark: boolean
  held: CartItem[][]
  add: (product: Product) => void
  quantity: (id: number, delta: number) => void
  remove: (id: number) => void
  clear: () => void
  hold: () => void
  toggleTheme: () => void
}

export const usePOSStore = create<Store>()(
  persist(
    (set) => ({
      cart: [],
      dark: false,
      held: [],
      add: (product) =>
        set((state) => {
          const existing = state.cart.find((item) => item.id === product.id)
          return {
            cart: existing
              ? state.cart.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item))
              : [...state.cart, { ...product, quantity: 1 }],
          }
        }),
      quantity: (id, delta) =>
        set((state) => ({
          cart: state.cart
            .map((item) => (item.id === id ? { ...item, quantity: item.quantity + delta } : item))
            .filter((item) => item.quantity > 0),
        })),
      remove: (id) => set((state) => ({ cart: state.cart.filter((item) => item.id !== id) })),
      clear: () => set({ cart: [] }),
      hold: () => set((state) => state.cart.length ? { held: [...state.held, state.cart], cart: [] } : state),
      toggleTheme: () => set((state) => ({ dark: !state.dark })),
    }),
    { name: 'smartpos-state', partialize: (state) => ({ dark: state.dark, held: state.held }) },
  ),
)
