import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ScrollReveal } from '../components/ScrollReveal';
import {
  ArrowRight,
  ChevronDown,
  Zap,
  CalendarCheck,
  Play,
  Kanban,
  BrainCircuit,
  Clock,
  Video,
  Mail,
  CheckSquare,
  RefreshCw,
  BarChart3,
  Bell,
  Users,
  TrendingUp,
  Sparkles,
  Target,
  Mic,
  FileText,
} from 'lucide-react';

const metrics = [
  { value: '50%', label: 'Less Busywork', description: 'Reduction in manual admin tasks for reps' },
  { value: '2.3x', label: 'Pipeline Velocity', description: 'Faster deal progression from meeting to close' },
  { value: '31%', label: 'Higher Win Rates', description: 'When reps use AI-guided deal execution' },
];

const pillars = [
  {
    id: 'prep',
    label: 'Prep',
    icon: CalendarCheck,
    headline: 'Walk into every meeting fully prepared',
    description: 'AI surfaces everything your rep needs before each call — company context, stakeholder map, previous touchpoints, and recommended talking points. No more scrambling 5 minutes before a demo.',
    features: [
      { icon: BrainCircuit, title: 'AI Meeting Briefs', text: 'Auto-generated dossiers with company news, tech stack, pain points, and competitive intel delivered before each meeting.' },
      { icon: CalendarCheck, title: 'Smart Scheduling', text: 'Custom booking links with automatic timezone detection, buffer time, and round-robin routing across your team.' },
      { icon: Target, title: 'Stakeholder Mapping', text: 'Visualize the buying committee — champions, decision-makers, and blockers — with relationship intelligence from your CRM.' },
    ],
  },
  {
    id: 'progress',
    label: 'Progress',
    icon: Play,
    headline: 'Automate the follow-up, focus on selling',
    description: 'After every call, Nexuscale handles the busywork: transcriptions, action items, follow-up emails, and CRM updates all happen automatically. Your reps get time back to actually sell.',
    features: [
      { icon: Mic, title: 'Call Recording & Transcription', text: 'Every call is recorded, transcribed, and summarized. Key moments are flagged so managers can coach without listening to full recordings.' },
      { icon: Mail, title: 'AI Follow-Up Emails', text: 'Automatically draft personalized follow-up emails based on what was discussed, with one-click send from the rep\'s inbox.' },
      { icon: RefreshCw, title: 'Auto CRM Sync', text: 'Meeting notes, next steps, deal stage changes, and contact updates are pushed to your CRM in real-time. Zero manual entry.' },
    ],
  },
  {
    id: 'manage',
    label: 'Manage',
    icon: Kanban,
    headline: 'Full pipeline visibility in one place',
    description: 'Every deal, every activity, every signal — unified in a single view. Managers get real-time forecasting, deal health scores, and coaching insights without chasing reps for updates.',
    features: [
      { icon: BarChart3, title: 'Deal Health Dashboard', text: 'AI analyzes engagement patterns, stakeholder activity, and timing signals to score the health of every deal in your pipeline.' },
      { icon: Bell, title: 'Real-Time Deal Alerts', text: 'Get notified when deals stall, champions go silent, or competitors enter the picture — before it\'s too late to act.' },
      { icon: Users, title: 'Coaching & Performance', text: 'Compare rep performance, identify winning patterns, and deliver targeted coaching with conversation intelligence insights.' },
    ],
  },
];

const testimonials = [
  {
    quote: "Our reps used to spend 3 hours a day on admin. With Nexuscale, CRM updates, follow-ups, and meeting prep are fully automated. They just sell now.",
    name: 'Alex Thompson',
    role: 'VP of Sales',
    company: 'CloudReach',
  },
  {
    quote: "$2.3M in pipeline sourced through Nexuscale in Q1 alone. The AI meeting briefs mean our reps walk in more prepared than the competition every single time.",
    name: 'Rachel Kwon',
    role: 'CRO',
    company: 'ScaleForce',
  },
  {
    quote: "Deal visibility went from guesswork to precision. I can see exactly which deals need attention without a single Slack message to my team.",
    name: 'Michael Torres',
    role: 'Sales Director',
    company: 'PipelineIQ',
  },
];

