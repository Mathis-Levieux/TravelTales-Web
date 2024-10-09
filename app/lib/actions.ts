'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { z } from 'zod';
import { passwordRegex } from '@/app/lib/constants';
import { isEmailTaken } from '@/app/lib/utils';
import { revalidatePath, revalidateTag } from 'next/cache';

/*
logs test
Vaaarial
Vaaarial2@gmail.com
123456789123aA$
*/

export async function handleRegister(data: {
  email: string;
  username: string;
  password: string;
  passwordConfirmation: string;
}) {
  const FormSchema = z.object({
    // avatar: z.any()
    //     .refine(value => value[0].type === "image/jpeg" || value[0].type === "image/png", {
    //         message: "Le fichier doit être une image jpeg ou png"
    //     }),
    email: z.string().email({
      message: "L'email est invalide",
    }),
    username: z.string().min(3, {
      message: "Le nom d'utilisateur doit contenir au moins 3 caractères",
    }),
    password: z.string().regex(passwordRegex, {
      message:
        'Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial',
    }),
    passwordConfirmation: z.string().regex(passwordRegex, {
      message:
        'Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial',
    }),
  });

  const result = FormSchema.safeParse(data);
  if (!result.success) {
    return {
      error: 'Invalid data',
    };
  }

  const { email, username, password } = data;

  try {
    const isEmailAlreadyTaken = await isEmailTaken(email);

    if (isEmailAlreadyTaken) {
      return {
        error: 'Email already taken',
      };
    }
  } catch (error) {
    console.error(error);
    return {
      error: 'Registration failed',
    };
  }

  try {
    const response = await fetch('http://localhost:3001/auth/signup', {
      method: 'POST',
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, username, password }),
    });

    if (response.status !== 201) {
      return { error: 'Registration failed' };
    }
  } catch (error) {
    console.error(error);
    return {
      error: 'Registration failed',
    };
  }

  return {
    message: 'Un email de confirmation vous a été envoyé',
  };
}

export async function handleLogIn(data: { email: string; password: string }) {
  const FormSchema = z.object({
    email: z.string().email({
      message: "L'email est invalide",
    }),
    password: z.string().regex(passwordRegex),
  });

  const result = FormSchema.safeParse(data);
  if (!result.success) {
    return {
      error: 'Email ou mot de passe incorrect',
    };
  }

  const { email, password } = data;

  try {
    const response = await fetch('http://localhost:3001/auth/login', {
      method: 'POST',
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      return {
        error: 'Email ou mot de passe incorrect',
      };
    }

    const { tokens } = await response.json();
    const { accessToken, refreshToken } = tokens;
    await saveAccessToken(accessToken);
    await saveRefreshToken(refreshToken);
  } catch (error) {
    console.error(error);
    return {
      error: 'Erreur lors de la connexion, veuillez réessayer ultérieurement',
    };
  }

  redirect('/home');
}

export async function saveAccessToken(accessToken: string) {
  cookies().set('accessToken', accessToken, {
    maxAge: 60 * 60 * 24 * 30,
    path: '/',
    sameSite: 'none',
    secure: true,
  });
}

export async function saveRefreshToken(refreshToken: string) {
  cookies().set('refreshToken', refreshToken, {
    maxAge: 60 * 60 * 24 * 30,
    path: '/',
    sameSite: 'none',
    secure: true,
    httpOnly: true,
  });
}

export async function getAccessToken() {
  const accessToken = cookies().get('accessToken')?.value;
  return accessToken;
}

export async function getRefreshToken() {
  const refreshToken = cookies().get('refreshToken')?.value;
  return refreshToken;
}

export async function logOut() {
  const refreshToken = await getRefreshToken();

  const response = await fetch('http://localhost:3001/auth/logout', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${refreshToken}`,
    },
  });
  if (!response.ok) {
    console.error(response.statusText, response.status);
  }
  cookies().delete('accessToken');
  cookies().delete('refreshToken');
  redirect('/login');
}
/*
Vaaarial2@gmail.com
123456789123aA$
*/

export async function handleTripForm(data: {
  title: string;
  description?: string;
  destination: {
    name: string;
    dateStart: Date;
    dateEnd: Date;
  }[];
}) {
  const DestinationSchema = z.object({
    name: z
      .string()
      .min(1, { message: 'La destination ne peut pas être vide' }),
    dateStart: z.date(),
    dateEnd: z.date(),
  });

  const FormSchema = z.object({
    title: z.string().min(1, {
      message: 'Le nom du voyage ne peut pas être vide',
    }),
    description: z.string().optional(),
    destination: z
      .array(DestinationSchema)
      .min(1, { message: 'Ajoutez au moins une destination' }),
  });

  const result = FormSchema.safeParse(data);
  if (!result.success) {
    return {
      error: 'Invalid data',
    };
  }

  const { title, description, destination } = data;
  /*
123456789123aA$
    */
  const res = await fetch('http://localhost:3001/trips', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${await getAccessToken()}`,
    },
    body: JSON.stringify({
      title,
      description,
      destination,
    }),
  });
  revalidateTag('trips');
  const response = await res.json();

  if (!res.ok) {
    console.error(response);
    return {
      error: 'Erreur lors de la création du voyage',
    };
  }
  return {
    message: 'Voyage créé, redirection en cours...',
  };
}

