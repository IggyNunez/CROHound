import React from "react";
import { JsonLd } from "./JsonLd";
import { CRO_SERVICES, COMPANY_INFO } from "@/data/constants";

export default function LocalBusinessSchema() {
    const businessData = {
        "@context": "https://schema.org",
        "@type": "ProfessionalService",
        name: COMPANY_INFO.name,
        description: COMPANY_INFO.description,
        url: COMPANY_INFO.website,
        email: COMPANY_INFO.email,
        serviceType: "Conversion Rate Optimization",
        areaServed: {
            "@type": "Place",
            name: "Worldwide",
        },
        hasOfferCatalog: {
            "@type": "OfferCatalog",
            name: "CRO Services",
            itemListElement: Object.values(CRO_SERVICES).map((service) => ({
                "@type": "Offer",
                itemOffered: {
                    "@type": "Service",
                    name: service.title,
                    description: service.description,
                },
            })),
        },
    };

    return <JsonLd data={businessData} />;
}
