/**
 * CROHound Design System
 * Centralized design tokens and constants for consistent UI/UX
 */

// === BREAKPOINTS ===
export const BREAKPOINTS = {
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
    "2xl": 1536,
} as const;

export type Breakpoint = keyof typeof BREAKPOINTS;

// === SPACING ===
export const SPACING = {
    // Base spacing unit (4px)
    unit: 4,

    // Spacing scale (based on 4px unit)
    px: 1,
    0.5: 2,
    1: 4,
    1.5: 6,
    2: 8,
    2.5: 10,
    3: 12,
    3.5: 14,
    4: 16,
    5: 20,
    6: 24,
    7: 28,
    8: 32,
    9: 36,
    10: 40,
    11: 44,
    12: 48,
    14: 56,
    16: 64,
    20: 80,
    24: 96,
    28: 112,
    32: 128,
    36: 144,
    40: 160,
    44: 176,
    48: 192,
    52: 208,
    56: 224,
    60: 240,
    64: 256,
    72: 288,
    80: 320,
    96: 384,
} as const;

// === TYPOGRAPHY ===
export const TYPOGRAPHY = {
    fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "ui-monospace", "monospace"],
    },

    fontSize: {
        xs: { size: "0.75rem", lineHeight: "1rem" }, // 12px
        sm: { size: "0.875rem", lineHeight: "1.25rem" }, // 14px
        base: { size: "1rem", lineHeight: "1.5rem" }, // 16px
        lg: { size: "1.125rem", lineHeight: "1.75rem" }, // 18px
        xl: { size: "1.25rem", lineHeight: "1.75rem" }, // 20px
        "2xl": { size: "1.5rem", lineHeight: "2rem" }, // 24px
        "3xl": { size: "1.875rem", lineHeight: "2.25rem" }, // 30px
        "4xl": { size: "2.25rem", lineHeight: "2.5rem" }, // 36px
        "5xl": { size: "3rem", lineHeight: "1" }, // 48px
        "6xl": { size: "3.75rem", lineHeight: "1" }, // 60px
        "7xl": { size: "4.5rem", lineHeight: "1" }, // 72px
        "8xl": { size: "6rem", lineHeight: "1" }, // 96px
        "9xl": { size: "8rem", lineHeight: "1" }, // 128px
    },

    fontWeight: {
        thin: 100,
        extralight: 200,
        light: 300,
        normal: 400,
        medium: 500,
        semibold: 600,
        bold: 700,
        extrabold: 800,
        black: 900,
    },

    letterSpacing: {
        tighter: "-0.05em",
        tight: "-0.025em",
        normal: "0em",
        wide: "0.025em",
        wider: "0.05em",
        widest: "0.1em",
    },

    lineHeight: {
        none: 1,
        tight: 1.25,
        snug: 1.375,
        normal: 1.5,
        relaxed: 1.625,
        loose: 2,
    },
} as const;

// === COLORS ===
export const COLORS = {
    // Brand colors
    brand: {
        primary: "#ef4444", // red-500
        primaryHover: "#dc2626", // red-600
        primaryActive: "#b91c1c", // red-700
        secondary: "#eab308", // yellow-500
        secondaryHover: "#ca8a04", // yellow-600
    },

    // Semantic colors
    success: "#22c55e", // green-500
    warning: "#f59e0b", // amber-500
    error: "#ef4444", // red-500
    info: "#3b82f6", // blue-500

    // Neutral colors
    neutral: {
        50: "#fafafa",
        100: "#f4f4f5",
        200: "#e4e4e7",
        300: "#d4d4d8",
        400: "#a1a1aa",
        500: "#71717a",
        600: "#52525b",
        700: "#3f3f46",
        800: "#27272a",
        900: "#18181b",
        950: "#09090b",
    },
} as const;

// === SHADOWS ===
export const SHADOWS = {
    sm: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
    base: "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
    md: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
    lg: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
    xl: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
    "2xl": "0 25px 50px -12px rgb(0 0 0 / 0.25)",
    inner: "inset 0 2px 4px 0 rgb(0 0 0 / 0.05)",
    none: "0 0 #0000",
} as const;

// === BORDER RADIUS ===
export const BORDER_RADIUS = {
    none: "0px",
    sm: "0.125rem", // 2px
    base: "0.25rem", // 4px
    md: "0.375rem", // 6px
    lg: "0.5rem", // 8px
    xl: "0.75rem", // 12px
    "2xl": "1rem", // 16px
    "3xl": "1.5rem", // 24px
    full: "9999px",
} as const;

// === ANIMATION DURATIONS ===
export const ANIMATION_DURATION = {
    instant: 0,
    fast: 150,
    normal: 300,
    slow: 500,
    slower: 700,
    slowest: 1000,
} as const;

// === ANIMATION EASINGS ===
export const ANIMATION_EASING = {
    linear: "linear",
    ease: "ease",
    easeIn: "ease-in",
    easeOut: "ease-out",
    easeInOut: "ease-in-out",

    // Custom Tailwind-like easings
    bounceIn: "cubic-bezier(0.68, -0.55, 0.265, 1.55)",
    bounceOut: "cubic-bezier(0.175, 0.885, 0.32, 1.275)",
    elastic: "cubic-bezier(0.68, -0.55, 0.265, 1.55)",

    // Modern easing curves
    emphasized: "cubic-bezier(0.2, 0, 0, 1)",
    emphasizedDecelerate: "cubic-bezier(0.05, 0.7, 0.1, 1)",
    emphasizedAccelerate: "cubic-bezier(0.3, 0, 0.8, 0.15)",
    standard: "cubic-bezier(0.2, 0, 0, 1)",
    standardDecelerate: "cubic-bezier(0, 0, 0, 1)",
    standardAccelerate: "cubic-bezier(0.3, 0, 1, 1)",
} as const;

