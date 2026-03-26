import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ScrollReveal } from '../components/ScrollReveal';
import {
  ArrowRight,
  ChevronDown,
  Eye,
  FormInput,
  Workflow,
  Users,
  BarChart3,
  Clock,
  Zap,
  Target,
  Bot,
  Route,
  CalendarCheck,
  LineChart,
  Sparkles,
  Globe,
  UserCheck,
  Filter,
  Mail,
  BrainCircuit,
} from 'lucide-react';

const metrics = [
  { value: '47%', label: 'More Conversions', description: 'Increase in inbound lead-to-meeting rate' },
  { value: '3.2x', label: 'Meeting Bookings', description: 'More demos booked from inbound traffic' },
  { value: '58%', label: 'Less Tool Spend', description: 'Reduction in technology stack costs' },
];

const pillars = [
  {
    id: 'identify',
    label: 'Identify',
    icon: Eye,
    headline: 'Reveal the companies behind every visit',
    description: 'Most of your website traffic leaves without converting. Nexuscale unmasks anonymous visitors, identifies decision-makers, and gives your team the intelligence to engage before leads go cold.',
    features: [
      { icon: Globe, title: 'Website Visitor Tracking', text: 'See which companies are browsing your site in real-time, even if they never fill out a form.' },
      { icon: Users, title: 'Decision-Maker Discovery', text: 'AI automatically identifies the right contacts at visiting accounts based on your ideal customer profile.' },
      { icon: BrainCircuit, title: 'AI Research Prompts', text: 'Generate instant context on any visitor — company size, tech stack, funding, and buying signals.' },
    ],
  },
  {
    id: 'capture',
    label: 'Capture',
    icon: FormInput,
    headline: 'Convert more leads with shorter forms',
    description: 'Every form field you add costs you conversions. Nexuscale enriches submissions in real-time with 65+ data points so you can keep forms short while capturing everything your sales team needs.',
    features: [
      { icon: Sparkles, title: 'Form Enrichment', text: 'Capture just an email — we auto-fill job title, company, industry, revenue, and 60+ more fields instantly.' },
      { icon: UserCheck, title: 'Lead Qualification', text: 'AI scores and qualifies every submission against your ICP in real-time, before it reaches your CRM.' },
      { icon: Filter, title: 'Smart Routing', text: 'Route high-intent leads directly to the right rep based on territory, segment, or account ownership.' },
    ],
  },
  {
    id: 'automate',
    label: 'Automate',
    icon: Workflow,
    headline: 'Keep leads moving with smart automation',
    description: 'Speed-to-lead determines whether you win or lose. Nexuscale automates routing, follow-up, and nurturing so no inbound lead ever waits for a human to take action.',
    features: [
      { icon: Route, title: 'Intelligent Lead Routing', text: 'Auto-assign leads to the right rep instantly based on custom rules — territory, company size, or deal stage.' },
      { icon: CalendarCheck, title: 'Instant Meeting Booking', text: 'Let qualified leads book directly on rep calendars, embedded in your forms or triggered by lead score.' },
      { icon: Bot, title: 'AI Workflow Engine', text: 'Build no-code automation flows that trigger sequences, update CRM fields, and alert reps in real-time.' },
    ],
  },
];

const testimonials = [
  {
    quote: "We went from losing 60% of our inbound leads to converting nearly half of them into qualified meetings. Nexuscale's visitor tracking changed everything.",
    name: 'Sarah Chen',
    role: 'VP of Marketing',
    company: 'ScaleOps',
  },
  {
    quote: "Our forms went from 8 fields to 2, and we're actually capturing more data than before. The enrichment is instant and incredibly accurate.",
    name: 'Marcus Johnson',
    role: 'Head of Growth',
    company: 'DataBridge',
  },
  {
    quote: "Speed-to-lead dropped from 4 hours to under 2 minutes. Our reps are engaging leads while they're still on the website.",
    name: 'Priya Patel',
    role: 'Sales Director',
    company: 'CloudSync',
  },
];

const resources = [
  { title: 'Inbound Lead Sequence Templates', description: 'Pre-built multi-touch sequences optimized for inbound follow-up.', tag: 'Template' },
  { title: 'Website Visitor Playbook', description: 'How to identify, qualify, and engage anonymous website traffic.', tag: 'Guide' },
  { title: 'Form Optimization Guide', description: 'Reduce form fields by 70% without losing data quality.', tag: 'Guide' },
  { title: 'Inbound + Outbound Integration', description: 'Combine your inbound and outbound motions for maximum pipeline.', tag: 'Webinar' },
];

