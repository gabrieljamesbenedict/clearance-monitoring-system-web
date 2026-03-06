"use client"

import React, { useState } from 'react'
import Input from './Input';
import Select from './Select';
import Submit from './Submit';
import { ClearanceCreationRequest } from '../service/ClearanceService';
import { me } from '../service/AuthService';
import InputRowContainer from './InputRowContainer';

const ClearanceForm = () => {

    const [chosenPurpose, setChosenPurpose] = useState<string>("")
    const [otherPurpose, setOtherPurpose] =   useState<string>("")
    const [academicYear, setAcademicYear] =   useState<string>("")
    const [semester, setSemester] =   useState<string>("")

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
                <option value="drop">Drop</option>
                <option value="transfer">Transfer</option>
                <option value="tor">TOR</option>
                <option value="diploma">Diploma</option>
                <option value="cancellation">Cancellation</option>
                <option value="others">Others</option>
            </Select>
            {chosenPurpose === "others" &&(
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
                    <option value="AY2324">1st Term</option>
                    <option value="AY2425">2nd Term</option>
                    <option value="AY2526">3rd Term</option>
                    <option value="AY2526">4th Term</option>
                </Select>
            </InputRowContainer>
            <Submit/>
        </form>
    )
}

export default ClearanceForm