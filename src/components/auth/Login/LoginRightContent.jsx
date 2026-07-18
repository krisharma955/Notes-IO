import React from 'react'

const LoginRightContent = () => {
  return (
    <div className='h-full w-full flex items-center justify-center px-10'>
      <div className='w-full max-w-sm'>

        <div className='mb-8'>
          <h3 className='text-3xl font-semibold text-white'>
            Login to <span className='font-serif italic text-emerald-400 text-4xl'>NotesIO</span>
          </h3>
          <p className='text-zinc-500 text-sm mt-2'>
            Enter your email below to login to your account
          </p>
        </div>

        {/* Login */}
        <form className='flex flex-col gap-5'>
          
          <div className='flex flex-col gap-2'>
            <label className='text-sm font-medium text-white'>Email</label>
            <input 
              type="email" 
              placeholder="m@example.com"
              className='bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2.5 text-white placeholder-zinc-600 outline-none focus:border-emerald-400 transition-colors'
            />
          </div>

          <div className='flex flex-col gap-2'>
            <div className='flex items-center justify-between'>
              <label className='text-sm font-medium text-white'>Password</label>
            </div>
            <input 
              type="password" 
              className='bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2.5 text-white outline-none focus:border-emerald-400 transition-colors'
            />
          </div>

          <button 
            type="submit"
            className='bg-emerald-400 hover:bg-emerald-300 text-black font-medium rounded-lg py-2.5 mt-1 transition-colors'
          >
            Login
          </button>

        </form>

        {/* Signup link */}
        <p className='text-center text-zinc-500 text-sm mt-6'>
          Don't have an account?{' '}
          <button className='text-white cursor-pointer hover:text-emerald-400 transition-colors'>
            Sign up
          </button>
        </p>

      </div>
    </div>
  )
}

export default LoginRightContent