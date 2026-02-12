import React from 'react'
import styles from '../styles/form.module.css'

const ClearanceFormPage = () => {

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
    }

    return (
    <div className={styles.pageBody}>
        <h1 className={styles.header}>Clearance Request Form</h1>
        <form className={styles.formCard} onSubmit={handleSubmit}>
            <label className={styles.formCard__label}>Student Name</label>
            <input className={styles.formCard__input} type="text" required/>

            <label className={styles.formCard__label}>Student Number</label>
            <input className={styles.formCard__input} type="number" required/>

            <label className={styles.formCard__label}>Program</label>
            <input className={styles.formCard__input} type="text" required/>

            <label className={styles.formCard__label}>Purpose of Clearance</label>
            <textarea className={styles.formCard__input} rows={4} required/>

            <input className={styles.formCard__submit} type="submit"/>
        </form>
    </div>
    )
}

export default ClearanceFormPage