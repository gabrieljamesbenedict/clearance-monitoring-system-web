export interface Clearance {
    clearanceId: number;
    userId?: number;
    purpose: string;
    academicYear: string;
    semester: string;
    status: string;
    createdAt: string;
    deletedAt?: string;
}

export interface ClearanceUdpateRequest {
    clearanceId: number;
    purpose: string;
    academicYear: string;
    semester: string;
    status: string;
}

export interface ClearanceCreationRequest {
    studentId: number,
    purpose: string;
    academicYear: string;
    semester: string;
}


export const getAllStudentClearance = async (id: number): Promise<Clearance[]> => {
    const res = await fetch(`http://localhost:8080/api/clearances?studentId=${id}`, {
        method: "GET",
        credentials: "include",
        headers: {"Content-Type": "application/json"}
    });

    if (!res.ok) {
        throw new Error(`Request failed: ${res.status}`);
    }

    return await res.json();
}

export const getStudentClearance = async (id: number): Promise<Clearance> => {
    const res = await fetch(`http://localhost:8080/api/clearances/${id}`, {
        method: "GET",
        credentials: "include",
        headers: {"Content-Type": "application/json"}
    });

    if (!res.ok) {
        throw new Error(`Request failed: ${res.status}`);
    }

    return await res.json();
}

export const createClearance = async (clearance: ClearanceCreationRequest) => {
    const res = await fetch(`http://localhost:8080/api/clearances`, {
        method: "POST",
        credentials: "include",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(clearance)
    });

    if (!res.ok) {
        throw new Error(`Request failed: ${res.status}`);
    }
}

export const updateClearance = async (clearance: ClearanceUdpateRequest) => {
    const res = await fetch(`http://localhost:8080/api/clearances`, {
        method: "PUT",
        credentials: "include",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(clearance)
    });

    if (!res.ok) {
        throw new Error(`Request failed: ${res.status}`);
    }
}