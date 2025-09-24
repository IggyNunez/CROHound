import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { compileMDX } from "next-mdx-remote/rsc";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import remarkGfm from "remark-gfm";
import rehypePrettyCode from "rehype-pretty-code";

// Blog post type definitions
export interface BlogPostMeta {
    title: string;
    description: string;
    publishedAt: string;
    author: string;
    category: string;
    tags: string[];
    readingTime?: string;
    image?: string;
}

export interface BlogPost {
    slug: string;
    meta: BlogPostMeta;
    content: string;
}

const blogDirectory = path.join(process.cwd(), "src/content/blog");

// Get all blog post slugs
export function getAllPostSlugs(): string[] {
    try {
        const files = fs.readdirSync(blogDirectory);
        return files
            .filter((file) => file.endsWith(".mdx"))
            .map((file) => file.replace(".mdx", ""));
    } catch (error) {
        console.error("Error reading blog directory:", error);
        return [];
    }
}

// Get blog post by slug
export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
    try {
        const fullPath = path.join(blogDirectory, `${slug}.mdx`);
        const fileContent = fs.readFileSync(fullPath, "utf8");

        const { data, content } = matter(fileContent);

        // Calculate reading time
        const wordsPerMinute = 200;
        const words = content.split(/\s+/g).length;
        const readingTime = `${Math.ceil(words / wordsPerMinute)} min read`;

        return {
            slug,
            meta: {
                ...(data as BlogPostMeta),
                readingTime,
            },
            content,
        };
    } catch (error) {
        console.error(`Error reading post ${slug}:`, error);
        return null;
    }
}

// Get all blog posts with metadata
export async function getAllPosts(): Promise<BlogPost[]> {
    const slugs = getAllPostSlugs();
    const posts = await Promise.all(slugs.map((slug) => getPostBySlug(slug)));

    return posts
        .filter((post): post is BlogPost => post !== null)
        .sort((a, b) => {
            const dateA = new Date(a.meta.publishedAt);
            const dateB = new Date(b.meta.publishedAt);
            return dateB.getTime() - dateA.getTime();
        });
}

// Get posts by category
export async function getPostsByCategory(
    category: string
): Promise<BlogPost[]> {
    const posts = await getAllPosts();
    return posts.filter(
        (post) => post.meta.category.toLowerCase() === category.toLowerCase()
    );
}

// Get posts by tag
export async function getPostsByTag(tag: string): Promise<BlogPost[]> {
    const posts = await getAllPosts();
    return posts.filter((post) =>
        post.meta.tags.some((t) => t.toLowerCase() === tag.toLowerCase())
    );
}

// Compile MDX content
export async function compileMDXContent(content: string) {
    const { content: compiledContent } = await compileMDX({
        source: content,
        options: {
            mdxOptions: {
                remarkPlugins: [remarkGfm],
                rehypePlugins: [
                    rehypeSlug,
                    [rehypeAutolinkHeadings, { behavior: "wrap" }],
                    [rehypePrettyCode, { theme: "github-dark" }],
                ],
            },
        },
    });

    return compiledContent;
}

// src/app/(marketing)/blog/[slug]/page.tsx
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { getPostBySlug, getAllPostSlugs, compileMDXContent } from "@/lib/mdx";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, User } from "lucide-react";
import Link from "next/link";

type Props = {
    params: Promise<{ slug: string }>;
};

// Generate static params for all blog posts
export async function generateStaticParams() {
    const slugs = getAllPostSlugs();
    return slugs.map((slug) => ({ slug }));
}

// Generate metadata for SEO
export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const post = await getPostBySlug(slug);

    if (!post) {
        return {
            title: "Post Not Found | CROHound Blog",
        };
    }

    return {
        title: `${post.meta.title} | CROHound Blog`,
        description: post.meta.description,
        openGraph: {
            title: post.meta.title,
            description: post.meta.description,
            type: "article",
            publishedTime: post.meta.publishedAt,
            authors: [post.meta.author],
            images: post.meta.image ? [post.meta.image] : undefined,
        },
        twitter: {
            card: "summary_large_image",
            title: post.meta.title,
            description: post.meta.description,
            images: post.meta.image ? [post.meta.image] : undefined,
        },
    };
}

export default async function BlogPostPage({ params }: Props) {
    const { slug } = await params;
    const post = await getPostBySlug(slug);

    if (!post) {
        notFound();
    }

    const content = await compileMDXContent(post.content);
    const publishDate = new Date(post.meta.publishedAt);

    return (
        <article className="container px-4 md:px-6 py-16 md:py-24">
            <div className="max-w-4xl mx-auto">
                {/* Post Header */}
                <header className="mb-12 text-center">
                    <div className="flex items-center justify-center gap-2 mb-6">
                        <Badge variant="outline">{post.meta.category}</Badge>
                        {post.meta.tags.slice(0, 2).map((tag) => (
                            <Badge key={tag} variant="secondary">
                                {tag}
                            </Badge>
                        ))}
                    </div>

                    <h1 className="text-4xl md:text-5xl font-bold mb-6">
                        {post.meta.title}
                    </h1>

                    <p className="text-xl text-muted-foreground mb-8">
                        {post.meta.description}
                    </p>

                    <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                            <User className="h-4 w-4" />
                            <span>{post.meta.author}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4" />
                            <time dateTime={post.meta.publishedAt}>
                                {publishDate.toLocaleDateString("en-US", {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                })}
                            </time>
                        </div>
                        <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4" />
                            <span>{post.meta.readingTime}</span>
                        </div>
                    </div>
                </header>

                {/* Post Content */}
                <div className="prose prose-gray dark:prose-invert lg:prose-lg mx-auto">
                    {content}
                </div>

                {/* Post Footer */}
                <footer className="mt-16 pt-8 border-t">
                    <div className="flex items-center justify-between">
                        <Link
                            href="/blog"
                            className="text-sm text-muted-foreground hover:text-primary transition-colors"
                        >
                            ← Back to Blog
                        </Link>
                        <Link
                            href="/contact"
                            className="text-sm font-medium text-primary hover:underline"
                        >
                            Get Your Free Sniff Check →
                        </Link>
                    </div>
                </footer>
            </div>
        </article>
    );
}

// Example MDX blog post: src/content/blog/shopify-cro-sniff-check.mdx
/*
---
title: "12-Point Shopify CRO 'Sniff Check'"
description: "The exact checklist we use to audit Shopify stores for conversion optimization opportunities."
publishedAt: "2024-01-15"
author: "CROHound Team"
category: "CRO Strategy"
tags: ["audit", "conversion optimization", "shopify"]
image: "/blog/sniff-check-hero.jpg"
---

## Introduction

Every Shopify store is leaving money on the table. The question is: how much?

Our 12-point Sniff Check has uncovered an average of **23% conversion rate improvement potential** across the hundreds of stores we've audited.

## The 12-Point Checklist

### 1. Page Load Speed (Target: <3 seconds)

Your store's speed directly impacts conversions. Studies show:
- 1-second delay = 7% reduction in conversions
- 3+ seconds = 53% mobile visitors bounce

**Quick Check:** Use Google PageSpeed Insights. Score below 50? You're losing sales.

### 2. Mobile-First Design

With 72% of Shopify traffic on mobile, your mobile experience IS your experience.

**Red Flags:**
- Text too small to read without zooming
- Buttons too close together
- Horizontal scrolling required
- Pop-ups covering content

[Continue with remaining points...]
*/
