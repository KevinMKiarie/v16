import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ScrollReveal } from '../components/ScrollReveal';
import {
  ArrowRight,
  ChevronDown,
  Zap,
  Target,
  BarChart3,
  Globe,
  Shield,
  ShieldCheck,
  Lock,
  Sparkles,
  TrendingUp,
  MessageSquare,
  Search,
  Send,
  Inbox,
  Filter,
  BrainCircuit,
  Award,
  FileCheck,
  BadgeCheck,
} from 'lucide-react';

const metrics = [
  { value: '275M+', label: 'Verified Contacts', description: 'Global B2B database with real-time verification' },
  { value: '93%', label: 'Email Accuracy', description: 'Industry-leading deliverability rates' },
  { value: '10x', label: 'Pipeline Growth', description: 'Average increase in qualified pipeline' },
  { value: '60%', label: 'Time Saved', description: 'Reduction in manual prospecting effort' },
];

const outboundFeatures = [
  {
    icon: BrainCircuit,
    title: 'AI-Powered Sequencing',
    description: 'Automatically craft and send personalized multi-touch campaigns across email, LinkedIn, and calls.',
  },
  {
    icon: Send,
    title: 'Smart Sending Engine',
    description: 'Optimize send times, rotate mailboxes, and warm up domains to maximize deliverability.',
  },
  {
    icon: Target,
    title: 'Intent-Based Targeting',
    description: 'Identify accounts showing buying signals and prioritize outreach to high-intent prospects.',
  },
  {
    icon: MessageSquare,
    title: 'Hyper-Personalization',
    description: 'Generate unique messaging per prospect using AI that references their role, company, and activity.',
  },
];

const inboundFeatures = [
  {
    icon: Search,
    title: 'Lead Search & Enrichment',
    description: 'Find and enrich inbound leads with firmographic, technographic, and intent data instantly.',
  },
  {
    icon: Filter,
    title: 'Intelligent Lead Scoring',
    description: 'Score and prioritize inbound leads based on fit, engagement, and buying readiness.',
  },
  {
    icon: Inbox,
    title: 'Unified Inbox',
    description: 'Manage all inbound conversations across channels in a single AI-assisted workspace.',
  },
  {
    icon: TrendingUp,
    title: 'Conversion Optimization',
    description: 'Automatically route, nurture, and follow up with inbound leads to maximize conversion rates.',
  },
];

const certifications = [
  {
    icon: ShieldCheck,
    title: 'SOC 2 Type II',
    description: 'Independently audited for security, availability, and confidentiality controls.',
    badge: 'Certified',
  },
  {
    icon: Lock,
    title: 'GDPR Compliant',
    description: 'Full compliance with EU data protection regulations including data processing agreements.',
    badge: 'Compliant',
  },
  {
    icon: Shield,
    title: 'ISO 27001',
    description: 'Information security management system certified to international standards.',
    badge: 'Certified',
  },
  {
    icon: FileCheck,
    title: 'CCPA Compliant',
    description: 'Meeting California Consumer Privacy Act requirements for data handling and transparency.',
    badge: 'Compliant',
  },
  {
    icon: BadgeCheck,
    title: 'DPA Ready',
    description: 'Pre-signed Data Processing Agreements available for enterprise customers.',
    badge: 'Available',
  },
  {
    icon: Award,
    title: 'Privacy Shield',
    description: 'Adherence to transatlantic data privacy frameworks for secure data transfers.',
    badge: 'Verified',
  },
];

const whyReasons = [
  {
    title: 'All-in-One Platform',
    description: 'Replace 5+ tools with a single platform that handles data, outreach, deliverability, and analytics.',
    icon: Sparkles,
  },
  {
    title: 'AI-Native Architecture',
    description: 'Built from the ground up with AI at its core — not bolted on as an afterthought.',
    icon: BrainCircuit,
  },
  {
    title: 'Real-Time Data',
    description: 'Access continuously verified contact and company data so your outreach never hits dead ends.',
    icon: Globe,
  },
  {
    title: 'Enterprise-Grade Security',
    description: 'SOC 2, GDPR, and ISO 27001 certified. Your data and your prospects\' data stays protected.',
    icon: Shield,
  },
  {
    title: 'Scales With You',
    description: 'From startup to enterprise, the platform grows with your team without performance bottlenecks.',
    icon: TrendingUp,
  },
  {
    title: 'Measurable ROI',
    description: 'Track every touchpoint from first contact to closed deal with built-in attribution analytics.',
    icon: BarChart3,
  },
];

