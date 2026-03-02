export interface Program {
    programId: number;
    schoolId: number;
    name: string;
    description: string;
}

export const getAll = async (): Promise<Program[]> => {
    const res = await fetch(`http://localhost:8080/api/programs`, {
        method: "GET",
        credentials: "include",
        headers: {"Content-Type": "application/json"}
    });

    if (!res.ok) {
        throw new Error(`Request failed: ${res.status}`);
    }

    return await res.json();
}

export const get = async (id: number): Promise<Program> => {
    const res = await fetch(`http://localhost:8080/api/programs/${id}`, {
        method: "GET",
        credentials: "include",
        headers: {"Content-Type": "application/json"}
    });

    if (!res.ok) {
        throw new Error(`Request failed: ${res.status}`);
    }

    return await res.json();
}