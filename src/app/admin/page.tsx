"use client"

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation';
import { me, User } from '../service/AuthService';
import { ClearanceAdmin, getAllClearances, updateClearance, ClearanceUdpateRequest } from '../service/ClearanceService';
import PrimaryButton from '../components/PrimaryButton';
import AdminClearanceTable from '../components/AdminClearanceTable';
import AdminClearanceTableRow from '../components/AdminClearanceTableRow';
import Input from '../components/Input';

import { 
  PieChart, Pie, Cell, Tooltip as RechartsTooltip, Legend, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  LineChart, Line
} from 'recharts';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const AdminDashboard = () => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const [clearanceList, setClearanceList] = useState<ClearanceAdmin[]>([]);
  const [selectedRow, setSelectedRow] = useState<ClearanceAdmin | null>(null);
  const [searchValue, setSearchValue] = useState<string>("");

  useEffect(() => {
    me().then(u => {
      if (u.role !== 'ROLE_EMPLOYEE') {
        router.push("/dashboard"); 
      } else {
        setUser(u);
        fetchData();
      }
    }).catch(() => {
      router.push("/login");
    }).finally(() => {
      setLoading(false);
    });
  }, [router]);

  const fetchData = () => {
    getAllClearances().then(list => setClearanceList(list));
    setSelectedRow(null);
  };

  if (loading && !user) return <div className="p-12 text-center text-xl">Loading Admin Dashboard...</div>;

  const filteredList = clearanceList.filter(c => 
    c.studentName.toLowerCase().includes(searchValue.toLowerCase()) || 
    c.studentNumber.includes(searchValue)
  );

  const handleUpdateStatus = (newStatus: string) => {
    if (!selectedRow) return;
    const confirmUpdate = confirm(`Are you sure you want to mark this request as ${newStatus}?`);
    
    if (confirmUpdate) {
      const updateReq: ClearanceUdpateRequest = {
        clearanceId: selectedRow.clearanceId,
        purpose: selectedRow.purpose,
        academicYear: selectedRow.academicYear,
        semester: selectedRow.semester,
        status: newStatus
      };

      updateClearance(updateReq).then(() => {
        alert(`Successfully marked as ${newStatus}`);
        fetchData(); 
      }).catch(err => alert("Failed to update status: " + err.message));
    }
  };

  const statusCounts = filteredList.reduce((acc, curr) => {
    acc[curr.status] = (acc[curr.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const pieChartData = Object.keys(statusCounts).map(key => ({
    name: key, value: statusCounts[key]
  }));

  const COLORS: Record<string, string> = { 
    PENDING: '#eab308', 
    APPROVED: '#3b82f6', 
    REJECTED: '#ef4444', 
    COMPLETED: '#22c55e', 
    CANCELLED: '#f97316' 
  };

  const purposeCounts = filteredList.reduce((acc, curr) => {
    acc[curr.purpose] = (acc[curr.purpose] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const barChartData = Object.keys(purposeCounts).map(key => ({
    purpose: key, count: purposeCounts[key]
  }));

  const dateCounts = filteredList.reduce((acc, curr) => {
    const dateStr = curr.createdAt.split('T')[0];
    acc[dateStr] = (acc[dateStr] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const lineChartData = Object.keys(dateCounts)
    .sort()
    .map(key => {
      const d = new Date(key);
      const displayDate = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      return { date: displayDate, requests: dateCounts[key] };
    });

  const handleExportCSV = () => {
    const headers = "ID,Student Name,Student No,Program,Purpose,Academic Year,Semester,Status\n";
    const rows = filteredList.map(c => 
      `${c.clearanceId},"${c.studentName}",${c.studentNumber},"${c.programName}","${c.purpose}",${c.academicYear},${c.semester},${c.status}`
    ).join("\n");

    const blob = new Blob([headers + rows], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Clearance_Report_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
  };

  const handleExportPDF = () => {
    const doc = new jsPDF();
    doc.text("Library Clearance Report", 14, 15);
    
    const tableData = filteredList.map(c => [
      c.clearanceId.toString(), 
      c.studentName, 
      c.studentNumber, 
      c.purpose, 
      `${c.academicYear} - ${c.semester}`, 
      c.status
    ]);

    autoTable(doc, {
      startY: 20,
      head: [['ID', 'Name', 'Student No.', 'Purpose', 'Term', 'Status']],
      body: tableData,
    });

    doc.save(`Clearance_Report_${new Date().toISOString().split('T')[0]}.pdf`);
  };

  return (
    <div className="flex flex-col gap-6 px-12 py-8">
      <h1 className="text-3xl font-bold">Library Admin Dashboard</h1>

      <div className="flex gap-4 w-full">
        <div className="flex-1 bg-blue-100 p-6 rounded-xl shadow border border-blue-200">
          <h3 className="text-lg font-bold text-blue-800">Total Requests</h3>
          <p className="text-3xl">{clearanceList.length}</p>
        </div>
        <div className="flex-1 bg-yellow-100 p-6 rounded-xl shadow border border-yellow-200">
          <h3 className="text-lg font-bold text-yellow-800">Pending</h3>
          <p className="text-3xl">{clearanceList.filter(c => c.status === 'PENDING').length}</p>
        </div>
        <div className="flex-1 bg-green-100 p-6 rounded-xl shadow border border-green-200">
          <h3 className="text-lg font-bold text-green-800">Approved</h3>
          <p className="text-3xl">{clearanceList.filter(c => c.status === 'APPROVED').length}</p>
        </div>
      </div>

      <div className="flex gap-4 w-full h-80">
        
        <div className="flex-1 bg-white p-4 rounded-xl shadow flex flex-col">
          <h3 className="text-md font-bold text-gray-700 mb-2">Status Breakdown</h3>
          {pieChartData.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={pieChartData} cx="50%" cy="50%" outerRadius={70} dataKey="value" label>
                  {pieChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[entry.name] || '#8884d8'} />
                  ))}
                </Pie>
                <RechartsTooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex-1 flex items-center justify-center text-gray-400">No data</div>
          )}
        </div>

        <div className="flex-1 bg-white p-4 rounded-xl shadow flex flex-col">
          <h3 className="text-md font-bold text-gray-700 mb-2">Requests by Purpose</h3>
          {barChartData.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="purpose" tick={{fontSize: 12}} />
                <YAxis allowDecimals={false} tick={{fontSize: 12}} />
                <RechartsTooltip />
                <Bar dataKey="count" fill="#E9292A" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex-1 flex items-center justify-center text-gray-400">No data</div>
          )}
        </div>

        <div className="flex-1 bg-white p-4 rounded-xl shadow flex flex-col">
          <h3 className="text-md font-bold text-gray-700 mb-2">Requests over Time</h3>
          {lineChartData.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={lineChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="date" tick={{fontSize: 12}} />
                <YAxis allowDecimals={false} tick={{fontSize: 12}} />
                <RechartsTooltip />
                <Line type="monotone" dataKey="requests" stroke="#3b82f6" strokeWidth={3} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex-1 flex items-center justify-center text-gray-400">No data</div>
          )}
        </div>

      </div>

      <div className="flex justify-between gap-4">
        <div className="flex-[3] shadow-xl rounded-xl overflow-hidden bg-white">
          <AdminClearanceTable>
            {filteredList.map(c => (
              <AdminClearanceTableRow
                key={c.clearanceId}
                clearance={c}
                selected={(selectedRow?.clearanceId === c.clearanceId)}
                onClick={() => setSelectedRow(selectedRow?.clearanceId === c.clearanceId ? null : c)}
              />
            ))}
          </AdminClearanceTable>
          {filteredList.length === 0 && <p className="p-4 text-center text-gray-500">No records found.</p>}
        </div>

        <div className="flex flex-col gap-4 flex-1 bg-background-card p-6 shadow-xl rounded-xl">
          
          <div className="flex flex-col gap-2">
            <h2 className="text-xl font-bold">Search Students</h2>
            <Input 
              type="text" 
              placeholder="Name or Student No." 
              value={searchValue} 
              onChange={(e: any) => setSearchValue(e.target.value)}
            />
          </div>

          <hr className="my-2 border-gray-300"/>

          <div className="flex flex-col gap-3">
            <h2 className="text-xl font-bold">Manage Status</h2>
            <p className="text-sm text-gray-500 mb-2">
              {selectedRow ? `Selected ID: ${selectedRow.clearanceId} (${selectedRow.studentName})` : "Select a row from the table first."}
            </p>
            <PrimaryButton active={!!selectedRow} onClick={() => handleUpdateStatus("APPROVED")}>
              Approve Request
            </PrimaryButton>
            <PrimaryButton active={!!selectedRow} onClick={() => handleUpdateStatus("REJECTED")}>
               Reject Request
            </PrimaryButton>
            <PrimaryButton active={!!selectedRow} onClick={() => handleUpdateStatus("COMPLETED")}>
               Mark Completed
            </PrimaryButton>
          </div>

          <hr className="my-2 border-gray-300"/>

          <div className="flex flex-col gap-3">
            <h2 className="text-xl font-bold">Export Reports</h2>
            <PrimaryButton active={filteredList.length > 0} onClick={handleExportCSV}>
              Export to CSV
            </PrimaryButton>
            <PrimaryButton active={filteredList.length > 0} onClick={handleExportPDF}>
              Export to PDF
            </PrimaryButton>
          </div>

        </div>
      </div>
    </div>
  )
}

export default AdminDashboard