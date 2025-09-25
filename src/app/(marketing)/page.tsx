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
import { ArrowRight, CheckCircle, TrendingUp, Users, Zap } from "lucide-react";
import { Hero, HeroVariants } from "@/components/sections/Hero";
import { OrganizationSchema, WebsiteSchema } from "@/components/StructuredData";

export default function HomePage() {
    return (
        <>
            {/* Structured Data */}
            <OrganizationSchema />
            <WebsiteSchema />

            <div className="flex flex-col">
                {/* Hero Section - Using Reusable Component */}
                <Hero {...HeroVariants.homepage} />

                {/* Value Pillars */}
                <section className="py-16 md:py-24">
                    <div className="container px-4 md:px-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <Card className="text-center">
                                <CardHeader>
                                    <Zap className="h-12 w-12 mx-auto text-primary mb-4" />
                                    <CardTitle>Faster Pages</CardTitle>
                                    <CardDescription>
                                        Optimize site speed and Core Web Vitals
                                        to reduce bounce rates and improve user
                                        experience.
                                    </CardDescription>
                                </CardHeader>
                            </Card>

                            <Card className="text-center">
                                <CardHeader>
                                    <Users className="h-12 w-12 mx-auto text-primary mb-4" />
                                    <CardTitle>Cleaner UX</CardTitle>
                                    <CardDescription>
                                        Streamline navigation, checkout flow,
                                        and product pages to remove friction and
                                        boost conversions.
                                    </CardDescription>
                                </CardHeader>
                            </Card>

                            <Card className="text-center">
                                <CardHeader>
                                    <TrendingUp className="h-12 w-12 mx-auto text-primary mb-4" />
                                    <CardTitle>Evidence-Based Tests</CardTitle>
                                    <CardDescription>
                                        Run data-driven A/B tests to validate
                                        changes and ensure every optimization
                                        drives real results.
                                    </CardDescription>
                                </CardHeader>
                            </Card>
                        </div>
                    </div>
                </section>

                {/* Packages Preview */}
                <section className="py-16 md:py-24 bg-muted/50">
                    <div className="container px-4 md:px-6">
                        <div className="flex flex-col items-center space-y-12">
                            <div className="text-center space-y-4">
                                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                                    CRO Packages That Scale With You
                                </h2>
                                <p className="max-w-2xl text-lg text-muted-foreground">
                                    Choose the right level of support for your
                                    store. All packages include our signature
                                    audit process.
                                </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl">
                                {/* Sniff Check */}
                                <Card className="relative">
                                    <CardHeader>
                                        <CardTitle className="text-xl">
                                            Free Sniff Check
                                        </CardTitle>
                                        <CardDescription className="text-3xl font-bold text-primary">
                                            $0
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <ul className="space-y-2">
                                            <li className="flex items-center gap-2">
                                                <CheckCircle className="h-4 w-4 text-green-500" />
                                                <span className="text-sm">
                                                    12-point conversion audit
                                                </span>
                                            </li>
                                            <li className="flex items-center gap-2">
                                                <CheckCircle className="h-4 w-4 text-green-500" />
                                                <span className="text-sm">
                                                    5-minute Loom walkthrough
                                                </span>
                                            </li>
                                            <li className="flex items-center gap-2">
                                                <CheckCircle className="h-4 w-4 text-green-500" />
                                                <span className="text-sm">
                                                    Quick wins checklist
                                                </span>
                                            </li>
                                        </ul>
                                        <Button asChild className="w-full">
                                            <Link href="/contact">
                                                Get Started
                                            </Link>
                                        </Button>
                                    </CardContent>
                                </Card>

                                {/* Monthly Retainer */}
                                <Card className="relative border-primary">
                                    <Badge className="absolute -top-2 left-1/2 transform -translate-x-1/2">
                                        Most Popular
                                    </Badge>
                                    <CardHeader>
                                        <CardTitle className="text-xl">
                                            Monthly CRO
                                        </CardTitle>
                                        <CardDescription className="text-3xl font-bold text-primary">
                                            $2.5k-$5k/mo
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <ul className="space-y-2">
                                            <li className="flex items-center gap-2">
                                                <CheckCircle className="h-4 w-4 text-green-500" />
                                                <span className="text-sm">
                                                    Up to 10 dev hours/month
                                                </span>
                                            </li>
                                            <li className="flex items-center gap-2">
                                                <CheckCircle className="h-4 w-4 text-green-500" />
                                                <span className="text-sm">
                                                    A/B testing & analysis
                                                </span>
                                            </li>
                                            <li className="flex items-center gap-2">
                                                <CheckCircle className="h-4 w-4 text-green-500" />
                                                <span className="text-sm">
                                                    Monthly reporting
                                                </span>
                                            </li>
                                        </ul>
                                        <Button asChild className="w-full">
                                            <Link href="/packages">
                                                Learn More
                                            </Link>
                                        </Button>
                                    </CardContent>
                                </Card>

                                {/* Project-Based */}
                                <Card className="relative">
                                    <CardHeader>
                                        <CardTitle className="text-xl">
                                            Project-Based
                                        </CardTitle>
                                        <CardDescription className="text-3xl font-bold text-primary">
                                            $5k-$15k
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <ul className="space-y-2">
                                            <li className="flex items-center gap-2">
                                                <CheckCircle className="h-4 w-4 text-green-500" />
                                                <span className="text-sm">
                                                    Complete site overhaul
                                                </span>
                                            </li>
                                            <li className="flex items-center gap-2">
                                                <CheckCircle className="h-4 w-4 text-green-500" />
                                                <span className="text-sm">
                                                    Custom optimization strategy
                                                </span>
                                            </li>
                                            <li className="flex items-center gap-2">
                                                <CheckCircle className="h-4 w-4 text-green-500" />
                                                <span className="text-sm">
                                                    3-month follow-up
                                                </span>
                                            </li>
                                        </ul>
                                        <Button asChild className="w-full">
                                            <Link href="/services">
                                                Learn More
                                            </Link>
                                        </Button>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="py-16 md:py-24">
                    <div className="container px-4 md:px-6">
                        <div className="flex flex-col items-center space-y-8 text-center bg-primary/5 rounded-2xl p-12">
                            <div className="space-y-4">
                                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                                    Ready to boost your conversion rate?
                                </h2>
                                <p className="max-w-2xl text-lg text-muted-foreground">
                                    Start with our free Sniff Check. Get
                                    actionable insights in 48 hours, no strings
                                    attached.
                                </p>
                            </div>
                            <Button
                                asChild
                                size="lg"
                                className="text-lg px-8 py-6"
                            >
                                <Link href="/contact">
                                    Get Your Free Sniff Check
                                    <ArrowRight className="ml-2 h-5 w-5" />
                                </Link>
                            </Button>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
}
