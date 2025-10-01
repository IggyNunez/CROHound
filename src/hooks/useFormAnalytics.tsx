"use client";

import { useEffect, useCallback, useRef } from "react";

interface FormAnalyticsData {
    formName: string;
    timeOnForm: number;
    fieldsInteracted: string[];
    abandonedAt?: string;
    completionRate: number;
    errors: Record<string, string>;
    submissionAttempts: number;
}

interface UseFormAnalyticsOptions {
    formName: string;
    trackFocus?: boolean;
    trackErrors?: boolean;
    trackSubmission?: boolean;
}

// Export types
export type { FormAnalyticsData, UseFormAnalyticsOptions };

export function useFormAnalytics({
    formName,
    trackFocus = true,
    trackErrors = true,
    trackSubmission = true,
}: UseFormAnalyticsOptions) {
    const startTime = useRef<number>(Date.now());
    const fieldsInteracted = useRef<Set<string>>(new Set());
    const submissionAttempts = useRef<number>(0);
    const formData = useRef<FormAnalyticsData>({
        formName,
        timeOnForm: 0,
        fieldsInteracted: [],
        completionRate: 0,
        errors: {},
        submissionAttempts: 0,
    });

    // Track field focus events
    const trackFieldFocus = useCallback(
        (fieldName: string) => {
            if (!trackFocus) return;

            fieldsInteracted.current.add(fieldName);

            // Send focus event to analytics
            if (typeof window !== "undefined" && window.gtag) {
                window.gtag("event", "form_field_focus", {
                    event_category: "Form Analytics",
                    form_name: formName,
                    field_name: fieldName,
                    fields_touched: fieldsInteracted.current.size,
                });
            }
        },
        [formName, trackFocus]
    );

    // Track field errors
    const trackFieldError = useCallback(
        (fieldName: string, errorMessage: string) => {
            if (!trackErrors) return;

            formData.current.errors[fieldName] = errorMessage;

            // Send error event to analytics
            if (typeof window !== "undefined" && window.gtag) {
                window.gtag("event", "form_field_error", {
                    event_category: "Form Analytics",
                    form_name: formName,
                    field_name: fieldName,
                    error_message: errorMessage.substring(0, 100), // Limit error message length
                    total_errors: Object.keys(formData.current.errors).length,
                });
            }
        },
        [formName, trackErrors]
    );

    // Track form submission attempts
    const trackSubmissionAttempt = useCallback(
        (success: boolean, errors?: Record<string, string>) => {
            if (!trackSubmission) return;

            submissionAttempts.current += 1;
            const timeOnForm = Date.now() - startTime.current;

            if (errors) {
                formData.current.errors = {
                    ...formData.current.errors,
                    ...errors,
                };
            }

            // Calculate completion rate
            const totalFields = fieldsInteracted.current.size;
            const errorFields = Object.keys(formData.current.errors).length;
            const completionRate =
                totalFields > 0
                    ? ((totalFields - errorFields) / totalFields) * 100
                    : 0;

            formData.current = {
                ...formData.current,
                timeOnForm,
                fieldsInteracted: Array.from(fieldsInteracted.current),
                completionRate,
                submissionAttempts: submissionAttempts.current,
            };

            // Send submission event to analytics
            if (typeof window !== "undefined" && window.gtag) {
                window.gtag(
                    "event",
                    success ? "form_submit_success" : "form_submit_failure",
                    {
                        event_category: "Form Analytics",
                        form_name: formName,
                        time_on_form: Math.round(timeOnForm / 1000), // Convert to seconds
                        fields_interacted: fieldsInteracted.current.size,
                        completion_rate: Math.round(completionRate),
                        submission_attempts: submissionAttempts.current,
                        total_errors: Object.keys(formData.current.errors)
                            .length,
                    }
                );
            }

            // Reset for potential retry
            if (success) {
                formData.current.errors = {};
            }
        },
        [formName, trackSubmission]
    );

    // Track form abandonment
    const trackFormAbandonment = useCallback(
        (fieldName?: string) => {
            const timeOnForm = Date.now() - startTime.current;

            formData.current = {
                ...formData.current,
                timeOnForm,
                fieldsInteracted: Array.from(fieldsInteracted.current),
                abandonedAt: fieldName,
            };

            // Only track if user interacted with form
            if (
                fieldsInteracted.current.size > 0 &&
                typeof window !== "undefined" &&
                window.gtag
            ) {
                window.gtag("event", "form_abandonment", {
                    event_category: "Form Analytics",
                    form_name: formName,
                    abandoned_at_field: fieldName || "unknown",
                    time_on_form: Math.round(timeOnForm / 1000),
                    fields_interacted: fieldsInteracted.current.size,
                    completion_rate:
                        fieldsInteracted.current.size > 0
                            ? ((fieldsInteracted.current.size -
                                  Object.keys(formData.current.errors).length) /
                                  fieldsInteracted.current.size) *
                              100
                            : 0,
                });
            }
        },
        [formName]
    );

    // Auto-track form abandonment on component unmount
    useEffect(() => {
        const fieldsSize = fieldsInteracted.current.size;
        const attempts = submissionAttempts.current;

        return () => {
            // Only track abandonment if form wasn't successfully submitted
            if (attempts === 0 && fieldsSize > 0) {
                trackFormAbandonment();
            }
        };
    }, [trackFormAbandonment]);

    // Page visibility change tracking
    useEffect(() => {
        const handleVisibilityChange = () => {
            if (document.hidden && fieldsInteracted.current.size > 0) {
                trackFormAbandonment("page_hidden");
            }
        };

        document.addEventListener("visibilitychange", handleVisibilityChange);

        return () => {
            document.removeEventListener(
                "visibilitychange",
                handleVisibilityChange
            );
        };
    }, [trackFormAbandonment]);

    return {
        trackFieldFocus,
        trackFieldError,
        trackSubmissionAttempt,
        trackFormAbandonment,
        getFormData: () => ({ ...formData.current }),
        getTimeOnForm: () => Date.now() - startTime.current,
        getFieldsInteracted: () => Array.from(fieldsInteracted.current),
    };
}

