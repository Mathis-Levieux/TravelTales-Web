import LoginForm from '@/app/ui/login/login-form';
import Header from '@/app/ui/header';
export default async function Page() {
  /*
Vaaarial2@gmail.com
123456789123aA$
    */

  return (
    <>
      <Header isLoggedIn={false} button={true} buttonText="Créer un compte" link="/register" />
      <main className="m-auto w-full flex justify-center">
        <LoginForm />
      </main>
    </>
  );
}
