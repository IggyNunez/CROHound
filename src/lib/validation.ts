import { z } from "zod";

// Contact form validation schema
export const contactSchema = z.object({
    name: z
        .string()
        .min(2, "Name must be at least 2 characters")
        .max(100, "Name too long")
        .trim(),
    email: z.string().email("Please enter a valid email").toLowerCase().trim(),
    storeUrl: z
        .string()
        .optional()
        .refine((val) => {
            if (!val || val === "") return true;
            try {
                const url = new URL(val);
                return url.protocol === "http:" || url.protocol === "https:";
            } catch {
                return false;
            }
        }, "Please enter a valid URL"),
    monthlyRevenue: z.enum(["0-5k", "5k-15k", "15k-50k", "50k-100k", "100k+"]),
    message: z
        .string()
        .min(10, "Message must be at least 10 characters")
        .max(2000, "Message too long")
        .trim(),
    honeypot: z.string().max(0, "Bot detected"), // Anti-spam field
});

export type ContactFormData = z.infer<typeof contactSchema>;

// Email template function
export function emailTemplate(data: ContactFormData): string {
    return `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Sniff Check Request</title>
    <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; margin: 0; padding: 0; background-color: #f8fafc; }
        .container { max-width: 600px; margin: 0 auto; background-color: white; }
        .header { background: linear-gradient(135deg, #dc2626, #f59e0b); padding: 2rem; text-align: center; }
        .header h1 { color: white; margin: 0; font-size: 1.5rem; }
        .content { padding: 2rem; }
        .field { margin-bottom: 1.5rem; }
        .label { font-weight: 600; color: #374151; margin-bottom: 0.5rem; display: block; }
        .value { color: #6b7280; line-height: 1.5; }
        .priority { background-color: #fef2f2; border-left: 4px solid #dc2626; padding: 1rem; margin: 1rem 0; }
        .cta { background-color: #f3f4f6; padding: 1.5rem; text-align: center; margin-top: 2rem; border-radius: 8px; }
        .button { background: linear-gradient(135deg, #dc2626, #f59e0b); color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block; font-weight: 600; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🐕 New Sniff Check Request</h1>
        </div>
        
        <div class="content">
            <div class="priority">
                <strong>Action Required:</strong> New free audit request submitted. Deliver sniff check within 48 hours.
            </div>
            
            <div class="field">
                <span class="label">Name:</span>
                <div class="value">${data.name}</div>
            </div>
            
            <div class="field">
                <span class="label">Email:</span>
                <div class="value">${data.email}</div>
            </div>
            
            <div class="field">
                <span class="label">Store URL:</span>
                <div class="value">${data.storeUrl || "Not provided"}</div>
            </div>
            
            <div class="field">
                <span class="label">Monthly Revenue:</span>
                <div class="value">$${data.monthlyRevenue}</div>
            </div>
            
            <div class="field">
                <span class="label">Main Challenge:</span>
                <div class="value">${data.message.replace(/\n/g, "<br>")}</div>
            </div>
            
            <div class="cta">
                <p><strong>Next Steps:</strong></p>
                <ol style="text-align: left; display: inline-block;">
                    <li>Review the store (if URL provided)</li>
                    <li>Complete 12-point audit checklist</li>
                    <li>Record 5-minute Loom walkthrough</li>
                    <li>Send results to ${data.email}</li>
                </ol>
                ${
                    data.storeUrl
                        ? `<a href="${data.storeUrl}" class="button" target="_blank">Visit Store →</a>`
                        : ""
                }
            </div>
        </div>
    </div>
</body>
</html>`;
}

// Client email confirmation template
export function confirmationEmailTemplate(data: ContactFormData): string {
    return `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Your Sniff Check is Coming!</title>
    <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; margin: 0; padding: 0; background-color: #f8fafc; }
        .container { max-width: 600px; margin: 0 auto; background-color: white; }
        .header { background: linear-gradient(135deg, #dc2626, #f59e0b); padding: 2rem; text-align: center; }
        .header h1 { color: white; margin: 0; font-size: 1.5rem; }
        .content { padding: 2rem; }
        .highlight { background-color: #fef7ff; border: 1px solid #e879f9; padding: 1rem; border-radius: 8px; margin: 1rem 0; }
        .footer { background-color: #f8fafc; padding: 1.5rem; text-align: center; color: #6b7280; font-size: 0.875rem; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🐕 Thanks for Requesting Your Sniff Check!</h1>
        </div>
        
        <div class="content">
            <p>Hi ${data.name},</p>
            
            <p>We've received your request for a free Shopify conversion audit. Here's what happens next:</p>
            
            <div class="highlight">
                <h3 style="margin-top: 0;">What You'll Receive (within 48 hours):</h3>
                <ul>
                    <li><strong>12-Point Audit:</strong> Comprehensive review of your conversion elements</li>
                    <li><strong>5-Minute Loom Video:</strong> Personal walkthrough of key issues and opportunities</li>
                    <li><strong>Quick Wins Checklist:</strong> Actionable items you can implement immediately</li>
                </ul>
            </div>
            
            <p><strong>Your submission details:</strong></p>
            <ul>
                <li>Store: ${
                    data.storeUrl || "Not provided (we may follow up)"
                }</li>
                <li>Revenue Range: $${data.monthlyRevenue}</li>
                <li>Main Challenge: ${
                    data.message.length > 100
                        ? data.message.substring(0, 100) + "..."
                        : data.message
                }</li>
            </ul>
            
            <p>Questions? Just reply to this email or reach out at <a href="mailto:hello@crohound.com">hello@crohound.com</a>.</p>
            
            <p>Talk soon,<br><strong>The CROHound Team</strong> 🐕</p>
        </div>
        
        <div class="footer">
            <p>CROHound - Shopify Conversion Rate Optimization</p>
            <p>This is an automated confirmation. We'll follow up with your results within 48 hours.</p>
        </div>
    </div>
</body>
</html>`;
}
