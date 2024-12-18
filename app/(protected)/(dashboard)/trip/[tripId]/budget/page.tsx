import { getBudgetCategories, getTrip } from "@/app/lib/data";
import { Trip } from "@/app/lib/types";
import TripButton from "@/app/ui/home/trip-button";
import Budget from "@/app/ui/trip/budget/budget";
import CreateBudgetForm from "@/app/ui/trip/budget/create-budget";
import TripHeader from "@/app/ui/trip/trip-header";
import { notFound } from "next/navigation";

export default async function Page({ params }: { params: { tripId: string } }) {

    const trip = await getTrip(params.tripId);
    if (!trip) notFound();

    const budgetCategories = await getBudgetCategories();
    const budget = trip.budget[0];
    return (
        <>
            <main className="container mx-auto md:px-4 px-2 md:py-12 py-6 md:w-2/3 w-full">
                <div className="flex flex-col rounded-2xl bg-opacity-55 bg-white">
                    <TripHeader trip={trip} />
                    {trip.budget.length === 0 ? (
                        <>
                            <h3 className="text-center font-bold my-12 text-3xl text-marron">Vous n'avez pas encore de budget, créez en un maintenant !</h3>
                            <CreateBudgetForm tripId={trip.id} >
                                <TripButton
                                    textColor="marron"
                                    title='Créer un budget'
                                    icon='plus'
                                    textCenter={true}
                                    className='mt-5 mb-10 shadow-createtripbutton bg-jaune border-beige w-3/5 m-auto'>
                                    Créer un budget
                                </TripButton>
                            </CreateBudgetForm>
                        </>
                    ) :
                        (
                            <Budget categories={budgetCategories} budget={budget} />
                        )
                    }
                </div>

            </main>
        </>
    )
}