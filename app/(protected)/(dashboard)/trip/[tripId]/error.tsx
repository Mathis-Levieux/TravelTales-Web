"use client"

export default function Error() {
    return (
        <>
            <main className="container mx-auto px-4 py-8">
                <div className="w-full bg-white/50 rounded-2xl py-5">
                    <p>
                        Oups! Une erreur est survenue lors de la récupération des données du voyage. Veuillez réessayer plus tard.
                    </p>
                </div>
            </main>
        </>
    );
}