import TripButton from "../home/trip-button";
import TripDestinations from "./trip-destinations";
import TripHeader from "./trip-header";

export default async function Trip({ trip }: { trip: any }) {

    return (
        <div className="flex flex-col rounded-2xl bg-opacity-55 bg-white">
            <TripHeader trip={trip} />

            <TripButton
                textColor="marron"
                icon='plus'
                textCenter={true}
                className='mt-5 mb-5 shadow-createtripbutton bg-jaune border-beige w-3/4 m-auto'>
                Ajouter une destination
            </TripButton>

            <TripDestinations destinations={trip.destination} />
        </div>
    )
}
