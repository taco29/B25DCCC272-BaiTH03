import { FormEvent, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

interface LocationState { from?: { pathname: string } }

export default function LoginPage() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const from = (location.state as LocationState | null)?.from?.pathname ?? '/'

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (login(username, password)) navigate(from, { replace: true })
    else setError('Đạo hiệu không được để trống và khẩu quyết phải là 123456.')
  }
  return <section className="auth-page"><form className="auth-card" onSubmit={handleSubmit}><p className="eyebrow">ĐẠO HỮU QUY VỊ</p><h1>Nhập đạo</h1><p>Nhập đạo để hoàn tất giao dịch bảo vật của đạo hữu.</p>{error && <p className="form-error" role="alert">{error}</p>}<label>Đạo hiệu<input required value={username} onChange={(event) => setUsername(event.target.value)} placeholder="Ví dụ: Thanh Vân Tử" /></label><label>Khẩu quyết<input required type="password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="123456" /></label><button className="primary-button" type="submit">Nhập đạo</button><p className="hint">Khẩu quyết thử nghiệm: <code>123456</code></p><Link to="/">← Tiếp tục tầm bảo</Link></form></section>
}
