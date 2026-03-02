"use client"

import React, { useState } from 'react'
import { useRouter } from 'next/navigation';
import Input from './Input';

const RegisterForm = () => {

// export interface StudentRegistrationRequest {
//     lastname: string;
//     firstname: string;
//     middlename: string;
//     email: string;
//     password: string;
//     studentNumber: string;
//     schoolId: number;
//     programId: number;
// }


    const [lastname, setLastName] = useState("");
    const [firstname, setFirstName] = useState("");
    const [middlename, setMiddleName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [studentNumber, setStudentNumber] = useState("");
    const [schoolId, setSchoolId] = useState(-1);
    const [programId, setProgramId] = useState(-1);

    const [error, setError] = useState<string | null>(null);

    const router = useRouter();

    async function handleSubmit(e: React.FormEvent) {

    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <label className="text-center text-4xl">Register</label>
            <div className="flex w-full">
                <Input
                    type="text"
                    placeholder="Last Name"
                    value={lastname}
                    onChange={(e: any) => setLastName(e.target.value)}
                />
                <Input
                    type="text"
                    placeholder="First Name"
                    value={firstname}
                    onChange={(e: any) => setFirstName(e.target.value)}
                />
                <Input
                    type="text"
                    placeholder="Middle Name"
                    value={middlename}
                    onChange={(e: any) => setMiddleName(e.target.value)}
                />
            </div>
        </form>
    )
}

export default RegisterForm