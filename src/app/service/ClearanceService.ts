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

const getAllStudentClearance = async (): Promise<Clearance[]> => {
    const res = await fetch(`http://localhost:8080/api/clearances`, {
        method: "GET",
        credentials: "include",
        headers: {"Content-Type": "application/json"}
    });

    if (!res.ok) {
        throw new Error(`Request failed: ${res.status}`);
    }

    return await res.json();
}

const getStudentClearance = async (id: number): Promise<Clearance> => {
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