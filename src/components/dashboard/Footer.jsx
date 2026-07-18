import React from 'react'
import 'remixicon/fonts/remixicon.css'

const Footer = () => {
  return (
    <div className='flex flex-col md:flex-row items-center justify-between px-5 md:px-10 py-6 border-t border-zinc-900 mt-10 gap-4 md:gap-0'>
      
      <div className='flex flex-wrap justify-center items-center gap-3 text-sm text-gray-500'>
        <span>Developed by <span className='font-bold text-gray-400'>Krish Sharma</span></span>
        <a href="https://github.com/krisharma955" target="_blank" rel="noopener noreferrer">
          <i className='ri-github-fill text-lg hover:text-white transition-colors'></i>
        </a>
        <a href="https://x.com/krisharma_955" target="_blank" rel="noopener noreferrer">
          <i className='ri-twitter-x-fill text-lg hover:text-white transition-colors'></i>
        </a>
      </div>

      <div className='text-sm text-gray-500'>
        © 2026 NotesIO. All rights reserved.
      </div>

    </div>
  )
}

export default Footer