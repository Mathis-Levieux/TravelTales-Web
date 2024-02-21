import Link from "next/link";

export default async function Page() {

    return (
        <div className="container">
            <main>
                <h1>
                    Dashboard
                </h1>
                <Link href="/dashboard/createTrip">Créer un voyage</Link>
            </main>
        </div>
    )
}