import { Activity } from 'lucide-react';
import { Button } from '../components/Button';
import { SpotlightCard } from '../components/SpotlightCard';
import { neu } from '../utils/styles';
import CTASection from '../sections/CTASection';

export default function UseCasePage({ useCase }) {
    const Icon = useCase.icon;
    return (
        <div className="pt-24 min-h-screen animate-in fade-in slide-in-from-bottom-8 duration-400">
            <section className="relative py-24 px-6 overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-indigo-500/10 rounded-full blur-[150px] pointer-events-none animate-pulse-slow" />
                
                <div className="max-w-4xl mx-auto text-center relative z-10">
                    <div className={`inline-flex items-center justify-center w-24 h-24 rounded-3xl bg-white/[0.03] text-white mb-8 border border-white/10 shadow-2xl backdrop-blur-xl ${neu.surface}`}>
                        <Icon className="w-12 h-12" />
                    </div>
                    <div className="text-indigo-400 font-bold uppercase tracking-[0.3em] mb-6 text-sm bg-indigo-500/10 px-4 py-1.5 rounded-full inline-block border border-indigo-500/20">Built For</div>
                    <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-8 tracking-tight drop-shadow-2xl">{useCase.title}</h1>
                    <p className="text-2xl text-zinc-300 max-w-2xl mx-auto leading-relaxed mb-12 font-medium">{useCase.desc}</p>
                    <div className="flex justify-center gap-6">
                        <Button 
                            text="Get Started" 
                            variant="brand" 
                            className="px-10 py-4 h-14"
                            onClick={() => window.open('https://app.nexuscale.ai/users/register', '_blank')}
                        />
                        <Button 
                            text="Talk to Sales" 
                            variant="secondary" 
                            className="px-10 py-4 h-14"
                            onClick={() => window.open('https://cal.com/kevin-nexuscale/15min', '_blank')}
                        />
                    </div>
                </div>
            </section>
            
            <section className="py-24 px-6 border-y border-white/5 bg-black/20 backdrop-blur-sm">
                <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
                    {useCase.benefits?.map((benefit, i) => (
                        <SpotlightCard key={i} className="p-10 rounded-3xl h-full flex flex-col hover:border-indigo-500/30 group">
                            <div className="w-14 h-14 bg-indigo-500/10 rounded-2xl flex items-center justify-center mb-8 text-indigo-400 border border-indigo-500/20 group-hover:scale-110 transition-transform duration-500 shadow-[0_0_20px_rgba(99,102,241,0.2)]">
                                <Activity className="w-7 h-7" />
                            </div>
                            <h3 className="text-white font-bold mb-4 text-2xl tracking-tight">{benefit.title}</h3>
                            <p className="text-base text-zinc-400 leading-relaxed font-medium">{benefit.desc}</p>
                        </SpotlightCard>
                    ))}
                </div>
            </section>
            <CTASection />
        </div>
    );
}
