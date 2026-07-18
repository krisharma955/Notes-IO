import React, { useState } from 'react'
import 'remixicon/fonts/remixicon.css'
import apiClient from '../../api/client'

const NoteModal = ({ onClose, existingNote = null, onSave }) => {

  const [title, setTitle] = useState(existingNote?.title || '')
  const [content, setContent] = useState(existingNote?.content || '')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSave = async () => {
    if (!title.trim()) {
      setError('Title is required.')
      return
    }
    setError('')
    setLoading(true)
    try {
      let res
      if (existingNote) {
        // PATCH /api/notes/{id}
        res = await apiClient.patch(`/api/notes/${existingNote.id}`, { title, content })
      } else {
        // POST /api/notes
        res = await apiClient.post('/api/notes', { title, content })
      }
      onSave && onSave(res.data)
    } catch (err) {
      setError(
        err.response?.data?.message ||
        err.response?.data ||
        'Failed to save note. Please try again.'
      )
    } finally {
      setLoading(false)
    }
  }

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

        {error && (
          <p className='text-red-400 text-sm mt-3 text-center'>{error}</p>
        )}

        <div className='flex justify-end gap-3 mt-6'>
          <button
            onClick={onClose}
            className='px-4 py-2 rounded-lg text-sm text-zinc-400 hover:text-white transition-colors'
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={loading}
            className='px-5 py-2 rounded-lg text-sm bg-emerald-400 hover:bg-emerald-300 text-black font-medium transition-colors'
          >
            {loading ? 'Saving...' : existingNote ? 'Save changes' : 'Create note'}
          </button>
        </div>

      </div>
    </div>
  )
}

export default NoteModal