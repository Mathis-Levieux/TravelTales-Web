

export default async function TripDestinations({ destinations }: { destinations: any }) {

    return (
        <div className="">
            {destinations.map((destination: any, index: number) => (
                <div key={index} className="flex justify-between bg-white h-1/3 items-center rounded-b-2xl">
                    <div className="flex items-center gap-2 ml-5">
                        <span>{destination.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span>{destination.budget}</span>
                    </div>
                    <div className="flex items-center gap-2 mr-5">
                        <span>{destination.dateStart} - {destination.dateEnd}</span>
                    </div>
                </div>
            )
            )}
        </div>
    )
}
