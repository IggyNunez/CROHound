// Navigation data
export const NAVIGATION_ITEMS = [
    { label: "Services", href: "/services" },
    { label: "Packages", href: "/packages" },
    { label: "Case Studies", href: "/case-studies" },
    { label: "Blog", href: "/blog" },
    { label: "About", href: "/about" },
] as const;

// Company information
export const COMPANY_INFO = {
    name: "CROHound",
    tagline: "Shopify CRO & Conversion Optimization",
    description:
        "Turn more Shopify visitors into buyers without adding ad spend. We run lean CRO programs for $5k–$50k/mo stores.",
    email: "hello@crohound.com",
    website: "https://www.crohound.com",
} as const;

// CRO Services data
export const CRO_SERVICES = {
    audit: {
        title: "Conversion Rate Audit",
        description:
            "Comprehensive analysis of your Shopify store's conversion barriers and opportunities.",
        timeline: "3-5 business days",
        deliverable: "Detailed report + 30-min strategy call",
        features: [
            "Technical performance analysis (Core Web Vitals, page speed)",
            "User experience flow mapping",
            "Checkout process optimization review",
            "Product page conversion analysis",
            "Mobile responsiveness audit",
            "Prioritized action plan with ROI estimates",
        ],
    },
    abTesting: {
        title: "A/B Testing & Optimization",
        description:
            "Data-driven testing to validate changes and maximize conversion improvements.",
        timeline: "2-4 weeks per test",
        requirement: "Minimum 1,000 visitors/week for statistical significance",
        features: [
            "Hypothesis development based on data",
            "Test design and implementation",
            "Statistical significance monitoring",
            "Results analysis and recommendations",
            "Winner implementation",
            "Knowledge transfer and documentation",
        ],
    },
    technical: {
        title: "Technical Performance Optimization",
        description:
            "Speed optimization and technical improvements to reduce bounce rates.",
        timeline: "1-2 weeks",
        guarantee: "Minimum 20% improvement in page speed",
        features: [
            "Page speed optimization (target: <3s load time)",
            "Core Web Vitals improvement",
            "Image optimization and compression",
            "Code minification and cleanup",
            "Third-party app audit and optimization",
            "Mobile performance enhancement",
        ],
    },
    ux: {
        title: "User Experience Optimization",
        description:
            "Design and flow improvements to reduce friction and increase conversions.",
        timeline: "2-3 weeks",
        includes: "Wireframes, mockups, and implementation",
        features: [
            "Navigation and menu optimization",
            "Product page layout improvements",
            "Checkout flow streamlining",
            "Trust signal placement and optimization",
            "Call-to-action button optimization",
            "Mobile user experience enhancement",
        ],
    },
} as const;

// Package pricing and features
export const PACKAGES = {
    free: {
        name: "Free Sniff Check",
        price: "$0",
        subtitle: "Perfect for getting started",
        features: [
            { included: true, text: "12-point conversion audit" },
            { included: true, text: "5-minute Loom walkthrough" },
            { included: true, text: "Quick wins checklist" },
            { included: true, text: "Prioritized recommendations" },
            { included: false, text: "Implementation support" },
            { included: false, text: "Monthly monitoring" },
        ],
        cta: "Get Your Free Audit",
        note: "No credit card required • 48-hour delivery",
    },
    monthly: {
        name: "Monthly CRO",
        price: "$2.5k-$5k",
        subtitle: "/month • 3-month minimum",
        popular: true,
        features: [
            { included: true, text: "Everything in Free Sniff Check" },
            { included: true, text: "Up to 10 dev hours/month" },
            { included: true, text: "A/B testing & analysis" },
            { included: true, text: "Monthly performance reports" },
            { included: true, text: "Slack/email support" },
            { included: true, text: "Quarterly strategy reviews" },
        ],
        cta: "Start Monthly Program",
        note: "Best for stores with $5k-$50k monthly revenue",
    },
    project: {
        name: "Project-Based",
        price: "$5k-$15k",
        subtitle: "One-time engagement",
        features: [
            { included: true, text: "Complete site overhaul" },
            { included: true, text: "Custom optimization strategy" },
            { included: true, text: "Full implementation" },
            { included: true, text: "3-month follow-up support" },
            { included: true, text: "Knowledge transfer sessions" },
            { included: true, text: "Performance guarantees" },
        ],
        cta: "Discuss Project",
        note: "Best for major site redesigns or migrations",
    },
} as const;

// CRO Process steps
export const CRO_PROCESS = [
    {
        step: 1,
        title: "Audit & Analysis",
        description:
            "Comprehensive review of your current setup, identifying conversion barriers and opportunities.",
    },
    {
        step: 2,
        title: "Strategy Development",
        description:
            "Create a prioritized roadmap based on impact potential and implementation complexity.",
    },
    {
        step: 3,
        title: "Implementation & Testing",
        description:
            "Execute optimizations with proper A/B testing to validate each change before full rollout.",
    },
    {
        step: 4,
        title: "Monitor & Iterate",
        description:
            "Continuous monitoring and refinement to ensure sustained improvement and growth.",
    },
] as const;

// What's not included (services we don't offer)
export const NOT_INCLUDED_SERVICES = [
    "Paid advertising management",
    "SEO content creation",
    "Social media management",
    "Email marketing campaigns",
    "App development",
    "Product photography",
] as const;

// Sniff Check deliverables
export const SNIFF_CHECK_DELIVERABLES = [
    {
        icon: "📊",
        title: "12-Point Audit",
        description: "Comprehensive review of your site's conversion elements",
    },
    {
        icon: "🎥",
        title: "5-Min Loom",
        description:
            "Personal walkthrough highlighting key issues and opportunities",
    },
    {
        icon: "✅",
        title: "Quick Wins List",
        description: "Actionable items you can implement immediately",
    },
] as const;

// Form validation messages
export const FORM_MESSAGES = {
    success: {
        title: "Success! Your Sniff Check is on the way 🐕",
        description:
            "We've received your request and will send your free audit within 48 hours. Check your email for confirmation.",
        note: "Questions? Email us at hello@crohound.com",
    },
    loading: "Submitting...",
    cta: "Get My Free Sniff Check →",
    disclaimer:
        "No spam, no commitment. You'll receive your audit within 48 hours.",
} as const;

// Revenue ranges for contact form
export const REVENUE_RANGES = [
    { value: "0-5k", label: "$0 - $5k" },
    { value: "5k-15k", label: "$5k - $15k" },
    { value: "15k-50k", label: "$15k - $50k" },
    { value: "50k-100k", label: "$50k - $100k" },
    { value: "100k+", label: "$100k+" },
] as const;

// Email checklist for contact page
export const EMAIL_CHECKLIST = [
    "Your Shopify store URL",
    "Monthly traffic volume (if known)",
    "Current conversion rate (if known)",
    "Main conversion goals (sales, signups, etc.)",
    "Any specific concerns or bottlenecks",
] as const;
