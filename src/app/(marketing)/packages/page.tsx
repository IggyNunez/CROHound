import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { CheckCircle, X, ArrowRight } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "CRO Packages - Monthly Shopify Optimization Plans",
    description:
        "Choose the right CRO package for your Shopify store. From free audits to comprehensive monthly optimization programs.",
};

export default function PackagesPage() {
    return (
        <div className="flex flex-col">
            {/* Hero Section */}
            <section className="py-16 md:py-24">
                <div className="container px-4 md:px-6">
                    <div className="flex flex-col items-center space-y-8 text-center">
                        <Badge variant="secondary">Packages</Badge>
                        <div className="space-y-4 max-w-4xl">
                            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
                                CRO Packages That Scale With You
                            </h1>
                            <p className="mx-auto max-w-2xl text-xl text-muted-foreground">
                                Choose the right level of support for your
                                store. All packages include our signature audit
                                process.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Packages Grid */}
            <section className="py-16 md:py-24 bg-muted/50">
                <div className="container px-4 md:px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        {/* Free Sniff Check */}
                        <Card className="relative h-full">
                            <CardHeader className="text-center">
                                <CardTitle className="text-2xl">
                                    Free Sniff Check
                                </CardTitle>
                                <CardDescription className="text-4xl font-bold text-primary mt-4">
                                    $0
                                </CardDescription>
                                <p className="text-sm text-muted-foreground">
                                    Perfect for getting started
                                </p>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <ul className="space-y-3">
                                    <li className="flex items-center gap-3">
                                        <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                                        <span className="text-sm">
                                            12-point conversion audit
                                        </span>
                                    </li>
                                    <li className="flex items-center gap-3">
                                        <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                                        <span className="text-sm">
                                            5-minute Loom walkthrough
                                        </span>
                                    </li>
                                    <li className="flex items-center gap-3">
                                        <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                                        <span className="text-sm">
                                            Quick wins checklist
                                        </span>
                                    </li>
                                    <li className="flex items-center gap-3">
                                        <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                                        <span className="text-sm">
                                            Prioritized recommendations
                                        </span>
                                    </li>
                                    <li className="flex items-center gap-3">
                                        <X className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                                        <span className="text-sm text-muted-foreground">
                                            Implementation support
                                        </span>
                                    </li>
                                    <li className="flex items-center gap-3">
                                        <X className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                                        <span className="text-sm text-muted-foreground">
                                            Monthly monitoring
                                        </span>
                                    </li>
                                </ul>

                                <div className="space-y-4 pt-4">
                                    <Button asChild className="w-full">
                                        <Link href="/contact">
                                            Get Your Free Audit
                                        </Link>
                                    </Button>
                                    <p className="text-xs text-center text-muted-foreground">
                                        No credit card required • 48-hour
                                        delivery
                                    </p>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Monthly CRO */}
                        <Card className="relative h-full border-primary shadow-lg">
                            <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground">
                                Most Popular
                            </Badge>
                            <CardHeader className="text-center pt-8">
                                <CardTitle className="text-2xl">
                                    Monthly CRO
                                </CardTitle>
                                <CardDescription className="text-4xl font-bold text-primary mt-4">
                                    $2.5k-$5k
                                </CardDescription>
                                <p className="text-sm text-muted-foreground">
                                    /month • 3-month minimum
                                </p>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <ul className="space-y-3">
                                    <li className="flex items-center gap-3">
                                        <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                                        <span className="text-sm">
                                            Everything in Free Sniff Check
                                        </span>
                                    </li>
                                    <li className="flex items-center gap-3">
                                        <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                                        <span className="text-sm">
                                            Up to 10 dev hours/month
                                        </span>
                                    </li>
                                    <li className="flex items-center gap-3">
                                        <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                                        <span className="text-sm">
                                            A/B testing & analysis
                                        </span>
                                    </li>
                                    <li className="flex items-center gap-3">
                                        <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                                        <span className="text-sm">
                                            Monthly performance reports
                                        </span>
                                    </li>
                                    <li className="flex items-center gap-3">
                                        <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                                        <span className="text-sm">
                                            Slack/email support
                                        </span>
                                    </li>
                                    <li className="flex items-center gap-3">
                                        <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                                        <span className="text-sm">
                                            Quarterly strategy reviews
                                        </span>
                                    </li>
                                </ul>

                                <div className="space-y-4 pt-4">
                                    <Button asChild className="w-full">
                                        <Link href="/contact">
                                            Start Monthly Program
                                        </Link>
                                    </Button>
                                    <p className="text-xs text-center text-muted-foreground">
                                        Best for stores with $5k-$50k monthly
                                        revenue
                                    </p>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Project-Based */}
                        <Card className="relative h-full">
                            <CardHeader className="text-center">
                                <CardTitle className="text-2xl">
                                    Project-Based
                                </CardTitle>
                                <CardDescription className="text-4xl font-bold text-primary mt-4">
                                    $5k-$15k
                                </CardDescription>
                                <p className="text-sm text-muted-foreground">
                                    One-time engagement
                                </p>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <ul className="space-y-3">
                                    <li className="flex items-center gap-3">
                                        <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                                        <span className="text-sm">
                                            Complete site overhaul
                                        </span>
                                    </li>
                                    <li className="flex items-center gap-3">
                                        <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                                        <span className="text-sm">
                                            Custom optimization strategy
                                        </span>
                                    </li>
                                    <li className="flex items-center gap-3">
                                        <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                                        <span className="text-sm">
                                            Full implementation
                                        </span>
                                    </li>
                                    <li className="flex items-center gap-3">
                                        <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                                        <span className="text-sm">
                                            3-month follow-up support
                                        </span>
                                    </li>
                                    <li className="flex items-center gap-3">
                                        <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                                        <span className="text-sm">
                                            Knowledge transfer sessions
                                        </span>
                                    </li>
                                    <li className="flex items-center gap-3">
                                        <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                                        <span className="text-sm">
                                            Performance guarantees
                                        </span>
                                    </li>
                                </ul>

                                <div className="space-y-4 pt-4">
                                    <Button
                                        asChild
                                        className="w-full"
                                        variant="outline"
                                    >
                                        <Link href="/contact">
                                            Discuss Project
                                        </Link>
                                    </Button>
                                    <p className="text-xs text-center text-muted-foreground">
                                        Best for major site redesigns or
                                        migrations
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            {/* What's Not Included */}
            <section className="py-16 md:py-24">
                <div className="container px-4 md:px-6">
                    <div className="max-w-4xl mx-auto">
                        <div className="text-center space-y-8">
                            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                                What&apos;s Not Included
                            </h2>
                            <p className="text-lg text-muted-foreground">
                                We focus on conversion optimization, not these
                                services:
                            </p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                                <Card className="bg-muted/50">
                                    <CardContent className="pt-6">
                                        <ul className="space-y-2">
                                            <li className="flex items-center gap-2">
                                                <X className="h-4 w-4 text-red-500" />
                                                <span className="text-sm">
                                                    Paid advertising management
                                                </span>
                                            </li>
                                            <li className="flex items-center gap-2">
                                                <X className="h-4 w-4 text-red-500" />
                                                <span className="text-sm">
                                                    SEO content creation
                                                </span>
                                            </li>
                                            <li className="flex items-center gap-2">
                                                <X className="h-4 w-4 text-red-500" />
                                                <span className="text-sm">
                                                    Social media management
                                                </span>
                                            </li>
                                        </ul>
                                    </CardContent>
                                </Card>

                                <Card className="bg-muted/50">
                                    <CardContent className="pt-6">
                                        <ul className="space-y-2">
                                            <li className="flex items-center gap-2">
                                                <X className="h-4 w-4 text-red-500" />
                                                <span className="text-sm">
                                                    Email marketing campaigns
                                                </span>
                                            </li>
                                            <li className="flex items-center gap-2">
                                                <X className="h-4 w-4 text-red-500" />
                                                <span className="text-sm">
                                                    App development
                                                </span>
                                            </li>
                                            <li className="flex items-center gap-2">
                                                <X className="h-4 w-4 text-red-500" />
                                                <span className="text-sm">
                                                    Product photography
                                                </span>
                                            </li>
                                        </ul>
                                    </CardContent>
                                </Card>
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
                                Ready to choose your package?
                            </h2>
                            <p className="max-w-2xl text-lg text-muted-foreground">
                                Start with our free Sniff Check to see
                                what&apos;s possible, then choose the package
                                that fits your goals.
                            </p>
                        </div>
                        <Button asChild size="lg" className="text-lg px-8 py-6">
                            <Link href="/contact">
                                Get Your Free Sniff Check
                                <ArrowRight className="ml-2 h-5 w-5" />
                            </Link>
                        </Button>
                    </div>
                </div>
            </section>
        </div>
    );
}
