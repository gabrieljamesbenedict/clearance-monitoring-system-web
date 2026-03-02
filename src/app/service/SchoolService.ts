export interface School {
    schoolId: number;
    name: string;
    description: string;
}

export const getAll = async (): Promise<School[]> => {
    const res = await fetch(`http://localhost:8080/api/schools`, {
        method: "GET",
        credentials: "include",
        headers: {"Content-Type": "application/json"}
    });

    if (!res.ok) {
        throw new Error(`Request failed: ${res.status}`);
    }

    return await res.json();
}

export const get = async (id: number): Promise<School> => {
    const res = await fetch(`http://localhost:8080/api/schools/${id}`, {
        method: "GET",
        credentials: "include",
        headers: {"Content-Type": "application/json"}
    });

    if (!res.ok) {
        throw new Error(`Request failed: ${res.status}`);
    }

    return await res.json();
}