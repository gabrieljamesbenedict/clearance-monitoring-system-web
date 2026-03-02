"use client"

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation';
import Input from './Input';
import InputRowContainer from './InputRowContainer';
import Select from '../components/Select'
import Submit from './Submit';
import { getAll as getAllSchools, School } from '../service/SchoolService';
import { getAll as getAllPrograms, Program } from '../service/ProgramService';
import { StudentRegistrationRequest, registerStudent } from '../service/AuthService';

const RegisterForm = () => {

    const [lastname, setLastName] = useState("");
    const [firstname, setFirstName] = useState("");
    const [middlename, setMiddleName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [studentNumber, setStudentNumber] = useState("");
    const [chosenSchool, setChosenSchool] = useState<number | null>(-1);
    const [chosenProgram, setChosenProgram] = useState<number | null>(-1);

    const [schoolList, setSchoolList] = useState<School[]>([]);
    const [ProgramList, setProgramList] = useState<Program[]>([]);

    const [request, setRequest] = useState<StudentRegistrationRequest>({
        lastname: "",
        firstname: "",
        middlename: "",
        email: "",
        password: "",
        studentNumber: "",
        schoolId: 0,
        programId: 0,
    });

    const [error, setError] = useState<string | null>(null);

    const router = useRouter();

    useEffect(() => {
        getAllSchools().then(result => {
            setSchoolList(result)
        });
    }, []);

    useEffect(() => {
        getAllPrograms().then(result => {
            const filteredResult: Program[] = [];
            result.forEach(prog => {
                if (prog.school.schoolId === chosenSchool) {
                    filteredResult.push(prog);
                }
            });
            // alert(filteredResult);
            setProgramList(filteredResult);
        });
    }, [chosenSchool]);

    
    useEffect(() => {
        let request: StudentRegistrationRequest = {
            lastname: lastname,
            firstname: firstname,
            middlename: middlename,
            email: email,
            password: password,
            studentNumber: studentNumber,
            schoolId: chosenSchool!,
            programId: chosenProgram!,
        };
        setRequest(request);
    }, [lastname, firstname, middlename, email, password, studentNumber, chosenSchool, chosenProgram]);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError(null);
        registerStudent(request)
            .then(result => {
                alert("Register Successul");
                router.push("/login");
            })
            .catch((err: any) => {
                setError(err.message);
            });
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
                <Select placeholder={"Select your school"}
                    value={chosenSchool}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                        const value = e.target.value;
                        setChosenSchool(value ? Number(value) : null);
                    }}
                >
                    {schoolList.map(school => (<option key={school.schoolId} value={school.schoolId}>{school.name}</option>))}
                </Select>
                <Select placeholder={"Select your program"}
                    value={chosenProgram}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                        const value = e.target.value;
                        setChosenProgram(value ? Number(value) : null);
                    }}
                >
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
            <label className="text-center text-orange-500">{error}</label>
        </form>
    )
}

export default RegisterForm