import React from 'react'
import Card from '../components/Card'
import RegisterForm from '../components/RegisterForm'
import BodyContent from '../components/BodyContent'

const RegisterPage = () => {
  return (
    <BodyContent>
      <Card>
        <RegisterForm/>
      </Card>
    </BodyContent>
  )
}

export default RegisterPage