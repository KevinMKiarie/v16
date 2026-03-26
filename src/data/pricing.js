import {
  BrainCircuit,
  Database,
  Layers,
  Server,
  ShieldCheck,
  Workflow,
} from "lucide-react";

export const pricingPlansData = [
  {
    name: "Free",
    tier: "The Sandbox",
    price: "0",
    desc: "For testing the waters.",
    credits: {
      contacts: "100",
      workspaces: "1",
      teamSeats: "1",
      agents: "1",
      agentsType: "Basic",
      externalInboxes: "1",
      mailboxes: "1",
      mailboxSub: "Native Included",
      emails: "100",
      warmup: "Unlimited",
      contactUploads: "None",
      linkedinSeats: "0",
      linkedinSub: "No Add-ons",
    },
    features: [
      {
        text: "Standard B2B Database Access",
        tooltip: "Access essential leads to start building your pipeline.",
        included: true,
      },
      {
        text: "Brand Context Analysis",
        tooltip:
          "AI that understands your brand's unique voice and positioning.",
        included: true,
      },
      {
        text: "AI Email Writer & AI Signatures",
        tooltip:
          "Craft compelling emails and professional signatures instantly.",
        included: true,
      },
      {
        text: "24/7 Auto Prospecting",
        tooltip:
          "Keep your lead generation running around the clock (limited by credits).",
        included: true,
      },
      {
        text: "Campaign Management",
        tooltip:
          "Manage and track your outreach campaigns from one central dashboard.",
        included: true,
      },
      {
        text: "Auto Follow-ups & Sequences",
        tooltip:
          "Never miss a beat with reliable automated sequence follow-ups.",
        included: true,
      },
      {
        text: "Reply Detection & Opt-Outs",
        tooltip:
          "Automatically manage responses and keep your campaigns fully compliant.",
        included: true,
      },
      {
        text: "Schedule Across Time Zones",
        tooltip: "Easily schedule campaigns across multiple global time zones.",
        included: true,
      },
      {
        text: "Task Manager",
        tooltip: "Stay organized and on top of your daily sales activities.",
        included: true,
      },
      {
        text: "Limited Support",
        tooltip: "Access essential leads to start building your pipeline.",
        included: true,
      },
      {
        text: "0 Contact Uploads",
        tooltip: "Access essential leads to start building your pipeline.",
        included: true,
      },
    ],
    cta: "Start Now",
    microcopy: "No credit card required",
    variant: "secondary",
  },
  {
    name: "Start Up",
    tier: "Founder Plan",
    price: "59",
    annualPrice: "49",
    stripeMonthlyUrl: "https://buy.stripe.com/14A00jdtN4oI0xmed3b7y0G",
    stripeAnnualUrl: "https://buy.stripe.com/14A00jdtN4oI0xmed3b7y0G",
    desc: "For solo founders and small teams automating their outbound.",
    credits: {
      contacts: "2,500",
      workspaces: "1",
      teamSeats: "2",
      agents: "2",
      agentsType: "Research",
      externalInboxes: "3",
      mailboxes: "Unlimited",
      mailboxSub: "3 Google / Outlook",
      emails: "Unlimited",
      warmup: "Unlimited",
      contactUploads: "Unlimited",
      support: "Unlimited Chat",
      linkedinSeats: "2",
      linkedinSub: "+$39/mo (Max 2)",
    },
    features: [
      { text: "Everything in Free", included: true, isBadge: true },
      {
        text: "10,000 Contact Storage",
        tooltip:
          "Store and organize up to 10,000 contacts. Expandable as you grow.",
        included: true,
      },
      {
        text: "Unlimited Native Mailbox Connections",
        tooltip: "Connect unlimited native Nexuscale mailboxes at $4.99/ea.",
        included: true,
      },
      {
        text: "3 External Inboxes (Google/Outlook)",
        tooltip: "Connect up to 3 Google or Outlook inboxes for sending.",
        included: true,
      },
      {
        text: "Unlimited Email Sending",
        tooltip:
          "Scale your outreach to its full potential with no daily or monthly sending limits.",
        included: true,
      },
      {
        text: "Unlimited Email Warmup",
        tooltip:
          "Automatically build your sender reputation to ensure your emails land in the inbox.",
        included: true,
      },
      {
        text: "Mailbox Rotation & ESP Match",
        tooltip:
          "Distribute sends across mailboxes and match ESP preferences to protect deliverability.",
        included: true,
      },
      {
        text: "Mailbox Health Monitoring & DNS Alerts",
        tooltip:
          "Track deliverability scores and get alerted to mailbox health issues in real-time.",
        included: true,
      },
      {
        text: "Email Verification",
        tooltip:
          "Real-time verification ensures every email address is valid before you send. (1 credit/email)",
        included: true,
      },
      {
        text: "AI Lead Search & Scrape Search",
        tooltip:
          "Let AI surface the most relevant prospects and enrich leads from live web sources.",
        included: true,
      },
      {
        text: "Funding & Hiring Data",
        tooltip:
          "Identify companies actively raising funding or hiring — prime buying signals.",
        included: true,
      },
      {
        text: "Premium Filters & Basic Lead Scoring",
        tooltip:
          "Apply advanced filters — industry, headcount, tech stack — and auto-rank your hottest prospects.",
        included: true,
      },
      {
        text: "AI Insights & AI Signatures",
        tooltip:
          "AI-generated research brief on each prospect for highly personalized outreach.",
        included: true,
      },
      {
        text: "Multi-Language Outreach (50+ Languages)",
        tooltip:
          "Generate native-quality outreach copy in over 50 languages for global campaigns.",
        included: true,
      },
      {
        text: "Smart Inbox & Inbuilt CRM",
        tooltip:
          "Manage all your conversations and contacts from one centralized, AI-enhanced inbox and CRM.",
        included: true,
      },
      {
        text: "A/Z Testing",
        tooltip:
          "Split-test your messaging across multiple variants to guarantee better results.",
        included: true,
      },
      {
        text: "Native CRM Integrations",
        tooltip:
          "Connect your CRM to sync contacts, notes, and activities bi-directionally.",
        included: true,
      },
      {
        text: "CSV Import / Export",
        tooltip:
          "Easily import prospect lists or export your data in CSV format anytime.",
        included: true,
      },
      {
        text: "Multi-Channel LinkedIn Outreach (Add-on)",
        tooltip:
          "Automatically send connection requests and personalized DMs on LinkedIn. Up to 2 seats at $39/mo each.",
        included: true,
      },
      {
        text: "Live Chat Support",
        tooltip:
          "Get real-time help directly from our support team inside the app.",
        included: true,
      },
      {
        text: "Unlimited Support",
        tooltip: "Access essential leads to start building your pipeline.",
        included: true,
      },
      {
        text: "Unlimited Contact Uploads",
        tooltip: "Access essential leads to start building your pipeline.",
        included: true,
      },
    ],
    keyFeatures: [
      "2 AI Agents",
      "2,500 leads/mo",
      "Unlimited email sending",
      "Unlimited warmup",
      "Live chat support",
    ],
    cta: "Get Started",
    microcopy: "Cancel anytime",
    variant: "secondary",
  },
  {
    name: "Growth",
    tier: "Growth Plan",
    price: "99",
    annualPrice: "83",
    stripeMonthlyUrl: "https://buy.stripe.com/dRmbJ14Xh9J2gwkc4Vb7y0c",
    stripeAnnualUrl: "https://buy.stripe.com/dRmbJ14Xh9J2gwkc4Vb7y0c",
    desc: "For growing sales teams scaling their outbound.",
    credits: {
      contacts: "4,000",
      workspaces: "3",
      teamSeats: "10",
      agents: "10",
      agentsType: "Deep AI",
      externalInboxes: "4",
      mailboxes: "Unlimited",
      mailboxSub: "3 Google / Outlook",
      emails: "Unlimited",
      warmup: "Unlimited",
      contactUploads: "Unlimited",
      support: "Premium Chat/Email",
      linkedinSeats: "10",
      linkedinSub: "+$39/mo (Max 10)",
    },
    features: [
      { text: "Everything in Start Up", included: true, isBadge: true },
      {
        text: "25,000 Contact Storage",
        tooltip:
          "Store and organize up to 25,000 contacts. Expandable as you grow.",
        included: true,
      },
      {
        text: "3 Workspaces & 10 AI Agents",
        tooltip:
          "Manage multiple campaigns in isolated workspaces with 10 AI agents running in parallel.",
        included: true,
      },
      {
        text: "10 Team Seats",
        tooltip:
          "Collaborate with your full team — up to 10 members in your workspace.",
        included: true,
      },
      {
        text: "4 External Inboxes (Google/Outlook)",
        tooltip:
          "Connect up to 4 Google or Outlook inboxes for higher sending volume.",
        included: true,
      },
      {
        text: "Premium B2B Database Access",
        tooltip:
          "Unlock high-tier, exclusive prospect data for higher-quality leads.",
        included: true,
      },
      {
        text: "Fully Customizable Agents & AI Replies",
        tooltip:
          "Design bespoke AI agents for complex workflows and let AI draft context-aware responses automatically.",
        included: true,
      },
      {
        text: "AI Meeting Agent (Exclusive)",
        tooltip:
          "AI that automatically books meetings on your behalf when a prospect shows interest.",
        included: true,
      },
      {
        text: "Advanced Lead & Match Scoring (Exclusive)",
        tooltip:
          "Precision AI scoring ranks your hottest prospects for immediate action.",
        included: true,
      },
      {
        text: "24/7 Automated Prospecting",
        tooltip:
          "Uninterrupted, continuous pipeline generation running around the clock.",
        included: true,
      },
      {
        text: "Premium Sending & Deliverability",
        tooltip:
          "Ensure your emails bypass spam filters and land directly in the primary inbox.",
        included: true,
      },
      {
        text: "Premium IP Sending & Deliverability Routing",
        tooltip:
          "Elite infrastructure with dedicated IPs designed for maximum inbox placement.",
        included: true,
      },
      {
        text: "Up to 10 LinkedIn Sender Seats (Add-on)",
        tooltip:
          "Scale LinkedIn outreach across up to 10 senders. Each seat is $39/month.",
        included: true,
      },
      {
        text: "Priority Support",
        tooltip:
          "Skip the queue and get immediate, expedited assistance from our team.",
        included: true,
      },
      {
        text: "Premium Chat/Email",
        tooltip:
          "Skip the queue and get immediate, expedited assistance from our team.",
        included: true,
      },
    ],
    keyFeatures: [
      "10 AI Agents",
      "3 Workspaces",
      "Advanced lead scoring",
      "AI Meeting Agent",
      "Premium deliverability routing",
    ],
    cta: "Get Started",
    microcopy: "Cancel anytime",
    variant: "secondary",
  },
  {
    name: "Scale Up",
    tier: "Scale-Up Plan",
    price: "299",
    annualPrice: "249",
    stripeMonthlyUrl: "https://buy.stripe.com/eVq6oH9dx3kE4NCc4Vb7y04",
    stripeAnnualUrl: "https://buy.stripe.com/eVq6oH9dx3kE4NCc4Vb7y04",
    desc: "For rapidly scaling sales teams and lead-gen agencies.",
    credits: {
      contacts: "15,000",
      workspaces: "10",
      teamSeats: "50",
      agents: "50",
      agentsType: "Deep AI",
      externalInboxes: "12",
      mailboxes: "Unlimited",
      mailboxSub: "3 Google / Outlook",
      emails: "Unlimited",
      warmup: "Unlimited",
      contactUploads: "Unlimited",
      support: "Premium Chat/Email",
      linkedinSeats: "∞",
      linkedinSub: "Add-ons ($39/mo ea)",
    },
    features: [
      { text: "Everything in Growth", included: true, isBadge: true },
      {
        text: "50,000 Contact Storage",
        tooltip:
          "Store and organize up to 50,000 contacts. Expandable as you grow.",
        included: true,
      },
      {
        text: "10 Workspaces & 50 AI Agents",
        tooltip:
          "Run isolated campaigns across 10 workspaces with 50 AI agents at scale.",
        included: true,
      },
      {
        text: "50 Team Seats",
        tooltip:
          "Onboard your entire sales organization — up to 50 team members.",
        included: true,
      },
      {
        text: "12 External Inboxes (Google/Outlook)",
        tooltip:
          "Connect up to 12 Google or Outlook inboxes for maximum sending volume.",
        included: true,
      },
      {
        text: "Unlimited LinkedIn Sender Seats (Add-on)",
        tooltip:
          "Run massive, multi-account LinkedIn campaigns without seat limits. Each seat is $39/month.",
        included: true,
      },
    ],
    keyFeatures: [
      "50 AI Agents",
      "10 Workspaces",
      "15,000 leads/mo",
      "Unlimited LinkedIn seats",
      "Priority support",
    ],
    cta: "Start Scaling Now",
    microcopy: "14-day money back guarantee",
    variant: "brand",
    popular: true,
  },
  {
    name: "Agency",
    tier: "Agency Plan",
    price: "1799",
    annualPrice: "1499",
    stripeMonthlyUrl: "https://cal.com/kevin-nexuscale/15min",
    stripeAnnualUrl: "https://cal.com/kevin-nexuscale/15min",
    desc: "For enterprise teams and lead-gen agencies needing white-labeling and API access.",
    credits: {
      contacts: "50,000",
      workspaces: "Unlimited",
      teamSeats: "Unlimited",
      agents: "∞",
      agentsType: "Infinite",
      externalInboxes: "50",
      mailboxes: "Unlimited",
      mailboxSub: "3 Google / Outlook",
      emails: "Unlimited",
      warmup: "Unlimited",
      contactUploads: "Unlimited",
      support: "Dedicated Manager",
      linkedinSeats: "∞",
      linkedinSub: "All Included",
    },
    features: [
      { text: "Everything in Scale Up", included: true, isBadge: true },
      {
        text: "500,000 Contact Storage",
        tooltip:
          "Massive contact storage for enterprise-scale lead management. Expandable on demand.",
        included: true,
      },
      {
        text: "Unlimited Workspaces & Unlimited Agents",
        tooltip:
          "Total client isolation with unlimited workspaces and an infinite army of AI agents.",
        included: true,
      },
      {
        text: "Unlimited Team Seats",
        tooltip:
          "Onboard every team member and client with no seat restrictions.",
        included: true,
      },
      {
        text: "50 External Inboxes (Google/Outlook)",
        tooltip:
          "Connect up to 50 Google or Outlook inboxes for enterprise-level sending.",
        included: true,
      },
      {
        text: "Unlimited LinkedIn Senders Included",
        tooltip:
          "Run massive, multi-account LinkedIn campaigns — all LinkedIn senders included in your plan.",
        included: true,
      },
      {
        text: "Max Volume IP Rotation & Deliverability Routing",
        tooltip:
          "Safely blast through high-volume sending limits with enterprise IP rotation.",
        included: true,
      },
      {
        text: "Full Platform White-Labeling",
        tooltip:
          "Rebrand the entire platform as your own proprietary software with custom domain and branding.",
        included: true,
      },
      {
        text: "Dedicated Client Dashboards",
        tooltip:
          "Give clients a beautiful, branded view of their campaign results.",
        included: true,
      },
      {
        text: "Nexuscale API Access",
        tooltip:
          "Integrate our powerful engine directly into your custom apps and workflows.",
        included: true,
      },
      {
        text: "Dedicated Success Manager & Priority Support",
        tooltip:
          "Your personal expert to ensure your agency and clients thrive, with expedited support.",
        included: true,
      },
    ],
    cta: "Start Scaling Now",
    microcopy: "Custom onboarding included",
    variant: "secondary",
  },
];

