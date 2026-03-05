import { table } from 'console'
import React from 'react'
import Cell from './Cell'

const ClearanceTable = ({children}: any) => {
  return (
    <table className="bg-background-card w-full my-4">
      <thead>
          <tr className="bg-primary-hover text-background-main">
            <Cell>ID</Cell>
            <Cell>Purpose</Cell>
            <Cell>Academic Year</Cell>
            <Cell>Semester</Cell>
            <Cell>Created At</Cell>
            <Cell>Status</Cell>
          </tr>
        </thead>
        <tbody>
          <tr>
            <Cell>0</Cell>
            <Cell>Test</Cell>
            <Cell>AY2526</Cell>
            <Cell>3rd Term</Cell>
            <Cell>January 1, 2000</Cell>
            <Cell>Testing</Cell>
          </tr>
          {children}
        </tbody>
    </table>
  )
}

export default ClearanceTable