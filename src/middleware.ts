import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
    const url = request.nextUrl.clone();
    const pathname = url.pathname

    const publicPaths = ["/login", "/register"];
    const atPublicRoute = publicPaths.some(p => pathname.startsWith(p));

    const cookieHeader = request.headers.get("cookie") ?? "";

    let res;
    try {
        res = await fetch("http://localhost:8080/api/auth/me", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                cookie: cookieHeader,
            }
        });
    } catch (error) {
        if (atPublicRoute) return NextResponse.next();
        url.pathname = "/login";
        return NextResponse.redirect(url);
    }

    let user = null;
    
    if (res.ok) {
        try {
            user = await res.json();
            console.log("Logged in user:", user.email, "Role:", user.role);
        } catch (e) {
            console.error("Failed to parse user json");
        }
    }

    const defaultPage = user?.role === "ROLE_EMPLOYEE" ? "/admin" : "/dashboard";

    if (atPublicRoute && res.ok) {
        url.pathname = defaultPage;
        return NextResponse.redirect(url);
    }

    if (!atPublicRoute && !res.ok) {
        url.pathname = "/login";
        return NextResponse.redirect(url);
    }

    if (url.pathname === "/") {
        url.pathname = res.ok ? defaultPage : "/login";
        return NextResponse.redirect(url);
    }

    if (url.pathname.startsWith("/admin") && user?.role !== "ROLE_EMPLOYEE") {
        url.pathname = "/dashboard";
        return NextResponse.redirect(url);
    }

    return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|favicon.ico).*)"]
};