export const platformEcosystemData = [
  {
    title: "Nexus Data",
    subtitle: "The Search & Signal Engine",
    desc: "Find the perfect buyer exactly when they are ready to buy.",
    icon: Database,
    color: "text-blue-400",
    bg: "bg-blue-500",
    features: [
      "B2B Database Access: Global search engine of verified leads.",
      "Funding & Hiring Signals: Real-time data triggers for active buyers.",
      "Lead & Match Scoring: Auto-rank your highest-intent prospects.",
      "Unlimited Contacts Storage: Build your CRM without paywalls.",
    ],
  },
  {
    title: "Nexus AI",
    subtitle: "The Autonomous Brain",
    desc: "Your 24/7 autonomous SDR that researches, personalizes, and replies.",
    icon: BrainCircuit,
    color: "text-indigo-400",
    bg: "bg-indigo-500",
    features: [
      "AI Research Agents: 24/7 custom agents building your pipeline.",
      "Hyper-Personalization: Real-time scraping for high-converting copy.",
      "AI Replies & Sequences: Context-aware, dynamic follow-ups.",
      "Multi-Language Engine: Native generation in 50+ languages.",
    ],
  },
  {
    title: "Nexus Flow",
    subtitle: "The Omni-Channel Engine",
    desc: "Where high-volume sending meets laser-targeted execution.",
    icon: Workflow,
    color: "text-purple-400",
    bg: "bg-purple-500",
    features: [
      "LinkedIn Automation: Automated connection requests and DMs.",
      "Mailbox Rotation: Load-balance volume to maximize inbox placement.",
      "Unified Inbox: Handle every email and LI reply from one feed.",
      "A/B Testing & Smart Stops: Split test hooks, auto-stop on reply.",
    ],
  },
  {
    title: "Nexus Infra",
    subtitle: "The Sending Infrastructure",
    desc: "Bypass standard limits with enterprise-grade server architecture.",
    icon: Server,
    color: "text-emerald-400",
    bg: "bg-emerald-500",
    features: [
      "Native Mailbox Servers: Bypass Google/Microsoft sending caps.",
      "Custom Email Servers: Bring your own SMTP/IMAP for total control.",
      "Domain Automation: Instantly configure DNS records code-free.",
      "Unlimited Mailboxes: Scale sending architecture infinitely.",
    ],
  },
  {
    title: "Nexus Shield",
    subtitle: "The Deliverability Center",
    desc: "Bulletproof your domains and land in the primary inbox.",
    icon: ShieldCheck,
    color: "text-rose-400",
    bg: "bg-rose-500",
    features: [
      "Automated Warmup: Peer-to-peer network to keep domains healthy.",
      "Mailbox Health Monitoring: Real-time tracking and alerts.",
      "Opt-Out Management: Automated handling to protect sender score.",
      "Spam Prevention: Enterprise safety protocols.",
    ],
  },
  {
    title: "The Platform Core",
    subtitle: "Built for Scale & Speed",
    desc: "The foundation designed for seamless agency and team workflow.",
    icon: Layers,
    color: "text-amber-400",
    bg: "bg-amber-500",
    features: [
      "Workspace Management: Unlimited users/workspaces for scale.",
      "Nexuscale API: Raw endpoint access for custom development.",
      "Native Integrations: Push data straight to Salesforce & HubSpot.",
      "Live Chat Support: Direct access to our engineering team.",
    ],
  },
];

