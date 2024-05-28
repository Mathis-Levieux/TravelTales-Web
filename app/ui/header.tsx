import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CgProfile } from "react-icons/cg";
import { FaFolder, FaSuitcaseRolling, FaUsers, FaWallet } from "react-icons/fa";
import { IoMdNotifications, IoMdTrophy } from "react-icons/io";
import { IoEarthSharp } from "react-icons/io5";



// TO DO : AJOUTER LES LIENS VERS LES PAGES CORRESPONDANTES

interface HeaderProps {
    button?: boolean;
    buttonText?: string;
    link?: string;
    tripIcons?: boolean;
    dashboardIcons?: boolean;
}

export default async function Header({ button, buttonText, link, tripIcons, dashboardIcons }: HeaderProps) {
    return (
        <header className="h-24 bg-header flex items-center">

            <CgProfile className="ml-12" size={80} color="white" />
            <Link className="ml-12" href={'/'}>
                <h1 className="raemoon text-7xl text-white font-bold pt-3">
                    TravelTales
                </h1>
            </Link>

            {
                dashboardIcons &&
                <>
                    <Link className="ml-auto mr-12" href={'/achievements'}>
                        <IoMdTrophy className="" size={30} color="white" />
                    </Link>
                    <IoMdNotifications className="mr-12" size={30} color="white" />
                </>
            }

            {
                tripIcons &&
                <div className="ml-auto flex gap-32 mr-20">
                    <IoEarthSharp className="" size={30} color="white" />
                    <FaFolder className="" size={30} color="white" />
                    <FaSuitcaseRolling className="" size={30} color="white" />
                    <FaWallet className="" size={30} color="white" />
                    <FaUsers className="" size={30} color="white" />
                </div>
            }

            {
                button && link &&
                <Link className="ml-auto mr-12" href={link}>
                    <Button className="w-80 rounded-full bg-white text-bluetext">
                        {buttonText}
                    </Button>
                </Link>
            }
        </header>
    )
}