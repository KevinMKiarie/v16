import React from "react";
import { Code, Zap, Shield, ArrowRight } from 'lucide-react';

const ApisPage = () => {
    return (
        <div className="min-h-screen bg-[#020203] text-zinc-300">
            {/* Header Section */}
            <div className="pt-20 pb-16 md:pb-20 w-full px-4 sm:px-6 lg:px-8 relative overflow-hidden">
                {/* Background gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/20 via-purple-900/10 to-transparent pointer-events-none" />
                
                <div className="max-w-4xl mx-auto text-center relative z-10">
                    <div className="inline-flex items-center px-4 py-2 bg-indigo-500/20 border border-indigo-500/30 rounded-full text-indigo-300 text-sm font-medium mb-6 backdrop-blur-sm">
                        <span className="w-2 h-2 bg-indigo-400 rounded-full mr-2 animate-pulse"></span>
                        Coming Soon
                    </div>
                    <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-6 leading-tight">
                        Nexuscale APIs
                    </h1>
                    <p className="text-base md:text-2xl text-zinc-300 max-w-3xl mx-auto leading-relaxed font-medium">
                        Integrate AI automation directly into your business
                    </p>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-4xl mx-auto px-4 md:px-8 py-10 md:py-20">
                <div className="bg-[#09090B] border border-white/[0.08] rounded-2xl shadow-2xl p-6 md:p-8 text-center mb-8 backdrop-blur-sm">
                    <div className="w-16 h-16 bg-indigo-500/10 border border-indigo-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                        <Code className="w-8 h-8 text-indigo-400" />
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                        APIs Coming Soon
                    </h2>
                    <p className="text-zinc-400 text-sm md:text-base mb-8 max-w-2xl mx-auto leading-relaxed">
                        We're building powerful APIs that will let you integrate Nexuscale's AI agent directly into your existing tools and workflows. Connect to your CRM, automate campaigns, and access real-time data.
                    </p>
                </div>

                {/* Features Grid */}
                <div className="grid md:grid-cols-3 gap-6 mb-12">
                    <div className="bg-[#09090B] border border-white/[0.08] rounded-xl p-6 backdrop-blur-sm hover:border-indigo-500/30 transition-all duration-300">
                        <div className="w-12 h-12 bg-indigo-500/10 border border-indigo-500/20 rounded-xl flex items-center justify-center mb-4">
                            <Zap className="w-6 h-6 text-indigo-400" />
                        </div>
                        <h3 className="text-lg font-bold text-white mb-2">Real-time Integration</h3>
                        <p className="text-sm text-zinc-400 leading-relaxed">
                            Connect your systems with our RESTful APIs for seamless data flow.
                        </p>
                    </div>

                    <div className="bg-[#09090B] border border-white/[0.08] rounded-xl p-6 backdrop-blur-sm hover:border-indigo-500/30 transition-all duration-300">
                        <div className="w-12 h-12 bg-indigo-500/10 border border-indigo-500/20 rounded-xl flex items-center justify-center mb-4">
                            <Shield className="w-6 h-6 text-indigo-400" />
                        </div>
                        <h3 className="text-lg font-bold text-white mb-2">Secure & Scalable</h3>
                        <p className="text-sm text-zinc-400 leading-relaxed">
                            Enterprise-grade security with OAuth 2.0 and rate limiting.
                        </p>
                    </div>

                    <div className="bg-[#09090B] border border-white/[0.08] rounded-xl p-6 backdrop-blur-sm hover:border-indigo-500/30 transition-all duration-300">
                        <div className="w-12 h-12 bg-indigo-500/10 border border-indigo-500/20 rounded-xl flex items-center justify-center mb-4">
                            <Code className="w-6 h-6 text-indigo-400" />
                        </div>
                        <h3 className="text-lg font-bold text-white mb-2">Developer Friendly</h3>
                        <p className="text-sm text-zinc-400 leading-relaxed">
                            Comprehensive documentation and SDKs for popular languages.
                        </p>
                    </div>
                </div>

                {/* CTA Section */}
                <div className="bg-gradient-to-r from-indigo-600/10 via-purple-600/10 to-indigo-600/10 border border-indigo-500/20 rounded-2xl p-8 text-center">
                    <h3 className="text-xl font-bold text-white mb-4">Stay Updated</h3>
                    <p className="text-zinc-400 mb-6 max-w-xl mx-auto">
                        Be the first to know when our APIs are ready. Join our developer waitlist.
                    </p>
                    <button className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(99,102,241,0.3)]">
                        Join Waitlist
                        <ArrowRight className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ApisPage;

