import Link from 'next/link';
import Profil from '../ui/profil';
import { Suspense } from 'react';
import { getUsers } from '../lib/data';
import { User } from '../lib/types';
import { logOut } from '../lib/actions';

export default async function Page() {
  const users: User[] = await getUsers();
  return (
    <div className="container">
      <form action={logOut}>
        <button type="submit">Déconnexion</button>
      </form>
      <main>
        <Link href="/">Retour</Link>
        <Suspense fallback={<p>Chargement...</p>}>
          <Profil users={users} />
        </Suspense>
      </main>
    </div>
  );
}
