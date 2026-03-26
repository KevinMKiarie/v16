import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ScrollReveal } from '../components/ScrollReveal';
import {
  ArrowRight,
  ChevronDown,
  Zap,
  Search,
  Send,
  BarChart3,
  BrainCircuit,
  Target,
  Users,
  Globe,
  Mail,
  Linkedin,
  Phone,
  Clock,
  Sparkles,
  RefreshCw,
  TrendingUp,
  Layers,
  MessageSquare,
  Settings,
} from 'lucide-react';

const metrics = [
  { value: '5x', label: 'More Replies', description: 'Increase in positive response rates with AI personalization' },
  { value: '82%', label: 'Inbox Placement', description: 'Emails land in primary inbox, not spam or promotions' },
  { value: '3.8x', label: 'Pipeline Generated', description: 'More qualified pipeline from outbound motions' },
];

const pillars = [
  {
    id: 'prospect',
    label: 'Prospect',
    icon: Search,
    headline: 'Find the right accounts before your competitors do',
    description: 'Stop guessing who to target. Nexuscale combines a 275M+ contact database with real-time intent signals and AI-powered list building to surface the accounts most likely to buy — right now.',
    features: [
      { icon: Globe, title: '275M+ Verified Contacts', text: 'Search the largest B2B database with 65+ filters — title, industry, tech stack, funding, headcount, and more. Every email is verified in real-time.' },
      { icon: Target, title: 'Intent-Based Lists', text: 'Build lists based on buying signals — job changes, technology adoptions, funding rounds, and content engagement across the web.' },
      { icon: BrainCircuit, title: 'AI List Builder', text: 'Describe your ideal customer in plain language and let AI build a targeted prospect list in seconds, complete with enriched contact data.' },
    ],
  },
  {
    id: 'engage',
    label: 'Engage',
    icon: Send,
    headline: 'Launch multi-channel campaigns that actually get replies',
    description: 'One-size-fits-all outreach is dead. Nexuscale\'s AI writes unique messages for every prospect, sequences them across email, LinkedIn, and calls, and optimizes send times for maximum engagement.',
    features: [
      { icon: MessageSquare, title: 'AI Hyper-Personalization', text: 'Generate unique messaging per prospect referencing their role, company news, tech stack, and recent activity. No templates, no merge tags — real personalization.' },
      { icon: Layers, title: 'Multi-Channel Sequencing', text: 'Orchestrate automated sequences across email, LinkedIn (connection requests, messages, InMail), and phone — all from a single workflow builder.' },
      { icon: Clock, title: 'Smart Send Optimization', text: 'AI determines the optimal send time per prospect based on timezone, past engagement patterns, and inbox activity to maximize open rates.' },
    ],
  },
  {
    id: 'deliver',
    label: 'Deliver',
    icon: Mail,
    headline: 'Land in the inbox, not the spam folder',
    description: 'The best messaging in the world is worthless if it never reaches the prospect. Our deliverability engine handles warmup, rotation, monitoring, and reputation management so every email lands where it should.',
    features: [
      { icon: RefreshCw, title: 'Automated Mailbox Warmup', text: 'Gradually build sender reputation with intelligent warmup that mimics real human email behavior across your sending domains.' },
      { icon: Settings, title: 'Domain & Mailbox Rotation', text: 'Automatically rotate across multiple sending domains and mailboxes to distribute volume and protect deliverability at scale.' },
      { icon: BarChart3, title: 'Real-Time Health Monitoring', text: 'Track bounce rates, spam complaints, and inbox placement in real-time. Get alerts before deliverability issues impact your campaigns.' },
    ],
  },
];

const testimonials = [
  {
    quote: "We replaced 4 different tools with Nexuscale's outbound stack. Our reps went from sending 50 generic emails a day to 200 AI-personalized touches across 3 channels.",
    name: 'Jordan Hayes',
    role: 'Head of Sales Development',
    company: 'VelocityGTM',
  },
  {
    quote: "Deliverability was killing our outbound before Nexuscale. Now we're at 82% inbox placement and our reply rates have tripled. The warmup and rotation tools are a game-changer.",
    name: 'Natasha Kim',
    role: 'Revenue Operations Manager',
    company: 'OutboundLabs',
  },
  {
    quote: "The AI personalization is genuinely impressive. Prospects actually reply saying 'this doesn't feel like a cold email.' That's never happened before with any tool we've used.",
    name: 'Daniel Osei',
    role: 'Founder & CEO',
    company: 'PipeGen',
  },
];

