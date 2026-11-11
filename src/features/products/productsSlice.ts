import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { Product } from '../../types'

type ProductsStatus = 'idle' | 'loading' | 'succeeded' | 'failed'

interface ProductsState {
  items: Product[]
  status: ProductsStatus
  error: string | null
}

const initialState: ProductsState = { items: [], status: 'idle', error: null }

export const fetchProducts = createAsyncThunk<Product[], void, { rejectValue: string }>(
  'products/fetchProducts',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch('https://fakestoreapi.com/products')
      if (!response.ok) return rejectWithValue('Không thể tải danh sách sản phẩm.')
      return (await response.json()) as Product[]
    } catch {
      return rejectWithValue('Lỗi kết nối. Vui lòng thử lại.')
    }
  },
)

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.items = action.payload
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload ?? 'Đã có lỗi không xác định.'
      })
  },
})

export default productsSlice.reducer