// Hook for tracking conversion funnel steps
export function useConversionFunnel(funnelName: string) {
    const startTime = useRef<number>(Date.now());
    const currentStep = useRef<string>("");
    const completedSteps = useRef<string[]>([]);

    const trackStep = useCallback(
        (stepName: string, stepData?: Record<string, unknown>) => {
            const timeOnPreviousStep = currentStep.current
                ? Date.now() - startTime.current
                : 0;

            // Mark step as completed
            if (!completedSteps.current.includes(stepName)) {
                completedSteps.current.push(stepName);
            }

            // Send step event to analytics
            if (typeof window !== "undefined" && window.gtag) {
                window.gtag("event", "funnel_step", {
                    event_category: "Conversion Funnel",
                    funnel_name: funnelName,
                    step_name: stepName,
                    step_number: completedSteps.current.length,
                    time_on_previous_step: Math.round(
                        timeOnPreviousStep / 1000
                    ),
                    total_funnel_time: Math.round(
                        (Date.now() - startTime.current) / 1000
                    ),
                    ...stepData,
                });
            }

            currentStep.current = stepName;
        },
        [funnelName]
    );

    const trackConversion = useCallback(
        (conversionData?: Record<string, unknown>) => {
            const totalTime = Date.now() - startTime.current;

            // Send conversion event to analytics
            if (typeof window !== "undefined" && window.gtag) {
                window.gtag("event", "conversion", {
                    event_category: "Conversion Funnel",
                    funnel_name: funnelName,
                    total_steps: completedSteps.current.length,
                    total_time: Math.round(totalTime / 1000),
                    conversion_path: completedSteps.current.join(" -> "),
                    ...conversionData,
                });
            }
        },
        [funnelName]
    );

    const trackDropoff = useCallback(
        (reason?: string) => {
            const totalTime = Date.now() - startTime.current;

            // Send dropoff event to analytics
            if (typeof window !== "undefined" && window.gtag) {
                window.gtag("event", "funnel_dropoff", {
                    event_category: "Conversion Funnel",
                    funnel_name: funnelName,
                    dropoff_step: currentStep.current,
                    steps_completed: completedSteps.current.length,
                    total_time: Math.round(totalTime / 1000),
                    dropoff_reason: reason || "unknown",
                });
            }
        },
        [funnelName]
    );

    return {
        trackStep,
        trackConversion,
        trackDropoff,
        getCurrentStep: () => currentStep.current,
        getCompletedSteps: () => [...completedSteps.current],
        getFunnelData: () => ({
            funnelName,
            currentStep: currentStep.current,
            completedSteps: [...completedSteps.current],
            totalTime: Date.now() - startTime.current,
        }),
    };
}
