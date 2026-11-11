import { Link } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { removeFromCart, selectCartItems, selectCartTotal, updateQuantity } from '../features/cart/cartSlice'

export default function CartPage() {
  const items = useAppSelector(selectCartItems)
  const total = useAppSelector(selectCartTotal)
  const dispatch = useAppDispatch()
  if (!items.length) return <div className="empty-page"><h1>Túi càn khôn trống rỗng</h1><p>Đạo hữu hãy tìm vài bảo vật hữu duyên với mình.</p><Link className="primary-button" to="/">Tầm bảo</Link></div>
  return <section className="cart-page"><h1>Túi càn khôn</h1><div className="cart-layout"><div className="cart-list">{items.map((item) => <article className="cart-item" key={item.id}><img src={item.image} alt="" /><div className="cart-item-info"><Link to={`/products/${item.id}`}>{item.title}</Link><p>{item.price.toLocaleString('vi-VN', { style: 'currency', currency: 'USD' })}</p></div><div className="quantity" aria-label={`Số lượng ${item.title}`}><button onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }))}>−</button><span>{item.quantity}</span><button onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }))}>+</button></div><button className="remove-button" onClick={() => dispatch(removeFromCart(item.id))}>Xả bỏ</button></article>)}</div><aside className="summary"><h2>Tổng kết giao dịch</h2><div><span>Linh thạch tạm tính</span><strong>{total.toLocaleString('vi-VN', { style: 'currency', currency: 'USD' })}</strong></div><div><span>Truyền tống</span><strong>Miễn phí</strong></div><hr /><div className="summary-total"><span>Tổng linh thạch</span><strong>{total.toLocaleString('vi-VN', { style: 'currency', currency: 'USD' })}</strong></div><Link className="primary-button checkout-link" to="/checkout">Tiến hành giao dịch</Link></aside></div></section>
}
