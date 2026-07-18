import React from 'react'
import 'remixicon/fonts/remixicon.css'

const Toolbar = () => {
  return (
    <div className='flex gap-3 px-10 mb-6'>

      <div className='relative flex-1'>
        <i className="ri-search-line absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"></i>
        <input 
          type="text" 
          placeholder='Search your notes'
          className='w-full bg-zinc-900 border border-zinc-800 rounded-lg pl-9 pr-4 py-2.5 text-white placeholder-gray-500 text-sm outline-none focus:border-emerald-400 transition-colors'
        />
      </div>

      <select className='bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2.5 text-gray-300 text-sm outline-none focus:border-emerald-400 transition-colors w-36'>
        <option value="newest">Newest</option>
        <option value="oldest">Oldest</option>
        <option value="title">Title A-Z</option>
      </select>

      <button className='flex items-center gap-1.5 bg-emerald-400 hover:bg-emerald-300 text-black font-medium rounded-lg px-4 py-2.5 text-sm whitespace-nowrap transition-colors'>
        <i className="ri-add-line text-base"></i>
        New note
      </button>

    </div>
  )
}

export default Toolbar