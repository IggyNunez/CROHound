"use client";

import { useState, useEffect, useCallback } from "react";

interface ScrollProgressState {
    scrollY: number;
    scrollX: number;
    scrollProgress: number; // 0-100 percentage
    direction: "up" | "down" | "none";
    isScrolling: boolean;
}

interface UseScrollProgressOptions {
    element?: HTMLElement | null;
    offset?: number;
}

// Export types
export type { ScrollProgressState, UseScrollProgressOptions };

export function useScrollProgress({
    element,
    offset = 0,
}: UseScrollProgressOptions = {}): ScrollProgressState {
    const [scrollState, setScrollState] = useState<ScrollProgressState>({
        scrollY: 0,
        scrollX: 0,
        scrollProgress: 0,
        direction: "none",
        isScrolling: false,
    });

    const [isScrolling, setIsScrolling] = useState(false);
    const [scrollTimeout, setScrollTimeout] = useState<NodeJS.Timeout | null>(
        null
    );

    const updateScrollState = useCallback(() => {
        const scrollElement = element || document.documentElement;

        let scrollY: number;
        let scrollX: number;

        if (element) {
            scrollY = element.scrollTop;
            scrollX = element.scrollLeft;
        } else {
            scrollY = window.scrollY || document.documentElement.scrollTop;
            scrollX = window.scrollX || document.documentElement.scrollLeft;
        }

        const scrollHeight =
            scrollElement.scrollHeight - scrollElement.clientHeight;
        const scrollProgress =
            scrollHeight > 0
                ? Math.min(
                      100,
                      Math.max(0, ((scrollY - offset) / scrollHeight) * 100)
                  )
                : 0;

        setScrollState((prevState) => {
            let direction: "up" | "down" | "none" = "none";

            if (scrollY > prevState.scrollY) {
                direction = "down";
            } else if (scrollY < prevState.scrollY) {
                direction = "up";
            }

            return {
                scrollY,
                scrollX,
                scrollProgress,
                direction,
                isScrolling: true,
            };
        });

        // Set scrolling state
        setIsScrolling(true);

        // Clear existing timeout
        if (scrollTimeout) {
            clearTimeout(scrollTimeout);
        }

        // Set timeout to detect when scrolling stops
        const timeout = setTimeout(() => {
            setIsScrolling(false);
            setScrollState((prev) => ({ ...prev, isScrolling: false }));
        }, 150); // 150ms after last scroll event

        setScrollTimeout(timeout);
    }, [element, offset, scrollTimeout]);

    // Throttled scroll handler
    const handleScroll = useCallback(() => {
        updateScrollState();
    }, [updateScrollState]);

    useEffect(() => {
        const target = element || window;
        let ticking = false;

        const throttledScrollHandler = () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    handleScroll();
                    ticking = false;
                });
                ticking = true;
            }
        };

        // Initial state
        updateScrollState();

        // Add event listener
        target.addEventListener("scroll", throttledScrollHandler, {
            passive: true,
        });

        return () => {
            target.removeEventListener("scroll", throttledScrollHandler);
            if (scrollTimeout) {
                clearTimeout(scrollTimeout);
            }
        };
    }, [element, handleScroll, updateScrollState, scrollTimeout]);

    return {
        ...scrollState,
        isScrolling,
    };
}

// Hook for detecting when an element enters/exits viewport
export function useInView(
    ref: React.RefObject<HTMLElement>,
    options: IntersectionObserverInit = {}
) {
    const [inView, setInView] = useState(false);
    const [hasBeenInView, setHasBeenInView] = useState(false);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                const isInView = entry.isIntersecting;
                setInView(isInView);

                if (isInView && !hasBeenInView) {
                    setHasBeenInView(true);
                }
            },
            {
                threshold: 0.1,
                rootMargin: "0px 0px -50px 0px",
                ...options,
            }
        );

        observer.observe(element);

        return () => {
            observer.unobserve(element);
        };
    }, [ref, hasBeenInView, options]);

    return { inView, hasBeenInView };
}

// Hook for scroll-based animations
export function useScrollAnimation(
    ref: React.RefObject<HTMLElement>,
    animationClass: string = "animate-in"
) {
    const { inView, hasBeenInView } = useInView(ref);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        if (inView && !hasBeenInView) {
            element.classList.add(animationClass);
        }
    }, [inView, hasBeenInView, animationClass, ref]);

    return { inView, hasBeenInView };
}

// Hook for scroll-to-element functionality
export function useScrollTo() {
    const scrollToElement = useCallback(
        (
            elementId: string,
            options: ScrollIntoViewOptions = {
                behavior: "smooth",
                block: "start",
            }
        ) => {
            const element = document.getElementById(elementId);
            if (element) {
                element.scrollIntoView(options);
            }
        },
        []
    );

    const scrollToTop = useCallback((behavior: ScrollBehavior = "smooth") => {
        window.scrollTo({ top: 0, behavior });
    }, []);

    const scrollToBottom = useCallback(
        (behavior: ScrollBehavior = "smooth") => {
            window.scrollTo({ top: document.body.scrollHeight, behavior });
        },
        []
    );

    return {
        scrollToElement,
        scrollToTop,
        scrollToBottom,
    };
}
