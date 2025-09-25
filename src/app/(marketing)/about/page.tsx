import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Hero } from "@/components/sections/Hero";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "About CROHound - Shopify Conversion Optimization Experts",
    description:
        "Learn about CROHound's approach to Shopify conversion optimization and our mission to help ecommerce stores maximize their revenue.",
};

export default function AboutPage() {
    return (
        <div className="flex flex-col">
            {/* Hero Section - Using Reusable Component */}
            <Hero
                badge="About"
                title="About CROHound"
                description="We help Shopify merchants turn more visitors into buyers through data-driven conversion optimization."
                backgroundVariant="default"
            />

            {/* Mission Section */}
            <section className="py-16 md:py-24 bg-muted/50">
                <div className="container px-4 md:px-6">
                    <div className="max-w-4xl mx-auto text-center space-y-8">
                        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                            Our Mission
                        </h2>
                        <p className="text-lg text-muted-foreground">
                            Most Shopify stores are leaving money on the table.
                            We believe every ecommerce business deserves to
                            maximize their conversion potential without breaking
                            the bank on ads or complex tools.
                        </p>
                    </div>
                </div>
            </section>

            {/* Approach Section */}
            <section className="py-16 md:py-24">
                <div className="container px-4 md:px-6">
                    <div className="max-w-4xl mx-auto">
                        <div className="text-center space-y-12">
                            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                                Our Approach
                            </h2>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                <Card className="text-center">
                                    <CardHeader>
                                        <CardTitle>Data-Driven</CardTitle>
                                        <CardDescription>
                                            Every recommendation is backed by
                                            real user data and proven conversion
                                            principles.
                                        </CardDescription>
                                    </CardHeader>
                                </Card>

                                <Card className="text-center">
                                    <CardHeader>
                                        <CardTitle>Shopify-Focused</CardTitle>
                                        <CardDescription>
                                            We specialize exclusively in
                                            Shopify, understanding its unique
                                            constraints and opportunities.
                                        </CardDescription>
                                    </CardHeader>
                                </Card>

                                <Card className="text-center">
                                    <CardHeader>
                                        <CardTitle>Results-Oriented</CardTitle>
                                        <CardDescription>
                                            We measure success by your bottom
                                            line, not vanity metrics or complex
                                            reports.
                                        </CardDescription>
                                    </CardHeader>
                                </Card>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Team Section */}
            <section className="py-16 md:py-24 bg-muted/50">
                <div className="container px-4 md:px-6">
                    <div className="max-w-4xl mx-auto text-center space-y-12">
                        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                            The Team
                        </h2>

                        <div className="space-y-8">
                            <Card className="text-left max-w-2xl mx-auto">
                                <CardContent className="pt-6">
                                    <div className="space-y-4">
                                        <h3 className="text-xl font-semibold">
                                            Anthony & Bechara
                                        </h3>
                                        <p className="text-muted-foreground">
                                            CROHound was founded by two
                                            conversion optimization specialists
                                            who were frustrated by the
                                            complexity and cost of traditional
                                            CRO agencies. We believe in lean,
                                            effective optimization that delivers
                                            real results without the overhead.
                                        </p>
                                        <p className="text-muted-foreground">
                                            With combined experience optimizing
                                            hundreds of Shopify stores,
                                            we&apos;ve developed a streamlined
                                            process that focuses on the changes
                                            that matter most for your bottom
                                            line.
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section className="py-16 md:py-24">
                <div className="container px-4 md:px-6">
                    <div className="max-w-4xl mx-auto">
                        <div className="text-center space-y-12">
                            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                                Our Values
                            </h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
                                <div className="space-y-4">
                                    <h3 className="text-xl font-semibold">
                                        Transparency
                                    </h3>
                                    <p className="text-muted-foreground">
                                        No black box reporting or vague
                                        promises. You&apos;ll always know
                                        exactly what we&apos;re doing and why.
                                    </p>
                                </div>

                                <div className="space-y-4">
                                    <h3 className="text-xl font-semibold">
                                        Efficiency
                                    </h3>
                                    <p className="text-muted-foreground">
                                        We focus on the 20% of changes that
                                        deliver 80% of the results. No busywork
                                        or unnecessary complexity.
                                    </p>
                                </div>

                                <div className="space-y-4">
                                    <h3 className="text-xl font-semibold">
                                        Partnership
                                    </h3>
                                    <p className="text-muted-foreground">
                                        We work with you, not for you. Your
                                        success is our success, and we&apos;re
                                        invested in your long-term growth.
                                    </p>
                                </div>

                                <div className="space-y-4">
                                    <h3 className="text-xl font-semibold">
                                        Accessibility
                                    </h3>
                                    <p className="text-muted-foreground">
                                        Professional CRO shouldn&apos;t be just
                                        for enterprise brands. We make
                                        optimization accessible to growing
                                        stores.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
