import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";
import { rateLimit, getClientIP } from "@/lib/rate-limit";
import {
    contactSchema,
    emailTemplate,
    confirmationEmailTemplate,
    type ContactFormData,
} from "@/lib/validation";

const resend = new Resend(process.env.RESEND_API_KEY);

// Verify environment variables
const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
const FROM_EMAIL = process.env.FROM_EMAIL || "noreply@crohound.com";

if (!process.env.RESEND_API_KEY) {
    console.error("Missing RESEND_API_KEY environment variable");
}

if (!ADMIN_EMAIL) {
    console.error("Missing ADMIN_EMAIL environment variable");
}

export async function POST(request: NextRequest) {
    try {
        // Get client IP for rate limiting
        const clientIP = getClientIP(request);

        // Apply rate limiting
        const rateLimitResult = await rateLimit.check(clientIP);

        if (!rateLimitResult.success) {
            console.warn(`Rate limit exceeded for IP: ${clientIP}`);
            return NextResponse.json(
                {
                    error: "Too many requests. Please try again later.",
                    resetTime: rateLimitResult.reset,
                },
                {
                    status: 429,
                    headers: {
                        "X-RateLimit-Remaining": "0",
                        "X-RateLimit-Reset":
                            rateLimitResult.reset?.toString() || "",
                    },
                }
            );
        }

        // Parse and validate request body
        const body = await request.json();

        // Validate with Zod schema
        const validationResult = contactSchema.safeParse(body);

        if (!validationResult.success) {
            console.warn("Invalid form data:", validationResult.error.issues);
            return NextResponse.json(
                {
                    error: "Invalid form data",
                    details: validationResult.error.issues.map((issue) => ({
                        field: issue.path.join("."),
                        message: issue.message,
                    })),
                },
                { status: 400 }
            );
        }

        const formData: ContactFormData = validationResult.data;

        // Additional security: check honeypot
        if (formData.honeypot && formData.honeypot.length > 0) {
            console.warn(`Honeypot triggered from IP: ${clientIP}`);
            // Return success to not reveal the honeypot
            return NextResponse.json({ success: true });
        }

        // Verify Resend is configured
        if (!process.env.RESEND_API_KEY || !ADMIN_EMAIL) {
            console.error("Email service not configured");
            return NextResponse.json(
                { error: "Email service temporarily unavailable" },
                { status: 503 }
            );
        }

        // Send notification email to admin
        const adminEmailPromise = resend.emails.send({
            from: FROM_EMAIL,
            to: ADMIN_EMAIL,
            subject: `🐕 New Sniff Check Request: ${formData.name}`,
            html: emailTemplate(formData),
            tags: [
                { name: "type", value: "contact-form" },
                { name: "revenue", value: formData.monthlyRevenue },
            ],
        });

        // Send confirmation email to client
        const confirmationEmailPromise = resend.emails.send({
            from: FROM_EMAIL,
            to: formData.email,
            subject: "Your Sniff Check is Coming! 🐕",
            html: confirmationEmailTemplate(formData),
            tags: [{ name: "type", value: "confirmation" }],
        });

        // Send both emails in parallel
        const [adminResult, confirmationResult] = await Promise.allSettled([
            adminEmailPromise,
            confirmationEmailPromise,
        ]);

        // Check for email sending errors
        if (adminResult.status === "rejected") {
            console.error(
                "Failed to send admin notification:",
                adminResult.reason
            );
        }

        if (confirmationResult.status === "rejected") {
            console.error(
                "Failed to send confirmation email:",
                confirmationResult.reason
            );
        }

        // If admin email failed but confirmation succeeded, still return success
        // The important thing is the lead was captured
        if (
            adminResult.status === "rejected" &&
            confirmationResult.status === "rejected"
        ) {
            throw new Error("Failed to send both emails");
        }

        // Log successful submission (for analytics/tracking)
        console.log(
            `Contact form submission successful: ${formData.name} (${formData.email})`
        );

        return NextResponse.json(
            {
                success: true,
                message:
                    "Thank you! We'll send your Sniff Check within 48 hours.",
            },
            {
                headers: {
                    "X-RateLimit-Remaining":
                        rateLimitResult.remaining?.toString() || "",
                    "X-RateLimit-Reset":
                        rateLimitResult.reset?.toString() || "",
                },
            }
        );
    } catch (error) {
        console.error("Contact form error:", error);

        // Return generic error message to client
        return NextResponse.json(
            {
                error: "Something went wrong. Please try again or email us directly at hello@crohound.com",
            },
            { status: 500 }
        );
    }
}

// Handle unsupported methods
export async function GET() {
    return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}