const resources = [
  { title: 'Cold Email Playbook 2025', description: 'The complete framework for cold outreach that converts in the AI era.', tag: 'Guide' },
  { title: 'Multi-Channel Sequence Templates', description: 'Pre-built sequences combining email, LinkedIn, and phone touchpoints.', tag: 'Template' },
  { title: 'Deliverability Masterclass', description: 'How to achieve and maintain 80%+ inbox placement rates at scale.', tag: 'Webinar' },
  { title: 'AI Personalization Examples', description: 'Real examples of AI-generated outreach that drove meetings and pipeline.', tag: 'Article' },
];

const faqs = [
  {
    q: 'How does AI personalization work?',
    a: 'Our AI analyzes each prospect\'s profile — job title, company, industry, recent news, tech stack, LinkedIn activity, and more — then generates unique messaging that references specific details. No two emails are the same. You can review and edit before sending, or let the AI send autonomously.',
  },
  {
    q: 'What channels does outbound sequencing support?',
    a: 'Nexuscale supports automated sequences across email (with mailbox rotation), LinkedIn (connection requests, messages, and InMail), and phone (with click-to-call and voicemail drops). You can mix and match channels in any sequence with conditional branching based on engagement.',
  },
  {
    q: 'How do you ensure emails don\'t land in spam?',
    a: 'Our deliverability engine includes automated mailbox warmup, domain rotation, send-time optimization, volume throttling, and real-time reputation monitoring. We also verify every email address before sending to minimize bounces, which is the #1 cause of deliverability issues.',
  },
  {
    q: 'Can I import my own prospect lists?',
    a: 'Yes. You can import CSVs, sync from your CRM, or build lists directly in Nexuscale using our search filters and AI list builder. Imported contacts are automatically enriched and verified before they enter any sequence.',
  },
  {
    q: 'How many emails can I send per day?',
    a: 'Sending limits depend on your plan and the number of connected mailboxes. Our smart sending engine distributes volume across mailboxes and domains to stay within safe limits. Most teams scale to 1,000+ personalized emails per day per rep without deliverability issues.',
  },
  {
    q: 'Does Nexuscale integrate with my CRM?',
    a: 'Yes. Native bi-directional integrations with Salesforce, HubSpot, and Pipedrive. All outbound activity — emails, LinkedIn touches, calls, and replies — syncs to the corresponding contact and deal records automatically.',
  },
];

