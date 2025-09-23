export default function MarketingLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    // Inherit Header/Footer from RootLayout to avoid duplicates
    return <>{children}</>;
}
