import React from 'react'
import LoginLeftContent from './LoginLeftContent'
import LoginRightContent from './LoginRightContent'
import Background from '../Background'

const LoginForm = () => {
  return (
    <div className='relative w-screen h-screen overflow-hidden bg-black'>
      
      <div className='absolute inset-0 z-0'>
        <Background />
      </div>

      <div className='relative z-10 flex items-stretch h-screen'>
        <div className='hidden md:block md:w-1/2 lg:w-2/3 h-full'>
          <LoginLeftContent />
        </div>
        <div className='w-full md:w-1/2 lg:w-1/3 h-full'>
          <LoginRightContent />
        </div>
      </div>

    </div>
  )
}

export default LoginForm