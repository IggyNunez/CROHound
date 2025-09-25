"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState, useCallback, memo } from "react";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// Types
interface NavItem {
    label: string;
    href: string;
}

// Static data
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
                "relative px-6 py-3 text-sm font-semibold rounded-xl border transition-all duration-300",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500/50",
                // Default state
                "text-zinc-200 border-transparent",
                // Hover state - using standard Tailwind hover utilities
                "hover:text-white hover:scale-105 hover:-translate-y-0.5",
                "hover:bg-gradient-to-r hover:from-red-600/20 hover:to-yellow-500/20",
                "hover:border-red-500/30 hover:shadow-lg hover:shadow-red-500/25",
                // Active state
                isActive && [
                    "text-white bg-gradient-to-r from-red-600/40 to-yellow-500/40",
                    "shadow-md shadow-red-500/20 border-red-500/30",
                ],
                // Group for child animations
                "group"
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
                    ? "bg-zinc-800/30 text-white border-red-500"
                    : "text-zinc-300 border-transparent"
            )}
        >
            {item.label}
        </Link>
    )
);

MobileNavLink.displayName = "MobileNavLink";

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const pathname = usePathname();

    // Handle scroll effect
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };

        handleScroll(); // Check initial scroll position
        window.addEventListener("scroll", handleScroll, { passive: true });

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    // Close mobile menu on route change
    useEffect(() => {
        setIsOpen(false);
    }, [pathname]);

    // Prevent body scroll when menu is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }

        return () => {
            document.body.style.overflow = "";
        };
    }, [isOpen]);

    const toggleMenu = useCallback(() => {
        setIsOpen((prev) => !prev);
    }, []);

    const isActive = useCallback(
        (href: string) => pathname === href,
        [pathname]
    );

    return (
        <>
            <header
                className={cn(
                    "fixed top-0 left-0 right-0 z-40 transition-all duration-300",
                    isScrolled
                        ? "bg-zinc-900/95 backdrop-blur-lg shadow-[0_25px_50px_-12px_rgba(239,68,68,0.1)]"
                        : "bg-zinc-900/80 backdrop-blur-md"
                )}
            >
                {/* Gradient Overlay for Scrolled State */}
                <div
                    className={cn(
                        "absolute inset-0 pointer-events-none transition-opacity duration-300",
                        "bg-gradient-to-r from-red-900/20 via-red-900/40 to-red-900/20",
                        isScrolled ? "opacity-100" : "opacity-0"
                    )}
                />

                <div className="container mx-auto px-3 sm:px-4 lg:px-8 max-w-7xl">
                    <div className="flex h-20 lg:h-24 items-center justify-between min-w-0 relative">
                        {/* Logo */}
                        <Link
                            href="/"
                            className="flex items-center gap-3 sm:gap-4 group flex-shrink-0 transition-transform duration-300 hover:scale-105"
                            aria-label="CROHound Home"
                        >
                            <div className="relative">
                                <Image
                                    src="/logo_no_description.png"
                                    alt="CROHound"
                                    width={56}
                                    height={56}
                                    className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 object-contain transition-all duration-300 group-hover:scale-110 group-hover:rotate-2"
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
                                className={cn(
                                    "relative h-11 lg:h-14 px-4 lg:px-8 text-xs lg:text-base font-bold",
                                    "bg-gradient-to-r from-red-600 to-red-700 text-white border-0",
                                    "shadow-lg shadow-red-500/20 rounded-xl whitespace-nowrap overflow-hidden",
                                    "transition-all duration-300 group",
                                    "hover:from-red-700 hover:to-red-800",
                                    "hover:shadow-xl hover:shadow-red-500/30",
                                    "hover:scale-105 hover:-translate-y-0.5"
                                )}
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
                            className={cn(
                                "lg:hidden p-3 text-gray-300 transition-all duration-300 rounded-lg flex-shrink-0",
                                "hover:text-white hover:bg-white/5 hover:scale-105"
                            )}
                            aria-expanded={isOpen}
                            aria-label="Toggle menu"
                        >
                            <div
                                className={cn(
                                    "transition-all duration-300",
                                    isOpen ? "rotate-180" : "rotate-0"
                                )}
                            >
                                {isOpen ? (
                                    <X className="w-6 h-6" />
                                ) : (
                                    <Menu className="w-6 h-6" />
                                )}
                            </div>
                        </button>
                    </div>
                </div>
            </header>

            {/* Mobile Navigation */}
            <div
                className={cn(
                    "lg:hidden fixed inset-x-0 top-20 z-30 transition-all duration-300",
                    isOpen
                        ? "opacity-100 translate-y-0 pointer-events-auto"
                        : "opacity-0 -translate-y-4 pointer-events-none"
                )}
            >
                <nav
                    className="bg-zinc-900/98 backdrop-blur-lg border-b border-zinc-800 shadow-2xl"
                    aria-label="Mobile navigation"
                >
                    {NAV_ITEMS.map((item) => (
                        <MobileNavLink
                            key={item.href}
                            item={item}
                            isActive={isActive(item.href)}
                            onClick={toggleMenu}
                        />
                    ))}
                    <div className="p-4 border-t border-zinc-800">
                        <Button
                            asChild
                            className={cn(
                                "w-full h-12 text-sm font-bold",
                                "bg-gradient-to-r from-red-600 to-red-700 text-white",
                                "shadow-lg shadow-red-500/20 rounded-xl",
                                "transition-all duration-300",
                                "hover:from-red-700 hover:to-red-800",
                                "hover:shadow-xl hover:shadow-red-500/30"
                            )}
                        >
                            <Link href="/contact">GET FREE AUDIT</Link>
                        </Button>
                    </div>
                </nav>
            </div>

            {/* Mobile Menu Overlay */}
            {isOpen && (
                <div
                    className="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-20"
                    onClick={toggleMenu}
                    aria-hidden="true"
                />
            )}
        </>
    );
}
