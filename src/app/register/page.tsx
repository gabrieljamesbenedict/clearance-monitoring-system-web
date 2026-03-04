import React from 'react'
import Card from '../components/Card'
import RegisterForm from '../components/RegisterForm'
import BodyContent from '../components/BodyContent'
import HintLink from '../components/HintLink'

const RegisterPage = () => {
  return (
    <BodyContent>
      <Card>
        <RegisterForm/>
        <HintLink href="/login">Back to Login</HintLink>
      </Card>
    </BodyContent>
  )
}

export default RegisterPage