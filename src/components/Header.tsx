"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState, useCallback, memo } from "react";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// Types - move to shared types file later
interface NavItem {
    label: string;
    href: string;
}

// Static data - prevents recreation on every render
const NAV_ITEMS: NavItem[] = [
    { label: "Services", href: "/services" },
    { label: "Packages", href: "/packages" },
    { label: "Case Studies", href: "/case-studies" },
    { label: "Blog", href: "/blog" },
    { label: "About", href: "/about" },
];

// Memoized navigation link component
const NavLink = memo(
    ({ item, isActive }: { item: NavItem; isActive: boolean }) => (
        <Link
            href={item.href}
            className={cn(
                "nav-link",
                "relative px-6 py-3 text-sm font-semibold transition-all duration-300 rounded-xl group border border-transparent",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500/50",
                "hover:shadow-lg hover:shadow-red-500/25 hover:scale-105 hover:-translate-y-0.5",
                isActive
                    ? "text-white bg-gradient-to-r from-red-600/40 to-yellow-500/40 shadow-md shadow-red-500/20 border-red-500/30"
                    : "text-zinc-200 hover:text-white hover:bg-gradient-to-r hover:from-red-600/20 hover:to-yellow-500/20 hover:border-red-500/30"
            )}
        >
            {item.label}
            {/* Elegant underline animation */}
            <span className="absolute bottom-1 left-1/2 h-0.5 w-0 bg-gradient-to-r from-red-500 to-yellow-500 transition-all duration-300 group-hover:w-3/4 group-hover:-translate-x-1/2 rounded-full" />
            {/* Subtle glow effect */}
            <span className="absolute inset-0 bg-gradient-to-r from-red-500/0 via-red-500/5 to-yellow-500/0 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300" />
        </Link>
    )
);

NavLink.displayName = "NavLink";

// Memoized mobile navigation item
const MobileNavLink = memo(
    ({
        item,
        isActive,
        onClick,
    }: {
        item: NavItem;
        isActive: boolean;
        onClick: () => void;
    }) => (
        <Link
            href={item.href}
            onClick={onClick}
            className={cn(
                "block px-6 py-4 text-lg font-medium transition-all duration-200 border-l-4",
                "hover:bg-zinc-800/50 hover:border-red-400 hover:text-white hover:translate-x-1",
                isActive
                    ? "text-white bg-red-600/20 border-red-500"
                    : "text-zinc-200 border-transparent"
            )}
        >
            {item.label}
        </Link>
    )
);

MobileNavLink.displayName = "MobileNavLink";

