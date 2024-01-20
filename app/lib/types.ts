export type User = {
  // Define the properties of the User type here
  id: string;
  email: string;
  // Add more properties as needed
};

export type Session = {
  id: number;
  username: string;
  email: string;
  themePreference: string;
  bio: string | null,
  avatar: string | null,
  roleId: number;
}