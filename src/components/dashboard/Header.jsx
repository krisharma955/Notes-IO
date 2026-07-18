import React from 'react'
import 'remixicon/fonts/remixicon.css'

const Header = () => {

  const quotes = [
    "The palest ink is better than the best memory.",
    "Write it down before it becomes a memory.",
    "A note today saves a search tomorrow.",
    "Ideas are cheap. Written ideas are assets."
  ];

  const todayQuote = quotes[Math.floor(Math.random() * quotes.length)];

  return (
    <div className='flex items-start justify-between px-10 pt-10 pb-6'>
      
      <div>
        <h2 className='font-serif italic text-5xl font-semibold text-emerald-400 leading-none'>
          NotesIO
        </h2>
        <p className='text-gray-500 text-[18px] italic mt-2 max-w-sm leading-relaxed'>
          "{todayQuote}"
        </p>
      </div>

      <div className='flex items-center gap-4'>
        <i className="ri-notification-line text-gray-400 text-2xl cursor-pointer hover:text-white transition-colors"></i>
        <button className='w-12 h-12 flex items-center justify-center border border-emerald-400 rounded-full cursor-pointer hover:bg-emerald-400/10 transition-colors'>
          <i className="ri-user-3-line text-gray-300 text-2xl"></i>
        </button>
      </div>

    </div>
  )
}

export default Header