import Link from 'next/link';

export default async function Footer() {
  return (
    <footer className="bg-bleufooter h-20 flex justify-center items-center mt-auto sm:text-base text-sm">
      <p className="text-white">
        © 2024 TravelTales
      </p>
      <Link href="/legal">
        <span className="text-white ml-4">Mentions légales</span>
      </Link>
      <Link href="/privacy">
        <span className="text-white ml-4">Politique de confidentialité</span>
      </Link>
    </footer>
  );
}
