export type Role = 'ROLE_STUDENT' | 'ROLE_EMPLOYEE';

export interface User {
  userId: number;
  firstname: string;
  middlename: string;
  lastname: string;
  email: string;
  role: Role;
  studentNumber?: string;
  employeeNumber?: string;
}

export interface LoginRequest {
    email: string;
    password: string;
}

export interface StudentRegistrationRequest {
    lastname: string;
    firstname: string;
    middlename: string;
    email: string;
    password: string;
    studentNumber: string;
    schoolId: number;
    programId: number;
}

export const me = async (): Promise<User>  => {
    const res = await fetch("http://localhost:8080/api/auth/me", {
        method: "GET",
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

    if (!res.ok) {
        if (res.status === 401) {
            throw new AuthError("Invalid Email or Password");
        }
        throw new Error(`Server Error: ${res.status}`);
    }

    return await res.json();
}

export const logout = async () => {
    const res = await fetch("http://localhost:8080/api/auth/logout", {
        method: "POST",
        credentials: "include"
    });
}

export const registerStudent = async (request: StudentRegistrationRequest) => {

    const res = await fetch("http://localhost:8080/api/auth/register/student", {
        method: "POST",
        credentials: "include",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(request)
    });

    const data = await res.json();

    if (res.ok) {
        return await data;
    }

    if (res.status >= 500 && res.status < 600) {
        throw new AuthError("Internal Server Error");
    }
    
    throw new Error(data.message);
}