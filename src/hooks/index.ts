// Core Analytics Hooks
export { useAnalytics } from "./useAnalytics";
export { useContactForm } from "./useContactForm";
export { useFormAnalytics, useConversionFunnel } from "./useFormAnalytics";

// Scroll & Interaction Hooks
export {
    useScrollProgress,
    useInView,
    useScrollAnimation,
    useScrollTo,
} from "./useScrollProgress";

// Responsive & Device Hooks
export {
    useBreakpoint,
    useResponsive,
    useDeviceCapabilities,
    BREAKPOINTS,
    type Breakpoint,
} from "./useResponsive";

// Performance & Optimization Hooks
export {
    usePerformanceMonitoring,
    useResourcePerformance,
} from "../components/WebVitals";

// Re-export types for external use
export type {
    FormAnalyticsData,
    UseFormAnalyticsOptions,
} from "./useFormAnalytics";

export type {
    ScrollProgressState,
    UseScrollProgressOptions,
} from "./useScrollProgress";
