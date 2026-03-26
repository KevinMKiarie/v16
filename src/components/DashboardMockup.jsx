import { useState, useEffect, useRef } from 'react';
import { Mail, MoreHorizontal } from 'lucide-react';

const LinkedInIcon = ({ className }) => (
  <img src="/svg/linkedin-svgrepo-com.svg" alt="LinkedIn" className={className} />
);
import { neu } from '../utils/styles';
import { Typewriter } from './Typewriter';
import { PersonalizedSpan } from './PersonalizedSpan';

export default function DashboardMockup() {
    const [status, setStatus] = useState('idle'); 
    const [startTyping, setStartTyping] = useState(false);
    const containerRef = useRef(null);
    const [activeTab, setActiveTab] = useState('email');

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting && status === 'idle') {
                setStatus('typing');
                setStartTyping(true);
            }
        }, { threshold: 0.6 });
        
        if (containerRef.current) observer.observe(containerRef.current);
        return () => observer.disconnect();
    }, [status]);

    return (
        <div ref={containerRef} className="relative w-full max-w-6xl mx-auto mt-24 perspective-[2000px] group">
            {/* Soft Ambient Glow - Refined */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[85%] h-[50%] bg-indigo-500/10 blur-[100px] rounded-full pointer-events-none animate-pulse-slow" />
            
            {/* Main Window */}
            <div className={`relative rounded-3xl ${neu.glass} shadow-2xl overflow-hidden transform transition-transform duration-700 hover:scale-[1.005] ring-1 ring-white/10`}>
                {/* Window Controls */}
                <div className="h-12 border-b border-white/[0.06] bg-black/20 flex items-center px-6 gap-2 backdrop-blur-md">
                    <div className="flex gap-2 opacity-60 hover:opacity-100 transition-opacity">
                        <div className="w-3 h-3 rounded-full bg-[#FF5F57] shadow-[0_0_8px_rgba(255,95,87,0.4)]" />
                        <div className="w-3 h-3 rounded-full bg-[#FEBC2E] shadow-[0_0_8px_rgba(254,188,46,0.4)]" />
                        <div className="w-3 h-3 rounded-full bg-[#28C840] shadow-[0_0_8px_rgba(40,200,64,0.4)]" />
                    </div>
                </div>

                <div className="flex flex-col md:flex-row h-[650px]">
                    
                    {/* Sidebar */}
                    <div className="w-full md:w-80 border-r border-white/[0.06] bg-black/20 backdrop-blur-md flex flex-col">
                        <div className="p-6 border-b border-white/[0.06]">
                            <div className="flex items-center gap-3 text-zinc-400 font-bold text-xs uppercase tracking-wider"><span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.6)]"></span>Live Feed</div>
                        </div>
                        <div className="p-4 flex-1 overflow-y-auto space-y-2">
                            <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.08] relative group/card cursor-pointer hover:bg-white/[0.05] transition-all hover:border-indigo-500/30 hover:shadow-[0_4px_20px_rgba(0,0,0,0.2)]">
                                <div className="absolute left-0 top-4 bottom-4 w-1 bg-indigo-500 rounded-r-full shadow-[0_0_15px_2px_rgba(99,102,241,0.4)]" />
                                <div className="pl-4">
                                    <div className="flex items-center justify-between mb-2"><div className="font-bold text-sm text-zinc-100">TechFlow Dynamics</div><div className="text-[10px] text-zinc-500 font-mono">2m ago</div></div>
                                    <div className="flex items-center gap-3 mb-3"><div className="w-6 h-6 rounded-full bg-indigo-600 flex items-center justify-center text-[10px] font-bold text-white shadow-md">S</div><div className="text-xs text-zinc-300 font-medium">Sarah Chen</div></div>
                                    {/* Buying Signals */}
                                    <div className="flex gap-2">
                                        <span className="text-[10px] text-emerald-300 bg-emerald-500/10 px-2 py-1 rounded-md border border-emerald-500/20 font-bold flex items-center gap-1 shadow-[0_0_10px_rgba(16,185,129,0.1)]">
                                            Funding
                                        </span>
                                        <span className="text-[10px] text-emerald-300 bg-emerald-500/10 px-2 py-1 rounded-md border border-emerald-500/20 font-bold flex items-center gap-1 shadow-[0_0_10px_rgba(16,185,129,0.1)]">
                                            Hiring
                                        </span>
                                    </div>
                                </div>
                            </div>
                            {/* Inactive Cards */}
                            <div className="p-4 rounded-xl hover:bg-white/[0.02] border border-transparent transition-colors cursor-pointer pl-5 opacity-40 hover:opacity-70">
                                <div className="flex items-center justify-between mb-2"><div className="font-medium text-sm text-zinc-400">Vortex Systems</div><div className="text-[10px] text-zinc-600 font-mono">14m</div></div>
                                <div className="flex items-center gap-3"><div className="w-6 h-6 rounded-full bg-zinc-800 flex items-center justify-center text-[10px] font-bold text-zinc-500">M</div><div className="text-xs text-zinc-500">Mike Ross</div></div>
                            </div>
                        </div>
                    </div>

                    {/* Main Content (Email Drafter) */}
                    <div className="flex-1 bg-black/10 relative flex flex-col">
                        {/* Header - Channel Switcher */}
                        <div className="min-h-16 h-auto py-3 border-b border-white/[0.06] flex items-center justify-between px-8 bg-black/20">
                            <div className={`flex items-center gap-1 bg-black/40 p-1.5 rounded-xl border border-white/[0.05] shadow-inner`}>
                                <button 
                                    onClick={() => setActiveTab('email')}
                                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all duration-300 ${activeTab === 'email' ? 'bg-indigo-500/20 text-indigo-300 shadow-[0_0_15px_rgba(99,102,241,0.2)] border border-indigo-500/30' : 'text-zinc-500 hover:text-zinc-300'}`}
                                >
                                    <Mail className="w-3.5 h-3.5" />
                                    Email
                                </button>
                                <button 
                                    onClick={() => setActiveTab('linkedin')}
                                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all duration-300 ${activeTab === 'linkedin' ? 'bg-[#0077b5]/20 text-[#0077b5] border border-[#0077b5]/30' : 'text-zinc-500 hover:text-zinc-300'}`}
                                >
                                    <LinkedInIcon className="w-3.5 h-3.5" />
                                    LinkedIn
                                </button>
                            </div>
                            
                            <div className={`flex items-center gap-3 transition-opacity duration-500 ${startTyping ? 'opacity-100' : 'opacity-0'}`}>
                                <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wide">Match Score</span>
                                <div className="flex items-center gap-2 bg-emerald-900/30 px-3 py-1.5 rounded-lg border border-emerald-500/30 shadow-[0_0_15px_rgba(16,185,129,0.2)]">
                                    <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                                    <span className="text-sm font-bold text-emerald-400">98%</span>
                                </div>
                            </div>
                        </div>

                        {/* Email Body */}
                        <div className="p-4 flex-1 overflow-hidden flex flex-col">
                            <div className={`flex-1 rounded-2xl border border-white/[0.04] bg-[#050505] relative overflow-hidden shadow-inner flex flex-col transition-all duration-500 ${neu.inset}`}>
                                
                                <div className="p-10 text-[15px] leading-8 text-zinc-300 font-sans flex-1 text-left relative z-10 overflow-y-auto">
                                    {activeTab === 'email' ? (
                                        <>
                                            <div className="grid grid-cols-[60px_1fr] gap-6 mb-10 text-sm border-b border-white/[0.04] pb-8 items-center">
                                                <span className="text-zinc-500 font-bold uppercase text-xs tracking-wider">To</span>
                                                <div className="flex items-center gap-2"><span className="bg-indigo-500/10 text-indigo-200 px-3 py-1 rounded-lg text-xs border border-indigo-500/20 shadow-[0_0_10px_rgba(99,102,241,0.1)] font-medium">sarah@techflow.io</span></div>
                                                <span className="text-zinc-500 font-bold uppercase text-xs tracking-wider">Subject</span>
                                                <div className="text-white font-medium flex flex-wrap gap-1 items-center">
                                                    <Typewriter text="Congrats on " start={startTyping} speed={20} />
                                                    <PersonalizedSpan text="Head of AI" start={startTyping} delay={300} />
                                                    <Typewriter text=" role, Sarah!" start={startTyping} delay={600} speed={40} />
                                                </div>
                                            </div>
                                            
                                            <div className={`relative pl-6 border-l-2 transition-all duration-500 ${startTyping ? 'border-indigo-500 shadow-[inset_14px_0_20px_-10px_rgba(99,102,241,0.2)]' : 'border-transparent'}`}>
                                                <div className="mb-1.5 text-zinc-200">Hi Sarah,</div>
                                                <div className="mb-3 flex flex-wrap gap-x-1 gap-y-2 items-center text-zinc-300">
                                                    <Typewriter 
                                                        text="Congrats on your promotion to " 
                                                        start={startTyping} 
                                                        delay={1000}
                                                        speed={20}
                                                    />
                                                    <PersonalizedSpan text="Head of AI" start={startTyping} delay={1800} />
                                                    <Typewriter text="! With TechFlow's recent " start={startTyping} delay={2200} speed={20} />
                                                    <PersonalizedSpan text="Series A funding" start={startTyping} delay={2800} />
                                                    <Typewriter text=" and " start={startTyping} delay={3200} speed={20} />
                                                    <PersonalizedSpan text="25% team growth" start={startTyping} delay={3500} />
                                                    <Typewriter text=", I imagine you're scaling capabilities fast." start={startTyping} delay={4000} speed={20} />
                                                </div>
                                                <div className="mb-3 text-zinc-300">
                                                    <Typewriter 
                                                        text="At Nexuscale, we help AI leaders like you identify ready-to-buy prospects 3x faster during rapid growth phases." 
                                                        start={startTyping} 
                                                        delay={5000}
                                                        speed={20}
                                                    />
                                                </div>
                                                <div className="mb-3 text-zinc-300">
                                                    <Typewriter 
                                                        text="Quick 15-min chat this week?" 
                                                        start={startTyping} 
                                                        delay={7500}
                                                        speed={30}
                                                        onComplete={() => setStatus('done')}
                                                    />
                                                </div>
                                                <div className={`transition-opacity duration-500 text-zinc-400 ${status === 'done' ? 'opacity-100' : 'opacity-0'}`}>Best,<br/><span className="text-indigo-400 font-bold">Alex</span></div>
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <div className="grid grid-cols-[60px_1fr] gap-6 mb-10 text-sm border-b border-white/[0.04] pb-3 items-center">
                                                <span className="text-zinc-500 font-bold uppercase text-xs tracking-wider">To</span>
                                                <div className="flex items-center gap-2"><span className="bg-[#0077b5]/10 text-[#0077b5] px-3 py-1 rounded-lg text-xs border border-[#0077b5]/20 shadow-[0_0_10px_rgba(0,119,181,0.1)] font-medium">Sarah Chen</span></div>
                                                <span className="text-zinc-500 font-bold uppercase text-xs tracking-wider">Type</span>
                                                <div className="text-white font-medium flex flex-wrap gap-1 items-center">
                                                    <Typewriter text="Connection Request" start={startTyping} speed={20} />
                                                </div>
                                            </div>
                                            
                                            <div className={`relative pl-6 border-l-2 transition-all duration-500 ${startTyping ? 'border-[#0077b5] shadow-[inset_14px_0_20px_-10px_rgba(0,119,181,0.2)]' : 'border-transparent'}`}>
                                                <div className="mb-6 text-zinc-200">Hi Sarah,</div>
                                                <div className="mb-6 flex flex-wrap gap-x-1 gap-y-2 items-center text-zinc-300">
                                                    <Typewriter 
                                                        text="Congrats on your promotion to " 
                                                        start={startTyping} 
                                                        delay={1000}
                                                        speed={20}
                                                    />
                                                    <PersonalizedSpan text="Head of AI" start={startTyping} delay={1800} />
                                                    <Typewriter text=" at TechFlow! With your recent " start={startTyping} delay={2200} speed={20} />
                                                    <PersonalizedSpan text="Series A funding" start={startTyping} delay={2800} />
                                                    <Typewriter text=", I'd love to connect and share how we help AI leaders scale their outreach." start={startTyping} delay={3200} speed={20} />
                                                </div>
                                                <div className={`transition-opacity duration-500 text-zinc-400 ${status === 'done' ? 'opacity-100' : 'opacity-0'}`}>Best,<br/><span className="text-[#0077b5] font-bold">Alex</span></div>
                                            </div>
                                        </>
                                    )}
                                </div>
                                
                                {(activeTab === 'email' || activeTab === 'linkedin') && (
                                    <div className="h-20 bg-black/40 border-t border-white/[0.04] flex items-center justify-between px-8 shrink-0 backdrop-blur-sm">
                                        <div className="flex items-center gap-3 text-zinc-500 hover:text-zinc-300 cursor-pointer transition-colors"><MoreHorizontal className="w-5 h-5" /></div>
                                        <div className="flex items-center gap-4">
                                            <button className="text-xs font-bold text-zinc-500 hover:text-white transition-colors px-3 py-1.5 uppercase tracking-wider">Discard</button>
                                            <button className="text-xs font-bold text-zinc-300 hover:bg-white/[0.05] rounded-xl px-6 py-3 transition-colors border border-transparent hover:border-white/10">Edit</button>
                                            <button
                                             onClick={() => {
                    window.open('https://app.nexuscale.ai/users/register', '_blank');
                  }}
                                            className={`text-xs font-bold text-white ${neu.btnBrand} rounded-xl px-8 py-3 flex items-center gap-2 ${status === 'done' ? 'scale-100 opacity-100' : 'opacity-50 grayscale scale-95'}`}>
                                                {activeTab === 'email' ? <Mail className="w-4 h-4" /> : <LinkedInIcon className="w-4 h-4" />} 
                                                {activeTab === 'email' ? 'Send Now' : 'Send Request'}
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

