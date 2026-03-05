import React from 'react'
import Cell from './Cell'
import StatusText from './StatusText';

const ClearanceTableRow = ({onClick, id, purpose, academicYear, semester, createdAt, status, selected}: any) => {
  const trStyle = (selected ? "bg-red-200 " : "hover:bg-gray-200 ") + "cursor-pointer";

  const iso = createdAt;
  const readableDate = new Date(iso).toLocaleString("en-PH", {
    year: "numeric",
    month: "short",
    day: "numeric"
  });
  const readableTime = new Date(iso).toLocaleString("en-PH", {
    hour: "2-digit",
    minute: "2-digit"
  });

  return (
    <tr
    className={trStyle}
    onClick={onClick}
    >
        <Cell>{id}</Cell>
        <Cell>{purpose}</Cell>
        <Cell>{academicYear}</Cell>
        <Cell>{semester}</Cell>
        <Cell>{readableDate}</Cell>
        <Cell>{readableTime}</Cell>
        <Cell><StatusText>{status}</StatusText></Cell>
    </tr>
  )
}

export default ClearanceTableRow