export async function handleLeaveTrip({ id }: { id: number }) {

  const FormSchema = z.object({
    id: z.number(),
  });

  const result = FormSchema.safeParse({ id });

  if (!result.success) {
    return {
      error: 'Invalid data',
    };
  }

  const accessToken = await getAccessToken();

  const res = await fetch(`http://localhost:3001/trips/${id}/leave`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!res.ok) {
    return {
      error: 'Erreur lors de la suppression du voyage',
    };
  }

  revalidateTag('trips');
  redirect('/home');
}



export async function handleCountUsersInTrip({ id }: { id: number }) {

  const accessToken = await getAccessToken();

  try {
    const res = await fetch(`http://localhost:3001/trips/${id}/user-count`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!res.ok) {
      return {
        error: 'Erreur lors de la récupération du nombre de participants',
      };
    }

    const response = await res.json();
    return response;
  } catch (err) {
    console.error(err);
    return {
      error: 'Erreur lors de la récupération du nombre de participants',
    };
  }
}

export async function handleEditUserInfos(data: {
  email: string;
  username: string;
  // avatar: string;
}) {

  const FormSchema = z
    .object({
      email: z.string().email({
        message: "L'email est invalide",
      }),
      username: z.string().min(3, {
        message: "Le nom d'utilisateur doit contenir au moins 3 caractères",
      }),
    });

  const result = FormSchema.safeParse(data);

  if (!result.success) {
    return {
      error: 'Invalid data',
    };
  }

  const { email, username } = data;

  const accessToken = await getAccessToken();

  try {
    const res = await fetch('http://localhost:3001/users/me', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ username, email }),
    });

    revalidateTag('user');
    if (!res.ok) {
      const response = await res.json();
      return {
        error: response.message,
      };
    }

    return {
      message: 'Informations modifiées',
    };
  } catch (err) {
    console.error(err);
    return {
      error: 'Erreur lors de la modification des informations',
    };
  }
}

export async function handleTripNameForm(tripId: string, newTitle: string) {

  const FormSchema = z.object({
    newTitle: z.string().min(1, {
      message: 'Le nom du voyage ne peut pas être vide',
    }),
  });

  const result = FormSchema.safeParse({ newTitle });

  if (!result.success) {
    return {
      error: 'Le nom du voyage est invalide',
    };
  }

  const accessToken = await getAccessToken();

  try {
    const res = await fetch(`http://localhost:3001/trips/${tripId}/title`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ title: newTitle }),
    });

    revalidateTag('trips');

    if (!res.ok) {
      const response = await res.json();
      return {
        error: response.message,
      };
    }
    return {
      message: 'Nom du voyage modifié',
    };
  } catch (err) {
    console.error(err);
    return {
      error: 'Erreur lors de la modification du nom du voyage',
    };
  }
}

