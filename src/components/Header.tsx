import { Link, NavLink } from 'react-router-dom'
import { useAppSelector } from '../app/hooks'
import { selectCartCount } from '../features/cart/cartSlice'
import { useAuth } from '../contexts/AuthContext'
import { useTheme } from '../contexts/ThemeContext'

export default function Header() {
  const count = useAppSelector(selectCartCount)
  const { user, logout } = useAuth()
  const { theme, toggleTheme } = useTheme()

  return (
    <header className="site-header">
      <div className="header-inner">
        <Link className="brand" to="/">Phàm Trần Các</Link>
        <nav aria-label="Điều hướng chính">
          <NavLink to="/">Bảo vật</NavLink>
          <NavLink to="/cart">Túi càn khôn <span className="cart-badge">{count}</span></NavLink>
        </nav>
        <div className="header-actions">
          <button className="icon-button" onClick={toggleTheme} aria-label="Đổi giao diện">
            {theme === 'light' ? '☾ Nguyệt' : '☀ Nhật'}
          </button>
          {user ? (
            <>
              <span className="user-name">Đạo hữu {user.username}</span>
              <button className="text-button" onClick={logout}>Xuất quan</button>
            </>
          ) : <NavLink className="login-link" to="/login">Nhập đạo</NavLink>}
        </div>
      </div>
    </header>
  )
}
