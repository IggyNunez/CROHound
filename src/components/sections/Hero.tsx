import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface HeroCTA {
    text: string;
    href: string;
    variant?: "default" | "outline";
    icon?: LucideIcon;
}

interface HeroProps {
    badge?: string;
    title: string;
    titleHighlight?: string;
    description: string;
    primaryCta?: HeroCTA;
    secondaryCta?: HeroCTA;
    backgroundVariant?: "gradient" | "muted" | "default";
    size?: "default" | "large";
    className?: string;
}

export function Hero({
    badge,
    title,
    titleHighlight,
    description,
    primaryCta,
    secondaryCta,
    backgroundVariant = "gradient",
    size = "default",
    className,
}: HeroProps) {
    const backgroundClasses = {
        gradient: "bg-gradient-to-b from-background to-muted/50",
        muted: "bg-muted/50",
        default: "",
    };

    const sizeClasses = {
        default: "py-16 md:py-24",
        large: "py-20 md:py-32",
    };

    return (
        <section
            className={cn(
                sizeClasses[size],
                backgroundClasses[backgroundVariant],
                className
            )}
        >
            <div className="container px-4 md:px-6">
                <div className="flex flex-col items-center space-y-8 text-center">
                    {badge && (
                        <Badge variant="secondary" className="px-4 py-2">
                            {badge}
                        </Badge>
                    )}

                    <div className="space-y-4 max-w-4xl">
                        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
                            {title}
                            {titleHighlight && (
                                <span className="text-primary">
                                    {" "}
                                    {titleHighlight}
                                </span>
                            )}
                        </h1>
                        <p className="mx-auto max-w-2xl text-xl text-muted-foreground sm:text-2xl">
                            {description}
                        </p>
                    </div>

                    {(primaryCta || secondaryCta) && (
                        <div className="flex flex-col sm:flex-row gap-4">
                            {primaryCta && (
                                <Button
                                    asChild
                                    size="lg"
                                    className="text-lg px-8 py-6"
                                    variant={primaryCta.variant || "default"}
                                >
                                    <Link href={primaryCta.href}>
                                        {primaryCta.text}
                                        {primaryCta.icon && (
                                            <primaryCta.icon className="ml-2 h-5 w-5" />
                                        )}
                                    </Link>
                                </Button>
                            )}

                            {secondaryCta && (
                                <Button
                                    asChild
                                    variant={secondaryCta.variant || "outline"}
                                    size="lg"
                                    className="text-lg px-8 py-6"
                                >
                                    <Link href={secondaryCta.href}>
                                        {secondaryCta.text}
                                        {secondaryCta.icon && (
                                            <secondaryCta.icon className="ml-2 h-5 w-5" />
                                        )}
                                    </Link>
                                </Button>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}

// Predefined hero variants for common patterns
export const HeroVariants = {
    homepage: {
        badge: "Trusted by Shopify merchants",
        title: "Turn more Shopify visitors into buyers",
        titleHighlight: "— without adding ad spend",
        description:
            'We run lean CRO programs for $5k–$50k/mo stores. Start with a free 12-point "Sniff Check".',
        primaryCta: {
            text: "Get Your Free Sniff Check",
            href: "/contact",
            icon: ArrowRight,
        },
        secondaryCta: {
            text: "View Case Studies",
            href: "/case-studies",
            variant: "outline" as const,
        },
        backgroundVariant: "gradient" as const,
        size: "large" as const,
    },
} as const;
