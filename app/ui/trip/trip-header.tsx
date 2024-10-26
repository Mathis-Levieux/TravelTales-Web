import { FaCalendar, FaMapMarkerAlt, FaWallet } from "react-icons/fa";
import { ImExit } from "react-icons/im";
import TripName from "./trip-name-form";
import QuitButton from "./quit-button";
import RoundIcon from "../round-icon";

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

    const destinationList = trip.destination.map((destination: any) => destination.name).join(', ');

    return (
        <div className="flex flex-col md:h-44 h-60 rounded-2xl bg-opacity-65 bg-white">
            <div className="flex justify-between bg-white md:h-2/3 h-1/3 md:pt-3 pt-1 rounded-t-xl bg-opacity-65">
                <TripName tripTitle={trip.title} tripId={trip.id} className={"ps-5 md:w-1/2"} />
                <RoundIcon icon={<QuitButton id={trip.id} className='text-2xl' />} className='bg-red-400 h-10 w-10 border-red-600 border-2 me-4' title="Quitter le voyage" aria-label="Quitter le voyage" />

            </div>
            <div className="flex justify-between bg-jaune md:h-1/3 h-2/3 md:items-center rounded-b-2xl md:flex-row flex-col md:py-0 py-2 md:px-0 px-5 md:gap-0 gap-1">
                <div className="flex items-center gap-2 md:ml-5" title={destinationList} aria-label={destinationList}>
                    <RoundIcon icon={<FaMapMarkerAlt className="text-marron text-2xl" />} className='bg-white h-10 w-10' />
                    <span>{trip.destination[0].name} {(trip.destination.length - 1) > 1 ? `et ${trip.destination.length - 1} autres destinations` : (trip.destination.length - 1) === 1 ? 'et 1 autre destination' : ''}</span>
                </div>
                <div className="flex items-center gap-2" title={`Budget: ${remainingBudget}`} aria-label={`Budget: ${remainingBudget}`}>
                    <RoundIcon icon={<FaWallet className="text-marron text-2xl" />} className='bg-white h-10 w-10' />
                    <span>{remainingBudget}€</span>
                </div>
                <div className="flex items-center gap-2 md:mr-5 mr-2" title={`Début et fin du voyage: ${dateStart} - ${dateEnd}`} aria-label={`Début et fin du voyage: ${dateStart} - ${dateEnd}`}>
                    <RoundIcon icon={<FaCalendar className="text-marron text-2xl" />} className='bg-white h-10 w-10' />
                    <span>{dateStart} - {dateEnd}</span>
                </div>
            </div>
        </div>
    )
}
