import { FaPersonWalking } from "react-icons/fa6";
import { IoRestaurantSharp } from "react-icons/io5";
import { MdEdit, MdOutlineCastle } from "react-icons/md";
import { GiShoppingBag } from "react-icons/gi";
import type { Destination } from "../../lib/types";
import { FaCalendar } from "react-icons/fa";


export default async function TripDestinations({ destinations }: { destinations: Destination[] }) {

    return (
        <div className="">
            {destinations.map((destination: Destination, index: number) => (
                <div key={index} className="flex flex-col rounded-b-2xl">
                    <div className="ms-4 me-4 flex justify-between">
                        <h3>{destination.name}</h3>
                        <MdEdit className="" />
                    </div>

                    <div>
                    </div>

                    <div>
                        <FaCalendar className="text-marron" />
                        <p>{destination.dateStart} - {destination.dateEnd}</p>
                    </div>
                </div>
            )
            )}
        </div>
    )
}
