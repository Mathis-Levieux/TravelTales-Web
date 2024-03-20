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
        avatar: z.any()
            .refine(value => value[0].type === "image/jpeg" || value[0].type === "image/png", {
                message: "Le fichier doit être une image jpeg ou png"
            }),
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

// export async function handleRegister(prevState: RegisterState, formData: FormData) {
//     const FormSchema = z.object({
//         email: z.string().email({
//             message: "L'email est invalide"
//         }),
//         username: z.string().min(3, {
//             message: "Le nom d'utilisateur doit contenir au moins 3 caractères"
//         }),
//         password: z.string().regex(passwordRegex, {
//             message: "Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial"
//         }),
//         passwordConfirmation: z.string().refine((value) => value === formData.get('password'), {
//             message: "Les mots de passe ne correspondent pas"
//         })
//     })

//     const validatedFields = FormSchema.safeParse({
//         email: formData.get('email'),
//         username: formData.get('username'),
//         password: formData.get('password'),
//         passwordConfirmation: formData.get('passwordConfirmation'),
//     })

//     let errors = {};

//     if (!validatedFields.success) {
//         errors = {
//             ...errors,
//             ...validatedFields.error.flatten().fieldErrors,
//         };
//     }

//     try {
//         const isEmailAlreadyTaken = await isEmailTaken(formData.get('email') as string);

//         if (isEmailAlreadyTaken) {
//             errors = {
//                 ...errors,
//                 email: ['Cet email est déjà utilisé'],
//             };
//         }
//     } catch (error) {
//         console.error(error);
//         return {
//             message: "Registration failed",
//         };
//     }

//     if (Object.keys(errors).length > 0) {
//         return { errors };
//     }

//     if (!validatedFields.success) {
//         return {
//             errors: validatedFields.error.flatten().fieldErrors,
//         }
//     }

//     const { email, username, password } = validatedFields.data

//     try {
//         const response = await fetch('http://localhost:3001/auth/signup', {
//             method: 'POST',
//             cache: 'no-store',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({ email, username, password })
//         })

//         if (response.status !== 201) {
//             return { message: 'Registration failed' }
//         }
//     } catch (error) {
//         console.error(error)
//         return {
//             message: "Registration failed"
//         }
//     }
//     return (
//         {
//             message: 'Un email de confirmation vous a été envoyé'
//         }
//     )
// }


export async function handleLogIn(prevState: { message?: string } | undefined, formData: FormData) {

    const email = formData.get('email')
    const password = formData.get('password')

    if (!email || !password) {
        return { message: 'Email and password are required' }
    }
    try {
        const response = await fetch('http://localhost:3001/auth/login', {
            method: 'POST',
            cache: 'no-store',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password })
        })

        if (response.status !== 200) {
            return { message: 'Invalid credential' }
        }

        const data = await response.json()
        const accessToken = data.tokens.accessToken
        const refreshToken = data.tokens.refreshToken
        cookies().set('access_token', accessToken)
        cookies().set('refresh_token', refreshToken)
    } catch (error) {
        console.error(error)
        return {
            message: "Login failed"
        }
    }

    redirect('/user')
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

export async function handleTripForm(data: {
    tripName: string,
    dateRange: {
        from: Date,
        to: Date
    }
}) {


    const FormSchema = z.object({
        tripName: z.string().min(1, {
            message: "Le nom du voyage ne peut pas être vide"
        }),
        dateRange: z.object({
            from: z.date(),
            to: z.date(),
        })
    })

    const result = FormSchema.safeParse(data)
    if (!result.success) {
        return {
            error: "Invalid data"
        }
    }

    const formattedDate = {
        from: data.dateRange.from.toLocaleDateString(),
        to: data.dateRange.to.toLocaleDateString()
    }

    return {
        message: 'Voyage créé du ' + formattedDate.from + ' au ' + formattedDate.to
    }
}