import { FaShareAlt } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";


interface TripButtonProps {
    children: React.ReactNode;
    className?: string;
    textColor: string;
    icon: string;
}

export default function TripButton({
    className,
    children,
    textColor,
    icon
}: TripButtonProps) {
    return (
        <button className={`w-full font-semibold rounded-full py-2 px-3 flex items-center opacity-85 ${className}`}>
            <div className="flex items-center justify-center rounded-full">
                {icon == 'plus' &&
                    <FaPlus className={`text-${textColor}`} size={32} />
                }
                {
                    icon == 'share' &&
                    <FaShareAlt className={`text-${textColor}`} size={32} />

                }
            </div>
            <div className="bg-white rounded-r-full flex w-full py-1 ml-2 pl-2">
                <span className="mr-auto">{children}</span>
            </div>
        </button>
    );
}
