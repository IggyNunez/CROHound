import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

// Schema for Web Vitals data
const WebVitalSchema = z.object({
    id: z.string(),
    name: z.enum(["FCP", "LCP", "FID", "CLS", "TTFB", "INP"]),
    value: z.number(),
    delta: z.number(),
    rating: z.enum(["good", "needs-improvement", "poor"]),
    entries: z.array(z.any()).optional(),
});

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const vitals = WebVitalSchema.parse(body);

        // Log vitals data (in production, you'd send this to your analytics service)
        console.log(`[Web Vitals API] ${vitals.name}:`, {
            value: vitals.value,
            rating: vitals.rating,
            timestamp: new Date().toISOString(),
            userAgent: request.headers.get("user-agent"),
            url: request.headers.get("referer"),
        });

        // Here you could:
        // 1. Store in database
        // 2. Send to analytics service (DataDog, New Relic, etc.)
        // 3. Send to custom monitoring solution

        // Example: Send to external monitoring service
        // if (process.env.MONITORING_ENDPOINT) {
        //     await fetch(process.env.MONITORING_ENDPOINT, {
        //         method: 'POST',
        //         headers: { 'Content-Type': 'application/json' },
        //         body: JSON.stringify({
        //             ...vitals,
        //             timestamp: new Date().toISOString(),
        //             url: request.headers.get('referer'),
        //             userAgent: request.headers.get('user-agent'),
        //         }),
        //     });
        // }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Web Vitals API error:", error);
        return NextResponse.json(
            { error: "Invalid vitals data" },
            { status: 400 }
        );
    }
}

// Health check endpoint
export async function GET() {
    return NextResponse.json({
        status: "ok",
        timestamp: new Date().toISOString(),
    });
}
