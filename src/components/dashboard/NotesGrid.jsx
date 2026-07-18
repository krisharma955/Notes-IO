import React from 'react'
import NoteCard from './NoteCard'
import EmptyState from './EmptyState'

/**
 * NotesGrid
 *
 * Props:
 *   notes     — array of mapped note objects (preview + timeAgo already computed)
 *   loading   — boolean; suppresses render during initial fetch to avoid empty flash
 *   emptyType — EmptyState type: 'notes' | 'search' | 'archived'
 *   onPin     — (noteId) => void
 *   onArchive — (noteId) => void
 *   onDelete  — (noteId) => void
 *   onEdit    — (note) => void
 */
const NotesGrid = ({ notes = [], loading = false, emptyType = 'notes', onPin, onArchive, onDelete, onEdit, onNewNoteClick }) => {

  if (loading && notes.length === 0) return null

  if (notes.length === 0) {
    return <EmptyState type={emptyType} onNewNoteClick={onNewNoteClick} />
  }

  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 px-5 md:px-10'>
      {notes.map((note) => (
        <NoteCard
          key={note.id}
          note={note}
          onPin={onPin}
          onArchive={onArchive}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </div>
  )
}

export default NotesGrid