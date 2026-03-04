import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function proxy(request: NextRequest) {
    const url = request.nextUrl.clone();
    const pathname = url.pathname

    const publicPaths = ["/login", "/register"];
    const atPublicRoute = publicPaths.some(p => pathname.startsWith(p));

    const cookieHeader = request.headers.get("cookie") ?? "";

    const res = await fetch("http://localhost:8080/api/auth/me", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            cookie: cookieHeader,
        }
    });

    const user = res.json();

    console.log(JSON.stringify(user));

    if (atPublicRoute && res.ok) {
        url.pathname = "/dashboard";
        return NextResponse.redirect(url);
    }

    if (!atPublicRoute && !res.ok) {
        url.pathname = "/login";
        return NextResponse.redirect(url);
    }

    if (url.pathname === "/") {
        url.pathname = "/dashboard";
        return NextResponse.redirect(url);
    }

    return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|favicon.ico).*)"]
};