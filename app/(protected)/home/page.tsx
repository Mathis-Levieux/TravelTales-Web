import TripsSkeleton from '@/app/ui/home/tripsSkeleton';
import Trips from '@/app/ui/home/trips';
import { Suspense } from 'react';
import Link from 'next/link';
import TripButton from '@/app/ui/home/trip-button';
import Header from '@/app/ui/header';
import JoinMessage from '@/app/ui/home/join-message';

export default async function Page() {

  return (
    <>
      <Header isLoggedIn={true} homeIcons={true} />
      <main className="container mx-auto px-4 py-12">
        <div className="w-full rounded-2xl py-12">
          <JoinMessage />
          <div className='flex justify-center gap-16'>
            <Link className="rounded-full w-1/4" href={'/trip/create-new'}>
              <TripButton
                textColor="marron"
                icon='plus'
                className='w-full shadow-createtripbutton bg-jaune text-black border-beige'
              >
                Créer un voyage
              </TripButton>
            </Link>
            <Link className='rounded-full w-1/4' href={'/trip/create-new'}>
              <TripButton
                textColor="bleutext"
                icon='share'
                className='w-full shadow-jointripbutton bg-bleufooter text-black'
              >
                Rejoindre un voyage
              </TripButton>
            </Link>
          </div>

          <Suspense fallback={<TripsSkeleton />}>
            <div className='py-14'>
              <Trips />
            </div>
          </Suspense>
        </div>
      </main>
    </>
  );
}
