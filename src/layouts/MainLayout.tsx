import { Outlet } from 'react-router-dom'
import Header from '../components/Header'

export default function MainLayout() {
  return (
    <div className="app-shell">
      <Header />
      <main className="main-content"><Outlet /></main>
      <footer>© {new Date().getFullYear()} Phàm Trần Các · Cầu đạo vấn tâm, giao dịch công bằng.</footer>
    </div>
  )
}
