"use client";

import { Suspense, lazy, useMemo, useState, useEffect } from "react";
import type { SchemaComponent } from "./JsonLd";

// Schema type definitions
export type SchemaType =
    | "organization"
    | "website"
    | "service"
    | "package"
    | "faq"
    | "localBusiness"
    | "breadcrumb"
    | "croService"
    | "croFAQ"
    | "blogPost";

// Dynamic imports with code splitting
const schemaComponents: Record<
    SchemaType,
    () => Promise<{ default: SchemaComponent }>
> = {
    organization: () => import("./OrganizationSchema"),
    website: () => import("./WebsiteSchema"),
    service: () => import("./ServiceSchema"),
    package: () => import("./PackageSchema"),
    faq: () => import("./FAQSchema"),
    localBusiness: () => import("./LocalBusinessSchema"),
    breadcrumb: () => import("./BreadcrumbSchema"),
    croService: () => import("./CROServiceSchema"),
    croFAQ: () => import("./CROFAQSchema"),
    blogPost: () => import("./BlogPostSchema"),
};

// Lazy load schema components
const createLazySchema = (schemaType: SchemaType) => {
    return lazy(schemaComponents[schemaType]);
};

interface DynamicSchemaProps {
    type: SchemaType;
    props?: Record<string, unknown>;
    priority?: "high" | "medium" | "low";
}

export function DynamicSchema({
    type,
    props = {},
    priority = "medium",
}: DynamicSchemaProps) {
    const LazyComponent = useMemo(() => createLazySchema(type), [type]);

    // Load high priority schemas immediately, others with delay
    const loadingDelay =
        priority === "high" ? 0 : priority === "medium" ? 100 : 500;

    return (
        <Suspense fallback={null}>
            <DelayedLoader delay={loadingDelay}>
                <LazyComponent {...props} />
            </DelayedLoader>
        </Suspense>
    );
}

// Delayed loader to prevent blocking critical resources
function DelayedLoader({
    children,
    delay = 0,
}: {
    children: React.ReactNode;
    delay?: number;
}) {
    const [shouldLoad, setShouldLoad] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShouldLoad(true);
        }, delay);

        return () => clearTimeout(timer);
    }, [delay]);

    if (!shouldLoad && delay > 0) {
        return null;
    }

    return <>{children}</>;
}

// Preload schemas based on route
export function useSchemaPreloader(route: string) {
    useEffect(() => {
        const preloadSchemas: SchemaType[] = [];

        // Route-specific schema preloading
        switch (route) {
            case "/":
                preloadSchemas.push(
                    "organization",
                    "website",
                    "croService",
                    "croFAQ"
                );
                break;
            case "/services":
                preloadSchemas.push("service", "croService");
                break;
            case "/packages":
                preloadSchemas.push("package");
                break;
            case "/about":
                preloadSchemas.push("organization", "localBusiness");
                break;
            case "/contact":
                preloadSchemas.push("organization", "localBusiness");
                break;
            default:
                if (route.startsWith("/blog/")) {
                    preloadSchemas.push("blogPost");
                }
                break;
        }

        // Preload schemas after a delay to avoid blocking initial render
        const preloadTimer = setTimeout(() => {
            preloadSchemas.forEach((schemaType) => {
                schemaComponents[schemaType]();
            });
        }, 1000);

        return () => clearTimeout(preloadTimer);
    }, [route]);
}

// Batch schema loader for multiple schemas
interface BatchSchemaProps {
    schemas: Array<{
        type: SchemaType;
        props?: Record<string, unknown>;
        priority?: "high" | "medium" | "low";
    }>;
}

export function BatchSchema({ schemas }: BatchSchemaProps) {
    // Sort by priority: high -> medium -> low
    const sortedSchemas = useMemo(() => {
        return schemas.sort((a, b) => {
            const priorityOrder = { high: 0, medium: 1, low: 2 };
            return (
                priorityOrder[a.priority || "medium"] -
                priorityOrder[b.priority || "medium"]
            );
        });
    }, [schemas]);

    return (
        <>
            {sortedSchemas.map((schema, index) => (
                <DynamicSchema
                    key={`${schema.type}-${index}`}
                    type={schema.type}
                    props={schema.props}
                    priority={schema.priority}
                />
            ))}
        </>
    );
}
