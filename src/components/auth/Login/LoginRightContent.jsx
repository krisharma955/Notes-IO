import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../../context/AuthContext'

const LoginRightContent = () => {
  const { login } = useAuth()
  const navigate = useNavigate()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await login(username, password)
      navigate('/dashboard')
    } catch (err) {
      setError(
        err.response?.data?.message ||
        err.response?.data ||
        'Invalid email or password. Please try again.'
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='h-full w-full flex items-center justify-center px-6 md:px-10'>
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
        <form className='flex flex-col gap-5' onSubmit={handleSubmit}>
          
          <div className='flex flex-col gap-2'>
            <label className='text-sm font-medium text-white'>Email</label>
            <input 
              type="email" 
              placeholder="m@example.com"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className='bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2.5 text-white placeholder-zinc-600 outline-none focus:border-emerald-400 transition-colors'
            />
          </div>

          <div className='flex flex-col gap-2'>
            <div className='flex items-center justify-between'>
              <label className='text-sm font-medium text-white'>Password</label>
            </div>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className='bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2.5 text-white outline-none focus:border-emerald-400 transition-colors'
            />
          </div>

          {error && (
            <p className='text-red-400 text-sm text-center -mt-2'>{error}</p>
          )}

          <button 
            type="submit"
            disabled={loading}
            className='bg-emerald-400 hover:bg-emerald-300 text-black font-medium rounded-lg py-2.5 mt-1 transition-colors'
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>

        </form>

        {/* Signup link */}
        <p className='text-center text-zinc-500 text-sm mt-6'>
          Don't have an account?{' '}
          <button
            onClick={() => navigate('/signup')}
            className='text-white cursor-pointer hover:text-emerald-400 transition-colors'
          >
            Sign up
          </button>
        </p>

      </div>
    </div>
  )
}

export default LoginRightContent