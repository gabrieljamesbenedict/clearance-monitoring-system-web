import React from 'react'
import LoginForm from '../components/LoginForm'
import Card from '../components/Card'
import BodyContent from '../components/BodyContent'
import Link from 'next/link'
import HintLink from '../components/HintLink'

const LoginPage = () => {
  
  return (
    <BodyContent>
      <Card>
        <LoginForm/>
        <HintLink href="/register">Make an Account</HintLink>
      </Card>
    </BodyContent>
  )
}

export default LoginPage