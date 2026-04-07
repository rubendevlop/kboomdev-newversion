import {
  startTransition,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react'

import { api, getErrorMessage } from '../lib/api.js'
import { AuthContext } from './auth-context.js'

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [authReady, setAuthReady] = useState(false)

  const refreshSession = useCallback(async () => {
    try {
      const { data } = await api.get('/auth/me')
      startTransition(() => {
        setUser(data.user)
      })
    } catch (error) {
      if (error?.response?.status === 401) {
        startTransition(() => {
          setUser(null)
        })
      }
    } finally {
      setAuthReady(true)
    }
  }, [])

  useEffect(() => {
    refreshSession()
  }, [refreshSession])

  const login = useCallback(async (payload) => {
    const { data } = await api.post('/auth/login', payload)
    setUser(data.user)
    return data.user
  }, [])

  const register = useCallback(async (payload) => {
    const { data } = await api.post('/auth/register', payload)
    setUser(data.user)
    return data.user
  }, [])

  const loginWithGoogle = useCallback(async (credential) => {
    const { data } = await api.post('/auth/google', { credential })
    setUser(data.user)
    return data.user
  }, [])

  const logout = useCallback(async () => {
    await api.post('/auth/logout')
    setUser(null)
  }, [])

  const value = useMemo(
    () => ({
      user,
      authReady,
      login,
      register,
      loginWithGoogle,
      logout,
      refreshSession,
      getErrorMessage,
    }),
    [authReady, login, loginWithGoogle, logout, refreshSession, register, user],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
