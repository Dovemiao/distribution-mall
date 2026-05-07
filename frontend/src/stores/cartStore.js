import { create } from 'zustand'

export const useCartStore = create((set) => ({
  items: JSON.parse(localStorage.getItem('cart') || '[]'),
  addItem: (product) =>
    set((state) => {
      const newItems = [...state.items, product]
      localStorage.setItem('cart', JSON.stringify(newItems))
      return { items: newItems }
    }),
  removeItem: (productId) =>
    set((state) => {
      const newItems = state.items.filter((item) => item.id !== productId)
      localStorage.setItem('cart', JSON.stringify(newItems))
      return { items: newItems }
    }),
  clearCart: () =>
    set(() => {
      localStorage.setItem('cart', JSON.stringify([]))
      return { items: [] }
    }),
}))
