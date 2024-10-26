import { jwtVerify } from 'jose';

const API_URL = process.env.API_URL;

export async function verifyToken(token: string) {
  try {
    const verified = await jwtVerify(
      token,
      new TextEncoder().encode(process.env.JWT_ACCESS_SECRET as string),
    );
    return verified;
  } catch (error) {
    throw new Error('Invalid token or expired token');
  }
}

export async function isEmailTaken(email: string) {
  if (!email) {
    return;
  }
  const response = await fetch(`${API_URL}/auth/${email}`, {
    method: 'GET',
    cache: 'no-store',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const isEmailTaken = await response.json();
  if (isEmailTaken) {
    return true;
  } else {
    return false;
  }
}


export function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}