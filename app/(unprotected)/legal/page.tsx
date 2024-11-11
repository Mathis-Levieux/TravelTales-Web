import Header from "@/app/ui/header";

export default async function Page() {
    return (
        <>
            <Header />
            <main className="m-auto w-full flex justify-center">
                <section className="max-w-3xl my-10">
                    <h2 className="text-2xl font-bold mt-10 mb-6">Mentions légales</h2>
                    <h3 className="text-xl font-semibold mt-6 mb-4">Éditeur de l’application</h3>
                    <p className="text-gray-700 mb-2">Nom de l’entreprise ou de l’individu : <strong>Nom de l’éditeur</strong></p>
                    <p className="text-gray-700 mb-2">Adresse : <strong>Adresse complète</strong></p>
                    <p className="text-gray-700 mb-2">Numéro de téléphone : <strong>Numéro de téléphone</strong></p>
                    <p className="text-gray-700 mb-2">Email : <strong>Adresse email de contact</strong></p>
                    <p className="text-gray-700 mb-2">Responsable de la publication : <strong>Nom du responsable de la publication</strong></p>

                    <h3 className="text-xl font-semibold mt-6 mb-4">Hébergement</h3>
                    <p className="text-gray-700 mb-2">Nom de l’hébergeur : <strong>Nom de l’hébergeur</strong></p>
                    <p className="text-gray-700 mb-2">Adresse de l’hébergeur : <strong>Adresse complète de l’hébergeur</strong></p>
                    <p className="text-gray-700 mb-2">Numéro de téléphone : <strong>Numéro de téléphone de l’hébergeur</strong></p>
                </section>
            </main>
        </>
    );
}
