import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../app/store'
import type { CartItem, Product } from '../../types'

interface CartState { items: CartItem[] }

const initialState: CartState = { items: [] }

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      const found = state.items.find((item) => item.id === action.payload.id)
      if (found) found.quantity += 1
      else state.items.push({ ...action.payload, quantity: 1 })
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((item) => item.id !== action.payload)
    },
    updateQuantity: (state, action: PayloadAction<{ id: number; quantity: number }>) => {
      const found = state.items.find((item) => item.id === action.payload.id)
      if (!found) return
      if (action.payload.quantity <= 0) state.items = state.items.filter((item) => item.id !== action.payload.id)
      else found.quantity = action.payload.quantity
    },
    clearCart: (state) => { state.items = [] },
  },
})

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions
export const selectCartItems = (state: RootState) => state.cart.items
export const selectCartCount = (state: RootState) => state.cart.items.reduce((sum, item) => sum + item.quantity, 0)
export const selectCartTotal = (state: RootState) => state.cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0)
export default cartSlice.reducer
