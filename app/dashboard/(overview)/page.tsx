import Trips from "../../ui/dashboard/trips";
import { getTrips } from "../../lib/data";
import { Suspense } from "react";


export default async function Page() {

    const trips = await getTrips();

    return (
        <>
            <main className="container">
                <Trips trips={trips} />
            </main>
        </>
    )
}