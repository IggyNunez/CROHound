"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Home, RefreshCw, Mail } from "lucide-react";

export default function MarketingError({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error("Marketing page error:", error);
    }, [error]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
            <div className="container px-4 md:px-6 max-w-4xl mx-auto py-16 md:py-24">
                <div className="text-center space-y-8">
                    {/* Error Icon */}
                    <div className="flex justify-center">
                        <div className="p-6 rounded-full bg-red-500/10 border border-red-500/20">
                            <AlertTriangle className="w-16 h-16 text-red-500" />
                        </div>
                    </div>

                    {/* Error Content */}
                    <div className="space-y-4">
                        <h1 className="text-3xl md:text-4xl font-bold text-white">
                            Page Loading Failed
                        </h1>
                        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                            We couldn&apos;t load this page properly. This might
                            be a temporary issue.
                        </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button
                            onClick={reset}
                            size="lg"
                            className="bg-red-600 hover:bg-red-700 text-white flex items-center gap-2"
                        >
                            <RefreshCw className="w-5 h-5" />
                            Try Again
                        </Button>

                        <Button
                            asChild
                            variant="outline"
                            size="lg"
                            className="border-gray-700 text-gray-300 hover:bg-gray-800"
                        >
                            <Link href="/" className="flex items-center gap-2">
                                <Home className="w-5 h-5" />
                                Go Home
                            </Link>
                        </Button>
                    </div>

                    {/* Alternative Options */}
                    <div className="pt-8 border-t border-gray-800">
                        <p className="text-gray-400 mb-4">
                            Still having trouble? We&apos;re here to help:
                        </p>

                        <div className="flex justify-center">
                            <Button
                                asChild
                                variant="ghost"
                                className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                            >
                                <a
                                    href="mailto:hello@crohound.com"
                                    className="flex items-center gap-2"
                                >
                                    <Mail className="w-4 h-4" />
                                    Email us directly
                                </a>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
