'use server'

import { cookies } from 'next/headers'
import { Session } from './types'
import { redirect } from 'next/navigation'
/*
Vaaarial2@gmail.com
123456789123aA$
*/
export async function handleLogIn(formData: FormData): Promise<Session> {
    const email = formData.get('email')
    const password = formData.get('password')

    try {
        const response = await fetch('http://localhost:3001/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        })

        if (!response.ok) {
            console.error(response.statusText, response.status)
        }

        const data = await response.json()
        const accessToken = data.tokens.accessToken
        const refreshToken = data.tokens.refreshToken
        cookies().set('access_token', accessToken)
        cookies().set('refresh_token', refreshToken)

        const { user } = data;
        const session: Session = {
            ...user,
            accessToken,
        }

        return session;
    } catch (error) {
        console.error(error)
        throw error
    }
}

// export async function fetchUser() {
//     const response = await fetch('http://localhost:3001/users/', {
//         method: 'GET',
//         headers: {
//             'Content-Type': 'application/json'
//         }
//     })

//     return response
// }

export async function saveRefreshToken(refreshToken: string) {
    cookies().set('refreshToken', refreshToken, {
        maxAge: 60 * 60 * 24 * 30,
        path: '/',
        sameSite: 'lax',
    })
}

export async function saveAccessToken(accessToken: string) {
    cookies().set('accessToken', accessToken, {
        maxAge: 60 * 60 * 24 * 30,
        path: '/',
        sameSite: 'none',
    })
}

export async function getAccessToken() {
    const accessToken = cookies().get('access_token')?.value
    return accessToken
}

export async function getRefreshToken() {
    const refreshToken = cookies().get('refresh_token')?.value
    return refreshToken
}

export async function customFetch(url: string, options: RequestInit | undefined) {
    const res = await fetch(url, options);
    if (res.status === 401) {
        // const refreshToken = await getRefreshToken();
        // const refreshRes = await fetch('http://localhost:3001/auth/refresh-tokens-cookies', {
        //     method: 'POST',
        //     headers: {
        //         Authorization: `Bearer ${refreshToken}`,
        //     },
        //     credentials: 'include',
        // });
        const path = window.location.pathname;
        redirect(path);

        // if (refreshRes.ok) {
        //     const retryRes = await fetch(url, options);
        //     const fullres = await retryRes.json();
        //     console.log(fullres);
        //     return retryRes;
        // }
    }
    return res;
}
/*
Vaaarial2@gmail.com
123456789123aA$
*/
