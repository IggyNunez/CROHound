import { z } from "zod";

// Environment variable validation schema
const clientEnvSchema = z.object({
    // Public variables (safe for client-side)
    NEXT_PUBLIC_SITE_URL: z.string().url().default("https://www.crohound.com"),
    NEXT_PUBLIC_GA_ID: z.string().optional(),
    NEXT_PUBLIC_CLARITY_ID: z.string().optional(),
    NODE_ENV: z
        .enum(["development", "production", "test"])
        .default("development"),
});

const serverEnvSchema = z.object({
    // Server-only variables (never exposed to client)
    RESEND_API_KEY: z.string().min(1, "RESEND_API_KEY is required for production"),
});

// Parse client environment variables (always safe)
const clientEnvParsed = clientEnvSchema.parse({
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
    NEXT_PUBLIC_GA_ID: process.env.NEXT_PUBLIC_GA_ID,
    NEXT_PUBLIC_CLARITY_ID: process.env.NEXT_PUBLIC_CLARITY_ID,
    NODE_ENV: process.env.NODE_ENV,
});

// Parse server environment variables (only when needed)
let serverEnvParsed: z.infer<typeof serverEnvSchema> | null = null;

try {
    if (process.env.RESEND_API_KEY || clientEnvParsed.NODE_ENV === "production") {
        serverEnvParsed = serverEnvSchema.parse({
            RESEND_API_KEY: process.env.RESEND_API_KEY,
        });
    }
} catch (error) {
    if (clientEnvParsed.NODE_ENV === "production") {
        console.error("Missing required server environment variables:", error);
        throw error;
    } else {
        console.warn("Server environment variables not set (OK for development)");
    }
}

// Type-safe environment configuration
export const clientEnv = {
    SITE_URL: clientEnvParsed.NEXT_PUBLIC_SITE_URL,
    GA_ID: clientEnvParsed.NEXT_PUBLIC_GA_ID,
    CLARITY_ID: clientEnvParsed.NEXT_PUBLIC_CLARITY_ID,
    IS_PRODUCTION: clientEnvParsed.NODE_ENV === "production",
    IS_DEVELOPMENT: clientEnvParsed.NODE_ENV === "development",
} as const;

export const serverEnv = {
    RESEND_API_KEY: serverEnvParsed?.RESEND_API_KEY || "",
    ...clientEnv,
} as const;

// Ensure this module can only be imported on server-side for serverEnv
export function getServerEnv() {
    if (typeof window !== "undefined") {
        throw new Error("serverEnv can only be used on the server side");
    }
    
    if (!serverEnvParsed?.RESEND_API_KEY && clientEnvParsed.NODE_ENV === "production") {
        throw new Error("RESEND_API_KEY is required in production");
    }
    
    return serverEnv;
}

export default clientEnv;
