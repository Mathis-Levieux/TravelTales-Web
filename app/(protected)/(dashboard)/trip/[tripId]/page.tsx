import { getTrip } from "@/app/lib/data";
import { notFound } from "next/navigation";
import Trip from "@/app/ui/trip/trip";

export default async function Page({ params }: { params: { tripId: string } }) {

    const trip = await getTrip(params.tripId);
    if (!trip) notFound();


    return (
        <>
            <main className="container mx-auto px-4 py-12 w-2/3">
                <Trip trip={trip} />
            </main>
        </>
    )
}