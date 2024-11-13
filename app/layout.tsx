export const dynamic = 'force-dynamic';
import type { Metadata } from 'next';
import { Plus_Jakarta_Sans, Inter } from 'next/font/google';
import './globals.css';
import Footer from './ui/footer';
import ScreenSizeRedirect from './ui/screen-size-redirect';
const inter = Inter({ subsets: ['latin'] });
const plusJakartaSans = Plus_Jakarta_Sans({ subsets: ['latin'] });

export const metadata: Metadata = {
  applicationName: 'TravelTales',
  title: 'TravelTales',
  description: 'TravelTales est une application de planification de voyages simple et intuitive.',
  keywords: ['travel', 'trip', 'planner', 'itinerary', 'voyage'],
  robots: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1,
    "max-video-preview": -1,
    googleBot: "index, follow"
  },
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    siteName: 'TravelTales',
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <html lang="en">
      <body className={plusJakartaSans.className}>
        <div className="min-h-screen flex flex-col">
          <ScreenSizeRedirect />
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}
