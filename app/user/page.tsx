import Link from "next/link";
import Profil from "../ui/profil";
import { Suspense } from "react";

export default async function Home() {


    return (
        <div className="container">
            <main>
                <Link href="/">Retour</Link>
                <Suspense fallback={<p>Chargement...</p>}>
                    <Profil />
                </Suspense>
            </main>
        </div>
    );
}