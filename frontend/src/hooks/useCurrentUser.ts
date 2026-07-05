import { useEffect, useState } from 'react'

interface CurrentUserState {
  isAuthenticated: boolean
  loading: boolean
}

export function useCurrentUser(): CurrentUserState {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let ignore = false
    const baseUrl = import.meta.env.VITE_API_BASE_URL

    fetch(`${baseUrl}/user`, { credentials: 'include' })
      .then((res) => {
        if (ignore) return
        setIsAuthenticated(res.ok)
      })
      .catch(() => {
        if (ignore) return
        setIsAuthenticated(false)
      })
      .finally(() => {
        if (ignore) return
        setLoading(false)
      })

    return () => {
      ignore = true
    }
  }, [])

  return { isAuthenticated, loading }
}
