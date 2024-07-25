import { getTrip } from "@/app/lib/data";

export default async function Page({ params }: { params: { id: string } }) {

    const trip = await getTrip(params.id);
    console.log(trip);

    return (
        <>
            <main className="container m-auto w-full flex justify-center">
                oe {params.id}
            </main>
        </>
    )
}