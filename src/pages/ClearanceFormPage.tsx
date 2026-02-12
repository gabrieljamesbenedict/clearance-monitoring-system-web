import React, { useEffect, useState } from 'react'
import styles from '../styles/form.module.css'
import { Clearance, createClearance } from '../service/ClearanceService.ts'

const ClearanceFormPage = () => {

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        
        const formData = new FormData(event.currentTarget);

        const clearanceData: Clearance = {
            studentLastName: formData.get("studentLastName") as string,
            studentFirstName: formData.get("studentFirstName") as string,
            studentMiddleName: formData.get("studentMiddleName") as string,
            studentNumber: Number(formData.get("studentNumber") as string),
            studentSchool: formData.get("studentSchool") as string,
            studentProgram: formData.get("StudentProgram") as string,
            academicYear: formData.get("academicYear") as string,
            semester: Number(formData.get("semester") as string),
            purposeOfClearance: formData.get("purposeOfClearance") as string
        }

        createClearance(clearanceData);

    }

    const schoolList = [
        "School of Information Technology",
        "School of Multimedia and Digital Arts",
        "E.T. Yuchengco School of Business",
        "School of Health Sciences",
        "School of Nursing"
    ]

    const soit = [
        "Computer Science",
        "Entertainment and Multimedia Computing",
        "Information Systems",
        "Information Technology",
        "Data Science"
    ]

    const smda = [
        "Broadcast Media",
        "Digital Film",
        "Multimedia Arts"
    ]

    const etysob = [
        "BS Accountancy",
        "BS Business Administration",
        "BS Business Analytics with AI",
        "BS Entrepreneurship",
        "BS Financial Management and Technology",
        "BS International Business",
        "BS Marketing",
        "BS Real Estate Management",
        "BS Accountancy with MS Business Analytics (ACMAN)",
        "BS Business Administration with MS Business Analytics (BAMAN)",
        "MS Busines Administration"
    ]

    const shs = [
        "BS Biology",
        "BS Medical Technology",
        "BS Pharmacy",
        "BS Physical Therapy",
        "BS Psychology",
        "BA Psychology",
        "BS Radiologic Technology",
        "BS Psychology - MA Psychology",
        "BA Psychology - MA Psychology",
        "MA Psychology"
    ]

    const son = [
        "BS Nursing"
    ]

    const [currentSelectedSchool, setSelectedSchool] = useState(schoolList[0])
    const [currentProgramList, setCurrentProgramList] = useState<string[]>(soit)

    function updateProgramList(school: string) {
        switch(school) {
            case "School of Information Technology":
                setCurrentProgramList(soit);
                break;
            case "School of Multimedia and Digital Arts":
                setCurrentProgramList(smda);
                break;
            case "E.T. Yuchengco School of Business":
                setCurrentProgramList(etysob);
                break;
            case "School of Health Sciences":
                setCurrentProgramList(shs);
                break;
            case "School of Nursing":
                setCurrentProgramList(son);
                break;
        }
    }

    return (
    <div className={styles.pageBody}>
        <h1 className={styles.header}>Clearance Request Form</h1>
        <form className={styles.formCard} onSubmit={handleSubmit}>

            <div className={styles.formCard__inputGroup}>
                <div>
                    <label className={styles.formCard__label}>Last Name</label>
                    <input className={styles.formCard__input} name="studentLastName" type="text" required/>
                </div>
                <div>
                    <label className={styles.formCard__label}>First Name</label>
                    <input className={styles.formCard__input} name="studentFirstName" type="text" required/>
                </div>
                <div>
                    <label className={styles.formCard__label}>Middle Name</label>
                    <input className={styles.formCard__input} name="studentMiddleName" type="text" required/>
                </div>
            </div>

            <div className={styles.formCard__inputGroup}>
                <div>
                    <label className={styles.formCard__label}>Student Number</label>
                    <input className={styles.formCard__input} name="studentNumber" type="number" required/>
                </div>
                <div>
                    <label className={styles.formCard__label}>Academic Year</label>
                    <select className={styles.formCard__input} name="academicYear" required>
                        <option>AY 20-21</option>
                        <option>AY 21-22</option>
                        <option>AY 22-23</option>
                        <option>AY 23-24</option>
                        <option>AY 24-25</option>
                        <option>AY 25-26</option>
                        <option>AY 26-27</option>
                    </select>
                </div>
                <div>
                    <label className={styles.formCard__label}>Semester</label>
                    <select className={styles.formCard__input} name="semester" required>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                    </select>
                </div>
            </div>

            <div className={styles.formCard__inputGroup}>
                <div>
                    <label className={styles.formCard__label}>School</label>
                    <select className={styles.formCard__input} name="studentSchool" required 
                    onChange={e => {
                        const school = e.target.value
                        setSelectedSchool(school)
                        updateProgramList(school)
                    }}>
                        {
                            schoolList.map(school => (
                                <option>{school}</option>
                            ))
                        }
                    </select>
                </div>
                <div>
                    <label className={styles.formCard__label}>Program</label>
                    <select className={styles.formCard__input} name="StudentProgram" >
                        {
                            currentProgramList.map(school => (
                                <option>{school}</option>
                            ))
                        }
                    </select>
                </div>
            </div>
            
            
            <div>
                <label className={styles.formCard__label}>Purpose of Clearance</label>
                <textarea className={styles.formCard__input} name="purposeOfClearance" rows={4} required/>
            </div>

            <input className={styles.formCard__submit} type="submit"/>
        </form>
    </div>
    )
}

export default ClearanceFormPage