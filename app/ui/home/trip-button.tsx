import { FaShareAlt } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";


interface TripButtonProps {
    children: React.ReactNode;
    className?: string;
    textColor: string;
    icon: string;
    textCenter?: boolean;
    title?: string;
}

export default function TripButton({
    className,
    children,
    title,
    textColor,
    icon,
    textCenter,
}: TripButtonProps) {
    return (
        <button className={`font-semibold rounded-full py-3 px-3 flex items-center opacity-85 ${className}`} title={title}>
            <div className="flex items-center justify-center rounded-full">
                {icon == 'plus' &&
                    <FaPlus className={`text-${textColor}`} size={32} />
                }
                {
                    icon == 'share' &&
                    <FaShareAlt className={`text-${textColor}`} size={32} />

                }
            </div>
            <div className="bg-white rounded-r-full flex w-full py-2 ml-2 pl-2">
                <span className={textCenter ? "m-auto" : "mr-auto"}>{children}</span>
            </div>
        </button>
    );
}
