import { iconCategoryMap } from "@/app/lib/iconMap";
import { Expense } from "@/app/lib/types";
import { FaQuestionCircle } from "react-icons/fa";
import { colorCategoryMap } from "@/app/lib/colorMap";
import DeleteExpenseComponent from "./delete-expense";
import RoundIcon from "../../round-icon";

export default function ExpenseComponent({ expense }: { expense: Expense }) {

    const DefaultIcon = FaQuestionCircle;
    const color = colorCategoryMap[expense.category] || "bg-white";
    const IconComponent = iconCategoryMap[expense.category] || DefaultIcon;
    const date = expense.date ? new Date(expense.date).toLocaleDateString() : null;

    return (
        <>
            <div className="flex items-center gap-2 w-full">

                <RoundIcon
                    title={expense.name}
                    aria-label={expense.name}
                    icon={<IconComponent className={`text-2xl text-${color}`} />}
                    className={`bg-white border-4 border-${color} h-12 w-12 shrink-0`}
                />

                <div className={`rounded-full font-semibold py-1.5 px-1.5 flex items-center bg-${color} w-full gap-2`}>
                    <div className="bg-white rounded-l-full flex justify-between w-full py-2 px-2 items-center">
                        <span title={`${expense.name}`} className={`font-bold w-2/4 truncate md:max-w-full max-w-[6rem]`}>{expense.name}</span>
                        <span className="">{expense.amount} €</span>
                        <span className="text-gray-400 text-sm" >{date}</span>
                    </div>
                    <DeleteExpenseComponent budgetId={expense.budgetId} expenseId={expense.id} />

                </div>
            </div>
        </>
    )
}