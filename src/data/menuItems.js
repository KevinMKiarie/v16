import {
  PlayCircle,
  Phone,
  FileText,
  ScrollText,
  Send,
  Inbox,
  Database,
  Handshake,
  LucideRocket,
} from "lucide-react";

// export const solutionsList = [
//   { title: "Outbound", desc: "AI-powered multi-channel outreach.", icon: Send, url: "/solutions/outbound", external: false },
//   { title: "Inbound", desc: "Convert visitors into pipeline.", icon: Inbox, url: "/solutions/inbound", external: false },
//   { title: "Data Enrichment", desc: "Verified B2B data & enrichment.", icon: Database, url: "/solutions/data-enrichment", external: false },
//   { title: "Deal Execution", desc: "AI meeting prep & pipeline management.", icon: Handshake, url: "/solutions/deal-execution", external: false },
// ];

export const demoList = [
 
  {
    title: "Book a Live Demo",
    desc: "Talk to our sales team.",
    icon: Phone,
    url: "https://cal.com/kevin-nexuscale/15min",
    external: true,
  },
];

export const resourcesList = [
  {
    title: "Blog",
    desc: "Latest insights and tips.",
    icon: FileText,
    url: "/blogs",
    external: false,
  },
  {
    title: "White Papers",
    desc: "Deep dives and research.",
    icon: ScrollText,
    url: "/whitepapers",
    external: false,
  },
  {
    title: "Start up Program",
    desc: "Apply for a startup program.",
    icon: LucideRocket,
    url: "/resources/start-up",
    external: false,
  },
];
