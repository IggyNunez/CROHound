import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Analytics } from "@/components/Analytics";
import { WebVitals } from "@/components/WebVitals";
import { ErrorBoundary, AsyncErrorBoundary } from "@/components/ErrorBoundary";
import { ResourceHints } from "@/components/ResourceHints";
import clientEnv from "@/lib/env";
import "./globals.css";

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-inter",
    display: "swap", // Improve font loading performance
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
    metadataBase: new URL(clientEnv.SITE_URL),
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
            <head>
                {/* Resource Hints for Performance */}
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link
                    rel="preconnect"
                    href="https://fonts.gstatic.com"
                    crossOrigin=""
                />
                <link
                    rel="dns-prefetch"
                    href="https://www.googletagmanager.com"
                />
                <link
                    rel="dns-prefetch"
                    href="https://www.google-analytics.com"
                />
                <link rel="dns-prefetch" href="https://clarity.microsoft.com" />

                {/* Preload critical assets */}
                <link
                    rel="preload"
                    href="/logo_no_description.png"
                    as="image"
                    type="image/png"
                />

                {/* Prefetch important pages */}
                <link rel="prefetch" href="/contact" />
                <link rel="prefetch" href="/packages" />
                <link rel="prefetch" href="/services" />

                {/* Preload Inter font variable (critical for LCP) */}
                <link
                    rel="preload"
                    href="/_next/static/media/HASH_PLACEHOLDER.woff2"
                    as="font"
                    type="font/woff2"
                    crossOrigin=""
                />
            </head>
            <body
                className={`${inter.variable} font-sans antialiased`}
                suppressHydrationWarning={true}
            >
                <ErrorBoundary>
                    <Header />
                    <main className="min-h-screen">
                        <AsyncErrorBoundary>{children}</AsyncErrorBoundary>
                    </main>
                    <Footer />
                </ErrorBoundary>

                {/* Analytics - lazy loaded for performance */}
                <ErrorBoundary
                    fallback={
                        <div className="hidden">
                            {/* Analytics failed to load */}
                        </div>
                    }
                >
                    <Analytics />
                </ErrorBoundary>

                {/* Web Vitals Performance Monitoring */}
                <ErrorBoundary fallback={null}>
                    <WebVitals gaId={clientEnv.GA_ID} />
                </ErrorBoundary>

                {/* Dynamic Resource Hints */}
                <ResourceHints />
            </body>
        </html>
    );
}