export default function OutboundSolutionPage() {
  const [activePillar, setActivePillar] = useState('prospect');
  const [openFaq, setOpenFaq] = useState(null);

  const currentPillar = pillars.find((p) => p.id === activePillar);

  return (
    <div className="animate-in fade-in slide-in-from-bottom-8 duration-400 pb-20 md:pb-32">

      {/* ── Hero ── */}
      <section className="relative pt-8 pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-500/[0.03] to-transparent pointer-events-none" />
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <ScrollReveal>
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/[0.08] bg-white/[0.03] text-xs text-zinc-400 mb-6">
                  <Zap className="w-3.5 h-3.5 text-blue-400" />
                  Outbound Solutions
                </div>
              </ScrollReveal>
              <ScrollReveal delay={100}>
                <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white leading-[1.1] mb-6">
                  Outbound that{' '}
                  <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-violet-400 bg-clip-text text-transparent">
                    books meetings
                  </span>
                  , not just sends emails
                </h1>
              </ScrollReveal>
              <ScrollReveal delay={200}>
                <p className="text-lg text-zinc-400 leading-relaxed mb-8">
                  Find the right prospects, engage them with AI-personalized multi-channel campaigns,
                  and land in the inbox every time — all from one platform.
                </p>
              </ScrollReveal>
              <ScrollReveal delay={300}>
                <div className="flex flex-col sm:flex-row items-start gap-4">
                  <a
                    href="https://app.nexuscale.ai/users/register"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2 px-8 py-3.5 text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl hover:from-blue-500 hover:to-indigo-500 transition-all shadow-lg shadow-blue-500/20"
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
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/[0.04] via-transparent to-indigo-500/[0.04] pointer-events-none" />
                <div className="relative space-y-3">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs text-zinc-500">Active Sequences</span>
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded-full">
                      3 Running
                    </span>
                  </div>
                  {[
                    { name: 'VP Eng — Series A SaaS', contacts: 342, replied: 47, meetings: 12, channels: ['email', 'linkedin'] },
                    { name: 'CRO — Mid-Market', contacts: 218, replied: 31, meetings: 8, channels: ['email', 'linkedin', 'phone'] },
                    { name: 'Heads of Growth — Fintech', contacts: 156, replied: 22, meetings: 6, channels: ['email'] },
                  ].map((s, i) => (
                    <div key={i} className="py-3 px-4 rounded-lg bg-white/[0.02] border border-white/[0.04] space-y-2">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-white">{s.name}</p>
                        <div className="flex items-center gap-1">
                          {s.channels.includes('email') && <Mail className="w-3 h-3 text-blue-400" />}
                          {s.channels.includes('linkedin') && <Linkedin className="w-3 h-3 text-blue-400" />}
                          {s.channels.includes('phone') && <Phone className="w-3 h-3 text-blue-400" />}
                        </div>
                      </div>
                      <div className="flex items-center gap-4 text-xs text-zinc-500">
                        <span>{s.contacts} contacts</span>
                        <span className="text-indigo-400">{s.replied} replied</span>
                        <span className="text-emerald-400">{s.meetings} meetings</span>
                      </div>
                      <div className="w-full h-1.5 rounded-full bg-white/[0.06] overflow-hidden">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-blue-500 to-indigo-500"
                          style={{ width: `${(s.replied / s.contacts) * 100}%` }}
                        />
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
              <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 text-center hover:border-blue-500/20 transition-colors">
                <p className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-400 via-indigo-400 to-violet-400 bg-clip-text text-transparent mb-2">
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
            <p className="text-sm font-medium text-blue-400 mb-3 tracking-wide uppercase">How It Works</p>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Prospect. Engage. Deliver.</h2>
            <p className="text-zinc-400 max-w-xl mx-auto">
              A complete outbound engine — from finding the right contacts to landing in their inbox.
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
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/20'
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
              <div key={i} className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-5 hover:border-blue-500/20 transition-all">
                <div className="w-9 h-9 rounded-lg bg-blue-500/10 flex items-center justify-center mb-3">
                  <f.icon className="w-4.5 h-4.5 text-blue-400" />
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
            <p className="text-sm font-medium text-blue-400 mb-3 tracking-wide uppercase">Customer Stories</p>
            <h2 className="text-3xl md:text-4xl font-bold text-white">Outbound Teams That Win</h2>
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
            <p className="text-sm font-medium text-blue-400 mb-3 tracking-wide uppercase">Resources</p>
            <h2 className="text-3xl md:text-4xl font-bold text-white">Playbooks & Templates</h2>
          </div>
        </ScrollReveal>
        <div className="grid sm:grid-cols-2 gap-4">
          {resources.map((r, i) => (
            <ScrollReveal key={i} delay={i * 80}>
              <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-5 hover:border-blue-500/20 transition-all flex items-start gap-4">
                <div className="shrink-0 w-9 h-9 rounded-lg bg-blue-500/10 flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-blue-400" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="text-sm font-semibold text-white">{r.title}</h4>
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded-full">
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
            <p className="text-sm font-medium text-blue-400 mb-3 tracking-wide uppercase">FAQ</p>
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
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/[0.05] via-transparent to-indigo-500/[0.05] pointer-events-none" />
            <div className="relative z-10">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Start booking meetings, not just sending emails
              </h2>
              <p className="text-zinc-400 mb-8 max-w-md mx-auto">
                AI-powered outbound that finds, engages, and converts your ideal buyers.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href="https://app.nexuscale.ai/users/register"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 px-8 py-3.5 text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl hover:from-blue-500 hover:to-indigo-500 transition-all shadow-lg shadow-blue-500/20"
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
