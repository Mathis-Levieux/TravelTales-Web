import Link from "next/link";
import Profil from "../ui/profil";
import { Suspense, useEffect } from "react";
import { saveRefreshToken } from "../lib/actions";
import { getUsers } from "../lib/data";

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