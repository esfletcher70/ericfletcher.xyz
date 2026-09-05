const attempts = new Map<string, number[]>()

/**
 * In-memory sliding-window rate limiter. Only correct for a single persistent
 * process (this app runs via Passenger, not serverless/edge) — state doesn't
 * survive a restart and isn't shared across instances.
 */
export function checkRateLimit(key: string, limit: number, windowMs: number): boolean {
  const now = Date.now()
  const windowStart = now - windowMs
  const timestamps = (attempts.get(key) ?? []).filter((t) => t > windowStart)

  if (timestamps.length >= limit) {
    attempts.set(key, timestamps)
    return false
  }

  timestamps.push(now)
  attempts.set(key, timestamps)
  return true
}

export function getClientIp(headers: Headers | Record<string, string | string[] | undefined>): string {
  const forwardedFor =
    headers instanceof Headers
      ? headers.get('x-forwarded-for')
      : headers['x-forwarded-for']

  const value = Array.isArray(forwardedFor) ? forwardedFor[0] : forwardedFor
  return value?.split(',')[0]?.trim() || 'unknown'
}
