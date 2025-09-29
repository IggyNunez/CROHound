import type { NextConfig } from "next";
import createMDX from "@next/mdx";
import bundleAnalyzer from "@next/bundle-analyzer";

const withBundleAnalyzer = bundleAnalyzer({
    enabled: process.env.ANALYZE === "true",
});

const nextConfig: NextConfig = {
    pageExtensions: ["ts", "tsx", "mdx"],

    // Image optimization configuration
    images: {
        formats: ["image/avif", "image/webp"],
        domains: ["www.crohound.com"],
        dangerouslyAllowSVG: true,
        contentSecurityPolicy:
            "default-src 'self'; script-src 'none'; sandbox;",
        deviceSizes: [640, 750, 828, 1080, 1200, 1920],
        imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    },

    // Experimental optimizations
    experimental: {
        optimizeCss: true,
        optimizePackageImports: ["lucide-react", "framer-motion"],
    },

    // Bundle optimization
    webpack: (config, { dev, isServer }) => {
        // Optimize bundle splitting
        if (!dev && !isServer) {
            config.optimization.splitChunks = {
                ...config.optimization.splitChunks,
                cacheGroups: {
                    default: false,
                    vendors: false,
                    // Vendor chunk for React/Next.js
                    framework: {
                        chunks: "all",
                        name: "framework",
                        test: /(?<!node_modules.*)[\\/]node_modules[\\/](react|react-dom|next)[\\/]/,
                        priority: 40,
                        enforce: true,
                    },
                    // UI libraries
                    ui: {
                        chunks: "all",
                        name: "ui",
                        test: /[\\/]node_modules[\\/](@radix-ui|lucide-react|class-variance-authority|clsx|tailwind-merge)[\\/]/,
                        priority: 30,
                        enforce: true,
                    },
                    // Form libraries
                    forms: {
                        chunks: "all",
                        name: "forms",
                        test: /[\\/]node_modules[\\/](react-hook-form|@hookform|zod)[\\/]/,
                        priority: 25,
                        enforce: true,
                    },
                    // Heavy libraries (loaded on demand)
                    heavy: {
                        chunks: "async",
                        name: "heavy",
                        test: /[\\/]node_modules[\\/](framer-motion)[\\/]/,
                        priority: 20,
                        enforce: true,
                    },
                    // Commons chunk for shared modules
                    commons: {
                        chunks: "all",
                        name: "commons",
                        minChunks: 2,
                        priority: 10,
                        enforce: true,
                    },
                },
            };
        }
        return config;
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

export default withBundleAnalyzer(withMDX(nextConfig));
