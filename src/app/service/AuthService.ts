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

export interface LoginRequest {
    email: string;
    password: string;
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

export class AuthError extends Error {
    constructor(m: string) {
        super(m);
    }
}

export const login = async (request: LoginRequest) => {

    const formBody: URLSearchParams = new URLSearchParams();
    formBody.append("email", request.email);
    formBody.append("password", request.password);

    const res = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        credentials: "include",
        headers: {"Content-Type": "application/x-www-form-urlencoded"},
        body: formBody.toString()
    });

    if (res.status === 401) {
        throw new AuthError("Invalid Email or Password");
    }

    if (res.status === 500) {
        throw new AuthError("Server Error");
    }

    return await res.json();
}