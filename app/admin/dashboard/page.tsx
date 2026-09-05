'use client'

import { useEffect, useState } from 'react'
import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import {
  LogOut,
  Mail,
  Clock,
  CheckCircle2,
  AlertCircle,
  Filter,
  Search,
  Eye,
  X,
  MessageSquare,
  Loader2,
} from 'lucide-react'
import { format } from 'date-fns'

interface ContactSubmission {
  id: string
  name: string
  email: string
  message: string
  status: string
  notes: string | null
  createdAt: string
  updatedAt: string
}

export default function AdminDashboard() {
  const sessionData = useSession()
  const session = sessionData?.data
  const status = sessionData?.status || 'loading'
  const router = useRouter()
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([])
  const [filteredSubmissions, setFilteredSubmissions] = useState<ContactSubmission[]>([])
  const [loading, setLoading] = useState(true)
  const [filterStatus, setFilterStatus] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedSubmission, setSelectedSubmission] = useState<ContactSubmission | null>(null)
  const [notes, setNotes] = useState('')
  const [savingNotes, setSavingNotes] = useState(false)

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/admin/login')
    }
  }, [status, router])

  useEffect(() => {
    if (status === 'authenticated') {
      fetchSubmissions()
    }
  }, [status])

  useEffect(() => {
    let filtered = submissions

    // Filter by status
    if (filterStatus !== 'all') {
      filtered = filtered.filter((s) => s.status === filterStatus)
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (s) =>
          s.name.toLowerCase().includes(query) ||
          s.email.toLowerCase().includes(query) ||
          s.message.toLowerCase().includes(query)
      )
    }

    setFilteredSubmissions(filtered)
  }, [submissions, filterStatus, searchQuery])

  const fetchSubmissions = async () => {
    try {
      const response = await fetch('/api/admin/submissions')
      if (response.ok) {
        const data = await response.json()
        setSubmissions(data.submissions)
      }
    } catch (error) {
      console.error('Error fetching submissions:', error)
    } finally {
      setLoading(false)
    }
  }

  const updateStatus = async (id: string, newStatus: string) => {
    try {
      const response = await fetch('/api/admin/submissions', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status: newStatus }),
      })

      if (response.ok) {
        setSubmissions((prev) =>
          prev.map((s) => (s.id === id ? { ...s, status: newStatus } : s))
        )
        if (selectedSubmission?.id === id) {
          setSelectedSubmission((prev) => prev ? { ...prev, status: newStatus } : null)
        }
      }
    } catch (error) {
      console.error('Error updating status:', error)
    }
  }

  const saveNotes = async () => {
    if (!selectedSubmission) return

    setSavingNotes(true)
    try {
      const response = await fetch('/api/admin/submissions', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: selectedSubmission.id, notes }),
      })

      if (response.ok) {
        setSubmissions((prev) =>
          prev.map((s) =>
            s.id === selectedSubmission.id ? { ...s, notes } : s
          )
        )
        setSelectedSubmission({ ...selectedSubmission, notes })
      }
    } catch (error) {
      console.error('Error saving notes:', error)
    } finally {
      setSavingNotes(false)
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'new':
        return <AlertCircle className="w-5 h-5 text-blue-600" />
      case 'read':
        return <Eye className="w-5 h-5 text-yellow-600" />
      case 'responded':
        return <CheckCircle2 className="w-5 h-5 text-green-600" />
      default:
        return <Mail className="w-5 h-5 text-gray-600" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new':
        return 'bg-blue-100 text-blue-700'
      case 'read':
        return 'bg-yellow-100 text-yellow-700'
      case 'responded':
        return 'bg-green-100 text-green-700'
      default:
        return 'bg-gray-100 text-gray-700'
    }
  }

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-blue-700" />
      </div>
    )
  }

  if (!session) {
    return null
  }

  const stats = {
    total: submissions.length,
    new: submissions.filter((s) => s.status === 'new').length,
    read: submissions.filter((s) => s.status === 'read').length,
    responded: submissions.filter((s) => s.status === 'responded').length,
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <div className="bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">CRM Dashboard</h1>
              <p className="text-sm text-gray-600 mt-1">
                Welcome, {session.user?.name || session.user?.email}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <a
                href="/"
                className="text-blue-700 hover:text-blue-800 text-sm font-medium"
              >
                View Portfolio
              </a>
              <Button
                onClick={() => signOut({ callbackUrl: '/admin/login' })}
                variant="outline"
                size="sm"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Leads</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">{stats.total}</p>
              </div>
              <Mail className="w-10 h-10 text-gray-400" />
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">New</p>
                <p className="text-3xl font-bold text-blue-700 mt-1">{stats.new}</p>
              </div>
              <AlertCircle className="w-10 h-10 text-blue-400" />
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Read</p>
                <p className="text-3xl font-bold text-yellow-600 mt-1">{stats.read}</p>
              </div>
              <Eye className="w-10 h-10 text-yellow-400" />
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Responded</p>
                <p className="text-3xl font-bold text-green-600 mt-1">
                  {stats.responded}
                </p>
              </div>
              <CheckCircle2 className="w-10 h-10 text-green-400" />
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by name, email, or message..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-gray-400" />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Status</option>
                <option value="new">New</option>
                <option value="read">Read</option>
                <option value="responded">Responded</option>
              </select>
            </div>
          </div>
        </div>

        {/* Submissions List */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          {filteredSubmissions.length === 0 ? (
            <div className="text-center py-12">
              <Mail className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">No submissions found</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Contact
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Message Preview
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredSubmissions.map((submission) => (
                    <tr
                      key={submission.id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-medium text-gray-900">
                            {submission.name}
                          </p>
                          <p className="text-sm text-gray-600">{submission.email}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm text-gray-600 line-clamp-2">
                          {submission.message}
                        </p>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center text-sm text-gray-600">
                          <Clock className="w-4 h-4 mr-1" />
                          {format(new Date(submission.createdAt), 'MMM d, yyyy')}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                            submission.status
                          )}`}
                        >
                          {getStatusIcon(submission.status)}
                          {submission.status.charAt(0).toUpperCase() +
                            submission.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Button
                          onClick={() => {
                            setSelectedSubmission(submission)
                            setNotes(submission.notes || '')
                            if (submission.status === 'new') {
                              updateStatus(submission.id, 'read')
                            }
                          }}
                          size="sm"
                          variant="outline"
                        >
                          View Details
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Detail Modal */}
      {selectedSubmission && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900">Lead Details</h2>
              <button
                onClick={() => setSelectedSubmission(null)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Contact Info */}
              <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-2">
                  Contact Information
                </h3>
                <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                  <div>
                    <span className="text-sm text-gray-600">Name:</span>
                    <p className="font-medium text-gray-900">
                      {selectedSubmission.name}
                    </p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Email:</span>
                    <p className="font-medium text-gray-900">
                      <a
                        href={`mailto:${selectedSubmission.email}`}
                        className="text-blue-700 hover:underline"
                      >
                        {selectedSubmission.email}
                      </a>
                    </p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Received:</span>
                    <p className="font-medium text-gray-900">
                      {format(
                        new Date(selectedSubmission.createdAt),
                        'MMMM d, yyyy h:mm a'
                      )}
                    </p>
                  </div>
                </div>
              </div>

              {/* Message */}
              <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-2">
                  Message
                </h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-gray-900 whitespace-pre-wrap">
                    {selectedSubmission.message}
                  </p>
                </div>
              </div>

              {/* Status Update */}
              <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-2">
                  Update Status
                </h3>
                <div className="flex gap-2">
                  <Button
                    onClick={() => updateStatus(selectedSubmission.id, 'new')}
                    size="sm"
                    variant={selectedSubmission.status === 'new' ? 'default' : 'outline'}
                  >
                    New
                  </Button>
                  <Button
                    onClick={() => updateStatus(selectedSubmission.id, 'read')}
                    size="sm"
                    variant={selectedSubmission.status === 'read' ? 'default' : 'outline'}
                  >
                    Read
                  </Button>
                  <Button
                    onClick={() =>
                      updateStatus(selectedSubmission.id, 'responded')
                    }
                    size="sm"
                    variant={
                      selectedSubmission.status === 'responded' ? 'default' : 'outline'
                    }
                  >
                    Responded
                  </Button>
                </div>
              </div>

              {/* Notes */}
              <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                  <MessageSquare className="w-4 h-4" />
                  Internal Notes
                </h3>
                <Textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Add notes about this lead, follow-up actions, etc."
                  rows={4}
                  className="w-full"
                />
                <Button
                  onClick={saveNotes}
                  disabled={savingNotes}
                  className="mt-2"
                  size="sm"
                >
                  {savingNotes ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    'Save Notes'
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
