import { table } from 'console'
import React from 'react'
import Cell from './Cell'

const ClearanceTable = ({children}: any) => {
  return (
    <table className="bg-background-card w-full">
      <thead>
          <tr className="bg-primary-hover text-white">
            <Cell>ID</Cell>
            <Cell>Purpose</Cell>
            <Cell>Academic Year</Cell>
            <Cell>Semester</Cell>
            <Cell>Date</Cell>
            <Cell>Time</Cell>
            <Cell>Status</Cell>
          </tr>
        </thead>
        <tbody>
          {children}
        </tbody>
    </table>
  )
}

export default ClearanceTable