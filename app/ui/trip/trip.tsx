import TripHeader from "./trip-header";

export default async function Trip({ trip }: { trip: any }) {

    return (
        <div className="">
            <TripHeader trip={trip} />
        </div>
    )
}
