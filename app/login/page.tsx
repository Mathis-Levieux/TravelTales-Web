import LoginForm from "@/app/ui/login/loginForm";
import Link from "next/link";
export default async function Home() {
    /*
Vaaarial2@gmail.com
123456789123aA$
    */
    const test = await fetch('http://localhost:3001')
    return (
        <div className="container">
            <main>
                <h1 className="title">
                    Connexion
                </h1>
                <Link href="/">Retour</Link>
                <LoginForm />
                <Link href="user">Profil</Link>
            </main>
        </div>
    )
}