export const faqData = [
  {
    question: "How exactly does the $39 per LinkedIn account billing work?",
    answer:
      "Your base subscription includes a set number of LinkedIn accounts (1 on Founder, 3 on Scale Up, 15 on Agency). If you need more capacity, you can add extra LinkedIn accounts a la carte for just $39/month per account directly inside your dashboard. You only pay for what you use, and you can scale up or down at any time.",
  },
  {
    question: "What counts as a 'Credit'?",
    answer:
      "Credits are the currency for our data and AI engines. You use a credit whenever you uncover a verified B2B email address from our database, or use the 'Upload and Enrich' feature to find data for your own lists. Note: Standard AI email generation and automated sending do not consume these credits. They are strictly for premium data enrichment.",
  },
  {
    question: "Is my LinkedIn account safe from being restricted or banned?",
    answer:
      "Absolutely. We built Nexus with enterprise-grade safety protocols. We use standard cloud IPs, randomized human-like delays between actions, and strict daily volume limits that mimic natural human behavior. We keep you well under LinkedIn’s radar so you can scale outbound safely.",
  },
  {
    question: "What happens if I hit my credit or mailbox limits?",
    answer:
      "We will never pause your active campaigns without warning. If you are approaching your limit, we'll send you a notification. From there, you can either upgrade your tier for a massive bump in limits, or buy simple add-on packs directly inside the app to keep your campaigns flowing.",
  },
  {
    question:
      "Do I have to use your inbuilt mailboxes, or can I connect my own?",
    answer:
      "You have total control. You can use our native mailbox servers to spin up infrastructure instantly, or you can connect your own Google Workspace, Outlook, or custom SMTP/IMAP servers. Our platform natively supports them all.",
  },
  {
    question:
      "I run a lead-gen agency. Can I white-label the software for my clients?",
    answer:
      "Yes! On the Agency ($1,799) plan, you get full white-labeling capabilities. You can set up a custom domain (e.g., app.youragency.com), upload your own logos, match your brand colors, and provide your clients with beautiful, read-only dashboards where they can watch the leads roll in.",
  },
  {
    question: "Are there any long-term contracts?",
    answer:
      "No. All plans are billed month-to-month, and you can cancel at any time. However, if you choose annual billing, you get 2 months completely free.",
  },
];

