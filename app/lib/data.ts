"use server"
import { revalidatePath } from 'next/cache';
import { getAccessToken } from './actions';
import { customFetch } from './actions'
import { redirect } from 'next/navigation';

export async function getUsers() {
    const accessToken = await getAccessToken()

    const response = await fetch('http://localhost:3001/users/', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
        },
    })
    revalidatePath('/user')
    const data = await response.text()
    return data
}

