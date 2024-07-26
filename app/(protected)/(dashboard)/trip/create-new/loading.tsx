import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
    return (
        <div className="container m-auto w-full flex justify-center">
            <div className="my-7 rounded-2xl sm:w-6/12 w-full bg-white/50 flex flex-col items-center">
                <div className="sm:w-10/12 w-11/12 my-20">
                    <div className="pb-3 relative">
                        <Skeleton className="absolute left-3 top-5 transform -translate-y-1/2 z-10 w-6 h-6" />
                        <Skeleton className="rounded-full border-none focus-visible:ring-2 pl-10 placeholder:font-bold h-12 w-full" />
                    </div>

                    <div className="pb-3 relative">
                        <Skeleton className="absolute left-3 top-5 transform -translate-y-1/2 z-10 w-6 h-6" />
                        <Skeleton className="rounded-full border-none focus-visible:ring-2 pl-10 placeholder:font-bold h-12 w-full" />
                    </div>

                    <div className="">
                        <div className="pb-3 relative">
                            <Skeleton className="absolute left-3 top-5 transform -translate-y-1/2 z-10 w-6 h-6" />
                            <Skeleton className="rounded-full border-none focus-visible:ring-2 pl-10 placeholder:font-bold h-12 w-full" />
                        </div>
                        <div className="pb-3 relative">
                            <Skeleton className="h-12 w-full" />
                        </div>
                        <Skeleton className="h-10 w-40" />
                    </div>

                    <Skeleton className="mt-3 h-10 w-64" />

                    <div className="mt-3 text-center">
                        <Skeleton className="h-10 w-full rounded-b-2xl rounded-t-none bg-jaune" />
                    </div>
                </div>
            </div>
        </div>
    );
}