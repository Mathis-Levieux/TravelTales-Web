import { getTrips } from '@/app/lib/data';
import { FaCalendar, FaMapMarkerAlt, FaRegTrashAlt } from 'react-icons/fa';
import QuitButton from '@/app/ui/trip/quit-button';
import { Trip } from '@/app/lib/types';
import Link from 'next/link';

export default async function Trips() {

  const trips = await getTrips();

  return (
    <>
      {trips.length > 0 ? <h2 className='text-2xl text-black mt-12 ml-28'>Mes voyages : </h2> : ""}
      {trips.length > 0 ? (
        trips.map((trip: Trip) => {
          const firstDate = trip.destination
            .map((destination: any) => new Date(destination.dateStart).getTime())
            .sort((a: any, b: any) => a - b)[0];
          const lastDate = trip.destination
            .map((destination: any) => new Date(destination.dateEnd).getTime())
            .sort((a: any, b: any) => b - a)[0];

          const dateStart = new Date(firstDate).toLocaleDateString('fr-FR');
          const dateEnd = new Date(lastDate).toLocaleDateString('fr-FR');

          return (
            <div key={trip.id} className='relative'>
              <Link href={`/trip/${trip.id}`}>
                <div
                  className="w-4/5 container px-0 flex flex-col justify-evenly bg-white/50 my-5 h-36 rounded-2xl"
                >
                  <div className="flex justify-between items-center h-3/5">
                    <h2 className="pl-14 text-xl font-semibold">{trip.title}</h2>
                  </div>
                  <div className="flex justify-between items-center bg-gray-400 h-1/2 rounded-b-2xl">
                    <div className="flex items-center gap-2 pl-14">
                      <FaMapMarkerAlt size={20} />
                      <p>{trip.destination[0].name} {(trip.destination.length - 1) > 1 ? `et ${trip.destination.length - 1} autres destinations` : (trip.destination.length - 1) === 1 ? 'et 1 autre destination' : ''}</p>
                    </div>
                    <div className="flex items-center mr-14">
                      <FaCalendar className='mr-2' />
                      <p>
                        {dateStart} - {dateEnd}
                      </p>
                    </div>
                  </div>
                </div>
              </Link >
              <div className='absolute top-8 right-36'>
                <QuitButton id={trip.id} />
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
