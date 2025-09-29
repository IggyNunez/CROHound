"use client";

import { usePathname } from "next/navigation";
import { useEffect, useCallback } from "react";

interface AnalyticsConfig {
    gaId?: string;
    clarityId?: string;
}

export function useAnalytics(config?: AnalyticsConfig) {
    const pathname = usePathname();

    // Track page views when pathname changes
    useEffect(() => {
        if (typeof window !== "undefined" && window.gtag && config?.gaId) {
            window.gtag("config", config.gaId, {
                page_path: pathname,
            });
        }
    }, [pathname, config?.gaId]);

    const trackEvent = useCallback(
        (eventName: string, parameters?: Record<string, unknown>) => {
            if (typeof window !== "undefined") {
                // Google Analytics
                if (window.gtag) {
                    window.gtag("event", eventName, parameters);
                }

                // Microsoft Clarity custom events
                if (window.clarity) {
                    window.clarity("event", eventName);
                }
            }
        },
        []
    );

    const trackConversion = useCallback(
        (value?: number, currency = "USD") => {
            trackEvent("generate_lead", {
                currency,
                value: value || 0,
            });
        },
        [trackEvent]
    );

    const trackFormSubmit = useCallback(
        (formName: string) => {
            trackEvent("form_submit", {
                form_name: formName,
            });
        },
        [trackEvent]
    );

    const trackPageView = useCallback(
        (page: string) => {
            trackEvent("page_view", {
                page_title: document.title,
                page_location: window.location.href,
                page_path: page,
            });
        },
        [trackEvent]
    );

    const trackUserEngagement = useCallback(() => {
        trackEvent("user_engagement", {
            engagement_time_msec: Date.now(),
        });
    }, [trackEvent]);

    const trackScrollDepth = useCallback(
        (depth: number) => {
            trackEvent("scroll", {
                percent_scrolled: depth,
            });
        },
        [trackEvent]
    );

    const trackCTAClick = useCallback(
        (ctaName: string, location: string) => {
            trackEvent("cta_click", {
                cta_name: ctaName,
                cta_location: location,
            });
        },
        [trackEvent]
    );

    return {
        trackEvent,
        trackConversion,
        trackFormSubmit,
        trackPageView,
        trackUserEngagement,
        trackScrollDepth,
        trackCTAClick,
    };
}
