import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { getBackendOrigin } from '../api/httpClient'
import { useCurrentUser } from '../hooks/useCurrentUser'

function AdminRoute() {
  const { isAuthenticated, loading } = useCurrentUser()

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      window.location.href = `${getBackendOrigin()}/login`
    }
  }, [loading, isAuthenticated])

  if (loading || !isAuthenticated) {
    return <p className="px-4 py-10 text-center text-gray-500">確認中...</p>
  }

  return <Outlet />
}

export default AdminRoute
