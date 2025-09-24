"use client";

import { useState, useEffect, useCallback } from "react";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

interface MobileMenuProps {
    navItems: Array<{ label: string; href: string }>;
}

export function MobileMenu({ navItems }: MobileMenuProps) {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);

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
            {/* Mobile Menu Toggle */}
            <button
                onClick={toggleMenu}
                className="lg:hidden p-3 text-gray-300 hover:text-white transition-all duration-300 rounded-lg hover:bg-white/5 hover:scale-105 flex-shrink-0"
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

            {/* Mobile Navigation Overlay */}
            {isOpen && (
                <div className="lg:hidden fixed inset-0 z-40 bg-black/70 backdrop-blur-sm transition-all duration-300">
                    <div
                        className="absolute inset-0"
                        onClick={closeMenu}
                        aria-hidden="true"
                    />
                </div>
            )}

            {/* Mobile Navigation Menu */}
            <div
                className={`lg:hidden fixed top-20 right-0 bottom-0 z-50 w-72 max-w-[85vw] min-w-0 bg-black/95 backdrop-blur-xl border-l border-red-500/20 transform transition-all duration-300 ease-out overflow-x-hidden ${
                    isOpen
                        ? "translate-x-0 opacity-100"
                        : "translate-x-full opacity-0"
                }`}
            >
                <nav
                    className="flex flex-col h-full"
                    aria-label="Mobile navigation"
                >
                    {/* Navigation Links */}
                    <div className="flex-1 py-6">
                        {navItems.map((item, index) => (
                            <a
                                key={item.href}
                                href={item.href}
                                onClick={closeMenu}
                                className={`block px-6 py-4 text-lg font-medium transition-all duration-200 border-l-4 hover:bg-zinc-800/50 hover:border-red-400 hover:text-white hover:translate-x-1 ${
                                    isActive(item.href)
                                        ? "text-white bg-red-600/20 border-red-500"
                                        : "text-zinc-200 border-transparent"
                                }`}
                                style={{
                                    transitionDelay: isOpen
                                        ? `${index * 50}ms`
                                        : "0ms",
                                    transform: isOpen
                                        ? "translateX(0)"
                                        : "translateX(20px)",
                                    opacity: isOpen ? 1 : 0,
                                }}
                            >
                                {item.label}
                            </a>
                        ))}
                    </div>

                    {/* Mobile CTA */}
                    <div className="p-6 border-t border-zinc-800/30">
                        <a
                            href="/contact"
                            onClick={closeMenu}
                            className="relative w-full h-14 px-6 text-base font-bold bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white border-0 shadow-lg shadow-red-500/20 hover:shadow-xl hover:shadow-red-500/30 hover:scale-102 transition-all duration-300 rounded-xl flex items-center justify-center overflow-hidden"
                        >
                            <span className="relative z-10">
                                GET YOUR FREE SNIFF CHECK
                            </span>
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12 -translate-x-full hover:translate-x-full transition-transform duration-700" />
                        </a>
                    </div>
                </nav>
            </div>
        </>
    );
}
