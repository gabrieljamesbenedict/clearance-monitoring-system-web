import { Clearance } from "../service/ClearanceService";

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