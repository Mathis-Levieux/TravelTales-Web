'use server';
import { revalidatePath } from 'next/cache';
import { getAccessToken } from './actions';

const API_URL_LOCAL = process.env.API_URL_LOCAL;

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
    return 'An error occurred while fetching users. Please try again later.';
  }
}

export async function getTrips() {
  try {
    const accessToken = await getAccessToken();

    const response = await fetch(
      'http://localhost:3001/trips/user/with-destinations',
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    const data = await response.json();
    return data;
  } catch (err) {
    console.error(err);
    return 'An error occurred while fetching trips. Please try again later.';
  }
}
