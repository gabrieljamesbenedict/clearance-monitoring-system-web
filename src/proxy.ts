import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import path from 'path';

export function proxy(request: NextRequest) {
    const cookie = request.cookies.get("JSESSIONID");
    const url = request.nextUrl.clone();

    const publicPaths = ["/login", "/register"];
    const pathname = request.nextUrl.pathname;

    if (pathname === "/") {
        url.pathname = "/dashboard";
        return NextResponse.redirect(url);
    }

    if (publicPaths.some(path => pathname.startsWith(path))) {
        if (cookie) {
            url.pathname = "/dashboard";
            return NextResponse.redirect(url);
        }
    }

    return NextResponse.next();
}

export const config = {
  matcher: "/:path*",
};