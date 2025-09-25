/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

interface AnalyticsProps {
    gaId?: string;
    clarityId?: string;
}

// Global window extensions
declare global {
    interface Window {
        gtag?: (...args: any[]) => void;
        clarity?: (...args: any[]) => void;
        dataLayer?: any[];
    }
}

export function Analytics({ gaId, clarityId }: AnalyticsProps) {
    const pathname = usePathname();

    useEffect(() => {
        // Track page views when pathname changes
        if (typeof window !== "undefined" && window.gtag && gaId) {
            window.gtag("config", gaId, {
                page_path: pathname,
            });
        }
    }, [pathname, gaId]);

    return (
        <>
            {/* Google Analytics 4 */}
            {gaId && (
                <>
                    <Script
                        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
                        strategy="lazyOnload"
                        onLoad={() => {
                            console.log("Google Analytics loaded");
                        }}
                        onError={() => {
                            console.error("Failed to load Google Analytics");
                        }}
                    />
                    <Script
                        id="ga4-init"
                        strategy="lazyOnload"
                        dangerouslySetInnerHTML={{
                            __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${gaId}', {
                  page_title: document.title,
                  page_location: window.location.href,
                });
              `,
                        }}
                    />
                </>
            )}

            {/* Microsoft Clarity */}
            {clarityId && (
                <Script
                    id="clarity-init"
                    strategy="lazyOnload"
                    onLoad={() => {
                        console.log("Microsoft Clarity loaded");
                    }}
                    onError={() => {
                        console.error("Failed to load Microsoft Clarity");
                    }}
                    dangerouslySetInnerHTML={{
                        __html: `
              (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window,document,"clarity","script","${clarityId}");
            `,
                    }}
                />
            )}
        </>
    );
}

// Hook for tracking events
export function useAnalytics() {
    const trackEvent = (
        eventName: string,
        parameters?: Record<string, unknown>
    ) => {
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
    };

    const trackConversion = (value?: number, currency = "USD") => {
        trackEvent("generate_lead", {
            currency,
            value: value || 0,
        });
    };

    const trackFormSubmit = (formName: string) => {
        trackEvent("form_submit", {
            form_name: formName,
        });
    };

    const trackPageView = (page: string) => {
        trackEvent("page_view", {
            page_title: document.title,
            page_location: window.location.href,
            page_path: page,
        });
    };

    return {
        trackEvent,
        trackConversion,
        trackFormSubmit,
        trackPageView,
    };
}
