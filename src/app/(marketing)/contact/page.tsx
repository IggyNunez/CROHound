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
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Contact - Get Your Free Shopify CRO Sniff Check",
    description:
        "Start with our free 12-point Shopify conversion audit. Get actionable insights in 48 hours, no strings attached.",
};

export default function ContactPage() {
    return (
        <div className="flex flex-col">
            {/* Hero Section */}
            <section className="py-16 md:py-24">
                <div className="container px-4 md:px-6">
                    <div className="flex flex-col items-center space-y-8 text-center">
                        <Badge variant="secondary">Free Audit</Badge>
                        <div className="space-y-4 max-w-4xl">
                            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
                                Get Your Free Sniff Check
                            </h1>
                            <p className="mx-auto max-w-2xl text-xl text-muted-foreground">
                                12-point conversion audit delivered in 48 hours.
                                Zero commitment, maximum value.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Contact Form Section */}
            <section className="py-16 md:py-24 bg-muted/50">
                <div className="container px-4 md:px-6">
                    <div className="max-w-2xl mx-auto">
                        <Card>
                            <CardHeader className="text-center">
                                <CardTitle className="text-2xl">
                                    Start Your Free Audit
                                </CardTitle>
                                <CardDescription>
                                    Tell us about your store and we&apos;ll get
                                    started on your Sniff Check immediately.
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-6">
                                    <p className="text-center text-muted-foreground">
                                        📧 <strong>Email us directly:</strong>{" "}
                                        <a
                                            href="mailto:hello@crohound.com"
                                            className="text-primary hover:underline"
                                        >
                                            hello@crohound.com
                                        </a>
                                    </p>

                                    <div className="text-center">
                                        <p className="text-sm text-muted-foreground mb-4">
                                            Or book a 15-minute intro call:
                                        </p>
                                        <Button asChild size="lg">
                                            <Link
                                                href="#"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                Schedule a Call
                                            </Link>
                                        </Button>
                                    </div>

                                    <div className="bg-muted p-4 rounded-lg">
                                        <h4 className="font-semibold mb-2">
                                            What to include in your email:
                                        </h4>
                                        <ul className="text-sm space-y-1 text-muted-foreground">
                                            <li>• Your Shopify store URL</li>
                                            <li>
                                                • Monthly traffic volume (if
                                                known)
                                            </li>
                                            <li>
                                                • Current conversion rate (if
                                                known)
                                            </li>
                                            <li>
                                                • Main conversion goals (sales,
                                                signups, etc.)
                                            </li>
                                            <li>
                                                • Any specific concerns or
                                                bottlenecks
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            {/* What You Get Section */}
            <section className="py-16 md:py-24">
                <div className="container px-4 md:px-6">
                    <div className="max-w-4xl mx-auto">
                        <div className="text-center space-y-8">
                            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                                What You&apos;ll Get
                            </h2>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <Card className="text-center">
                                    <CardContent className="pt-6">
                                        <div className="text-4xl mb-4">📊</div>
                                        <h3 className="font-semibold mb-2">
                                            12-Point Audit
                                        </h3>
                                        <p className="text-sm text-muted-foreground">
                                            Comprehensive review of your
                                            site&apos;s conversion elements
                                        </p>
                                    </CardContent>
                                </Card>

                                <Card className="text-center">
                                    <CardContent className="pt-6">
                                        <div className="text-4xl mb-4">🎥</div>
                                        <h3 className="font-semibold mb-2">
                                            5-Min Loom
                                        </h3>
                                        <p className="text-sm text-muted-foreground">
                                            Personal walkthrough highlighting
                                            key issues and opportunities
                                        </p>
                                    </CardContent>
                                </Card>

                                <Card className="text-center">
                                    <CardContent className="pt-6">
                                        <div className="text-4xl mb-4">✅</div>
                                        <h3 className="font-semibold mb-2">
                                            Quick Wins List
                                        </h3>
                                        <p className="text-sm text-muted-foreground">
                                            Actionable items you can implement
                                            immediately
                                        </p>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
