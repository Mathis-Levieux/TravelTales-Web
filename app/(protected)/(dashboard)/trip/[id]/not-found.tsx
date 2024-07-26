"use client"

export default function NotFound() {
    return (
        <>
            <main className="container mx-auto px-4 py-8">
                <div className="w-full bg-white/50 rounded-2xl py-5">
                    <p>
                        Erreur 404 ! Ce voyage n'existe pas ou ne vous appartient pas.
                    </p>
                </div>
            </main>
        </>
    );
}