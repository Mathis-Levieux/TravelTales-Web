'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { date, z } from 'zod'
import { passwordRegex } from './constants'
import { isEmailTaken } from './utils'
import { RegisterState, TripState } from './types'
/*
Vaaarial2@gmail.com
123456789123aA$
*/

export async function handleRegister(data: {
    email: string,
    username: string,
    password: string,
    passwordConfirmation: string
}) {


    const FormSchema = z.object({
        // avatar: z.any()
        //     .refine(value => value[0].type === "image/jpeg" || value[0].type === "image/png", {
        //         message: "Le fichier doit être une image jpeg ou png"
        //     }),
        email: z.string().email({
            message: "L'email est invalide"
        }),
        username: z.string().min(3, {
            message: "Le nom d'utilisateur doit contenir au moins 3 caractères"
        }),
        password: z.string().regex(passwordRegex, {
            message: "Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial"
        }),
        passwordConfirmation: z.string().regex(passwordRegex, {
            message: "Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial"
        }),
    })

    const result = FormSchema.safeParse(data)
    if (!result.success) {
        return {
            error: "Invalid data"
        }
    }

    const { email, username, password } = data

    try {
        const isEmailAlreadyTaken = await isEmailTaken(email);

        if (isEmailAlreadyTaken) {
            return {
                error: "Email already taken"
            }
        }
    } catch (error) {
        console.error(error);
        return {
            error: "Registration failed"
        };
    }

    try {
        const response = await fetch('http://localhost:3001/auth/signup', {
            method: 'POST',
            cache: 'no-store',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, username, password })
        })

        if (response.status !== 201) {
            return { error: 'Registration failed' }
        }
    } catch (error) {
        console.error(error)
        return {
            error: "Registration failed"
        }
    }

    return {
        message: 'Un email de confirmation vous a été envoyé'
    }
}


export async function handleLogIn(data: {
    email: string,
    password: string
}) {

    const FormSchema = z.object({
        email: z.string().email({
            message: "L'email est invalide"
        }),
        password: z.string().regex(passwordRegex),
    })

    const result = FormSchema.safeParse(data)
    if (!result.success) {
        return {
            error: "Email ou mot de passe incorrect"
        }
    }

    const { email, password } = data

    try {
        const response = await fetch('http://localhost:3001/auth/login', {
            method: 'POST',
            cache: 'no-store',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password })
        })

        if (!response.ok) {
            return {
                error: 'Email ou mot de passe incorrect'
            }
        }

        const { tokens } = await response.json()
        const { accessToken, refreshToken } = tokens
        await saveAccessToken(accessToken)
        await saveRefreshToken(refreshToken)

    } catch (error) {
        console.error(error)
        return {
            error: "Erreur lors de la connexion, veuillez réessayer ultérieurement"
        }
    }

    redirect('/dashboard')

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
    const accessToken = cookies().get('accessToken')?.value
    return accessToken
}

export async function getRefreshToken() {
    const refreshToken = cookies().get('refreshToken')?.value
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
    cookies().delete('accessToken')
    cookies().delete('refreshToken')
    redirect('/login')
}
/*
Vaaarial2@gmail.com
123456789123aA$
*/

export async function handleTripForm(data: {
    tripName: string,
    dateRange: {
        from: Date,
        to: Date
    },
    tripDescription?: string,
    tripCity: string,
}) {


    const FormSchema = z.object({
        tripName: z.string().min(1, {
            message: "Le nom du voyage ne peut pas être vide"
        }),
        dateRange: z.object({
            from: z.date(),
            to: z.date(),
        }),
        tripDescription: z.string().optional(),
        tripDestination: z.string().min(1, {
            message: "La destination ne peut pas être vide"
        }),
        tripCity: z.string().min(1, {
            message: "La ville ne peut pas être vide"
        }),
    })

    const result = FormSchema.safeParse(data)
    if (!result.success) {
        return {
            error: "Invalid data"
        }
    }

    const dateStart = data.dateRange.from
    const dateEnd = data.dateRange.to
    const formattedDateStart = dateStart.toLocaleDateString()
    const formattedDateEnd = dateEnd.toLocaleDateString()
    // const { tripName, tripDescription, tripCity, tripCountry } = data
    // console.log(tripName, tripDescription, tripCity, tripCountry, formattedDateStart, formattedDateEnd)
    console.log(data)
    /*
    123456789123aA$
    */
    return {
        message: 'Voyage créé du ' + formattedDateStart + ' au ' + formattedDateEnd
    }
}