import Header from '@/app/ui/header';
import RegisterForm from '@/app/ui/register/register-form';

export default function Page() {
  return (
    <>
      <Header isLoggedIn={false} button={true} buttonText="Se connecter" link="/login" />
      <main className="m-auto w-full flex justify-center">
        <RegisterForm />
      </main>
    </>
  );
}
