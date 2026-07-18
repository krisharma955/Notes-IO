import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../../context/AuthContext'

const SignupContent = () => {
  const { signup } = useAuth()
  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (password.length < 8) {
      setError('Password must be at least 8 characters long.')
      return
    }
    setLoading(true)
    try {
      await signup(name, username, password)
      navigate('/dashboard')
    } catch (err) {
      setError(
        err.response?.data?.message ||
        err.response?.data ||
        'Could not create account. Please try again.'
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='h-full w-full flex items-center justify-center px-10 overflow-y-auto py-10'>
      <div className='w-full max-w-sm'>

        <div className='mb-8'>
          <h3 className='text-3xl font-semibold text-white'>
            Create your <span className='font-serif italic text-emerald-400'>NotesIO</span> account
          </h3>
          <p className='text-zinc-500 text-sm mt-2'>
            Enter your email below to create your account
          </p>
        </div>

        {/* SignUp Form */}
        <form className='flex flex-col gap-5' onSubmit={handleSubmit}>

          <div className='flex flex-col gap-2'>
            <label className='text-sm font-medium text-white'>Name</label>
            <input 
              type="text" 
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className='bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2.5 text-white placeholder-zinc-600 outline-none focus:border-emerald-400 transition-colors'
            />
          </div>

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
            <div className='flex flex-col gap-2'>
              <label className='text-sm font-medium text-white'>Password</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className='bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2.5 text-white outline-none focus:border-emerald-400 transition-colors'
              />
            </div>
          </div>
          <p className='text-xs text-zinc-500 -mt-3'>Must be at least 8 characters long.</p>

          {error && (
            <p className='text-red-400 text-sm text-center -mt-2'>{error}</p>
          )}

          <button 
            type="submit"
            disabled={loading}
            className='bg-emerald-400 hover:bg-emerald-300 text-black font-medium rounded-lg py-2.5 mt-1 transition-colors'
          >
            {loading ? 'Creating account...' : 'Create Account'}
          </button>

        </form>

        {/* Sign in button */}
        <p className='text-center text-zinc-500 text-sm mt-6'>
          Already have an account?{' '}
          <button
            onClick={() => navigate('/login')}
            className='text-white hover:text-emerald-400 transition-colors cursor-pointer'
          >
            Login in
          </button>
        </p>

      </div>
    </div>
  )
}

export default SignupContent