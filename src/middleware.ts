import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
    const role = request.cookies.get('role')?.value;
    const accessToken = request.cookies.get('access_token')?.value;
    const path = request.nextUrl.pathname;

    if (path.startsWith('/auth/callback')) {
        return NextResponse.next();
    }

    if (accessToken) {
        if (path.startsWith('/auth/register') && role === 'company') {
            console.log("I am Logging in you are company");
            return NextResponse.redirect(new URL('/client/campaign', request.url));
        }
        if (path.startsWith('/auth/login') && role === 'company') {
            console.log("I am Logging in you are company");
            return NextResponse.redirect(new URL('/client/campaign', request.url));
        }

        if (path.startsWith('/admin') && role !== 'admin') {
            console.log("I am LOgging out you are not admin");
            return NextResponse.redirect(new URL('/auth/login', request.url));
        }

        if (path.startsWith('/client') && role !== 'company') {
            console.log("I am LOgging out you are not company");
            return NextResponse.redirect(new URL('/auth/login', request.url));
        }
    }
    else {
        if (path.startsWith('/client') || path.startsWith('/admin')) {
            console.log("I am LOgging out you are not logged in");
            return NextResponse.redirect(new URL('/auth/login', request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/client/:path*', '/admin/:path*'],
};
