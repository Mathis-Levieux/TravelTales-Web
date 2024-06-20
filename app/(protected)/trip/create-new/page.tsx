import TripForm from '@/app/ui/trip/create-trip/trip-form';

export default async function Page() {
  return (
    <>
      <main className="container m-auto w-full flex justify-center">
        <TripForm />
      </main>
    </>
  );
}
