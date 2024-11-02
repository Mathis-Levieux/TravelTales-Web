import {
  ResponseCookies,
  RequestCookies,
} from 'next/dist/server/web/spec-extension/cookies';
import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import { getAccessToken, getRefreshToken } from './app/lib/actions';
import { verifyToken } from './app/lib/utils';

const API_URL = process.env.API_URL;
const WEB_APP_URL = process.env.WEB_APP_URL;

export async function middleware(req: NextRequest) {
  if (
    req.nextUrl.pathname === '/login' ||
    req.nextUrl.pathname === '/register' ||
    req.nextUrl.pathname === '/'
  ) {
    const accessToken = await getAccessToken();
    const refreshToken = await getRefreshToken();
    if (accessToken && refreshToken) {
      return NextResponse.redirect(`${WEB_APP_URL}/home`);
    }
    return NextResponse.next();
  }

  if (
    req.nextUrl.pathname !== '/login' &&
    req.nextUrl.pathname !== '/register' &&
    req.nextUrl.pathname !== '/' &&
    req.nextUrl.pathname !== '/download'
  ) {
    const accessToken = await getAccessToken();
    const refreshToken = await getRefreshToken();
    if (!accessToken || !refreshToken) {
      const response = NextResponse.redirect(`${WEB_APP_URL}/login`);
      response.cookies.delete('accessToken');
      response.cookies.delete('refreshToken');
      return response;
    }

    try { // La fonction verifyToken renvoyant une erreur si le token est invalide ou expiré, on la place dans un bloc try-catch
      const decoded = await verifyToken(accessToken as string);
      return NextResponse.next();
    } catch (err) { // Si le token est invalide ou expiré, on tente de le rafraîchir
      try { // Try-Catch pour gérer les erreurs de fetch également
        const res = await fetch(`${API_URL}/auth/refresh-tokens`, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${refreshToken}`,
          },
          credentials: 'include',
        });

        if (!res.ok) { // Si le rafraîchissement échoue, on redirige l'utilisateur vers la page de connexion
          const response = NextResponse.redirect(`${WEB_APP_URL}/login`);
          response.cookies.delete('accessToken');
          response.cookies.delete('refreshToken');
          return response;
        }

        const data = await res.json();
        const newAccessToken = data.accessToken;
        const newRefreshToken = data.refreshToken;
        const response = NextResponse.next();
        response.cookies.set('accessToken', newAccessToken, {
          maxAge: 60 * 60 * 24 * 30,
          path: '/',
          sameSite: 'strict',
          secure: true,
          httpOnly: true,
        });
        response.cookies.set('refreshToken', newRefreshToken, {
          maxAge: 60 * 60 * 24 * 30,
          path: '/',
          sameSite: 'strict',
          secure: true,
          httpOnly: true,
        });
        applySetCookie(req, response);
        return response;
      } catch (error) { // Si le fetch échoue (API probablement down), on redirige l'utilisateur vers la page de connexion
        const response = NextResponse.redirect(`${WEB_APP_URL}/login`);
        response.cookies.delete('accessToken');
        response.cookies.delete('refreshToken');
        return response;
      }
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
};
