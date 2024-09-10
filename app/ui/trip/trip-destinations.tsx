import { MdEdit } from "react-icons/md";
import type { Activity, Destination } from "../../lib/types";
import { FaCalendar } from "react-icons/fa";
import RoundIcon from "../round-icon";
import ActivityComponent from "./activity";
import { FaPlus } from "react-icons/fa6";
import QuitButton from "./quit-button";
import EditDestination from "./edit-destination";
import EditDestinationForm from "./edit-destination";


export default async function TripDestinations({ destinations }: { destinations: Destination[] }) {

    const dateStart = new Date(destinations[0].dateStart).toLocaleDateString('fr-FR');
    const dateEnd = new Date(destinations[0].dateEnd).toLocaleDateString('fr-FR');


    return (
        <div className="flex flex-col gap-5 justify-center items-center">
            {destinations.map((destination: Destination, index: number) => (
                <div key={destination.id} className="flex flex-col w-11/12">


                    {/* Destination Header */}
                    <div className="flex items-center justify-between bg-jaune rounded-t-[40px] h-20 px-14">
                        <h2 className="text-marronfonce text-2xl font-bold">{destination.name}</h2>
                        <div className="flex gap-2">
                            {/* Edit Destination Modal*/}
                            <EditDestinationForm destination={destination}>
                                <RoundIcon icon={<MdEdit className="text-marron text-2xl" />} className='bg-white h-10 w-10' />
                            </EditDestinationForm>
                            <RoundIcon icon={<FaPlus className="text-marron text-2xl" />} className='bg-white h-10 w-10' />
                            <RoundIcon icon={<QuitButton id={destination.id} className='text-2xl text-red' />} className='bg-white h-10 w-10' />
                        </div>
                    </div>

                    {/* Destination Activities */}
                    <div className="bg-white bg-opacity-55 flex flex-col items-center pt-8 pb-8 gap-3">
                        {destination.activity.length > 0 ? (
                            destination.activity.map((activity: Activity, index: number) => (
                                <ActivityComponent key={activity.id} activity={activity} />
                            ))) : (
                            <span className="text-marron">Aucune activité prévue, ajoutez en dès maintenant!</span>
                        )
                        }
                    </div>


                    {/* Destination Dates */}
                    <div className="flex items-center bg-jaune rounded-b-[40px] h-20 px-14 gap-5 mb-5">
                        <RoundIcon icon={<FaCalendar className="text-marron text-2xl" />} className='bg-white h-10 w-10' />
                        <span className="">{dateStart} - {dateEnd}</span>
                    </div>


                    {/* Modal Pour éditer une destination */}
                </div>
            )
            )}
        </div>
    )
}

// {destination.activity.map((activity: Activity, index: number) => (
//     <span>{activity.name}</span>
// ))}
