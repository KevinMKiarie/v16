import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Building2,
  Server,
  BrainCircuit,
  Linkedin,
  MonitorDot,
  Layers,
  BarChart3,
  ShieldAlert,
  ShieldCheck,
  Network,
  ArrowRight,
  CheckCircle2,
  XCircle,
  MessageSquare,
  Wrench,
  Zap,
  ChevronRight,
} from "lucide-react";

const ScrollReveal = ({ children, delay = 0, className = "" }) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: delay / 1000 }}
    className={className}
  >
    {children}
  </motion.div>
);

export default function AgencyLandingPage() {
  const [isAnnual, setIsAnnual] = useState(true);

  return (
    <div className="min-h-screen bg-[#020204] font-sans selection:bg-indigo-500/30 text-zinc-200 overflow-hidden relative">
      <div
        className="fixed inset-0 opacity-[0.03] pointer-events-none z-[100]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-indigo-600/10 blur-[150px] rounded-full pointer-events-none" />
        <div className="absolute top-40 left-1/2 -translate-x-1/2 w-full max-w-7xl h-px bg-gradient-to-r from-transparent via-indigo-500/20 to-transparent" />

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <ScrollReveal>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.03] border border-white/[0.08] mb-8 backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
              <span className="text-xs font-bold text-zinc-300 uppercase tracking-widest">
                Built for Whale Agencies
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-medium text-white mb-8 tracking-tighter leading-[0.95]">
              Stop paying a tax <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-b from-indigo-300 via-indigo-400 to-purple-500">
                on your agency's scale.
              </span>
            </h1>

            <p className="text-lg md:text-xl text-zinc-400 mb-12 max-w-3xl mx-auto leading-relaxed font-light">
              The ultimate white-label infrastructure for B2B lead gen agencies.
              Host unlimited mailboxes natively, deploy autonomous AI agents,
              and manage hundreds of clients from a single command center.
              <span className="text-white font-medium block mt-2">
                Zero per-seat fees. Zero Google Workspace tax.
              </span>
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() =>
                  window.open("https://cal.com/kevin-nexuscale/15min", "_blank")
                }
                className="relative flex items-center justify-center gap-2 px-10 py-5 rounded-full font-bold text-base transition-all duration-300 overflow-hidden group bg-white text-black hover:bg-zinc-200 shadow-[0_0_40px_-10px_rgba(255,255,255,0.4)] hover:scale-105 w-full sm:w-auto"
              >
                <span className="relative z-10">
                  Book Your Migration Strategy Call
                </span>
                <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="py-24 px-6 border-y border-white/[0.05] bg-[#050508] relative">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />

        <div className="max-w-7xl mx-auto relative z-10">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-black text-white mb-4 tracking-tight">
                You are outgrowing your tech stack.
              </h2>
              <p className="text-zinc-500 text-lg">
                Nexuscale AI is not just another cold email tool. It is a
                complete Agency Operating System.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  title: "Operational Nightmare",
                  desc: "Managing 50, 100, or 250+ clients on legacy platforms like Lemlist or Instantly is breaking your team.",
                },
                {
                  title: "Bleeding Margin",
                  desc: "You are bleeding thousands of dollars a month paying Google and Microsoft $6/inbox for infrastructure.",
                },
                {
                  title: "Context Switching",
                  desc: "Your team wastes countless billable hours logging in and out of disconnected, siloed sub-accounts.",
                },
                {
                  title: "Manual Reporting",
                  desc: "You spend every Friday manually building CSV reports to prove to your clients that you're actually working.",
                },
              ].map((pain, i) => (
                <div
                  key={i}
                  className="bg-rose-500/[0.02] border border-rose-500/10 rounded-3xl p-8 hover:bg-rose-500/[0.04] hover:border-rose-500/20 transition-colors"
                >
                  <XCircle className="w-8 h-8 text-rose-500/50 mb-6" />
                  <h3 className="text-lg font-bold text-zinc-200 mb-3">
                    {pain.title}
                  </h3>
                  <p className="text-sm text-zinc-500 leading-relaxed">
                    {pain.desc}
                  </p>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto space-y-32">
          <ScrollReveal>
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="order-2 lg:order-1 relative">
                <div className="absolute inset-0 bg-indigo-500/20 blur-[100px] rounded-full" />
                <div className="bg-[#0A0A0C] border border-white/10 rounded-[2.5rem] p-8 md:p-10 relative z-10 shadow-2xl overflow-hidden">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-[80px]" />
                  <div className="space-y-8">
                    {[
                      {
                        icon: Server,
                        title: "Inbuilt Server Infrastructure",
                        desc: "Stop paying the Google Workspace tax. Bring your domains, and we host your sending mailboxes natively. Infinite mailboxes, zero extra cost.",
                      },
                      {
                        icon: BrainCircuit,
                        title: "Autonomous AI Agents",
                        desc: "Move past static, manual campaigns. Deploy signal-based AI agents for every client that autonomously research leads and write hyper-personalized outreach.",
                      },
                      {
                        icon: Linkedin,
                        title: "Unlimited LinkedIn Outreach",
                        desc: "Scale your multi-channel campaigns seamlessly across Email and LinkedIn without arbitrary API bottlenecks.",
                      },
                    ].map((feature, i) => (
                      <div key={i} className="flex gap-5 group">
                        <div className="w-12 h-12 rounded-2xl bg-white/[0.03] border border-white/[0.08] flex items-center justify-center shrink-0 group-hover:bg-indigo-500/20 group-hover:border-indigo-500/40 transition-colors">
                          <feature.icon className="w-5 h-5 text-indigo-400" />
                        </div>
                        <div>
                          <h4 className="text-lg font-bold text-white mb-2">
                            {feature.title}
                          </h4>
                          <p className="text-sm text-zinc-400 leading-relaxed">
                            {feature.desc}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="order-1 lg:order-2">
                <div className="inline-block text-indigo-400 font-bold tracking-widest uppercase text-xs mb-4">
                  01. The Infrastructure
                </div>
                <h2 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight">
                  Uncapped & Unrestricted.
                </h2>
                <p className="text-lg text-zinc-400 leading-relaxed mb-8">
                  Most tools punish you for adding new clients. We built an
                  enterprise engine that protects your profit margins as you
                  scale. Stop renting infrastructure and start owning it.
                </p>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <div className="inline-block text-emerald-400 font-bold tracking-widest uppercase text-xs mb-4">
                  02. The Command Center
                </div>
                <h2 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight">
                  100% White-Labeled.
                </h2>
                <p className="text-lg text-zinc-400 leading-relaxed mb-8">
                  Your clients shouldn't know Nexuscale exists. They should
                  think you built a multi-million-dollar AI platform yourself.
                  Own the brand experience end-to-end.
                </p>
              </div>
              <div className="relative">
                <div className="absolute inset-0 bg-emerald-500/20 blur-[100px] rounded-full" />
                <div className="bg-[#0A0A0C] border border-white/10 rounded-[2.5rem] p-8 md:p-10 relative z-10 shadow-2xl overflow-hidden">
                  <div className="absolute top-0 left-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-[80px]" />
                  <div className="space-y-8">
                    {[
                      {
                        icon: MonitorDot,
                        title: "The Master 'God View' Dashboard",
                        desc: "One unified screen to monitor live stats, active campaigns, and unified inboxes across all of your clients. No more tab-switching.",
                      },
                      {
                        icon: Layers,
                        title: "Infinite Workspaces",
                        desc: "Completely silo your clients' data, billing, and campaigns for maximum security with unlimited team members and granular permissions.",
                      },
                      {
                        icon: BarChart3,
                        title: "Live Client Reporting Portals",
                        desc: "Generate a custom, read-only URL hosted on your agency's domain. Clients can view live metrics. Kill your Friday reporting tasks permanently.",
                      },
                    ].map((feature, i) => (
                      <div key={i} className="flex gap-5 group">
                        <div className="w-12 h-12 rounded-2xl bg-white/[0.03] border border-white/[0.08] flex items-center justify-center shrink-0 group-hover:bg-emerald-500/20 group-hover:border-emerald-500/40 transition-colors">
                          <feature.icon className="w-5 h-5 text-emerald-400" />
                        </div>
                        <div>
                          <h4 className="text-lg font-bold text-white mb-2">
                            {feature.title}
                          </h4>
                          <p className="text-sm text-zinc-400 leading-relaxed">
                            {feature.desc}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="order-2 lg:order-1 relative">
                <div className="absolute inset-0 bg-purple-500/20 blur-[100px] rounded-full" />
                <div className="bg-[#0A0A0C] border border-white/10 rounded-[2.5rem] p-8 md:p-10 relative z-10 shadow-2xl overflow-hidden">
                  <div className="absolute bottom-0 right-0 w-64 h-64 bg-purple-500/10 rounded-full blur-[80px]" />
                  <div className="space-y-8">
                    {[
                      {
                        icon: ShieldAlert,
                        title: "Master Suppression Lists",
                        desc: "Upload a global blocklist across all your workspaces at once to guarantee your agents never email a client's current customers or competitors.",
                      },
                      {
                        icon: ShieldCheck,
                        title: "Automated Deliverability Shield",
                        desc: "Nexuscale natively monitors your SPF, DKIM, and DMARC records, automatically pausing campaigns if a client's sender health drops.",
                      },
                      {
                        icon: Network,
                        title: "Frictionless CRM Handoff",
                        desc: "Native Webhooks to instantly push positive replies and booked meetings directly into your clients' HubSpot, Salesforce, or GoHighLevel.",
                      },
                    ].map((feature, i) => (
                      <div key={i} className="flex gap-5 group">
                        <div className="w-12 h-12 rounded-2xl bg-white/[0.03] border border-white/[0.08] flex items-center justify-center shrink-0 group-hover:bg-purple-500/20 group-hover:border-purple-500/40 transition-colors">
                          <feature.icon className="w-5 h-5 text-purple-400" />
                        </div>
                        <div>
                          <h4 className="text-lg font-bold text-white mb-2">
                            {feature.title}
                          </h4>
                          <p className="text-sm text-zinc-400 leading-relaxed">
                            {feature.desc}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="order-1 lg:order-2">
                <div className="inline-block text-purple-400 font-bold tracking-widest uppercase text-xs mb-4">
                  03. Global Protection
                </div>
                <h2 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight">
                  Deliverability & Safety.
                </h2>
                <p className="text-lg text-zinc-400 leading-relaxed mb-8">
                  When you manage hundreds of domains, human error is your
                  biggest liability. We built an automated safety net to protect
                  your sender reputation globally.
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="py-24 px-6 border-y border-white/[0.05] bg-[#050508] relative overflow-hidden">
        <div className="max-w-6xl mx-auto relative z-10">
          <ScrollReveal>
            <div className="text-center mb-16 max-w-3xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight">
                The ROI Math: Why Top Agencies Migrate
              </h2>
              <p className="text-zinc-400 text-lg">
                Let's look at a standard agency with 100 clients (running 5
                mailboxes per client = 500 mailboxes). Here is what you are
                paying right now vs. Nexuscale:
              </p>
            </div>

            <div className="flex flex-col lg:flex-row gap-8 lg:gap-0 items-center justify-center relative">
              <div className="w-full lg:w-[45%] bg-[#0A0A0C]/50 border border-white/[0.05] rounded-3xl p-8 lg:pr-16 relative z-10">
                <h3 className="text-xl font-bold text-zinc-300 mb-6 flex items-center gap-3">
                  <span className="w-3 h-3 rounded-full bg-rose-500/50" /> The
                  "Old Way"
                </h3>
                <div className="space-y-4 mb-8">
                  <div className="flex justify-between items-center text-sm border-b border-white/[0.05] pb-4">
                    <span className="text-zinc-500">
                      Google/MSFT Inbox Fees
                    </span>
                    <span className="text-zinc-300 font-mono">$3,000/mo</span>
                  </div>
                  <div className="flex justify-between items-center text-sm border-b border-white/[0.05] pb-4">
                    <span className="text-zinc-500">
                      Email Sending Platform
                    </span>
                    <span className="text-zinc-300 font-mono">$900/mo</span>
                  </div>
                  <div className="flex justify-between items-center text-sm border-b border-white/[0.05] pb-4">
                    <span className="text-zinc-500">LinkedIn Automation</span>
                    <span className="text-zinc-300 font-mono">$500/mo</span>
                  </div>
                  <div className="flex justify-between items-center text-sm border-b border-white/[0.05] pb-4">
                    <span className="text-zinc-500">
                      Client Reporting Portals
                    </span>
                    <span className="text-zinc-300 font-mono">$200/mo</span>
                  </div>
                </div>
                <div className="flex justify-between items-end">
                  <span className="text-sm font-bold text-zinc-500 uppercase tracking-widest">
                    Total Monthly Cost
                  </span>
                  <span className="text-4xl font-black text-rose-400/80 line-through decoration-rose-500/30">
                    $4,600
                  </span>
                </div>
              </div>

              <div className="w-full lg:w-[55%] bg-gradient-to-br from-[#0A0A0C] to-[#0A1015] border border-emerald-500/20 rounded-3xl p-8 md:p-12 relative z-20 shadow-[0_0_80px_rgba(16,185,129,0.1)] overflow-hidden lg:-ml-8">
                <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 blur-[80px] rounded-full pointer-events-none" />
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                  <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />{" "}
                  Nexuscale Agency Tier
                </h3>
                <div className="space-y-4 mb-8 relative z-10">
                  <div className="flex justify-between items-center text-sm border-b border-white/[0.05] pb-4">
                    <span className="text-zinc-400 font-medium">
                      Inbuilt Mailservers
                    </span>
                    <span className="text-emerald-400 font-bold">
                      $0 (Included)
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-sm border-b border-white/[0.05] pb-4">
                    <span className="text-zinc-400 font-medium">
                      Email & AI Platform
                    </span>
                    <span className="text-emerald-400 font-bold">Included</span>
                  </div>
                  <div className="flex justify-between items-center text-sm border-b border-white/[0.05] pb-4">
                    <span className="text-zinc-400 font-medium">
                      LinkedIn Automation
                    </span>
                    <span className="text-emerald-400 font-bold">Included</span>
                  </div>
                  <div className="flex justify-between items-center text-sm border-b border-white/[0.05] pb-4">
                    <span className="text-zinc-400 font-medium">
                      Client Reporting Portals
                    </span>
                    <span className="text-emerald-400 font-bold">Included</span>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 relative z-10">
                  <div>
                    <span className="text-xs font-bold text-emerald-500 uppercase tracking-widest block mb-1">
                      Add $2,800/mo to your bottom line
                    </span>
                    <span className="text-sm font-bold text-zinc-500 uppercase tracking-widest">
                      Flat Monthly Fee
                    </span>
                  </div>
                  <span className="text-5xl md:text-6xl font-black text-white">
                    $1,799
                  </span>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-black text-white mb-4 tracking-tight">
                Enterprise Partnership, Not Just Software.
              </h2>
              <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
                You aren't submitting generic Zendesk tickets anymore. When you
                upgrade to the Agency Tier, you partner directly with our core
                engineering team.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-[#0A0A0C] border border-white/[0.08] rounded-3xl p-8 hover:bg-white/[0.02] transition-colors">
                <Building2 className="w-8 h-8 text-indigo-400 mb-6" />
                <h3 className="text-xl font-bold text-white mb-3">
                  White-Glove Migration
                </h3>
                <p className="text-sm text-zinc-400 leading-relaxed">
                  Our tech team handles the heavy lifting of migrating your
                  clients, domains, and active campaigns from your old software
                  to Nexuscale with zero downtime.
                </p>
              </div>
              <div className="bg-[#0A0A0C] border border-white/[0.08] rounded-3xl p-8 hover:bg-white/[0.02] transition-colors">
                <MessageSquare className="w-8 h-8 text-indigo-400 mb-6" />
                <h3 className="text-xl font-bold text-white mb-3">
                  Dedicated Slack Support
                </h3>
                <p className="text-sm text-zinc-400 leading-relaxed">
                  Skip the queue. Get a dedicated, shared Slack channel with our
                  lead engineers to resolve infrastructure questions in minutes,
                  not days.
                </p>
              </div>
              <div className="bg-[#0A0A0C] border border-white/[0.08] rounded-3xl p-8 hover:bg-white/[0.02] transition-colors">
                <Wrench className="w-8 h-8 text-indigo-400 mb-6" />
                <h3 className="text-xl font-bold text-white mb-3">
                  Customization
                </h3>
                <p className="text-sm text-zinc-400 leading-relaxed">
                  We actively build custom dashboard views and API routing based
                  on your agency's unique workflow requirements.
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="py-24 px-6 relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] bg-indigo-600/10 blur-[150px] rounded-full pointer-events-none" />

        <div className="max-w-4xl mx-auto relative z-10">
          <ScrollReveal>
            <div className="text-center mb-10">
              <h2 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">
                Simple, Uncapped Agency Pricing
              </h2>
              <p className="text-zinc-400 text-lg mb-8">
                One flat fee to run your entire empire.
              </p>

              <div className="inline-flex items-center gap-1 bg-white/[0.03] p-1.5 rounded-full border border-white/[0.08] backdrop-blur-md">
                <button
                  onClick={() => setIsAnnual(false)}
                  className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 ${!isAnnual ? "bg-white text-black" : "text-zinc-400 hover:text-white"}`}
                >
                  Monthly
                </button>
                <button
                  onClick={() => setIsAnnual(true)}
                  className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 flex items-center gap-2 ${isAnnual ? "bg-white text-black" : "text-zinc-400 hover:text-white"}`}
                >
                  Annually
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full border transition-colors ${isAnnual ? "bg-emerald-500 text-white border-emerald-600" : "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"}`}
                  >
                    Get 2months free
                  </span>
                </button>
              </div>
            </div>

            <div className="bg-[#0A0A0C]/80 backdrop-blur-2xl border border-indigo-500/30 rounded-[3rem] p-8 md:p-14 shadow-[0_0_80px_rgba(99,102,241,0.15)] relative overflow-hidden">
              <div className="absolute top-0 right-0 w-px h-full bg-gradient-to-b from-transparent via-indigo-500/50 to-transparent" />
              <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent" />

              <div className="flex flex-col md:flex-row gap-12 lg:gap-20">
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-white mb-2">
                    The Agency Tier
                  </h3>
                  <p className="text-sm text-zinc-400 mb-8">
                    Everything you need to scale to $100k/mo and beyond.
                  </p>

                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="text-6xl md:text-7xl font-black text-white tracking-tighter">
                      ${isAnnual ? "1,499" : "1,799"}
                    </span>
                    <span className="text-zinc-500 font-bold">/mo</span>
                  </div>
                  {isAnnual && (
                    <p className="text-[11px] font-bold text-emerald-400 uppercase tracking-widest mb-8">
                      Billed annually
                    </p>
                  )}
                  {!isAnnual && (
                    <p className="text-[11px] font-bold text-zinc-500 uppercase tracking-widest mb-8 opacity-0">
                      Spacer
                    </p>
                  )}

                  <button
                    onClick={() =>
                      window.open(
                        "https://cal.com/kevin-nexuscale/15min",
                        "_blank",
                      )
                    }
                    className="w-full relative flex items-center justify-center gap-2 px-8 py-5 rounded-2xl font-bold text-base transition-all duration-300 overflow-hidden group bg-gradient-to-r from-indigo-500 to-violet-500 text-white hover:shadow-[0_0_30px_rgba(99,102,241,0.4)]"
                  >
                    <span className="relative z-10">
                      Book Your Migration Call
                    </span>
                    <ChevronRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
                    <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12" />
                  </button>
                </div>

                <div className="flex-1 space-y-4">
                  <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-6">
                    What's Included
                  </div>
                  {[
                    "Unlimited Native Mailboxes (Zero Google Tax)",
                    "Unlimited Client Workspaces",
                    "Unlimited Team Members",
                    "100% White-Labeled Dashboard & Portals",
                    "Dedicated IP & Server Infrastructure",
                    "Dedicated Slack Channel",
                    "White-Glove Account Migration",
                  ].map((feature, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
                      <span className="text-sm font-medium text-zinc-200 leading-relaxed">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="py-32 px-6 text-center border-t border-white/[0.05] bg-[#050508]">
        <ScrollReveal>
          <h2 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tight">
            Ready to build an empire?
          </h2>
          <p className="text-xl text-zinc-400 mb-10 max-w-2xl mx-auto font-light">
            Stop letting infrastructure costs throttle your growth. Move your
            agency to Nexuscale and scale with infinite margins.
          </p>
          <button
            onClick={() =>
              window.open("https://cal.com/kevin-nexuscale/15min", "_blank")
            }
            className="px-10 py-5 rounded-full font-bold text-base bg-white text-black hover:bg-zinc-200 transition-all hover:scale-105 shadow-[0_0_40px_-10px_rgba(255,255,255,0.4)]"
          >
            Schedule Strategy Call
          </button>
        </ScrollReveal>
      </section>
    </div>
  );
}