const resources = [
  { title: 'Meeting Prep Templates', description: 'Pre-built templates for discovery calls, demos, and negotiation meetings.', tag: 'Template' },
  { title: 'Sales Execution Playbook', description: 'A framework for running a repeatable, AI-assisted deal process.', tag: 'Guide' },
  { title: 'Pipeline Management Masterclass', description: 'How top-performing teams manage pipeline with deal intelligence.', tag: 'Webinar' },
  { title: 'Conversation Intelligence Guide', description: 'Using call recordings and AI analysis to improve win rates.', tag: 'Guide' },
];

const faqs = [
  {
    q: 'How does the AI meeting brief work?',
    a: 'Before each scheduled meeting, our AI automatically compiles a brief that includes the prospect\'s company overview, recent news, technology stack, previous interactions with your team, and recommended talking points. It\'s delivered directly to the rep\'s inbox or Slack 30 minutes before the call.',
  },
  {
    q: 'Does Nexuscale record and transcribe calls?',
    a: 'Yes. With the rep\'s consent, Nexuscale can join any video call (Zoom, Google Meet, Teams) as a silent participant. It records, transcribes, and generates a structured summary with action items. Managers can review key moments without listening to full recordings.',
  },
  {
    q: 'How does automatic CRM syncing work?',
    a: 'After each meeting, Nexuscale extracts action items, deal stage changes, and key details from the conversation. These are automatically pushed to the corresponding records in your CRM — Salesforce, HubSpot, or Pipedrive. Reps can review and approve updates before they sync.',
  },
  {
    q: 'What is the deal health score?',
    a: 'Our AI analyzes multiple signals — engagement frequency, stakeholder involvement, response times, sentiment from calls, and deal timing — to assign a health score from 0-100. Deals trending below threshold trigger automatic alerts to managers.',
  },
  {
    q: 'Can managers use this for coaching?',
    a: 'Absolutely. The conversation intelligence features let managers review call highlights, compare rep performance metrics, identify winning behaviors, and deliver targeted coaching — all without sitting in on every call.',
  },
];

