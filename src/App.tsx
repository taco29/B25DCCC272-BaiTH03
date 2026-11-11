import { Route, Routes } from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute'
import MainLayout from './layouts/MainLayout'
import CartPage from './pages/CartPage'
import CheckoutPage from './pages/CheckoutPage'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import NotFoundPage from './pages/NotFoundPage'
import ProductDetailPage from './pages/ProductDetailPage'

export default function App() {
  return <Routes><Route element={<MainLayout />}><Route path="/" element={<HomePage />} /><Route path="/products/:id" element={<ProductDetailPage />} /><Route path="/cart" element={<CartPage />} /><Route path="/login" element={<LoginPage />} /><Route element={<ProtectedRoute />}><Route path="/checkout" element={<CheckoutPage />} /></Route><Route path="*" element={<NotFoundPage />} /></Route></Routes>
}