const faqs = [
  {
    q: 'How does website visitor tracking work?',
    a: 'Nexuscale uses reverse IP lookup combined with our proprietary database to identify the companies visiting your website. We then match visitors to specific contacts using behavioral signals, giving your team actionable leads — not just company names.',
  },
  {
    q: 'Will form enrichment slow down my website?',
    a: 'No. Our enrichment runs asynchronously after form submission, so there is zero impact on page load speed or form submission time. Enriched data is available in your CRM within seconds.',
  },
  {
    q: 'Can I customize lead scoring criteria?',
    a: 'Absolutely. You can define custom scoring models based on firmographic data, engagement behavior, intent signals, and any custom fields. AI also learns from your conversion data to improve scoring over time.',
  },
  {
    q: 'How does lead routing work?',
    a: 'You define routing rules based on any combination of criteria — territory, company size, industry, lead score, or account ownership. Leads are assigned instantly upon submission, and reps are notified in real-time.',
  },
  {
    q: 'Does this integrate with my existing CRM?',
    a: 'Yes. We have native integrations with Salesforce, HubSpot, and Pipedrive. All enriched data, lead scores, and activity logs sync bi-directionally in real-time.',
  },
];

export default function InboundSolutionPage() {
  const [activePillar, setActivePillar] = useState('identify');
  const [openFaq, setOpenFaq] = useState(null);

  const currentPillar = pillars.find((p) => p.id === activePillar);

  return (
    <div className="animate-in fade-in slide-in-from-bottom-8 duration-400 pb-20 md:pb-32">

      {/* ── Hero ── */}
      <section className="relative pt-8 pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-500/[0.03] to-transparent pointer-events-none" />
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <ScrollReveal>
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/[0.08] bg-white/[0.03] text-xs text-zinc-400 mb-6">
                  <Zap className="w-3.5 h-3.5 text-indigo-400" />
                  Inbound Solutions
                </div>
              </ScrollReveal>
              <ScrollReveal delay={100}>
                <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white leading-[1.1] mb-6">
                  Convert inbound leads into{' '}
                  <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-purple-400 bg-clip-text text-transparent">
                    B2B pipeline
                  </span>
                </h1>
              </ScrollReveal>
              <ScrollReveal delay={200}>
                <p className="text-lg text-zinc-400 leading-relaxed mb-8">
                  Never let a hot lead go cold again. Turn every inbound visit into pipeline with
                  visitor tracking, form enrichment, and automatic routing.
                </p>
              </ScrollReveal>
              <ScrollReveal delay={300}>
                <div className="flex flex-col sm:flex-row items-start gap-4">
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
            <ScrollReveal delay={200} direction="right">
              <div className="relative rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/[0.04] via-transparent to-violet-500/[0.04] pointer-events-none" />
                <div className="relative space-y-4">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                    <span className="text-xs text-zinc-500">Live Visitor Feed</span>
                  </div>
                  {[
                    { company: 'Acme Corp', visitors: 3, score: 92, status: 'Hot' },
                    { company: 'TechFlow Inc', visitors: 1, score: 78, status: 'Warm' },
                    { company: 'DataVault', visitors: 5, score: 95, status: 'Hot' },
                    { company: 'ScaleWorks', visitors: 2, score: 64, status: 'Warm' },
                  ].map((v, i) => (
                    <div key={i} className="flex items-center justify-between py-3 px-4 rounded-lg bg-white/[0.02] border border-white/[0.04]">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center text-xs font-bold text-indigo-400">
                          {v.company[0]}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-white">{v.company}</p>
                          <p className="text-xs text-zinc-500">{v.visitors} active visitor{v.visitors > 1 ? 's' : ''}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-xs text-zinc-500">Score: {v.score}</span>
                        <span className={`text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                          v.status === 'Hot' ? 'text-orange-400 bg-orange-500/10' : 'text-yellow-400 bg-yellow-500/10'
                        }`}>
                          {v.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ── Metrics ── */}
      <section className="max-w-5xl mx-auto px-6 mb-24">
        <div className="grid sm:grid-cols-3 gap-4">
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

      {/* ── Three-Pillar Features ── */}
      <section className="max-w-5xl mx-auto px-6 mb-24">
        <ScrollReveal>
          <div className="text-center mb-12">
            <p className="text-sm font-medium text-indigo-400 mb-3 tracking-wide uppercase">How It Works</p>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Identify. Capture. Automate.</h2>
            <p className="text-zinc-400 max-w-xl mx-auto">
              A three-step engine that turns anonymous traffic into booked meetings.
            </p>
          </div>
        </ScrollReveal>

        {/* Pillar Tabs */}
        <ScrollReveal delay={100}>
          <div className="flex items-center justify-center gap-2 mb-12">
            {pillars.map((p) => (
              <button
                key={p.id}
                onClick={() => setActivePillar(p.id)}
                className={`flex items-center gap-2 px-5 py-2.5 text-sm font-medium rounded-xl transition-all ${
                  activePillar === p.id
                    ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-lg shadow-indigo-500/20'
                    : 'text-zinc-400 border border-white/[0.08] hover:bg-white/[0.04]'
                }`}
              >
                <p.icon className="w-4 h-4" />
                {p.label}
              </button>
            ))}
          </div>
        </ScrollReveal>

        {/* Active Pillar Content */}
        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-8 md:p-10">
          <div className="max-w-3xl mb-8">
            <h3 className="text-2xl font-bold text-white mb-3">{currentPillar.headline}</h3>
            <p className="text-zinc-400 leading-relaxed">{currentPillar.description}</p>
          </div>
          <div className="grid sm:grid-cols-3 gap-4">
            {currentPillar.features.map((f, i) => (
              <div key={i} className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-5 hover:border-indigo-500/20 transition-all">
                <div className="w-9 h-9 rounded-lg bg-indigo-500/10 flex items-center justify-center mb-3">
                  <f.icon className="w-4.5 h-4.5 text-indigo-400" />
                </div>
                <h4 className="text-sm font-semibold text-white mb-2">{f.title}</h4>
                <p className="text-xs text-zinc-400 leading-relaxed">{f.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="max-w-5xl mx-auto px-6 mb-24">
        <ScrollReveal>
          <div className="text-center mb-12">
            <p className="text-sm font-medium text-indigo-400 mb-3 tracking-wide uppercase">Customer Stories</p>
            <h2 className="text-3xl md:text-4xl font-bold text-white">Trusted by Revenue Teams</h2>
          </div>
        </ScrollReveal>
        <div className="grid sm:grid-cols-3 gap-4">
          {testimonials.map((t, i) => (
            <ScrollReveal key={i} delay={i * 100}>
              <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 flex flex-col h-full">
                <p className="text-sm text-zinc-300 leading-relaxed mb-6 flex-1">"{t.quote}"</p>
                <div>
                  <p className="text-sm font-semibold text-white">{t.name}</p>
                  <p className="text-xs text-zinc-500">{t.role}, {t.company}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* ── Resources ── */}
      <section className="max-w-5xl mx-auto px-6 mb-24">
        <ScrollReveal>
          <div className="text-center mb-12">
            <p className="text-sm font-medium text-indigo-400 mb-3 tracking-wide uppercase">Resources</p>
            <h2 className="text-3xl md:text-4xl font-bold text-white">Templates & Guides</h2>
          </div>
        </ScrollReveal>
        <div className="grid sm:grid-cols-2 gap-4">
          {resources.map((r, i) => (
            <ScrollReveal key={i} delay={i * 80}>
              <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-5 hover:border-indigo-500/20 transition-all flex items-start gap-4">
                <div className="shrink-0 w-9 h-9 rounded-lg bg-indigo-500/10 flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-indigo-400" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="text-sm font-semibold text-white">{r.title}</h4>
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded-full">
                      {r.tag}
                    </span>
                  </div>
                  <p className="text-xs text-zinc-400 leading-relaxed">{r.description}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="max-w-3xl mx-auto px-6 mb-24">
        <ScrollReveal>
          <div className="text-center mb-12">
            <p className="text-sm font-medium text-indigo-400 mb-3 tracking-wide uppercase">FAQ</p>
            <h2 className="text-3xl md:text-4xl font-bold text-white">Common Questions</h2>
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
                  <ChevronDown className={`w-4 h-4 text-zinc-500 shrink-0 transition-transform duration-200 ${openFaq === i ? 'rotate-180' : ''}`} />
                </button>
                <div className={`overflow-hidden transition-all duration-300 ${openFaq === i ? 'max-h-60 pb-5' : 'max-h-0'}`}>
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
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Your next best customers are at your fingertips
              </h2>
              <p className="text-zinc-400 mb-8 max-w-md mx-auto">
                Don't let them go cold. Start converting inbound traffic into qualified pipeline today.
              </p>
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
                <Link
                  to="/pricing"
                  className="inline-flex items-center gap-2 px-8 py-3.5 text-sm font-semibold text-zinc-300 border border-white/[0.1] rounded-xl hover:bg-white/[0.04] transition-all"
                >
                  See Pricing
                </Link>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
}
