"use client"

import React from 'react'
import Input from './Input'
import Submit from './Submit'

const LoginForm = () => {

    function handleSubmit() {

    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <label htmlFor="" className="text-center text-4xl">Login</label>
            <Input type={"email"} placeholder={"Email"}></Input>
            <Input type={"password"} placeholder={"Password"}></Input>
            <Submit/>
        </form>
    )
}

export default LoginForm