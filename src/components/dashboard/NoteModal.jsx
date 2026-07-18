import React, { useState } from 'react'
import 'remixicon/fonts/remixicon.css'

const NoteModal = ({ onClose, existingNote = null }) => {

  const [title, setTitle] = useState(existingNote?.title || '')
  const [content, setContent] = useState(existingNote?.content || '')

  return (
    <div className='fixed inset-0 bg-black/70 flex items-center justify-center z-50 px-4'>
      <div className='bg-zinc-950 border border-zinc-800 rounded-xl w-full max-w-lg p-6'>

        <div className='flex items-center justify-between mb-5'>
          <h3 className='text-white text-lg font-semibold'>
            {existingNote ? 'Edit note' : 'New note'}
          </h3>
          <i 
            onClick={onClose}
            className='ri-close-line text-zinc-500 hover:text-white cursor-pointer text-xl transition-colors'
          ></i>
        </div>

        <div className='flex flex-col gap-4'>
          <input
            type="text"
            placeholder="Note title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className='bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2.5 text-white placeholder-zinc-600 outline-none focus:border-emerald-400 transition-colors'
          />
          <textarea
            placeholder="Write your note..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={8}
            className='bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2.5 text-white placeholder-zinc-600 outline-none focus:border-emerald-400 transition-colors resize-none'
          />
        </div>

        <div className='flex justify-end gap-3 mt-6'>
          <button
            onClick={onClose}
            className='px-4 py-2 rounded-lg text-sm text-zinc-400 hover:text-white transition-colors'
          >
            Cancel
          </button>
          <button
            className='px-5 py-2 rounded-lg text-sm bg-emerald-400 hover:bg-emerald-300 text-black font-medium transition-colors'
          >
            {existingNote ? 'Save changes' : 'Create note'}
          </button>
        </div>

      </div>
    </div>
  )
}

export default NoteModal