"use client";

import Link from "next/link";
import { ArrowLeft, Home } from "lucide-react";

export default function NotFound() {
    const handleGoBack = () => {
        if (typeof window !== "undefined" && window.history.length > 1) {
            window.history.back();
        } else if (typeof window !== "undefined") {
            window.location.href = "/";
        }
    };

    return (
        <div className="container px-4 md:px-6 py-16 md:py-24">
            <div className="max-w-2xl mx-auto text-center space-y-8">
                <div className="space-y-4">
                    <h1 className="text-6xl font-bold text-muted-foreground">
                        404
                    </h1>
                    <h2 className="text-3xl font-bold tracking-tighter">
                        Page Not Found
                    </h2>
                    <p className="text-xl text-muted-foreground">
                        Sorry, we couldn&apos;t find the page you&apos;re
                        looking for.
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button
                        type="button"
                        onClick={handleGoBack}
                        className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive h-9 px-4 py-2 has-[>svg]:px-3 border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 cursor-pointer"
                    >
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Go Back
                    </button>

                    <Link
                        href="/"
                        className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive h-9 px-4 py-2 has-[>svg]:px-3 bg-primary text-primary-foreground shadow-xs hover:bg-primary/90 cursor-pointer"
                    >
                        <Home className="mr-2 h-4 w-4" />
                        Go Home
                    </Link>
                </div>
            </div>
        </div>
    );
}
