import React from 'react'
import NoteCard from './NoteCard'
import EmptyState from './EmptyState'

const NotesGrid = () => {

  const notes = [
    {
      id: 1,
      title: 'Spring Boot notes',
      preview: 'JWT filter chain, MapStruct mappers, exception handling patterns for the auth layer...',
      timeAgo: '2 days ago',
      pinned: true,
    },
    {
      id: 2,
      title: 'Placement prep - DSA',
      preview: 'Graph traversal revision, dynamic programming pattern list, revisit sliding window...',
      timeAgo: '5 days ago',
      pinned: false,
    },
    {
      id: 3,
      title: 'Pitlane FC calendar',
      preview: 'Reel ideas for race weekend, caption drafts, posting times for peak engagement...',
      timeAgo: '1 week ago',
      pinned: false,
    },
    {
      id: 4,
      title: 'Docker deployment steps',
      preview: 'Multi-stage build, env vars for Render, healthcheck config for the API...',
      timeAgo: '2 weeks ago',
      pinned: false,
    },
  ]

  if (notes.length === 0) {
    return <EmptyState type="notes" />
  }

  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 px-10'>
      {notes.map((note) => <NoteCard key={note.id} note={note} />)}
    </div>
  )
}

export default NotesGrid