import React from 'react';

const Highlight = ({ children }) => (
  <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400 font-bold mx-0.5 inline-block leading-tight">
    {children}
  </span>
);

export const reviews = [
  { name: "Francis Rozange", role: "CEO, La Factory", source: "g2", quote: <>Nexuscale represents a <Highlight>major leap</Highlight> in cold email technology. The personalization is miles ahead... The direct founder support from Kevin is unheard of.</> },
  { name: "Mario Bosquet", role: "Fractional CMO, Keenfunnel", source: "g2", quote: <>Nexuscale redefines what an SDR can be. It doesn't just automate tasks - it <Highlight>automates strategy</Highlight>. Each rep now has an autonomous AI teammate that actually thinks.</> },
  { name: "Alex Reynolds", role: "Founder, Postingsoftware.com", quote: <>I sent thousands of emails that <Highlight>felt handcrafted</Highlight>... Kevin's team fixes issues within hours. Absolutely worth the max tier.</> },
  { name: "Mitch Taylor", role: "Founder, Local AI Genius", quote: <>These guys listen. I sent my first 200 throttled emails... and was <Highlight>blown away by the tone</Highlight> and quality.</> },
  { name: "Peter Poulos", role: "Founder, Photostudio.io", quote: <>Got 3 signups from 13 emails on day one. The AI wrote <Highlight>genuinely human emails</Highlight>, not robotic templates... This platform actually delivers.</> },
  { name: "Grace Lee", role: "Sales Rep, Enterprise", source: "g2", quote: <>Nexuscale AI makes finding ideal leads effortless. The dashboard is clean and intuitive, and their <Highlight>24/7 support</Highlight> is second to none.</> },
  { name: "Josefa Santos", role: "Founder", source: "g2", quote: <>I've been very impressed with the vision, the implementation and the execution... It is <Highlight>so easy to use</Highlight>.</> },
  { name: "Everest Nash", role: "Backend Tech Lead", quote: <>The AI personalization makes every email <Highlight>feel written for the recipient</Highlight>. Customer support is responsive.</> },
  { name: "Rachael Newton", role: "Lead Gen Specialist", source: "g2", quote: <>Finally, a platform that <Highlight>replaces the messy B2B stack</Highlight>. The lead database is accurate, personalization feels human.</> },
{ 
  name: "Monique Davis", 
  role: "CEO", 
  source: "g2", 
  quote: <>I sent 111 cold messages and <Highlight>secured 3 scheduled phone meetings</Highlight> with my very first campaign. It's the perfect tool for niche B2B outreach.</> 
}
];

