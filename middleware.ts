import { ResponseCookies, RequestCookies } from 'next/dist/server/web/spec-extension/cookies';
import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import { getAccessToken, getRefreshToken, saveAccessToken, saveRefreshToken } from './app/lib/actions';
import { verifyToken } from './app/lib/utils';
import { cookies } from 'next/headers';
import next from 'next';
import { redirect } from 'next/dist/server/api-utils';



export async function middleware(req: NextRequest) {
    const accessToken = await getAccessToken();
    const refreshToken = await getRefreshToken();

    if (!accessToken || !refreshToken) {
        return NextResponse.redirect('http://localhost:3000/login')
    }

    try {
        const decoded = await verifyToken(accessToken as string);
        return NextResponse.next();
    } catch (error) {
        const res = await fetch('http://localhost:3001/auth/refresh-tokens', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${refreshToken}`,
            },
            credentials: 'include',
        })
        if (res.ok) {
            const { access_token: newAccessToken, refresh_token: newRefreshToken } = await res.json();
            const response = NextResponse.next()
            response.cookies.set('access_token', newAccessToken)
            response.cookies.set('refresh_token', newRefreshToken)
            applySetCookie(req, response)
            return response
        }
        return NextResponse.redirect('http://localhost:3000/login')
    }
}

function applySetCookie(req: NextRequest, res: NextResponse): void {
    // parse the outgoing Set-Cookie header
    const setCookies = new ResponseCookies(res.headers);
    // Build a new Cookie header for the request by adding the setCookies
    const newReqHeaders = new Headers(req.headers);
    const newReqCookies = new RequestCookies(newReqHeaders);
    setCookies.getAll().forEach((cookie) => newReqCookies.set(cookie));
    // set “request header overrides” on the outgoing response
    NextResponse.next({
        request: { headers: newReqHeaders },
    }).headers.forEach((value, key) => {
        if (
            key === 'x-middleware-override-headers' ||
            key.startsWith('x-middleware-request-')
        ) {
            res.headers.set(key, value);
        }
    });
}

export const config = {
    matcher: [
        '/user',
    ],
}