import { notFound } from "next/navigation";
import { Metadata } from "next";

interface BlogPost {
    title: string;
    description: string;
    content: string;
}

// This would normally fetch from your blog posts
// For now, it's a placeholder for MDX blog posts
const getBlogPost = (slug: string): BlogPost | null => {
    // In a real implementation, you'd fetch this from your MDX files or CMS
    // Example posts that would be available:
    const posts: Record<string, BlogPost> = {
        "shopify-cro-sniff-check": {
            title: "12-Point Shopify CRO 'Sniff Check'",
            description:
                "The exact checklist we use to audit Shopify stores for conversion optimization opportunities.",
            content: "Blog post content will go here...",
        },
        "pdp-quick-wins": {
            title: "PDP Quick Wins: 7 Changes That Boost Conversions",
            description:
                "Simple product page optimizations you can implement today to increase your conversion rate.",
            content: "Blog post content will go here...",
        },
    };

    return posts[slug] || null;
};

type Props = {
    params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const post = getBlogPost(slug);

    if (!post) {
        return {
            title: "Post Not Found | CROHound Blog",
        };
    }

    return {
        title: `${post.title} | CROHound Blog`,
        description: post.description,
    };
}

export default async function BlogPostPage({ params }: Props) {
    const { slug } = await params;
    const post = getBlogPost(slug);

    if (!post) {
        notFound();
    }

    return (
        <div className="container px-4 md:px-6 py-16 md:py-24">
            <div className="max-w-4xl mx-auto">
                <article className="prose prose-gray dark:prose-invert lg:prose-lg mx-auto">
                    <h1>{post.title}</h1>
                    <p className="lead">{post.description}</p>
                    <div dangerouslySetInnerHTML={{ __html: post.content }} />
                    <p>
                        <em>
                            Note: This is a placeholder structure. To add real
                            blog posts, create MDX files or integrate with your
                            preferred CMS.
                        </em>
                    </p>
                </article>
            </div>
        </div>
    );
}
