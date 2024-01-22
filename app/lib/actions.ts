'use server'

import { cookies } from 'next/headers'
import { Session } from './types'
import { get } from 'http'
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
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password })
        })
        console.log(response)
        if (response.status !== 200) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Login failed');
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
export async function saveAccessToken(accessToken: string) {
    cookies().set('accessToken', accessToken, {
        maxAge: 60 * 60 * 24 * 30,
        path: '/',
        sameSite: 'none',
        secure: true,
    })
}

export async function saveRefreshToken(refreshToken: string) {
    cookies().set('refreshToken', refreshToken, {
        maxAge: 60 * 60 * 24 * 30,
        path: '/',
        sameSite: 'none',
        secure: true,
        httpOnly: true,
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

export async function logOut() {
    const refreshToken = await getRefreshToken()

    const response = await fetch('http://localhost:3001/auth/logout', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${refreshToken}`,
        }
    })
    if (!response.ok) {
        console.error(response.statusText, response.status)
    }
    cookies().delete('access_token')
    cookies().delete('refresh_token')
    redirect('/login')
}
/*
Vaaarial2@gmail.com
123456789123aA$
*/