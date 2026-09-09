import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { notifyOtterlyOfLead } from '@/lib/otterly'
import { checkRateLimit, getClientIp } from '@/lib/rate-limit'
import { withTimeout } from '@/lib/with-timeout'

export const dynamic = 'force-dynamic'

const RATE_LIMIT = 5
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000 // 10 minutes
const DB_TIMEOUT_MS = 8000

export async function POST(request: NextRequest) {
  try {
    const ip = getClientIp(request.headers)
    if (!checkRateLimit(`contact:${ip}`, RATE_LIMIT, RATE_LIMIT_WINDOW_MS)) {
      return NextResponse.json(
        { error: 'Too many submissions. Please try again later.' },
        { status: 429 }
      )
    }

    const body = await request.json()
    const { name, email, message } = body

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 })
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 })
    }

    const submission = await withTimeout(
      prisma.contactSubmission.create({
        data: { name, email, message, status: 'new' },
      }),
      DB_TIMEOUT_MS,
      'contact submission insert'
    )

    console.log('New contact submission:', { id: submission.id, name, email })

    // Sync the lead to Otterly. Best-effort — the submission is already saved,
    // so a failure here must never fail the user's request.
    try {
      await notifyOtterlyOfLead({ name, email, message })
    } catch (otterlyError) {
      console.error('Error syncing lead to Otterly:', otterlyError)
    }

    return NextResponse.json(
      { success: true, message: 'Your message has been sent successfully!' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error processing contact form:', error)
    return NextResponse.json(
      { error: 'Failed to process your request. Please try again.' },
      { status: 500 }
    )
  }
}
