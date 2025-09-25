// src/types/index.ts - Clean type definitions only
export interface NavItem {
    label: string;
    href: string;
    description?: string;
    icon?: React.ComponentType<{ className?: string }>;
}

export interface Service {
    id: string;
    title: string;
    description: string;
    price: string;
    features: string[];
    highlighted?: boolean;
}

export interface CaseStudy {
    id: string;
    slug: string;
    title: string;
    client: string;
    industry: string;
    results: {
        metric: string;
        value: string;
        improvement: number;
    }[];
    summary: string;
    image?: string;
}

export interface TeamMember {
    name: string;
    role: string;
    bio: string;
    image?: string;
    linkedin?: string;
}

export interface Package {
    id: string;
    name: string;
    price: string;
    description: string;
    features: string[];
    highlighted?: boolean;
    cta: string;
    popular?: boolean;
}

export interface BlogPost {
    slug: string;
    title: string;
    description: string;
    publishedAt: string;
    author: string;
    category: string;
    tags: string[];
    readingTime?: string;
    image?: string;
    content: string;
}

export interface ContactForm {
    name: string;
    email: string;
    company?: string;
    message: string;
    budget?: string;
    services?: string[];
}

export interface StructuredDataType {
    "@context": string;
    "@type": string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
}

// Environment variable validation
export interface EnvConfig {
    GA_ID?: string;
    CLARITY_ID?: string;
    SITE_URL: string;
    ADMIN_EMAIL: string;
    EMAIL_API_KEY?: string;
}
