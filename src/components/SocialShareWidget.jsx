import { useState, useEffect } from "react";
import { Linkedin, Facebook, Instagram, Slack } from "lucide-react";
import { XSocialIcon } from "./XSocialIcon";
import { WhatsAppIcon } from "./WhatsAppIcon";
import { neu } from "../utils/styles";

const LS_KEY = "nexuscale_share_count";
const BASE_COUNT = 11000; // starting floor

function formatCount(n) {
  if (n >= 1000) return (n / 1000).toFixed(1).replace(/\.0$/, "") + "K";
  return String(n);
}

function loadCount() {
  try {
    const stored = localStorage.getItem(LS_KEY);
    const parsed = stored ? parseInt(stored, 10) : BASE_COUNT;
    return Math.max(parsed, BASE_COUNT);
  } catch {
    return BASE_COUNT;
  }
}

function saveCount(n) {
  try {
    localStorage.setItem(LS_KEY, String(n));
  } catch {}
}

export default function SocialShareWidget() {
  const [copied, setCopied] = useState(false);
  const [shareCount, setShareCount] = useState(loadCount);
  const [animating, setAnimating] = useState(false);

  const currentUrl = "https://nexuscale.ai";

  const shareTexts = {
    linkedin: `Most sales teams are paying $4,000/yr to stitch together 6 tools that barely talk to each other.

Apollo for data. Clay for enrichment. Instantly for sending. A CRM bolted on top. A writer. An inbox manager.

That's not a stack. That's a liability.

NexusScale replaces all of it — one AI platform with database, writer, and sending infrastructure built together from day one.

Here's what that looks like in practice:

✅ 24/7 autonomous lead prospecting — no manual list-building
✅ Hyper-personalized outreach in 50+ languages — written by AI, not templates
✅ Meetings auto-booked directly into your calendar
✅ Built-in CRM, inbox rotation & LinkedIn automation

And it starts at $59/mo.

"Got 3 signups from 13 emails on day one." — Peter Poulos, Founder, Photostudio.io
"The personalization is miles ahead of anything else I've tested." — Francis Rozange, CEO, La Factory

If you're still duct-taping your outbound stack together, this is your sign to stop.

👉 https://nexuscale.ai`,

    twitter: `Most sales teams spend $4,000/yr on 6 tools that barely talk to each other.

Apollo. Clay. Instantly. A CRM. A writer. An inbox manager.

NexusScale replaces all of it — one AI platform, built together.

→ 24/7 autonomous prospecting
→ AI outreach in 50+ languages
→ Auto-books meetings for you
→ Built-in CRM & LinkedIn automation

From $59/mo. Your competitors are already switching 👇`,

    whatsapp: `Hey — quick share because this is genuinely impressive.

Most outbound teams are paying $4,000+/yr running Apollo, Clay, Instantly and a CRM separately. NexusScale replaces all of it with one AI platform — database, writer, and sending infra built together.

Real results: "Got 3 signups from 13 emails on day one." — Peter Poulos, Founder at Photostudio.io

It starts at $59/mo and there's no duct-taping tools together. Worth 2 minutes of your time 👉 https://nexuscale.ai`,

    facebook: `If your sales team is still paying separately for Apollo, Clay, Instantly, and a CRM — you're overpaying by thousands every year.

NexusScale is a single AI platform that does it all: lead database, AI writer, and sending infrastructure — built together, not bolted on.

The results speak for themselves:

⭐ "Got 3 signups from 13 emails on day one." — Peter Poulos, Founder, Photostudio.io
⭐ "The personalization is miles ahead of anything else I've tested." — Francis Rozange, CEO, La Factory

One platform. From $59/mo. No $4,000/yr duct-tape bill.

See it for yourself 👇 https://nexuscale.ai`,

    instagram: `Your outbound stack has 6 tools. NexusScale has one. ⚡

Database. AI Writer. Sending Infrastructure. CRM. LinkedIn Automation. All built together — from $59/mo.

No Apollo. No Clay. No Instantly. No $4K/yr duct-tape bill. 🚫💸

"Got 3 signups from 13 emails on day one." 🔥

Link copied to clipboard — go check it out! 🔗 nexuscale.ai`,

    slack: `📣 *Stop paying $4,000/yr to stitch together 6 tools.*

*NexusScale* replaces your entire outbound stack — database, AI writer, and sending infrastructure, built together as one platform.

No Apollo. No Clay. No Instantly. No duct-tape.

What you get instead:
• 🔍 24/7 autonomous lead prospecting
• ✍️ AI-personalized outreach in 50+ languages
• 📅 Meetings auto-booked to your calendar
• 📥 Built-in CRM, inbox rotation & LinkedIn automation

_"Got 3 signups from 13 emails on day one."_ — Peter Poulos, Founder, Photostudio.io
_"The personalization is miles ahead of anything else I've tested."_ — Francis Rozange, CEO, La Factory

From $59/mo → https://nexuscale.ai`,
  };

  useEffect(() => {
    fetch(
      `https://graph.facebook.com/?id=${encodeURIComponent(currentUrl)}&fields=share`,
    )
      .then((r) => r.json())
      .then((data) => {
        const fbCount = data?.share?.share_count;
        if (fbCount && fbCount > 0) {
          const combined = BASE_COUNT + fbCount;
          const current = loadCount();
          if (combined > current) {
            setShareCount(combined);
            saveCount(combined);
          }
        }
      })
      .catch(() => {});
  }, []);

  const trackShare = () => {
    setShareCount((prev) => {
      const next = prev + 1;
      saveCount(next);
      return next;
    });
    setAnimating(true);
    setTimeout(() => setAnimating(false), 600);
  };

  const shareLinks = [
    {
      name: "LinkedIn",
      icon: Linkedin,
      color: "group-hover:text-[#0077b5]",
      action: () => {
        window.open(
          `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}&summary=${encodeURIComponent(shareTexts.linkedin)}`,
          "_blank",
        );
        trackShare();
      },
    },
    {
      name: "Twitter (X)",
      icon: XSocialIcon,
      color: "group-hover:text-white",
      action: () => {
        window.open(
          `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareTexts.twitter)}&url=${encodeURIComponent(currentUrl)}`,
          "_blank",
        );
        trackShare();
      },
    },
    {
      name: "WhatsApp",
      icon: WhatsAppIcon,
      color: "group-hover:text-[#25D366]",
      action: () => {
        window.open(
          `https://wa.me/?text=${encodeURIComponent(shareTexts.whatsapp)}`,
          "_blank",
        );
        trackShare();
      },
    },
    {
      name: "Facebook",
      icon: Facebook,
      color: "group-hover:text-[#1877F2]",
      action: () => {
        window.open(
          `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}&quote=${encodeURIComponent(shareTexts.facebook)}`,
          "_blank",
        );
        trackShare();
      },
    },
    {
      name: "Instagram",
      icon: Instagram,
      color: "group-hover:text-[#E1306C]",
      action: () => {
        navigator.clipboard.writeText(shareTexts.instagram + "\n" + currentUrl);
        setCopied(true);
        trackShare();
        window.open("https://www.instagram.com/", "_blank");
        setTimeout(() => setCopied(false), 2000);
      },
    },
    {
      name: "Slack",
      icon: Slack,
      color: "group-hover:text-[#4A154B]",
      action: () => {
        window.open(
          `https://slack.com/intl/en-us/share?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(shareTexts.slack)}`,
          "_blank",
        );
        trackShare();
      },
    },
  ];

  return (
    <div className="fixed right-4 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col gap-3">
      <div
        className={`flex flex-col gap-1.5 p-2 rounded-xl border border-white/10 ${neu.glass} shadow-2xl backdrop-blur-xl transition-all duration-500 hover:scale-105`}
      >
        <div className="flex flex-col items-center justify-center pt-1 pb-1">
          <span
            className={`text-[10px] font-bold text-white leading-tight transition-transform duration-300 ${animating ? "scale-125 text-indigo-300" : "scale-100"}`}
          >
            {formatCount(shareCount)}
          </span>
          <span className="text-[8px] font-bold text-zinc-500 uppercase tracking-wider leading-tight">
            Shares
          </span>
        </div>
        <div className="h-px w-full bg-white/5 my-0.5"></div>
        {shareLinks.map((link, i) => (
          <button
            key={i}
            onClick={link.action}
            className="group relative p-2 rounded-lg hover:bg-white/10 transition-all duration-300 flex items-center justify-center"
            title={`Share on ${link.name}`}
          >
            <link.icon
              className={`w-4 h-4 text-zinc-400 transition-colors duration-300 ${link.color}`}
            />
            {link.name === "Instagram" && copied && (
              <div className="absolute right-full mr-2 px-2 py-1 bg-emerald-500 text-white text-[10px] font-bold rounded opacity-100 animate-in fade-in slide-in-from-right-2 whitespace-nowrap shadow-lg">
                Copied!
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
