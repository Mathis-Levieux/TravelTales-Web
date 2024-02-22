import Link from "next/link";
import { logOut } from "../lib/actions";

export default async function Nav() {
    return (
        <nav className="flex">
            <Link className="me-11" href="/dashboard">Retour au Dashboard</Link>
            <form action={logOut}>
                <button type="submit">Déconnexion</button>
            </form>
        </nav>
    )
}