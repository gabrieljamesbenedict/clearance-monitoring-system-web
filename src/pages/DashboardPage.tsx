import React, { useEffect, useState } from 'react'
import styles from '../styles/dashboard.module.css'
import { Clearance, getAllClearances } from '../service/ClearanceService.ts';

const DashboardPage = () => {

  const [ clearanceList, setClearanceList ] = useState<Clearance[]>([]);

  useEffect(() => {
    getAllClearances().then(clearances => setClearanceList(clearances))
  }, [])
  
  return (
    <div className={styles.pageBody}>
      <h1 className={styles.header}>Dashboard</h1>
      <table className={styles.clearanceTable}>
        <colgroup>
        </colgroup>
        <thead>
          <tr className={styles.clearanceTable__headerRow}>
            <th>ID</th>
            <th>Name</th>
            <th>Student Number</th>
            <th>School</th>
            <th>Program</th>
            <th>Academic Year</th>
            <th>Semester</th>
            <th>Purpose of Clearance</th>
          </tr>
        </thead>
        <tbody>
          {
            clearanceList.map(clearance => (
                <tr key={clearance.clearanceId}>
                  <td>{clearance.clearanceId}</td>
                  <td>{clearance.studentLastName + ' ' + clearance.studentFirstName + ' ' + clearance.studentMiddleName}</td>
                  <td>{clearance.studentNumber}</td>
                  <td>{clearance.studentSchool}</td>
                  <td>{clearance.studentProgram}</td>
                  <td>{clearance.academicYear}</td>
                  <td>{clearance.semester}</td>
                  <td>{clearance.purposeOfClearance}</td>
                </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  )
}

export default DashboardPage