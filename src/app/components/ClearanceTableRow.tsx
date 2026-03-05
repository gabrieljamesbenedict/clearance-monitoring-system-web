import React from 'react'
import Cell from './Cell'

const ClearanceTableRow = ({id, purpose, academicYear, semester, createdAt, status}: any) => {
  return (
    <tr>
        <Cell>{id}</Cell>
        <Cell>{purpose}</Cell>
        <Cell>{academicYear}</Cell>
        <Cell>{semester}</Cell>
        <Cell>{createdAt}</Cell>
        <Cell>{status}</Cell>
    </tr>
  )
}

export default ClearanceTableRow