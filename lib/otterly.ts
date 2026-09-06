interface OtterlyLeadParams {
  name: string
  email: string
  message: string
}

const OTTERLY_TIMEOUT_MS = 5000

export async function notifyOtterlyOfLead({ name, email, message }: OtterlyLeadParams) {
  const apiUrl = process.env.OTTERLY_API_URL
  const apiKey = process.env.OTTERLY_API_KEY
  if (!apiUrl || !apiKey) {
    console.warn('Otterly integration not configured; skipping lead sync')
    return { success: false, error: 'not_configured' }
  }

  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), OTTERLY_TIMEOUT_MS)

  try {
    const response = await fetch(`${apiUrl}/api/v1/leads`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({ name, email, message, source: 'ericfletcher.xyz' }),
      signal: controller.signal,
    })

    if (!response.ok) {
      const error = await response.text()
      console.error('Otterly lead sync failed:', error)
      return { success: false, error }
    }

    return { success: true }
  } catch (error) {
    console.error('Error syncing lead to Otterly:', error)
    return { success: false, error }
  } finally {
    clearTimeout(timeout)
  }
}
