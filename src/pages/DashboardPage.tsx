import React from 'react'
import styles from '../styles/dashboard.module.css'

const DashboardPage = () => {
  return (
    <div className={styles.pageBody}>
      <h1 className={styles.header}>Dashboard</h1>
      <table className={styles.clearanceTable}>
        <colgroup>
          <col style={{ width: "5%" }}/>
          <col style={{ width: "30%" }}/>
          <col style={{ width: "15%" }}/>
          <col style={{ width: "10%" }}/>
          <col style={{ width: "auto" }}/>
          <col/>
        </colgroup>
        <thead>
          <tr className={styles.clearanceTable__headerRow}>
            <th>ID</th>
            <th>Name</th>
            <th>Student Number</th>
            <th>Program</th>
            <th>Purpose of Clearance</th>
          </tr>
        </thead>
        <tbody>
          {/* <tr className={styles.clearanceTable__row}>
            <td>test</td>
            <td>test</td>
            <td>test</td>
            <td>test</td>
            <td>test</td>
          </tr> */}
        </tbody>
      </table>
    </div>
  )
}

export default DashboardPage