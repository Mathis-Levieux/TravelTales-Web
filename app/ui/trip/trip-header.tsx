import { FaCalendar, FaMapMarkerAlt, FaWallet } from "react-icons/fa";
import { ImExit } from "react-icons/im";
import TripName from "./trip-name-form";
import QuitButton from "./quit-button";

export default async function TripHeader({ trip }: { trip: any }) {

    const firstDate = Math.min(...trip.destination.map((destination: any) => new Date(destination.dateStart).getTime()));
    const lastDate = Math.max(...trip.destination.map((destination: any) => new Date(destination.dateEnd).getTime()));

    const dateStart = new Date(firstDate).toLocaleDateString('fr-FR');
    const dateEnd = new Date(lastDate).toLocaleDateString('fr-FR');

    const totalBudget = trip.budget.reduce((acc: number, curr: any) => acc + curr.amount, 0);

    const totalExpenses = trip.budget.reduce((acc: number, curr: any) => {
        return acc + curr.expense.reduce((expenseAcc: number, expenseCurr: any) => expenseAcc + expenseCurr.amount, 0);
    }, 0);

    const remainingBudget = totalBudget - totalExpenses;

    return (
        <div className="flex flex-col  h-36 rounded-2xl bg-opacity-65 bg-white">
            <div className="flex justify-between bg-white h-2/3 pt-3 rounded-t-xl bg-opacity-65">
                <TripName tripTitle={trip.title} tripId={trip.id} className={"ps-5 w-1/2"} />
                <div className="rounded-full bg-black">
                    <QuitButton id={trip.id} />
                </div>
            </div>
            <div className="flex justify-between bg-jaune h-1/3 items-center rounded-b-2xl">
                <div className="flex items-center gap-2 ml-5">
                    <FaMapMarkerAlt className="text-marron" />
                    <span>{trip.destination[0].name} {(trip.destination.length - 1) > 1 ? `et ${trip.destination.length - 1} autres destinations` : (trip.destination.length - 1) === 1 ? 'et 1 autre destination' : ''}</span>
                </div>
                <div className="flex items-center gap-2">
                    <FaWallet className="text-marron" />
                    <span>{remainingBudget}€</span>
                </div>
                <div className="flex items-center gap-2 mr-5">
                    <FaCalendar className="text-marron" />
                    <span>{dateStart} - {dateEnd}</span>
                </div>
            </div>
        </div>
    )
}
