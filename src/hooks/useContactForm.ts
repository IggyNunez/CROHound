"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactSchema, type ContactFormData } from "@/lib/validation";
import { useAnalytics } from "./useAnalytics";

export function useContactForm() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { trackConversion } = useAnalytics();

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

    const submitForm = async (data: ContactFormData) => {
        // Check honeypot field
        if (data.honeypot) {
            console.warn("Spam submission detected");
            return;
        }

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
            trackConversion(0, "USD");

            return { success: true, data: result };
        } catch (err) {
            const errorMessage =
                err instanceof Error
                    ? err.message
                    : "Something went wrong. Please try again or email us directly at hello@crohound.com";

            setError(errorMessage);
            console.error("Contact form error:", err);

            return { success: false, error: errorMessage };
        } finally {
            setIsSubmitting(false);
        }
    };

    const resetForm = () => {
        setIsSuccess(false);
        setError(null);
        form.reset();
    };

    return {
        form,
        isSubmitting,
        isSuccess,
        error,
        submitForm,
        resetForm,
        onSubmit: form.handleSubmit(submitForm),
    };
}
