"use client"

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation';
import Input from './Input';
import InputRowContainer from './InputRowContainer';
import Select from '../components/Select'
import Submit from './Submit';
import { getAll as getAllSchools, School } from '../service/SchoolService';
import { getAll as getAllPrograms, Program } from '../service/ProgramService';

const RegisterForm = () => {

    const [lastname, setLastName] = useState("");
    const [firstname, setFirstName] = useState("");
    const [middlename, setMiddleName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [studentNumber, setStudentNumber] = useState("");
    const [schoolId, setSchoolId] = useState(-1);
    const [programId, setProgramId] = useState(-1);

    const [schoolList, setSchoolList] = useState<School[]>([]);
    const [ProgramList, setProgramList] = useState<Program[]>([]);

    const [error, setError] = useState<string | null>(null);

    const router = useRouter();

    useEffect(() => {
        getAllSchools().then(result => {
            setSchoolList(result)
        });
    }, []);

    useEffect(() => {
        getAllPrograms().then(result => {
            setProgramList(result)
        });
    }, []);

    async function handleSubmit(e: React.FormEvent) {

    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <label className="text-center text-4xl">Register</label>
            <InputRowContainer>
                <Input
                    type="text"
                    placeholder="Student Number"
                    value={studentNumber}
                    onChange={(e: any) => setStudentNumber(e.target.value)}
                />
                <Input
                    type="email"
                    placeholder="School Email"
                    value={email}
                    onChange={(e: any) => setEmail(e.target.value)}
                />
            </InputRowContainer>
            <InputRowContainer>
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
            </InputRowContainer>
            <InputRowContainer>
                <Select placeholder={"Select your school"}>
                    {schoolList.map(school => (<option key={school.schoolId} value={school.schoolId}>{school.name}</option>))}
                </Select>
                <Select placeholder={"Select your program"}>
                    {ProgramList.map(program => (<option key={program.programId} value={program.programId}>{program.name}</option>))}
                </Select>
            </InputRowContainer>
            <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e: any) => setPassword(e.target.value)}
            />
            <Input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e: any) => setConfirmPassword(e.target.value)}
            />
            <Submit />
        </form>
    )
}

export default RegisterForm