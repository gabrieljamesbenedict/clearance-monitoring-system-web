import React from 'react'
import Cell from './Cell'

const AdminClearanceTable = ({children}: any) => {
  return (
    <div className="overflow-x-auto w-full">
      <table className="bg-background-card w-full text-left text-sm">
        <thead>
            <tr className="bg-primary hover:bg-primary-hover text-white">
              <Cell>ID</Cell>
              <Cell>Name</Cell>
              <Cell>Student No.</Cell>
              <Cell>Program</Cell>
              <Cell>Purpose</Cell>
              <Cell>A.Y. / Sem</Cell>
              <Cell>Date</Cell>
              <Cell>Status</Cell>
            </tr>
          </thead>
          <tbody>
            {children}
          </tbody>
      </table>
    </div>
  )
}

export default AdminClearanceTable