import LoginForm from "@/app/ui/login/login-form";
import Link from "next/link";
export default async function Home() {
    /*
Vaaarial2@gmail.com
123456789123aA$
    */

    return (
        <div className="container">
            <main>
                <h1>
                    Connexion
                </h1>
                <Link href="/">Retour</Link>
                <LoginForm />
                <Link href="user">Profil</Link>
            </main>
        </div>
    )
}