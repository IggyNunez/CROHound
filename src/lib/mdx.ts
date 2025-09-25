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

// Get the blog directory path
const blogDirectory = path.join(process.cwd(), "src/content/blog");

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
export async function getAllPosts(): Promise<BlogPost[]> {
    if (!blogExists) return [];

    const slugs = getAllPostSlugs();
    const posts = await Promise.all(
        slugs.map(async (slug) => await getPostBySlug(slug))
    );

    return posts
        .filter((post): post is BlogPost => post !== null)
        .sort(
            (a, b) =>
                new Date(b.meta.publishedAt).getTime() -
                new Date(a.meta.publishedAt).getTime()
        );
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
