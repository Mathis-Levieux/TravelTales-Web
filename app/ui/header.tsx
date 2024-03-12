import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CgProfile } from "react-icons/cg";

export default async function Header() {
    return (
        <header className="h-40 bg-header flex items-center">

            <CgProfile className="ml-12" size={120} color="white" />
            <Link className="ml-12" href={'/'}>
                <h1 className="raemoon text-7xl text-white font-bold">
                    TravelTales
                </h1>
            </Link>

            <Link className="ml-auto mr-12" href={'/register'}>
                <Button className="w-80 rounded-full bg-white text-bluetext">
                    Créer un compte
                </Button>
            </Link>
        </header>
    )
}