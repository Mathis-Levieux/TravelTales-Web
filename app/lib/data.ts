'use server';
import { revalidatePath } from 'next/cache';
import { getAccessToken } from '@/app/lib/actions';
import { Activity, Trip, User } from '@/app/lib/types';

const API_URL = process.env.API_URL;

export async function getUsers(): Promise<User[]> {
  try {
    const accessToken = await getAccessToken();

    const response = await fetch(`${API_URL}/users/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw new Error('An error occurred while fetching users. Please try again later.');
  }
}

export async function getTrips(): Promise<Trip[]> {
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
        next: { tags: ['trips'] }
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


export async function getUser(data?: string) {
  try {
    const res = await fetch(`${API_URL}/users/me`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${await getAccessToken()}`,
      },
      next: { tags: ['user'] }

    });

    if (!res.ok) {
      throw new Error('An error occurred while fetching user data. Please try again later.');
    }

    const response = await res.json();
    if (data) {
      return response[data];
    }
    return response
  } catch (error) {
    console.error(error);
    throw new Error('An error occurred while fetching user data. Please try again later.');
  }
}

export async function getTrip(id: string): Promise<Trip | null> {
  try {
    const res = await fetch(`${API_URL}/trips/${id}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${await getAccessToken()}`,
      },
      next: { tags: ['trips'] }
    });

    if (!res.ok) {
      return null;
    }

    return await res.json();

  } catch (err) {
    console.error(err);
    throw new Error(`Une erreur est survenue lors de la récupération 
      des données du voyage. Veuillez réessayer plus tard.`);
  }
}

export async function getActivitiesCategories() {
  try {
    const res = await fetch(`${API_URL}/activities/categories`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${await getAccessToken()}`,
      },
      next: { tags: ['activities'] }
    });

    if (!res.ok) {
      throw new Error('An error occurred while fetching activities categories. Please try again later.');
    }

    return await res.json();
  } catch (error) {
    console.error(error);
    throw new Error('An error occurred while fetching activities categories. Please try again later.');
  }
}


export async function getActivity(id: string): Promise<Activity | null> {
  try {
    const res = await fetch(`${API_URL}/activities/${id}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${await getAccessToken()}`,
      },
      next: { tags: ['activities'] }
    });

    if (!res.ok) {
      return null;
    }

    return await res.json();

  } catch (err) {
    console.error(err);
    throw new Error('An error occurred while fetching activity data. Please try again later.');
  }
}

export async function getUsersInTrips(tripId: string) {

  try {
    const res = await fetch(`${API_URL}/trips/${tripId}/users`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${await getAccessToken()}`,
      },
      next: { tags: ['trips'] }
    });

    if (!res.ok) {
      throw new Error('An error occurred while fetching users in trips. Please try again later.');
    }

    return await res.json();
  }
  catch (error) {
    console.error(error);
    throw new Error('An error occurred while fetching users in trips. Please try again later.');
  }
}

export async function getBudgetCategories() {
  try {
    const res = await fetch(`${API_URL}/budgets/categories`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${await getAccessToken()}`,
      },
    });

    if (!res.ok) {
      throw new Error('An error occurred while fetching budgets categories. Please try again later.');
    }

    return await res.json();
  } catch (error) {
    console.error(error);
    throw new Error('An error occurred while fetching budgets categories. Please try again later.');
  }
}

export async function getActivities(tripId: number) {
  try {
    const res = await fetch(`${API_URL}/activities/trips/${tripId}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${await getAccessToken()}`,
      },
      next: { tags: ['activities'] }
    });

    if (!res.ok) {
      throw new Error('An error occurred while fetching activities. Please try again later.');
    }

    return await res.json();
  } catch (error) {
    console.error(error);
    throw new Error('An error occurred while fetching activities. Please try again later.');
  }
}