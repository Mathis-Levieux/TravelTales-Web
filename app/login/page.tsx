import LoginForm from "@/app/ui/login/login-form";
import Link from "next/link";
import Header from "../ui/header";
export default async function Page() {
    /*
Vaaarial2@gmail.com
123456789123aA$
    */

    return (
        <>
            <Header
                button={true}
                buttonText="Créer un compte"
                link="/register"
            />
            <main className="m-auto w-full flex justify-center">
                <LoginForm />
            </main>
        </>
    )
}