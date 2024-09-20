import { MdEdit } from "react-icons/md";
import type { Activity, Destination } from "../../lib/types";
import { FaCalendar } from "react-icons/fa";
import RoundIcon from "../round-icon";
import ActivityComponent from "./activity";
import { FaPlus } from "react-icons/fa6";
import EditDestinationForm from "./edit-destination";
import QuitDestButton from "./quit-destination-button";
import AddActivityForm from "./add-activity";
import { getActivitiesCategories } from "@/app/lib/data";
import Link from "next/link";


export default async function TripDestinations({ destinations }: { destinations: Destination[] }) {

    const categories = await getActivitiesCategories();

    return (

        destinations.map((destination: Destination) => {
            const dateStart = new Date(destination.dateStart).toLocaleDateString('fr-FR');
            const dateEnd = new Date(destination.dateEnd).toLocaleDateString('fr-FR');


            return (
                <div className="flex flex-col justify-center items-center">
                    <div key={destination.id} className="flex flex-col w-11/12">


                        {/* Destination Header */}
                        <div className="flex items-center justify-between bg-jaune rounded-t-[40px] h-20 px-14">
                            <h2 className="text-marronfonce text-2xl font-bold">{destination.name}</h2>
                            <div className="flex gap-2">
                                {/* Edit Destination Modal*/}
                                <EditDestinationForm destination={destination}>
                                    <RoundIcon title="Editer la destination" aria-label="Editer la destination" icon={<MdEdit className="text-marron text-2xl" />} className='bg-white h-10 w-10 cursor-pointer' />
                                </EditDestinationForm>
                                <AddActivityForm categories={categories} destination={destination}>
                                    <RoundIcon title="Ejouter une activité" aria-label="Ejouter une activité" icon={<FaPlus className="text-marron text-2xl" />} className='bg-white h-10 w-10 cursor-pointer' />
                                </AddActivityForm>
                                <RoundIcon title="Supprimer la destination" aria-label="Supprimer la destination" icon={<QuitDestButton values={{ tripId: destination.tripId, destId: destination.id }} className='text-2xl' />} className='bg-white h-10 w-10' />
                            </div>
                        </div>

                        {/* Destination Activities */}
                        <div className="bg-white bg-opacity-55 flex flex-col items-center pt-8 pb-8 gap-3">
                            {destination.activity.length > 0 ? (
                                destination.activity.map((activity: Activity, index: number) => (
                                    <Link href={`/trip/${destination.tripId}/activity/${activity.id}`} key={activity.id} className="rounded-full opacity-85 w-11/12">
                                        <ActivityComponent key={activity.id} activity={activity} />
                                    </Link>
                                ))) : (
                                <span className="text-marron">Aucune activité prévue, ajoutez en dès maintenant!</span>
                            )
                            }
                        </div>


                        {/* Destination Dates */}
                        <div className="flex items-center bg-jaune rounded-b-[40px] h-20 px-14 gap-5 mb-5" title={`Début et fin du voyage: ${dateStart} - ${dateEnd}`} aria-label={`Début et fin du voyage: ${dateStart} - ${dateEnd}`}>
                            <RoundIcon icon={<FaCalendar className="text-marron text-2xl" />} className='bg-white h-10 w-10' />
                            <span className="">{dateStart} - {dateEnd}</span>
                        </div>

                    </div>
                </div>
            )
        }))
}