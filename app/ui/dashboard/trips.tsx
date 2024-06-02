import { getTrips } from "@/app/lib/data";
import { FaCalendar, FaMapMarkerAlt, FaRegTrashAlt } from "react-icons/fa";


export default async function Trips() {

    const trips = await getTrips();

    return (
        <>
            {trips.map((trip: any) => {

                const firstDate = trip.destination.map((destination: any) => new Date(destination.dateStart).getTime()).sort((a: any, b: any) => a - b)[0]
                const lastDate = trip.destination.map((destination: any) => new Date(destination.dateEnd).getTime()).sort((a: any, b: any) => b - a)[0]

                const dateStart = new Date(firstDate).toLocaleDateString('fr-FR')
                const dateEnd = new Date(lastDate).toLocaleDateString('fr-FR')

                return (
                    <div key={trip.id} className="w-4/5 container flex flex-col justify-evenly bg-white/50 my-2 rounded-2xl h-24">
                        <div className="flex justify-between items-center h-3/5">
                            <h2 className="text-xl font-semibold">{trip.title}</h2>
                            <FaRegTrashAlt className="text-red-600" />
                        </div>
                        <div className="flex justify-between items-center">
                            <div className="flex">
                                <FaMapMarkerAlt />
                                <p>{trip.name}</p>
                            </div>
                            <div className="flex items-center">
                                <FaCalendar />
                                <p>{dateStart} - {dateEnd}</p>
                            </div>

                        </div>
                    </div>
                )
            }
            )}
        </>
    )
}