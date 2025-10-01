"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

interface ResourceHint {
    href: string;
    rel: "preload" | "prefetch" | "preconnect" | "dns-prefetch";
    as?: string;
    type?: string;
    crossOrigin?: "" | "anonymous" | "use-credentials";
}

// Performance optimized resource hints
const GLOBAL_HINTS: ResourceHint[] = [
    // Critical third-party connections
    { href: "https://fonts.googleapis.com", rel: "preconnect" },
    { href: "https://fonts.gstatic.com", rel: "preconnect", crossOrigin: "" },
    { href: "https://www.googletagmanager.com", rel: "dns-prefetch" },
    { href: "https://www.google-analytics.com", rel: "dns-prefetch" },
    { href: "https://clarity.microsoft.com", rel: "dns-prefetch" },

    // Critical images
    {
        href: "/logo_no_description.png",
        rel: "preload",
        as: "image",
        type: "image/png",
    },
    { href: "/logo.png", rel: "preload", as: "image", type: "image/png" },
];

// Route-specific resource hints
const ROUTE_HINTS: Record<string, ResourceHint[]> = {
    "/": [
        { href: "/contact", rel: "prefetch" },
        { href: "/packages", rel: "prefetch" },
        { href: "/services", rel: "prefetch" },
    ],
    "/contact": [{ href: "/thank-you", rel: "prefetch" }],
    "/blog": [
        {
            href: "/blog/shopify-conversion-optimization-guide",
            rel: "prefetch",
        },
        { href: "/blog/ab-testing-revenue-results", rel: "prefetch" },
    ],
    "/packages": [
        { href: "/contact", rel: "prefetch" },
        { href: "/case-studies", rel: "prefetch" },
    ],
    "/services": [
        { href: "/contact", rel: "prefetch" },
        { href: "/packages", rel: "prefetch" },
    ],
};

function createResourceHint(hint: ResourceHint): HTMLLinkElement {
    const link = document.createElement("link");
    link.rel = hint.rel;
    link.href = hint.href;

    if (hint.as) link.as = hint.as;
    if (hint.type) link.type = hint.type;
    if (hint.crossOrigin !== undefined) link.crossOrigin = hint.crossOrigin;

    return link;
}

export function ResourceHints() {
    const pathname = usePathname();

    useEffect(() => {
        const addedHints = new Set<string>();
        const hintElements: HTMLLinkElement[] = [];

        function addHints(hints: ResourceHint[]) {
            hints.forEach((hint) => {
                const key = `${hint.rel}-${hint.href}`;
                if (!addedHints.has(key)) {
                    const element = createResourceHint(hint);
                    document.head.appendChild(element);
                    hintElements.push(element);
                    addedHints.add(key);
                }
            });
        }

        // Add global hints
        addHints(GLOBAL_HINTS);

        // Add route-specific hints
        const routeHints = ROUTE_HINTS[pathname];
        if (routeHints) {
            addHints(routeHints);
        }

        // Intelligent prefetching based on user behavior
        let mouseIdleTimeout: NodeJS.Timeout;

        const handleMouseMove = () => {
            clearTimeout(mouseIdleTimeout);

            mouseIdleTimeout = setTimeout(() => {
                // Prefetch likely next pages when mouse is idle
                if (pathname === "/") {
                    addHints([
                        { href: "/about", rel: "prefetch" },
                        { href: "/case-studies", rel: "prefetch" },
                    ]);
                }
            }, 2000); // 2 seconds of mouse idle
        };

        // Add hover-based prefetching
        const handleLinkHover = (event: MouseEvent) => {
            const target = event.target as HTMLElement;
            const link = target.closest("a");

            if (
                link &&
                link.href &&
                link.hostname === window.location.hostname
            ) {
                const hoverHint: ResourceHint = {
                    href: link.pathname,
                    rel: "prefetch",
                };
                addHints([hoverHint]);
            }
        };

        // Add event listeners with passive option for performance
        document.addEventListener("mousemove", handleMouseMove, {
            passive: true,
        });
        document.addEventListener("mouseover", handleLinkHover, {
            passive: true,
        });

        // Cleanup function
        return () => {
            clearTimeout(mouseIdleTimeout);
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseover", handleLinkHover);

            // Remove added hints on unmount
            hintElements.forEach((element) => {
                if (element.parentNode) {
                    element.parentNode.removeChild(element);
                }
            });
        };
    }, [pathname]);

    return null; // This component doesn't render anything
}

// Connection speed optimization
export function useNetworkOptimizations() {
    useEffect(() => {
        if ("connection" in navigator) {
            const connection = (
                navigator as Navigator & {
                    connection?: {
                        effectiveType: string;
                        downlink: number;
                        saveData?: boolean;
                    };
                }
            ).connection;

            if (connection) {
                const { effectiveType, downlink } = connection;

                // Reduce resource hints on slow connections
                if (
                    effectiveType === "slow-2g" ||
                    effectiveType === "2g" ||
                    downlink < 1
                ) {
                    // Disable non-critical prefetches
                    const prefetchLinks = document.querySelectorAll(
                        'link[rel="prefetch"]'
                    );
                    prefetchLinks.forEach((link) => {
                        if (!link.getAttribute("href")?.includes("/contact")) {
                            link.remove();
                        }
                    });
                }

                // Log network info for analytics
                if (typeof window !== "undefined" && window.gtag) {
                    window.gtag("event", "network_info", {
                        event_category: "Performance",
                        effective_type: effectiveType,
                        downlink: Math.round(downlink * 100) / 100,
                        save_data: connection.saveData || false,
                    });
                }
            }
        }
    }, []);
}
