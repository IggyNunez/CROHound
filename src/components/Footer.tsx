import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function Footer() {
    return (
        <footer className="relative bg-gradient-to-b from-black to-zinc-900 border-t border-zinc-800/50">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(239,68,68,0.1),transparent_70%)]" />

            <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-12 sm:py-16 md:py-20 lg:py-24">
                {/* Top Section with CTA */}
                <div className="text-center mb-12 sm:mb-16 lg:mb-20 space-y-4 sm:space-y-6 lg:space-y-8">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold bg-gradient-to-r from-red-400 via-red-500 to-yellow-500 bg-clip-text text-transparent leading-tight px-2">
                        Ready to Turn Visitors into Buyers?
                    </h2>
                    <p className="text-lg sm:text-xl md:text-2xl lg:text-2xl text-zinc-400 max-w-2xl sm:max-w-3xl lg:max-w-4xl mx-auto leading-relaxed px-2">
                        Get your free 12-point Sniff Check and discover exactly
                        what&apos;s stopping your visitors from converting.
                    </p>
                    <div className="pt-2">
                        <Button
                            asChild
                            className="w-full sm:w-auto h-12 sm:h-14 lg:h-16 px-6 sm:px-10 lg:px-12 text-base lg:text-xl font-bold bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white border-0 shadow-xl shadow-red-500/25 hover:shadow-red-500/40 hover:scale-105 transition-all duration-300 rounded-xl max-w-sm sm:max-w-none mx-auto"
                        >
                            <Link href="/contact">
                                GET YOUR FREE SNIFF CHECK
                            </Link>
                        </Button>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-16 mb-12 lg:mb-16">
                    {/* Brand */}
                    <div className="space-y-6 lg:space-y-8 sm:col-span-2 lg:col-span-1 text-center sm:text-left">
                        <Link
                            href="/"
                            className="inline-flex items-start gap-4 group mx-auto sm:mx-0"
                        >
                            <div className="relative">
                                <Image
                                    src="/logo.png"
                                    alt="CROHound"
                                    width={240}
                                    height={240}
                                    className="h-24 sm:h-28 lg:h-32 xl:h-36 w-auto transition-all duration-300 group-hover:brightness-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-br from-red-500/20 to-yellow-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            </div>
                        </Link>
                        <p className="text-zinc-400 leading-relaxed text-base lg:text-lg max-w-xs sm:max-w-sm mx-auto sm:mx-0">
                            We help $5k-$50k/mo Shopify stores turn more
                            visitors into buyers through lean CRO
                            programs—without adding ad spend.
                        </p>
                        <div className="flex gap-3 justify-center sm:justify-start">
                            {/* Social links can go here */}
                        </div>
                    </div>

                    {/* Services */}
                    <div className="space-y-6 lg:space-y-8 text-center sm:text-left">
                        <h4 className="text-lg lg:text-xl font-bold text-white relative inline-block">
                            Services
                            <div className="absolute -bottom-2 left-1/2 sm:left-0 transform -translate-x-1/2 sm:translate-x-0 w-8 h-0.5 bg-gradient-to-r from-red-500 to-yellow-500 rounded-full" />
                        </h4>
                        <ul className="space-y-4 lg:space-y-5">
                            <li>
                                <Link
                                    href="/services"
                                    className="text-zinc-400 hover:text-red-400 transition-all duration-300 hover:translate-x-1 block text-base lg:text-lg"
                                >
                                    CRO Audits & Analysis
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/packages"
                                    className="text-zinc-400 hover:text-red-400 transition-all duration-300 hover:translate-x-1 block text-base lg:text-lg"
                                >
                                    Monthly CRO Programs
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/case-studies"
                                    className="text-zinc-400 hover:text-red-400 transition-all duration-300 hover:translate-x-1 block text-base lg:text-lg"
                                >
                                    Success Case Studies
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Resources */}
                    <div className="space-y-6 lg:space-y-8 text-center sm:text-left">
                        <h4 className="text-lg lg:text-xl font-bold text-white relative inline-block">
                            Resources
                            <div className="absolute -bottom-2 left-1/2 sm:left-0 transform -translate-x-1/2 sm:translate-x-0 w-8 h-0.5 bg-gradient-to-r from-red-500 to-yellow-500 rounded-full" />
                        </h4>
                        <ul className="space-y-4 lg:space-y-5">
                            <li>
                                <Link
                                    href="/blog"
                                    className="text-zinc-400 hover:text-red-400 transition-all duration-300 hover:translate-x-1 block text-base lg:text-lg"
                                >
                                    CRO Blog & Tips
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/about"
                                    className="text-zinc-400 hover:text-red-400 transition-all duration-300 hover:translate-x-1 block text-base lg:text-lg"
                                >
                                    About CROHound
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/contact"
                                    className="text-zinc-400 hover:text-red-400 transition-all duration-300 hover:translate-x-1 block text-base lg:text-lg"
                                >
                                    Get In Touch
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Company */}
                    <div className="space-y-6 lg:space-y-8 text-center sm:text-left">
                        <h4 className="text-lg lg:text-xl font-bold text-white relative inline-block">
                            Company
                            <div className="absolute -bottom-2 left-1/2 sm:left-0 transform -translate-x-1/2 sm:translate-x-0 w-8 h-0.5 bg-gradient-to-r from-red-500 to-yellow-500 rounded-full" />
                        </h4>
                        <ul className="space-y-4 lg:space-y-5">
                            <li>
                                <Link
                                    href="/privacy"
                                    className="text-zinc-400 hover:text-red-400 transition-all duration-300 hover:translate-x-1 block text-base lg:text-lg"
                                >
                                    Privacy Policy
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/terms"
                                    className="text-zinc-400 hover:text-red-400 transition-all duration-300 hover:translate-x-1 block text-base lg:text-lg"
                                >
                                    Terms of Service
                                </Link>
                            </li>
                            <li>
                                <span className="text-zinc-500 text-sm lg:text-base">
                                    Trusted by 100+ Shopify stores
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Gradient Separator */}
                <div className="relative my-12 lg:my-16">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-zinc-700"></div>
                    </div>
                    <div className="relative flex justify-center">
                        <div className="bg-gradient-to-r from-red-500/20 to-yellow-500/20 p-3 lg:p-4 rounded-full">
                            <div className="w-2 h-2 lg:w-3 lg:h-3 bg-gradient-to-r from-red-500 to-yellow-500 rounded-full"></div>
                        </div>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="flex flex-col lg:flex-row justify-between items-center space-y-6 lg:space-y-0 pt-8 lg:pt-12">
                    <div className="flex flex-col lg:flex-row items-center gap-3 lg:gap-6 text-zinc-500 text-center lg:text-left">
                        <p className="text-sm lg:text-base">
                            © {new Date().getFullYear()} CROHound. All rights
                            reserved.
                        </p>
                        <div className="hidden lg:block w-1 h-1 bg-zinc-600 rounded-full"></div>
                        <p className="text-sm lg:text-base">
                            Built for ambitious Shopify merchants
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center gap-4 lg:gap-6 text-center">
                        <div className="text-sm lg:text-base text-zinc-500">
                            Made with ❤️ for e-commerce
                        </div>
                        <div className="flex items-center gap-2 text-xs lg:text-sm text-zinc-600">
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                            <span>Available for new projects</span>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
