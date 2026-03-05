"use client" // remove this in the future

import React, { useEffect, useState } from 'react'
import { Clearance, ClearanceUdpateRequest, getAllStudentClearance, updateClearance } from '../service/ClearanceService';
import { me, User } from '../service/AuthService';
import ClearanceTable from '../components/ClearanceTable';
import ClearanceTableRow from '../components/ClearanceTableRow';
import PrimaryButton from '../components/PrimaryButton';
import Link from 'next/link';
import Input from '../components/Input';
import Select from '../components/Select';


const ClientDashboard = () => {

  const [user, setUser] = useState<User | null>(null);

  const [selectedRow, setSelectedRow] = useState<Clearance | null>(null);
  const [clearanceList, setClearanceList] = useState<Clearance[]>([]);

  const [searchValue, setSearchValue] = useState<string | null>(null);
  const [sortByField, setSortByField] = useState<string | null>(null);

  const uncancellableStatus = [
    "CANCELLED", "COMPLETED", "REJECTED"
  ];

  useEffect(() => {
    me().then(
      user => {
        getAllStudentClearance(user.userId).then(list => {
          list = 
            searchValue ? 
            list.filter(clearance => clearance.purpose.toUpperCase().includes(searchValue.toUpperCase())) : 
            [...list];
          switch (sortByField) {
            case "purpose": list.sort((a,b) => a.purpose.localeCompare(b.purpose));break;
            case "academicYear": list.sort((a,b) => a.academicYear.localeCompare(b.academicYear));break;
            case "semester": list.sort((a,b) => a.semester.localeCompare(b.semester));break;
            case "date": list.sort((a,b) => a.createdAt.localeCompare(b.createdAt));break;
            case "status": list.sort((a,b) => a.status.localeCompare(b.status));break;
            default: list.sort((a,b) => a.clearanceId - b.clearanceId);break;
          }
          setClearanceList(list);
        });
      }
    );

  },[searchValue, sortByField]);

  function cancelClearance(clearance: Clearance) {
    const confirmation = confirm("Are you sure you want to cancel this clearance request?");
    if (confirmation && selectedRow) {
      selectedRow.status = "CANCELLED";
      const newClearance: ClearanceUdpateRequest = {
        clearanceId: selectedRow.clearanceId,
        purpose: selectedRow.purpose,
        academicYear: selectedRow.academicYear,
        semester: selectedRow.semester,
        status: selectedRow.status
      };
      updateClearance(newClearance).then(() => setSelectedRow(null));
    }
  }

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
                  createdAt={c.createdAt}
                  status={c.status}
                />
              ))
            }
          </ClearanceTable>
        </div>
        <div className="flex flex-col gap-4 flex-1 bg-background-card p-4 shadow-xl rounded-xl">
          <div className="flex flex-col gap-2">

            <Link href="/form">
              <PrimaryButton>New Clearance Request</PrimaryButton>
            </Link>

            <PrimaryButton
              active={!!selectedRow}
              as={selectedRow ? Link : undefined}
              href={selectedRow ? `/form?editing=${selectedRow.clearanceId}` : undefined}
            >
              Edit Clearance Request
            </PrimaryButton>
            
            <PrimaryButton
              active={!!selectedRow && !uncancellableStatus.some(status => status === selectedRow.status)}
              as={selectedRow ? Link : undefined}
              onClick={() => cancelClearance(selectedRow!)}
            >
              Cancel Clearance Request
            </PrimaryButton>
          </div>

          <div className="flex flex-col">
            <h2 className="text-xl">Search</h2>
            <Input type="text" value={searchValue} onChange={(e: any) => setSearchValue(e.target.value)}/>
          </div>

          <div className="flex flex-col">
            <h2 className="text-xl">Sort By</h2>
            <Select placeholder={"Select a field"}
              value={sortByField}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                  const value = e.target.value;
                  setSortByField(value ? String(value) : null);
              }}
            >
              <option value="purpose">Purpose</option>
              <option value="academicYear">Academic Year</option>
              <option value="semester">Semester</option>
              <option value="date">Date</option>
              <option value="status">Status</option>
            </Select>
          </div>

          <h2 className="text-xl">Filter</h2>

        </div>
      </div>
    </div>
  )
}

// id, purpose, academicYear, semester, createdAt

export default ClientDashboard