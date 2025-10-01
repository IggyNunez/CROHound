import { COMPANY_INFO } from "@/data/constants";
import { JsonLd } from "./JsonLd";

export default function WebsiteSchema() {
    const websiteData = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: COMPANY_INFO.name,
        alternateName: COMPANY_INFO.tagline,
        description: COMPANY_INFO.description,
        url: COMPANY_INFO.website,
        potentialAction: {
            "@type": "SearchAction",
            target: `${COMPANY_INFO.website}/search?q={search_term_string}`,
            "query-input": "required name=search_term_string",
        },
        publisher: {
            "@type": "Organization",
            name: COMPANY_INFO.name,
            url: COMPANY_INFO.website,
        },
    };

    return <JsonLd data={websiteData} />;
}
