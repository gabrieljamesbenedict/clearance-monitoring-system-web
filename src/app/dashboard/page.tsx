"use client" // remove this in the future

import React, { useEffect, useState } from 'react'
import { me, User } from '../service/AuthService'
import { Clearance } from '../service/ClearanceService';
import ClearanceTable from '../components/ClearanceTable';
import ClearanceTableRow from '../components/ClearanceTableRow';
import PrimaryButton from '../components/PrimaryButton';
import Link from 'next/link';

const ClientDashboard = () => {

  const [user, setUser] = useState<User | null>(null);

  return (
    <div className="flex flex-col gap-4 px-12 py-4">
      <div className="flex justify-between items-end">
        <h1 className="text-3xl">My Clearance Requests</h1>
        {/* <HintLink href="/form">Create a new Clearance Request</HintLink> */}
      </div>
      <div className="flex justify-between gap-4">
        <div className="flex-4 shadow-xl rounded-xl overflow-hidden">
          <ClearanceTable>
            <ClearanceTableRow id={0} purpose={"Hello World"} academicYear={"AY2627"} semester={"1st Term"} createdAt={"January 1, 2026"} status={"Pending"} />
          </ClearanceTable>
        </div>
        <div className="flex-1 bg-background-card p-4 shadow-xl rounded-xl">
          <Link href="/form">
            <PrimaryButton>New Clearance Request</PrimaryButton>
          </Link>
        </div>
      </div>
    </div>
  )
}

// id, purpose, academicYear, semester, createdAt

export default ClientDashboard