import React from "react";
import { JsonLd } from "./JsonLd";
import { COMPANY_INFO } from "@/data/constants";

export default function BlogPostSchema(props?: Record<string, unknown>) {
    const {
        title,
        description,
        publishedAt,
        author,
        category,
        slug,
        image,
        readingTime,
    } = (props || {}) as {
        title?: string;
        description?: string;
        publishedAt?: string;
        author?: string;
        category?: string;
        slug?: string;
        image?: string;
        readingTime?: string;
    };

    // Provide defaults if props are not provided
    const actualTitle = title || "CRO Blog Post";
    const actualDescription =
        description || "Conversion optimization insights and tips";
    const actualPublishedAt = publishedAt || new Date().toISOString();
    const actualAuthor = author || "CROHound Team";
    const actualCategory = category || "CRO";
    const actualSlug = slug || "cro-insights";
    const actualReadingTime = readingTime || "5 min read";

    const blogData = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: actualTitle,
        description: actualDescription,
        image: image
            ? `${COMPANY_INFO.website}${image}`
            : `${COMPANY_INFO.website}/og-image.jpg`,
        author: {
            "@type": "Person",
            name: actualAuthor,
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
        datePublished: actualPublishedAt,
        dateModified: actualPublishedAt,
        mainEntityOfPage: {
            "@type": "WebPage",
            "@id": `${COMPANY_INFO.website}/blog/${actualSlug}`,
        },
        articleSection: actualCategory,
        keywords: [
            actualCategory,
            "conversion optimization",
            "shopify",
            "ecommerce",
            "CRO",
        ],
        wordCount: actualReadingTime
            ? parseInt(actualReadingTime.split(" ")[0]) * 200
            : undefined,
        timeRequired: actualReadingTime
            ? `PT${actualReadingTime.split(" ")[0]}M`
            : undefined,
        inLanguage: "en-US",
        isAccessibleForFree: true,
    };

    return <JsonLd data={blogData} />;
}
