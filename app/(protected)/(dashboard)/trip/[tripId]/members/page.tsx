import { getTrip, getUsersInTrips } from "@/app/lib/data";
import { User } from "@/app/lib/types";
import FormMemberInvitation from "@/app/ui/members/form-invit-member";
import MemberComponent from "@/app/ui/members/member-list-component";
import RoundIcon from "@/app/ui/round-icon";
import TripHeader from "@/app/ui/trip/trip-header";
import { notFound } from "next/navigation";
import { FaShareAlt } from "react-icons/fa";
import { IoIosSend } from "react-icons/io";

export default async function Page({ params }: { params: { tripId: string } }) {

    const trip = await getTrip(params.tripId);
    if (!trip) notFound();
    const usersInTrip = await getUsersInTrips(params.tripId);
    const tripId = parseInt(params.tripId);


    return (
        <>
            <main className="container mx-auto md:px-4 px-2 md:py-12 py-6 md:w-2/3 w-full">
                <div className="flex flex-col rounded-2xl bg-opacity-55 bg-white">
                    <TripHeader trip={trip} />
                    <div className="gap-4 flex flex-col w-full mb-16">
                        <FormMemberInvitation tripId={tripId}/>
                        {usersInTrip.map((user: User) => (
                            <MemberComponent key={user.id} user={user} />
                        ))}
                    </div>
                </div>
            </main>
        </>
    )
}