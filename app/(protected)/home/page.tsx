import TripsSkeleton from '@/app/ui/home/tripsSkeleton';
import Trips from '@/app/ui/home/trips';
import { Suspense } from 'react';
import Link from 'next/link';
import TripButton from '@/app/ui/home/trip-button';
import Header from '@/app/ui/header';

export default async function Page() {

  return (
    <>
      <Header isLoggedIn={true} homeIcons={true} />
      <main className="container mx-auto px-4 py-12">
        <div className="w-full bg-white/50 rounded-2xl py-12">
          <div className='flex justify-evenly'>
            <Link className="rounded-full w-1/5" href={'/trip/create-new'}>
              <TripButton
                textColor="marron"
                icon='plus'
                className='shadow-createtripbutton bg-jaune text-marron border-beige'
              >
                Créer un voyage
              </TripButton>
            </Link>
            <Link className='rounded-full w-1/5' href={'/trip/create-new'}>
              <TripButton
                textColor="bleutext"
                icon='share'
                className='shadow-jointripbutton bg-bleufooter text-bleutext'
              >
                Rejoindre un voyage
              </TripButton>
            </Link>
          </div>

          <Suspense fallback={<TripsSkeleton />}>
            <div className='py-6'>
              <Trips />
            </div>
          </Suspense>
        </div>
      </main>
    </>
  );
}
