import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Privacy Policy - CROHound",
    description:
        "CROHound's privacy policy outlining how we collect, use, and protect your personal information.",
};

export default function PrivacyPage() {
    return (
        <div className="container px-4 md:px-6 py-16 md:py-24">
            <div className="max-w-4xl mx-auto prose prose-gray dark:prose-invert">
                <h1>Privacy Policy</h1>
                <p className="text-muted-foreground">
                    Last updated: {new Date().toLocaleDateString()}
                </p>

                <h2>Information We Collect</h2>
                <p>
                    We collect information you provide directly to us, such as
                    when you contact us for services, request a consultation, or
                    subscribe to our communications.
                </p>

                <h2>How We Use Your Information</h2>
                <p>
                    We use the information we collect to provide, maintain, and
                    improve our services, communicate with you, and comply with
                    legal obligations.
                </p>

                <h2>Information Sharing</h2>
                <p>
                    We do not sell, trade, or otherwise transfer your personal
                    information to third parties without your consent, except as
                    described in this policy.
                </p>

                <h2>Analytics and Tracking</h2>
                <p>
                    We use Google Analytics and Microsoft Clarity to understand
                    how visitors interact with our site. These services may
                    collect information about your browsing behavior.
                </p>

                <h2>Contact Us</h2>
                <p>
                    If you have any questions about this Privacy Policy, please
                    contact us at{" "}
                    <a href="mailto:hello@crohound.com">hello@crohound.com</a>.
                </p>
            </div>
        </div>
    );
}
