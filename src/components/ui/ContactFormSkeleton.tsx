export function ContactFormSkeleton() {
    return (
        <div className="space-y-6 animate-pulse">
            <div>
                <div className="h-4 bg-gray-300 rounded w-12 mb-2"></div>
                <div className="h-10 bg-gray-200 rounded"></div>
            </div>

            <div>
                <div className="h-4 bg-gray-300 rounded w-12 mb-2"></div>
                <div className="h-10 bg-gray-200 rounded"></div>
                <div className="h-3 bg-gray-100 rounded w-64 mt-1"></div>
            </div>

            <div>
                <div className="h-4 bg-gray-300 rounded w-24 mb-2"></div>
                <div className="h-10 bg-gray-200 rounded"></div>
                <div className="h-3 bg-gray-100 rounded w-80 mt-1"></div>
            </div>

            <div>
                <div className="h-4 bg-gray-300 rounded w-32 mb-2"></div>
                <div className="h-10 bg-gray-200 rounded"></div>
            </div>

            <div>
                <div className="h-4 bg-gray-300 rounded w-64 mb-2"></div>
                <div className="h-32 bg-gray-200 rounded"></div>
            </div>

            <div className="h-12 bg-gray-300 rounded"></div>

            <div className="h-3 bg-gray-100 rounded w-72 mx-auto"></div>
        </div>
    );
}
