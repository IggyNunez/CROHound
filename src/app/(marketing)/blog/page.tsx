import { Badge } from "@/components/ui/badge";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import type { Metadata } from "next";
import { getAllPosts, getCategories } from "@/lib/mdx";
import { Calendar, Clock, User, ArrowRight } from "lucide-react";
import { Hero } from "@/components/sections/Hero";

export const metadata: Metadata = {
    title: "Shopify CRO Blog - Conversion Optimization Tips & Strategies",
    description:
        "Learn Shopify conversion optimization strategies, quick wins, and best practices from CROHound's conversion experts.",
};

function formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });
}

function getCategoryColor(category: string): string {
    const colors: Record<string, string> = {
        "Shopify CRO":
            "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
        "A/B Testing":
            "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
        "Quick Wins":
            "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
        "Case Studies":
            "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
        Technical:
            "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
        "Product Pages":
            "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300",
        Checkout:
            "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-300",
    };
    return (
        colors[category] ||
        "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
    );
}

export default async function BlogPage() {
    const posts = await getAllPosts();
    const categories = await getCategories();

    const heroVariant = {
        badge: "Conversion Optimization Content",
        title: "Shopify CRO Blog",
        description:
            "Conversion optimization tips, strategies, and case studies to help you boost your Shopify store's performance.",
        backgroundVariant: "gradient" as const,
        size: "default" as const,
    };

    const featuredPosts = posts
        .filter((post) => post.meta.featured)
        .slice(0, 2);
    const regularPosts = posts.filter((post) => !post.meta.featured);

    return (
        <div className="flex flex-col">
            {/* Hero Section */}
            <Hero {...heroVariant} />

            {/* Featured Posts Section */}
            {featuredPosts.length > 0 && (
                <section className="py-16 md:py-24">
                    <div className="container px-4 md:px-6">
                        <div className="flex items-center justify-between mb-12">
                            <div>
                                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl mb-4">
                                    Featured Articles
                                </h2>
                                <p className="text-lg text-muted-foreground max-w-2xl">
                                    Our most impactful conversion optimization
                                    insights and case studies.
                                </p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            {featuredPosts.map((post) => (
                                <Card
                                    key={post.slug}
                                    className="h-full group hover:shadow-lg transition-all duration-300"
                                >
                                    <CardHeader className="space-y-4">
                                        <div className="flex items-center justify-between">
                                            <Badge
                                                variant="secondary"
                                                className={getCategoryColor(
                                                    post.meta.category
                                                )}
                                            >
                                                {post.meta.category}
                                            </Badge>
                                            <Badge
                                                variant="outline"
                                                className="border-primary text-primary"
                                            >
                                                ⭐ Featured
                                            </Badge>
                                        </div>

                                        <CardTitle className="text-2xl group-hover:text-primary transition-colors">
                                            <Link
                                                href={`/blog/${post.slug}`}
                                                className="block"
                                            >
                                                {post.meta.title}
                                            </Link>
                                        </CardTitle>

                                        <CardDescription className="text-base leading-relaxed">
                                            {post.meta.description}
                                        </CardDescription>
                                    </CardHeader>

                                    <CardContent className="space-y-4">
                                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                            <div className="flex items-center gap-1">
                                                <User className="h-4 w-4" />
                                                {post.meta.author}
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <Calendar className="h-4 w-4" />
                                                {formatDate(
                                                    post.meta.publishedAt
                                                )}
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <Clock className="h-4 w-4" />
                                                {post.meta.readingTime}
                                            </div>
                                        </div>

                                        <Link
                                            href={`/blog/${post.slug}`}
                                            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium group/link transition-colors"
                                        >
                                            Read Full Article
                                            <ArrowRight className="h-4 w-4 group-hover/link:translate-x-1 transition-transform" />
                                        </Link>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* All Posts Section */}
            <section
                className={`py-16 md:py-24 ${
                    featuredPosts.length > 0 ? "bg-muted/50" : ""
                }`}
            >
                <div className="container px-4 md:px-6">
                    <div className="flex items-center justify-between mb-12">
                        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                            {featuredPosts.length > 0
                                ? "All Articles"
                                : "Latest Articles"}
                        </h2>

                        {/* Category Filter - Future Enhancement */}
                        <div className="hidden md:flex items-center gap-2">
                            <span className="text-sm text-muted-foreground">
                                Categories:
                            </span>
                            {categories.slice(0, 3).map((category) => (
                                <Badge
                                    key={category}
                                    variant="outline"
                                    className="text-xs"
                                >
                                    {category}
                                </Badge>
                            ))}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {(featuredPosts.length > 0 ? regularPosts : posts).map(
                            (post) => (
                                <Card
                                    key={post.slug}
                                    className="h-full group hover:shadow-md transition-all duration-300"
                                >
                                    <CardHeader className="space-y-3">
                                        <Badge
                                            variant="outline"
                                            className={getCategoryColor(
                                                post.meta.category
                                            )}
                                        >
                                            {post.meta.category}
                                        </Badge>

                                        <CardTitle className="text-xl group-hover:text-primary transition-colors">
                                            <Link
                                                href={`/blog/${post.slug}`}
                                                className="block"
                                            >
                                                {post.meta.title}
                                            </Link>
                                        </CardTitle>

                                        <CardDescription className="line-clamp-3">
                                            {post.meta.description}
                                        </CardDescription>
                                    </CardHeader>

                                    <CardContent className="space-y-4">
                                        <div className="flex items-center gap-3 text-sm text-muted-foreground">
                                            <div className="flex items-center gap-1">
                                                <Calendar className="h-3 w-3" />
                                                {formatDate(
                                                    post.meta.publishedAt
                                                )}
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <Clock className="h-3 w-3" />
                                                {post.meta.readingTime}
                                            </div>
                                        </div>

                                        <Link
                                            href={`/blog/${post.slug}`}
                                            className="inline-flex items-center gap-2 text-sm text-primary hover:text-primary/80 font-medium group/link transition-colors"
                                        >
                                            Read More
                                            <ArrowRight className="h-3 w-3 group-hover/link:translate-x-1 transition-transform" />
                                        </Link>
                                    </CardContent>
                                </Card>
                            )
                        )}
                    </div>

                    {posts.length === 0 && (
                        <div className="text-center py-16">
                            <p className="text-lg text-muted-foreground mb-4">
                                No blog posts found. Check back soon for
                                conversion optimization insights!
                            </p>
                            <Link
                                href="/contact"
                                className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium"
                            >
                                Get Your Free CRO Audit Instead
                                <ArrowRight className="h-4 w-4" />
                            </Link>
                        </div>
                    )}
                </div>
            </section>

            {/* Newsletter CTA */}
            <section className="py-16 md:py-24">
                <div className="container px-4 md:px-6">
                    <div className="max-w-2xl mx-auto text-center space-y-8 bg-primary/5 rounded-2xl p-12">
                        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                            Want More CRO Insights?
                        </h2>
                        <p className="text-lg text-muted-foreground">
                            Get a free conversion audit of your Shopify store
                            and discover exactly how to increase your conversion
                            rate.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                href="/contact"
                                className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-3 rounded-md font-medium transition-colors"
                            >
                                Get Free CRO Audit
                                <ArrowRight className="h-4 w-4" />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
