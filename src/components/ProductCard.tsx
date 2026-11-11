import { Link } from 'react-router-dom'
import { useAppDispatch } from '../app/hooks'
import { addToCart } from '../features/cart/cartSlice'
import type { Product } from '../types'

interface Props { product: Product }

export default function ProductCard({ product }: Props) {
  const dispatch = useAppDispatch()
  return (
    <article className="product-card">
      <Link to={`/products/${product.id}`} className="product-image-wrap">
        <img src={product.image} alt={product.title} className="product-image" />
      </Link>
      <div className="product-body">
        <p className="category">{product.category}</p>
        <Link to={`/products/${product.id}`} className="product-title">{product.title}</Link>
        <div className="product-bottom">
          <strong>{product.price.toLocaleString('vi-VN', { style: 'currency', currency: 'USD' })}</strong>
          <button onClick={() => dispatch(addToCart(product))}>Thu nhập</button>
        </div>
      </div>
    </article>
  )
}
