import { ResponseCookies, RequestCookies } from 'next/dist/server/web/spec-extension/cookies';
import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import { getAccessToken, getRefreshToken } from './app/lib/actions';
import { verifyToken } from './app/lib/utils';



export async function middleware(req: NextRequest) {
    const accessToken = await getAccessToken();
    const refreshToken = await getRefreshToken();

    if ((req.nextUrl.pathname === '/login' || req.nextUrl.pathname === '/register') && accessToken && refreshToken) {
        return NextResponse.redirect('http://localhost:3000/user');
    }

    if (req.nextUrl.pathname !== '/login' && req.nextUrl.pathname !== '/register' && req.nextUrl.pathname !== '/') {
        if (!accessToken || !refreshToken) {
            const response = NextResponse.redirect('http://localhost:3000/login')
            response.cookies.delete('access_token')
            response.cookies.delete('refresh_token')
            return response
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
                response.cookies.set('access_token', newAccessToken, {
                    maxAge: 60 * 60 * 24 * 30,
                    path: '/',
                    sameSite: 'strict',
                    secure: true,
                })
                response.cookies.set('refresh_token', newRefreshToken, {
                    maxAge: 60 * 60 * 24 * 30,
                    path: '/',
                    sameSite: 'strict',
                    secure: true,
                    httpOnly: true,
                })
                applySetCookie(req, response)
                return response
            }
            const response = NextResponse.redirect('http://localhost:3000/login')
            response.cookies.delete('access_token')
            response.cookies.delete('refresh_token')
            return response
        }

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

// export const config = {
//     matcher: [
//         '/user',
//     ],
// }

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
}