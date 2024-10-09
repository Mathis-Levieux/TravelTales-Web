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
  description: string;
  createdAt: Date;
  updatedAt: Date;
  isDone: boolean;
  note: string;
  destination: Destination[];
}

export type Activity = {
  id: number;
  name: string;
  isDone: boolean;
  description: string;
  score: number | null;
  date: Date;
  destinationId: number;
  category: string;
  expense: Expense;
  comment: Comment[];
  destination: Destination;
}

export type Comment = {
  id: number;
  content: string;
  date: Date;
  userId: number;
  activityId: number;
}

export type Expense = {
  id: number;
  name: string;
  amount: number;
  date: Date;
  budgetId: number;
  activityId: number;
}

export type Budget = {
  id: number;
  isVisible: boolean;
  amount: number;
  category: string;
  tripId: number;
  userId: number;
}

export type Destination = {
  id: number;
  name: string;
  dateStart: Date;
  dateEnd: Date;
  timezone: string | null;
  tripId: number;
  activity: Activity[];
}