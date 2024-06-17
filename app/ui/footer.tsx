import Link from 'next/link';

export default async function Footer() {
  return (
    <footer className="bg-bleufooter h-20 flex justify-center items-center mt-auto sm:text-base text-sm">
      <p className="text-white">
        © 2024 TravelTales - Terms Privacy - Cookies{' '}
      </p>
    </footer>
  );
}
