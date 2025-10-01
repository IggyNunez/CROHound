"use client";

import { useState, useEffect } from "react";

// Tailwind CSS breakpoints
export const BREAKPOINTS = {
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
    "2xl": 1536,
} as const;

export type Breakpoint = keyof typeof BREAKPOINTS;

export function useBreakpoint(breakpoint: Breakpoint): boolean {
    const [matches, setMatches] = useState(false);

    useEffect(() => {
        const mediaQuery = window.matchMedia(
            `(min-width: ${BREAKPOINTS[breakpoint]}px)`
        );

        // Set initial value
        setMatches(mediaQuery.matches);

        // Create event listener
        const handler = (event: MediaQueryListEvent) => {
            setMatches(event.matches);
        };

        // Modern browsers
        if (mediaQuery.addListener) {
            mediaQuery.addListener(handler);
        } else {
            mediaQuery.addEventListener("change", handler);
        }

        // Cleanup
        return () => {
            if (mediaQuery.removeListener) {
                mediaQuery.removeListener(handler);
            } else {
                mediaQuery.removeEventListener("change", handler);
            }
        };
    }, [breakpoint]);

    return matches;
}

export function useResponsive() {
    const [windowSize, setWindowSize] = useState({
        width: 0,
        height: 0,
    });

    const isSm = useBreakpoint("sm");
    const isMd = useBreakpoint("md");
    const isLg = useBreakpoint("lg");
    const isXl = useBreakpoint("xl");
    const is2Xl = useBreakpoint("2xl");

    useEffect(() => {
        function updateSize() {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        }

        // Set initial size
        updateSize();

        // Add event listener
        window.addEventListener("resize", updateSize, { passive: true });

        // Cleanup
        return () => window.removeEventListener("resize", updateSize);
    }, []);

    // Get current breakpoint
    const getCurrentBreakpoint = (): Breakpoint => {
        if (is2Xl) return "2xl";
        if (isXl) return "xl";
        if (isLg) return "lg";
        if (isMd) return "md";
        if (isSm) return "sm";
        return "sm"; // Default to smallest
    };

    return {
        windowSize,
        breakpoints: {
            sm: isSm,
            md: isMd,
            lg: isLg,
            xl: isXl,
            "2xl": is2Xl,
        },
        currentBreakpoint: getCurrentBreakpoint(),
        isMobile: !isSm,
        isTablet: isSm && !isLg,
        isDesktop: isLg,
        isLargeDesktop: isXl,
    };
}

// Hook for detecting device capabilities
export function useDeviceCapabilities() {
    const [capabilities, setCapabilities] = useState({
        hasTouch: false,
        hasHover: false,
        prefersReducedMotion: false,
        colorScheme: "light" as "light" | "dark",
        connectionType: "unknown" as string,
        deviceMemory: 0,
        hardwareConcurrency: 0,
    });

    useEffect(() => {
        // Touch detection
        const hasTouch =
            "ontouchstart" in window || navigator.maxTouchPoints > 0;

        // Hover capability detection
        const hasHover = window.matchMedia("(hover: hover)").matches;

        // Reduced motion preference
        const prefersReducedMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;

        // Color scheme preference
        const darkModeQuery = window.matchMedia("(prefers-color-scheme: dark)");
        const colorScheme = darkModeQuery.matches ? "dark" : "light";

        // Network information (if available)
        const navigatorWithConnection = navigator as Navigator & {
            connection?: {
                effectiveType: string;
            };
            mozConnection?: {
                effectiveType: string;
            };
            webkitConnection?: {
                effectiveType: string;
            };
            deviceMemory?: number;
        };

        const connection =
            navigatorWithConnection.connection ||
            navigatorWithConnection.mozConnection ||
            navigatorWithConnection.webkitConnection;
        const connectionType = connection?.effectiveType || "unknown";

        // Device memory (if available)
        const deviceMemory = navigatorWithConnection.deviceMemory || 0;

        // Hardware concurrency
        const hardwareConcurrency = navigator.hardwareConcurrency || 0;

        setCapabilities({
            hasTouch,
            hasHover,
            prefersReducedMotion,
            colorScheme,
            connectionType,
            deviceMemory,
            hardwareConcurrency,
        });

        // Listen for color scheme changes
        const handleColorSchemeChange = (e: MediaQueryListEvent) => {
            setCapabilities((prev) => ({
                ...prev,
                colorScheme: e.matches ? "dark" : "light",
            }));
        };

        darkModeQuery.addEventListener("change", handleColorSchemeChange);

        return () => {
            darkModeQuery.removeEventListener(
                "change",
                handleColorSchemeChange
            );
        };
    }, []);

    return capabilities;
}
