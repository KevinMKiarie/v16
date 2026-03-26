import { ScrollReveal } from '../components/ScrollReveal';
import { VerticalMarqueeColumn } from '../components/VerticalMarqueeColumn';
import { reviews } from '../data/reviews';

export default function ReviewsSection() {
    const col1 = [reviews[0], reviews[3], reviews[6]];
    const col2 = [reviews[1], reviews[4], reviews[7]];
    const col3 = [reviews[2], reviews[5], reviews[8]];
    return (
        <section className={`mx-6 mb-32 rounded-[4rem] bg-[#050505] border border-white/5 relative overflow-hidden shadow-2xl`}>
            <div className="absolute inset-0 bg-gradient-to-b from-indigo-900/10 to-transparent pointer-events-none" />
            <div className="relative z-10 w-full h-[800px] overflow-hidden py-32">
                <ScrollReveal>
                    <div className="text-center mb-24 max-w-7xl mx-auto px-6"><h2 className="text-4xl md:text-6xl lg:text-6xl font-bold text-white tracking-tighter justify-center mb-8 leading-[0.9] max-w-4xl mx-auto">What Founders Are Saying</h2></div>
                </ScrollReveal>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto px-6">
                    <VerticalMarqueeColumn items={col1} duration="30s" />
                    <VerticalMarqueeColumn items={col2} reverse={true} duration="36s" />
                    <VerticalMarqueeColumn items={col3} duration="33s" />
                </div>
            </div>
        </section>
    );
}

