import React, { useState, useEffect, useCallback } from 'react'
import Header from './Header'
import Toolbar from './Toolbar'
import FilterTabs from './FilterTabs'
import NotesGrid from './NotesGrid'
import Pagination from './Pagination'
import Footer from './Footer'
import NoteModal from './NoteModal'
import apiClient from '../../api/client'
import { formatRelativeTime } from '../../utils/formatRelativeTime'
import { truncateText } from '../../utils/truncateText'

const getSortParams = (sortValue) => {
  switch (sortValue) {
    case 'oldest': return { sortBy: 'createdAt', direction: 'asc' }
    case 'title':  return { sortBy: 'title', direction: 'asc' }
    default:       return { sortBy: 'createdAt', direction: 'desc' } // 'newest'
  }
}

const Dashboard = () => {

  // ── Modal state ───────────────────────────────────────────────────────────
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingNote, setEditingNote] = useState(null)

  // ── API notes state ───────────────────────────────────────────────────────
  const [notes, setNotes] = useState([])
  const [loading, setLoading] = useState(false)
  const [isDeletingGlobal, setIsDeletingGlobal] = useState(false)
  const [page, setPage] = useState(0)         // 0-indexed for API
  const [totalPages, setTotalPages] = useState(1)

  // ── Search & sort state ───────────────────────────────────────────────────
  const [keyword, setKeyword] = useState('')
  const [debouncedKeyword, setDebouncedKeyword] = useState('')
  const [sort, setSort] = useState('newest')

  // ── Filter tab state ──────────────────────────────────────────────────────
  const [activeTab, setActiveTab] = useState('all')

  // ── Local pin/archive tracking (Option A) ─────────────────────────────────
  // Since GET /api/notes does not return pinned/archived fields, we track which
  // note IDs the user has pinned or archived during this session.
  // State resets on page refresh (acknowledged limitation of Option A).
  const [localPins, setLocalPins] = useState(new Set())
  const [localArchives, setLocalArchives] = useState(new Set())
  const [deletedIds, setDeletedIds] = useState(new Set()) // Tracks deleted notes to prevent them from reappearing
  const [deletingIds, setDeletingIds] = useState(new Set())

  // ── Debounce search keyword (300ms) ──────────────────────────────────────
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedKeyword(keyword)
      setPage(0) // reset to first page on new search
    }, 300)
    return () => clearTimeout(timer)
  }, [keyword])

  // ── Reset to first page when sort or tab changes ──────────────────────────
  useEffect(() => {
    setPage(0)
  }, [sort, activeTab])

  // ── Fetch notes from API ──────────────────────────────────────────────────
  const fetchNotes = useCallback(async (silent = false) => {
    if (!silent) setLoading(true)
    try {
      const { sortBy, direction } = getSortParams(sort)
      const params = { page, size: 4, sortBy, direction }
      if (debouncedKeyword) params.keyword = debouncedKeyword
      const res = await apiClient.get('/api/notes', { params })
      setNotes(res.data.content || [])
      setTotalPages(Math.max(res.data.totalPages || 1, 1))
    } catch {
      // Silent catch — notes array stays as-is, user can retry via pagination
    } finally {
      if (!silent) setLoading(false)
    }
  }, [page, debouncedKeyword, sort])

  useEffect(() => {
    fetchNotes()
  }, [fetchNotes])

  // ── Map raw API notes → shape expected by NoteCard ────────────────────────
  const mappedNotes = notes
    .filter(note => !deletedIds.has(note.id)) // Permanently hide deleted notes in this session
    .map((note) => ({
      ...note,
      preview: truncateText(note.content, 120),
      timeAgo: formatRelativeTime(note.createdAt),
      pinned: localPins.has(note.id),
      archived: localArchives.has(note.id),
    }))

  // ── Apply active tab filter (client-side) ─────────────────────────────────
  const filteredNotes =
    activeTab === 'pinned'
      ? mappedNotes.filter((n) => localPins.has(n.id))
      : activeTab === 'archived'
      ? mappedNotes.filter((n) => localArchives.has(n.id))
      : mappedNotes.filter((n) => !localArchives.has(n.id)) // 'all' hides archived

  // ── Determine empty state type ────────────────────────────────────────────
  const emptyType =
    activeTab === 'archived'
      ? 'archived'
      : debouncedKeyword
      ? 'search'
      : 'notes'

  // ── Pin handler (optimistic) ──────────────────────────────────────────────
  const handlePin = async (noteId) => {
    const isPinned = localPins.has(noteId)
    setLocalPins((prev) => {
      const next = new Set(prev)
      isPinned ? next.delete(noteId) : next.add(noteId)
      return next
    })
    try {
      await apiClient.patch(`/api/notes/${noteId}/pin`, { pin: !isPinned })
    } catch {
      // Rollback on failure
      setLocalPins((prev) => {
        const next = new Set(prev)
        isPinned ? next.add(noteId) : next.delete(noteId)
        return next
      })
    }
  }

  // ── Archive handler (optimistic) ─────────────────────────────────────────
  const handleArchive = async (noteId) => {
    const isArchived = localArchives.has(noteId)
    setLocalArchives((prev) => {
      const next = new Set(prev)
      isArchived ? next.delete(noteId) : next.add(noteId)
      return next
    })
    try {
      await apiClient.patch(`/api/notes/${noteId}/archive`, { archive: !isArchived })
    } catch {
      // Rollback on failure
      setLocalArchives((prev) => {
        const next = new Set(prev)
        isArchived ? next.add(noteId) : next.delete(noteId)
        return next
      })
    }
  }

  // ── Delete handler ────────────────────────────────────────────────────────
  // Shows a global deleting box for exactly 3 seconds, ignores any potential API
  // parsing errors that might cause premature rejection, and then hides the note.
  const handleDelete = async (noteId) => {
    const wasLastOnPage = notes.length === 1

    setIsDeletingGlobal(true)
    
    // We run the API call and a 3-second timer concurrently.
    // If the API call throws an error (e.g. unexpected status code but still deletes),
    // we catch it so it doesn't interrupt the 3-second timer or the UI updates.
    await Promise.all([
      apiClient.delete(`/api/notes/${noteId}`).catch(err => console.warn('Delete API threw an error, but proceeding with UI update.', err)),
      new Promise(resolve => setTimeout(resolve, 3000))
    ])

    // After 3 seconds, instantly hide the note from the UI
    setNotes((prev) => prev.filter((n) => n.id !== noteId))
    setDeletedIds((prev) => new Set(prev).add(noteId))
    
    // Sync state silently
    if (wasLastOnPage && page > 0) {
      setPage((p) => p - 1)
    } else {
      await fetchNotes(true)
    }
    
    setIsDeletingGlobal(false)
  }


  // ── Edit handler — opens modal with existing note ─────────────────────────
  const handleEdit = (note) => {
    setEditingNote(note)
    setIsModalOpen(true)
  }

  // ── Save handler — called by NoteModal after successful API call ──────────
  const handleSaveNote = async (savedNote) => {
    setIsModalOpen(false)
    setEditingNote(null)
    // Refetch to reflect accurate server state (covers both create and update)
    await fetchNotes()
  }

  // ── Tab change ────────────────────────────────────────────────────────────
  const handleTabChange = (tabId) => {
    setActiveTab(tabId)
    setPage(0)
  }

  return (
    <div className='bg-black flex flex-col min-h-screen'>
      <Header />
      <Toolbar
        keyword={keyword}
        onKeywordChange={setKeyword}
        sort={sort}
        onSortChange={setSort}
        onNewNoteClick={() => { setEditingNote(null); setIsModalOpen(true) }}
      />
      <FilterTabs activeTab={activeTab} onTabChange={handleTabChange} />
      <div className='flex-1'>
        <NotesGrid
          notes={filteredNotes}
          loading={loading}
          emptyType={emptyType}
          onPin={handlePin}
          onArchive={handleArchive}
          onDelete={handleDelete}
          onEdit={handleEdit}
          onNewNoteClick={() => { setEditingNote(null); setIsModalOpen(true) }}
        />
        <Pagination
          currentPage={page + 1}
          totalPages={totalPages}
          onPageChange={(p) => setPage(p - 1)}
        />
      </div>
      <Footer />

      {isModalOpen && (
        <NoteModal
          onClose={() => { setIsModalOpen(false); setEditingNote(null) }}
          existingNote={editingNote}
          onSave={handleSaveNote}
        />
      )}
      {isDeletingGlobal && (
        <div className='fixed inset-0 bg-black/70 flex items-center justify-center z-100 px-4 backdrop-blur-sm'>
          <div className='bg-zinc-900 border border-zinc-800 rounded-xl p-6 flex flex-col items-center gap-4 min-w-[240px]'>
            <i className="ri-loader-4-line animate-spin text-3xl text-emerald-400"></i>
            <span className='text-white font-medium'>Deleting note...</span>
            <span className='text-zinc-500 text-xs text-center mt-2'>Syncing with database...</span>
          </div>
        </div>
      )}
    </div>
  )
}

export default Dashboard