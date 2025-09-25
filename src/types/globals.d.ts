/* eslint-disable @typescript-eslint/no-explicit-any */
// Global type declarations
declare global {
    interface Window {
        gtag?: (
            command: "config" | "event",
            targetId: string,
            config?: { [key: string]: any }
        ) => void;
        clarity?: (command: string, ...args: any[]) => void;
    }
}

declare module "remark-gfm" {
    const plugin: any;
    export default plugin;
}

declare module "rehype-autolink-headings" {
    const plugin: any;
    export default plugin;
}

declare module "rehype-slug" {
    const plugin: any;
    export default plugin;
}

declare module "rehype-pretty-code" {
    const plugin: any;
    export default plugin;
}

export {};
