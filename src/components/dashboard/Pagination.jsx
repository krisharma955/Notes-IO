import React, { useState } from 'react'
import 'remixicon/fonts/remixicon.css'

const Pagination = ({ totalPages = 3 }) => {

  const [currentPage, setCurrentPage] = useState(1)

  const goPrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1)
  }

  const goNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1)
  }

  return (
    <div className='flex items-center justify-center gap-4 mt-8 pb-10'>
      <i 
        onClick={goPrev}
        className={`ri-arrow-left-s-line text-xl cursor-pointer ${
          currentPage === 1 ? 'text-zinc-700 pointer-events-none' : 'text-zinc-400 hover:text-white'
        } transition-colors`}
      ></i>
      
      <span className='text-gray-300 text-sm'>
        Page {currentPage} of {totalPages}
      </span>

      <i 
        onClick={goNext}
        className={`ri-arrow-right-s-line text-xl cursor-pointer ${
          currentPage === totalPages ? 'text-zinc-700 pointer-events-none' : 'text-zinc-400 hover:text-white'
        } transition-colors`}
      ></i>
    </div>
  )
}

export default Pagination