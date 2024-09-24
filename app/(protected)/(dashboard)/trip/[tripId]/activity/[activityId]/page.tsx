import { getActivity, getTrip } from "@/app/lib/data";
import ActivityFull from "@/app/ui/trip/activity-full";
import TripHeader from "@/app/ui/trip/trip-header";
import { notFound } from "next/navigation";

export default async function Page({ params }: { params: { tripId: string, activityId: string } }) {


    const trip = await getTrip(params.tripId);
    if (!trip) notFound();
    const activity = await getActivity(params.activityId);
    if (!activity) notFound();

    return (
        <>
            <main className="container mx-auto px-4 py-12 w-2/3">
                <div className="flex flex-col rounded-2xl bg-opacity-55 bg-white">
                    <TripHeader trip={trip} />
                    <ActivityFull activity={activity} />
                </div>
            </main>
        </>
    )
}