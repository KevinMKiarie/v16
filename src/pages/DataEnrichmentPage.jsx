import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ScrollReveal } from '../components/ScrollReveal';
import {
  ArrowRight,
  ChevronDown,
  Zap,
  Database,
  Search,
  RefreshCw,
  Sparkles,
  BrainCircuit,
  TrendingUp,
  ShieldCheck,
  Layers,
  BarChart3,
  Download,
  Upload,
  Globe,
  Target,
  Filter,
  Activity,
  CheckCircle2,
  Plug,
} from 'lucide-react';

const metrics = [
  { value: '210M+', label: 'Contact Records', description: 'Verified B2B contacts enriched with 65+ data points' },
  { value: '35%', label: 'Higher Win Rates', description: 'When teams sell with enriched, accurate data' },
  { value: '72%', label: 'Faster Prospecting', description: 'Reduction in time spent researching leads' },
];

const pillars = [
  {
    id: 'enrich',
    label: 'Enrich',
    icon: Database,
    headline: 'Access the deepest B2B data on the market',
    description: 'Enrich any contact or company record with 65+ attributes including firmographic, technographic, and intent data. Our waterfall enrichment checks multiple sources to maximize fill rates.',
    features: [
      { icon: Layers, title: 'Waterfall Enrichment', text: 'We query multiple data sources in sequence so you get the highest possible fill rate for every field — email, phone, title, tech stack, and more.' },
      { icon: Globe, title: '210M+ Contact Database', text: 'Access one of the largest verified B2B databases, continuously updated with real-time verification and change detection.' },
      { icon: BrainCircuit, title: 'AI Research Agents', text: 'For data that doesn\'t fit neatly into fields, our AI agents perform custom research — funding history, tech stack changes, org charts, and more.' },
    ],
  },
  {
    id: 'qualify',
    label: 'Qualify',
    icon: Filter,
    headline: 'Surface the leads worth pursuing',
    description: 'Not all data is created equal. Our AI scoring and intent signals help you focus on the contacts most likely to convert — so your team stops wasting time on dead ends.',
    features: [
      { icon: Target, title: 'AI Lead Scoring', text: 'Score every record against your ideal customer profile using firmographic fit, engagement signals, and historical conversion patterns.' },
      { icon: Activity, title: 'Buyer Intent Signals', text: 'Detect real-time buying signals — job changes, funding events, technology adoptions, and content engagement across the web.' },
      { icon: Search, title: 'Custom AI Research', text: 'Ask questions about any prospect in natural language and get structured answers sourced from public data, news, and filings.' },
    ],
  },
  {
    id: 'cleanse',
    label: 'Cleanse',
    icon: RefreshCw,
    headline: 'Keep your CRM clean and actionable',
    description: 'Bad data costs you more than you think — bounced emails, wrong titles, missed signals. Nexuscale continuously cleanses and updates your records so your CRM is always ready to sell.',
    features: [
      { icon: CheckCircle2, title: 'Automated CRM Updates', text: 'Detect stale records, job changes, and company changes automatically. Push corrections to your CRM without manual intervention.' },
      { icon: Upload, title: 'CSV & Bulk Enrichment', text: 'Upload any list — CSV, spreadsheet, or export — and enrich thousands of records in minutes with full data append.' },
      { icon: Plug, title: 'API & Integrations', text: 'Enrich records in real-time via our REST API, or use native integrations with Salesforce, HubSpot, and Pipedrive for continuous sync.' },
    ],
  },
];

const testimonials = [
  {
    quote: "We've 3x'd our annual revenue since switching to Nexuscale. The data quality is in a completely different league from what we had before.",
    name: 'James Rivera',
    role: 'Founder & CEO',
    company: 'RevenueStack',
  },
  {
    quote: "Data quality improved by 50% overnight compared to our previous provider. Our reps finally trust the CRM because the data is actually accurate.",
    name: 'Lisa Nakamura',
    role: 'Revenue Operations Lead',
    company: 'GrowthWave',
  },
  {
    quote: "We enrich 100k+ leads daily without breaking a sweat. The API is fast, reliable, and the fill rates are consistently above 85%.",
    name: 'David Okafor',
    role: 'VP Engineering',
    company: 'DataForge',
  },
];

