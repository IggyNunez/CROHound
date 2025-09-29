const config = {
    content: {
        files: [
            "./src/**/*.{js,ts,jsx,tsx,mdx}",
            "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
            "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
            "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
        ],
        // Remove unused CSS in production
        transform: {
            tsx: (content) => content,
            ts: (content) => content,
            jsx: (content) => content,
            js: (content) => content,
        },
    },

    darkMode: "class",

    theme: {
        extend: {
            // Custom animations to replace tw-animate-css
            animation: {
                "fade-in": "fade-in 0.3s ease-out",
                "fade-out": "fade-out 0.3s ease-out",
                "slide-in-up": "slide-in-up 0.3s ease-out",
                "slide-in-down": "slide-in-down 0.3s ease-out",
                "scale-in": "scale-in 0.2s ease-out",
                "scale-out": "scale-out 0.2s ease-out",
                float: "float 6s ease-in-out infinite",
                glow: "glow 2s ease-in-out infinite alternate",
            },
            keyframes: {
                "fade-in": {
                    "0%": { opacity: "0" },
                    "100%": { opacity: "1" },
                },
                "fade-out": {
                    "0%": { opacity: "1" },
                    "100%": { opacity: "0" },
                },
                "slide-in-up": {
                    "0%": { transform: "translateY(20px)", opacity: "0" },
                    "100%": { transform: "translateY(0)", opacity: "1" },
                },
                "slide-in-down": {
                    "0%": { transform: "translateY(-20px)", opacity: "0" },
                    "100%": { transform: "translateY(0)", opacity: "1" },
                },
                "scale-in": {
                    "0%": { transform: "scale(0.9)", opacity: "0" },
                    "100%": { transform: "scale(1)", opacity: "1" },
                },
                "scale-out": {
                    "0%": { transform: "scale(1)", opacity: "1" },
                    "100%": { transform: "scale(0.9)", opacity: "0" },
                },
                float: {
                    "0%, 100%": { transform: "translateY(0px)" },
                    "50%": { transform: "translateY(-10px)" },
                },
                glow: {
                    "0%": { boxShadow: "0 0 20px rgba(239, 68, 68, 0.3)" },
                    "100%": { boxShadow: "0 0 30px rgba(239, 68, 68, 0.6)" },
                },
            },
        },
    },

    plugins: [],
};

export default config;
