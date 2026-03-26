import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import ComplianceBadges from "./ComplianceBadges";
import { fetchCaseStudies } from "../lib/queryClient";

export default function Footer() {
  const { data: caseStudiesData, isLoading: caseStudiesLoading } = useQuery({
    queryKey: ["case-studies-nav"],
    queryFn: () => fetchCaseStudies(1, 4),
    staleTime: 1000 * 60 * 30,
    gcTime: 1000 * 60 * 60,
  });
  const caseStudies = caseStudiesData?.entries?.slice(0, 4) || [];

  return (
    <footer className="bg-[#020203] border-t border-white/[0.05] w-full">
      <div className="max-w-7xl mx-auto px-6 pt-20 pb-16 flex flex-col md:flex-row gap-4 md:gap-8">
        <div className="flex flex-col md:flex-row gap-4 md:gap-8 ">
          <div className=" flex flex-col items-start justify-between p-4">
            <div className="w-full  flex flex-col space-y-4 ">
              <img
                src="https://cdn.brandfetch.io/nexuscale.ai/w/512/h/512"
                alt="Nexuscale"
                className="w-28 h-28 md:w-36 md:h-36 rounded-full mb-6"
              />
              <div className="space-y-3">
                <div className="space-y-3 text-xs text-zinc-500">
                  <p className="font-semibold text-zinc-400">
                    Nexuscale © {new Date().getFullYear()}
                  </p>
                  <div className="flex flex-wrap gap-x-4 gap-y-2">
                    <Link
                      to="/privacy"
                      className="hover:text-white transition-colors"
                    >
                      Privacy Policy
                    </Link>
                    <Link
                      to="/terms"
                      className="hover:text-white transition-colors"
                    >
                      Terms
                    </Link>
                  </div>
                  <ComplianceBadges />
                </div>
                <div className="flex items-center gap-2 text-xs font-medium text-emerald-500">
                  <div className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </div>
                  <p className="text-xs">All Systems Operational</p>
                </div>
                <a
                  href="https://www.linkedin.com/company/nexuscaleai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-xs text-zinc-500 hover:text-white transition-colors mt-2"
                >
                  <img
                    src="/svg/linkedin-svgrepo-com.svg"
                    alt="LinkedIn"
                    className="w-4 h-4"
                  />
                  Follow us on LinkedIn
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full flex flex-col">
          <div className=" grid grid-cols-1  md:grid-cols-1  lg:grid-cols-3 gap-x-8 gap-y-12">
            <div>
              <h4 className="font-semibold text-white mb-5 text-sm">
                Get started
              </h4>
              <ul className="space-y-3 text-sm text-zinc-400">
                <li>
                  <a
                    href="https://app.nexuscale.ai/users/register"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors"
                  >
                    Sign up for free
                  </a>
                </li>
                <li>
                  <Link
                    to="/pricing"
                    className="hover:text-white transition-colors"
                  >
                    Pricing
                  </Link>
                </li>
                <li>
                  <a
                    href="https://cal.com/kevin-nexuscale/15min"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors"
                  >
                    Request a demo
                  </a>
                </li>
                <li>
                  <Link
                    to="/affiliates"
                    className="hover:text-white transition-colors"
                  >
                    Affiliates
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-5 text-sm">
                Solutions
              </h4>
              <ul className="space-y-3 text-sm text-zinc-400">
                <li>
                  <Link
                    to="/lead-search"
                    className="hover:text-white transition-colors"
                  >
                    Lead Search and Database
                  </Link>
                </li>
                <li>
                  <Link
                    to="/agentic-outreach"
                    className="hover:text-white transition-colors"
                  >
                    Agentic Outreach
                  </Link>
                </li>
                <li>
                  <Link
                    to="/email-personalisation"
                    className="hover:text-white transition-colors"
                  >
                    Email Personalization
                  </Link>
                </li>
                <li>
                  <Link
                    to="/lead-scoring"
                    className="hover:text-white transition-colors"
                  >
                    Lead & Match Scoring
                  </Link>
                </li>
                <li>
                  <Link
                    to="/linkedin-outreach"
                    className="hover:text-white transition-colors"
                  >
                    LinkedIn Outreach
                  </Link>
                </li>
                <li>
                  <Link
                    to="/multi-language"
                    className="hover:text-white transition-colors"
                  >
                    Multi-Language Support
                  </Link>
                </li>
                <li>
                  <Link
                    to="/email-deliverability"
                    className="hover:text-white transition-colors"
                  >
                    Email Deliverability
                  </Link>
                </li>
                <li>
                  <Link
                    to="/sending-engine"
                    className="hover:text-white transition-colors"
                  >
                    Sending Engine
                  </Link>
                </li>
              </ul>
            </div>
            <div className="">
              <h4 className="font-semibold text-white mb-5 text-sm">
                Use Cases
              </h4>
              <ul className="space-y-3 text-sm text-zinc-400">
                <li>
                  <Link
                    to="/agencies"
                    className="hover:text-white transition-colors"
                  >
                    Agencies
                  </Link>
                </li>
                <li>
                  <Link
                    to="/sales-teams"
                    className="hover:text-white transition-colors"
                  >
                    Sales Team
                  </Link>
                </li>
                <li>
                  <Link
                    to="/founders"
                    className="hover:text-white transition-colors"
                  >
                    Founders
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3  gap-x-8 gap-y-12 mt-12 w-full">
            <div>
              <h4 className="font-semibold text-white mb-5 text-sm">
                Resources
              </h4>
              <ul className="space-y-3 text-sm text-zinc-400">
                <li>
                  <a
                    href="https://app.nexuscale.ai/university"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors"
                  >
                    Nexuscale Academy ↗
                  </a>
                </li>
                <li>
                  <Link
                    to="/blogs"
                    className="hover:text-white transition-colors"
                  >
                    Blogs
                  </Link>
                </li>

                <li>
                  <Link
                    to="/case-studies"
                    className="hover:text-white transition-colors"
                  >
                    Success Stories
                  </Link>
                </li>
                <li>
                  <Link
                    to="/privacy"
                    className="hover:text-white transition-colors"
                  >
                    Privacy Center
                  </Link>
                </li>
                <li>
                  <Link
                    to="/resources/start-up"
                    className="hover:text-white transition-colors"
                  >
                    Join our start-up program
                  </Link>
                </li>
              </ul>
            </div>

            <div className="flex flex-col space-y-3">
              <div>
                <h4 className="font-semibold text-white mb-5 text-sm">
                  Company
                </h4>
                <ul className="space-y-3 text-sm text-zinc-400">
                  <li>
                    <Link
                      to="/doctrine"
                      className="hover:text-white transition-colors"
                    >
                      About Nexuscale
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/learn-about-our-AI"
                      className="hover:text-white transition-colors"
                    >
                      Hey AI, learn about us
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-white mb-5 text-sm">
                  Looking for Help?
                </h4>
                <ul className="space-y-3 text-sm text-zinc-400">
                  <li>
                    <a
                      href="https://intercom.help/nexuscale-ai/en/collections/16724635-general"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-white transition-colors"
                    >
                      Helpdesk
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="">
              <h4 className="font-semibold text-white mb-5 text-sm">
                Ask AI about Nexuscale
              </h4>
              <div className="flex items-center gap-1 mb-8">
                <a
                  href="https://chatgpt.com/?q=I’m+researching+revenue+platforms+and+want+to+know+how+nexuscale.ai+combines+verified+data%2C+AI+prospecting%2C+and+multi-channel+engagement+to+drive+more+revenue.+Summarize+the+highlights+from+Nexuscale’s+website%3A+https%3A%2F%2Fnexuscale.ai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full bg-black/70 flex items-center justify-center hover:bg-black/70 transition-colors"
                  title="Ask ChatGPT about Nexuscale"
                >
                  <img
                    src="/svg/chatgpt.png"
                    alt="ChatGPT"
                    className="w-8 h-8 rounded-full"
                  />
                </a>
                <a
                  href="https://claude.ai/new?q=I’m+researching+revenue+platforms+and+want+to+know+how+nexuscale.ai+combines+verified+data%2C+AI+prospecting%2C+and+multi-channel+engagement+to+drive+more+revenue.+Summarize+the+highlights+from+Nexuscale’s+website%3A+https%3A%2F%2Fnexuscale.ai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full bg-black/70 flex items-center justify-center hover:bg-black/70 transition-colors"
                  title="Ask Claude about Nexuscale"
                >
                  <img
                    src="/svg/claude.png"
                    alt="Claude"
                    className="w-8 h-8 rounded-full"
                  />
                </a>
                <a
                  href="https://www.perplexity.ai/search?q=I’m+researching+revenue+platforms+and+want+to+know+how+nexuscale.ai+combines+verified+data%2C+AI+prospecting%2C+and+multi-channel+engagement+to+drive+more+revenue.+Summarize+the+highlights+from+Nexuscale’s+website%3A+https%3A%2F%2Fnexuscale.ai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full bg-black/70 flex items-center justify-center hover:bg-black/70 transition-colors"
                  title="Ask Perplexity about Nexuscale"
                >
                  <img
                    src="/svg/perplexity.png"
                    alt="Perplexity"
                    className="w-8 h-8 rounded-full"
                  />
                </a>
                <a
                  href="https://x.com/i/grok?text=I’m+researching+revenue+platforms+and+want+to+know+how+nexuscale.ai+combines+verified+data%2C+AI+prospecting%2C+and+multi-channel+engagement+to+drive+more+revenue.+Summarize+the+highlights+from+Nexuscale’s+website%3A+https%3A%2F%2Fnexuscale.ai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full bg-black/70 flex items-center justify-center hover:bg-black/70 transition-colors"
                  title="Ask Grok about Nexuscale"
                >
                  <img
                    src="/svg/grok.jpeg"
                    alt="Grok"
                    className="w-12 h-12 rounded-full "
                  />
                </a>
                <a
                  href="https://gemini.google.com/app?query=I’m+researching+revenue+platforms+and+want+to+know+how+nexuscale.ai+combines+verified+data%2C+AI+prospecting%2C+and+multi-channel+engagement+to+drive+more+revenue.+Summarize+the+highlights+from+Nexuscale’s+website%3A+https%3A%2F%2Fnexuscale.ai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full bg-black/70 flex items-center justify-center hover:bg-black/70 transition-colors"
                  title="Ask Gemini about Nexuscale"
                >
                  <img
                    src="/svg/gemini.png"
                    alt="Gemini"
                    className="w-8 h-8 rounded-full"
                  />
                </a>
              </div>

              <h4 className="font-semibold text-white mb-3 text-sm">
                Scale anywhere
              </h4>
              <p className="text-xs text-zinc-500 leading-relaxed mb-5 max-w-xs">
                Get AI-powered infrastructure and instantly scale your
                applications while working in your favorite tools.
              </p>
              <a
                href="https://cal.com/kevin-nexuscale/15min"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-5 py-2.5 text-sm font-medium text-white border border-white/20 rounded-lg hover:bg-white/5 transition-colors"
              >
                Book a Demo
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
