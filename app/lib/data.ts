"use server"
import { revalidatePath } from 'next/cache';
import { getAccessToken } from './actions';

export async function getUsers() {
    try {
        const accessToken = await getAccessToken()

        const response = await fetch('http://localhost:3001/users/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
            },
        })
        revalidatePath('/user')
        const data = await response.json()
        return data
    } catch (error) {
        console.error(error);
        return "An error occurred while fetching users. Please try again later.";
    }
}