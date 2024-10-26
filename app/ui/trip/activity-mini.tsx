import { colorMap } from "@/app/lib/colorMap";
import { iconMap } from "@/app/lib/iconMap";
import { Activity } from "@/app/lib/types";
import { FaQuestionCircle } from 'react-icons/fa'; // Fallback icon
import { MdDone } from "react-icons/md";

const DefaultIcon = FaQuestionCircle;

export default async function ActivityComponent({ activity }: { activity: Activity }) {

    const IconComponent = iconMap[activity.category] || DefaultIcon;
    const color = colorMap[activity.category] || "bg-white";
    const date = new Date(activity.date).toLocaleDateString('fr-FR', {
        day: '2-digit',
        month: '2-digit'
    });

    return (
        <div className={`font-semibold rounded-full py-1.5 ps-3 px-1.5 flex items-center bg-${color} w-full`}>
            <div className="flex items-center justify-center rounded-full w-12">
                {date && <span className={`text-sm font-bold`}>{date}</span>}
            </div>
            <div className="bg-white rounded-r-full flex justify-between w-full py-2 ml-2 pl-2">
                <span className={`text-gray-700 truncate md:max-w-full max-w-[8rem]`}>{activity.name}</span>
                <div className="flex gap-2">
                    {activity.isDone && <MdDone className="text-2xl text-bleutext border-4 border-bleufooter rounded-full" />}
                    <IconComponent className={`text-2xl text-${color} mr-5`} title={activity.category} aria-label={activity.category} />
                </div>
            </div>
        </div>

    )
}