export async function editDestinationForm(values: { tripId: number, destinationId: number, name: string; dateStart: Date; dateEnd: Date; }) {

  console.log(values);

  const DestinationEditSchema = z.object({
    tripId: z.number(),
    destinationId: z.number(),
    name: z.string().min(1, { message: 'La destination ne peut pas être vide' }),
    dateStart: z.date(),
    dateEnd: z.date(),
  });

  const result = DestinationEditSchema.safeParse(values);

  if (!result.success) {
    return {
      error: 'Invalid data',
    };
  }
  const { tripId, name, dateStart, dateEnd, destinationId } = values;

  const accessToken = await getAccessToken();

  try {
    const res = await fetch(`http://localhost:3001/trips/${tripId}/destination/${destinationId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ name, dateStart, dateEnd }),
    });

    revalidatePath('trips');

    if (!res.ok) {
      const response = await res.json();
      return {
        error: response.message,
      };
    }
    return {
      message: 'Destination modifiée',
    };
  } catch (err) {
    console.error(err);
    return {
      error: 'Erreur lors de la modification de la destination',
    };
  }
}

export async function handleAddDestinationForm(values: { tripId: number, name: string; dateStart: Date; dateEnd: Date; }) {

  const addDestinationSchema = z.object({
    tripId: z.number(),
    name: z.string().min(1, { message: 'La destination ne peut pas être vide' }),
    dateStart: z.date(),
    dateEnd: z.date()
  });

  const result = addDestinationSchema.safeParse(values);

  if (!result.success) {
    return {
      error: 'Invalid data',
    };
  }

  const { tripId, name, dateStart, dateEnd } = values;

  const accessToken = await getAccessToken();

  try {
    const res = await fetch(`http://localhost:3001/trips/${tripId}/destination`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ name, dateStart, dateEnd }),
    });

    revalidatePath('trips');

    if (!res.ok) {
      const response = await res.json();
      return {
        error: response.message,
      };
    }
    return {
      message: 'Destination ajoutée',
    };
  } catch (err) {
    console.error(err);
    return {
      error: 'Erreur lors de l\'ajout de la destination',
    };
  }
}

export async function handleDeleteDestination({ tripId, destId }: { tripId: number, destId: number }) {

  const FormSchema = z.object({
    tripId: z.number(),
    destId: z.number(),
  });

  const result = FormSchema.safeParse({ tripId, destId });

  if (!result.success) {
    return {
      error: 'Invalid data',
    };
  }

  const accessToken = await getAccessToken();

  try {
    const res = await fetch(`http://localhost:3001/trips/${tripId}/destination/${destId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    revalidatePath('trips');

    if (!res.ok) {
      const response = await res.json();
      return {
        error: response.message,
      };
    }
    return {
      message: 'Destination supprimée',
    };
  } catch (err) {
    console.error(err);
    return {
      error: 'Erreur lors de la suppression de la destination',
    };
  }
}

export async function handleAddActivityForm(values: { destinationId: number, name: string, date: Date, description?: string, category: string }) {

  console.log(values);

  const addActivitySchema = z.object({
    destinationId: z.number(),
    name: z.string().min(1, { message: 'Le nom ne peut pas être vide' }),
    description: z.string().optional(),
    date: z.date(),
    category: z.string().min(1, { message: 'La catégorie ne peut pas être vide' }),
  });

  const result = addActivitySchema.safeParse(values);

  if (!result.success) {
    return {
      error: 'Invalid data',
    };
  }

  const { destinationId, name, date, description, category } = values;

  const accessToken = await getAccessToken();

  try {
    const res = await fetch(`http://localhost:3001/activities`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ destinationId, name, date, description, category }),
    });

    revalidatePath('trips');

    if (!res.ok) {
      const response = await res.json();
      return {
        error: response.message,
      };
    }
    return {
      message: 'Activité ajoutée',
    };
  } catch (err) {
    console.error(err);
    return {
      error: 'Erreur lors de l\'ajout de l\'activité',
    };
  }
}

export async function inviteMemberToTrip(values: { tripId: number, email: string }) {

  const FormSchema = z.object({
    tripId: z.number(),
    email: z.string().email({
      message: "L'email est invalide",
    }),
  });
  const { tripId, email } = values;
  const result = FormSchema.safeParse({ tripId, email });

  if (!result.success) {
    return {
      error: 'Invalid data',
    };
  }

  const accessToken = await getAccessToken();

  try {
    const res = await fetch(`http://localhost:3001/trips/${tripId}/invite`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ email }),
    });

    if (!res.ok) {
      const response = await res.json();
      return {
        error: response.message,
      };
    }
    return {
      message: 'Invitation envoyée',
    };
  } catch (err) {
    console.error(err);
    return {
      error: 'Erreur lors de l\'envoi de l\'invitation',
    };
  }
}

export async function handleDeleteActivity({ activityId }: { activityId: number }) {
  
    const FormSchema = z.object({
      activityId: z.number(),
    });
  
    const result = FormSchema.safeParse({ activityId });
  
    if (!result.success) {
      return {
        error: 'Invalid data',
      };
    }
  
    const accessToken = await getAccessToken();
  
    try {
      const res = await fetch(`http://localhost:3001/activities/${activityId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
  
      revalidatePath('trips');
  
      if (!res.ok) {
        const response = await res.json();
        return {
          error: response.message,
        };
      }
      return {
        message: 'Activité supprimée',
      };
    } catch (err) {
      console.error(err);
      return {
        error: 'Erreur lors de la suppression de l\'activité',
      };
    }
  }