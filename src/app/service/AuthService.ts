// Role enum matching your Java Role enum
export type Role = 'STUDENT' | 'EMPLOYEE';

export interface User {
  userId: number;
  firstname: string;
  middlename: string;
  lastname: string;
  email: string;
  role: Role;
}

export const me = async (): Promise<User>  => {
    const res = await fetch("http://localhost:8080/api/auth/me", {
        method: "POST",
        credentials: "include",
        headers: {"Content-Type": "application/json"}
    });

    if (!res.ok) {
        throw new Error(`Request failed: ${res.status}`);
    }
    
    return await res.json();
}