"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { AlertTriangle, RefreshCw, Home, ArrowLeft } from "lucide-react";
import Link from "next/link";

interface GlobalErrorProps {
    error: Error & { digest?: string };
    reset: () => void;
}

export default function GlobalError({ error, reset }: GlobalErrorProps) {
    useEffect(() => {
        // Log the error to analytics
        if (typeof window !== "undefined" && window.gtag) {
            window.gtag("event", "global_error", {
                event_category: "Error",
                error_message: error.message,
                error_digest: error.digest,
                page_path: window.location.pathname,
            });
        }

        console.error("Global error:", error);
    }, [error]);

    return (
        <html>
            <body>
                <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-background to-muted">
                    <Card className="w-full max-w-lg shadow-xl">
                        <CardHeader className="text-center">
                            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-orange-100 dark:bg-orange-900/20">
                                <AlertTriangle className="h-8 w-8 text-orange-600 dark:text-orange-400" />
                            </div>
                            <CardTitle className="text-2xl">
                                Application Error
                            </CardTitle>
                            <CardDescription className="text-base">
                                A critical error occurred that prevented the
                                application from loading properly.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            {/* Error Message */}
                            <div className="rounded-md bg-destructive/10 border border-destructive/20 p-4">
                                <p className="text-sm font-medium text-destructive">
                                    {error.message ||
                                        "An unexpected error occurred"}
                                </p>
                                {error.digest && (
                                    <p className="mt-1 text-xs text-muted-foreground">
                                        Error ID: {error.digest}
                                    </p>
                                )}
                            </div>

                            {/* Actions */}
                            <div className="space-y-3">
                                <Button
                                    onClick={reset}
                                    className="w-full"
                                    size="lg"
                                >
                                    <RefreshCw className="mr-2 h-4 w-4" />
                                    Try Again
                                </Button>

                                <div className="grid grid-cols-2 gap-2">
                                    <Button
                                        onClick={() => window.location.reload()}
                                        variant="outline"
                                        size="sm"
                                    >
                                        <RefreshCw className="mr-2 h-3 w-3" />
                                        Reload
                                    </Button>
                                    <Button
                                        onClick={() => window.history.back()}
                                        variant="outline"
                                        size="sm"
                                    >
                                        <ArrowLeft className="mr-2 h-3 w-3" />
                                        Go Back
                                    </Button>
                                </div>

                                <Button
                                    asChild
                                    variant="secondary"
                                    className="w-full"
                                    size="sm"
                                >
                                    <Link href="/">
                                        <Home className="mr-2 h-4 w-4" />
                                        Return Home
                                    </Link>
                                </Button>
                            </div>

                            {/* Support Information */}
                            <div className="text-center text-sm text-muted-foreground space-y-2">
                                <p>
                                    If this error continues to occur, please
                                    contact our support team.
                                </p>
                                <Link
                                    href="/contact"
                                    className="inline-flex items-center text-primary hover:underline"
                                >
                                    Contact Support
                                </Link>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </body>
        </html>
    );
}
