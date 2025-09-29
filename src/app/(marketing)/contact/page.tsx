import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ContactFormSkeleton } from "@/components/ui/ContactFormSkeleton";
import Link from "next/link";
import dynamic from "next/dynamic";
import type { Metadata } from "next";

// Dynamically import ContactForm to reduce initial bundle size
const ContactForm = dynamic(() => import("@/components/ContactForm"), {
    loading: () => <ContactFormSkeleton />,
});

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
                                <ContactForm />
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            {/* Alternative Contact Methods */}
            <section className="py-8 md:py-16">
                <div className="container px-4 md:px-6">
                    <div className="max-w-2xl mx-auto text-center space-y-6">
                        <h3 className="text-xl font-semibold">
                            Prefer to reach out directly?
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="p-4 border rounded-lg">
                                <h4 className="font-medium mb-2">
                                    📧 Email Us
                                </h4>
                                <p className="text-sm text-muted-foreground mb-3">
                                    Send us your store details directly
                                </p>
                                <Button
                                    variant="outline"
                                    asChild
                                    className="w-full"
                                >
                                    <a href="mailto:hello@crohound.com">
                                        hello@crohound.com
                                    </a>
                                </Button>
                            </div>

                            <div className="p-4 border rounded-lg">
                                <h4 className="font-medium mb-2">
                                    📞 Book a Call
                                </h4>
                                <p className="text-sm text-muted-foreground mb-3">
                                    15-minute intro call to discuss your needs
                                </p>
                                <Button
                                    variant="outline"
                                    asChild
                                    className="w-full"
                                >
                                    <Link
                                        href="#"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        Schedule Call
                                    </Link>
                                </Button>
                            </div>
                        </div>

                        <div className="bg-muted p-4 rounded-lg text-left">
                            <h4 className="font-semibold mb-2">
                                What to include in your email:
                            </h4>
                            <ul className="text-sm space-y-1 text-muted-foreground">
                                <li>• Your Shopify store URL</li>
                                <li>• Monthly traffic volume (if known)</li>
                                <li>• Current conversion rate (if known)</li>
                                <li>
                                    • Main conversion goals (sales, signups,
                                    etc.)
                                </li>
                                <li>• Any specific concerns or bottlenecks</li>
                            </ul>
                        </div>
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
