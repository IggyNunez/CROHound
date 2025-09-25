import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Analytics } from "@/components/Analytics";
import "./globals.css";

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-inter",
});

export const metadata: Metadata = {
    title: {
        default: "CROHound - Shopify CRO & Conversion Optimization",
        template: "%s | CROHound",
    },
    description:
        "Turn more Shopify visitors into buyers without adding ad spend. We run lean CRO programs for $5k–$50k/mo stores. Start with a free 12-point Sniff Check.",
    keywords: [
        "Shopify CRO",
        "conversion optimization",
        "ecommerce optimization",
        "Shopify conversion rate",
    ],
    authors: [{ name: "CROHound" }],
    creator: "CROHound",
    publisher: "CROHound",
    metadataBase: new URL(
        process.env.NEXT_PUBLIC_SITE_URL || "https://www.crohound.com"
    ),
    openGraph: {
        type: "website",
        locale: "en_US",
        url: "/",
        title: "CROHound - Shopify CRO & Conversion Optimization",
        description:
            "Turn more Shopify visitors into buyers without adding ad spend. We run lean CRO programs for $5k–$50k/mo stores.",
        siteName: "CROHound",
        images: [
            {
                url: "/og.jpg",
                width: 1200,
                height: 630,
                alt: "CROHound - Shopify CRO & Conversion Optimization",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "CROHound - Shopify CRO & Conversion Optimization",
        description:
            "Turn more Shopify visitors into buyers without adding ad spend. We run lean CRO programs for $5k–$50k/mo stores.",
        images: ["/og.jpg"],
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
        },
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={`${inter.variable} font-sans antialiased`}
                suppressHydrationWarning={true}
            >
                <Header />
                <main className="min-h-screen">{children}</main>
                <Footer />

                {/* Analytics - lazy loaded for performance */}
                <Analytics
                    gaId={process.env.NEXT_PUBLIC_GA_ID}
                    clarityId={process.env.NEXT_PUBLIC_CLARITY_ID}
                />
            </body>
        </html>
    );
}
