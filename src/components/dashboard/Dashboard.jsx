// Dashboard.jsx
import React, { useState } from 'react'
import Header from './Header'
import Toolbar from './Toolbar'
import FilterTabs from './FilterTabs'
import NotesGrid from './NotesGrid'
import Pagination from './Pagination'
import Footer from './Footer'
import NoteModal from './NoteModal'

const Dashboard = () => {

  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <div className='bg-black flex flex-col'>
      <Header />
      <Toolbar onNewNoteClick={() => setIsModalOpen(true)} />
      <FilterTabs />
      <NotesGrid />
      <Pagination />
      <Footer />

      {isModalOpen && (
        <NoteModal onClose={() => setIsModalOpen(false)} />
      )}
    </div>
  )
}

export default Dashboard