export default function DealExecutionPage() {
  const [activePillar, setActivePillar] = useState('prep');
  const [openFaq, setOpenFaq] = useState(null);

  const currentPillar = pillars.find((p) => p.id === activePillar);

  return (
    <div className="animate-in fade-in slide-in-from-bottom-8 duration-400 pb-20 md:pb-32">

      {/* ── Hero ── */}
      <section className="relative pt-8 pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/[0.03] to-transparent pointer-events-none" />
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <ScrollReveal>
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/[0.08] bg-white/[0.03] text-xs text-zinc-400 mb-6">
                  <Zap className="w-3.5 h-3.5 text-emerald-400" />
                  Deal Execution
                </div>
              </ScrollReveal>
              <ScrollReveal delay={100}>
                <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white leading-[1.1] mb-6">
                  Sales execution software that{' '}
                  <span className="bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent">
                    keeps deals moving
                  </span>
                </h1>
              </ScrollReveal>
              <ScrollReveal delay={200}>
                <p className="text-lg text-zinc-400 leading-relaxed mb-8">
                  Run more effective sales calls, automate the busywork, and give managers full pipeline
                  visibility — all in one platform that replaces your entire sales execution stack.
                </p>
              </ScrollReveal>
              <ScrollReveal delay={300}>
                <div className="flex flex-col sm:flex-row items-start gap-4">
                  <a
                    href="https://app.nexuscale.ai/users/register"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2 px-8 py-3.5 text-sm font-semibold text-white bg-gradient-to-r from-emerald-600 to-teal-600 rounded-xl hover:from-emerald-500 hover:to-teal-500 transition-all shadow-lg shadow-emerald-500/20"
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
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/[0.04] via-transparent to-teal-500/[0.04] pointer-events-none" />
                <div className="relative space-y-3">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs text-zinc-500">Pipeline Overview</span>
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                      Live
                    </span>
                  </div>
                  {[
                    { deal: 'Acme Corp — Enterprise', stage: 'Negotiation', value: '$120K', health: 94 },
                    { deal: 'TechFlow — Growth', stage: 'Demo Scheduled', value: '$45K', health: 78 },
                    { deal: 'DataVault — Pro', stage: 'Proposal Sent', value: '$68K', health: 85 },
                    { deal: 'ScaleWorks — Team', stage: 'Discovery', value: '$32K', health: 62 },
                  ].map((d, i) => (
                    <div key={i} className="flex items-center justify-between py-3 px-4 rounded-lg bg-white/[0.02] border border-white/[0.04]">
                      <div>
                        <p className="text-sm font-medium text-white">{d.deal}</p>
                        <p className="text-xs text-zinc-500">{d.stage}</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-xs font-medium text-zinc-300">{d.value}</span>
                        <div className="flex items-center gap-1.5">
                          <div className="w-16 h-1.5 rounded-full bg-white/[0.06] overflow-hidden">
                            <div
                              className={`h-full rounded-full ${
                                d.health >= 80 ? 'bg-emerald-500' : d.health >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                              }`}
                              style={{ width: `${d.health}%` }}
                            />
                          </div>
                          <span className="text-[10px] text-zinc-500">{d.health}</span>
                        </div>
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
              <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 text-center hover:border-emerald-500/20 transition-colors">
                <p className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent mb-2">
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
            <p className="text-sm font-medium text-emerald-400 mb-3 tracking-wide uppercase">How It Works</p>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Prep. Progress. Manage.</h2>
            <p className="text-zinc-400 max-w-xl mx-auto">
              AI handles the admin so your reps can focus on what they do best — closing deals.
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
                    ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg shadow-emerald-500/20'
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
              <div key={i} className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-5 hover:border-emerald-500/20 transition-all">
                <div className="w-9 h-9 rounded-lg bg-emerald-500/10 flex items-center justify-center mb-3">
                  <f.icon className="w-4.5 h-4.5 text-emerald-400" />
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
            <p className="text-sm font-medium text-emerald-400 mb-3 tracking-wide uppercase">Customer Stories</p>
            <h2 className="text-3xl md:text-4xl font-bold text-white">Sales Teams Ship Faster</h2>
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
            <p className="text-sm font-medium text-emerald-400 mb-3 tracking-wide uppercase">Resources</p>
            <h2 className="text-3xl md:text-4xl font-bold text-white">Templates & Playbooks</h2>
          </div>
        </ScrollReveal>
        <div className="grid sm:grid-cols-2 gap-4">
          {resources.map((r, i) => (
            <ScrollReveal key={i} delay={i * 80}>
              <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-5 hover:border-emerald-500/20 transition-all flex items-start gap-4">
                <div className="shrink-0 w-9 h-9 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-emerald-400" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="text-sm font-semibold text-white">{r.title}</h4>
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">
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
            <p className="text-sm font-medium text-emerald-400 mb-3 tracking-wide uppercase">FAQ</p>
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
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/[0.05] via-transparent to-teal-500/[0.05] pointer-events-none" />
            <div className="relative z-10">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Close more deals with less busywork
              </h2>
              <p className="text-zinc-400 mb-8 max-w-md mx-auto">
                Let AI handle the admin while your reps focus on selling.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href="https://app.nexuscale.ai/users/register"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 px-8 py-3.5 text-sm font-semibold text-white bg-gradient-to-r from-emerald-600 to-teal-600 rounded-xl hover:from-emerald-500 hover:to-teal-500 transition-all shadow-lg shadow-emerald-500/20"
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
