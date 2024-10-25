import { Budget } from "@/app/lib/types";
import Expense from "./expense";
import { FaCoins, FaMoneyBillTransfer, FaWallet } from "react-icons/fa6";
import RoundIcon from "../../round-icon";
import TripButton from "../../home/trip-button";
import AddExpenseForm from "./add-expense";
import { getActivities } from "@/app/lib/data";
import DeleteBudgetComponent from "./delete-budget";
import EditBudgetComponent from "./edit-budget";
export default async function BudgetComponent({ budget, categories }: { budget: Budget, categories: string[] }) {

    const totalExpense = budget.expense.reduce((acc, expense) => acc + expense.amount, 0);
    const balance = budget.amount - totalExpense;
    const activities = await getActivities(budget.tripId);

    return (
        <>
            <div className="w-full flex m-14 justify-around">
                <div className="flex flex-col w-2/5">
                    <div className="flex bg-opacity-55 bg-white items-center justify-between rounded-t-3xl py-5">
                        <div className="flex gap-3 items-center ms-3">
                            <FaCoins className="text-marron text-2xl me-3" />
                            <h2 className="text-center font-bold text-2xl text-marronfonce">Budget: {budget.amount} €</h2>
                        </div>
                        <div className="flex gap-3 items-center me-3">
                            <DeleteBudgetComponent budgetId={budget.id} />
                            <EditBudgetComponent budget={budget} categories={categories} />
                        </div>
                    </div>
                    <div className="flex flex-col bg-jaune rounded-b-3xl py-5 ps-4">
                        <div className="flex items-center">
                            <FaMoneyBillTransfer className="text-marron text-3xl m-2" />
                            <span className="font-bold text-xl text-marronfonce">Dépensé : {totalExpense} €</span>
                        </div>
                        <div className="flex items-center">
                            <FaWallet className="text-marron text-3xl m-2" />
                            <span className="font-bold text-xl text-marronfonce">Solde : {balance} €</span>
                        </div>
                    </div>
                    <AddExpenseForm budgetId={budget.id} activities={activities}>
                        <TripButton
                            textColor="marron"
                            title='Créer une dépense'
                            icon='plus'
                            textCenter={false}
                            className='mt-5 mb-10 shadow-createtripbutton bg-jaune border-beige w-full m-auto text-marron font-bold'>
                            Ajouter une dépense
                        </TripButton>
                    </AddExpenseForm>
                </div>
                <div className="w-2/5">
                    <Expense />
                </div>
            </div>
        </>
    )
}