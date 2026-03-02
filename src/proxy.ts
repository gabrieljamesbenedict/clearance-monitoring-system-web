import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { me, User } from './app/service/AuthService'

export function proxy (request: NextRequest) {

    const cookie = request.headers.get("JSESSIONID");
    const url = request.nextUrl.clone();

    const publicPaths = ["/login", "/register"];
    const protectedPaths = ["/dashboard", "/form", "/admin"];

    let pathname = request.nextUrl.pathname;

    if (pathname === "/") {
        pathname = "/dashboard";
    }

    if (cookie && publicPaths.some(path => pathname.startsWith(path))) {
        url.pathname = "/dashboard";
        return NextResponse.redirect(url);
    }

    if (!cookie && protectedPaths.some(path => pathname.startsWith(path))) {
        url.pathname = "/login";
        return NextResponse.redirect(url);
    }

    return NextResponse.next();

}

export const config = {
  matcher: "/:path*",
};