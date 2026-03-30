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
    linkedin: `Nexuscale AI simplifies your entire sales workflow in an instant.

One platform. One AI agent. Replaces Apollo, Clay & Instantly.

✅ 24/7 autonomous lead prospecting
✅ Hyper-personalized outreach in 50+ languages
✅ AI that auto-books meetings for you
✅ Built-in CRM, inbox & LinkedIn automation

From $59/mo. Your competitors are already automating.`,

    twitter: `Nexuscale AI simplifies your sales workflow in an instant.

One agent replaces Apollo + Clay + Instantly:
→ 24/7 lead prospecting
→ Personalized outreach in 50+ languages
→ Auto-books meetings
→ Built-in CRM & LinkedIn automation

From $59/mo 👇`,

    whatsapp: `Hey! Check out Nexuscale AI — it simplifies your entire sales process in an instant.

One AI agent that prospects leads, writes personalised outreach in 50+ languages, and even books meetings automatically. Replaces Apollo, Clay & Instantly from just $59/mo.

Worth a look 👉 https://nexuscale.ai`,

    facebook: `Nexuscale AI simplifies your sales workflow in an instant — one platform that replaces Apollo, Clay & Instantly.

AI agents prospect 24/7, write personalised outreach in 50+ languages, and auto-book meetings for you. Built-in CRM and LinkedIn automation included.

From $59/mo 👇`,

    instagram: `Nexuscale AI simplifies your sales workflow in an instant ⚡ One AI agent replaces Apollo, Clay & Instantly — 24/7 prospecting, personalised outreach in 50+ languages, auto-books meetings. From $59/mo. Link copied — check it out! 🔗`,

    slack: `📣 *Nexuscale AI* simplifies your sales workflow in an instant.

One platform replaces Apollo + Clay + Instantly:
• 24/7 AI lead prospecting
• Personalised outreach in 50+ languages
• AI that auto-books meetings
• Built-in CRM, inbox & LinkedIn automation

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
