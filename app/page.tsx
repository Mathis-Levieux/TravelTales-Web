import Header from './ui/header';
import Image from 'next/image';
import logoSvg from "@/public/logo.svg";

export default function Home() {
  return (
    <>
      <Header isLandingPage={true} />
      <main className="w-full flex justify-center mt-16 px-4 sm:mt-16">
        <div className="flex flex-col items-center p-6 bg-white/50 shadow-lg rounded-lg max-w-2xl m-auto">
          {/* Logo */}
          <div className="flex-shrink-0 mb-4 sm:mb-0">
            <Image
              src={logoSvg}
              alt="Logo de l'application"
              width={128}
              height={128}
              className="w-24 h-24 sm:w-48 sm:h-48"
            />
          </div>

          {/* Texte de bienvenue */}
          <div className="text-center sm:text-left sm:ml-6">
            <h1 className="text-xl sm:text-2xl font-bold text-gray-800 text-center mt-10">
              Bienvenue sur TravelTales !
            </h1>
            <p className="mt-2 text-gray-600">
              Simplifiez vos voyages avec notre plateforme moderne et intuitive. Planifiez vos itinéraires, gérez votre budget et préparez votre valise pour partir l’esprit tranquille.
            </p>
          </div>
        </div>
      </main>
    </>
  );
}
