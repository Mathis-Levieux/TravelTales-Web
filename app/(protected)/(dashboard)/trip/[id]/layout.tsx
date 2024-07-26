import Header from '@/app/ui/header';

export default function HomeLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <Header isLoggedIn={true} tripIcons={true} />
            {children}
        </>
    );
}
