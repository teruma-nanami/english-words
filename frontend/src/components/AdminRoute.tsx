import { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import { adminFetch } from '../api/httpClient'

function AdminRoute() {
  const [checked, setChecked] = useState(false)

  useEffect(() => {
    let ignore = false
    const baseUrl = import.meta.env.VITE_API_BASE_URL

    adminFetch(`${baseUrl}/user`)
      .then(() => {
        if (ignore) return
        setChecked(true)
      })
      .catch(() => {
        // 未認証時はadminFetch内でログイン画面へ遷移済み
      })

    return () => {
      ignore = true
    }
  }, [])

  if (!checked) {
    return <p className="px-4 py-10 text-center text-gray-500">確認中...</p>
  }

  return <Outlet />
}

export default AdminRoute
