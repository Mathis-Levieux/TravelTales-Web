import { getTrip, getUsersInTrips } from "@/app/lib/data";
import { User } from "@/app/lib/types";
import TripHeader from "@/app/ui/trip/trip-header";
import { notFound } from "next/navigation";

export default async function Page({ params }: { params: { tripId: string } }) {

    const trip = await getTrip(params.tripId);
    if (!trip) notFound();
    const usersInTrip = await getUsersInTrips(params.tripId);
    console.log(usersInTrip);
    return (
        <>
            <main className="container mx-auto px-4 py-12 w-2/3">
                <div className="flex flex-col rounded-2xl bg-opacity-55 bg-white">
                    <TripHeader trip={trip} />
                    {usersInTrip.map((user: User) => (
                        <>
                            <p>{user.username}</p>
                        </>
                    ))}
                </div>
            </main>
        </>
    )
}