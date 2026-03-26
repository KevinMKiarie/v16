import React, { useState } from "react";
import { sendStartupProgramRequest } from "../lib/queryClient";
import { motion, AnimatePresence } from "framer-motion";
import {
  Rocket,
  CheckCircle2,
  ArrowRight,
  Building2,
  Mail,
  Link as LinkIcon,
  Layers,
  CreditCard,
  BadgeCheck,
  Star,
  Check,
  Server,
  Lock,
  Zap,
} from "lucide-react";

const ScrollReveal = ({ children, delay = 0, className = "" }) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: delay / 1000 }}
    className={className}
  >
    {children}
  </motion.div>
);

export default function StartupProgramPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [formData, setFormData] = useState({
    companyInfo: "",
    workEmail: "",
    proofLink: "",
    outboundStack: "",
    agreedToTerms: false,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.agreedToTerms) return;

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      await sendStartupProgramRequest(formData);
      setIsSubmitted(true);
    } catch (err) {
      setSubmitError(err.message || "Submission failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  console.log(handleSubmit);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  return (
    <div
      className="min-h-screen bg-[#020204] font-sans selection:bg-indigo-500/30 text-zinc-200 flex flex-col lg:flex-row relative overflow-hidden"
    >
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none z-[100]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="w-full lg:w-[45%] p-8 md:p-16 lg:p-20 xl:p-24 flex flex-col justify-center relative z-10 border-r border-white/5">
        {/* Ambient Glows */}
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-indigo-500/10 blur-[150px] rounded-full pointer-events-none -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-purple-500/10 blur-[120px] rounded-full pointer-events-none translate-x-1/3 translate-y-1/3" />

        <div className="relative z-10 max-w-2xl mx-auto lg:mx-0 w-full">
          <ScrollReveal delay={100}>
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-900/80 border border-white/5 text-[10px] font-medium uppercase tracking-widest text-zinc-300 mb-8 cursor-default">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
              Exclusive Startup Grant
            </div>

            <div className="w-full">
              {/* Headline */}
              <h1 className="text-5xl md:text-7xl lg:text-7xl font-medium text-white mb-6 tracking-tighter leading-[0.95]">
                Accelerate your <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-b from-indigo-300 via-indigo-400 to-purple-500">
                  growth engine.
                </span>
              </h1>

              <p className="text-lg md:text-xl text-zinc-400 mb-12 leading-relaxed font-light">
                We are investing in the next generation of category leaders.
                Claim{" "}
                <span className="text-white font-medium">
                  $1,000 in software credits
                </span>{" "}
                to build your ultimate outbound stack.
              </p>

              <div className="space-y-6">
                {/* Eligibility Card */}
                <div className="glass-card rounded-3xl p-6 group hover:border-white/10 hover:bg-zinc-900/40 transition-all duration-500">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-zinc-900 flex items-center justify-center shrink-0 border border-white/5 text-white group-hover:scale-110 transition-transform duration-500">
                      <BadgeCheck size={20} className="text-emerald-400" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-white tracking-wide mb-1.5">
                        Who is eligible?
                      </h3>
                      <p className="text-sm text-zinc-400 leading-relaxed">
                        Startups with a minimum of{" "}
                        <span className="text-white font-medium">
                          $100k in funding
                        </span>{" "}
                        OR backed by a top accelerator (e.g., YC, Techstars, 500
                        Startups).
                      </p>
                    </div>
                  </div>
                </div>

                {/* The Rules Card */}
               
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>

      {/* --- RIGHT COLUMN: THE APPLICATION FORM --- */}
      <div className="w-full lg:w-[55%] relative flex items-center justify-center p-6 md:p-12 lg:p-20 z-10">
        {/* Major ambient light behind the form */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] max-w-[600px] max-h-[600px] bg-indigo-600/10 blur-[120px] rounded-full pointer-events-none" />

        <div className="w-full max-w-lg relative z-20">
          <ScrollReveal delay={300}>
            {/* The Glassmorphic Form Container */}
            <div className="bg-zinc-900/40 backdrop-blur-2xl border border-white/10 shadow-2xl shadow-black/80 rounded-[2.5rem] p-8 md:p-10 relative overflow-hidden">
              {/* Top border highlight */}
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

              <AnimatePresence mode="wait">
                {!isSubmitted ? (
                  <motion.div
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, scale: 0.98, filter: "blur(4px)" }}
                    transition={{ duration: 0.4 }}
                  >
                    <div className="mb-8 text-center sm:text-left">
                      <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight mb-2">
                        Apply for the Grant
                      </h2>
                      <p className="text-sm text-zinc-400 font-light">
                        Applications are evaluated daily. Access granted within
                        24 hours.
                      </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                      <div className="space-y-1.5 group">
                        <label className="text-[11px] font-bold text-zinc-400 uppercase tracking-widest ml-1 transition-colors group-focus-within:text-indigo-400">
                          Company Name & Website{" "}
                          <span className="text-rose-500">*</span>
                        </label>
                        <div className="relative">
                          <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 group-focus-within:text-indigo-400 transition-colors" />
                          <input
                            type="text"
                            name="companyInfo"
                            required
                            placeholder="nexuscale (nexuscale.ai)"
                            className="premium-input"
                            value={formData.companyInfo}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>

                      {/* Field 2: Work Email */}
                      <div className="space-y-1.5 group">
                        <label className="text-[11px] font-bold text-zinc-400 uppercase tracking-widest ml-1 transition-colors group-focus-within:text-indigo-400">
                          Work Email <span className="text-rose-500">*</span>
                        </label>
                        <div className="relative">
                          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 group-focus-within:text-indigo-400 transition-colors" />
                          <input
                            type="email"
                            name="workEmail"
                            required
                            placeholder="founder@nexuscale.ai"
                            className="premium-input"
                            value={formData.workEmail}
                            onChange={handleInputChange}
                          />
                        </div>
                        <p className="text-[10px] text-zinc-500 ml-1 font-medium">
                          Must match the company domain.
                        </p>
                      </div>

                      {/* Field 3: Proof */}
                      <div className="space-y-1.5 group">
                        <label className="text-[11px] font-bold text-zinc-400 uppercase tracking-widest ml-1 transition-colors group-focus-within:text-indigo-400">
                          Proof of Qualification{" "}
                          <span className="text-rose-500">*</span>
                        </label>
                        <div className="relative">
                          <LinkIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 group-focus-within:text-indigo-400 transition-colors" />
                          <input
                            type="url"
                            name="proofLink"
                            required
                            placeholder="Crunchbase link or accelerator profile"
                            className="premium-input"
                            value={formData.proofLink}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>

                      {/* Field 4: Stack */}
                      <div className="space-y-1.5 group">
                        <label className="text-[11px] font-bold text-zinc-400 uppercase tracking-widest ml-1 transition-colors group-focus-within:text-indigo-400">
                          Current Outbound Stack?{" "}
                          <span className="text-rose-500">*</span>
                        </label>
                        <div className="relative">
                          <Layers className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 group-focus-within:text-indigo-400 transition-colors" />
                          <input
                            type="text"
                            name="outboundStack"
                            required
                            placeholder="e.g., Apollo, Lemlist, Smartlead"
                            className="premium-input"
                            value={formData.outboundStack}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>

                      {/* Field 5: Checkbox */}
                      <div className="pt-4 pb-2">
                        <label className="flex items-start gap-3 cursor-pointer group/chk">
                          <div className="relative flex items-center justify-center mt-0.5 shrink-0">
                            <input
                              type="checkbox"
                              name="agreedToTerms"
                              required
                              checked={formData.agreedToTerms}
                              onChange={handleInputChange}
                              className="peer sr-only"
                            />
                            <div className="w-5 h-5 rounded border border-white/20 bg-black/50 peer-checked:bg-white peer-checked:border-white transition-all duration-300 shadow-inner group-hover/chk:border-white/40"></div>
                            <Check
                              className="absolute w-3 h-3 text-black opacity-0 peer-checked:opacity-100 transition-opacity duration-300"
                              strokeWidth={4}
                            />
                          </div>
                          <span className="text-xs text-zinc-400 leading-relaxed select-none">
                            <strong className="text-zinc-200">
                              Mandatory:
                            </strong>{" "}
                            In exchange for the $1,000 grant, I agree to let
                            Nexuscale feature our logo on their site and agree
                            to leave a G2 review after 30 days.
                          </span>
                        </label>
                      </div>

                      {/* Error Message */}
                      {submitError && (
                        <p className="text-sm text-rose-400 bg-rose-500/10 border border-rose-500/20 rounded-xl px-4 py-3">
                          {submitError}
                        </p>
                      )}

                      {/* Submit Button */}
                      <div className="pt-2">
                        <button
                          type="submit"
                          disabled={isSubmitting || !formData.agreedToTerms}
                          className={`relative w-full flex items-center justify-center gap-2 rounded-xl py-4 font-bold text-sm tracking-wide transition-all duration-300 overflow-hidden group
                            ${
                              isSubmitting || !formData.agreedToTerms
                                ? "bg-white/5 text-zinc-600 cursor-not-allowed border border-white/5"
                                : "bg-white text-black hover:bg-zinc-200 shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)] active:scale-[0.98]"
                            }`}
                        >
                          <span className="relative z-10">
                            {isSubmitting
                              ? "Submitting securely..."
                              : "Submit Application"}
                          </span>
                          {!isSubmitting && formData.agreedToTerms && (
                            <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform" />
                          )}
                          {!isSubmitting && formData.agreedToTerms && (
                            <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-black/10 to-transparent skew-x-12" />
                          )}
                        </button>
                      </div>
                    </form>
                  </motion.div>
                ) : (
                  // --- SUCCESS STATE ---
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95, filter: "blur(4px)" }}
                    animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                    transition={{ duration: 0.5, type: "spring", bounce: 0.4 }}
                    className="flex flex-col items-center justify-center text-center py-12"
                  >
                    <div className="w-24 h-24 rounded-full bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20 mb-8 relative">
                      <div className="absolute inset-0 bg-emerald-500/20 rounded-full blur-xl animate-pulse duration-1000" />
                      <CheckCircle2 className="w-12 h-12 text-emerald-400 relative z-10" />
                    </div>
                    <h2 className="text-3xl font-black text-white mb-4 tracking-tight">
                      Application Received
                    </h2>
                    <p className="text-base text-zinc-400 leading-relaxed max-w-sm mb-10">
                      Thank you for applying to the Nexuscale Startup Program.
                      Our team evaluates applications every 24 hours. Keep an
                      eye on{" "}
                      <strong className="text-white">
                        {formData.workEmail}
                      </strong>
                      .
                    </p>
                    <button
                      onClick={() => (window.location.href = "/")}
                      className="px-8 py-3.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-sm font-bold text-white transition-colors"
                    >
                      Return to Homepage
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Footer Trust Indicator */}
            <div className="text-center mt-8 opacity-60 hover:opacity-100 transition-opacity">
              <p className="text-[10px] font-medium text-zinc-500 uppercase tracking-widest flex items-center justify-center gap-2">
                <Lock className="w-3 h-3" /> Secure & Encrypted • 256-Bit SSL
              </p>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </div>
  );
}
