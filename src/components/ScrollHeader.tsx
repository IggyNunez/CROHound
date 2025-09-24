"use client";

import { useState, useEffect } from "react";

interface ScrollHeaderProps {
    children: React.ReactNode;
}

export function ScrollHeader({ children }: ScrollHeaderProps) {
    const [isScrolled, setIsScrolled] = useState(false);

    // Optimized scroll handler with throttling
    useEffect(() => {
        let ticking = false;

        const updateScrollStatus = () => {
            setIsScrolled(window.scrollY > 10);
            ticking = false;
        };

        const handleScroll = () => {
            if (!ticking) {
                requestAnimationFrame(updateScrollStatus);
                ticking = true;
            }
        };

        // Initial check
        updateScrollStatus();
        window.addEventListener("scroll", handleScroll, { passive: true });

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header
            className="sticky top-0 z-50 w-full bg-black/95 backdrop-blur-md border-b transition-all duration-300 overflow-x-hidden"
            style={{
                borderBottomColor: isScrolled
                    ? "rgba(239,68,68,0.3)"
                    : "rgba(255,255,255,0.1)",
                boxShadow: isScrolled
                    ? "0 10px 25px -5px rgba(0,0,0,0.5)"
                    : "none",
            }}
        >
            {/* Subtle gradient overlay for scrolled state */}
            <div
                className="absolute inset-0 pointer-events-none transition-opacity duration-300"
                style={{
                    background:
                        "linear-gradient(to right, rgba(220,38,38,0.05), rgba(220,38,38,0.1), rgba(220,38,38,0.05))",
                    opacity: isScrolled ? 1 : 0,
                }}
            />
            {children}
        </header>
    );
}
