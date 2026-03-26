import { User } from 'lucide-react';
import { ScrollReveal } from '../components/ScrollReveal';

export default function FounderQuote() {
    return (
        <section className="py-40 max-w-4xl mx-auto px-6 text-center relative">
            <ScrollReveal direction="scale">
                <div className="mb-16 relative z-10"><p className="text-3xl md:text-5xl font-serif italic text-white leading-relaxed opacity-90 drop-shadow-lg">"We didn't build an AI to automate tasks. We built it to automate thought. It's the strategic brain I wish I'd had on day one."</p></div>
                <div className="relative z-10 flex flex-col items-center">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-zinc-700 to-zinc-800 mb-6 flex items-center justify-center border border-white/10 shadow-[0_0_20px_rgba(0,0,0,0.5)]">
                        <User className="w-6 h-6 text-zinc-400" />
                    </div>
                    <div className="text-white font-bold text-lg mb-2">Kevin Kariuki</div>
                    <div className="text-xs font-bold text-indigo-400 uppercase tracking-[0.25em]">Founder & CEO</div>
                </div>
            </ScrollReveal>
        </section>
    );
}

