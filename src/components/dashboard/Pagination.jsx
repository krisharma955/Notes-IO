import React from 'react'
import 'remixicon/fonts/remixicon.css'

/**
 * Pagination
 *
 * Props:
 *   currentPage  — 1-indexed current page number (for display)
 *   totalPages   — total number of pages from the API
 *   onPageChange — (page: number) => void  — called with new 1-indexed page
 */
const Pagination = ({ currentPage = 1, totalPages = 1, onPageChange }) => {

  const goPrev = () => {
    if (currentPage > 1) onPageChange && onPageChange(currentPage - 1)
  }

  const goNext = () => {
    if (currentPage < totalPages) onPageChange && onPageChange(currentPage + 1)
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