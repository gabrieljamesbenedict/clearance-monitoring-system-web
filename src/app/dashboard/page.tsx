"use client" // remove this in the future

import React, { useEffect, useState } from 'react'
import { me, User } from '../service/AuthService'
import { Clearance } from '../service/ClearanceService';
import ClearanceTable from '../components/ClearanceTable';
import ClearanceTableRow from '../components/ClearanceTableRow';
import PrimaryButton from '../components/PrimaryButton';
import Link from 'next/link';



export const fakeClearances: Clearance[] = [
  {
    clearanceId: 1,
    purpose: "Library Clearance",
    academicYear: "AY2425",
    semester: "1st Term",
    status: "PENDING",
    createAt: "2024-08-15T09:00:00Z"
  },
  {
    clearanceId: 2,
    purpose: "Accounting Clearance",
    academicYear: "AY2425",
    semester: "2nd Term",
    status: "APPROVED",
    createAt: "2025-01-20T10:30:00Z"
  },
  {
    clearanceId: 3,
    purpose: "Dormitory Clearance",
    academicYear: "AY2425",
    semester: "3rd Term",
    status: "REJECTED",
    createAt: "2025-06-05T14:15:00Z"
  },
  {
    clearanceId: 4,
    purpose: "Registrar Clearance",
    academicYear: "AY2526",
    semester: "1st Term",
    status: "PENDING",
    createAt: "2025-08-12T08:45:00Z"
  },
  {
    clearanceId: 5,
    purpose: "Clinic Clearance",
    academicYear: "AY2526",
    semester: "2nd Term",
    status: "APPROVED",
    createAt: "2026-01-18T11:00:00Z"
  },
  {
    clearanceId: 6,
    purpose: "Library Clearance",
    academicYear: "AY2526",
    semester: "3rd Term",
    status: "PENDING",
    createAt: "2026-06-10T09:20:00Z"
  },
  {
    clearanceId: 7,
    purpose: "Accounting Clearance",
    academicYear: "AY2627",
    semester: "1st Term",
    status: "COMPLETED",
    createAt: "2026-08-14T10:10:00Z"
  },
  {
    clearanceId: 8,
    purpose: "Dormitory Clearance",
    academicYear: "AY2627",
    semester: "2nd Term",
    status: "PENDING",
    createAt: "2027-01-22T13:30:00Z"
  },
  {
    clearanceId: 9,
    purpose: "Registrar Clearance",
    academicYear: "AY2627",
    semester: "3rd Term",
    status: "REJECTED",
    createAt: "2027-06-07T15:00:00Z"
  },
  {
    clearanceId: 10,
    purpose: "Clinic Clearance",
    academicYear: "AY2627",
    semester: "4th Term",
    status: "PENDING",
    createAt: "2027-09-01T09:45:00Z"
  }
];


const ClientDashboard = () => {

  const [selectedRow, setSelectedRow] = useState<Clearance | null>(null);

  return (
    <div className="flex flex-col gap-4 px-12 py-4">
      <div className="flex justify-between items-end">
        <h1 className="text-3xl">My Clearance Requests</h1>
        {/* <HintLink href="/form">Create a new Clearance Request</HintLink> */}
      </div>
      <div className="flex justify-between gap-4">
        <div className="flex-4 shadow-xl rounded-xl overflow-hidden">
          <ClearanceTable>
            {/* <ClearanceTableRow  id={0} purpose={"Hello World"} academicYear={"AY2627"} semester={"1st Term"} createdAt={"January 1, 2026"} status={"Pending"}/> */}
            {
              fakeClearances.map(c => (
                <ClearanceTableRow
                onClick={() => {
                  if (selectedRow === c) {
                    setSelectedRow(null)
                  } else {
                    setSelectedRow(c)
                  }
                }}
                selected={(selectedRow === c)}
                key={c.clearanceId}
                id={c.clearanceId}
                purpose={c.purpose}
                academicYear={c.academicYear}
                semester={c.semester}
                createdAt={c.createAt}
                status={c.status} />
              ))
            }
          </ClearanceTable>
        </div>
        <div className="flex flex-col gap-4 flex-1 bg-background-card p-4 shadow-xl rounded-xl">
          <Link href="/form">
            <PrimaryButton>New Clearance Request</PrimaryButton>
          </Link>

          {selectedRow && (
            <Link href={`/form?editing=${selectedRow.clearanceId}`}>
              <PrimaryButton>Edit Clearance Request</PrimaryButton>
            </Link>
          )}
          {!selectedRow && (
            <PrimaryButton active={false}>Edit Clearance Request</PrimaryButton>
          )}

          {selectedRow && (
            <PrimaryButton>Cancel Clearance Request</PrimaryButton>
          )}
          {!selectedRow && (
            <PrimaryButton active={false}>Cancel Clearance Request</PrimaryButton>
          )}

          <h2 className="text-xl">Sort By</h2>
          <h2 className="text-xl">Search</h2>
          <h2 className="text-xl">Filter</h2>
        </div>
      </div>
    </div>
  )
}

// id, purpose, academicYear, semester, createdAt

export default ClientDashboard