import React from 'react'
import 'remixicon/fonts/remixicon.css'

const NoteCard = ({ note }) => {
  return (
    <div className={`bg-zinc-950 border border-zinc-800 rounded-xl p-5 flex flex-col justify-between min-h-38.5 ${
      note.pinned ? 'border-l-2 border-l-emerald-400' : ''
    }`}>
      
      <div>
        <div className='flex justify-between items-start'>
          <h3 className='text-white font-medium text-lg'>{note.title}</h3>
          <i className={`ri-pushpin-line text-lg ${
            note.pinned ? 'text-emerald-400' : 'text-zinc-600'
          }`}></i>
        </div>
        <p className='text-gray-500 text-sm mt-2 leading-relaxed'>
          {note.preview}
        </p>
      </div>

      <div className='flex justify-between items-center mt-4 pt-3 border-t border-zinc-900 text-xs text-zinc-500'>
        <span>{note.timeAgo}</span>
        <div className='flex gap-3'>
          <i className='ri-archive-line cursor-pointer hover:text-white transition-colors'></i>
          <i className='ri-delete-bin-line cursor-pointer hover:text-red-400 transition-colors'></i>
        </div>
      </div>

    </div>
  )
}

export default NoteCard