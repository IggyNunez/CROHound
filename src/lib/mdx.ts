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
    featured?: boolean;
}

export interface BlogPost {
    slug: string;
    meta: BlogPostMeta;
    content: string;
}

// Get the blog directory path
const blogDirectory = path.join(process.cwd(), "content/blog");

// Check if blog directory exists, if not return empty arrays
const blogExists = fs.existsSync(blogDirectory);

// Get all blog post slugs
export function getAllPostSlugs(): string[] {
    if (!blogExists) return [];

    return fs
        .readdirSync(blogDirectory)
        .filter((file) => file.endsWith(".mdx"))
        .map((file) => file.replace(".mdx", ""));
}

// Get blog post by slug
export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
    if (!blogExists) return null;

    try {
        const fullPath = path.join(blogDirectory, `${slug}.mdx`);

        if (!fs.existsSync(fullPath)) {
            return null;
        }

        const fileContents = fs.readFileSync(fullPath, "utf8");
        const { data, content } = matter(fileContents);

        return {
            slug,
            meta: data as BlogPostMeta,
            content,
        };
    } catch (error) {
        console.error(`Error reading blog post ${slug}:`, error);
        return null;
    }
}

// Get all blog posts
// Calculate reading time
function calculateReadingTime(content: string): string {
    const wordsPerMinute = 200;
    const wordCount = content.trim().split(/\s+/).length;
    const minutes = Math.ceil(wordCount / wordsPerMinute);
    return `${minutes} min read`;
}

export async function getAllPosts(): Promise<BlogPost[]> {
    if (!blogExists) return [];

    const slugs = getAllPostSlugs();
    const posts = await Promise.all(
        slugs.map(async (slug) => await getPostBySlug(slug))
    );

    return posts
        .filter((post): post is BlogPost => post !== null)
        .map((post) => ({
            ...post,
            meta: {
                ...post.meta,
                readingTime:
                    post.meta.readingTime || calculateReadingTime(post.content),
            },
        }))
        .sort(
            (a, b) =>
                new Date(b.meta.publishedAt).getTime() -
                new Date(a.meta.publishedAt).getTime()
        );
}

// Get featured posts
export async function getFeaturedPosts(limit = 3): Promise<BlogPost[]> {
    const allPosts = await getAllPosts();
    return allPosts.filter((post) => post.meta.featured).slice(0, limit);
}

// Get posts by category
export async function getPostsByCategory(
    category: string
): Promise<BlogPost[]> {
    const allPosts = await getAllPosts();
    return allPosts.filter(
        (post) => post.meta.category.toLowerCase() === category.toLowerCase()
    );
}

// Get all unique categories
export async function getCategories(): Promise<string[]> {
    const allPosts = await getAllPosts();
    const categories = new Set(allPosts.map((post) => post.meta.category));
    return Array.from(categories).sort();
}

// Get all unique tags
export async function getTags(): Promise<string[]> {
    const allPosts = await getAllPosts();
    const tags = new Set(allPosts.flatMap((post) => post.meta.tags || []));
    return Array.from(tags).sort();
}

// Compile MDX content
export async function compileMDXContent(content: string) {
    const { content: compiledContent } = await compileMDX({
        source: content,
        options: {
            parseFrontmatter: true,
            mdxOptions: {
                remarkPlugins: [remarkGfm],
                rehypePlugins: [
                    rehypeSlug,
                    [rehypeAutolinkHeadings, { behavior: "wrap" }],
                    [
                        rehypePrettyCode,
                        {
                            theme: {
                                dark: "github-dark",
                                light: "github-light",
                            },
                            keepBackground: false,
                        },
                    ],
                ],
            },
        },
    });

    return compiledContent;
}
