import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Terms of Service - CROHound",
    description:
        "CROHound's terms of service outlining the terms and conditions for using our services.",
};

export default function TermsPage() {
    return (
        <div className="container px-4 md:px-6 py-16 md:py-24">
            <div className="max-w-4xl mx-auto prose prose-gray dark:prose-invert">
                <h1>Terms of Service</h1>
                <p className="text-muted-foreground">
                    Last updated: {new Date().toLocaleDateString()}
                </p>

                <h2>Acceptance of Terms</h2>
                <p>
                    By accessing and using CROHound&apos;s services, you accept
                    and agree to be bound by the terms and provision of this
                    agreement.
                </p>

                <h2>Services</h2>
                <p>
                    CROHound provides conversion rate optimization services for
                    Shopify stores, including audits, consulting, and
                    implementation services.
                </p>

                <h2>Payment Terms</h2>
                <p>
                    Payment terms will be specified in individual service
                    agreements. Monthly retainer packages require a 3-month
                    minimum commitment.
                </p>

                <h2>Intellectual Property</h2>
                <p>
                    All recommendations, strategies, and implementations
                    provided by CROHound remain the intellectual property of the
                    client once paid for.
                </p>

                <h2>Limitation of Liability</h2>
                <p>
                    CROHound&apos;s liability is limited to the amount paid for
                    services. We do not guarantee specific conversion rate
                    improvements, as results depend on many factors.
                </p>

                <h2>Contact Us</h2>
                <p>
                    If you have any questions about these Terms of Service,
                    please contact us at{" "}
                    <a href="mailto:hello@crohound.com">hello@crohound.com</a>.
                </p>
            </div>
        </div>
    );
}