// Main Header Component
const Header = memo(() => {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);
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

    // Close mobile menu on route change
    useEffect(() => {
        setIsOpen(false);
    }, [pathname]);

    // Prevent body scroll when mobile menu is open
    useEffect(() => {
        document.body.style.overflow = isOpen ? "hidden" : "";
        return () => {
            document.body.style.overflow = "";
        };
    }, [isOpen]);

    // Memoized callbacks
    const toggleMenu = useCallback(() => setIsOpen((prev) => !prev), []);
    const closeMenu = useCallback(() => setIsOpen(false), []);

    const isActive = useCallback(
        (href: string) => {
            if (href === "/") return pathname === href;
            return pathname?.startsWith(href) || false;
        },
        [pathname]
    );

    return (
        <>
            <header
                className="sticky top-0 z-50 w-full bg-black border-b transition-all duration-300 overflow-x-hidden"
                style={{
                    backdropFilter: "blur(12px)",
                    WebkitBackdropFilter: "blur(12px)",
                    borderBottomColor: isScrolled
                        ? "rgba(239,68,68,0.2)"
                        : "rgba(255,255,255,0.05)",
                    boxShadow: isScrolled
                        ? "0 25px 50px -12px rgba(239,68,68,0.1)"
                        : "none",
                }}
            >
                {/* Gradient Overlay for Scrolled State */}
                <div
                    className="absolute inset-0 pointer-events-none transition-opacity duration-300"
                    style={{
                        background:
                            "linear-gradient(to right, rgba(127,29,29,0.2), rgba(127,29,29,0.4), rgba(127,29,29,0.2))",
                        opacity: isScrolled ? 1 : 0,
                    }}
                />
                <div className="container mx-auto px-3 sm:px-4 lg:px-8 max-w-7xl">
                    <div className="flex h-20 lg:h-24 items-center justify-between min-w-0">
                        {/* Logo */}
                        <Link
                            href="/"
                            className="flex items-center gap-3 sm:gap-4 group flex-shrink-0 logo-container"
                            aria-label="CROHound Home"
                        >
                            <div className="relative">
                                <Image
                                    src="/logo_no_description.png"
                                    alt="CROHound"
                                    width={56}
                                    height={56}
                                    className="logo-img w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 object-contain transition-all duration-300 group-hover:scale-110 group-hover:rotate-2"
                                    priority
                                />
                                <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-yellow-500/20 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-all duration-300" />
                            </div>
                            <span className="hidden sm:block text-xl sm:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-red-500 to-yellow-500 bg-clip-text text-transparent truncate transition-all duration-300 group-hover:from-red-400 group-hover:to-yellow-400">
                                CROHOUND
                            </span>
                        </Link>

                        {/* Desktop Navigation */}
                        <nav
                            className="hidden lg:flex items-center gap-2"
                            aria-label="Main navigation"
                        >
                            {NAV_ITEMS.map((item) => (
                                <NavLink
                                    key={item.href}
                                    item={item}
                                    isActive={isActive(item.href)}
                                />
                            ))}
                        </nav>

                        {/* CTA Button (Desktop) */}
                        <div className="hidden lg:flex items-center gap-4">
                            <Button
                                asChild
                                className="cta-button relative h-11 lg:h-14 px-4 lg:px-8 text-xs lg:text-base font-bold bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white border-0 shadow-lg shadow-red-500/20 hover:shadow-xl hover:shadow-red-500/30 hover:scale-105 hover:-translate-y-0.5 transition-all duration-300 rounded-xl whitespace-nowrap overflow-hidden group"
                            >
                                <Link
                                    href="/contact"
                                    className="flex items-center relative z-10"
                                >
                                    GET FREE AUDIT
                                    {/* Elegant shimmer effect */}
                                    <div className="absolute inset-0 -top-1 -bottom-1 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out" />
                                </Link>
                            </Button>
                        </div>

                        {/* Mobile Menu Toggle */}
                        <button
                            onClick={toggleMenu}
                            className="mobile-toggle lg:hidden p-3 text-gray-300 hover:text-white transition-all duration-300 rounded-lg hover:bg-white/5 hover:scale-105 flex-shrink-0"
                            aria-expanded={isOpen}
                            aria-label="Toggle menu"
                        >
                            <div
                                className={`transition-all duration-300 ${
                                    isOpen ? "rotate-180" : "rotate-0"
                                }`}
                            >
                                {isOpen ? <X size={24} /> : <Menu size={24} />}
                            </div>
                        </button>
                    </div>
                </div>
            </header>

            {/* Mobile Navigation Overlay */}
            {isOpen && (
                <div className="lg:hidden fixed inset-0 z-40 bg-black/60 backdrop-blur-sm">
                    <div
                        className="absolute inset-0"
                        onClick={closeMenu}
                        aria-hidden="true"
                    />
                </div>
            )}

            {/* Mobile Navigation Menu */}
            <div
                className={cn(
                    "lg:hidden fixed top-20 lg:top-24 right-0 bottom-0 z-50",
                    "w-72 max-w-[85vw] min-w-0",
                    "bg-black/98 backdrop-blur-xl border-l border-zinc-700/50",
                    "transform transition-transform duration-300 ease-out overflow-x-hidden",
                    isOpen ? "translate-x-0" : "translate-x-full"
                )}
            >
                <nav
                    className="flex flex-col h-full"
                    aria-label="Mobile navigation"
                >
                    {/* Navigation Links */}
                    <div className="flex-1 py-6">
                        {NAV_ITEMS.map((item) => (
                            <MobileNavLink
                                key={item.href}
                                item={item}
                                isActive={isActive(item.href)}
                                onClick={closeMenu}
                            />
                        ))}
                    </div>

                    {/* Mobile CTA */}
                    <div className="p-6 border-t border-zinc-800/50">
                        <Button
                            asChild
                            className="relative w-full h-14 px-6 text-base font-bold bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white border-0 shadow-lg shadow-red-500/20 hover:shadow-xl hover:shadow-red-500/30 hover:scale-102 transition-all duration-300 rounded-xl overflow-hidden group"
                        >
                            <Link
                                href="/contact"
                                onClick={closeMenu}
                                className="flex items-center justify-center relative z-10"
                            >
                                GET YOUR FREE SNIFF CHECK
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                            </Link>
                        </Button>
                    </div>
                </nav>
            </div>
        </>
    );
});

Header.displayName = "Header";
export default Header;
