import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
    pageExtensions: ["ts", "tsx", "mdx"],

    // Image optimization configuration
    images: {
        formats: ["image/avif", "image/webp"],
        domains: ["www.crohound.com"],
        dangerouslyAllowSVG: true,
        contentSecurityPolicy:
            "default-src 'self'; script-src 'none'; sandbox;",
    },

    // Experimental optimizations
    experimental: {
        optimizeCss: true,
    },

    // Performance headers for static assets
    async headers() {
        return [
            // Cache static assets
            {
                source: "/:all*(svg|jpg|jpeg|png|gif|ico|webp|avif)",
                headers: [
                    {
                        key: "Cache-Control",
                        value: "public, max-age=31536000, immutable",
                    },
                ],
            },
            // Cache fonts
            {
                source: "/:all*(woff|woff2|eot|ttf|otf)",
                headers: [
                    {
                        key: "Cache-Control",
                        value: "public, max-age=31536000, immutable",
                    },
                ],
            },
            // Security headers for all pages
            {
                source: "/(.*)",
                headers: [
                    {
                        key: "X-Frame-Options",
                        value: "SAMEORIGIN",
                    },
                    {
                        key: "X-Content-Type-Options",
                        value: "nosniff",
                    },
                    {
                        key: "Referrer-Policy",
                        value: "strict-origin-when-cross-origin",
                    },
                    {
                        key: "X-DNS-Prefetch-Control",
                        value: "on",
                    },
                    {
                        key: "Strict-Transport-Security",
                        value: "max-age=31536000; includeSubDomains",
                    },
                    {
                        key: "Content-Security-Policy",
                        value: "default-src 'self'; script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.clarity.ms; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' https://www.google-analytics.com https://analytics.google.com; frame-ancestors 'self';",
                    },
                ],
            },
        ];
    },

    // Compress output
    compress: true,
};

const withMDX = createMDX({
    extension: /\.mdx?$/,
    options: {
        // Add remark and rehype plugins here if needed
    },
});

export default withMDX(nextConfig);
