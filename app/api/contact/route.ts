import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { sendEmail, generateContactNotificationEmail } from '@/lib/email'
import { notifyOtterlyOfLead } from '@/lib/otterly'
import { checkRateLimit, getClientIp } from '@/lib/rate-limit'

export const dynamic = 'force-dynamic'

const RATE_LIMIT = 5
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000 // 10 minutes

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

    // Validate input
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      )
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      )
    }

    // Save to database
    const submission = await prisma.contactSubmission.create({
      data: {
        name,
        email,
        message,
        status: 'new',
      },
    })

    console.log('New contact submission:', {
      id: submission.id,
      name,
      email,
      timestamp: submission.createdAt,
    })

    // Send email notification. The submission is already saved, so a failure
    // here shouldn't fail the request or prompt the user to resubmit — just log it.
    try {
      const emailContent = generateContactNotificationEmail({
        name,
        email,
        message,
        timestamp: submission.createdAt,
      })

      await sendEmail({
        to: 'hello@ericfletcher.xyz',
        subject: emailContent.subject,
        html: emailContent.html,
      })
    } catch (emailError) {
      console.error('Error sending contact notification email:', emailError)
    }

    // Sync lead to Otterly CRM. Best-effort/non-blocking, same as the email
    // notification above — a failure here must never fail the user's submission.
    try {
      await notifyOtterlyOfLead({ name, email, message })
    } catch (otterlyError) {
      console.error('Error syncing lead to Otterly:', otterlyError)
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Your message has been sent successfully!',
      },
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