export const planStyles = {
  Free: {
    label: "text-zinc-500",
    accent: "from-zinc-600 to-zinc-400",
    film: "from-zinc-700/20 via-zinc-800/10 to-transparent",
    orb: "bg-zinc-500/20",
    border: "border-white/[0.06] hover:border-zinc-500/40",
    glow: "hover:shadow-[0_8px_40px_rgba(161,161,170,0.1)]",
    priceGrad: false,
    price: "text-white",
  },
  "Start Up": {
    label: "text-blue-400",
    accent: "from-blue-500 to-cyan-400",
    film: "from-blue-600/25 via-cyan-700/15 to-transparent",
    orb: "bg-blue-500/20",
    border: "border-white/[0.06] hover:border-blue-500/50",
    glow: "hover:shadow-[0_8px_40px_rgba(59,130,246,0.15)]",
    priceGrad: true,
    price: "from-cyan-300 to-blue-400",
  },
  Growth: {
    label: "text-emerald-400",
    accent: "from-emerald-500 to-teal-400",
    film: "from-emerald-600/25 via-teal-700/15 to-transparent",
    orb: "bg-emerald-500/20",
    border: "border-white/[0.06] hover:border-emerald-500/50",
    glow: "hover:shadow-[0_8px_40px_rgba(16,185,129,0.15)]",
    priceGrad: true,
    price: "from-emerald-300 to-teal-400",
  },
  "Scale Up": {
    label: "text-indigo-400",
    accent: "from-indigo-500 to-violet-400",
    film: "from-indigo-600/30 via-violet-700/20 to-transparent",
    orb: "bg-indigo-500/25",
    border: "border-indigo-500/50",
    glow: "shadow-[0_0_50px_rgba(99,102,241,0.2)] hover:shadow-[0_8px_60px_rgba(99,102,241,0.3)]",
    priceGrad: true,
    price: "from-indigo-300 to-violet-400",
  },
  Agency: {
    label: "text-purple-400",
    accent: "from-purple-500 to-pink-400",
    film: "from-purple-600/25 via-pink-700/15 to-transparent",
    orb: "bg-purple-500/20",
    border: "border-white/[0.06] hover:border-purple-500/50",
    glow: "hover:shadow-[0_8px_40px_rgba(168,85,247,0.15)]",
    priceGrad: true,
    price: "from-purple-300 to-pink-400",
  },
};
export const boosterPacksData = [
  {
    leads: "1,000",
    price: "49",
    mailboxes: "1",
    target: "Startup",
    href: "https://buy.stripe.com/00w3cvfBV08s5RGed3b7y0j",
  },
  {
    leads: "2,000",
    price: "79",
    mailboxes: "2",
    target: "Scale up",
    href: "https://buy.stripe.com/9B628rfBVg7q3Jyd8Zb7y0k",
  },
  {
    leads: "5,000",
    price: "199",
    mailboxes: "5",
    target: "Scale up",
    href: "https://buy.stripe.com/cNibJ19dx6wQeoc4Ctb7y0n",
  },
  {
    leads: "10,000",
    price: "349",
    mailboxes: "10",
    target: "Org +",
    href: "https://buy.stripe.com/6oUcN5cpJdZidk82ulb7y0m",
  },
  {
    leads: "35,000",
    price: "1000",
    mailboxes: "12",
    target: "Org +",
    href: "https://buy.stripe.com/6oUaEXahB9J2gwk4Ctb7y0o",
  },
  {
    leads: "Custom",
    price: "Contact Us",
    mailboxes: "++",
    target: "Org +",
    href: "https://cal.com/kevin-nexuscale/15min",
  },
];

export const comparisonStackData = [
  { name: "Clay", price: 149 },
  { name: "Apollo", price: 399 },
  { name: "Instantly", price: 97 },
  { name: "ChatGPT API", price: 20 },
];

export const customerLogos = [
  "SPHERION",
  "RENTBERRY",
  "RIPSTOP",
  "MALAKYE",
  "SEEDS",
  "FIREBOLT",
  "CHAIN",
  "MOSS",
  "PHRASE",
  "HIBOX",
  "MARUTI",
  "TKXEL",
  "MADAPP",
  "SOSHACE",
  "TEAVARO",
  "SAARA",
];
