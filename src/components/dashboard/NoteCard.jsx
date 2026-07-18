import React from 'react'
import 'remixicon/fonts/remixicon.css'

const NoteCard = ({ note, onPin, onArchive, onDelete, onEdit }) => {
  return (
    <div
      onClick={() => onEdit && onEdit(note)}
      className={`relative bg-zinc-950 border border-zinc-800 rounded-xl p-5 flex flex-col justify-between min-h-40 cursor-pointer overflow-hidden ${
        note.pinned ? 'border-l-2 border-l-emerald-400' : ''
      } ${note.isDeleting ? 'opacity-50 pointer-events-none' : ''}`}
    >
      {note.isDeleting && (
        <div className='absolute inset-0 flex items-center justify-center bg-black/40 z-10'>
          <span className='text-sm text-white font-medium flex items-center gap-2'>
            <i className="ri-loader-4-line animate-spin"></i> Deleting...
          </span>
        </div>
      )}
      
      <div>
        <div className='flex justify-between items-start'>
          <h3 className='text-white font-medium text-lg'>{note.title}</h3>
          <i
            onClick={(e) => { e.stopPropagation(); onPin && onPin(note.id) }}
            className={`ri-pushpin-line text-lg cursor-pointer ${
              note.pinned ? 'text-emerald-400' : 'text-zinc-600'
            }`}
          ></i>
        </div>
        <p className='text-gray-500 text-sm mt-2 leading-relaxed'>
          {note.preview}
        </p>
      </div>

      <div className='flex justify-between items-center mt-4 pt-3 border-t border-zinc-900 text-xs text-zinc-500'>
        <span>{note.timeAgo}</span>
        <div className='flex gap-3'>
          <i
            onClick={(e) => { e.stopPropagation(); onArchive && onArchive(note.id) }}
            className='ri-archive-line text-base cursor-pointer hover:text-white transition-colors'
          ></i>
          <i
            onClick={(e) => { e.stopPropagation(); onDelete && onDelete(note.id) }}
            className='ri-delete-bin-line text-base cursor-pointer hover:text-red-400 transition-colors'
          ></i>
        </div>
      </div>

    </div>
  )
}

export default NoteCard