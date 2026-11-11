import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { clearCart, selectCartItems, selectCartTotal } from '../features/cart/cartSlice'

export default function CheckoutPage() {
  const items = useAppSelector(selectCartItems)
  const total = useAppSelector(selectCartTotal)
  const dispatch = useAppDispatch()
  const [placed, setPlaced] = useState(false)
  const placeOrder = () => { dispatch(clearCart()); setPlaced(true) }
  if (placed) return <div className="success-page"><div className="success-icon">✓</div><h1>Giao dịch viên mãn!</h1><p>Đa tạ đạo hữu đã ghé Phàm Trần Các. Bổn các sẽ sớm truyền tống bảo vật đến tận động phủ của đạo hữu.</p><Link className="primary-button" to="/">Quay về Phàm Trần Các</Link></div>
  if (!items.length) return <div className="empty-page"><h1>Chưa có bảo vật để giao dịch</h1><p>Đạo hữu hãy thu bảo vật vào túi càn khôn trước.</p><Link className="primary-button" to="/">Tầm bảo</Link></div>
  return <section className="checkout-page"><h1>Giao dịch</h1><div className="checkout-layout"><form className="checkout-form" onSubmit={(event) => { event.preventDefault(); placeOrder() }}><h2>Thông tin truyền tống</h2><div className="form-grid"><label>Đạo hiệu<input required placeholder="Thanh Vân Tử" /></label><label>Truyền âm phù<input required type="tel" placeholder="090 123 4567" /></label></div><label>Địa chỉ động phủ<input required placeholder="Sơn môn, đỉnh núi, động phủ..." /></label><label>Lời nhắn <span>(tuỳ chọn)</span><textarea rows={4} placeholder="Truyền âm cho chưởng quỹ..." /></label><h2>Phương thức giao dịch</h2><label className="radio-label"><input type="radio" name="payment" defaultChecked /> Nhận bảo vật rồi trả linh thạch</label><button className="primary-button" type="submit">Chốt giao dịch</button></form><aside className="summary"><h2>Bảo vật đã chọn ({items.length})</h2>{items.map((item) => <div className="order-row" key={item.id}><span>{item.title} × {item.quantity}</span><strong>{(item.price * item.quantity).toLocaleString('vi-VN', { style: 'currency', currency: 'USD' })}</strong></div>)}<hr /><div className="summary-total"><span>Tổng linh thạch</span><strong>{total.toLocaleString('vi-VN', { style: 'currency', currency: 'USD' })}</strong></div></aside></div></section>
}
