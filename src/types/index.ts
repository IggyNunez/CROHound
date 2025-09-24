// src/types/index.ts
export interface NavItem {
    label: string;
    href: string;
    description?: string;
    icon?: React.ComponentType<{ className?: string }>;
}

export interface Service {
    id: string;
    title: string;
    description: string;
    price: string;
    features: string[];
    highlighted?: boolean;
}

export interface CaseStudy {
    id: string;
    slug: string;
    title: string;
    client: string;
    industry: string;
    results: {
        metric: string;
        value: string;
        improvement: number;
    }[];
    summary: string;
    image?: string;
}

export interface TeamMember {
    name: string;
    role: string;
    bio: string;
    image?: string;
    linkedin?: string;
}

// Environment variable validation
export interface EnvConfig {
    GA_ID?: string;
    CLARITY_ID?: string;
    SITE_URL: string;
    ADMIN_EMAIL: string;
    EMAIL_API_KEY?: string;
}

// src/lib/env.ts
import { EnvConfig } from "@/types";

function validateEnv(): EnvConfig {
    const errors: string[] = [];

    // Required variables
    if (!process.env.NEXT_PUBLIC_SITE_URL) {
        errors.push("NEXT_PUBLIC_SITE_URL is required");
    }

    if (!process.env.ADMIN_EMAIL) {
        errors.push("ADMIN_EMAIL is required for contact form");
    }

    // Log warnings for optional but recommended
    if (
        !process.env.NEXT_PUBLIC_GA_ID &&
        process.env.NODE_ENV === "production"
    ) {
        console.warn("⚠️ GA4 tracking not configured");
    }

    if (errors.length > 0) {
        throw new Error(`Environment validation failed:\n${errors.join("\n")}`);
    }

    return {
        GA_ID: process.env.NEXT_PUBLIC_GA_ID,
        CLARITY_ID: process.env.NEXT_PUBLIC_CLARITY_ID,
        SITE_URL:
            process.env.NEXT_PUBLIC_SITE_URL || "https://www.crohound.com",
        ADMIN_EMAIL: process.env.ADMIN_EMAIL || "",
        EMAIL_API_KEY: process.env.EMAIL_API_KEY,
    };
}

export const env = validateEnv();

// src/app/error.tsx
("use client");

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        // Log error to error reporting service
        console.error("Application error:", error);

        // Track error in GA4
        if (typeof window !== "undefined" && window.gtag) {
            window.gtag("event", "exception", {
                description: error.message,
                fatal: false,
            });
        }
    }, [error]);

    return (
        <div className="flex min-h-[60vh] flex-col items-center justify-center px-4">
            <div className="text-center space-y-6 max-w-md">
                <div className="flex justify-center">
                    <div className="p-4 bg-red-100 dark:bg-red-900/20 rounded-full">
                        <AlertTriangle className="h-8 w-8 text-red-600 dark:text-red-400" />
                    </div>
                </div>

                <div className="space-y-2">
                    <h2 className="text-2xl font-bold">
                        Something went wrong!
                    </h2>
                    <p className="text-muted-foreground">
                        We encountered an unexpected error. Our team has been
                        notified.
                    </p>
                </div>

                <div className="flex gap-4 justify-center">
                    <Button onClick={reset} variant="default">
                        Try Again
                    </Button>
                    <Button asChild variant="outline">
                        <a href="/">Go Home</a>
                    </Button>
                </div>

                {process.env.NODE_ENV === "development" && (
                    <details className="text-left mt-8 p-4 bg-muted rounded-lg">
                        <summary className="cursor-pointer text-sm font-medium">
                            Error Details (Dev Only)
                        </summary>
                        <pre className="mt-2 text-xs overflow-auto">
                            {error.message}
                            {error.stack}
                        </pre>
                    </details>
                )}
            </div>
        </div>
    );
}

// src/app/not-found.tsx
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home, Search, ArrowLeft } from "lucide-react";

export default function NotFound() {
    return (
        <div className="flex min-h-[70vh] flex-col items-center justify-center px-4">
            <div className="text-center space-y-8 max-w-2xl">
                {/* 404 Visual */}
                <div className="relative">
                    <h1 className="text-[150px] md:text-[200px] font-bold text-zinc-200 dark:text-zinc-800 select-none">
                        404
                    </h1>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <p className="text-2xl md:text-3xl font-bold text-foreground">
                            Page Not Found
                        </p>
                    </div>
                </div>

                {/* Message */}
                <div className="space-y-4">
                    <p className="text-lg text-muted-foreground">
                        Looks like this page went off-leash! The page you're
                        sniffing for doesn't exist or has been moved.
                    </p>
                    <p className="text-muted-foreground">
                        Let's get you back on track with your conversion
                        optimization journey.
                    </p>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button asChild size="lg">
                        <Link href="/">
                            <Home className="mr-2 h-4 w-4" />
                            Back to Home
                        </Link>
                    </Button>
                    <Button asChild variant="outline" size="lg">
                        <Link href="/services">
                            <Search className="mr-2 h-4 w-4" />
                            Explore Services
                        </Link>
                    </Button>
                </div>

                {/* Quick Links */}
                <div className="pt-8 border-t">
                    <p className="text-sm text-muted-foreground mb-4">
                        Popular pages:
                    </p>
                    <div className="flex flex-wrap gap-4 justify-center text-sm">
                        <Link
                            href="/contact"
                            className="text-primary hover:underline"
                        >
                            Get Free Audit
                        </Link>
                        <Link
                            href="/packages"
                            className="text-primary hover:underline"
                        >
                            View Packages
                        </Link>
                        <Link
                            href="/case-studies"
                            className="text-primary hover:underline"
                        >
                            Case Studies
                        </Link>
                        <Link
                            href="/blog"
                            className="text-primary hover:underline"
                        >
                            CRO Blog
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

// src/app/(marketing)/loading.tsx
import { Loader2 } from "lucide-react";

export default function Loading() {
    return (
        <div className="flex min-h-[60vh] items-center justify-center">
            <div className="text-center space-y-4">
                <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto" />
                <p className="text-muted-foreground">Loading content...</p>
            </div>
        </div>
    );
}
