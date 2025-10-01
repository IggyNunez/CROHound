"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, CheckCircle, AlertTriangle } from "lucide-react";
import { useContactForm } from "@/hooks/useContactForm";
import { ErrorBoundary } from "@/components/ErrorBoundary";

// Contact form error fallback
function ContactFormError() {
    return (
        <div className="border border-red-200 bg-red-50 p-6 rounded-lg">
            <div className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-red-600 mt-0.5" />
                <div>
                    <h3 className="font-semibold text-red-800">
                        Contact Form Temporarily Unavailable
                    </h3>
                    <p className="text-red-700 mt-1">
                        We&apos;re experiencing technical difficulties with our
                        contact form. Please email us directly for immediate
                        assistance.
                    </p>
                    <div className="mt-3">
                        <Button asChild variant="outline" size="sm">
                            <a href="mailto:hello@crohound.com">
                                Email hello@crohound.com
                            </a>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

function ContactFormContent() {
    const { form, isSubmitting, isSuccess, error, onSubmit } = useContactForm();

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
                            We&apos;ve received your request and will send your
                            free audit within 48 hours. Check your email for
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
        <form onSubmit={onSubmit} className="space-y-6">
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
                    We&apos;ll send your Sniff Check results to this email
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
                    If you provide your store URL, we&apos;ll start the audit
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
                No spam, no commitment. You&apos;ll receive your audit within 48
                hours.
            </p>
        </form>
    );
}

// Main component with error boundary
export default function ContactForm() {
    return (
        <ErrorBoundary
            fallback={<ContactFormError />}
            onError={(error, errorInfo) => {
                // Log contact form errors specifically
                console.error("Contact form error:", error, errorInfo);

                // Track form errors in analytics
                if (typeof window !== "undefined" && window.gtag) {
                    window.gtag("event", "contact_form_error", {
                        event_category: "Error",
                        error_message: error.message,
                        form_state: "submission_error",
                    });
                }
            }}
        >
            <ContactFormContent />
        </ErrorBoundary>
    );
}
