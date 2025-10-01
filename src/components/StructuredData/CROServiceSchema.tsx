import React from "react";
import { JsonLd } from "./JsonLd";
import { COMPANY_INFO } from "@/data/constants";

export default function CROServiceSchema() {
    const serviceData = {
        "@context": "https://schema.org",
        "@type": "Service",
        name: "Shopify Conversion Rate Optimization",
        serviceType: "Conversion Rate Optimization",
        description:
            "Professional CRO services to increase your Shopify store's conversion rate and revenue without adding ad spend.",
        provider: {
            "@type": "Organization",
            name: COMPANY_INFO.name,
            url: COMPANY_INFO.website,
            email: COMPANY_INFO.email,
        },
        areaServed: {
            "@type": "Place",
            name: "Worldwide",
        },
        availableChannel: {
            "@type": "ServiceChannel",
            serviceUrl: `${COMPANY_INFO.website}/contact`,
            availableLanguage: "English",
        },
        offers: [
            {
                "@type": "Offer",
                name: "Free Sniff Check",
                price: "0",
                priceCurrency: "USD",
                description:
                    "12-point conversion audit with 5-minute video walkthrough and quick wins checklist",
                availability: "https://schema.org/InStock",
                priceValidUntil: "2025-12-31",
            },
            {
                "@type": "Offer",
                name: "Monthly CRO Program",
                price: "2500",
                priceCurrency: "USD",
                description:
                    "Ongoing conversion optimization with up to 10 dev hours monthly, A/B testing, and performance reporting",
                availability: "https://schema.org/InStock",
            },
            {
                "@type": "Offer",
                name: "Project-Based Optimization",
                price: "5000",
                priceCurrency: "USD",
                description:
                    "Complete site overhaul with custom optimization strategy and 3-month follow-up support",
                availability: "https://schema.org/InStock",
            },
        ],
        category: "Digital Marketing",
        serviceOutput: [
            {
                "@type": "Thing",
                name: "Conversion Rate Improvement",
            },
            {
                "@type": "Thing",
                name: "Revenue Increase",
            },
            {
                "@type": "Thing",
                name: "User Experience Optimization",
            },
        ],
        hasOfferCatalog: {
            "@type": "OfferCatalog",
            name: "CRO Services",
            itemListElement: [
                {
                    "@type": "Offer",
                    itemOffered: {
                        "@type": "Service",
                        name: "Conversion Rate Audit",
                        description:
                            "Comprehensive analysis of conversion barriers and opportunities",
                    },
                },
                {
                    "@type": "Offer",
                    itemOffered: {
                        "@type": "Service",
                        name: "A/B Testing & Optimization",
                        description:
                            "Data-driven testing to validate changes and maximize improvements",
                    },
                },
                {
                    "@type": "Service",
                    name: "Technical Performance Optimization",
                    description:
                        "Speed optimization and technical improvements to reduce bounce rates",
                },
            ],
        },
        review: {
            "@type": "Review",
            reviewRating: {
                "@type": "Rating",
                ratingValue: "5.0",
                bestRating: "5",
            },
            author: {
                "@type": "Person",
                name: "Sarah M.",
            },
            reviewBody:
                "CROHound increased our conversion rate by 40% in just 3 months. The free audit alone provided incredibly valuable insights.",
        },
        aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: "4.9",
            reviewCount: "47",
            bestRating: "5",
        },
    };

    return <JsonLd data={serviceData} />;
}
