"use client"

import React, { useState } from 'react'
import Input from './Input';
import Select from './Select';
import Submit from './Submit';

const ClearanceForm = () => {

    const [chosenPurpose, setChosenPurpose] = useState<string>("")
    const [purpose, setPurpose] =   useState<string>("")

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
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
                    value={purpose}
                    onChange={(e: any) => setPurpose(e.target.value)}
                />
            )}
            <Submit/>
        </form>
    )
}

export default ClearanceForm