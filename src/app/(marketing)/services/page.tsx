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
import { CheckCircle, ArrowRight } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "CRO Services - Shopify Conversion Optimization",
    description:
        "Professional Shopify CRO services including audits, A/B testing, and conversion optimization. Increase your conversion rate with data-driven strategies.",
};

export default function ServicesPage() {
    return (
        <div className="flex flex-col">
            {/* Hero Section */}
            <section className="py-16 md:py-24">
                <div className="container px-4 md:px-6">
                    <div className="flex flex-col items-center space-y-8 text-center">
                        <Badge variant="secondary">Services</Badge>
                        <div className="space-y-4 max-w-4xl">
                            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
                                Shopify CRO Services
                            </h1>
                            <p className="mx-auto max-w-2xl text-xl text-muted-foreground">
                                Evidence-based conversion optimization services
                                designed specifically for Shopify stores.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Services Grid */}
            <section className="py-16 md:py-24 bg-muted/50">
                <div className="container px-4 md:px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* CRO Audit */}
                        <Card className="h-full">
                            <CardHeader>
                                <CardTitle className="text-2xl">
                                    Conversion Rate Audit
                                </CardTitle>
                                <CardDescription className="text-lg">
                                    Comprehensive analysis of your Shopify
                                    store&apos;s conversion barriers and
                                    opportunities.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="space-y-4">
                                    <h4 className="font-semibold">
                                        What&apos;s Included:
                                    </h4>
                                    <ul className="space-y-2">
                                        <li className="flex items-start gap-2">
                                            <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                                            <span className="text-sm">
                                                Technical performance analysis
                                                (Core Web Vitals, page speed)
                                            </span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                                            <span className="text-sm">
                                                User experience flow mapping
                                            </span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                                            <span className="text-sm">
                                                Checkout process optimization
                                                review
                                            </span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                                            <span className="text-sm">
                                                Product page conversion analysis
                                            </span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                                            <span className="text-sm">
                                                Mobile responsiveness audit
                                            </span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                                            <span className="text-sm">
                                                Prioritized action plan with ROI
                                                estimates
                                            </span>
                                        </li>
                                    </ul>
                                </div>
                                <div className="space-y-2">
                                    <p className="text-sm text-muted-foreground">
                                        <strong>Timeline:</strong> 3-5 business
                                        days
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                        <strong>Deliverable:</strong> Detailed
                                        report + 30-min strategy call
                                    </p>
                                </div>
                            </CardContent>
                        </Card>

                        {/* A/B Testing */}
                        <Card className="h-full">
                            <CardHeader>
                                <CardTitle className="text-2xl">
                                    A/B Testing & Optimization
                                </CardTitle>
                                <CardDescription className="text-lg">
                                    Data-driven testing to validate changes and
                                    maximize conversion improvements.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="space-y-4">
                                    <h4 className="font-semibold">
                                        What&apos;s Included:
                                    </h4>
                                    <ul className="space-y-2">
                                        <li className="flex items-start gap-2">
                                            <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                                            <span className="text-sm">
                                                Hypothesis development based on
                                                data
                                            </span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                                            <span className="text-sm">
                                                Test design and implementation
                                            </span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                                            <span className="text-sm">
                                                Statistical significance
                                                monitoring
                                            </span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                                            <span className="text-sm">
                                                Results analysis and
                                                recommendations
                                            </span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                                            <span className="text-sm">
                                                Winner implementation
                                            </span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                                            <span className="text-sm">
                                                Knowledge transfer and
                                                documentation
                                            </span>
                                        </li>
                                    </ul>
                                </div>
                                <div className="space-y-2">
                                    <p className="text-sm text-muted-foreground">
                                        <strong>Timeline:</strong> 2-4 weeks per
                                        test
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                        <strong>Minimum:</strong> 1,000
                                        visitors/week for statistical
                                        significance
                                    </p>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Technical Optimization */}
                        <Card className="h-full">
                            <CardHeader>
                                <CardTitle className="text-2xl">
                                    Technical Performance Optimization
                                </CardTitle>
                                <CardDescription className="text-lg">
                                    Speed optimization and technical
                                    improvements to reduce bounce rates.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="space-y-4">
                                    <h4 className="font-semibold">
                                        What&apos;s Included:
                                    </h4>
                                    <ul className="space-y-2">
                                        <li className="flex items-start gap-2">
                                            <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                                            <span className="text-sm">
                                                Page speed optimization (target:
                                                &lt;3s load time)
                                            </span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                                            <span className="text-sm">
                                                Core Web Vitals improvement
                                            </span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                                            <span className="text-sm">
                                                Image optimization and
                                                compression
                                            </span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                                            <span className="text-sm">
                                                Code minification and cleanup
                                            </span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                                            <span className="text-sm">
                                                Third-party app audit and
                                                optimization
                                            </span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                                            <span className="text-sm">
                                                Mobile performance enhancement
                                            </span>
                                        </li>
                                    </ul>
                                </div>
                                <div className="space-y-2">
                                    <p className="text-sm text-muted-foreground">
                                        <strong>Timeline:</strong> 1-2 weeks
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                        <strong>Guarantee:</strong> Minimum 20%
                                        improvement in page speed
                                    </p>
                                </div>
                            </CardContent>
                        </Card>

                        {/* UX Optimization */}
                        <Card className="h-full">
                            <CardHeader>
                                <CardTitle className="text-2xl">
                                    User Experience Optimization
                                </CardTitle>
                                <CardDescription className="text-lg">
                                    Design and flow improvements to reduce
                                    friction and increase conversions.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="space-y-4">
                                    <h4 className="font-semibold">
                                        What&apos;s Included:
                                    </h4>
                                    <ul className="space-y-2">
                                        <li className="flex items-start gap-2">
                                            <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                                            <span className="text-sm">
                                                Navigation and menu optimization
                                            </span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                                            <span className="text-sm">
                                                Product page layout improvements
                                            </span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                                            <span className="text-sm">
                                                Checkout flow streamlining
                                            </span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                                            <span className="text-sm">
                                                Trust signal placement and
                                                optimization
                                            </span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                                            <span className="text-sm">
                                                Call-to-action button
                                                optimization
                                            </span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                                            <span className="text-sm">
                                                Mobile user experience
                                                enhancement
                                            </span>
                                        </li>
                                    </ul>
                                </div>
                                <div className="space-y-2">
                                    <p className="text-sm text-muted-foreground">
                                        <strong>Timeline:</strong> 2-3 weeks
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                        <strong>Includes:</strong> Wireframes,
                                        mockups, and implementation
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            {/* Process Section */}
            <section className="py-16 md:py-24">
                <div className="container px-4 md:px-6">
                    <div className="flex flex-col items-center space-y-12">
                        <div className="text-center space-y-4">
                            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                                Our CRO Process
                            </h2>
                            <p className="max-w-2xl text-lg text-muted-foreground">
                                A systematic approach to conversion optimization
                                that delivers measurable results.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 w-full">
                            <div className="text-center space-y-4">
                                <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto text-xl font-bold">
                                    1
                                </div>
                                <h3 className="text-lg font-semibold">
                                    Audit & Analysis
                                </h3>
                                <p className="text-sm text-muted-foreground">
                                    Comprehensive review of your current setup,
                                    identifying conversion barriers and
                                    opportunities.
                                </p>
                            </div>

                            <div className="text-center space-y-4">
                                <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto text-xl font-bold">
                                    2
                                </div>
                                <h3 className="text-lg font-semibold">
                                    Strategy Development
                                </h3>
                                <p className="text-sm text-muted-foreground">
                                    Create a prioritized roadmap based on impact
                                    potential and implementation complexity.
                                </p>
                            </div>

                            <div className="text-center space-y-4">
                                <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto text-xl font-bold">
                                    3
                                </div>
                                <h3 className="text-lg font-semibold">
                                    Implementation & Testing
                                </h3>
                                <p className="text-sm text-muted-foreground">
                                    Execute optimizations with proper A/B
                                    testing to validate each change before full
                                    rollout.
                                </p>
                            </div>

                            <div className="text-center space-y-4">
                                <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto text-xl font-bold">
                                    4
                                </div>
                                <h3 className="text-lg font-semibold">
                                    Monitor & Iterate
                                </h3>
                                <p className="text-sm text-muted-foreground">
                                    Continuous monitoring and refinement to
                                    ensure sustained improvement and growth.
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
                                Ready to start optimizing?
                            </h2>
                            <p className="max-w-2xl text-lg text-muted-foreground">
                                Get started with our free Sniff Check to
                                identify your biggest conversion opportunities.
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
