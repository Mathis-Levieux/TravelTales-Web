import { getTrips } from '@/app/lib/data';
import { FaCalendar, FaMapMarkerAlt, FaRegTrashAlt } from 'react-icons/fa';
import QuitButton from '@/app/ui/trip/quit-button';
import { Trip } from '@/app/lib/types';
import Link from 'next/link';
import RoundIcon from '../round-icon';

export default async function Trips() {

  let trips = await getTrips();

  // On trie les voyages par date de départ

  const sortedTrips = trips.sort((a: Trip, b: Trip) => {
    const firstDateA = a.destination
      .map((destination: any) => new Date(destination.dateStart).getTime())
      .sort((a: any, b: any) => a - b)[0];
    const firstDateB = b.destination
      .map((destination: any) => new Date(destination.dateStart).getTime())
      .sort((a: any, b: any) => a - b)[0];
    return firstDateA - firstDateB;
  });

  return (
    <>
      {sortedTrips.length > 0 ? (
        sortedTrips.map((trip: Trip) => {
          const firstDate = trip.destination
            .map((destination: any) => new Date(destination.dateStart).getTime())
            .sort((a: any, b: any) => a - b)[0];
          const lastDate = trip.destination
            .map((destination: any) => new Date(destination.dateEnd).getTime())
            .sort((a: any, b: any) => b - a)[0];

          const dateStart = new Date(firstDate).toLocaleDateString('fr-FR');
          const dateEnd = new Date(lastDate).toLocaleDateString('fr-FR');

          return (
            <div key={trip.id} className='relative flex justify-center'>
              <Link href={`/trip/${trip.id}`} className='block w-2/3'>
                <div
                  className="container px-0 flex flex-col justify-evenly bg-white/50 my-5 h-36 rounded-2xl"
                >
                  <div className="flex justify-between items-center h-3/5">
                    <h2 className="pl-14 text-xl font-bold">{trip.title}</h2>
                  </div>
                  <div className="flex justify-between items-center bg-jaune h-1/2 rounded-b-2xl">
                    <div className="flex items-center gap-2 pl-14">
                      <RoundIcon icon={<FaMapMarkerAlt size={20} className='text-marron' />} className='bg-white h-10 w-10' />
                      <p className='text-marron'>{trip.destination[0].name} {(trip.destination.length - 1) > 1 ? `et ${trip.destination.length - 1} autres destinations` : (trip.destination.length - 1) === 1 ? 'et 1 autre destination' : ''}</p>
                    </div>
                    <div className="flex items-center mr-14">
                      <RoundIcon icon={<FaCalendar size={20} className='text-marron' />} className='bg-white h-10 w-10 mr-2' />
                      <p className='text-marron font-semibold'>
                        {dateStart} - {dateEnd}
                      </p>
                    </div>
                  </div>
                </div>
              </Link >
              <div className='absolute top-7 right-60'>
                <RoundIcon icon={<QuitButton id={trip.id} className='text-2xl' />} className='bg-white h-8 w-8' />
              </div>
            </div>
          );
        })
      ) : (
        <p className='text-center text-2xl font-semibold text-red-600 mt-5'>
          Vous n'avez pas encore de voyage. Créez-en un dès maintenant !
        </p>
      )}
    </>
  );
}
