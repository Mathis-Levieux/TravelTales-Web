export type User = {
  // Define the properties of the User type here
  id: number;
  username: string;
  email: string;
  themePreference: string;
  bio: string | null;
  avatar: string | null;
  roleId: number;
  // Add more properties as needed
};

export type Session = {
  id: number;
  username: string;
  email: string;
  themePreference: string;
  bio: string | null;
  avatar: string | null;
  roleId: number;
};

export type RegisterState = {
  errors?: {
    email?: string[];
    username?: string[];
    password?: string[];
  };
  message?: string;
};

export type TripState = {
  errors?: {
    title?: string[];
    description?: string[];
    date?: string[];
  };
  message?: string;
};
