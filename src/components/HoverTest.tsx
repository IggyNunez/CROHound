"use client";

export function HoverTest() {
    return (
        <div className="fixed top-4 right-4 z-[9999] space-y-2 bg-black/90 p-4 rounded-lg">
            <div className="text-white text-sm font-bold">🚨 HOVER TEST:</div>
            <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 hover:scale-110 transition-all duration-300">
                Tailwind Hover
            </button>
            <button
                className="nav-link"
                style={{ margin: 0, display: "block" }}
            >
                Custom CSS Hover
            </button>
            <div
                className="w-16 h-16 bg-green-500 rounded cursor-pointer"
                style={{
                    transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                    e.currentTarget.style.transform =
                        "scale(1.2) rotate(45deg)";
                    e.currentTarget.style.backgroundColor = "#10b981";
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "scale(1) rotate(0deg)";
                    e.currentTarget.style.backgroundColor = "#22c55e";
                }}
            ></div>
            <div className="text-xs text-gray-300">
                Hover each element above
            </div>
        </div>
    );
}
