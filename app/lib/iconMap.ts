import { FaBagShopping, FaBed, FaBurger, FaPersonWalking, FaTrainSubway } from "react-icons/fa6";
import { IconType } from 'react-icons';
import { FaEllipsisH, FaLandmark, FaTree } from "react-icons/fa";

export const iconMap: { [key: string]: IconType } = {
    food: FaBurger,
    shopping: FaBagShopping,
    culture: FaLandmark,
    sport: FaPersonWalking,
    other: FaEllipsisH,
    nature: FaTree,
};

export const iconCategoryMap: { [key: string]: IconType } = {
    accommodation: FaBed,
    transport: FaTrainSubway,
    food: FaBurger,
    activities: FaPersonWalking,
    other: FaEllipsisH,
};
