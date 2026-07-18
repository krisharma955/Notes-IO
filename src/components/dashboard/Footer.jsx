import React from 'react'
import 'remixicon/fonts/remixicon.css'

const Footer = () => {
  return (
    <div className='flex items-center justify-between px-10 py-6 border-t border-zinc-900 mt-16'>
      
      <div className='flex items-center gap-4 text-sm text-gray-500'>
        <span>Developed by Krish Sharma</span>
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