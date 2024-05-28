import Header from "../ui/header"

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <>
            <Header
                dashboardIcons={true}
            />
            {children}
        </>
    )
}