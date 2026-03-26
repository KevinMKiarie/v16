import { 
  Database, Bot, Sparkles, Linkedin, Send, Flame, 
  Target, Languages 
} from 'lucide-react';

export const featuresList = [
  { 
    id: 'lead-search', 
    title: "Lead Search & Database", 
    desc: "250M+ verified contacts.", 
    icon: Database,
    benefits: [
      { title: "250M+ Verified Contacts", desc: "Access the world's largest real-time B2B database. Emails and phone numbers validated instantly upon search." },
      { title: "Granular Filtering", desc: "Filter by skills, revenue, headcount, and 50+ other distinct data points to find your exact buyer profile." },
      { title: "Match Scores", desc: "Instead of generic intent signals, see a precise Match Score indicating how well a prospect fits your unique criteria." }
    ]
  },
  { 
    id: 'agentic-outreach', 
    title: "Agentic Outreach", 
    desc: "Autonomous AI sales agents.", 
    icon: Bot,
    comingSoon: false,
    benefits: [
      { title: "Autonomous Decisions", desc: "The AI decides when to follow up, when to pivot the angle, and when to break up based on prospect behavior." },
      { title: "Sentiment Analysis", desc: "Automatically categorizes replies (Interested, OOO, Not Interested) and drafts appropriate responses for your review." },
      { title: "24/7 Operation", desc: "Your agent works while you sleep, ensuring prospects in every timezone are contacted at the optimal hour." }
    ]
  },
  { 
    id: 'email-personalisation', 
    title: "Email Personalisation", 
    desc: "Hyper-personalized at scale.", 
    icon: Sparkles,
    benefits: [
      { title: "Deep Research", desc: "The AI reads the prospect's LinkedIn, company news, and website to find relevant hooks." },
      { title: "Custom Prompts", desc: "Take full control. Add your own custom prompts to direct the AI on exactly how to craft the message." },
      { title: "Tone Matching", desc: "Adjusts the formality and length of the email based on the prospect's industry and seniority." }
    ]
  },
  { 
    id: 'linkedin-outreach', 
    title: "LinkedIn Outreach", 
    desc: "Automated connection & chat.", 
    icon: '/svg/linkedin-svgrepo-com.svg',
    benefits: [
      { title: "Smart Connections", desc: "Sends connection requests with personalized notes only to high-value prospects." },
      { title: "DM Automation", desc: "Send direct messages (DMs) to your connections, not just limited to InMails." },
      { title: "Profile Visits", desc: "Automatically visits profiles to trigger notifications and increase awareness before outreach." }
    ]
  },
  { 
    id: 'sending-engine', 
    title: "Sending Engine", 
    desc: "Gmail, Outlook, SMTP support.", 
    icon: Send,
    benefits: [
      { title: "Smart Throttling", desc: "Supports daily limits and automatically reschedules emails once you hit your limit to stay safe." },
      { title: "Zoho Integration", desc: "Seamless integration with Zoho, alongside standard Gmail and Outlook support." },
      { title: "CASA 2 Certified", desc: "We are CASA 2 Certified by Google, ensuring the highest standards of security and mailbox rotation." }
    ]
  },
  { 
    id: 'email-deliverability', 
    title: "Email Deliverability", 
    desc: "Rotation & warmup included.", 
    icon: Flame,
    benefits: [
      { title: "Automated Warmup", desc: "We automatically interact with your emails to build and maintain high sender reputation.", soon: true },
      { title: "DNS Monitoring", desc: "Real-time checks for SPF, DKIM, and DMARC records to ensure authentication is perfect.", soon: true },
      { title: "Inbox Rotation", desc: "Spreads volume across multiple inboxes so no single account exceeds safety limits." }
    ]
  },
  { 
    id: 'lead-scoring', 
    title: "Lead & Match Scoring", 
    desc: "Prioritize high-intent buyers.", 
    icon: Target,
    benefits: [
      { title: "Intent Weighting", desc: "Assigns higher scores to leads exhibiting buying signals like 'hiring for X' or 'raised Series A'." },
      { title: "Lookalike Modeling", desc: "Finds prospects that match the characteristics of your best closed-won deals." },
      { title: "CRM Sync", desc: "Pushes only the highest scoring leads to your CRM to keep your sales team focused.", soon: true }
    ]
  },
  { 
    id: 'multi-language', 
    title: "Multi-language Support", 
    desc: "Outreach in 50+ languages.", 
    icon: Languages,
    benefits: [
      { title: "Native Generation", desc: "AI generates content directly in the target language, avoiding awkward translation errors." },
      { title: "Cultural Nuance", desc: "Adapts greetings and sign-offs to match local business customs and etiquette." },
      { title: "Global Database", desc: "Our contact database covers 180+ countries, ensuring you can scale globally." }
    ]
  },
];

