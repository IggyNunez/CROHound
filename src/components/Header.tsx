"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
} from "@/components/ui/navigation-menu";

type NavItem = { label: string; href: string };

export default function Header() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => setIsScrolled(window.scrollY > 4);
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const navItems: NavItem[] = useMemo(
        () => [
            { label: "Services", href: "/services" },
            { label: "Packages", href: "/packages" },
            { label: "Case Studies", href: "/case-studies" },
            { label: "Blog", href: "/blog" },
            { label: "About", href: "/about" },
        ],
        []
    );

    const isActive = (href: string) =>
        href === "/" ? pathname === href : pathname?.startsWith(href);

    return (
        <header
            className={
                "sticky top-0 z-50 w-full backdrop-blur-xl supports-[backdrop-filter]:bg-black/80 bg-black/90 transition-all duration-300 " +
                (isScrolled
                    ? "shadow-2xl shadow-black/20 border-b border-zinc-800/50"
                    : "border-b border-zinc-800/30")
            }
        >
            <div className="container flex h-20 items-center justify-between px-6 md:px-8 lg:h-24">
                {/* Logo */}
                <Link
                    href="/"
                    aria-label="CROHound Home"
                    className="flex items-center gap-4 hover:scale-105 transition-all duration-300 group"
                >
                    <div className="relative">
                        <Image
                            src="/logo_no_description.png"
                            alt="CROHound"
                            width={56}
                            height={56}
                            className="h-12 w-auto md:h-14 transition-all duration-300 group-hover:brightness-110"
                            priority
                        />
                        <div className="absolute inset-0 bg-gradient-to-br from-red-500/20 to-yellow-500/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                    <span className="text-2xl font-bold bg-gradient-to-r from-red-500 to-yellow-500 bg-clip-text text-transparent hidden sm:block">
                        CROHOUND
                    </span>
                </Link>

                {/* Desktop Navigation */}
                <NavigationMenu className="hidden lg:flex" aria-label="Main">
                    <NavigationMenuList className="flex items-center gap-2">
                        {navItems.map((item) => (
                            <NavigationMenuItem key={item.href}>
                                <NavigationMenuLink asChild>
                                    <Link
                                        href={item.href}
                                        aria-current={
                                            isActive(item.href)
                                                ? "page"
                                                : undefined
                                        }
                                        className={
                                            "group relative inline-flex h-12 w-max items-center justify-center rounded-xl px-6 py-3 text-sm font-semibold transition-all duration-300 outline-none focus-visible:ring-2 focus-visible:ring-red-500/50 " +
                                            (isActive(item.href)
                                                ? "text-red-400 bg-red-500/10 shadow-lg shadow-red-500/25 border border-red-500/20"
                                                : "text-zinc-300 hover:text-white hover:bg-zinc-800/50 hover:scale-105 hover:shadow-lg hover:shadow-zinc-900/25")
                                        }
                                    >
                                        {item.label}
                                        {isActive(item.href) && (
                                            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-red-500 rounded-full" />
                                        )}
                                    </Link>
                                </NavigationMenuLink>
                            </NavigationMenuItem>
                        ))}
                    </NavigationMenuList>
                </NavigationMenu>

                {/* CTA + Mobile Toggle */}
                <div className="flex items-center gap-4">
                    <Button
                        asChild
                        className="hidden md:inline-flex font-bold px-8 py-3 h-12 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white border-0 shadow-xl shadow-red-500/25 hover:shadow-red-500/40 hover:scale-105 transition-all duration-300 rounded-xl"
                    >
                        <Link href="/contact">GET YOUR FREE SNIFF CHECK</Link>
                    </Button>

                    <Button
                        aria-label={isOpen ? "Close menu" : "Open menu"}
                        variant="ghost"
                        size="icon"
                        className="lg:hidden h-12 w-12 rounded-xl text-zinc-300 hover:text-white hover:bg-zinc-800/50 transition-all duration-300"
                        onClick={() => setIsOpen((v) => !v)}
                        aria-expanded={isOpen}
                        aria-controls="mobile-nav"
                    >
                        {isOpen ? (
                            <X className="h-6 w-6" />
                        ) : (
                            <Menu className="h-6 w-6" />
                        )}
                    </Button>
                </div>
            </div>

            {/* Mobile Navigation */}
            {isOpen && (
                <>
                    {/* Overlay */}
                    <div
                        className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden animate-in fade-in duration-300"
                        onClick={() => setIsOpen(false)}
                        aria-hidden="true"
                    />
                    <div
                        id="mobile-nav"
                        className="lg:hidden border-t border-zinc-800/50 bg-black/95 backdrop-blur-xl z-50 relative animate-in slide-in-from-top duration-300"
                    >
                        <div className="container py-8 space-y-4 px-6">
                            {navItems.map((item, index) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={
                                        "block py-4 px-4 text-lg font-semibold rounded-xl transition-all duration-300 border " +
                                        (isActive(item.href)
                                            ? "text-red-400 bg-red-500/10 border-red-500/20 shadow-lg shadow-red-500/25"
                                            : "text-zinc-300 hover:text-white hover:bg-zinc-800/50 border-zinc-800/30 hover:border-zinc-700/50")
                                    }
                                    onClick={() => setIsOpen(false)}
                                    style={{
                                        animationDelay: `${index * 50}ms`,
                                        animation:
                                            "fadeInUp 0.3s ease-out forwards",
                                    }}
                                >
                                    {item.label}
                                </Link>
                            ))}
                            <Button
                                asChild
                                className="w-full mt-6 h-14 font-bold text-lg bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white border-0 shadow-xl shadow-red-500/25 hover:shadow-red-500/40 rounded-xl transition-all duration-300"
                                style={{
                                    animationDelay: `${navItems.length * 50}ms`,
                                    animation:
                                        "fadeInUp 0.3s ease-out forwards",
                                }}
                            >
                                <Link
                                    href="/contact"
                                    onClick={() => setIsOpen(false)}
                                >
                                    Get Your Free Sniff Check
                                </Link>
                            </Button>
                        </div>
                    </div>
                </>
            )}
        </header>
    );
}
