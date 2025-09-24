import { COMPANY_INFO, CRO_SERVICES, PACKAGES } from "@/data/constants";

interface JsonLdProps {
    data: object;
}

function JsonLd({ data }: JsonLdProps) {
    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(data, null, 2) }}
        />
    );
}

// Organization schema for the company
export function OrganizationSchema() {
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

// Service schema for individual CRO services
export function ServiceSchema({
    serviceKey,
    path,
}: {
    serviceKey: keyof typeof CRO_SERVICES;
    path: string;
}) {
    const service = CRO_SERVICES[serviceKey];

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
            serviceUrl: `${COMPANY_INFO.website}${path}`,
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

// Product schema for packages/pricing
export function PackageSchema({
    packageKey,
    path,
}: {
    packageKey: keyof typeof PACKAGES;
    path: string;
}) {
    const pkg = PACKAGES[packageKey];

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
            price: packageKey === "free" ? "0" : "Contact for pricing",
            priceCurrency: "USD",
            availability: "https://schema.org/InStock",
            url: `${COMPANY_INFO.website}${path}`,
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

// FAQ Schema for common questions
export function FAQSchema({
    faqs,
}: {
    faqs: Array<{ question: string; answer: string }>;
}) {
    const faqData = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqs.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: {
                "@type": "Answer",
                text: faq.answer,
            },
        })),
    };

    return <JsonLd data={faqData} />;
}

// Local Business schema (if applicable)
export function LocalBusinessSchema() {
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

// Breadcrumb schema for navigation
export function BreadcrumbSchema({
    items,
}: {
    items: Array<{ name: string; url: string; position: number }>;
}) {
    const breadcrumbData = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: items.map((item) => ({
            "@type": "ListItem",
            position: item.position,
            name: item.name,
            item: `${COMPANY_INFO.website}${item.url}`,
        })),
    };

    return <JsonLd data={breadcrumbData} />;
}

// Website schema for the main site
export function WebsiteSchema() {
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
