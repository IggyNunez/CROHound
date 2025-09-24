"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Loader2, CheckCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

// Form validation schema
const formSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Please enter a valid email"),
    storeUrl: z
        .string()
        .url("Please enter a valid URL")
        .optional()
        .or(z.literal("")),
    monthlyRevenue: z.string().min(1, "Please select your monthly revenue"),
    message: z.string().min(10, "Message must be at least 10 characters"),
    honeypot: z.string().max(0), // Anti-spam field
});

type FormData = z.infer<typeof formSchema>;

export default function ContactForm() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const form = useForm<FormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            storeUrl: "",
            monthlyRevenue: "",
            message: "",
            honeypot: "", // Hidden field for spam protection
        },
    });

    async function onSubmit(data: FormData) {
        setIsSubmitting(true);
        setError(null);

        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            if (!response.ok) throw new Error("Failed to send message");

            setIsSuccess(true);
            form.reset();

            // Track conversion
            if (window.gtag) {
                window.gtag("event", "generate_lead", {
                    currency: "USD",
                    value: 0,
                });
            }
        } catch (err) {
            setError(
                "Something went wrong. Please try again or email us directly."
            );
            console.error("Contact form error:", err);
        } finally {
            setIsSubmitting(false);
        }
    }

    if (isSuccess) {
        return (
            <Alert className="border-green-500 bg-green-50">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <AlertDescription className="text-green-800">
                    <strong>Success!</strong> We've received your request and
                    will send your Sniff Check within 48 hours. Check your email
                    for confirmation.
                </AlertDescription>
            </Alert>
        );
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {/* Honeypot field (hidden) */}
                <input
                    type="text"
                    name="honeypot"
                    className="hidden"
                    tabIndex={-1}
                    autoComplete="off"
                    {...form.register("honeypot")}
                />

                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Name *</FormLabel>
                            <FormControl>
                                <Input placeholder="John Doe" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email *</FormLabel>
                            <FormControl>
                                <Input
                                    type="email"
                                    placeholder="john@shopifystore.com"
                                    {...field}
                                />
                            </FormControl>
                            <FormDescription>
                                We'll send your Sniff Check results to this
                                email
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="storeUrl"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Store URL (optional)</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="https://mystore.myshopify.com"
                                    {...field}
                                />
                            </FormControl>
                            <FormDescription>
                                If you provide your store URL, we'll start the
                                audit immediately
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="monthlyRevenue"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Monthly Revenue *</FormLabel>
                            <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                            >
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select your revenue range" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="0-5k">
                                        $0 - $5k
                                    </SelectItem>
                                    <SelectItem value="5k-15k">
                                        $5k - $15k
                                    </SelectItem>
                                    <SelectItem value="15k-50k">
                                        $15k - $50k
                                    </SelectItem>
                                    <SelectItem value="50k-100k">
                                        $50k - $100k
                                    </SelectItem>
                                    <SelectItem value="100k+">
                                        $100k+
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>
                                Tell us about your main conversion challenge *
                            </FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="High cart abandonment, low product page conversions, etc."
                                    className="min-h-[120px]"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {error && (
                    <Alert variant="destructive">
                        <AlertDescription>{error}</AlertDescription>
                    </Alert>
                )}

                <Button
                    type="submit"
                    size="lg"
                    className="w-full"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Submitting...
                        </>
                    ) : (
                        "Get My Free Sniff Check →"
                    )}
                </Button>

                <p className="text-sm text-muted-foreground text-center">
                    No spam, no commitment. You'll receive your audit within 48
                    hours.
                </p>
            </form>
        </Form>
    );
}

// src/app/api/contact/route.ts
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const body = await request.json();

        // Spam check
        if (body.honeypot) {
            return NextResponse.json({ success: true });
        }

        // Here you would integrate with your email service
        // Example: SendGrid, Resend, AWS SES, etc.

        // For now, just log the submission
        console.log("Contact form submission:", body);

        // TODO: Implement actual email sending
        // await sendEmail({
        //   to: process.env.ADMIN_EMAIL,
        //   subject: `New Sniff Check Request: ${body.name}`,
        //   data: body
        // });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Contact form error:", error);
        return NextResponse.json(
            { error: "Failed to process request" },
            { status: 500 }
        );
    }
}
