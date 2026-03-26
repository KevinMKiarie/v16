import { Briefcase, Users, Rocket } from 'lucide-react';

export const useCasesList = [
  { 
    id: 'agencies', 
    title: "Agencies", 
    desc: "Scale outbound for multiple clients.", 
    icon: Briefcase,
    benefits: [
      { title: "Unified Client Management", desc: "Manage 50+ clients from a single dashboard. Switch contexts in one click without logging out." },
      { title: "White-Label Reporting", desc: "Automated, branded PDF reports sent to your clients every week showing ROI, open rates, and booked meetings." },
      { title: "Volume Pricing", desc: "Aggregated credit tiers that get cheaper as you scale your client base. High margin resale opportunity." }
    ]
  },
  { 
    id: 'sales-teams', 
    title: "Sales Teams", 
    desc: "Automate pipeline generation.", 
    icon: Users,
    benefits: [
      { title: "Round Robin Routing", desc: "Automatically distribute booked meetings fairly among your account executives." },
      { title: "Leaderboards & Analytics", desc: "Track which reps and which messaging angles are performing best with detailed team analytics." },
      { title: "Seamless CRM Sync", desc: "Two-way sync with Salesforce, HubSpot, and Pipedrive. No more manual data entry for your team." }
    ]
  },
  { 
    id: 'founders', 
    title: "Founders", 
    desc: "Automate your first sales hire.", 
    icon: Rocket,
    benefits: [
      { title: "SDR in a Box", desc: "Get the output of a full-time SDR (Sales Development Rep) for 1/10th the cost of a salary." },
      { title: "Zero-Touch Setup", desc: "Pre-built templates and workflows mean you can launch your first campaign in under 15 minutes." },
      { title: "Focus on Product", desc: "Let the Autopilot handle the grunt work of prospecting so you can focus on building and closing." }
    ]
  },
];

