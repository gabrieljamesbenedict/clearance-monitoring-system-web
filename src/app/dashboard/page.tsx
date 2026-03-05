"use client" // remove this in the future

import React, { useEffect, useState } from 'react'
import { me, User } from '../service/AuthService'
import { Clearance } from '../service/ClearanceService';
import ClearanceTable from '../components/ClearanceTable';
import ClearanceTableRow from '../components/ClearanceTableRow';
import PrimaryButton from '../components/PrimaryButton';
import Link from 'next/link';
import Input from '../components/Input';
import { fakeClearances } from './fakeClearance';






const ClientDashboard = () => {

  const [selectedRow, setSelectedRow] = useState<Clearance | null>(null);
  const [searchValue, setSearchValue] = useState<string | null>(null);

  const [clearanceList, setClearanceList] = useState<Clearance[]>([]);

  useEffect(() => {

    setClearanceList(searchValue ? fakeClearances.filter(clearance => clearance.purpose.toUpperCase().includes(searchValue.toUpperCase())) : fakeClearances);

  },[searchValue]);

  return (
    <div className="flex flex-col gap-4 px-12 py-4">
      <div className="flex justify-between items-end">
        <h1 className="text-3xl">My Clearance Requests</h1>
      </div>
      <div className="flex justify-between gap-4">
        <div className="flex-4 shadow-xl rounded-xl overflow-hidden">
          <ClearanceTable>
            {
              clearanceList.map(c => (
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
          <div className="flex flex-col gap-2">
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
          </div>

          <div>
            <h2 className="text-xl">Search</h2>
            <Input type="text" value={searchValue} onChange={(e: any) => setSearchValue(e.target.value)}/>
          </div>
          

          <h2 className="text-xl">Sort By</h2>
          <h2 className="text-xl">Filter</h2>
        </div>
      </div>
    </div>
  )
}

// id, purpose, academicYear, semester, createdAt

export default ClientDashboard