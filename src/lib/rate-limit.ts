import { NextRequest } from "next/server";

interface RateLimitOptions {
    interval: number; // Time window in milliseconds
    uniqueTokenPerInterval: number; // Max requests per interval
}

class RateLimiter {
    private tokenCache = new Map<
        string,
        { count: number; timestamp: number }
    >();
    private interval: number;
    private uniqueTokenPerInterval: number;

    constructor(options: RateLimitOptions) {
        this.interval = options.interval;
        this.uniqueTokenPerInterval = options.uniqueTokenPerInterval;
    }

    check = async (
        identifier: string | null
    ): Promise<{ success: boolean; reset?: number; remaining?: number }> => {
        if (!identifier) {
            return { success: true }; // Allow if no identifier (localhost, etc.)
        }

        const now = Date.now();
        const tokenData = this.tokenCache.get(identifier);

        // Clean up old entries
        this.cleanup(now);

        if (!tokenData) {
            // First request for this identifier
            this.tokenCache.set(identifier, { count: 1, timestamp: now });
            return {
                success: true,
                remaining: this.uniqueTokenPerInterval - 1,
                reset: now + this.interval,
            };
        }

        if (now - tokenData.timestamp > this.interval) {
            // Reset the counter if interval has passed
            this.tokenCache.set(identifier, { count: 1, timestamp: now });
            return {
                success: true,
                remaining: this.uniqueTokenPerInterval - 1,
                reset: now + this.interval,
            };
        }

        if (tokenData.count >= this.uniqueTokenPerInterval) {
            // Rate limit exceeded
            return {
                success: false,
                remaining: 0,
                reset: tokenData.timestamp + this.interval,
            };
        }

        // Increment counter
        tokenData.count++;
        return {
            success: true,
            remaining: this.uniqueTokenPerInterval - tokenData.count,
            reset: tokenData.timestamp + this.interval,
        };
    };

    private cleanup(now: number) {
        for (const [key, value] of this.tokenCache.entries()) {
            if (now - value.timestamp > this.interval) {
                this.tokenCache.delete(key);
            }
        }
    }
}

// Contact form rate limiter: 3 requests per 15 minutes
export const rateLimit = new RateLimiter({
    interval: 15 * 60 * 1000, // 15 minutes
    uniqueTokenPerInterval: 3, // 3 requests per interval
});

// Utility function to get client IP
export function getClientIP(request: NextRequest | Request): string {
    // Try different headers for IP
    const forwarded = request.headers.get("x-forwarded-for");
    const realIp = request.headers.get("x-real-ip");
    const cfConnectingIp = request.headers.get("cf-connecting-ip");

    if (forwarded) {
        return forwarded.split(",")[0].trim();
    }

    if (realIp) {
        return realIp;
    }

    if (cfConnectingIp) {
        return cfConnectingIp;
    }

    return "unknown";
}
