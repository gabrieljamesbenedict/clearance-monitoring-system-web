export interface Clearance {
    clearanceId?: number,
    studentName: string,
    studentNumber: number,
    studentProgram: string,
    purposeOfClearance: string,
    date: String
}

const BASE_URL: string = "http://localhost:8080/api"

export async function getAllClearances(): Promise<Clearance[]> {
    const res = await fetch(`${BASE_URL}/clearances`);
    if (!res.ok) {
        throw new Error(`Failed to fetch clearances: ${res.status}`);
    } 
    return await res.json();
}

export async function getClearanceById(id: number): Promise<Clearance> {
    const res = await fetch(`${BASE_URL}/clearances/${id}`);
    if (!res.ok) {
        throw new Error(`Failed to fetch clearance: ${res.status}`);
    }  
    return await res.json();
}

export async function createClearance(clearance: Clearance) {
    const res = await fetch(`${BASE_URL}/clearances`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(clearance)
    });
    if (!res.ok) {
        throw new Error(`Failed to create clearance: ${res.status} ${res.statusText}`);
    }
}

export async function updateClearance(id: number, clearance: Clearance) {
    const res = await fetch(`${BASE_URL}/clearances/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(clearance)
    });
    if (!res.ok) {
        throw new Error(`Failed to update clearance: ${res.status} ${res.statusText}`);
    }
}

export async function deleteClearance(id: number) {
    const res = await fetch(`${BASE_URL}/clearances/${id}`, {
        method: "DELETE"
    });
    if (!res.ok) {
        throw new Error(`Failed to update clearance: ${res.status} ${res.statusText}`);
    }
}