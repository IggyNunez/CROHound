"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, CheckCircle, AlertTriangle } from "lucide-react";
import { contactSchema, type ContactFormData } from "@/lib/validation";

export default function ContactForm() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const form = useForm<ContactFormData>({
        resolver: zodResolver(contactSchema),
        defaultValues: {
            name: "",
            email: "",
            storeUrl: "",
            monthlyRevenue: undefined,
            message: "",
            honeypot: "", // Hidden field for spam protection
        },
    });

    async function onSubmit(data: ContactFormData) {
        setIsSubmitting(true);
        setError(null);

        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            const result = await response.json();

            if (!response.ok) {
                if (response.status === 429) {
                    throw new Error(
                        "You've submitted too many requests. Please try again in 15 minutes."
                    );
                }
                throw new Error(result.error || "Failed to send message");
            }

            setIsSuccess(true);
            form.reset();

            // Track conversion
            if (typeof window !== "undefined" && window.gtag) {
                window.gtag("event", "generate_lead", {
                    currency: "USD",
                    value: 0,
                });
            }

            // Track with Clarity (if available)
            if (typeof window !== "undefined" && window.clarity) {
                window.clarity("event", "contact_form_submit");
            }
        } catch (err) {
            const errorMessage =
                err instanceof Error
                    ? err.message
                    : "Something went wrong. Please try again or email us directly at hello@crohound.com";
            setError(errorMessage);
            console.error("Contact form error:", err);
        } finally {
            setIsSubmitting(false);
        }
    }

    if (isSuccess) {
        return (
            <div className="border border-green-200 bg-green-50 p-6 rounded-lg">
                <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                    <div>
                        <h3 className="font-semibold text-green-800">
                            Success! Your Sniff Check is on the way 🐕
                        </h3>
                        <p className="text-green-700 mt-1">
                            We've received your request and will send your free
                            audit within 48 hours. Check your email for
                            confirmation.
                        </p>
                        <p className="text-sm text-green-600 mt-2">
                            Questions? Email us at{" "}
                            <a
                                href="mailto:hello@crohound.com"
                                className="underline"
                            >
                                hello@crohound.com
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Honeypot field (hidden) */}
            <input
                type="text"
                className="hidden"
                tabIndex={-1}
                autoComplete="off"
                {...form.register("honeypot")}
            />

            <div>
                <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-2"
                >
                    Name *
                </label>
                <Input
                    id="name"
                    placeholder="John Doe"
                    {...form.register("name")}
                    className={
                        form.formState.errors.name ? "border-red-500" : ""
                    }
                />
                {form.formState.errors.name && (
                    <p className="mt-1 text-sm text-red-600">
                        {form.formState.errors.name.message}
                    </p>
                )}
            </div>

            <div>
                <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-2"
                >
                    Email *
                </label>
                <Input
                    id="email"
                    type="email"
                    placeholder="john@shopifystore.com"
                    {...form.register("email")}
                    className={
                        form.formState.errors.email ? "border-red-500" : ""
                    }
                />
                <p className="mt-1 text-sm text-gray-500">
                    We'll send your Sniff Check results to this email
                </p>
                {form.formState.errors.email && (
                    <p className="mt-1 text-sm text-red-600">
                        {form.formState.errors.email.message}
                    </p>
                )}
            </div>

            <div>
                <label
                    htmlFor="storeUrl"
                    className="block text-sm font-medium text-gray-700 mb-2"
                >
                    Store URL (optional)
                </label>
                <Input
                    id="storeUrl"
                    placeholder="https://mystore.myshopify.com"
                    {...form.register("storeUrl")}
                    className={
                        form.formState.errors.storeUrl ? "border-red-500" : ""
                    }
                />
                <p className="mt-1 text-sm text-gray-500">
                    If you provide your store URL, we'll start the audit
                    immediately
                </p>
                {form.formState.errors.storeUrl && (
                    <p className="mt-1 text-sm text-red-600">
                        {form.formState.errors.storeUrl.message}
                    </p>
                )}
            </div>

            <div>
                <label
                    htmlFor="monthlyRevenue"
                    className="block text-sm font-medium text-gray-700 mb-2"
                >
                    Monthly Revenue *
                </label>
                <select
                    id="monthlyRevenue"
                    {...form.register("monthlyRevenue")}
                    className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 ${
                        form.formState.errors.monthlyRevenue
                            ? "border-red-500"
                            : ""
                    }`}
                >
                    <option value="">Select your revenue range</option>
                    <option value="0-5k">$0 - $5k</option>
                    <option value="5k-15k">$5k - $15k</option>
                    <option value="15k-50k">$15k - $50k</option>
                    <option value="50k-100k">$50k - $100k</option>
                    <option value="100k+">$100k+</option>
                </select>
                {form.formState.errors.monthlyRevenue && (
                    <p className="mt-1 text-sm text-red-600">
                        {form.formState.errors.monthlyRevenue.message}
                    </p>
                )}
            </div>

            <div>
                <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700 mb-2"
                >
                    Tell us about your main conversion challenge *
                </label>
                <Textarea
                    id="message"
                    placeholder="High cart abandonment, low product page conversions, etc."
                    className={`min-h-[120px] ${
                        form.formState.errors.message ? "border-red-500" : ""
                    }`}
                    {...form.register("message")}
                />
                {form.formState.errors.message && (
                    <p className="mt-1 text-sm text-red-600">
                        {form.formState.errors.message.message}
                    </p>
                )}
            </div>

            {error && (
                <div className="border border-red-200 bg-red-50 p-4 rounded-lg">
                    <div className="flex items-start gap-3">
                        <AlertTriangle className="h-5 w-5 text-red-600 mt-0.5" />
                        <div>
                            <p className="text-red-800">{error}</p>
                        </div>
                    </div>
                </div>
            )}

            <Button
                type="submit"
                size="lg"
                className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800"
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

            <p className="text-sm text-gray-500 text-center">
                No spam, no commitment. You'll receive your audit within 48
                hours.
            </p>
        </form>
    );
}
