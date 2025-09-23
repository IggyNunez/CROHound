import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
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

                {/* GA4 Analytics */}
                {process.env.NEXT_PUBLIC_GA_ID && (
                    <>
                        <Script
                            src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
                            strategy="afterInteractive"
                        />
                        <Script id="ga4" strategy="afterInteractive">
                            {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
              `}
                        </Script>
                    </>
                )}

                {/* Microsoft Clarity */}
                {process.env.NEXT_PUBLIC_CLARITY_ID && (
                    <Script id="clarity" strategy="afterInteractive">
                        {`
              (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window,document,"clarity","script","${process.env.NEXT_PUBLIC_CLARITY_ID}");
            `}
                    </Script>
                )}
            </body>
        </html>
    );
}
