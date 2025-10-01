import React from "react";
import { JsonLd } from "./JsonLd";

export default function FAQSchema(props?: Record<string, unknown>) {
    const { faqs } = (props || {}) as {
        faqs?: Array<{ question: string; answer: string }>;
    };

    // Provide default FAQs if not provided
    const actualFaqs = faqs || [
        {
            question: "What is Conversion Rate Optimization?",
            answer: "CRO is the practice of increasing the percentage of website visitors who complete a desired action.",
        },
    ];

    const faqData = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: actualFaqs.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: {
                "@type": "Answer",
                text: faq.answer,
            },
        })),
    };

    return <JsonLd data={faqData} />;
}
