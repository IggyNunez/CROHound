import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { CheckCircle, ArrowRight } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Thank You - CROHound",
    description:
        "Thank you for your interest in CROHound's Shopify conversion optimization services.",
};

export default function ThankYouPage() {
    return (
        <div className="container px-4 md:px-6 py-16 md:py-24">
            <div className="max-w-2xl mx-auto text-center">
                <div className="space-y-8">
                    <div className="space-y-4">
                        <CheckCircle className="h-16 w-16 text-green-500 mx-auto" />
                        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl">
                            Thank You!
                        </h1>
                        <p className="text-xl text-muted-foreground">
                            We&apos;ve received your request and will get back
                            to you within 24 hours.
                        </p>
                    </div>

                    <Card>
                        <CardHeader>
                            <CardTitle>What Happens Next?</CardTitle>
                            <CardDescription>
                                Here&apos;s what you can expect from our team
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="text-left space-y-3">
                                <div className="flex items-start gap-3">
                                    <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold mt-0.5">
                                        1
                                    </div>
                                    <div>
                                        <p className="font-medium">
                                            Initial Review (24 hours)
                                        </p>
                                        <p className="text-sm text-muted-foreground">
                                            We&apos;ll review your store and
                                            prepare a preliminary assessment
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold mt-0.5">
                                        2
                                    </div>
                                    <div>
                                        <p className="font-medium">
                                            Sniff Check Delivery (48 hours)
                                        </p>
                                        <p className="text-sm text-muted-foreground">
                                            Complete 12-point audit with
                                            personalized Loom walkthrough
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold mt-0.5">
                                        3
                                    </div>
                                    <div>
                                        <p className="font-medium">
                                            Follow-up Discussion
                                        </p>
                                        <p className="text-sm text-muted-foreground">
                                            Optional 15-minute call to discuss
                                            findings and next steps
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <div className="space-y-4">
                        <p className="text-muted-foreground">
                            In the meantime, feel free to explore our resources:
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button asChild variant="outline">
                                <Link href="/blog">
                                    Read Our Blog
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </Link>
                            </Button>
                            <Button asChild variant="outline">
                                <Link href="/case-studies">
                                    View Case Studies
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
