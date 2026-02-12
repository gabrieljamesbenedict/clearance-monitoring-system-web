import React from 'react'
import styles from '../styles/form.module.css'
import { Clearance, createClearance } from '../service/ClearanceService.ts'

const ClearanceFormPage = () => {

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        
        const formData = new FormData(event.currentTarget);

        const clearanceData: Clearance = {
            studentName: formData.get("studentName") as string,
            studentNumber: Number(formData.get("studentNumber") as string),
            studentProgram: formData.get("StudentProgram") as string,
            purposeOfClearance: formData.get("purposeOfClearance") as string,
        }

        createClearance(clearanceData);

    }

    return (
    <div className={styles.pageBody}>
        <h1 className={styles.header}>Clearance Request Form</h1>
        <form className={styles.formCard} onSubmit={handleSubmit}>
            <label className={styles.formCard__label}>Student Name</label>
            <input className={styles.formCard__input} name="studentName" type="text" required/>

            <label className={styles.formCard__label}>Student Number</label>
            <input className={styles.formCard__input} name="studentNumber" type="number" required/>

            <label className={styles.formCard__label}>Program</label>
            <input className={styles.formCard__input} name="StudentProgram" type="text" required/>

            <label className={styles.formCard__label}>Purpose of Clearance</label>
            <textarea className={styles.formCard__input} name="purposeOfClearance" rows={4} required/>

            <input className={styles.formCard__submit} type="submit"/>
        </form>
    </div>
    )
}

export default ClearanceFormPage