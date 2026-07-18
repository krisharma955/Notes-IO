import React from 'react'
import Background from './Background'
import 'remixicon/fonts/remixicon.css'

const ProfilePage = () => {
  return (
    <div className='relative w-screen h-screen overflow-hidden bg-black flex items-center justify-center'>

      <div className='absolute inset-0 z-0 pointer-events-none'>
        <Background />
      </div>

      <div className='relative z-10 w-full max-w-sm px-6'>
        <div className='bg-zinc-950/90 border border-zinc-800 rounded-xl p-8 backdrop-blur-sm'>

          <div className='flex flex-col items-center text-center mb-6'>
            <div className='w-16 h-16 rounded-full border border-emerald-400 flex items-center justify-center text-2xl mb-4'>
              🏎️
            </div>
            <h3 className='text-2xl font-semibold text-white font-serif italic'>
              Your <span className='text-emerald-400'>NotesIO</span> account
            </h3>
          </div>

          <div className='flex flex-col gap-4 mb-6'>
            <div>
              <label className='text-xs text-zinc-500 uppercase tracking-wide'>Name</label>
              <p className='text-white text-sm mt-1 bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2.5'>
                Krish Sharma
              </p>
            </div>
            <div>
              <label className='text-xs text-zinc-500 uppercase tracking-wide'>Email</label>
              <p className='text-white text-sm mt-1 bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2.5'>
                krish@example.com
              </p>
            </div>
          </div>

          <button className='w-full flex items-center justify-center gap-2 border border-red-500/40 text-red-400 hover:bg-red-500/10 rounded-lg py-2.5 text-sm font-medium transition-colors'>
            <i className="ri-logout-box-line"></i>
            Logout
          </button>

        </div>
      </div>

    </div>
  )
}

export default ProfilePage