const faqs = [
  {
    q: 'What is the difference between inbound and outbound solutions?',
    a: 'Inbound solutions help you capture, enrich, score, and convert leads that come to you — through your website, content, or referrals. Outbound solutions help you proactively reach out to ideal prospects through AI-powered multi-channel campaigns including email, LinkedIn, and calls.',
  },
  {
    q: 'Can I use both inbound and outbound solutions together?',
    a: 'Absolutely. Nexuscale is designed as a unified platform. You can run outbound campaigns while simultaneously managing inbound leads — all within the same workspace with shared data and analytics.',
  },
  {
    q: 'How does Nexuscale ensure email deliverability?',
    a: 'Our smart sending engine includes automated mailbox warmup, domain rotation, send-time optimization, and real-time bounce monitoring. Combined with our 93% email accuracy rate, your messages consistently land in the primary inbox.',
  },
  {
    q: 'Is my data secure with Nexuscale?',
    a: 'Yes. We are SOC 2 Type II certified, GDPR compliant, and ISO 27001 certified. All data is encrypted at rest and in transit. We also provide Data Processing Agreements for enterprise customers.',
  },
  {
    q: 'How long does it take to get started?',
    a: 'Most teams are fully operational within 24 hours. Our onboarding flow guides you through connecting your email, importing contacts, and launching your first campaign. Enterprise deployments with custom integrations typically take 1-2 weeks.',
  },
  {
    q: 'What kind of support do you offer?',
    a: 'All plans include access to our knowledge base and community. Pro plans and above include priority email support and a dedicated customer success manager. Enterprise customers receive 24/7 support with custom SLAs.',
  },
  {
    q: 'Can Nexuscale integrate with my existing CRM?',
    a: 'Yes. We offer native integrations with Salesforce, HubSpot, Pipedrive, and other popular CRMs. Our API also enables custom integrations with any tool in your stack.',
  },
];

