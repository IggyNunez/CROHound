import React from "react";
import { JsonLd } from "./JsonLd";
import { PACKAGES, COMPANY_INFO } from "@/data/constants";

export default function PackageSchema(props?: Record<string, unknown>) {
    const { packageKey, path } = (props || {}) as {
        packageKey?: keyof typeof PACKAGES;
        path?: string;
    };

    // Provide defaults if props are not provided
    const actualPackageKey = packageKey || "free";
    const actualPath = path || "/packages";

    const pkg = PACKAGES[actualPackageKey];

    const packageData = {
        "@context": "https://schema.org",
        "@type": "Product",
        name: pkg.name,
        description: `${pkg.name} - ${pkg.subtitle}`,
        category: "Conversion Rate Optimization Service",
        provider: {
            "@type": "Organization",
            name: COMPANY_INFO.name,
            url: COMPANY_INFO.website,
        },
        offers: {
            "@type": "Offer",
            name: pkg.name,
            description: pkg.features
                .filter((f) => f.included)
                .map((f) => f.text)
                .join(", "),
            price: actualPackageKey === "free" ? "0" : "Contact for pricing",
            priceCurrency: "USD",
            availability: "https://schema.org/InStock",
            url: `${COMPANY_INFO.website}${actualPath}`,
            seller: {
                "@type": "Organization",
                name: COMPANY_INFO.name,
            },
        },
        aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: "5.0",
            ratingCount: "25",
            bestRating: "5",
        },
    };

    return <JsonLd data={packageData} />;
}
