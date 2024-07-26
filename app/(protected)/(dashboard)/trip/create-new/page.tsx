import Header from '@/app/ui/header';
import TripForm from '@/app/ui/trip/create-trip/trip-form';

export default async function Page() {
  return (
    <>
      <Header isLoggedIn={true} homeIcons={true} />
      <main className="container m-auto w-full flex justify-center">
        <TripForm />
      </main>
    </>
  );
}
