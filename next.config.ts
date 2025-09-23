import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
    pageExtensions: ["ts", "tsx", "mdx"],
    /* config options here */
};

const withMDX = createMDX({
    extension: /\.mdx?$/,
});

export default withMDX(nextConfig);
