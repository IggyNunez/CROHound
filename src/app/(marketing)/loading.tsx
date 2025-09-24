export default function MarketingLoading() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
            {/* Hero Section Skeleton */}
            <section className="py-16 md:py-24">
                <div className="container px-4 md:px-6 max-w-7xl mx-auto">
                    <div className="text-center space-y-8">
                        {/* Badge skeleton */}
                        <div className="flex justify-center">
                            <div className="h-6 w-24 bg-gray-800 rounded-full animate-pulse"></div>
                        </div>

                        {/* Title skeleton */}
                        <div className="space-y-4">
                            <div className="h-12 sm:h-16 md:h-20 w-full max-w-4xl mx-auto bg-gray-800 rounded-lg animate-pulse"></div>
                            <div className="h-6 w-3/4 max-w-2xl mx-auto bg-gray-700 rounded-lg animate-pulse"></div>
                        </div>

                        {/* CTA skeleton */}
                        <div className="flex justify-center">
                            <div className="h-12 w-48 bg-gradient-to-r from-red-600/50 to-red-700/50 rounded-lg animate-pulse"></div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Content Section Skeleton */}
            <section className="py-16 bg-gray-900/50">
                <div className="container px-4 md:px-6 max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="space-y-4">
                                <div className="h-8 w-full bg-gray-800 rounded-lg animate-pulse"></div>
                                <div className="h-4 w-5/6 bg-gray-700 rounded animate-pulse"></div>
                                <div className="h-4 w-4/6 bg-gray-700 rounded animate-pulse"></div>
                                <div className="h-4 w-3/6 bg-gray-700 rounded animate-pulse"></div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
