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

export {};
