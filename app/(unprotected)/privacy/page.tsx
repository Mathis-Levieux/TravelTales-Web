import Header from "@/app/ui/header";

export default async function Page() {
    return (
        <>
            <Header />
            <main className="m-auto w-full flex justify-center">
                <section className="max-w-3xl my-10">
                    <h2 className="text-2xl font-bold mt-10 mb-6">Politique de Confidentialité</h2>

                    <h3 className="text-xl font-semibold mt-6 mb-4">1. Types de Données Collectées</h3>
                    <p className="text-gray-700 mb-4">Nous collectons et traitons les données personnelles suivantes :</p>
                    <ul className="list-disc list-inside text-gray-700 mb-6">
                        <li>Données d’identification : Pseudonyme, adresse email.</li>
                        <li>Données relatives à l’utilisation de l’application : Informations sur les voyages planifiés et préférences.</li>
                    </ul>

                    <h3 className="text-xl font-semibold mt-6 mb-4">2. Finalité et Base Légale du Traitement</h3>
                    <p className="text-gray-700 mb-4">Les données personnelles collectées sont utilisées pour :</p>
                    <ul className="list-disc list-inside text-gray-700 mb-6">
                        <li>Gestion du compte utilisateur et accès sécurisé à l’application.</li>
                        <li>Personnalisation des services et enregistrement des préférences de voyage.</li>
                    </ul>

                    <h3 className="text-xl font-semibold mt-6 mb-4">3. Cookies et Stockage de Données</h3>
                    <p className="text-gray-700 mb-6">Les cookies JWT et le stockage sécurisé via Expo Secure Store sont utilisés pour protéger l'accès aux données et garantir la sécurité.</p>

                    <h3 className="text-xl font-semibold mt-6 mb-4">4. Droits des Utilisateurs</h3>
                    <p className="text-gray-700 mb-4">Conformément au RGPD, vous disposez des droits suivants concernant vos données :</p>
                    <ul className="list-disc list-inside text-gray-700 mb-6">
                        <li>Droit d’accès et de rectification.</li>
                        <li>Droit à l’effacement et limitation du traitement.</li>
                        <li>Droit à la portabilité et d’opposition.</li>
                    </ul>

                    <h3 className="text-xl font-semibold mt-6 mb-4">5. Contact</h3>
                    <p className="text-gray-700 mb-6">Pour toute question, veuillez nous contacter par email : <strong>Adresse email de contact</strong>.</p>
                </section>
            </main>
        </>
    );
}
