import { CheckCircle2 } from 'lucide-react';
import { Button } from '../components/Button';
import { SpotlightCard } from '../components/SpotlightCard';
import { neu } from '../utils/styles';
import CTASection from '../sections/CTASection';

export default function FeaturePage({ feature }) {
    const Icon = feature.icon;
    return (
        <div className="pt-24 min-h-screen animate-in fade-in slide-in-from-bottom-8 duration-400">
            <section className="relative py-24 px-6 overflow-hidden">
                {/* Background FX for Feature Page */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-600/10 rounded-full blur-[150px] pointer-events-none animate-pulse-slow" />
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-600/5 rounded-full blur-[120px] pointer-events-none" />

                <div className="max-w-4xl mx-auto text-center relative z-10">
                    <div className={`inline-flex items-center justify-center w-24 h-24 rounded-3xl bg-indigo-500/10 text-indigo-400 mb-8 border border-indigo-500/20 shadow-[0_0_50px_-10px_rgba(99,102,241,0.4)] backdrop-blur-xl ${neu.surface}`}>
                        {typeof Icon === "string" ? (
                            <img src={Icon} alt="" className="w-12 h-12 brightness-0 invert" />
                        ) : (
                            <Icon className="w-12 h-12 drop-shadow-[0_0_15px_rgba(99,102,241,0.5)]" />
                        )}
                    </div>
                    <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-8 tracking-tight drop-shadow-2xl flex flex-col items-center gap-4">
                        {feature.title}
                        {feature.comingSoon && (
                            <span className="text-sm bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-1.5 rounded-full uppercase tracking-widest font-bold shadow-[0_0_20px_rgba(99,102,241,0.4)] animate-pulse border border-white/10">
                                Coming Soon
                            </span>
                        )}
                    </h1>
                    <p className="text-2xl text-zinc-300 max-w-2xl mx-auto leading-relaxed mb-12 font-medium">{feature.desc}</p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                        <Button 
                            text="Start Now" 
                            variant="brand" 
                            className="px-12 py-5 text-lg h-16 rounded-full shadow-[0_0_40px_rgba(99,102,241,0.4)]"
                            onClick={() => window.open('https://app.nexuscale.ai/users/register', '_blank')}
                        />
                        <Button 
                            text="Book Demo" 
                            variant="secondary" 
                            className="px-10 py-5 text-lg h-16 rounded-full"
                            onClick={() => window.open('https://cal.com/kevin-nexuscale/15min', '_blank')}
                        />
                    </div>
                </div>
            </section>
            
            <section className="py-24 px-6 border-y border-white/5 bg-black/20 backdrop-blur-sm">
                <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
                    {feature.benefits?.map((benefit, i) => (
                        <SpotlightCard key={i} className="p-8 rounded-3xl h-full flex flex-col items-center text-center backdrop-blur-md border-white/10 hover:border-indigo-500/30">
                            <div className="w-16 h-16 bg-gradient-to-br from-white/5 to-transparent rounded-2xl flex items-center justify-center mb-6 text-zinc-300 border border-white/10 shadow-lg group-hover:scale-110 transition-transform duration-500">
                                <CheckCircle2 className="w-8 h-8 text-indigo-400 drop-shadow-[0_0_10px_rgba(99,102,241,0.5)]" />
                            </div>
                            <h3 className="text-white font-bold mb-4 text-xl flex items-center gap-2 justify-center tracking-tight">
                                {benefit.title}
                                {benefit.soon && (
                                    <span className="text-[10px] bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 px-2 py-0.5 rounded uppercase tracking-wide font-bold">Soon</span>
                                )}
                            </h3>
                            <p className="text-base text-zinc-400 leading-relaxed font-medium">{benefit.desc}</p>
                        </SpotlightCard>
                    ))}
                </div>
            </section>
            <CTASection />
        </div>
    );
}
