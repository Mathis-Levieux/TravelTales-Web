import Header from '@/app/ui/header';

export default function HomeLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params?: { tripId: string };
}) {
    const tripId = params?.tripId;
    return (
        <>
            <Header isLoggedIn={true} tripIcons={true} tripId={tripId} />
            {children}
        </>
    );
}
