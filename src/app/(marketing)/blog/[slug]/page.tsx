import { notFound } from "next/navigation";
import { Metadata } from "next";
import { compileMDXContent, getPostBySlug, getAllPostSlugs } from "@/lib/mdx";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, User, ArrowLeft, BookOpen } from "lucide-react";
import Link from "next/link";
import { BlogPostSchema } from "@/components/StructuredData";
import ShareButton from "@/components/ShareButton";

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

type Props = {
    params: Promise<{ slug: string }>;
};

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
            tags: post.meta.tags,
        },
        twitter: {
            card: "summary_large_image",
            title: post.meta.title,
            description: post.meta.description,
        },
    };
}

// Generate static params for all blog posts
export async function generateStaticParams() {
    const slugs = getAllPostSlugs();
    return slugs.map((slug) => ({
        slug: slug,
    }));
}

export default async function BlogPostPage({ params }: Props) {
    const { slug } = await params;
    const post = await getPostBySlug(slug);

    if (!post) {
        notFound();
    }

    const compiledContent = await compileMDXContent(post.content);

    return (
        <>
            {/* Structured Data */}
            <BlogPostSchema
                title={post.meta.title}
                description={post.meta.description}
                publishedAt={post.meta.publishedAt}
                author={post.meta.author}
                category={post.meta.category}
                slug={slug}
                image={post.meta.image}
                readingTime={post.meta.readingTime}
            />

            <div className="min-h-screen bg-background">
                {/* Back Navigation */}
                <div className="border-b">
                    <div className="container px-4 md:px-6 py-4">
                        <Link
                            href="/blog"
                            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
                        >
                            <ArrowLeft className="h-4 w-4" />
                            Back to Blog
                        </Link>
                    </div>
                </div>

                {/* Article Header */}
                <div className="container px-4 md:px-6 py-16 md:py-24">
                    <div className="max-w-4xl mx-auto">
                        <header className="mb-12 space-y-8">
                            {/* Category and Meta */}
                            <div className="flex flex-wrap items-center gap-4">
                                <Badge
                                    className={getCategoryColor(
                                        post.meta.category
                                    )}
                                >
                                    {post.meta.category}
                                </Badge>

                                {post.meta.featured && (
                                    <Badge
                                        variant="outline"
                                        className="border-primary text-primary"
                                    >
                                        ⭐ Featured
                                    </Badge>
                                )}

                                <div className="flex items-center gap-4 text-sm text-muted-foreground ml-auto">
                                    <div className="flex items-center gap-1">
                                        <Calendar className="h-4 w-4" />
                                        {formatDate(post.meta.publishedAt)}
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Clock className="h-4 w-4" />
                                        {post.meta.readingTime}
                                    </div>
                                </div>
                            </div>

                            {/* Title */}
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight">
                                {post.meta.title}
                            </h1>

                            {/* Description */}
                            <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl">
                                {post.meta.description}
                            </p>

                            {/* Author and Actions */}
                            <div className="flex items-center justify-between pt-8 border-t">
                                <div className="flex items-center gap-3">
                                    <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center">
                                        <User className="h-5 w-5 text-primary" />
                                    </div>
                                    <div>
                                        <p className="font-medium">
                                            {post.meta.author}
                                        </p>
                                        <p className="text-sm text-muted-foreground">
                                            CRO Expert
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2">
                                    <ShareButton
                                        title={post.meta.title}
                                        description={post.meta.description}
                                    />
                                </div>
                            </div>
                        </header>

                        {/* Article Content */}
                        <article className="prose prose-gray dark:prose-invert lg:prose-lg xl:prose-xl mx-auto max-w-none">
                            <div className="prose-headings:font-bold prose-headings:tracking-tight prose-h1:text-4xl prose-h2:text-3xl prose-h3:text-2xl prose-h4:text-xl prose-p:leading-relaxed prose-li:leading-relaxed prose-blockquote:border-l-primary prose-blockquote:bg-primary/5 prose-blockquote:py-4 prose-blockquote:px-6 prose-blockquote:rounded-r-lg prose-code:bg-muted prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:font-mono prose-code:text-sm prose-pre:bg-muted prose-pre:border prose-a:text-primary prose-a:no-underline hover:prose-a:underline">
                                {compiledContent}
                            </div>
                        </article>

                        {/* Tags */}
                        {post.meta.tags && post.meta.tags.length > 0 && (
                            <div className="mt-12 pt-8 border-t">
                                <h3 className="text-sm font-medium text-muted-foreground mb-4">
                                    Tags
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {post.meta.tags.map((tag) => (
                                        <Badge
                                            key={tag}
                                            variant="secondary"
                                            className="text-xs"
                                        >
                                            {tag}
                                        </Badge>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Call to Action */}
                <section className="bg-primary/5 py-16 md:py-24">
                    <div className="container px-4 md:px-6">
                        <div className="max-w-2xl mx-auto text-center space-y-8">
                            <div className="space-y-4">
                                <h2 className="text-3xl font-bold tracking-tight">
                                    Ready to Optimize Your Store?
                                </h2>
                                <p className="text-lg text-muted-foreground">
                                    Get a free conversion audit and discover
                                    exactly how to increase your Shopify
                                    store&apos;s conversion rate.
                                </p>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Link
                                    href="/contact"
                                    className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-4 rounded-lg font-medium transition-colors text-lg"
                                >
                                    <BookOpen className="h-5 w-5" />
                                    Get Your Free CRO Audit
                                </Link>

                                <Link
                                    href="/blog"
                                    className="inline-flex items-center justify-center gap-2 border border-border hover:bg-muted px-8 py-4 rounded-lg font-medium transition-colors text-lg"
                                >
                                    Read More Articles
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
}
