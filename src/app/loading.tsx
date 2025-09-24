export default function Loading() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black">
            <div className="text-center space-y-4">
                <div className="relative">
                    {/* Animated logo */}
                    <div className="w-16 h-16 mx-auto mb-4">
                        <div className="animate-pulse bg-gradient-to-r from-red-500 to-yellow-500 rounded-full w-16 h-16"></div>
                    </div>

                    {/* Loading text */}
                    <div className="space-y-3">
                        <div className="h-8 w-48 bg-gray-700 rounded-lg animate-pulse mx-auto"></div>
                        <div className="h-4 w-32 bg-gray-800 rounded-md animate-pulse mx-auto"></div>
                    </div>
                </div>

                {/* Loading dots */}
                <div className="flex justify-center space-x-2 mt-6">
                    <div className="w-2 h-2 bg-red-500 rounded-full animate-bounce"></div>
                    <div
                        className="w-2 h-2 bg-red-500 rounded-full animate-bounce"
                        style={{ animationDelay: "0.1s" }}
                    ></div>
                    <div
                        className="w-2 h-2 bg-red-500 rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                    ></div>
                </div>
            </div>
        </div>
    );
}
