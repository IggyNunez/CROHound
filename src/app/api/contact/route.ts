import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
    try {
        const body = await request.json();

        if (body.honeypot) return NextResponse.json({ success: true });

        await resend.emails.send({
            from: "CROHound <noreply@crohound.com>",
            to: [process.env.ADMIN_EMAIL!],
            subject: `New Sniff Check Request: ${body.name}`,
            html: `
                <h2>New Lead from CROHound.com</h2>
                <p><strong>Name:</strong> ${body.name}</p>
                <p><strong>Email:</strong> ${body.email}</p>
                <p><strong>Store URL:</strong> ${
                    body.storeUrl || "Not provided"
                }</p>
                <p><strong>Monthly Revenue:</strong> ${body.monthlyRevenue}</p>
                <p><strong>Challenge:</strong> ${body.message}</p>
            `,
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Contact form error:", error);
        return NextResponse.json(
            { error: "Failed to process request" },
            { status: 500 }
        );
    }
}