export default function SolutionsPage() {
  const [openFaq, setOpenFaq] = useState(null);
  const [activeTab, setActiveTab] = useState('outbound');

  return (
    <div className="animate-in fade-in slide-in-from-bottom-8 duration-400 pb-20 md:pb-32">

      {/* ── Hero Section ── */}
      <section className="relative pt-8 pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-500/[0.03] to-transparent pointer-events-none" />
        <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
          <ScrollReveal>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/[0.08] bg-white/[0.03] text-xs text-zinc-400 mb-8">
              <Zap className="w-3.5 h-3.5 text-indigo-400" />
              Revenue Acceleration Platform
            </div>
          </ScrollReveal>

          <ScrollReveal delay={100}>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white leading-[1.1] mb-6">
              Turn Every Signal Into{' '}
              <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-purple-400 bg-clip-text text-transparent">
                Revenue
              </span>
            </h1>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto mb-10 leading-relaxed">
              Nexuscale unifies your inbound and outbound motions into a single AI-powered engine —
              so your team spends less time searching and more time closing.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={300}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="https://app.nexuscale.ai/users/register"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 px-8 py-3.5 text-sm font-semibold text-white bg-gradient-to-r from-indigo-600 to-violet-600 rounded-xl hover:from-indigo-500 hover:to-violet-500 transition-all shadow-lg shadow-indigo-500/20"
              >
                Get Started Free
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </a>
              <a
                href="https://cal.com/kevin-nexuscale/15min"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-3.5 text-sm font-semibold text-zinc-300 border border-white/[0.1] rounded-xl hover:bg-white/[0.04] transition-all"
              >
                Book a Demo
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Product Power Statement ── */}
      <section className="max-w-5xl mx-auto px-6 mb-24">
        <ScrollReveal>
          <div className="relative rounded-2xl border border-white/[0.06] bg-white/[0.02] p-8 md:p-12 overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/[0.04] rounded-full blur-3xl pointer-events-none" />
            <div className="relative z-10 max-w-3xl">
              <p className="text-sm font-medium text-indigo-400 mb-4 tracking-wide uppercase">The Nexuscale Advantage</p>
              <h2 className="text-2xl md:text-3xl font-bold text-white leading-snug mb-6">
                One platform to find, engage, and convert your ideal customers — powered by AI that actually understands your market.
              </h2>
              <p className="text-zinc-400 leading-relaxed mb-6">
                Most sales teams stitch together 5-8 different tools for data, outreach, deliverability, and analytics.
                Nexuscale replaces the entire stack with a unified platform that shares intelligence across every stage of your pipeline.
                Our AI doesn't just automate — it learns your ideal customer profile, adapts messaging in real-time,
                and surfaces the signals that matter most.
              </p>
              <div className="flex flex-wrap gap-3">
                {['Verified Data', 'AI Sequencing', 'Multi-Channel', 'Real-Time Analytics'].map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1.5 text-xs font-medium rounded-full border border-white/[0.08] bg-white/[0.03] text-zinc-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* ── Metrics Section ── */}
      <section className="max-w-5xl mx-auto px-6 mb-24">
        <ScrollReveal>
          <div className="text-center mb-12">
            <p className="text-sm font-medium text-indigo-400 mb-3 tracking-wide uppercase">By the Numbers</p>
            <h2 className="text-3xl md:text-4xl font-bold text-white">Proven Results at Scale</h2>
          </div>
        </ScrollReveal>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {metrics.map((m, i) => (
            <ScrollReveal key={m.label} delay={i * 100}>
              <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 text-center hover:border-indigo-500/20 transition-colors">
                <p className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-indigo-400 via-violet-400 to-purple-400 bg-clip-text text-transparent mb-2">
                  {m.value}
                </p>
                <p className="text-sm font-semibold text-white mb-1">{m.label}</p>
                <p className="text-xs text-zinc-500">{m.description}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* ── Solutions Overview (Inbound / Outbound) ── */}
      <section className="max-w-5xl mx-auto px-6 mb-24">
        <ScrollReveal>
          <div className="text-center mb-12">
            <p className="text-sm font-medium text-indigo-400 mb-3 tracking-wide uppercase">Solutions</p>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Built for Every Revenue Motion</h2>
            <p className="text-zinc-400 max-w-xl mx-auto">
              Whether you're reaching out or pulling leads in, Nexuscale has you covered.
            </p>
          </div>
        </ScrollReveal>

        {/* Tabs */}
        <ScrollReveal delay={100}>
          <div className="flex items-center justify-center gap-2 mb-12">
            <button
              onClick={() => setActiveTab('outbound')}
              className={`px-6 py-2.5 text-sm font-medium rounded-xl transition-all ${
                activeTab === 'outbound'
                  ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-lg shadow-indigo-500/20'
                  : 'text-zinc-400 border border-white/[0.08] hover:bg-white/[0.04]'
              }`}
            >
              Outbound
            </button>
            <button
              onClick={() => setActiveTab('inbound')}
              className={`px-6 py-2.5 text-sm font-medium rounded-xl transition-all ${
                activeTab === 'inbound'
                  ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-lg shadow-indigo-500/20'
                  : 'text-zinc-400 border border-white/[0.08] hover:bg-white/[0.04]'
              }`}
            >
              Inbound
            </button>
          </div>
        </ScrollReveal>

        {/* Tab Content */}
        <div className="grid sm:grid-cols-2 gap-4">
          {(activeTab === 'outbound' ? outboundFeatures : inboundFeatures).map((f, i) => (
            <ScrollReveal key={f.title} delay={i * 80}>
              <div className="group rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 hover:border-indigo-500/20 transition-all hover:bg-white/[0.03]">
                <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center mb-4">
                  <f.icon className="w-5 h-5 text-indigo-400" />
                </div>
                <h3 className="text-base font-semibold text-white mb-2">{f.title}</h3>
                <p className="text-sm text-zinc-400 leading-relaxed">{f.description}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={400}>
          <div className="text-center mt-10">
            <Link
              to={activeTab === 'outbound' ? '/solutions/outbound' : '/solutions/inbound'}
              className="inline-flex items-center gap-2 text-sm font-medium text-indigo-400 hover:text-indigo-300 transition-colors"
            >
              Explore {activeTab === 'outbound' ? 'Outbound' : 'Inbound'} Features
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </ScrollReveal>
      </section>

      {/* ── SOC & GDPR Certifications ── */}
      <section className="max-w-5xl mx-auto px-6 mb-24">
        <ScrollReveal>
          <div className="text-center mb-12">
            <p className="text-sm font-medium text-emerald-400 mb-3 tracking-wide uppercase">Security & Compliance</p>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Enterprise-Grade Trust</h2>
            <p className="text-zinc-400 max-w-xl mx-auto">
              Your data security is non-negotiable. We hold the certifications to prove it.
            </p>
          </div>
        </ScrollReveal>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {certifications.map((cert, i) => (
            <ScrollReveal key={cert.title} delay={i * 80}>
              <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 hover:border-emerald-500/20 transition-all">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                    <cert.icon className="w-5 h-5 text-emerald-400" />
                  </div>
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full">
                    {cert.badge}
                  </span>
                </div>
                <h3 className="text-base font-semibold text-white mb-2">{cert.title}</h3>
                <p className="text-sm text-zinc-400 leading-relaxed">{cert.description}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* ── Why Nexuscale ── */}
      <section className="max-w-5xl mx-auto px-6 mb-24">
        <ScrollReveal>
          <div className="text-center mb-12">
            <p className="text-sm font-medium text-indigo-400 mb-3 tracking-wide uppercase">Why Nexuscale</p>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">The Unfair Advantage Your Team Needs</h2>
            <p className="text-zinc-400 max-w-xl mx-auto">
              Stop stitching tools together. Start closing more deals with a platform built for modern revenue teams.
            </p>
          </div>
        </ScrollReveal>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {whyReasons.map((reason, i) => (
            <ScrollReveal key={reason.title} delay={i * 80}>
              <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 hover:border-indigo-500/20 transition-all hover:bg-white/[0.03]">
                <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center mb-4">
                  <reason.icon className="w-5 h-5 text-indigo-400" />
                </div>
                <h3 className="text-base font-semibold text-white mb-2">{reason.title}</h3>
                <p className="text-sm text-zinc-400 leading-relaxed">{reason.description}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* ── FAQ Section ── */}
      <section className="max-w-3xl mx-auto px-6 mb-24">
        <ScrollReveal>
          <div className="text-center mb-12">
            <p className="text-sm font-medium text-indigo-400 mb-3 tracking-wide uppercase">FAQ</p>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Frequently Asked Questions</h2>
          </div>
        </ScrollReveal>
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <ScrollReveal key={i} delay={i * 60}>
              <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
                >
                  <span className="text-sm font-medium text-white">{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-zinc-500 shrink-0 transition-transform duration-200 ${
                      openFaq === i ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    openFaq === i ? 'max-h-60 pb-5' : 'max-h-0'
                  }`}
                >
                  <p className="px-6 text-sm text-zinc-400 leading-relaxed">{faq.a}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* ── Bottom CTA ── */}
      <section className="max-w-3xl mx-auto px-6">
        <ScrollReveal>
          <div className="relative rounded-2xl border border-white/[0.06] bg-white/[0.02] p-10 md:p-14 text-center overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/[0.05] via-transparent to-violet-500/[0.05] pointer-events-none" />
            <div className="relative z-10">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Ready to Accelerate Your Revenue?</h2>
              <p className="text-zinc-400 mb-8 max-w-md mx-auto">
                Join thousands of teams using Nexuscale to close more deals, faster.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href="https://app.nexuscale.ai/users/register"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 px-8 py-3.5 text-sm font-semibold text-white bg-gradient-to-r from-indigo-600 to-violet-600 rounded-xl hover:from-indigo-500 hover:to-violet-500 transition-all shadow-lg shadow-indigo-500/20"
                >
                  Start Now
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </a>
                <a
                  href="https://cal.com/kevin-nexuscale/15min"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-8 py-3.5 text-sm font-semibold text-zinc-300 border border-white/[0.1] rounded-xl hover:bg-white/[0.04] transition-all"
                >
                  Talk to Sales
                </a>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
}
