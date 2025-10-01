import React from "react";
import { JsonLd } from "./JsonLd";
import { COMPANY_INFO } from "@/data/constants";

export default function BreadcrumbSchema(props?: Record<string, unknown>) {
    const { items } = (props || {}) as {
        items?: Array<{ name: string; url: string; position: number }>;
    };

    // Provide default breadcrumbs if not provided
    const actualItems = items || [
        { name: "Home", url: "/", position: 1 },
        { name: "Current Page", url: "/current", position: 2 },
    ];

    const breadcrumbData = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: actualItems.map((item) => ({
            "@type": "ListItem",
            position: item.position,
            name: item.name,
            item: `${COMPANY_INFO.website}${item.url}`,
        })),
    };

    return <JsonLd data={breadcrumbData} />;
}
