import React, { useState } from 'react';
import { 
  CheckCircle2, 
  ArrowRight, 
  TrendingUp, 
  Users, 
  CreditCard, 
  Zap, 
  BarChart3,
  Globe,
  ShieldCheck,
  Rocket,
  DollarSign,
  Star,
  ChevronRight,
  Layers,
  Infinity,
  Repeat,
  Wallet,
  Play
} from 'lucide-react';
import { ScrollReveal } from '../components/ScrollReveal';
import { accentColor, accentColorEnd } from '../constants/theme';

const HeroSection = () => {
    return (
        <div className="relative pt-48 pb-32 px-6 text-center overflow-hidden">
            {/* Ambient Background Lights */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-indigo-500/10 blur-[150px] rounded-full pointer-events-none" />
            <div className="absolute top-20 left-1/4 w-[300px] h-[300px] bg-purple-500/10 blur-[100px] rounded-full pointer-events-none" />
            
            <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center">
                <ScrollReveal delay={0}>
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#09090B]/50 border border-white/5 text-[10px] font-medium uppercase tracking-widest text-zinc-300 mb-8 hover:border-indigo-500/30 transition-colors cursor-default">
                        <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" /> 
                        Highest Converting B2B Offer
                    </div>
                </ScrollReveal>
                
                <ScrollReveal delay={100}>
                    {/* Headline */}
                    <h1 className="text-6xl md:text-8xl font-medium text-white mb-8 tracking-tighter leading-[0.9]">
                        Partner with the <br />
                        <span 
                            className="text-transparent bg-clip-text"
                            style={{
                                background: `linear-gradient(120deg, ${accentColor} 20%, ${accentColorEnd} 100%)`,
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent'
                            }}
                        >
                            fastest growing
                        </span> <br />
                        sales AI platform.
                    </h1>
                </ScrollReveal>
                
                <ScrollReveal delay={200}>
                    <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto mb-12 leading-relaxed font-light">
                        Earn <span className="text-white font-medium">30% recurring commissions</span> for life. 
                        Promote a product that sells itself with a $299 average order value.
                    </p>
                </ScrollReveal>

                <ScrollReveal delay={300}>
                    {/* CTAs */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
                        <a
                            href="https://nexuscale.getrewardful.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full sm:w-auto px-10 py-5 rounded-full font-bold text-sm tracking-wide transition-all hover:scale-105 active:scale-95 bg-white text-black hover:bg-zinc-200 shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)]"
                        >
                            Apply Now
                        </a>
                    </div>
                </ScrollReveal>
            </div>
        </div>
    );
};

const CalculatorSection = () => {
    const [referrals, setReferrals] = useState(15);
    const avgDealSize = 299;
    const commissionRate = 0.30;
    
    const monthlyEarnings = Math.floor(referrals * avgDealSize * commissionRate);
    const yearlyEarnings = monthlyEarnings * 12;

    // Calculate progress percentage for background gradient
    const progress = (referrals / 100) * 100;

    return (
        <div className="py-24 px-6 relative border-t border-white/5 bg-[#030303]">
            <div className="max-w-6xl mx-auto">
                <ScrollReveal>
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">Calculate Your Potential</h2>
                        <p className="text-zinc-500 text-lg">See how much you can earn with just a few referrals.</p>
                    </div>
                </ScrollReveal>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
                    <ScrollReveal delay={0}>
                        {/* Interactive Card */}
                        <div className="rounded-3xl bg-[#09090B]/50 backdrop-blur-md border border-white/5 p-8 md:p-12 flex flex-col justify-center hover:border-white/10 transition-all duration-500">
                            <div className="mb-10">
                                <label className="flex justify-between items-end mb-6">
                                    <span className="text-zinc-400 font-medium text-sm uppercase tracking-wider">Active Customers Referred</span>
                                    <span className="text-5xl font-bold text-white tracking-tighter">{referrals}</span>
                                </label>
                                
                                <div className="relative h-4 w-full rounded-full bg-zinc-800">
                                    {/* Custom Range Slider */}
                                    <input 
                                        type="range" 
                                        min="1" 
                                        max="100" 
                                        value={referrals} 
                                        onChange={(e) => setReferrals(parseInt(e.target.value))}
                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
                                    />
                                    <div 
                                        className="absolute top-0 left-0 h-full rounded-full bg-gradient-to-r from-indigo-600 to-purple-500 pointer-events-none z-10 transition-all duration-75"
                                        style={{ width: `${progress}%` }}
                                    />
                                    <div 
                                        className="absolute top-1/2 -translate-y-1/2 h-8 w-8 bg-white rounded-full shadow-[0_0_20px_rgba(255,255,255,0.5)] z-10 pointer-events-none transition-all duration-75 flex items-center justify-center"
                                        style={{ left: `calc(${progress}% - 16px)` }}
                                    >
                                        <div className="w-2 h-2 bg-indigo-600 rounded-full" />
                                    </div>
                                </div>
                                <div className="flex justify-between mt-4 text-xs font-mono text-zinc-600">
                                    <span>1 Customer</span>
                                    <span>100 Customers</span>
                                </div>
                            </div>

                            <div className="bg-zinc-900/50 rounded-xl p-4 flex items-start gap-3 border border-white/5">
                                <Zap size={16} className="text-yellow-400 mt-0.5 shrink-0" />
                                <div className="space-y-1">
                                    <p className="text-sm text-zinc-300 font-medium">Power Multiplier</p>
                                    <p className="text-xs text-zinc-500 leading-relaxed">
                                        Based on our average plan of <span className="text-white font-bold">${avgDealSize}/mo</span>. Top affiliates often refer 50+ customers in their first 3 months.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </ScrollReveal>

                    <ScrollReveal delay={100}>
                        {/* Output Card */}
                        <div className="relative rounded-3xl overflow-hidden group">
                            <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 to-purple-700 transition-transform duration-500" />
                            <div className="absolute inset-[1px] bg-[#080808] rounded-[23px]" />
                            
                            <div className="relative z-10 h-full p-8 md:p-12 flex flex-col justify-between">
                                <div>
                                    <div className="text-zinc-500 font-bold text-xs uppercase tracking-widest mb-1">Monthly Recurring Income</div>
                                    <div className="text-6xl md:text-7xl font-medium text-white tracking-tighter mb-8">
                                        ${monthlyEarnings.toLocaleString()}
                                    </div>
                                    
                                    <div className="h-px w-full bg-zinc-800 mb-8" />
                                    
                                    <div className="text-zinc-500 font-bold text-xs uppercase tracking-widest mb-1">Yearly Potential</div>
                                    <div className="text-3xl font-medium text-emerald-400 tracking-tight">
                                        ${yearlyEarnings.toLocaleString()}
                                    </div>
                                </div>
                                
                                <div className="mt-8 flex gap-2">
                                    <span className="inline-flex items-center gap-1 px-2 py-1 rounded text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold">
                                        <TrendingUp size={10} /> Passive
                                    </span>
                                    <span className="inline-flex items-center gap-1 px-2 py-1 rounded text-[10px] bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 font-bold">
                                        <Repeat size={10} /> Recurring
                                    </span>
                                </div>
                            </div>
                        </div>
                    </ScrollReveal>
                </div>
            </div>
        </div>
    );
};

const BentoGridSection = () => {
    return (
        <div className="py-24 px-6 max-w-7xl mx-auto">
            <ScrollReveal>
                <div className="mb-16 md:text-center max-w-3xl mx-auto">
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">Built for Super Affiliates</h2>
                    <p className="text-lg text-zinc-400">We treated our partner program like a product. It's engineered to help you convert traffic into revenue effortlessly.</p>
                </div>
            </ScrollReveal>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6">
                
                {/* Card 1: 30% Commission (Large) */}
                <div className="md:col-span-1 lg:col-span-4">
                    <ScrollReveal delay={0}>
                        <div className="rounded-3xl bg-[#09090B]/50 backdrop-blur-md border border-white/5 p-8 flex flex-col justify-between hover:border-white/10 hover:bg-[#09090B]/70 transition-all duration-500 relative overflow-hidden h-[320px] group">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 blur-[50px] rounded-full" />
                            <div>
                                <div className="w-12 h-12 rounded-full bg-zinc-800 flex items-center justify-center mb-6 text-white border border-white/5">
                                    <DollarSign size={24} />
                                </div>
                                <h3 className="text-3xl font-bold text-white mb-2">30% Lifetime</h3>
                                <p className="text-zinc-400 text-sm">Earn on every renewal. A single referral pays you for years.</p>
                            </div>
                            <div className="mt-auto">
                                <div className="h-1 w-full bg-zinc-800 rounded-full overflow-hidden">
                                    <div className="h-full w-1/3 bg-emerald-500" />
                                </div>
                                <div className="flex justify-between text-[10px] text-zinc-500 mt-2 font-mono">
                                    <span>Industry Standard</span>
                                    <span className="text-emerald-500">Nexuscale</span>
                                </div>
                            </div>
                        </div>
                    </ScrollReveal>
                </div>

                {/* Card 2: Viral Product (Medium) */}
                <div className="md:col-span-1 lg:col-span-4">
                    <ScrollReveal delay={100}>
                        <div className="rounded-3xl bg-[#09090B]/50 backdrop-blur-md border border-white/5 p-8 hover:border-white/10 hover:bg-[#09090B]/70 transition-all duration-500 relative overflow-hidden h-[320px] group">
                            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-indigo-500/10 blur-[60px] rounded-full" />
                            <div className="w-12 h-12 rounded-full bg-zinc-800 flex items-center justify-center mb-6 text-white border border-white/5">
                                <Rocket size={24} />
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-2">Sells Itself</h3>
                            <p className="text-zinc-400 text-sm mb-6">Our product has a high viral coefficient. B2B lead gen is a burning pain point for every company.</p>
                            <div className="flex -space-x-3">
                                {[1,2,3,4].map(i => (
                                    <div key={i} className="w-8 h-8 rounded-full bg-zinc-800 border border-black flex items-center justify-center text-[10px] text-zinc-500">
                                        <Users size={12} />
                                    </div>
                                ))}
                                <div className="w-8 h-8 rounded-full bg-indigo-600 border border-black flex items-center justify-center text-[10px] text-white font-bold">+2k</div>
                            </div>
                        </div>
                    </ScrollReveal>
                </div>

                {/* Card 3: 90 Day Cookie (Small) */}
                <div className="md:col-span-1 lg:col-span-4">
                    <ScrollReveal delay={200}>
                        <div className="rounded-3xl bg-[#09090B]/50 backdrop-blur-md border border-white/5 p-8 hover:border-white/10 hover:bg-[#09090B]/70 transition-all duration-500 flex flex-col justify-center h-[320px] group">
                            <div className="w-12 h-12 rounded-full bg-zinc-800 flex items-center justify-center mb-6 text-white border border-white/5">
                                <ShieldCheck size={24} />
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-2">90-Day Cookie</h3>
                            <p className="text-zinc-400 text-sm">We track your clicks for 3 months. Even if they convert weeks later, you get paid.</p>
                        </div>
                    </ScrollReveal>
                </div>

                {/* Card 4: PayPal Payouts (Wide) */}
                <div className="md:col-span-2 lg:col-span-6">
                    <ScrollReveal delay={0}>
                        <div className="rounded-3xl bg-[#09090B]/50 backdrop-blur-md border border-white/5 p-8 flex items-center justify-between hover:border-white/10 hover:bg-[#09090B]/70 transition-all duration-500 relative overflow-hidden group">
                            <div className="relative z-10 max-w-sm">
                                <h3 className="text-2xl font-bold text-white mb-2">Wise Payouts</h3>
                                <p className="text-zinc-400 text-sm">Get paid on time, every time. We process payouts directly to your PayPal account on the 1st of every month.</p>
                            </div>
                            <div className="relative z-10 w-16 h-16 rounded-full bg-zinc-800 flex items-center justify-center text-white border border-white/5 shrink-0">
                                <img src="/svg/wise.png" alt="" className='rounded-full w-16 h-16' />
                            </div>
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.03] to-transparent transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                        </div>
                    </ScrollReveal>
                </div>

                {/* Card 5: Marketing Assets (Wide) */}
                <div className="md:col-span-2 lg:col-span-6">
                    <ScrollReveal delay={100}>
                        <div className="rounded-3xl bg-[#09090B]/50 backdrop-blur-md border border-white/5 p-8 flex items-center justify-between hover:border-white/10 hover:bg-[#09090B]/70 transition-all duration-500 relative overflow-hidden group">
                            <div className="relative z-10 max-w-sm">
                                <h3 className="text-2xl font-bold text-white mb-2">High-Res Assets</h3>
                                <p className="text-zinc-400 text-sm">Access our library of banners, swipe copy, and demos to make promotion effortless.</p>
                            </div>
                            <div className="relative z-10 w-16 h-16 rounded-full bg-zinc-800 flex items-center justify-center text-white border border-white/5 shrink-0 ">
                            <Wallet/>
                            </div>
                        </div>
                    </ScrollReveal>
                </div>

            </div>
        </div>
    );
};

const CTAFooter = () => {
    return (
        <div className="py-32 px-6">
            <ScrollReveal>
                <div className="max-w-5xl mx-auto rounded-[40px] bg-gradient-to-b from-zinc-900 to-black border border-white/10 p-12 md:p-24 text-center relative overflow-hidden group">
                    
                    {/* Animated Glow */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-2xl bg-indigo-500/10 blur-[100px] rounded-full pointer-events-none group-hover:bg-indigo-500/20 transition-colors duration-400" />
                    
                    <div className="relative z-10">
                        <h2 className="text-5xl md:text-7xl font-bold text-white mb-8 tracking-tighter">Ready to Scale?</h2>
                        <p className="text-xl text-zinc-400 mb-12 max-w-xl mx-auto leading-relaxed">
                            Join the partner program that puts your earnings on autopilot. 
                            Sign up takes 30 seconds.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <a
                                href="https://nexuscale.getrewardful.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-10 py-5 rounded-full font-bold text-base tracking-wide transition-all hover:scale-105 active:scale-95 bg-white text-black hover:bg-zinc-200 shadow-[0_0_40px_-10px_rgba(255,255,255,0.4)]"
                            >
                                Apply Now
                            </a>
                        </div>
                        <p className="mt-8 text-xs text-zinc-600 uppercase tracking-widest font-semibold">Join 500+ Top Tier Partners</p>
                    </div>
                </div>
            </ScrollReveal>
        </div>
    );
};

const AffiliateLandingPage = () => {
    return (
        <div className="bg-[#020203] min-h-screen">
            <HeroSection />
            <CalculatorSection />
            <BentoGridSection />
            <CTAFooter />
        </div>
    );
};

export default AffiliateLandingPage;
