'use server';
import { revalidatePath } from 'next/cache';
import { getAccessToken } from './actions';

const API_URL = process.env.API_URL;

export async function getUsers() {
  try {
    const accessToken = await getAccessToken();

    const response = await fetch('http://localhost:3001/users/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });
    revalidatePath('/user');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw new Error('An error occurred while fetching users. Please try again later.');
  }
}

export async function getTrips() {
  try {
    const accessToken = await getAccessToken();

    const response = await fetch(
      `${API_URL}/trips/user/with-destinations`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    if (!response.ok) {
      throw new Error('An error occurred while fetching trips. Please try again later.');
    }

    const data = await response.json();
    return data;
  } catch (err) {
    console.error(err);
    throw new Error('An error occurred while fetching trips. Please try again later.');
  }
}
