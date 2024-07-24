export type User = {
  id: number;
  username: string;
  email: string;
  themePreference: string;
  bio: string | null;
  createdAt: string;
  updatedAt: string;
  avatar: string | null;
  role: string;
  verified: true | false;
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

export type Trip = {
  id: number;
  title: string;
  destination: {
    name: string;
    dateStart: string;
    dateEnd: string;
  }[];
}
