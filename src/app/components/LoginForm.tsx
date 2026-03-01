"use client"

import { useState } from 'react'
import Input from './Input'
import Submit from './Submit'
import { login } from '../service/AuthService'

const LoginForm = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        try {
            setError(null)
            const user = await login({ email, password })
            console.log('Logged in user:', user)
        } catch (err: any) {
            setError(err.message)
            console.error('Login failed:', err)
        }

    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <label className="text-center text-4xl">Login</label>
            <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e: any) => setEmail(e.target.value)}
            />
                    <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e: any) => setPassword(e.target.value)}
            />
            <Submit/>
            <label className="text-center text-orange-500">{error}</label>
        </form>
    )
}

export default LoginForm