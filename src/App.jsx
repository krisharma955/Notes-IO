import React from 'react'
import LoginForm from './components/auth/Login/LoginForm'
import SignupForm from './components/auth/Signup/SignupForm'
import Dashboard from './components/dashboard/Dashboard'

const App = () => {
  return (
    <div >
      <LoginForm />
      <SignupForm /> 
      <Dashboard />
    </div>
  )
}

export default App