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

// CRO service schema for rich snippets
export function CROServiceSchema() {
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

// FAQ Schema for CRO-related questions
export function CROFAQSchema() {
    const faqs = [
        {
            question: "How quickly can I see CRO results?",
            answer: "Most clients see initial improvements within 2-4 weeks of implementing our recommendations. Significant conversion rate increases typically occur after 2-3 months of consistent optimization and testing.",
        },
        {
            question: "What's included in the free Sniff Check?",
            answer: "Our free Sniff Check includes a comprehensive 12-point conversion audit, a 5-minute personalized video walkthrough highlighting key issues, and a prioritized quick-wins checklist delivered within 48 hours.",
        },
        {
            question: "Do you work with stores outside of Shopify?",
            answer: "While we specialize in Shopify CRO, our conversion optimization principles apply to most ecommerce platforms. Contact us to discuss your specific platform needs.",
        },
        {
            question: "What's the minimum traffic requirement for CRO?",
            answer: "For meaningful A/B testing, we recommend at least 1,000 unique visitors per week. However, our audit and optimization recommendations can benefit stores of any size.",
        },
        {
            question: "How do you measure CRO success?",
            answer: "We track key metrics including overall conversion rate, page-specific conversion rates, average order value, customer lifetime value, and cart abandonment rate. All improvements are measured against statistical significance thresholds.",
        },
    ];

    return <FAQSchema faqs={faqs} />;
}

// Enhanced blog post schema for better content SEO
export function BlogPostSchema({
    title,
    description,
    publishedAt,
    author,
    category,
    slug,
    image,
    readingTime,
}: {
    title: string;
    description: string;
    publishedAt: string;
    author: string;
    category: string;
    slug: string;
    image?: string;
    readingTime?: string;
}) {
    const blogData = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: title,
        description: description,
        image: image
            ? `${COMPANY_INFO.website}${image}`
            : `${COMPANY_INFO.website}/og-image.jpg`,
        author: {
            "@type": "Person",
            name: author,
            url: `${COMPANY_INFO.website}/about`,
        },
        publisher: {
            "@type": "Organization",
            name: COMPANY_INFO.name,
            logo: {
                "@type": "ImageObject",
                url: `${COMPANY_INFO.website}/logo.png`,
            },
        },
        datePublished: publishedAt,
        dateModified: publishedAt,
        mainEntityOfPage: {
            "@type": "WebPage",
            "@id": `${COMPANY_INFO.website}/blog/${slug}`,
        },
        articleSection: category,
        keywords: [
            category,
            "conversion optimization",
            "shopify",
            "ecommerce",
            "CRO",
        ],
        wordCount: readingTime
            ? parseInt(readingTime.split(" ")[0]) * 200
            : undefined,
        timeRequired: readingTime
            ? `PT${readingTime.split(" ")[0]}M`
            : undefined,
        inLanguage: "en-US",
        isAccessibleForFree: true,
    };

    return <JsonLd data={blogData} />;
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