const resources = [
  { title: 'CRM Data Enrichment Playbook', description: 'Step-by-step guide to cleaning and enriching your CRM in under a week.', tag: 'Guide' },
  { title: 'Waterfall Enrichment Explained', description: 'How multi-source enrichment achieves 90%+ fill rates.', tag: 'Article' },
  { title: 'Data Quality ROI Calculator', description: 'Calculate how much bad data is costing your revenue team.', tag: 'Tool' },
  { title: 'Enterprise Data Strategy Webinar', description: 'How scaling teams build a data-first revenue engine.', tag: 'Webinar' },
];

const faqs = [
  {
    q: 'What data points does Nexuscale enrich?',
    a: 'We enrich with 65+ attributes including direct email, mobile phone, job title, seniority, department, company revenue, employee count, industry, technology stack, funding data, social profiles, and buying intent signals.',
  },
  {
    q: 'How accurate is the enrichment data?',
    a: 'Our email accuracy rate exceeds 93% through real-time verification. Firmographic data is continuously validated against multiple sources. We provide confidence scores for every field so you know exactly how reliable each data point is.',
  },
  {
    q: 'Can I enrich records in bulk?',
    a: 'Yes. You can upload CSV files of any size for bulk enrichment, use our API for programmatic enrichment, or enable continuous CRM enrichment that automatically fills in missing fields on new and existing records.',
  },
  {
    q: 'How does waterfall enrichment work?',
    a: 'When a primary source doesn\'t have a data point, we automatically query secondary and tertiary sources in sequence. This cascading approach dramatically increases fill rates compared to single-source providers.',
  },
  {
    q: 'Is the data GDPR compliant?',
    a: 'Yes. All data is sourced and processed in full compliance with GDPR, CCPA, and other privacy regulations. We provide opt-out mechanisms, data processing agreements, and privacy-by-design architecture.',
  },
];

