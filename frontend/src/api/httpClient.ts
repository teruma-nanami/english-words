const MUTATING_METHODS = new Set(['POST', 'PUT', 'PATCH', 'DELETE'])

export function getBackendOrigin(): string {
  const baseUrl = import.meta.env.VITE_API_BASE_URL
  return baseUrl.replace(/\/api\/?$/, '')
}

function readCookie(name: string): string | null {
  const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`))
  return match ? decodeURIComponent(match[1]) : null
}

async function ensureCsrfCookie(): Promise<void> {
  await fetch(`${getBackendOrigin()}/sanctum/csrf-cookie`, {
    credentials: 'include',
  })
}

export async function adminFetch(url: string, options: RequestInit = {}): Promise<Response> {
  const method = (options.method ?? 'GET').toUpperCase()
  const headers = new Headers(options.headers)

  if (MUTATING_METHODS.has(method)) {
    await ensureCsrfCookie()

    const token = readCookie('XSRF-TOKEN')
    if (token) {
      headers.set('X-XSRF-TOKEN', token)
    }
  }

  const res = await fetch(url, {
    ...options,
    method,
    credentials: 'include',
    headers,
  })

  if (res.status === 401) {
    window.location.href = `${getBackendOrigin()}/login`
    throw new Error('認証が必要です。')
  }

  return res
}
