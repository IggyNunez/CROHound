import React from "react";
import { JsonLd } from "./JsonLd";
import { CRO_SERVICES, COMPANY_INFO } from "@/data/constants";

export default function ServiceSchema(props?: Record<string, unknown>) {
    const { serviceKey, path } = (props || {}) as {
        serviceKey?: keyof typeof CRO_SERVICES;
        path?: string;
    };

    // Provide defaults if props are not provided
    const actualServiceKey = serviceKey || "audit";
    const actualPath = path || "/services";

    const service = CRO_SERVICES[actualServiceKey];

    const serviceData = {
        "@context": "https://schema.org",
        "@type": "Service",
        name: service.title,
        description: service.description,
        provider: {
            "@type": "Organization",
            name: COMPANY_INFO.name,
            url: COMPANY_INFO.website,
        },
        areaServed: {
            "@type": "Place",
            name: "Worldwide",
        },
        availableChannel: {
            "@type": "ServiceChannel",
            serviceUrl: `${COMPANY_INFO.website}${actualPath}`,
            availableLanguage: "English",
        },
        category: "Conversion Rate Optimization",
        serviceOutput: service.features.map((feature) => ({
            "@type": "Thing",
            name: feature,
        })),
        offers: {
            "@type": "Offer",
            description: `${service.title} service`,
            areaServed: {
                "@type": "Place",
                name: "Worldwide",
            },
        },
    };

    return <JsonLd data={serviceData} />;
}
