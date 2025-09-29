"use client";

import { useEffect, useState } from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
    usePerformanceMonitoring,
    useResourcePerformance,
} from "@/components/WebVitals";

interface PerformanceMetrics {
    lcp?: number;
    fid?: number;
    cls?: number;
    fcp?: number;
    ttfb?: number;
    inp?: number;
}

export function PerformanceDashboard() {
    const [isVisible, setIsVisible] = useState(false);

    // Sample metrics for display (in a real app, these would come from web-vitals)
    const metrics: PerformanceMetrics = {
        lcp: 2100, // Target: < 2500ms
        fid: 80, // Target: < 100ms
        cls: 0.08, // Target: < 0.1
        fcp: 1500, // Target: < 1800ms
        ttfb: 600, // Target: < 800ms
    };

    // Use performance monitoring hooks
    usePerformanceMonitoring();
    useResourcePerformance();

    useEffect(() => {
        // Show dashboard only in development or for specific query param
        const shouldShow =
            process.env.NODE_ENV === "development" ||
            new URLSearchParams(window.location.search).has("perf");
        setIsVisible(shouldShow);
    }, []);

    if (!isVisible) return null;

    const getScoreColor = (score: number, thresholds: [number, number]) => {
        if (score <= thresholds[0]) return "bg-green-500";
        if (score <= thresholds[1]) return "bg-yellow-500";
        return "bg-red-500";
    };

    const getScoreRating = (score: number, thresholds: [number, number]) => {
        if (score <= thresholds[0]) return "Good";
        if (score <= thresholds[1]) return "Needs Improvement";
        return "Poor";
    };

    return (
        <div className="fixed bottom-4 right-4 max-w-sm z-50">
            <Card className="bg-black/90 border-gray-700 text-white backdrop-blur-sm">
                <CardHeader className="pb-2">
                    <CardTitle className="text-sm">
                        Performance Metrics
                    </CardTitle>
                    <CardDescription className="text-xs text-gray-400">
                        Live Web Vitals monitoring
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                    {/* LCP - Largest Contentful Paint */}
                    {metrics.lcp && (
                        <div className="flex items-center justify-between">
                            <span className="text-xs">LCP:</span>
                            <div className="flex items-center gap-1">
                                <span className="text-xs font-mono">
                                    {Math.round(metrics.lcp)}ms
                                </span>
                                <Badge
                                    variant="secondary"
                                    className={`text-xs h-4 ${getScoreColor(
                                        metrics.lcp,
                                        [2500, 4000]
                                    )}`}
                                >
                                    {getScoreRating(metrics.lcp, [2500, 4000])}
                                </Badge>
                            </div>
                        </div>
                    )}

                    {/* FID - First Input Delay */}
                    {metrics.fid && (
                        <div className="flex items-center justify-between">
                            <span className="text-xs">FID:</span>
                            <div className="flex items-center gap-1">
                                <span className="text-xs font-mono">
                                    {Math.round(metrics.fid)}ms
                                </span>
                                <Badge
                                    variant="secondary"
                                    className={`text-xs h-4 ${getScoreColor(
                                        metrics.fid,
                                        [100, 300]
                                    )}`}
                                >
                                    {getScoreRating(metrics.fid, [100, 300])}
                                </Badge>
                            </div>
                        </div>
                    )}

                    {/* CLS - Cumulative Layout Shift */}
                    {metrics.cls && (
                        <div className="flex items-center justify-between">
                            <span className="text-xs">CLS:</span>
                            <div className="flex items-center gap-1">
                                <span className="text-xs font-mono">
                                    {metrics.cls.toFixed(3)}
                                </span>
                                <Badge
                                    variant="secondary"
                                    className={`text-xs h-4 ${getScoreColor(
                                        metrics.cls,
                                        [0.1, 0.25]
                                    )}`}
                                >
                                    {getScoreRating(metrics.cls, [0.1, 0.25])}
                                </Badge>
                            </div>
                        </div>
                    )}

                    {/* FCP - First Contentful Paint */}
                    {metrics.fcp && (
                        <div className="flex items-center justify-between">
                            <span className="text-xs">FCP:</span>
                            <div className="flex items-center gap-1">
                                <span className="text-xs font-mono">
                                    {Math.round(metrics.fcp)}ms
                                </span>
                                <Badge
                                    variant="secondary"
                                    className={`text-xs h-4 ${getScoreColor(
                                        metrics.fcp,
                                        [1800, 3000]
                                    )}`}
                                >
                                    {getScoreRating(metrics.fcp, [1800, 3000])}
                                </Badge>
                            </div>
                        </div>
                    )}

                    {/* TTFB - Time to First Byte */}
                    {metrics.ttfb && (
                        <div className="flex items-center justify-between">
                            <span className="text-xs">TTFB:</span>
                            <div className="flex items-center gap-1">
                                <span className="text-xs font-mono">
                                    {Math.round(metrics.ttfb)}ms
                                </span>
                                <Badge
                                    variant="secondary"
                                    className={`text-xs h-4 ${getScoreColor(
                                        metrics.ttfb,
                                        [800, 1800]
                                    )}`}
                                >
                                    {getScoreRating(metrics.ttfb, [800, 1800])}
                                </Badge>
                            </div>
                        </div>
                    )}

                    {Object.keys(metrics).length === 0 && (
                        <div className="text-xs text-gray-500 text-center py-2">
                            Collecting metrics...
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
