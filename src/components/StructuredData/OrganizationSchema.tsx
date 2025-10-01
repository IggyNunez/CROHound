import { COMPANY_INFO } from "@/data/constants";
import { JsonLd } from "./JsonLd";

export default function OrganizationSchema() {
    const organizationData = {
        "@context": "https://schema.org",
        "@type": "Organization",
        name: COMPANY_INFO.name,
        description: COMPANY_INFO.description,
        url: COMPANY_INFO.website,
        email: COMPANY_INFO.email,
        foundingDate: "2024",
        areaServed: {
            "@type": "Place",
            name: "Worldwide",
        },
        serviceArea: {
            "@type": "Place",
            name: "Worldwide",
        },
        knowsAbout: [
            "Conversion Rate Optimization",
            "Shopify Development",
            "E-commerce Optimization",
            "A/B Testing",
            "User Experience Design",
        ],
        sameAs: [
            // Add social media URLs when available
        ],
    };

    return <JsonLd data={organizationData} />;
}
