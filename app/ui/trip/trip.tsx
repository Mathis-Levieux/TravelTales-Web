import TripButton from "../home/trip-button";
import AddDestinationForm from "./add-destination";
import TripDestinations from "./trip-destinations";
import TripHeader from "./trip-header";

export default async function Trip({ trip }: { trip: any }) {


    return (
        <div className="flex flex-col rounded-2xl bg-opacity-55 bg-white">
            <TripHeader trip={trip} />

            <AddDestinationForm tripId={trip.id}>
                <TripButton
                    textColor="marron"
                    title='Ajouter une destination'
                    icon='plus'
                    textCenter={true}
                    className='mt-10 mb-10 shadow-createtripbutton bg-jaune border-beige md:w-3/5 w-11/12 m-auto'>
                    Ajouter une destination
                </TripButton>
            </AddDestinationForm>
            <div className="flex flex-col gap-3">
                <TripDestinations destinations={trip.destination} />
            </div>
        </div >
    )
}