export default function DataEnrichmentPage() {
  const [activePillar, setActivePillar] = useState('enrich');
  const [openFaq, setOpenFaq] = useState(null);

  const currentPillar = pillars.find((p) => p.id === activePillar);

  return (
    <div className="animate-in fade-in slide-in-from-bottom-8 duration-400 pb-20 md:pb-32">


      <section className="relative pt-8 pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-violet-500/[0.03] to-transparent pointer-events-none" />
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <ScrollReveal>
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/[0.08] bg-white/[0.03] text-xs text-zinc-400 mb-6">
                  <Database className="w-3.5 h-3.5 text-violet-400" />
                  Data Enrichment
                </div>
              </ScrollReveal>
              <ScrollReveal delay={100}>
                <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white leading-[1.1] mb-6">
                  Fuel smarter selling with{' '}
                  <span className="bg-gradient-to-r from-violet-400 via-purple-400 to-fuchsia-400 bg-clip-text text-transparent">
                    B2B data enrichment
                  </span>
                </h1>
              </ScrollReveal>
              <ScrollReveal delay={200}>
                <p className="text-lg text-zinc-400 leading-relaxed mb-8">
                  Stop chasing the wrong leads. Enrich every record with verified contact data,
                  firmographics, and buying signals — powered by 210M+ contacts and AI research.
                </p>
              </ScrollReveal>
              <ScrollReveal delay={300}>
                <div className="flex flex-col sm:flex-row items-start gap-4">
                  <a
                    href="https://app.nexuscale.ai/users/register"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2 px-8 py-3.5 text-sm font-semibold text-white bg-gradient-to-r from-violet-600 to-purple-600 rounded-xl hover:from-violet-500 hover:to-purple-500 transition-all shadow-lg shadow-violet-500/20"
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
                <div className="absolute inset-0 bg-gradient-to-br from-violet-500/[0.04] via-transparent to-purple-500/[0.04] pointer-events-none" />
                <div className="relative space-y-3">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs text-zinc-500">Enrichment Results</span>
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                      65+ Fields
                    </span>
                  </div>
                  {[
                    { field: 'Email', value: 'sarah.chen@acmecorp.com', status: 'verified' },
                    { field: 'Phone', value: '+1 (415) 555-0147', status: 'verified' },
                    { field: 'Title', value: 'VP of Engineering', status: 'verified' },
                    { field: 'Company Revenue', value: '$25M - $50M', status: 'enriched' },
                    { field: 'Tech Stack', value: 'AWS, React, Snowflake', status: 'enriched' },
                    { field: 'Buying Intent', value: 'High — evaluating CRMs', status: 'detected' },
                  ].map((r, i) => (
                    <div key={i} className="flex items-center justify-between py-2.5 px-4 rounded-lg bg-white/[0.02] border border-white/[0.04]">
                      <div className="flex items-center gap-3">
                        <span className="text-xs text-zinc-500 w-28">{r.field}</span>
                        <span className="text-xs text-zinc-300 font-medium">{r.value}</span>
                      </div>
                      <span className={`text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                        r.status === 'verified' ? 'text-emerald-400 bg-emerald-500/10'
                          : r.status === 'detected' ? 'text-orange-400 bg-orange-500/10'
                          : 'text-violet-400 bg-violet-500/10'
                      }`}>
                        {r.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      
      <section className="max-w-5xl mx-auto px-6 mb-24">
        <div className="grid sm:grid-cols-3 gap-4">
          {metrics.map((m, i) => (
            <ScrollReveal key={m.label} delay={i * 100}>
              <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 text-center hover:border-violet-500/20 transition-colors">
                <p className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-violet-400 via-purple-400 to-fuchsia-400 bg-clip-text text-transparent mb-2">
                  {m.value}
                </p>
                <p className="text-sm font-semibold text-white mb-1">{m.label}</p>
                <p className="text-xs text-zinc-500">{m.description}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      
      <section className="max-w-5xl mx-auto px-6 mb-24">
        <ScrollReveal>
          <div className="text-center mb-12">
            <p className="text-sm font-medium text-violet-400 mb-3 tracking-wide uppercase">How It Works</p>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Enrich. Qualify. Cleanse.</h2>
            <p className="text-zinc-400 max-w-xl mx-auto">
              A complete data engine that ensures every record in your CRM is accurate, complete, and actionable.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <div className="flex items-center justify-center gap-2 mb-12">
            {pillars.map((p) => (
              <button
                key={p.id}
                onClick={() => setActivePillar(p.id)}
                className={`flex items-center gap-2 px-5 py-2.5 text-sm font-medium rounded-xl transition-all ${
                  activePillar === p.id
                    ? 'bg-gradient-to-r from-violet-600 to-purple-600 text-white shadow-lg shadow-violet-500/20'
                    : 'text-zinc-400 border border-white/[0.08] hover:bg-white/[0.04]'
                }`}
              >
                <p.icon className="w-4 h-4" />
                {p.label}
              </button>
            ))}
          </div>
        </ScrollReveal>

        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-8 md:p-10">
          <div className="max-w-3xl mb-8">
            <h3 className="text-2xl font-bold text-white mb-3">{currentPillar.headline}</h3>
            <p className="text-zinc-400 leading-relaxed">{currentPillar.description}</p>
          </div>
          <div className="grid sm:grid-cols-3 gap-4">
            {currentPillar.features.map((f, i) => (
              <div key={i} className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-5 hover:border-violet-500/20 transition-all">
                <div className="w-9 h-9 rounded-lg bg-violet-500/10 flex items-center justify-center mb-3">
                  <f.icon className="w-4.5 h-4.5 text-violet-400" />
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
            <p className="text-sm font-medium text-violet-400 mb-3 tracking-wide uppercase">Customer Stories</p>
            <h2 className="text-3xl md:text-4xl font-bold text-white">Data Teams Love Nexuscale</h2>
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
            <p className="text-sm font-medium text-violet-400 mb-3 tracking-wide uppercase">Resources</p>
            <h2 className="text-3xl md:text-4xl font-bold text-white">Learn & Get Started</h2>
          </div>
        </ScrollReveal>
        <div className="grid sm:grid-cols-2 gap-4">
          {resources.map((r, i) => (
            <ScrollReveal key={i} delay={i * 80}>
              <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-5 hover:border-violet-500/20 transition-all flex items-start gap-4">
                <div className="shrink-0 w-9 h-9 rounded-lg bg-violet-500/10 flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-violet-400" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="text-sm font-semibold text-white">{r.title}</h4>
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-violet-400 bg-violet-500/10 px-2 py-0.5 rounded-full">
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
            <p className="text-sm font-medium text-violet-400 mb-3 tracking-wide uppercase">FAQ</p>
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
            <div className="absolute inset-0 bg-gradient-to-br from-violet-500/[0.05] via-transparent to-purple-500/[0.05] pointer-events-none" />
            <div className="relative z-10">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Reach the right people, faster
              </h2>
              <p className="text-zinc-400 mb-8 max-w-md mx-auto">
                With data you can actually rely on. Start enriching your pipeline today.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href="https://app.nexuscale.ai/users/register"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 px-8 py-3.5 text-sm font-semibold text-white bg-gradient-to-r from-violet-600 to-purple-600 rounded-xl hover:from-violet-500 hover:to-purple-500 transition-all shadow-lg shadow-violet-500/20"
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
