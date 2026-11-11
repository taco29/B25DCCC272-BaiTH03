import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { addToCart } from '../features/cart/cartSlice'
import { fetchProducts } from '../features/products/productsSlice'

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>()
  const { items, status } = useAppSelector((state) => state.products)
  const product = items.find((item) => item.id === Number(id))
  const dispatch = useAppDispatch()
  useEffect(() => {
    if (status === 'idle') void dispatch(fetchProducts())
  }, [dispatch, status])
  if (status === 'loading' && !product) return <p className="state-message">Đang triệu hồi bảo vật...</p>
  if (!product) return <div className="empty-page"><h1>Bảo vật không tồn tại</h1><p>Bảo vật có thể đã biến mất khỏi thế gian hoặc chưa hiện thế.</p><Link to="/">Hồi sơn môn</Link></div>
  return (
    <section className="detail-page">
      <Link className="back-link" to="/">← Quay về Phàm Trần Các</Link>
      <div className="detail-card">
        <div className="detail-image-wrap"><img src={product.image} alt={product.title} /></div>
        <div className="detail-content"><p className="category">{product.category}</p><h1>{product.title}</h1><p className="detail-price">{product.price.toLocaleString('vi-VN', { style: 'currency', currency: 'USD' })}</p><p className="description">{product.description}</p><button className="primary-button" onClick={() => dispatch(addToCart(product))}>Thu vào túi càn khôn</button></div>
      </div>
    </section>
  )
}
