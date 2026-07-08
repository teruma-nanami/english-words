const MUTATING_METHODS = new Set(['POST', 'PUT', 'PATCH', 'DELETE'])
const OVERRIDE_METHODS = new Set(['PUT', 'PATCH', 'DELETE'])

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

  let requestMethod = method
  if (OVERRIDE_METHODS.has(method)) {
    headers.set('X-HTTP-Method-Override', method)
    requestMethod = 'POST'
  }

  const res = await fetch(url, {
    ...options,
    method: requestMethod,
    credentials: 'include',
    headers,
  })

  if (res.status === 401) {
    window.location.href = `${getBackendOrigin()}/login`
    throw new Error('認証が必要です。')
  }

  return res
}

export async function logout(): Promise<void> {
  await ensureCsrfCookie()

  const headers = new Headers()
  const token = readCookie('XSRF-TOKEN')
  if (token) {
    headers.set('X-XSRF-TOKEN', token)
  }

  await fetch(`${getBackendOrigin()}/logout`, {
    method: 'POST',
    credentials: 'include',
    redirect: 'manual',
    headers,
  })
}
