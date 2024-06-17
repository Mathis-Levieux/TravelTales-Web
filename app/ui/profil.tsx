import { User } from '../lib/types';

export default async function Profil({ users }: { users: User[] }) {
  /*
Vaaarial2@gmail.com
123456789123aA$
    */
  return (
    <>
      <h1>Profil</h1>
      <ul>
        {(users &&
          users.map((user: User) => <li key={user.id}>{user.username}</li>)) ||
          'Aucun utilisateur'}
      </ul>
    </>
  );
}
//
