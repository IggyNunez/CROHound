import React from "react";
import FAQSchema from "./FAQSchema";

export default function CROFAQSchema() {
    const faqs = [
        {
            question: "How quickly can I see CRO results?",
            answer: "Most clients see initial improvements within 2-4 weeks of implementing our recommendations. Significant conversion rate increases typically occur after 2-3 months of consistent optimization and testing.",
        },
        {
            question: "What's included in the free Sniff Check?",
            answer: "Our free Sniff Check includes a comprehensive 12-point conversion audit, a 5-minute personalized video walkthrough highlighting key issues, and a prioritized quick-wins checklist delivered within 48 hours.",
        },
        {
            question: "Do you work with stores outside of Shopify?",
            answer: "While we specialize in Shopify CRO, our conversion optimization principles apply to most ecommerce platforms. Contact us to discuss your specific platform needs.",
        },
        {
            question: "What's the minimum traffic requirement for CRO?",
            answer: "For meaningful A/B testing, we recommend at least 1,000 unique visitors per week. However, our audit and optimization recommendations can benefit stores of any size.",
        },
        {
            question: "How do you measure CRO success?",
            answer: "We track key metrics including overall conversion rate, page-specific conversion rates, average order value, customer lifetime value, and cart abandonment rate. All improvements are measured against statistical significance thresholds.",
        },
    ];

    return <FAQSchema faqs={faqs} />;
}
