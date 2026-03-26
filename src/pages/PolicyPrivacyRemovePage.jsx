import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ShieldCheck,
  ArrowRight,
  AtSign,
  CheckCircle2,
  Lock,
  Eye,
  FileText,
} from "lucide-react";

const PolicyPrivacyRemovePage = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="relative">
      {/* Ambient background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/3 w-[500px] h-[500px] bg-indigo-500/[0.06] rounded-full blur-[150px]" />
        <div className="absolute top-1/2 right-1/3 w-[400px] h-[400px] bg-purple-500/[0.04] rounded-full blur-[120px]" />
      </div>

      {/* Hero + Content Section */}
      <section className="relative pt-8 pb-24 px-6">
        <div className="max-w-5xl mx-auto">
          {/* Badge */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#09090B]/60 border border-white/[0.08] mb-8">
              <ShieldCheck className="w-3.5 h-3.5 text-indigo-400" />
              <span className="text-[11px] font-medium uppercase tracking-widest text-zinc-400">
                Privacy & Data Protection
              </span>
            </div>
            <h1
              className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.1] mb-6"
              style={{
                background:
                  "linear-gradient(120deg, #787ff6 20%, #ffffff 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              We Respect Your Privacy
            </h1>
            <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed">
              Exercise your data rights under CCPA, GDPR, and other privacy
              regulations.
            </p>
          </div>

          {/* Two-column layout */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
            {/* Left column - Explanation */}
            <div className="lg:col-span-2 flex flex-col">
              <div className="space-y-6">
                <p className="text-zinc-400 leading-relaxed">
                  Under the CCPA, California residents have the right to opt out
                  of "sales" of their business information. Similarly, under the
                  GDPR (and other European data protection laws), individuals in
                  the EEA, the UK, and Switzerland have the right to object to
                  our processing of their business data.
                </p>
                <p className="text-zinc-400 leading-relaxed">
                  You may exercise those rights by filling out the form on this
                  page. We will honor your request by removing your profile from
                  our services, and we will retain the email address you enter
                  solely for purposes of storing and respecting your opt-out
                  preference.
                </p>
              </div>

              {/* Trust indicators */}
              <div className="mt-10 space-y-4">
                {[
                  {
                    icon: Lock,
                    title: "Encrypted & Secure",
                    desc: "Your data is transmitted securely",
                  },
                  {
                    icon: Eye,
                    title: "Transparent Process",
                    desc: "We only use your email to process opt-out",
                  },
                  {
                    icon: FileText,
                    title: "Regulatory Compliant",
                    desc: "CCPA, GDPR, and UK-GDPR compliant",
                  },
                ].map((item) => (
                  <div key={item.title} className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-lg bg-white/[0.03] border border-white/[0.08] flex items-center justify-center shrink-0 mt-0.5">
                      <item.icon className="w-4 h-4 text-indigo-400" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-zinc-300">
                        {item.title}
                      </p>
                      <p className="text-xs text-zinc-500">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Links */}
              <div className="mt-10 p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                <p className="text-sm text-zinc-400 leading-relaxed">
                  Learn more about how we handle your data in our{" "}
                  <Link
                    to="/privacy"
                    className="text-indigo-400 hover:text-indigo-300 underline underline-offset-2 transition-colors"
                  >
                    Privacy Policy
                  </Link>{" "}
                  or{" "}
                  <Link
                    to="/contact-us"
                    className="text-indigo-400 hover:text-indigo-300 underline underline-offset-2 transition-colors"
                  >
                    contact us
                  </Link>{" "}
                  for questions.
                </p>
              </div>
            </div>

            {/* Right column - Form */}
            <div className="lg:col-span-3">
              <div className="rounded-2xl bg-[#0A0A0C] border border-white/[0.08] p-8 md:p-10 shadow-[inset_0_1px_0_rgba(255,255,255,0.03),0_20px_40px_rgba(0,0,0,0.4)]">
                {submitted ? (
                  <div className="flex flex-col items-center justify-center py-16 text-center">
                    <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-6">
                      <CheckCircle2 className="w-8 h-8 text-emerald-400" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-3">
                      Verification sent!
                    </h3>
                    <p className="text-zinc-400 max-w-sm">
                      We've sent a verification email to{" "}
                      <span className="text-zinc-300 font-medium">{email}</span>
                      . Please check your inbox to complete the removal process.
                    </p>
                    <button
                      onClick={() => {
                        setSubmitted(false);
                        setEmail("");
                      }}
                      className="mt-8 px-6 py-2.5 rounded-xl text-sm font-medium text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 hover:bg-indigo-500/20 transition-all"
                    >
                      Submit another request
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="mb-8">
                      <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight mb-3">
                        Request Data Removal
                      </h2>
                      <p className="text-sm text-zinc-500 leading-relaxed">
                        Enter your business email address below. We'll send you
                        a verification email to confirm and process your opt-out
                        request.
                      </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-zinc-300 mb-2">
                          Work email
                        </label>
                        <div className="relative">
                          <AtSign className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600" />
                          <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            placeholder="you@company.com"
                            className="w-full pl-10 pr-4 py-3.5 rounded-xl bg-white/[0.03] border border-white/[0.08] text-white text-sm placeholder:text-zinc-600 focus:outline-none focus:border-indigo-500/40 focus:ring-1 focus:ring-indigo-500/20 transition-all"
                          />
                        </div>
                      </div>

                      <button
                        type="submit"
                        className="w-full group relative inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 via-violet-600 to-indigo-600 text-white font-bold tracking-wide shadow-[0_0_25px_rgba(99,102,241,0.4),inset_0_1px_0_rgba(255,255,255,0.2)] border border-indigo-400/20 hover:shadow-[0_0_40px_rgba(139,92,246,0.5)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
                      >
                        Get verification email
                        <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                      </button>

                      <p className="text-xs text-zinc-600 text-center leading-relaxed">
                        By submitting this form, you confirm that you are the
                        owner of the email address provided. We will only use
                        this information to process your opt-out request.
                      </p>
                    </form>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PolicyPrivacyRemovePage;
