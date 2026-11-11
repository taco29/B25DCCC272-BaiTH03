import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return <div className="empty-page"><p className="not-found-number">404</p><h1>Lạc vào hư không</h1><p>Đạo hữu đã đi lạc vào cấm địa, nơi này không tồn tại.</p><Link className="primary-button" to="/">Hồi sơn môn</Link></div>
}
