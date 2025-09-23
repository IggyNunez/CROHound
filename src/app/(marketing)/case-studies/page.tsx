import { Badge } from "@/components/ui/badge";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { TrendingUp, Clock, DollarSign } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Shopify CRO Case Studies - Real Conversion Optimization Results",
    description:
        "See real Shopify conversion optimization results from CROHound. Learn how we help stores increase their conversion rates and revenue.",
};

export default function CaseStudiesPage() {
    return (
        <div className="flex flex-col">
            {/* Hero Section */}
            <section className="py-16 md:py-24">
                <div className="container px-4 md:px-6">
                    <div className="flex flex-col items-center space-y-8 text-center">
                        <Badge variant="secondary">Case Studies</Badge>
                        <div className="space-y-4 max-w-4xl">
                            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
                                Real Results for Real Stores
                            </h1>
                            <p className="mx-auto max-w-2xl text-xl text-muted-foreground">
                                See how we&apos;ve helped Shopify merchants
                                increase their conversion rates and revenue
                                through data-driven optimization.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Case Studies Grid */}
            <section className="py-16 md:py-24 bg-muted/50">
                <div className="container px-4 md:px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Case Study 1 */}
                        <Card className="h-full">
                            <CardHeader>
                                <div className="flex items-center gap-2 mb-2">
                                    <Badge variant="outline">Fashion</Badge>
                                    <Badge variant="outline">$25k/mo</Badge>
                                </div>
                                <CardTitle className="text-2xl">
                                    23% Conversion Rate Increase in 30 Days
                                </CardTitle>
                                <CardDescription className="text-lg">
                                    How we optimized a fashion retailer&apos;s
                                    product pages and checkout flow to
                                    dramatically improve conversions.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="grid grid-cols-3 gap-4 text-center">
                                    <div className="space-y-2">
                                        <TrendingUp className="h-8 w-8 mx-auto text-green-500" />
                                        <div className="text-2xl font-bold text-green-500">
                                            +23%
                                        </div>
                                        <div className="text-sm text-muted-foreground">
                                            Conversion Rate
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <DollarSign className="h-8 w-8 mx-auto text-blue-500" />
                                        <div className="text-2xl font-bold text-blue-500">
                                            +$8.2k
                                        </div>
                                        <div className="text-sm text-muted-foreground">
                                            Monthly Revenue
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Clock className="h-8 w-8 mx-auto text-purple-500" />
                                        <div className="text-2xl font-bold text-purple-500">
                                            30
                                        </div>
                                        <div className="text-sm text-muted-foreground">
                                            Days to Results
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <h4 className="font-semibold">
                                        Key Changes:
                                    </h4>
                                    <ul className="text-sm space-y-1 text-muted-foreground">
                                        <li>
                                            • Simplified product page layout
                                            with better imagery
                                        </li>
                                        <li>
                                            • Added urgency indicators and
                                            social proof
                                        </li>
                                        <li>
                                            • Streamlined checkout with express
                                            payment options
                                        </li>
                                        <li>
                                            • Optimized mobile experience for
                                            better usability
                                        </li>
                                    </ul>
                                </div>

                                <Button asChild className="w-full">
                                    <Link href="/contact">
                                        Get Similar Results
                                    </Link>
                                </Button>
                            </CardContent>
                        </Card>

                        {/* Case Study 2 */}
                        <Card className="h-full">
                            <CardHeader>
                                <div className="flex items-center gap-2 mb-2">
                                    <Badge variant="outline">Electronics</Badge>
                                    <Badge variant="outline">$15k/mo</Badge>
                                </div>
                                <CardTitle className="text-2xl">
                                    40% Reduction in Cart Abandonment
                                </CardTitle>
                                <CardDescription className="text-lg">
                                    A complete checkout optimization that turned
                                    abandoned carts into completed purchases for
                                    a tech accessories store.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="grid grid-cols-3 gap-4 text-center">
                                    <div className="space-y-2">
                                        <TrendingUp className="h-8 w-8 mx-auto text-green-500" />
                                        <div className="text-2xl font-bold text-green-500">
                                            -40%
                                        </div>
                                        <div className="text-sm text-muted-foreground">
                                            Cart Abandonment
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <DollarSign className="h-8 w-8 mx-auto text-blue-500" />
                                        <div className="text-2xl font-bold text-blue-500">
                                            +$4.8k
                                        </div>
                                        <div className="text-sm text-muted-foreground">
                                            Monthly Revenue
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Clock className="h-8 w-8 mx-auto text-purple-500" />
                                        <div className="text-2xl font-bold text-purple-500">
                                            21
                                        </div>
                                        <div className="text-sm text-muted-foreground">
                                            Days to Results
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <h4 className="font-semibold">
                                        Key Changes:
                                    </h4>
                                    <ul className="text-sm space-y-1 text-muted-foreground">
                                        <li>
                                            • Added progress indicators in
                                            checkout
                                        </li>
                                        <li>
                                            • Implemented guest checkout option
                                        </li>
                                        <li>
                                            • Optimized shipping calculator and
                                            options
                                        </li>
                                        <li>
                                            • Added security badges and
                                            guarantees
                                        </li>
                                    </ul>
                                </div>

                                <Button asChild className="w-full">
                                    <Link href="/contact">
                                        Reduce Your Abandonment
                                    </Link>
                                </Button>
                            </CardContent>
                        </Card>

                        {/* Case Study 3 */}
                        <Card className="h-full">
                            <CardHeader>
                                <div className="flex items-center gap-2 mb-2">
                                    <Badge variant="outline">
                                        Home & Garden
                                    </Badge>
                                    <Badge variant="outline">$8k/mo</Badge>
                                </div>
                                <CardTitle className="text-2xl">
                                    2.3x Increase in Average Order Value
                                </CardTitle>
                                <CardDescription className="text-lg">
                                    Strategic upselling and cross-selling
                                    optimization that more than doubled the
                                    average order value.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="grid grid-cols-3 gap-4 text-center">
                                    <div className="space-y-2">
                                        <TrendingUp className="h-8 w-8 mx-auto text-green-500" />
                                        <div className="text-2xl font-bold text-green-500">
                                            +130%
                                        </div>
                                        <div className="text-sm text-muted-foreground">
                                            Average Order Value
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <DollarSign className="h-8 w-8 mx-auto text-blue-500" />
                                        <div className="text-2xl font-bold text-blue-500">
                                            +$7.1k
                                        </div>
                                        <div className="text-sm text-muted-foreground">
                                            Monthly Revenue
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Clock className="h-8 w-8 mx-auto text-purple-500" />
                                        <div className="text-2xl font-bold text-purple-500">
                                            45
                                        </div>
                                        <div className="text-sm text-muted-foreground">
                                            Days to Results
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <h4 className="font-semibold">
                                        Key Changes:
                                    </h4>
                                    <ul className="text-sm space-y-1 text-muted-foreground">
                                        <li>
                                            • Strategic product bundling and
                                            recommendations
                                        </li>
                                        <li>
                                            • Optimized cart page with related
                                            products
                                        </li>
                                        <li>
                                            • Implemented volume discounts and
                                            thresholds
                                        </li>
                                        <li>
                                            • Enhanced product descriptions and
                                            benefits
                                        </li>
                                    </ul>
                                </div>

                                <Button asChild className="w-full">
                                    <Link href="/contact">
                                        Increase Your AOV
                                    </Link>
                                </Button>
                            </CardContent>
                        </Card>

                        {/* Case Study 4 */}
                        <Card className="h-full">
                            <CardHeader>
                                <div className="flex items-center gap-2 mb-2">
                                    <Badge variant="outline">
                                        Health & Beauty
                                    </Badge>
                                    <Badge variant="outline">$35k/mo</Badge>
                                </div>
                                <CardTitle className="text-2xl">
                                    50% Faster Page Load Times
                                </CardTitle>
                                <CardDescription className="text-lg">
                                    Technical optimization that dramatically
                                    improved site speed and reduced bounce rates
                                    for a beauty brand.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="grid grid-cols-3 gap-4 text-center">
                                    <div className="space-y-2">
                                        <TrendingUp className="h-8 w-8 mx-auto text-green-500" />
                                        <div className="text-2xl font-bold text-green-500">
                                            -50%
                                        </div>
                                        <div className="text-sm text-muted-foreground">
                                            Load Time
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <DollarSign className="h-8 w-8 mx-auto text-blue-500" />
                                        <div className="text-2xl font-bold text-blue-500">
                                            +15%
                                        </div>
                                        <div className="text-sm text-muted-foreground">
                                            Conversion Rate
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Clock className="h-8 w-8 mx-auto text-purple-500" />
                                        <div className="text-2xl font-bold text-purple-500">
                                            14
                                        </div>
                                        <div className="text-sm text-muted-foreground">
                                            Days to Results
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <h4 className="font-semibold">
                                        Key Changes:
                                    </h4>
                                    <ul className="text-sm space-y-1 text-muted-foreground">
                                        <li>
                                            • Optimized images and implemented
                                            lazy loading
                                        </li>
                                        <li>
                                            • Cleaned up third-party scripts and
                                            apps
                                        </li>
                                        <li>
                                            • Improved Core Web Vitals scores
                                        </li>
                                        <li>• Enhanced mobile performance</li>
                                    </ul>
                                </div>

                                <Button asChild className="w-full">
                                    <Link href="/contact">
                                        Speed Up Your Site
                                    </Link>
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            {/* Process Preview */}
            <section className="py-16 md:py-24">
                <div className="container px-4 md:px-6">
                    <div className="max-w-4xl mx-auto text-center space-y-12">
                        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                            How We Achieve These Results
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                            <div className="space-y-4">
                                <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto text-xl font-bold">
                                    1
                                </div>
                                <h3 className="font-semibold">Deep Audit</h3>
                                <p className="text-sm text-muted-foreground">
                                    Comprehensive analysis of conversion
                                    barriers and opportunities
                                </p>
                            </div>

                            <div className="space-y-4">
                                <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto text-xl font-bold">
                                    2
                                </div>
                                <h3 className="font-semibold">
                                    Strategic Plan
                                </h3>
                                <p className="text-sm text-muted-foreground">
                                    Prioritized roadmap based on impact and
                                    effort
                                </p>
                            </div>

                            <div className="space-y-4">
                                <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto text-xl font-bold">
                                    3
                                </div>
                                <h3 className="font-semibold">
                                    Test & Implement
                                </h3>
                                <p className="text-sm text-muted-foreground">
                                    A/B test changes before full implementation
                                </p>
                            </div>

                            <div className="space-y-4">
                                <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto text-xl font-bold">
                                    4
                                </div>
                                <h3 className="font-semibold">
                                    Monitor & Scale
                                </h3>
                                <p className="text-sm text-muted-foreground">
                                    Continuous optimization and improvement
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 md:py-24 bg-muted/50">
                <div className="container px-4 md:px-6">
                    <div className="flex flex-col items-center space-y-8 text-center">
                        <div className="space-y-4">
                            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                                Ready for Similar Results?
                            </h2>
                            <p className="max-w-2xl text-lg text-muted-foreground">
                                Every successful optimization starts with
                                understanding your current situation. Get your
                                free Sniff Check to see what&apos;s possible for
                                your store.
                            </p>
                        </div>
                        <Button asChild size="lg" className="text-lg px-8 py-6">
                            <Link href="/contact">
                                Get Your Free Sniff Check
                            </Link>
                        </Button>
                    </div>
                </div>
            </section>
        </div>
    );
}
