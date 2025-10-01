"use client";

import { Share2 } from "lucide-react";

interface ShareButtonProps {
    title: string;
    description: string;
}

export default function ShareButton({ title, description }: ShareButtonProps) {
    const handleShare = () => {
        if (navigator.share) {
            navigator.share({
                title,
                text: description,
                url: window.location.href,
            });
        } else {
            // Fallback - copy to clipboard
            navigator.clipboard.writeText(window.location.href);
        }
    };

    return (
        <button
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors px-3 py-2 rounded-md hover:bg-muted"
            onClick={handleShare}
        >
            <Share2 className="h-4 w-4" />
            Share
        </button>
    );
}
