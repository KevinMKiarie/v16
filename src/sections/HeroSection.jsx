import { Sparkles } from "lucide-react";
import { ScrollReveal } from "../components/ScrollReveal";
import HeroInput from "../components/HeroInput";
import DashboardMockup from "../components/DashboardMockup";
import { customerLogos } from "../data/pricing";
import G2ReviewCard from "../components/G2ReviewCard";
import Silk from "../components/Silk";
import WhyPaySection from "./ComparisonSection";

export default function HeroSection() {
  return (
    <section className="relative pt-16 pb-40 overflow-visible ">
      <div
        className="absolute z-0 pointer-events-none"
        style={{
          top: "-10%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "100%",
          height: "50%",
          borderRadius: "0 0 50% 50%",
          overflow: "hidden",
          opacity: 0.15,
        }}
      >
        <Silk
          speed={3}
          scale={1.5}
          color="#6B6BFF"
          noiseIntensity={0.7}
          rotation={0.2}
        />
        {/* Bottom fade overlay */}
        <div
          className="absolute inset-x-0 bottom-0 h-1/2 pointer-events-none"
          style={{
            background: "linear-gradient(to top, #09090B 0%, transparent 100%)",
          }}
        />
        {/* Left corner blur */}
        <div
          className="absolute bottom-0 left-0 w-1/3 h-2/3 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at bottom left, #09090B 0%, transparent 70%)",
          }}
        />
        {/* Right corner blur */}
        <div
          className="absolute bottom-0 right-0 w-1/3 h-2/3 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at bottom right, #09090B 0%, transparent 70%)",
          }}
        />
      </div>
      <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
        <ScrollReveal>
          <h1 className="text-4xl md:text-7xl font-extrabold tracking-tight text-white mb-10 leading-[1.1] drop-shadow-2xl  gap-1">
            <h1>Your outbound stack has 6 tools.</h1>
            <span
              style={{
                background: "linear-gradient(to right, #6B6BFF, #00DDFF)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Ours has one.
            </span>
          </h1>
        </ScrollReveal>
        <ScrollReveal delay={200}>
          <p className="text-lg md:text-xl text-zinc-400 mb-8 max-w-4xl mx-auto font-medium leading-relaxed antialiased">
            Database, AI writer, and sending infrastructure, built together. No Apollo. No Clay. No Instantly. No $4,000/yr duct-tape bill.
          </p>

          <HeroInput />

          <div className="mb-12 flex flex-col items-center gap-6 max-w-2xl mx-auto">
            <div className="flex justify-center">
              <G2ReviewCard />
            </div>
            <blockquote className="text-sm text-zinc-300 italic text-center">
              "Got 3 signups from 13 emails on day one." — <span className="font-semibold text-white not-italic">Peter Poulos, Founder, Photostudio.io</span>
            </blockquote>
            <blockquote className="text-sm text-zinc-300 italic text-center">
              "The personalization is miles ahead of anything else I've tested." — <span className="font-semibold text-white not-italic">Francis Rozange, CEO, La Factory</span>
            </blockquote>
          </div>

          <div className="mb-20 w-full max-w-5xl mx-auto overflow-hidden relative py-10">
            <div className="absolute left-0 top-0 bottom-0 w-40 bg-gradient-to-r from-[#09090B] to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-40 bg-gradient-to-l from-[#09090B] to-transparent z-10 pointer-events-none" />

            <div className="flex w-max gap-24 animate-marquee hover:[animation-play-state:paused] opacity-60 hover:opacity-100 transition-opacity duration-500">
              {customerLogos.map((logo, i) => (
                <span
                  key={i}
                  className="text-sm font-bold tracking-[0.2em] text-white whitespace-nowrap select-none cursor-default"
                >
                  {logo}
                </span>
              ))}
              {customerLogos.map((logo, i) => (
                <span
                  key={`dup-${i}`}
                  className="text-sm font-bold tracking-[0.2em] text-white whitespace-nowrap select-none cursor-default"
                >
                  {logo}
                </span>
              ))}
            </div>
          </div>
          <div>
            <WhyPaySection />
          </div>
        </ScrollReveal>
        <DashboardMockup />
      </div>
    </section>
  );
}