// === Z-INDEX LAYERS ===
export const Z_INDEX = {
    hide: -1,
    auto: "auto",
    base: 0,
    docked: 10,
    dropdown: 1000,
    sticky: 1100,
    banner: 1200,
    overlay: 1300,
    modal: 1400,
    popover: 1500,
    skipLink: 1600,
    toast: 1700,
    tooltip: 1800,
} as const;

// === CONTAINER SIZES ===
export const CONTAINER = {
    sm: "640px",
    md: "768px",
    lg: "1024px",
    xl: "1280px",
    "2xl": "1536px",

    // Content max-widths
    prose: "65ch",
    reading: "75ch",
    content: "1200px",
} as const;

// === COMPONENT VARIANTS ===
export const COMPONENT_VARIANTS = {
    button: {
        size: {
            sm: {
                height: "2rem", // 32px
                padding: "0 0.75rem", // 12px
                fontSize: "0.875rem", // 14px
            },
            md: {
                height: "2.5rem", // 40px
                padding: "0 1rem", // 16px
                fontSize: "1rem", // 16px
            },
            lg: {
                height: "3rem", // 48px
                padding: "0 1.5rem", // 24px
                fontSize: "1.125rem", // 18px
            },
            xl: {
                height: "3.5rem", // 56px
                padding: "0 2rem", // 32px
                fontSize: "1.25rem", // 20px
            },
        },

        variant: {
            primary: {
                backgroundColor: COLORS.brand.primary,
                color: "white",
                hoverBackgroundColor: COLORS.brand.primaryHover,
            },
            secondary: {
                backgroundColor: "transparent",
                color: COLORS.brand.primary,
                border: `1px solid ${COLORS.brand.primary}`,
                hoverBackgroundColor: COLORS.brand.primary,
                hoverColor: "white",
            },
            ghost: {
                backgroundColor: "transparent",
                color: COLORS.neutral[700],
                hoverBackgroundColor: COLORS.neutral[100],
            },
        },
    },

    input: {
        size: {
            sm: {
                height: "2rem",
                padding: "0 0.75rem",
                fontSize: "0.875rem",
            },
            md: {
                height: "2.5rem",
                padding: "0 1rem",
                fontSize: "1rem",
            },
            lg: {
                height: "3rem",
                padding: "0 1.25rem",
                fontSize: "1.125rem",
            },
        },
    },
} as const;

// === GRID SYSTEM ===
export const GRID = {
    columns: 12,
    gutter: {
        sm: SPACING[4], // 16px
        md: SPACING[6], // 24px
        lg: SPACING[8], // 32px
    },
    margin: {
        sm: SPACING[4], // 16px
        md: SPACING[6], // 24px
        lg: SPACING[8], // 32px
    },
} as const;

// === UTILITY FUNCTIONS ===
export const DESIGN_UTILS = {
    // Convert spacing value to CSS
    spacing: (value: keyof typeof SPACING) => `${SPACING[value]}px`,

    // Convert rem to px
    remToPx: (rem: number) => rem * 16,

    // Convert px to rem
    pxToRem: (px: number) => px / 16,

    // Get color with alpha
    withAlpha: (color: string, alpha: number) =>
        `${color}${Math.round(alpha * 255).toString(16)}`,

    // Media query helpers
    mediaQuery: {
        sm: `@media (min-width: ${BREAKPOINTS.sm}px)`,
        md: `@media (min-width: ${BREAKPOINTS.md}px)`,
        lg: `@media (min-width: ${BREAKPOINTS.lg}px)`,
        xl: `@media (min-width: ${BREAKPOINTS.xl}px)`,
        "2xl": `@media (min-width: ${BREAKPOINTS["2xl"]}px)`,

        // Mobile first
        up: (breakpoint: Breakpoint) =>
            `@media (min-width: ${BREAKPOINTS[breakpoint]}px)`,

        // Desktop first
        down: (breakpoint: Breakpoint) =>
            `@media (max-width: ${BREAKPOINTS[breakpoint] - 1}px)`,

        // Between breakpoints
        between: (min: Breakpoint, max: Breakpoint) =>
            `@media (min-width: ${BREAKPOINTS[min]}px) and (max-width: ${
                BREAKPOINTS[max] - 1
            }px)`,
    },
} as const;

// === ACCESSIBILITY ===
export const A11Y = {
    // Focus ring styles
    focusRing: {
        outline: "2px solid transparent",
        outlineOffset: "2px",
        boxShadow: `0 0 0 2px ${COLORS.brand.primary}`,
    },

    // Screen reader only styles
    srOnly: {
        position: "absolute",
        width: "1px",
        height: "1px",
        padding: "0",
        margin: "-1px",
        overflow: "hidden",
        clip: "rect(0, 0, 0, 0)",
        whiteSpace: "nowrap",
        border: "0",
    },

    // Minimum touch target size (44px x 44px)
    minTouchTarget: {
        minWidth: "44px",
        minHeight: "44px",
    },
} as const;

// Export everything as default design system
export const DESIGN_SYSTEM = {
    BREAKPOINTS,
    SPACING,
    TYPOGRAPHY,
    COLORS,
    SHADOWS,
    BORDER_RADIUS,
    ANIMATION_DURATION,
    ANIMATION_EASING,
    Z_INDEX,
    CONTAINER,
    COMPONENT_VARIANTS,
    GRID,
    DESIGN_UTILS,
    A11Y,
} as const;

export default DESIGN_SYSTEM;
