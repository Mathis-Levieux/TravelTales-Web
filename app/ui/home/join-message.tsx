"use client";

import { useSearchParams } from "next/navigation";

export default function JoinMessage() {

    const searchParams = useSearchParams();
    const join = searchParams.get('join');
    console.log(join);
    if (join == 'success') {
        return (
            <p className="text-black text-center mb-4">Vous avez bien rejoint le voyage !</p>
        );
    }

    else if (join == 'already') {
        return (
            <p className="text-red-800 text-center mb-4">Vous avez déjà rejoint ce voyage !</p>
        );
    }
    else if (join == 'error') {
        return (
            <p className="text-red-800 text-center mb-4">Une erreur est survenue, veuillez réessayer</p>
        );
    }
}
