import Header from "../ui/header";
import RegisterForm from "../ui/register/register-form";

export default function Page() {
    return (
        <>
            <Header
                button={true}
                buttonText="Se connecter"
                link="/login"
            />
            <main className="m-auto w-full flex justify-center">
                <RegisterForm />
            </main>
        </>
    )
}