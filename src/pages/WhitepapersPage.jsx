import { useEffect, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link, useSearchParams } from "react-router-dom";
import { Section } from "../components/ui/Section";
import { ScrollReveal } from "../components/ScrollReveal";
import { accentColor, accentColorEnd } from "../constants/theme";
import {
  fetchWhitepapers,
  fetchAllArticles,
  sendWhitepaperPdf,
} from "../lib/queryClient";
import {
  ArrowRight,
  ArrowLeft,
  CheckCircle,
  Lock,
  X,
  FileText,
  Download,
  Mail,
  ShieldCheck,
  Clock,
  Bell,
  AlertCircle,
} from "lucide-react";

const WHITEPAPERS_PER_PAGE = 9;
const DEFAULT_IMAGE =
  "https://placehold.co/600x400/787ff6/FFFFFF?text=Whitepaper";

const getCoverImage = (post) => {
  const imageUrl =
    post?.cover?.formats?.small?.url ||
    post?.cover?.formats?.medium?.url ||
    post?.cover?.url ||
    post?.coverImage ||
    post?.image ||
    post?.imageUrl;
  if (!imageUrl) return null;
  if (typeof imageUrl === "string" && imageUrl.startsWith("/")) {
    return `https://articles.nexuscale.ai/${imageUrl}`;
  }
  return imageUrl;
};

const getSlug = (post) => post?.slug || post?.id || "";

const getDateValue = (post) => {
  const dateStr =
    post?.publishedAt ||
    post?.published_at ||
    post?.createdAt ||
    post?.created_at;
  if (!dateStr) return 0;
  const time = Date.parse(dateStr);
  return Number.isNaN(time) ? 0 : time;
};

const formatDate = (post) => {
  const dateStr =
    post?.publishedAt ||
    post?.published_at ||
    post?.createdAt ||
    post?.created_at;
  if (!dateStr) return "";
  try {
    return new Date(dateStr).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  } catch {
    return dateStr;
  }
};

const getCategory = (post) => {
  if (post?.category?.name) return post.category.name;
  if (typeof post?.category === "string") return post.category;
  if (post?.categories?.[0]?.name) return post.categories[0].name;
  return "Whitepaper";
};

const getAuthor = (post) => {
  if (post?.author?.name) return post.author.name;
  if (typeof post?.author === "string") return post.author;
  return "Nexuscale Team";
};

const getReadTime = (post) => {
  if (post?.readTime || post?.read_time) return post.readTime || post.read_time;
  return "10 min read";
};

const getDescription = (post) => {
  return post?.description || post?.excerpt || post?.summary || "";
};

const PREVIEW_WORD_LIMIT = 270;

