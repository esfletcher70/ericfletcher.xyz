const attempts = new Map<string, number[]>()

/**
 * In-memory sliding-window rate limiter. On Cloudflare Workers this is
 * per-isolate — not shared across isolates and reset on redeploy — which is an
 * acceptable weak guarantee for a low-traffic marketing site. Escalate to
 * Cloudflare WAF Rate Limiting if it's ever abused.
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

export function getClientIp(headers: Headers): string {
  return (
    headers.get('cf-connecting-ip') ||
    headers.get('x-real-ip') ||
    headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    'unknown'
  )
}
