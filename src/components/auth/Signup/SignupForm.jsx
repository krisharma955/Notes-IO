import React from 'react'
import SignupContent from './SignupContent'
import Background from '../Background'

const SignupForm = () => {
  return (
    <div className='relative w-screen h-screen overflow-hidden bg-black'>
      
      <div className='absolute inset-0 z-0 pointer-events-none'>
        <Background />
      </div>

      <div className='h-screen'>
        <SignupContent />
      </div>

    </div>
  )
}

export default SignupForm