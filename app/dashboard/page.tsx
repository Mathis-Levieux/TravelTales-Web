import Link from "next/link";

export default async function Page() {

    return (
        <main className="container">
            <h1>
                Dashboard
            </h1>
            <Link href="/dashboard/createTrip">Créer un voyage</Link>
        </main>
    )
}