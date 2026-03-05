"use client" // remove this in the future

import React, { useEffect, useState } from 'react'
import { me, User } from '../service/AuthService'
import { Clearance } from '../service/ClearanceService';
import BodyContent from '../components/BodyContent';
import ClearanceTable from '../components/ClearanceTable';
import ClearanceTableRow from '../components/ClearanceTableRow';
import Link from 'next/link';
import HintLink from '../components/HintLink';

const ClientDashboard = () => {

  const [user, setUser] = useState<User | null>(null);

  return (
    <div className="px-12 py-8">
      <div className="flex justify-between items-end">
        <h1 className="text-3xl">My Clearance Requests</h1>
        <HintLink href="/form">Create a new Clearance Request</HintLink>
      </div>
      <ClearanceTable>
        <ClearanceTableRow id={0} purpose={"Hello World"} academicYear={"AY2627"} semester={"1st Term"} createdAt={"January 1, 2026"} status={"Pending"} />
      </ClearanceTable>
    </div>
  )
}

// id, purpose, academicYear, semester, createdAt

export default ClientDashboard