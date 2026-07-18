import React from 'react'
import 'remixicon/fonts/remixicon.css'

const EmptyState = ({ type = 'notes', onNewNoteClick }) => {

  const content = {
    notes: {
      icon: 'ri-sticky-note-line',
      title: 'No notes yet',
      body: 'Create your first note to get started.',
      showCta: true,
    },
    search: {
      icon: 'ri-search-line',
      title: 'No matches found',
      body: 'Try a different search term.',
      showCta: false,
    },
    archived: {
      icon: 'ri-archive-line',
      title: 'No archived notes',
      body: 'Notes you archive will show up here.',
      showCta: false,
    },
  }

  const current = content[type]

  return (
    <div className='flex flex-col items-center justify-center text-center py-20 px-10'>
      <i className={`${current.icon} text-4xl text-zinc-700 mb-4`}></i>
      <h3 className='text-white font-medium text-lg'>{current.title}</h3>
      <p className='text-zinc-500 text-sm mt-2'>{current.body}</p>
      {current.showCta && (
        <button onClick={onNewNoteClick} className='mt-6 flex items-center gap-1.5 bg-emerald-400 hover:bg-emerald-300 text-black font-medium rounded-lg px-4 py-2.5 text-sm transition-colors'>
          <i className="ri-add-line text-base"></i>
          New note
        </button>
      )}
    </div>
  )
}

export default EmptyState