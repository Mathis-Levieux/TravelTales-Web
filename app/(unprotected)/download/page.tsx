import Header from "@/app/ui/header";

export default async function Page() {
    return (
        <>
            <Header isLandingPage={true} />
            <main className="m-auto w-full flex justify-center">
                <p>Download App</p>
            </main>
        </>
    );
}