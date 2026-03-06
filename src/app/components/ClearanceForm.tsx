"use client"

import React, { useState } from 'react'
import Input from './Input';
import Select from './Select';
import Submit from './Submit';
import { ClearanceCreationRequest, ClearanceUdpateRequest, createClearance, getStudentClearance } from '../service/ClearanceService';
import { me } from '../service/AuthService';
import InputRowContainer from './InputRowContainer';
import { useRouter } from 'next/navigation';
import { useSearchParams } from "next/navigation";

const ClearanceForm = () => {
    
    const router = useRouter();

    const [chosenPurpose, setChosenPurpose] = useState<string>("")
    const [otherPurpose, setOtherPurpose] =   useState<string>("")
    const [academicYear, setAcademicYear] =   useState<string>("")
    const [semester, setSemester] =   useState<string>("")

    const clearance: ClearanceUdpateRequest = {
        clearanceId: 0,
        purpose: '',
        academicYear: '',
        semester: '',
        status: ''
    }

    const searchParams = useSearchParams();
    const editing = searchParams.get("editing");
    const PURPOSE_VALUES = ["Drop", "Transfer", "TOR", "Diploma", "Cancellation"];

    if (editing) {
        // callback hell :(
        const clearanceId = parseInt(editing);
        me().then(u => {
            const studentId = u.userId;
            getStudentClearance(studentId, clearanceId).then(c => {
                if (PURPOSE_VALUES.includes(c.purpose)) {
                    setChosenPurpose(c.purpose);
                } else {
                    setChosenPurpose("Others");
                    setOtherPurpose(c.purpose);
                }
                setAcademicYear(c.academicYear);
                setSemester(c.semester);
            });
        });

    }


    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        const purpose = (chosenPurpose === "others") ? otherPurpose : chosenPurpose;
        const confirmation = confirm("Are you sure you want to request a clearance for " + purpose.toUpperCase());

        if (confirmation) {
            const clearance: ClearanceCreationRequest = {
                studentId: (await me()).userId,
                purpose: purpose,
                academicYear: academicYear,
                semester: semester
            }

            createClearance(clearance).then(() => {
                alert("Successfully submitted your clearance request");
                router.push("/dashboard");
            });
        }
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <label className="text-center text-4xl">Clearance Request</label>
            <Select placeholder={"Select your purpose"}
                value={chosenPurpose}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                    const value = e.target.value;
                    setChosenPurpose(String(value));
                }}
            >
                {
                    PURPOSE_VALUES.map(v => {
                        return (<option key={v} value={v}>{v}</option>)
                    })
                }
                <option value="Others">Others</option>
            </Select>
            {chosenPurpose === "Others" &&(
                <Input
                    type="text"
                    placeholder="Others"
                    value={otherPurpose}
                    onChange={(e: any) => setOtherPurpose(e.target.value)}
                />
            )}
            <InputRowContainer>
                <Select placeholder={"Select the Academic Year"}
                    value={academicYear}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                        const value = e.target.value;
                        setAcademicYear(String(value));
                    }}
                >
                    <option value="AY2324">AY2324</option>
                    <option value="AY2425">AY2425</option>
                    <option value="AY2526">AY2526</option>
                    <option value="AY2627">AY2627</option>
                    <option value="AY2728">AY2728</option>
                </Select>
                <Select placeholder={"Select the Semester"}
                    value={semester}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                        const value = e.target.value;
                        setSemester(String(value));
                    }}
                >
                    <option value="1st Term">1st Term</option>
                    <option value="2nd Term">2nd Term</option>
                    <option value="3rd Term">3rd Term</option>
                    <option value="4th Term">4th Term</option>
                </Select>
            </InputRowContainer>
            <Submit/>
        </form>
    )
}

export default ClearanceForm