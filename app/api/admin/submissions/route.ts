import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'
import { withTimeout } from '@/lib/with-timeout'

export const dynamic = 'force-dynamic'

const DB_TIMEOUT_MS = 8000

// GET all submissions
export async function GET() {
  try {
    const session = await getServerSession(authOptions)

    if (!session || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const submissions = await withTimeout(
      prisma.contactSubmission.findMany({ orderBy: { createdAt: 'desc' } }),
      DB_TIMEOUT_MS,
      'submissions list'
    )

    return NextResponse.json({ submissions })
  } catch (error) {
    console.error('Error fetching submissions:', error)
    return NextResponse.json({ error: 'Failed to fetch submissions' }, { status: 500 })
  }
}

// PATCH update submission (status or notes)
export async function PATCH(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { id, status, notes } = body

    if (!id) {
      return NextResponse.json({ error: 'Submission ID is required' }, { status: 400 })
    }

    const updateData: { status?: string; notes?: string } = {}
    if (status !== undefined) updateData.status = status
    if (notes !== undefined) updateData.notes = notes

    const submission = await withTimeout(
      prisma.contactSubmission.update({ where: { id }, data: updateData }),
      DB_TIMEOUT_MS,
      'submission update'
    )

    return NextResponse.json({ submission })
  } catch (error) {
    console.error('Error updating submission:', error)
    return NextResponse.json({ error: 'Failed to update submission' }, { status: 500 })
  }
}
