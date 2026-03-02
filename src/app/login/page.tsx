import React from 'react'
import LoginForm from '../components/LoginForm'
import Card from '../components/Card'
import BodyContent from '../components/BodyContent'

const LoginPage = () => {
  
  return (
    <BodyContent>
      <Card>
        <LoginForm/>
      </Card>
    </BodyContent>
  )
}

export default LoginPage