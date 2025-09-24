"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Home, RefreshCw } from "lucide-react";

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error("Application error:", error);

        // You can also send to error tracking service here
        // if (process.env.NODE_ENV === 'production') {
        //   // Send to Sentry, LogRocket, etc.
        // }
    }, [error]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center px-4">
            <div className="max-w-md w-full text-center space-y-6">
                {/* Error Icon */}
                <div className="flex justify-center">
                    <div className="p-4 rounded-full bg-red-500/10 border border-red-500/20">
                        <AlertTriangle className="w-12 h-12 text-red-500" />
                    </div>
                </div>

                {/* Error Content */}
                <div className="space-y-3">
                    <h1 className="text-2xl font-bold text-white">
                        Oops! Something went wrong
                    </h1>
                    <p className="text-gray-400">
                        We encountered an unexpected error. Don&apos;t worry,
                        our team has been notified.
                    </p>

                    {/* Show error details in development */}
                    {process.env.NODE_ENV === "development" && (
                        <details className="mt-4 text-left">
                            <summary className="text-sm text-gray-500 cursor-pointer hover:text-gray-400">
                                Error Details (Development Only)
                            </summary>
                            <pre className="mt-2 p-3 bg-gray-800 rounded text-xs text-red-400 whitespace-pre-wrap break-words">
                                {error.message}
                                {error.digest && `\nDigest: ${error.digest}`}
                            </pre>
                        </details>
                    )}
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Button
                        onClick={reset}
                        className="bg-red-600 hover:bg-red-700 text-white flex items-center gap-2"
                    >
                        <RefreshCw className="w-4 h-4" />
                        Try Again
                    </Button>

                    <Button
                        asChild
                        variant="outline"
                        className="border-gray-700 text-gray-300 hover:bg-gray-800"
                    >
                        <Link href="/" className="flex items-center gap-2">
                            <Home className="w-4 h-4" />
                            Go Home
                        </Link>
                    </Button>
                </div>

                {/* Help Text */}
                <div className="pt-4 border-t border-gray-800">
                    <p className="text-sm text-gray-500">
                        Need help? Contact us at{" "}
                        <a
                            href="mailto:hello@crohound.com"
                            className="text-red-400 hover:text-red-300 underline"
                        >
                            hello@crohound.com
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
}
