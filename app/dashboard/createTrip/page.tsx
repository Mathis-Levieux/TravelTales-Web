import TripForm from "@/app/ui/dashboard/trip-form";
import Header from "@/app/ui/header";

// Page component
export default async function Page() {
    return (
        <>
            <main className="container m-auto w-full flex justify-center">
                <TripForm />
            </main>
        </>
    )
}