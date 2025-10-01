// Optimized StructuredData exports with dynamic loading
// This replaces the monolithic StructuredData.tsx file

// Re-export the dynamic schema system
export {
    DynamicSchema,
    BatchSchema,
    useSchemaPreloader,
    type SchemaType,
} from "./StructuredData/DynamicSchema";

// Re-export JsonLd for direct use when needed
export { JsonLd, type JsonLdProps } from "./StructuredData/JsonLd";

// Convenience components for backward compatibility
import { DynamicSchema } from "./StructuredData/DynamicSchema";

// High-priority schemas (loaded immediately)
export const OrganizationSchema = () => (
    <DynamicSchema type="organization" priority="high" />
);

export const WebsiteSchema = () => (
    <DynamicSchema type="website" priority="high" />
);

// Medium-priority schemas (loaded with small delay)
export const CROServiceSchema = () => (
    <DynamicSchema type="croService" priority="medium" />
);

export const CROFAQSchema = () => (
    <DynamicSchema type="croFAQ" priority="medium" />
);

// Low-priority schemas (loaded after other resources)
export const ServiceSchema = (props: { serviceKey: string; path: string }) => (
    <DynamicSchema type="service" props={props} priority="low" />
);

export const PackageSchema = (props: { packageKey: string; path: string }) => (
    <DynamicSchema type="package" props={props} priority="low" />
);

export const FAQSchema = (props: {
    faqs: Array<{ question: string; answer: string }>;
}) => <DynamicSchema type="faq" props={props} priority="low" />;

export const LocalBusinessSchema = () => (
    <DynamicSchema type="localBusiness" priority="low" />
);

export const BreadcrumbSchema = (props: {
    items: Array<{ name: string; url: string }>;
}) => <DynamicSchema type="breadcrumb" props={props} priority="low" />;

export const BlogPostSchema = (props: {
    title: string;
    description: string;
    publishedAt: string;
    author: string;
    category: string;
    slug: string;
    image?: string;
    readingTime?: string;
}) => <DynamicSchema type="blogPost" props={props} priority="medium" />;

// Utility function for common schema combinations
export function PageSchemas({
    page,
}: {
    page: "home" | "services" | "packages" | "about" | "contact" | "blog";
}) {
    switch (page) {
        case "home":
            return (
                <>
                    <OrganizationSchema />
                    <WebsiteSchema />
                    <CROServiceSchema />
                    <CROFAQSchema />
                </>
            );
        case "services":
            return (
                <>
                    <OrganizationSchema />
                    <CROServiceSchema />
                </>
            );
        case "packages":
            return <OrganizationSchema />;
        case "about":
        case "contact":
            return (
                <>
                    <OrganizationSchema />
                    <LocalBusinessSchema />
                </>
            );
        case "blog":
            return (
                <>
                    <OrganizationSchema />
                    <WebsiteSchema />
                </>
            );
        default:
            return <OrganizationSchema />;
    }
}
