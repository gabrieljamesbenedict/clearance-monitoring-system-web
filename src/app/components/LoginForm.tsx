"use client"

import { useState } from 'react'
import Input from './Input'
import Submit from './Submit'
import { AuthError, login, me, LoginRequest } from '../service/AuthService'
import { useRouter } from 'next/navigation';

const LoginForm = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    const [error, setError] = useState<string | null>(null);

    const router = useRouter();

async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
        setError(null);
        await login({ email, password });
        const user = await me();
        router.push(user.role === "ROLE_EMPLOYEE" ? "/admin" : "/dashboard");
    } catch (err: unknown) {
        if (err instanceof AuthError) {
            setError(err.message);
            return;
        }
        setError("Unexpected error occurred");
        console.error("Unknown error type:", err);
    }
}

async function backdoor() {
    await login({ email: "gabriel.loslos@email.com", password: "helloworld" });
    const user = await me();
    router.push(user.role === "ROLE_EMPLOYEE" ? "/admin" : "/dashboard");
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
            <button onClick={backdoor}>dev</button>
        </form>
    )
}

export default LoginForm