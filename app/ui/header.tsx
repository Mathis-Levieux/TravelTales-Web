import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { CgProfile } from 'react-icons/cg';
import { FaFolder, FaSuitcaseRolling, FaUsers, FaWallet } from 'react-icons/fa';
import { IoMdNotifications, IoMdTrophy } from 'react-icons/io';
import { IoEarthSharp } from 'react-icons/io5';

interface HeaderProps {
  button?: boolean;
  buttonText?: string;
  link?: string;
  tripIcons?: boolean;
  homeIcons?: boolean;
  isLoggedIn?: boolean;
  isLandingPage?: boolean;
  tripId?: string;
}


export default async function Header({
  isLoggedIn,
  button,
  buttonText,
  link,
  tripIcons,
  homeIcons,
  isLandingPage,
  tripId
}: HeaderProps) {


  return (
    <header className="h-24 bg-header flex items-center">
      {
        isLoggedIn &&
        <Link className="sm:ml-12" href={`/user`}>
          <CgProfile className="sm:text-6xl text-6xl" color="white" />
        </Link>
      }

      <Link className="sm:ml-12 ml-4" href={'/'}>
        <h1 className="raemoon text-7xl text-white font-bold pt-3">
          TravelTales
        </h1>
      </Link>

      {homeIcons && (
        <>
          <Link className="ml-auto sm:mr-12 mr-3" href={'/achievements'}>
            <IoMdTrophy className="text-3xl" color="white" />
          </Link>
          <IoMdNotifications className="sm:mr-12 text-3xl mr-3" color="white" />
        </>
      )}

      {tripIcons && (
        <div className="ml-auto flex gap-32 mr-20">
          <Link href={`/trip/${tripId}`}>
            <IoEarthSharp className="" size={30} color="white" />
          </Link>
          <FaFolder className="" size={30} color="white" />
          <Link href={`/trip/${tripId}/packing-list`}>
            <FaSuitcaseRolling className="" size={30} color="white" />
          </Link>
          <Link href={`/trip/${tripId}/budget`}>
            <FaWallet className="" size={30} color="white" />
          </Link>
          <Link href={`/trip/${tripId}/members`}>
            <FaUsers className="" size={30} color="white" />
          </Link>
        </div>
      )}

      {button && link && (
        <Link className="ml-auto mr-12" href={link}>
          <Button className="w-80 rounded-full bg-white text-bleutext">
            {buttonText}
          </Button>
        </Link>
      )}

      {isLandingPage && (
        <div className='ml-auto'>
          <Link className="mr-12" href={'/login'}>
            <Button className="w-80 rounded-full bg-white text-bleutext">
              Se connecter
            </Button>
          </Link>

          <Link className="mr-12" href={'/register'}>
            <Button className="w-80 rounded-full bg-white text-bleutext">
              Créer un compte
            </Button>
          </Link>
        </div>
      )}
    </header>
  );
}
