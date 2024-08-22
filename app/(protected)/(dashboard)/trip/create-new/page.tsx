import Header from '@/app/ui/header';
import TripForm from '@/app/ui/trip/create-trip/trip-form';
import { Suspense } from 'react';
import SkeletonTripForm from '@/app/ui/trip/create-trip/skeleton-trip-form';

export default async function Page() {
  return (
    <>
      <Header isLoggedIn={true} homeIcons={true} />
      <main className="container m-auto w-full flex justify-center">
        <Suspense fallback={<SkeletonTripForm />}>
          <TripForm />
        </Suspense>
      </main>
    </>
  );
}
