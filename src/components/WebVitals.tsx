"use client";

import { useEffect } from "react";
import { useReportWebVitals } from "next/web-vitals";
import type { Metric } from "web-vitals";

interface WebVitalsProps {
    gaId?: string;
}

export function WebVitals({ gaId }: WebVitalsProps) {
    useEffect(() => {
        const abortController = new AbortController();

        return () => {
            abortController.abort();
        };
    }, []);

    useReportWebVitals((metric: Metric) => {
        // Log vitals to console in development
        if (process.env.NODE_ENV === "development") {
            console.log(`[Web Vitals] ${metric.name}:`, metric);
        }

        // Send to Google Analytics if available
        if (typeof window !== "undefined" && window.gtag && gaId) {
            window.gtag("event", metric.name, {
                event_category: "Web Vitals",
                value: Math.round(
                    metric.name === "CLS" ? metric.value * 1000 : metric.value
                ),
                custom_map: {
                    metric_id: metric.id,
                    metric_value: metric.value,
                    metric_delta: metric.delta,
                    metric_rating: metric.rating,
                },
                non_interaction: true,
            });
        }

        // Send to custom analytics endpoint (optional) - using a separate effect for abort control
        if (process.env.NODE_ENV === "production") {
            const controller = new AbortController();

            fetch("/api/vitals", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(metric),
                signal: controller.signal,
            }).catch((error) => {
                // Don't log aborted requests
                if (error.name !== "AbortError") {
                    console.error("Failed to send web vitals:", error);
                }
            });
        }
    });

    return null; // This component doesn't render anything
}

// Performance monitoring hooks
export function usePerformanceMonitoring() {
    useEffect(() => {
        // Track page load performance with slight delay to ensure metrics are available
        const timeoutId = setTimeout(() => {
            if (typeof window !== "undefined" && "performance" in window) {
                const navigation = performance.getEntriesByType(
                    "navigation"
                )[0] as PerformanceNavigationTiming;

                if (navigation) {
                    const metrics = {
                        // Core loading metrics
                        domContentLoaded:
                            navigation.domContentLoadedEventEnd -
                            navigation.domContentLoadedEventStart,
                        loadComplete:
                            navigation.loadEventEnd - navigation.loadEventStart,

                        // Network timing
                        dnsLookup:
                            navigation.domainLookupEnd -
                            navigation.domainLookupStart,
                        tcpConnection:
                            navigation.connectEnd - navigation.connectStart,
                        serverResponse:
                            navigation.responseEnd - navigation.requestStart,

                        // Resource timing
                        domProcessing:
                            navigation.domComplete - navigation.domInteractive,

                        // Overall timing
                        totalPageLoad:
                            navigation.loadEventEnd - navigation.fetchStart,
                    };

                    console.log("[Performance Metrics]", metrics);

                    // Track slow pages (>3s load time)
                    if (metrics.totalPageLoad > 3000) {
                        if (typeof window.gtag === "function") {
                            window.gtag("event", "slow_page_load", {
                                event_category: "Performance",
                                value: Math.round(metrics.totalPageLoad),
                                page_path: window.location.pathname,
                            });
                        }
                    }
                }
            }
        }, 100);

        // Cleanup timeout on unmount
        return () => {
            clearTimeout(timeoutId);
        };
    }, []);
}

// Resource loading performance
export function useResourcePerformance() {
    useEffect(() => {
        const observer = new PerformanceObserver((list) => {
            list.getEntries().forEach((entry) => {
                const resourceEntry = entry as PerformanceResourceTiming;

                // Track large resources (>500KB)
                if (
                    resourceEntry.transferSize &&
                    resourceEntry.transferSize > 500000
                ) {
                    console.warn(
                        `[Large Resource] ${entry.name}: ${Math.round(
                            resourceEntry.transferSize / 1024
                        )}KB`
                    );

                    if (typeof window.gtag === "function") {
                        window.gtag("event", "large_resource_loaded", {
                            event_category: "Performance",
                            resource_name: entry.name,
                            resource_size: Math.round(
                                resourceEntry.transferSize / 1024
                            ),
                        });
                    }
                }

                // Track slow resources (>2s load time)
                if (entry.duration > 2000) {
                    console.warn(
                        `[Slow Resource] ${entry.name}: ${Math.round(
                            entry.duration
                        )}ms`
                    );
                }
            });
        });

        observer.observe({ entryTypes: ["resource"] });

        return () => observer.disconnect();
    }, []);
}
