import React from 'react'
import { useNavigate } from 'react-router-dom'
import Background from '../auth/Background'
import 'remixicon/fonts/remixicon.css'
import { useAuth } from '../../context/AuthContext'

const ProfilePage = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <div className='relative w-screen h-screen overflow-hidden bg-black'>

      <div className='absolute inset-0 z-0 pointer-events-none'>
        <Background />
      </div>

      <div className='relative z-10 h-full w-full flex items-center justify-center px-6 md:px-10'>
        <div className='w-full max-w-sm'>

          <div className='mb-8'>
            <h3 className='text-3xl font-semibold text-white'>
              Your <span className='font-serif italic text-emerald-400'>NotesIO</span> account
            </h3>
            <p className='text-zinc-500 text-sm mt-2'>
              Your account details below
            </p>
          </div>

          <div className='flex flex-col gap-5'>

            <div className='flex flex-col gap-2'>
              <label className='text-sm font-medium text-white'>Name</label>
              <p className='bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2.5 text-white text-sm'>
                {user?.name || '—'}
              </p>
            </div>

            <div className='flex flex-col gap-2'>
              <label className='text-sm font-medium text-white'>Email</label>
              <p className='bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2.5 text-white text-sm'>
                {user?.username || '—'}
              </p>
            </div>

            <button
              onClick={handleLogout}
              className='flex items-center justify-center gap-2 border border-zinc-800 rounded-lg py-2.5 text-white hover:bg-red-600 transition-colors mt-2'
            >
              <i className="ri-logout-box-line"></i>
              Logout
            </button>

          </div>

        </div>
      </div>

    </div>
  )
}

export default ProfilePage