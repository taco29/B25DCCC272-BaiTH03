import { createContext, useContext, useState, type ReactNode } from 'react'
import type { User } from '../types'

interface AuthContextValue {
  user: User | null
  login: (username: string, password: string) => boolean
  logout: () => void
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('shopmini-user')
    return saved ? (JSON.parse(saved) as User) : null
  })

  const login = (username: string, password: string): boolean => {
    if (password !== '123456' || !username.trim()) return false
    const nextUser = { username: username.trim() }
    setUser(nextUser)
    localStorage.setItem('shopmini-user', JSON.stringify(nextUser))
    return true
  }
  const logout = () => {
    setUser(null)
    localStorage.removeItem('shopmini-user')
  }

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>
}

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth phải được dùng bên trong AuthProvider.')
  return context
}
