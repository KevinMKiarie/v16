import { useState } from "react";
import { Link } from "react-router-dom";
import {
  MessageCircle,
  Mail,
  Headphones,
  Building2,
  ArrowRight,
  Send,
  User,
  AtSign,
  Phone,
  FileText,
  CheckCircle2,
} from "lucide-react";

const contactCards = [
  {
    icon: Headphones,
    title: "Support",
    description:
      "Get help with technical issues, account questions, or troubleshooting.",
    action: "Contact support",
    href: "mailto:support@nexuscale.io",
    color: "indigo",
  },
  {
    icon: Building2,
    title: "Sales",
    description:
      "Talk to our sales team about enterprise plans and custom solutions.",
    action: "Talk to sales",
    href: "mailto:sales@nexuscale.io",
    color: "purple",
  },
  {
    icon: Mail,
    title: "Press",
    description:
      "Media inquiries, partnership opportunities, and press resources.",
    action: "press@nexuscale.io",
    href: "mailto:press@nexuscale.io",
    color: "cyan",
  },
  {
    icon: MessageCircle,
    title: "General",
    description:
      "Have a question that doesn't fit the above? Reach out to our team.",
    action: "Send a message",
    href: "#contact-form",
    color: "emerald",
  },
];

const iconColorMap = {
  indigo: "text-indigo-400 bg-indigo-500/10 border-indigo-500/20",
  purple: "text-purple-400 bg-purple-500/10 border-purple-500/20",
  cyan: "text-cyan-400 bg-cyan-500/10 border-cyan-500/20",
  emerald: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
};

function ContactPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="relative">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-indigo-500/[0.07] rounded-full blur-[150px]" />
        <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-purple-500/[0.05] rounded-full blur-[120px]" />
      </div>

      <section className="relative pt-8 pb-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#09090B]/60 border border-white/[0.08] mb-8">
            <div className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </div>
            <span className="text-[11px] font-medium uppercase tracking-widest text-zinc-400">
              We're here to help
            </span>
          </div>
          <h1
            className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.1] mb-6"
            style={{
              background: "linear-gradient(120deg, #787ff6 20%, #ffffff 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Get in Touch
          </h1>
          <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed">
            For general inquiries or questions to specific departments, please
            use one of the following options.
          </p>
        </div>
      </section>

      <section className="relative px-6 pb-24">
        <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {contactCards.map((card) => {
            const Icon = card.icon;
            return (
              <a
                key={card.title}
                href={card.href}
                className="group relative rounded-2xl bg-[#09090B]/60 border border-white/[0.08] p-6 backdrop-blur-sm transition-all duration-300 hover:border-white/[0.15] hover:shadow-[0_0_30px_-10px_rgba(99,102,241,0.12)] hover:scale-[1.02]"
              >
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center border mb-5 transition-all duration-300 group-hover:scale-110 ${iconColorMap[card.color]}`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2 tracking-tight">
                  {card.title}
                </h3>
                <p className="text-sm text-zinc-500 leading-relaxed mb-5">
                  {card.description}
                </p>
                <span className="inline-flex items-center gap-1.5 text-sm font-medium text-indigo-400 group-hover:text-indigo-300 transition-colors">
                  {card.action}
                  <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </a>
            );
          })}
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-6">
        <div className="border-t border-white/[0.06]" />
      </div>

      <section id="contact-form" className="relative px-6 py-24">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
            <div className="lg:col-span-2 flex flex-col justify-center">
              <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-4">
                Send us a message
              </h2>
              <p className="text-zinc-400 leading-relaxed mb-8">
                Fill out the form and our team will get back to you within 24
                hours. We'd love to hear from you.
              </p>
              <div className="space-y-5">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-white/[0.03] border border-white/[0.08] flex items-center justify-center">
                    <Mail className="w-4 h-4 text-indigo-400" />
                  </div>
                  <div>
                    <p className="text-xs text-zinc-500 font-medium uppercase tracking-wider">
                      Email
                    </p>
                    <p className="text-sm text-zinc-300">
                      hello@nexuscale.io
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-white/[0.03] border border-white/[0.08] flex items-center justify-center">
                    <Headphones className="w-4 h-4 text-indigo-400" />
                  </div>
                  <div>
                    <p className="text-xs text-zinc-500 font-medium uppercase tracking-wider">
                      Support hours
                    </p>
                    <p className="text-sm text-zinc-300">
                      Mon - Fri, 9am - 6pm EST
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-10 p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                <p className="text-sm text-zinc-400 leading-relaxed">
                  Want to be removed from our database?{" "}
                  <Link
                    to="/privacy-policy/remove"
                    className="text-indigo-400 hover:text-indigo-300 underline underline-offset-2 transition-colors"
                  >
                    Submit a removal request
                  </Link>{" "}
                  or visit our{" "}
                  <Link
                    to="/privacy"
                    className="text-indigo-400 hover:text-indigo-300 underline underline-offset-2 transition-colors"
                  >
                    Privacy Center
                  </Link>
                  .
                </p>
              </div>
            </div>

            <div className="lg:col-span-3">
              <div className="rounded-2xl bg-[#0A0A0C] border border-white/[0.08] p-8 md:p-10 shadow-[inset_0_1px_0_rgba(255,255,255,0.03),0_20px_40px_rgba(0,0,0,0.4)]">
                {submitted ? (
                  <div className="flex flex-col items-center justify-center py-16 text-center">
                    <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-6">
                      <CheckCircle2 className="w-8 h-8 text-emerald-400" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-3">
                      Message sent!
                    </h3>
                    <p className="text-zinc-400 max-w-sm">
                      Thank you for reaching out. Our team will get back to you
                      within 24 hours.
                    </p>
                    <button
                      onClick={() => {
                        setSubmitted(false);
                        setFormData({
                          firstName: "",
                          lastName: "",
                          email: "",
                          phone: "",
                          subject: "",
                          message: "",
                        });
                      }}
                      className="mt-8 px-6 py-2.5 rounded-xl text-sm font-medium text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 hover:bg-indigo-500/20 transition-all"
                    >
                      Send another message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-medium text-zinc-300 mb-2">
                          First name
                        </label>
                        <div className="relative">
                          <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600" />
                          <input
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            required
                            placeholder="John"
                            className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.08] text-white text-sm placeholder:text-zinc-600 focus:outline-none focus:border-indigo-500/40 focus:ring-1 focus:ring-indigo-500/20 transition-all"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-zinc-300 mb-2">
                          Last name
                        </label>
                        <div className="relative">
                          <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600" />
                          <input
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            required
                            placeholder="Doe"
                            className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.08] text-white text-sm placeholder:text-zinc-600 focus:outline-none focus:border-indigo-500/40 focus:ring-1 focus:ring-indigo-500/20 transition-all"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-medium text-zinc-300 mb-2">
                          Work email
                        </label>
                        <div className="relative">
                          <AtSign className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600" />
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            placeholder="john@company.com"
                            className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.08] text-white text-sm placeholder:text-zinc-600 focus:outline-none focus:border-indigo-500/40 focus:ring-1 focus:ring-indigo-500/20 transition-all"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-zinc-300 mb-2">
                          Phone{" "}
                          <span className="text-zinc-600">(optional)</span>
                        </label>
                        <div className="relative">
                          <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600" />
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="+1 (555) 000-0000"
                            className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.08] text-white text-sm placeholder:text-zinc-600 focus:outline-none focus:border-indigo-500/40 focus:ring-1 focus:ring-indigo-500/20 transition-all"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Subject */}
                    <div>
                      <label className="block text-sm font-medium text-zinc-300 mb-2">
                        Subject
                      </label>
                      <div className="relative">
                        <FileText className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600" />
                        <input
                          type="text"
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          required
                          placeholder="How can we help?"
                          className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.08] text-white text-sm placeholder:text-zinc-600 focus:outline-none focus:border-indigo-500/40 focus:ring-1 focus:ring-indigo-500/20 transition-all"
                        />
                      </div>
                    </div>

                    {/* Message */}
                    <div>
                      <label className="block text-sm font-medium text-zinc-300 mb-2">
                        Message
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={5}
                        placeholder="Tell us more about your inquiry..."
                        className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.08] text-white text-sm placeholder:text-zinc-600 focus:outline-none focus:border-indigo-500/40 focus:ring-1 focus:ring-indigo-500/20 transition-all resize-none"
                      />
                    </div>

                    {/* Submit */}
                    <button
                      type="submit"
                      className="w-full group relative inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 via-violet-600 to-indigo-600 text-white font-bold tracking-wide shadow-[0_0_25px_rgba(99,102,241,0.4),inset_0_1px_0_rgba(255,255,255,0.2)] border border-indigo-400/20 hover:shadow-[0_0_40px_rgba(139,92,246,0.5)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
                    >
                      <Send className="w-4 h-4" />
                      Send message
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ContactPage;
