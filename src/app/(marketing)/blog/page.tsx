import { Badge } from "@/components/ui/badge";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Shopify CRO Blog - Conversion Optimization Tips & Strategies",
    description:
        "Learn Shopify conversion optimization strategies, quick wins, and best practices from CROHound's conversion experts.",
};

export default function BlogPage() {
    return (
        <div className="flex flex-col">
            {/* Hero Section */}
            <section className="py-16 md:py-24">
                <div className="container px-4 md:px-6">
                    <div className="flex flex-col items-center space-y-8 text-center">
                        <Badge variant="secondary">Blog</Badge>
                        <div className="space-y-4 max-w-4xl">
                            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
                                Shopify CRO Blog
                            </h1>
                            <p className="mx-auto max-w-2xl text-xl text-muted-foreground">
                                Conversion optimization tips, strategies, and
                                case studies to help you boost your Shopify
                                store&apos;s performance.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Blog Posts Grid */}
            <section className="py-16 md:py-24 bg-muted/50">
                <div className="container px-4 md:px-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {/* Post 1 */}
                        <Card className="h-full">
                            <CardHeader>
                                <Badge variant="outline" className="w-fit">
                                    Quick Wins
                                </Badge>
                                <CardTitle className="text-xl">
                                    <Link
                                        href="#"
                                        className="hover:text-primary transition-colors"
                                    >
                                        12-Point Shopify CRO &apos;Sniff
                                        Check&apos;
                                    </Link>
                                </CardTitle>
                                <CardDescription>
                                    The exact checklist we use to audit Shopify
                                    stores for conversion optimization
                                    opportunities.
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="flex items-center justify-between text-sm text-muted-foreground">
                                    <span>5 min read</span>
                                    <span>Coming Soon</span>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Post 2 */}
                        <Card className="h-full">
                            <CardHeader>
                                <Badge variant="outline" className="w-fit">
                                    Product Pages
                                </Badge>
                                <CardTitle className="text-xl">
                                    <Link
                                        href="#"
                                        className="hover:text-primary transition-colors"
                                    >
                                        PDP Quick Wins: 7 Changes That Boost
                                        Conversions
                                    </Link>
                                </CardTitle>
                                <CardDescription>
                                    Simple product page optimizations you can
                                    implement today to increase your conversion
                                    rate.
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="flex items-center justify-between text-sm text-muted-foreground">
                                    <span>7 min read</span>
                                    <span>Coming Soon</span>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Post 3 */}
                        <Card className="h-full">
                            <CardHeader>
                                <Badge variant="outline" className="w-fit">
                                    Case Study
                                </Badge>
                                <CardTitle className="text-xl">
                                    <Link
                                        href="#"
                                        className="hover:text-primary transition-colors"
                                    >
                                        How We Increased CVR by 23% in 30 Days
                                    </Link>
                                </CardTitle>
                                <CardDescription>
                                    A detailed breakdown of the optimization
                                    process for a $25k/month Shopify store.
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="flex items-center justify-between text-sm text-muted-foreground">
                                    <span>10 min read</span>
                                    <span>Coming Soon</span>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Post 4 */}
                        <Card className="h-full">
                            <CardHeader>
                                <Badge variant="outline" className="w-fit">
                                    Technical
                                </Badge>
                                <CardTitle className="text-xl">
                                    <Link
                                        href="#"
                                        className="hover:text-primary transition-colors"
                                    >
                                        Core Web Vitals for Shopify: A Complete
                                        Guide
                                    </Link>
                                </CardTitle>
                                <CardDescription>
                                    Everything you need to know about optimizing
                                    Core Web Vitals for better conversions and
                                    SEO.
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="flex items-center justify-between text-sm text-muted-foreground">
                                    <span>12 min read</span>
                                    <span>Coming Soon</span>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Post 5 */}
                        <Card className="h-full">
                            <CardHeader>
                                <Badge variant="outline" className="w-fit">
                                    Checkout
                                </Badge>
                                <CardTitle className="text-xl">
                                    <Link
                                        href="#"
                                        className="hover:text-primary transition-colors"
                                    >
                                        Shopify Checkout Optimization: Beyond
                                        the Basics
                                    </Link>
                                </CardTitle>
                                <CardDescription>
                                    Advanced checkout optimization strategies
                                    that work within Shopify&apos;s constraints.
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="flex items-center justify-between text-sm text-muted-foreground">
                                    <span>8 min read</span>
                                    <span>Coming Soon</span>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Post 6 */}
                        <Card className="h-full">
                            <CardHeader>
                                <Badge variant="outline" className="w-fit">
                                    A/B Testing
                                </Badge>
                                <CardTitle className="text-xl">
                                    <Link
                                        href="#"
                                        className="hover:text-primary transition-colors"
                                    >
                                        A/B Testing for Shopify: Tools, Tips &
                                        Common Mistakes
                                    </Link>
                                </CardTitle>
                                <CardDescription>
                                    How to run effective A/B tests on Shopify
                                    without breaking the bank or your site.
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="flex items-center justify-between text-sm text-muted-foreground">
                                    <span>9 min read</span>
                                    <span>Coming Soon</span>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            {/* Newsletter CTA */}
            <section className="py-16 md:py-24">
                <div className="container px-4 md:px-6">
                    <div className="max-w-2xl mx-auto text-center space-y-8 bg-primary/5 rounded-2xl p-12">
                        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                            Get CRO Tips in Your Inbox
                        </h2>
                        <p className="text-lg text-muted-foreground">
                            Weekly Shopify conversion optimization tips, case
                            studies, and industry insights.
                        </p>
                        <p className="text-sm text-muted-foreground">
                            📧 Newsletter coming soon! For now, follow us for
                            updates.
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
}
