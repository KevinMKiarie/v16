import React, { useState, useEffect } from 'react';
import { ArrowRight, Target, Zap, Shield, Eye, ChevronDown } from 'lucide-react';

function Doctrine() {
  const [visibleSections, setVisibleSections] = useState({});
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollProgress, setScrollProgress] = useState(0);
  const [scrolled, setScrolled] = useState(false);

  // Mouse tracking for the background radial gradient effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Scroll progress bar and navigation background state
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setScrollProgress(progress);
      setScrolled(scrollTop > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Intersection Observer to trigger section animations on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const sectionId = entry.target.getAttribute('data-section-id');
          if (sectionId) {
            setVisibleSections(prev => ({ ...prev, [sectionId]: entry.isIntersecting }));
          }
        });
      },
      { threshold: 0.2, rootMargin: '0px 0px -50px 0px' }
    );

    document.querySelectorAll('[data-section-id]').forEach((section) => {
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  // Helper to generate animation classes
  const getAnimationClass = (id, delay = '') => {
    const baseClass = `transition-all duration-1000 ease-out ${delay}`;
    return visibleSections[id]
      ? `${baseClass} opacity-100 translate-y-0 translate-x-0`
      : `${baseClass} opacity-0 translate-y-10`;
  };

  const getSideAnimationClass = (id, from, delay = '') => {
    const baseClass = `transition-all duration-1000 ease-out ${delay}`;
    const translateDirection = from === 'left' ? '-translate-x-10' : 'translate-x-10';
    return visibleSections[id]
      ? `${baseClass} opacity-100 translate-y-0 translate-x-0`
      : `${baseClass} opacity-0 translate-y-10 ${translateDirection}`;
  }

  return (
    <div className="min-h-screen bg-[#0f0f11] text-[#e8e8e8] antialiased overflow-x-hidden mb-20 md:mb-28">
      {/* Scroll Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-0.5 bg-transparent z-50">
        <div
          className="h-full bg-[#787ff6] transition-all duration-300 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Background Effects: Radial gradient and subtle grid */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div
          className="absolute inset-0 opacity-[0.03] transition-opacity duration-500"
          style={{
            background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(120, 127, 246, 0.4) 0%, transparent 40%)`
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(120, 127, 246, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(120, 127, 246, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '100px 100px'
          }}
        />
      </div>

      {/* Hero Section */}
      <section
        className="min-h-screen flex items-center justify-center relative pt-32 md:pt-40"
        data-section-id="hero"
      >
        <div className="px-8 text-center">
          <div className={getAnimationClass('hero')}>
            <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-2 mb-8">
              <div className="w-2 h-2 bg-[#787ff6] rounded-full animate-pulse"></div>
              <span className="text-sm text-[#a8a8a8] font-medium">Autonomous Outbound System</span>
            </div>
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold leading-tight tracking-tighter">
              The Doctrine of
              <span className="block text-[#787ff6] -mt-2 md:-mt-4">
                Nexuscale
              </span>
            </h1>

            <div className="w-24 h-px bg-[#787ff6] mx-auto mb-12"></div>

            <p className="text-xl md:text-2xl text-[#a8a8a8] mb-16 max-w-4xl mx-auto leading-relaxed">
              Not a stack. A strike.<br />
              Not a tool. A doctrine.<br />
              <span className="text-[#e8e8e8] font-normal">Built to deliver. Relentlessly.</span>
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-20">
              <button 
                onClick={() => window.open('https://app.nexuscale.ai', '_blank')} 
                className="group bg-[#787ff6] hover:bg-[#6366f1] text-white px-8 py-4 rounded-full text-lg font-medium transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-[#787ff6]/25 flex items-center justify-center gap-3"
              >
                Deploy Your Agent
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
              <button 
                onClick={() => window.open('https://youtu.be/_CjB6ScFcw0', '_blank')}
                className="group border border-white/10 hover:border-white/20 text-[#a8a8a8] hover:text-[#e8e8e8] px-8 py-4 rounded-full text-lg font-medium transition-all duration-300 hover:bg-white/5 flex items-center justify-center gap-3"
              >
                Watch Demo
                <Eye className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
              </button>
            </div>
            <ChevronDown className="w-6 h-6 text-[#6b6b6b] mx-auto animate-bounce" />
          </div>
        </div>
      </section>

      {/* Opening Statement */}
      <section
        className="py-32 bg-[#0a0a0c] border-y border-white/5"
        data-section-id="statement"
      >
        <div className="max-w-5xl mx-auto px-8">
          <div className="text-center mb-24">
            <h2 className={`text-5xl md:text-7xl font-medium mb-12 text-[#e8e8e8] leading-tight tracking-tight ${getAnimationClass('statement')}`}>
              B2B sales today is a <span className="text-[#787ff6]">battlefield</span>.
            </h2>
            <p className={`text-2xl text-[#a8a8a8] leading-relaxed max-w-4xl mx-auto ${getAnimationClass('statement', 'delay-200')}`}>
              It's loud. Crowded. Full of noise, dashboards, and stitched-together tools chasing "efficiency."
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-16 items-center mb-24">
            <div className={`space-y-8 text-lg text-[#b8b8b8] leading-relaxed ${getSideAnimationClass('statement', 'left', 'delay-300')}`}>
              <p>We've seen this world up close—the endless hunt for an edge, the parade of product launches, the theater of funding rounds.</p>
              <p>Behind the scenes? Brilliant teams running harder than ever, armed with complex stacks and imperfect data.</p>
            </div>

            <div className={`bg-white/5 border border-white/10 rounded-3xl p-12 text-center ${getSideAnimationClass('statement', 'right', 'delay-300')}`}>
              <p className="text-xl text-[#e8e8e8] font-normal mb-6">But in that chaos, we saw something else:</p>
              <p className="text-4xl text-[#787ff6] font-medium">A deeper truth.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Beliefs */}
      <section
        className="py-32"
        data-section-id="beliefs"
      >
        <div className="max-w-7xl mx-auto px-8">
          <div className={`text-center mb-20 ${getAnimationClass('beliefs')}`}>
            <h2 className="text-5xl md:text-6xl font-medium text-[#e8e8e8] mb-6 leading-tight tracking-tight">
              Our Core Beliefs
            </h2>
            <div className="w-16 h-px bg-[#787ff6] mx-auto"></div>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Belief 1 */}
            <div className={getAnimationClass('beliefs', 'delay-200')}>
              <div className="bg-[#0f0f11] border border-white/10 rounded-2xl p-10 h-full hover:border-white/20 transition-all duration-500 hover:transform hover:-translate-y-2">
                <div className="w-16 h-16 bg-[#787ff6]/10 rounded-2xl flex items-center justify-center mb-8">
                  <Target className="w-8 h-8 text-[#787ff6]" />
                </div>
                <h3 className="text-2xl font-medium text-[#e8e8e8] mb-8 leading-tight">Outcome is the only measure.</h3>
                <p className="text-[#a8a8a8] leading-relaxed">If a system fails once, we rebuild it. No band-aids. No excuses. <span className="text-[#e8e8e8]">Reliability isn't a feature—it's our morality.</span></p>
              </div>
            </div>

            {/* Belief 2 */}
            <div className={getAnimationClass('beliefs', 'delay-400')}>
              <div className="bg-[#0f0f11] border border-white/10 rounded-2xl p-10 h-full hover:border-white/20 transition-all duration-500 hover:transform hover:-translate-y-2">
                <div className="w-16 h-16 bg-[#787ff6]/10 rounded-2xl flex items-center justify-center mb-8">
                  <Zap className="w-8 h-8 text-[#787ff6]" />
                </div>
                <h3 className="text-2xl font-medium text-[#e8e8e8] mb-8 leading-tight">Capital efficiency is a weapon.</h3>
                <p className="text-[#a8a8a8] leading-relaxed">Early constraints forced us to be sharper. Faster. Cleaner. <span className="text-[#e8e8e8]">This muscle became our superpower.</span></p>
              </div>
            </div>

            {/* Belief 3 */}
            <div className={getAnimationClass('beliefs', 'delay-600')}>
              <div className="bg-[#0f0f11] border border-white/10 rounded-2xl p-10 h-full hover:border-white/20 transition-all duration-500 hover:transform hover:-translate-y-2">
                <div className="w-16 h-16 bg-[#787ff6]/10 rounded-2xl flex items-center justify-center mb-8">
                  <Shield className="w-8 h-8 text-[#787ff6]" />
                </div>
                <h3 className="text-2xl font-medium text-[#e8e8e8] mb-8 leading-tight">Deliver results, not roadmaps.</h3>
                <p className="text-[#a8a8a8] leading-relaxed">We don't sell "AI insights." We deliver what operators need: <span className="text-[#e8e8e8]">predictable pipeline and clarity on which hill to take next.</span></p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Manifesto / The System */}
      <section
        className="py-32 bg-[#0a0a0c] border-y border-white/5"
        data-section-id="manifesto"
      >
        <div className="max-w-5xl mx-auto text-center px-8">
          <h2 className={`text-5xl md:text-7xl font-medium text-[#e8e8e8] mb-16 leading-tight tracking-tight ${getAnimationClass('manifesto')}`}>
            Nexuscale is not a <span className="text-[#787ff6]">company</span>.
          </h2>

          <div className={`grid md:grid-cols-2 gap-16 items-center mb-20 ${getAnimationClass('manifesto', 'delay-200')}`}>
            <div className="text-left space-y-8 text-xl text-[#a8a8a8] leading-relaxed">
              <p>It's a system. A mission. A doctrine in motion.</p>
              <p>It doesn't sit in a dashboard. It acts. It thinks. It executes.</p>
              <p>It's the embodiment of our belief that outbound can be autonomous, precise, and unstoppable.</p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-3xl p-12">
              <div className="space-y-6 text-lg text-[#a8a8a8]">
                <p>The market is crowded. We like that.</p>
                <p>It means outcomes—not noise—will win.</p>
                <p className="text-[#787ff6] font-normal text-xl border-l-2 border-[#787ff6] pl-4">
                  It means the quiet ones with the sharpest systems will rise.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section
        className="py-32"
        data-section-id="cta"
      >
        <div className="max-w-4xl mx-auto text-center px-8">
          <div className={getAnimationClass('cta')}>
            <h2 className="text-5xl md:text-7xl font-medium text-[#e8e8e8] mb-16 leading-tight tracking-tight">
              This is Nexuscale.
            </h2>

            <div className="text-2xl text-[#a8a8a8] mb-20 space-y-4">
              <p>Not a stack. A strike.</p>
              <p>Not a tool. A doctrine.</p>
              <p className="text-[#787ff6] font-medium text-4xl mt-8">Built to deliver. Relentlessly.</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button 
                onClick={() => window.open('https://app.nexuscale.ai', '_blank')}
                className="group bg-[#787ff6] hover:bg-[#6366f1] text-white px-10 py-5 rounded-full text-xl font-medium transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-[#787ff6]/25 flex items-center justify-center gap-3"
              >
                Deploy Your Agent
                <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Doctrine;

