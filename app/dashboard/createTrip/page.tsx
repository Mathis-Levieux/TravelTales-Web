import TripForm from "@/app/ui/dashboard/trip-form";
import Header from "@/app/ui/header";

// Page component
export default async function Page() {
    return (
        <>
            <Header
                dashboardIcons={true}
            />
            <main className="m-auto w-full flex justify-center">
                <TripForm />
            </main>
        </>
    )
}