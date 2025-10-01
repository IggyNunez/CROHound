"use client";

import React, { Component, ErrorInfo, ReactNode } from "react";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { AlertCircle, RefreshCw, Home, Bug } from "lucide-react";
import Link from "next/link";

interface Props {
    children: ReactNode;
    fallback?: ReactNode;
    onError?: (error: Error, errorInfo: ErrorInfo) => void;
    showErrorDetails?: boolean;
}

interface State {
    hasError: boolean;
    error: Error | null;
    errorInfo: ErrorInfo | null;
}

export class ErrorBoundary extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { hasError: false, error: null, errorInfo: null };
    }

    static getDerivedStateFromError(error: Error): State {
        return {
            hasError: true,
            error,
            errorInfo: null,
        };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        this.setState({
            error,
            errorInfo,
        });

        // Log to analytics
        if (typeof window !== "undefined" && window.gtag) {
            window.gtag("event", "error_boundary_triggered", {
                event_category: "Error",
                error_message: error.message,
                error_stack: error.stack?.substring(0, 500), // Limit stack trace length
                component_stack: errorInfo.componentStack?.substring(0, 500),
                page_path: window.location.pathname,
            });
        }

        // Call custom error handler
        if (this.props.onError) {
            this.props.onError(error, errorInfo);
        }

        // Log error for debugging
        console.error("ErrorBoundary caught an error:", error, errorInfo);
    }

    handleRetry = () => {
        this.setState({ hasError: false, error: null, errorInfo: null });
    };

    handleReload = () => {
        window.location.reload();
    };

    render() {
        if (this.state.hasError) {
            // Custom fallback UI
            if (this.props.fallback) {
                return this.props.fallback;
            }

            // Default fallback UI
            return (
                <div className="min-h-screen flex items-center justify-center p-4 bg-background">
                    <Card className="w-full max-w-lg">
                        <CardHeader className="text-center">
                            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/20">
                                <AlertCircle className="h-6 w-6 text-red-600 dark:text-red-400" />
                            </div>
                            <CardTitle className="text-xl">
                                Something went wrong
                            </CardTitle>
                            <CardDescription>
                                We apologize for the inconvenience. An
                                unexpected error occurred.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {/* Error Details (Development/Debug Mode) */}
                            {(this.props.showErrorDetails ||
                                process.env.NODE_ENV === "development") &&
                                this.state.error && (
                                    <div className="space-y-2">
                                        <details className="group">
                                            <summary className="flex cursor-pointer items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground">
                                                <Bug className="h-4 w-4" />
                                                Error Details
                                            </summary>
                                            <div className="mt-2 rounded-md bg-muted p-3 text-xs font-mono">
                                                <div className="mb-2">
                                                    <strong>Error:</strong>{" "}
                                                    {this.state.error.message}
                                                </div>
                                                {this.state.error.stack && (
                                                    <div className="mb-2">
                                                        <strong>Stack:</strong>
                                                        <pre className="mt-1 whitespace-pre-wrap">
                                                            {this.state.error.stack.substring(
                                                                0,
                                                                500
                                                            )}
                                                            {this.state.error
                                                                .stack.length >
                                                                500 && "..."}
                                                        </pre>
                                                    </div>
                                                )}
                                                {this.state.errorInfo
                                                    ?.componentStack && (
                                                    <div>
                                                        <strong>
                                                            Component Stack:
                                                        </strong>
                                                        <pre className="mt-1 whitespace-pre-wrap">
                                                            {this.state.errorInfo.componentStack.substring(
                                                                0,
                                                                500
                                                            )}
                                                            {this.state
                                                                .errorInfo
                                                                .componentStack
                                                                .length > 500 &&
                                                                "..."}
                                                        </pre>
                                                    </div>
                                                )}
                                            </div>
                                        </details>
                                    </div>
                                )}

                            {/* Action Buttons */}
                            <div className="flex flex-col gap-2 sm:flex-row">
                                <Button
                                    onClick={this.handleRetry}
                                    className="flex-1"
                                    variant="default"
                                >
                                    <RefreshCw className="mr-2 h-4 w-4" />
                                    Try Again
                                </Button>
                                <Button
                                    onClick={this.handleReload}
                                    variant="outline"
                                    className="flex-1"
                                >
                                    <RefreshCw className="mr-2 h-4 w-4" />
                                    Reload Page
                                </Button>
                            </div>

                            {/* Navigation Options */}
                            <div className="pt-2 border-t">
                                <Button
                                    asChild
                                    variant="ghost"
                                    className="w-full"
                                >
                                    <Link href="/">
                                        <Home className="mr-2 h-4 w-4" />
                                        Go to Homepage
                                    </Link>
                                </Button>
                            </div>

                            {/* Support Contact */}
                            <div className="text-center text-sm text-muted-foreground">
                                If this problem persists, please{" "}
                                <Link
                                    href="/contact"
                                    className="text-primary hover:underline"
                                >
                                    contact support
                                </Link>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            );
        }

        return this.props.children;
    }
}

// Higher-order component for easier usage
export function withErrorBoundary<P extends object>(
    Component: React.ComponentType<P>,
    errorBoundaryProps?: Omit<Props, "children">
) {
    const WrappedComponent = (props: P) => (
        <ErrorBoundary {...errorBoundaryProps}>
            <Component {...props} />
        </ErrorBoundary>
    );

    WrappedComponent.displayName = `withErrorBoundary(${
        Component.displayName || Component.name
    })`;

    return WrappedComponent;
}

// Async error boundary for handling async errors
export function AsyncErrorBoundary({ children }: { children: ReactNode }) {
    return (
        <ErrorBoundary
            onError={(error, errorInfo) => {
                // Log async errors
                console.error("Async error caught:", error, errorInfo);

                // Send to analytics
                if (typeof window !== "undefined" && window.gtag) {
                    window.gtag("event", "async_error", {
                        event_category: "Error",
                        error_message: error.message,
                        page_path: window.location.pathname,
                    });
                }
            }}
        >
            {children}
        </ErrorBoundary>
    );
}

// Route-specific error boundary
export function RouteErrorBoundary({
    children,
    routeName,
}: {
    children: ReactNode;
    routeName?: string;
}) {
    return (
        <ErrorBoundary
            onError={(error, errorInfo) => {
                // Log route-specific errors
                console.error(`Route error in ${routeName}:`, error, errorInfo);

                // Send to analytics with route context
                if (typeof window !== "undefined" && window.gtag) {
                    window.gtag("event", "route_error", {
                        event_category: "Error",
                        route_name: routeName || "unknown",
                        error_message: error.message,
                        page_path: window.location.pathname,
                    });
                }
            }}
        >
            {children}
        </ErrorBoundary>
    );
}
