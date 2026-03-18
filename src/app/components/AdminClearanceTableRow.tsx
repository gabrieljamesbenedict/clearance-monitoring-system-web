import React from 'react'
import Cell from './Cell'
import StatusText from './StatusText';

const AdminClearanceTableRow = ({onClick, clearance, selected}: any) => {
  const trStyle = (selected ? "bg-red-200 " : "hover:bg-gray-200 ") + "cursor-pointer border-b border-gray-300";

  const iso = clearance.createdAt;
  const readableDate = new Date(iso).toLocaleString("en-PH", {
    year: "numeric", month: "short", day: "numeric", hour: "2-digit", minute: "2-digit"
  });

  return (
    <tr className={trStyle} onClick={onClick}>
        <Cell>{clearance.clearanceId}</Cell>
        <Cell>{clearance.studentName}</Cell>
        <Cell>{clearance.studentNumber}</Cell>
        <Cell>{clearance.programName}</Cell>
        <Cell>{clearance.purpose}</Cell>
        <Cell>{clearance.academicYear} - {clearance.semester}</Cell>
        <Cell>{readableDate}</Cell>
        <Cell><StatusText>{clearance.status}</StatusText></Cell>
    </tr>
  )
}

export default AdminClearanceTableRow