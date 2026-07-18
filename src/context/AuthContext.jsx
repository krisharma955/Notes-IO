import React, { createContext, useContext, useState, useEffect } from 'react'
import apiClient from '../api/client'

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(null)
  const [loading, setLoading] = useState(true)

  // ── On mount: rehydrate from sessionStorage ──────────────────────────────
  useEffect(() => {
    const storedToken = sessionStorage.getItem('token')
    if (storedToken) {
      setToken(storedToken)
      apiClient
        .get('/api/users/me')
        .then((res) => setUser(res.data))
        .catch(() => {
          // Token is expired or invalid
          sessionStorage.removeItem('token')
          setToken(null)
          setUser(null)
        })
        .finally(() => setLoading(false))
    } else {
      setLoading(false)
    }
  }, [])

  // ── login ────────────────────────────────────────────────────────────────
  const login = async (username, password) => {
    const res = await apiClient.post('/api/auth/login', { username, password })
    const { token: t, user: u } = res.data
    sessionStorage.setItem('token', t)
    setToken(t)
    setUser(u)
    return u
  }

  // ── signup ───────────────────────────────────────────────────────────────
  const signup = async (name, username, password) => {
    const res = await apiClient.post('/api/auth/signup', { name, username, password })
    const { token: t, user: u } = res.data
    sessionStorage.setItem('token', t)
    setToken(t)
    setUser(u)
    return u
  }

  // ── logout ───────────────────────────────────────────────────────────────
  const logout = () => {
    sessionStorage.removeItem('token')
    setToken(null)
    setUser(null)
  }

  return (
    <AuthContext.Provider
      value={{ user, token, isAuthenticated: !!token, loading, login, signup, logout }}
    >
      {children}
    </AuthContext.Provider>
  )
}

/** Convenience hook — throws if used outside AuthProvider */
export const useAuth = () => {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider')
  return ctx
}