const PreviewModal = ({ isOpen, onClose, paper, onRequestDownload }) => {
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    if (isOpen) setImageError(false);
  }, [isOpen]);

  if (!isOpen || !paper) return null;

  const imageUrl = getCoverImage(paper);
  const showPlaceholder = !imageUrl || imageError;
  const description = getDescription(paper);
  const words = description.trim().split(/\s+/).filter(Boolean);
  const isTruncated = words.length > PREVIEW_WORD_LIMIT;
  const previewText = isTruncated
    ? words.slice(0, PREVIEW_WORD_LIMIT).join(" ")
    : description;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative w-full max-w-2xl bg-[#0C0C0E] border border-white/[0.08] rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 text-zinc-400 hover:text-white hover:bg-white/10 rounded-full transition-colors"
          type="button"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Cover image */}
        <div className="relative w-full aspect-[16/7] flex-shrink-0 overflow-hidden">
          {!showPlaceholder ? (
            <img
              src={imageUrl}
              alt={paper?.title || "Whitepaper cover"}
              className="w-full h-full object-cover"
              onError={() => setImageError(true)}
            />
          ) : (
            <div
              className="absolute inset-0 flex items-center justify-center"
              style={{
                background: `linear-gradient(135deg, ${accentColor}40, ${accentColorEnd}20)`,
              }}
            >
              <FileText className="w-16 h-16 text-white/30" />
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0C0C0E] via-[#0C0C0E]/20 to-transparent" />
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto px-6 md:px-8 pb-2 -mt-6 relative">
          <span
            className="inline-flex items-center gap-1.5 text-xs font-semibold mb-3 w-fit px-2.5 py-1 rounded-full"
            style={{ color: accentColor, backgroundColor: `${accentColor}15` }}
          >
            <FileText className="w-3 h-3" />
            {getCategory(paper)}
          </span>
          <h2 className="text-xl md:text-2xl font-bold text-white mb-3 leading-tight">
            {paper?.title || "Untitled Whitepaper"}
          </h2>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-zinc-500 mb-5">
            <span>{getAuthor(paper)}</span>
            <span className="w-1 h-1 rounded-full bg-zinc-600" />
            <span>{formatDate(paper)}</span>
            <span className="w-1 h-1 rounded-full bg-zinc-600" />
            <span>{getReadTime(paper)}</span>
          </div>

          {description ? (
            <div className="relative">
              <p className="text-zinc-300 text-sm md:text-base leading-relaxed">
                {previewText}
                {isTruncated && <span className="text-zinc-500"> …</span>}
              </p>
              {isTruncated && (
                <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-[#0C0C0E] to-transparent pointer-events-none" />
              )}
            </div>
          ) : (
            <p className="text-zinc-500 text-sm italic">
              No preview available for this whitepaper.
            </p>
          )}

          {isTruncated && (
            <p className="text-xs text-zinc-500 mt-4 flex items-center gap-1.5">
              <Lock className="w-3 h-3" />
              Preview limited to {PREVIEW_WORD_LIMIT} words — download the full
              whitepaper below.
            </p>
          )}
        </div>

        {/* Footer CTA */}
        <div className="flex-shrink-0 px-6 md:px-8 py-5 border-t border-white/[0.06] bg-[#0C0C0E]">
          <button
            onClick={onRequestDownload}
            className="w-full py-3.5 px-6 rounded-xl text-white font-bold flex items-center justify-center gap-2 transition-all hover:opacity-90 active:scale-95"
            style={{
              background: `linear-gradient(120deg, ${accentColor}, ${accentColorEnd})`,
            }}
            type="button"
          >
            <Download className="w-5 h-5" />
            Download PDF
            <Lock className="w-4 h-4 opacity-60" />
          </button>
          <p className="text-xs text-center text-zinc-500 mt-3">
            Enter your work email and we'll send the full PDF straight to your
            inbox.
          </p>
        </div>
      </div>
    </div>
  );
};

const EmailModal = ({ isOpen, onClose, paper }) => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isOpen) {
      setEmail("");
      setIsSubmitted(false);
      setIsLoading(false);
      setError(null);
    }
  }, [isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);
    try {
      await sendWhitepaperPdf(email.trim(), paper);
      setIsSubmitted(true);
      setTimeout(onClose, 2500);
    } catch (err) {
      setError(err?.message || "Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative w-full max-w-md bg-[#0C0C0E] border border-white/[0.08] rounded-3xl shadow-2xl p-8 md:p-10 transform transition-all duration-200">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-zinc-400 hover:text-white hover:bg-white/10 rounded-full transition-colors"
          type="button"
        >
          <X className="w-5 h-5" />
        </button>

        {!isSubmitted ? (
          <>
            <div className="w-12 h-12 rounded-full bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center mb-6 mx-auto">
              <Lock className="w-6 h-6 text-indigo-400" />
            </div>
            <h3 className="text-2xl font-bold text-center text-white mb-2">
              Unlock this Whitepaper
            </h3>
            <p className="text-center text-zinc-400 mb-8">
              Enter your work email to download{" "}
              <strong className="text-white">
                "{paper?.title || "this whitepaper"}"
              </strong>
              .
            </p>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                  <AlertCircle className="w-5 h-5 flex-shrink-0" />
                  <span>{error}</span>
                </div>
              )}
              <div>
                <label htmlFor="whitepaper-email" className="sr-only">
                  Work Email
                </label>
                <input
                  type="email"
                  id="whitepaper-email"
                  required
                  placeholder="name@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-[#09090B] border border-white/[0.08] text-white placeholder-zinc-500 focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 outline-none transition-all"
                />
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 px-6 rounded-xl text-white font-bold flex items-center justify-center gap-2 transition-all hover:opacity-90 active:scale-95 disabled:opacity-70"
                style={{
                  background: `linear-gradient(120deg, ${accentColor}, ${accentColorEnd})`,
                }}
              >
                {isLoading ? (
                  <span className="inline-block w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    Send Me the PDF <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </form>
            <p className="text-xs text-center text-zinc-500 mt-6">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </>
        ) : (
          <div className="text-center py-8">
            <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-6 mx-auto">
              <CheckCircle className="w-8 h-8 text-emerald-400" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">
              Check your inbox!
            </h3>
            <p className="text-zinc-400">
              We've sent the PDF to{" "}
              <strong className="text-white">{email}</strong>.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

const SkeletonCard = () => (
  <div className="flex flex-col h-full bg-[#09090B]/50 backdrop-blur-sm rounded-2xl border border-white/[0.08] overflow-hidden animate-pulse">
    <div className="relative w-full aspect-[16/9] overflow-hidden rounded-t-2xl bg-gradient-to-r from-zinc-800 via-zinc-700 to-zinc-800" />
    <div className="flex flex-col flex-grow p-6">
      <div className="h-4 w-20 bg-zinc-800 rounded-full mb-3" />
      <div className="space-y-2 mb-3">
        <div className="h-5 bg-zinc-800 rounded w-full" />
        <div className="h-5 bg-zinc-800 rounded w-4/5" />
      </div>
      <div className="space-y-2 mb-4 flex-grow">
        <div className="h-3 bg-zinc-800 rounded w-full" />
        <div className="h-3 bg-zinc-800 rounded w-full" />
        <div className="h-3 bg-zinc-800 rounded w-3/4" />
      </div>
      <div className="flex gap-4">
        <div className="h-3 w-28 bg-zinc-800 rounded" />
        <div className="h-3 w-20 bg-zinc-800 rounded" />
      </div>
    </div>
  </div>
);

const FeaturedSkeleton = () => (
  <div className="animate-pulse bg-[#09090B]/50 backdrop-blur-sm rounded-3xl border border-white/[0.08] overflow-hidden">
    <div className="grid md:grid-cols-2 gap-0">
      <div className="aspect-[16/10] md:aspect-auto bg-gradient-to-r from-zinc-800 via-zinc-700 to-zinc-800" />
      <div className="p-8 md:p-10 lg:p-12 flex flex-col justify-center">
        <div className="h-4 w-24 bg-zinc-800 rounded-full mb-4" />
        <div className="space-y-2 mb-4">
          <div className="h-7 bg-zinc-800 rounded w-full" />
          <div className="h-7 bg-zinc-800 rounded w-3/4" />
        </div>
        <div className="space-y-2 mb-6">
          <div className="h-4 bg-zinc-800 rounded w-full" />
          <div className="h-4 bg-zinc-800 rounded w-full" />
          <div className="h-4 bg-zinc-800 rounded w-2/3" />
        </div>
        <div className="h-12 w-48 bg-zinc-800 rounded-xl" />
      </div>
    </div>
  </div>
);

const FeaturedWhitepaperCard = ({ paper, onDownload }) => {
  const [imageError, setImageError] = useState(false);
  const imageUrl = getCoverImage(paper);
  const showPlaceholder = !imageUrl || imageError;

  return (
    <ScrollReveal>
      <div className="relative bg-[#09090B]/60 backdrop-blur-sm rounded-3xl border border-white/[0.08] hover:border-white/[0.15] transition-all duration-500 overflow-hidden group">
        <div className="grid md:grid-cols-2 gap-0">
          {/* Image */}
          <div className="relative aspect-[16/10] md:aspect-auto overflow-hidden">
            {!showPlaceholder ? (
              <img
                src={imageUrl}
                alt={paper?.title || "Featured whitepaper"}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-400"
                onError={() => setImageError(true)}
              />
            ) : (
              <div
                className="absolute inset-0 w-full h-full flex items-center justify-center"
                style={{
                  background: `linear-gradient(135deg, ${accentColor}40, ${accentColorEnd}20)`,
                }}
              >
                <FileText className="w-16 h-16 text-white/30" />
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#09090B]/40 hidden md:block" />
          </div>

          <div className="p-8 md:p-10 lg:p-12 flex flex-col justify-center">
            <span
              className="inline-flex items-center gap-1.5 text-sm font-semibold mb-4 w-fit px-3 py-1 rounded-full"
              style={{
                color: accentColor,
                backgroundColor: `${accentColor}15`,
              }}
            >
              <FileText className="w-3.5 h-3.5" />
              {getCategory(paper)}
            </span>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4 leading-tight">
              {paper?.title || "Untitled Whitepaper"}
            </h2>
            <p className="text-zinc-400 text-base md:text-lg leading-relaxed mb-6 line-clamp-3">
              {getDescription(paper)}
            </p>
            <div className="flex items-center gap-4 text-sm text-zinc-500 mb-8">
              <span>{getAuthor(paper)}</span>
              <span className="w-1 h-1 rounded-full bg-zinc-600" />
              <span>{formatDate(paper)}</span>
              <span className="w-1 h-1 rounded-full bg-zinc-600" />
              <span>{getReadTime(paper)}</span>
            </div>
            <button
              onClick={() => onDownload(paper)}
              className="inline-flex items-center gap-2.5 text-white font-bold py-3.5 px-7 rounded-xl transition-all hover:opacity-90 active:scale-95 w-fit text-base"
              style={{
                background: `linear-gradient(120deg, ${accentColor}, ${accentColorEnd})`,
              }}
              type="button"
            >
              <Download className="w-5 h-5" />
              Download PDF
              <Lock className="w-4 h-4 opacity-60" />
            </button>
          </div>
        </div>
      </div>
    </ScrollReveal>
  );
};

const WhitepaperCard = ({ paper, onDownload }) => {
  const [imageError, setImageError] = useState(false);
  const imageUrl = getCoverImage(paper);
  const showPlaceholder = !imageUrl || imageError;

  return (
    <ScrollReveal>
      <div className="flex flex-col h-full bg-[#09090B]/50 backdrop-blur-sm rounded-2xl border border-white/[0.08] hover:border-white/[0.15] transition-all duration-300 overflow-hidden group">
        <div className="relative w-full aspect-[16/9] overflow-hidden rounded-t-2xl">
          {!showPlaceholder ? (
            <img
              src={imageUrl}
              alt={paper?.title || "Whitepaper"}
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              onError={() => setImageError(true)}
            />
          ) : (
            <div
              className="absolute inset-0 w-full h-full flex items-center justify-center"
              style={{
                background: `linear-gradient(135deg, ${accentColor}30, ${accentColorEnd}15)`,
              }}
            >
              <FileText className="w-10 h-10 text-white/20" />
            </div>
          )}
        </div>
        <div className="flex flex-col flex-grow p-6">
          <span
            className="inline-flex items-center gap-1.5 text-xs font-semibold mb-3 w-fit px-2.5 py-1 rounded-full"
            style={{ color: accentColor, backgroundColor: `${accentColor}15` }}
          >
            <FileText className="w-3 h-3" />
            {getCategory(paper)}
          </span>
          <h3 className="font-bold text-white mb-3 text-lg leading-snug line-clamp-2 group-hover:text-indigo-300 transition-colors">
            {paper?.title || "Untitled Whitepaper"}
          </h3>
          <p className="text-zinc-400 text-sm leading-relaxed mb-6 flex-grow line-clamp-3">
            {getDescription(paper)}
          </p>
          <div className="flex items-center gap-3 text-xs text-zinc-500 mb-5">
            <span>{getAuthor(paper)}</span>
            <span className="w-1 h-1 rounded-full bg-zinc-600" />
            <span>{formatDate(paper)}</span>
            <span className="w-1 h-1 rounded-full bg-zinc-600" />
            <span>{getReadTime(paper)}</span>
          </div>
          <div className="pt-5 border-t border-white/[0.06]">
            <button
              onClick={() => onDownload(paper)}
              className="inline-flex items-center gap-2 text-sm font-bold text-white py-2.5 px-5 rounded-full transition-all hover:opacity-90 active:scale-95"
              style={{
                background: `linear-gradient(120deg, ${accentColor}, ${accentColorEnd})`,
              }}
              type="button"
            >
              Download PDF
              <Lock className="w-3.5 h-3.5 opacity-70" />
            </button>
          </div>
        </div>
      </div>
    </ScrollReveal>
  );
};

const NewsletterSection = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
    }, 1000);
  };

  const trustBadges = [
    { icon: ShieldCheck, text: "No spam" },
    { icon: Clock, text: "Unsubscribe anytime" },
    { icon: Bell, text: "Weekly insights" },
  ];

  return (
    <Section className="py-20 md:py-28">
      <ScrollReveal>
        <div className="relative overflow-hidden rounded-3xl border border-white/[0.08] bg-[#09090B]/80 backdrop-blur-sm">
          {/* Ambient glow */}
          <div
            className="absolute -top-32 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full blur-[120px] opacity-20 pointer-events-none"
            style={{
              background: `radial-gradient(circle, ${accentColor}, transparent 70%)`,
            }}
          />
          <div
            className="absolute -bottom-32 right-0 w-[300px] h-[300px] rounded-full blur-[100px] opacity-10 pointer-events-none"
            style={{
              background: `radial-gradient(circle, ${accentColorEnd}, transparent 70%)`,
            }}
          />

          <div className="relative z-10 px-8 py-16 md:px-16 md:py-20 text-center max-w-2xl mx-auto">
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-6"
              style={{
                backgroundColor: `${accentColor}15`,
                border: `1px solid ${accentColor}30`,
              }}
            >
              <Mail className="w-7 h-7" style={{ color: accentColor }} />
            </div>

            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Stay Ahead of the Curve
            </h2>
            <p className="text-zinc-400 text-base md:text-lg leading-relaxed mb-10">
              Get exclusive insights, industry reports, and actionable
              strategies delivered directly to your inbox. Join thousands of
              revenue leaders.
            </p>

            {!isSubmitted ? (
              <>
                <form
                  onSubmit={handleSubmit}
                  className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto mb-8"
                >
                  <label htmlFor="newsletter-email" className="sr-only">
                    Email address
                  </label>
                  <input
                    type="email"
                    id="newsletter-email"
                    required
                    placeholder="name@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 px-5 py-3.5 rounded-xl bg-[#020203] border border-white/[0.1] text-white placeholder-zinc-500 focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 outline-none transition-all text-base"
                  />
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="px-7 py-3.5 rounded-xl text-white font-bold flex items-center justify-center gap-2 transition-all hover:opacity-90 active:scale-95 disabled:opacity-70 whitespace-nowrap"
                    style={{
                      background: `linear-gradient(120deg, ${accentColor}, ${accentColorEnd})`,
                    }}
                  >
                    {isLoading ? (
                      <span className="inline-block w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      "Subscribe"
                    )}
                  </button>
                </form>

                <div className="flex flex-wrap items-center justify-center gap-6">
                  {trustBadges.map(({ icon: Icon, text }) => (
                    <span
                      key={text}
                      className="flex items-center gap-1.5 text-sm text-zinc-500"
                    >
                      <Icon className="w-4 h-4 text-zinc-600" />
                      {text}
                    </span>
                  ))}
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center gap-3">
                <div className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                  <CheckCircle className="w-7 h-7 text-emerald-400" />
                </div>
                <p className="text-lg font-semibold text-white">
                  You're subscribed!
                </p>
                <p className="text-zinc-400 text-sm">
                  Check your inbox for a confirmation email.
                </p>
              </div>
            )}
          </div>
        </div>
      </ScrollReveal>
    </Section>
  );
};

const BlogCard = ({ post }) => {
  const [imageError, setImageError] = useState(false);
  const imageUrl = getCoverImage(post);
  const showPlaceholder = !imageUrl || imageError;

  return (
    <ScrollReveal>
      <Link to={`/blogs/${getSlug(post)}`} className="block h-full">
        <div className="flex flex-col h-full cursor-pointer bg-[#09090B]/50 backdrop-blur-sm rounded-2xl border border-white/[0.08] hover:border-white/[0.12] transition-all duration-300 overflow-hidden group">
          <div className="relative w-full aspect-[16/9] overflow-hidden rounded-t-2xl">
            {!showPlaceholder && (
              <img
                src={imageUrl}
                alt={post?.title || post?.name || "Blog post"}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                onError={() => setImageError(true)}
              />
            )}
            {showPlaceholder && (
              <div
                className="absolute inset-0 w-full h-full flex items-center justify-center"
                style={{ backgroundColor: accentColor }}
              >
                <span className="text-white font-bold text-2xl md:text-3xl">
                  Nexuscale
                </span>
              </div>
            )}
          </div>
          <div className="p-6 flex flex-col flex-grow">
            <h3 className="font-bold text-white text-lg mb-4 line-clamp-2 flex-grow group-hover:text-indigo-300 transition-colors">
              {post?.title || post?.name || "Untitled Article"}
            </h3>
            <span
              className="inline-flex items-center text-sm font-semibold hover:underline"
              style={{ color: accentColor }}
            >
              Read Article <ArrowRight className="w-4 h-4 ml-1" />
            </span>
          </div>
        </div>
      </Link>
    </ScrollReveal>
  );
};

export default function WhitepapersPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = parseInt(searchParams.get("page") || "1", 10);

  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const [selectedPaper, setSelectedPaper] = useState(null);

  const {
    data: whitepapersData,
    isLoading: wpLoading,
    isError: wpError,
  } = useQuery({
    queryKey: ["whitepapers", currentPage],
    queryFn: () => fetchWhitepapers(currentPage, WHITEPAPERS_PER_PAGE),
    staleTime: 1000 * 60 * 30,
  });

  const whitepapers = whitepapersData?.entries || [];
  const totalPages = whitepapersData?.total_pages || 0;

  const featuredWhitepaper =
    currentPage === 1 && whitepapers.length > 0 ? whitepapers[0] : null;
  const gridWhitepapers =
    currentPage === 1 && whitepapers.length > 1
      ? whitepapers.slice(1)
      : currentPage > 1
        ? whitepapers
        : [];

  const {
    data: blogData,
    isLoading: blogLoading,
    isError: blogError,
  } = useQuery({
    queryKey: ["articles"],
    queryFn: fetchAllArticles,
    staleTime: 1000 * 60 * 5,
  });

  const trendingPosts = useMemo(() => {
    if (blogLoading || blogError || !blogData) return [];
    const articles = Array.isArray(blogData) ? blogData : [];
    const sorted = [...articles].sort(
      (a, b) => getDateValue(b) - getDateValue(a),
    );
    return sorted.slice(0, 3);
  }, [blogData, blogLoading, blogError]);

  const handleDownloadClick = (paper) => {
    setSelectedPaper(paper);
    setIsPreviewOpen(true);
  };

  const handleRequestDownload = () => {
    setIsPreviewOpen(false);
    setIsEmailModalOpen(true);
  };

  const handlePageChange = (newPage) => {
    setSearchParams({ page: newPage.toString() });
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  const hasWhitepapers = whitepapers.length > 0;

  return (
    <div className="min-h-screen bg-[#020203]">
      <main className="relative z-10">
        <PreviewModal
          isOpen={isPreviewOpen}
          onClose={() => setIsPreviewOpen(false)}
          paper={selectedPaper}
          onRequestDownload={handleRequestDownload}
        />
        <EmailModal
          isOpen={isEmailModalOpen}
          onClose={() => setIsEmailModalOpen(false)}
          paper={selectedPaper}
        />

        <section className="relative overflow-hidden pt-8 pb-16 md:pb-24">
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[500px] rounded-full blur-[150px] opacity-15 pointer-events-none"
            style={{
              background: `radial-gradient(circle, ${accentColor}, transparent 70%)`,
            }}
          />
          <div className="max-w-6xl mx-auto px-6 relative z-10">
            <ScrollReveal>
              <div className="max-w-3xl mx-auto text-center">
                <h1
                  className="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-6 leading-tight tracking-tight"
                  style={{
                    background: `linear-gradient(120deg, ${accentColor} 20%, #ffffff 100%)`,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  Nexuscale Whitepapers
                </h1>
                <p className="text-base md:text-lg lg:text-xl leading-relaxed text-zinc-400 max-w-2xl mx-auto">
                  In-depth reports, technical briefs, and frameworks on sales
                  automation, AI personalization, and revenue operations.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </section>

        <div className="max-w-6xl mx-auto px-6 pb-20 sm:pb-32">
          {wpLoading && currentPage === 1 && (
            <Section className="mb-16">
              <FeaturedSkeleton />
            </Section>
          )}

          {!wpLoading && featuredWhitepaper && (
            <Section className="mb-16">
              <FeaturedWhitepaperCard
                paper={featuredWhitepaper}
                onDownload={handleDownloadClick}
              />
            </Section>
          )}

          <Section className="mb-16">
            <div className="mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-white">
                {currentPage === 1
                  ? "All Resources"
                  : `Resources — Page ${currentPage}`}
              </h2>
            </div>

            {wpLoading && (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {Array.from({ length: 6 }).map((_, i) => (
                  <SkeletonCard key={i} />
                ))}
              </div>
            )}

            {!wpLoading && wpError && (
              <div className="text-center py-20">
                <div className="w-16 h-16 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mx-auto mb-6">
                  <FileText className="w-8 h-8 text-red-400" />
                </div>
                <p className="text-zinc-400 text-lg mb-2">
                  Unable to load whitepapers right now.
                </p>
                <p className="text-zinc-500 text-sm">
                  Please check back later or refresh the page.
                </p>
              </div>
            )}

            {!wpLoading && !wpError && !hasWhitepapers && (
              <div className="text-center py-20">
                <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/[0.08] flex items-center justify-center mx-auto mb-6">
                  <FileText className="w-8 h-8 text-zinc-500" />
                </div>
                <p className="text-zinc-400 text-lg mb-2">
                  No whitepapers available yet.
                </p>
                <p className="text-zinc-500 text-sm">
                  We're preparing valuable resources — check back soon!
                </p>
              </div>
            )}

            {!wpLoading && !wpError && gridWhitepapers.length > 0 && (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {gridWhitepapers.map((paper) => (
                  <WhitepaperCard
                    key={paper.id || paper.slug}
                    paper={paper}
                    onDownload={handleDownloadClick}
                  />
                ))}
              </div>
            )}
          </Section>

          {!wpLoading && totalPages > 1 && (
            <div className="flex items-center justify-center gap-4 mb-20">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage <= 1}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/5 border border-white/[0.08] text-zinc-300 font-medium text-sm hover:bg-white/10 hover:border-white/[0.15] transition-all disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <ArrowLeft className="w-4 h-4" />
                Previous
              </button>
              <span className="text-sm text-zinc-500 font-medium px-3">
                Page <span className="text-white">{currentPage}</span> of{" "}
                <span className="text-white">{totalPages}</span>
              </span>
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage >= totalPages}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/5 border border-white/[0.08] text-zinc-300 font-medium text-sm hover:bg-white/10 hover:border-white/[0.15] transition-all disabled:opacity-30 disabled:cursor-not-allowed"
              >
                Next
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

          <NewsletterSection />

          <Section className="border-t border-white/[0.06] pt-20">
            <div className="flex justify-between items-center mb-10">
              <h2 className="text-2xl md:text-3xl font-bold text-white">
                Trending on the Blog
              </h2>
              <Link
                to="/blogs"
                className="hidden md:inline-flex items-center font-semibold hover:underline"
                style={{ color: accentColor }}
              >
                View all articles <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </div>

            {blogError ? (
              <p className="text-center text-sm text-zinc-500">
                Unable to load trending articles right now.
              </p>
            ) : (
              <>
                <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
                  {(blogLoading
                    ? Array.from({ length: 3 })
                    : trendingPosts
                  ).map((post, index) => (
                    <div key={post?.id || post?.slug || index}>
                      {blogLoading ? (
                        <SkeletonCard />
                      ) : (
                        <BlogCard post={post} />
                      )}
                    </div>
                  ))}
                </div>
                <div className="mt-8 text-center md:hidden">
                  <Link
                    to="/blogs"
                    className="inline-flex items-center font-semibold hover:underline"
                    style={{ color: accentColor }}
                  >
                    View all articles <ArrowRight className="w-4 h-4 ml-1" />
                  </Link>
                </div>
              </>
            )}
          </Section>
        </div>
      </main>
    </div>
  );
}
