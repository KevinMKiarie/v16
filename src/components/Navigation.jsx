import { useState, useEffect } from "react";
import { ChevronDown, Menu, X, ChevronRight, TrendingUp } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { featuresList } from "../data/features";
import { useCasesList } from "../data/useCases";
import { demoList, resourcesList } from "../data/menuItems";
import { fetchCaseStudies } from "../lib/queryClient";

export default function Navigation({
  scrolled,
  isScrolling,
  mobileMenuOpen,
  setMobileMenuOpen,
  page,
  setPage,
  activeMenu,
  setActiveMenu,
  scrollProgress,
}) {
  const navigate = useNavigate();
  const [expandedMobileMenu, setExpandedMobileMenu] = useState(null);

  const { data: caseStudiesPreviewData, isLoading: caseStudiesLoading } =
    useQuery({
      queryKey: ["case-studies-nav"],
      queryFn: () => fetchCaseStudies(1, 4),
      staleTime: 1000 * 60 * 30,
      gcTime: 1000 * 60 * 60,
    });
  const caseStudiesPreview = caseStudiesPreviewData?.entries?.slice(0, 4) || [];

  const handleSetPage = (pageName) => {
    if (pageName === "home") {
      navigate("/");
    } else if (pageName === "pricing") {
      navigate("/pricing");
    } else {
      navigate(`/${pageName}`);
    }
    setPage(pageName);
  };

  const handleMobileSubmenuClick = (menuName) => {
    setExpandedMobileMenu(expandedMobileMenu === menuName ? null : menuName);
  };

  const handleMobileItemClick = (subItem) => {
    if (subItem.url) {
      if (subItem.external) {
        window.open(subItem.url, "_blank");
      } else {
        navigate(subItem.url);
      }
    } else if (subItem.id) {
      handleSetPage(subItem.id);
    } else if (subItem.action) {
      subItem.action();
    }
    setMobileMenuOpen(false);
    setExpandedMobileMenu(null);
  };

  const handleDropdownClick = (subItem) => {
    if (subItem.url) {
      if (subItem.external) {
        window.open(subItem.url, "_blank");
      } else {
        navigate(subItem.url);
      }
    } else if (subItem.id) {
      handleSetPage(subItem.id);
    } else if (subItem.action) {
      subItem.action();
    }
    setActiveMenu(null);
  };

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  return (
    <>
      <nav
        className="fixed top-10 left-0 right-0 transition-all duration-500 ease-out"
        style={{ zIndex: 99997 }}
      >
        <div
          className={`transition-all duration-500 ease-out mx-auto ${
            scrolled
              ? "mt-3 mx-4 md:mx-6 rounded-2xl bg-[#0a0a0f]/80 backdrop-blur-2xl border border-white/[0.06] shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
              : "mt-0 mx-0 rounded-none bg-transparent border-b border-white/[0.04]"
          }`}
          style={{
            maxWidth: scrolled ? "1200px" : "100%",
            margin: scrolled ? "12px auto" : "0 auto",
          }}
          onMouseLeave={() => setActiveMenu(null)}
        >
          <div
            className={`flex items-center justify-between transition-all duration-500 ${
              scrolled ? "px-5 md:px-6 h-14" : "px-6 md:px-10 h-[72px]"
            }`}
          >
            {/* Logo */}
            <button
              onClick={() => handleSetPage("home")}
              className="flex gap-2.5 items-center hover:opacity-80 transition-opacity cursor-pointer shrink-0"
            >
              <img
                src="https://cdn.brandfetch.io/nexuscale.ai/w/512/h/512"
                alt="Nexuscale"
                className={`rounded-full transition-all duration-500 ${scrolled ? "h-8 w-8" : "h-9 w-9"}`}
              />
              <div className="font-bold text-white text-sm tracking-wide">
                NEXUSCALE
              </div>
            </button>

            <div className="hidden md:flex items-center gap-1 text-[13.5px] font-medium text-zinc-400">
              <div
                className="relative"
                onMouseEnter={() => setActiveMenu("Features")}
              >
                <button
                  className={`flex items-center gap-1.5 transition-all duration-200 px-3 text-xs py-2 rounded-lg ${
                    activeMenu === "Features"
                      ? "text-white"
                      : "hover:text-white"
                  }`}
                >
                  Solutions
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-300 ${activeMenu === "Features" ? "rotate-180 text-indigo-400" : ""}`}
                  />
                </button>
              </div>

              {[ "Use Cases", "Resources"].map((item) => (
                <div
                  key={item}
                  className="relative"
                  onMouseEnter={() => setActiveMenu(item)}
                  onMouseLeave={() => setActiveMenu(null)}
                >
                  <button
                    className={`flex items-center text-xs gap-1 transition-all duration-200 px-3 py-2 rounded-lg ${
                      activeMenu === item ? "text-white" : "hover:text-white"
                    }`}
                  >
                    {item}
                    <ChevronDown
                      className={`w-3.5 h-3.5 transition-transform duration-300 ${activeMenu === item ? "rotate-180 text-indigo-400" : ""}`}
                    />
                  </button>
                  {activeMenu === item && (
                    <div
                      className="absolute top-full left-1/2 -translate-x-1/2 pt-2 w-72"
                      style={{ zIndex: 99999 }}
                    >
                      <div className="bg-[#0e0e12]/95 backdrop-blur-xl border border-white/[0.08] rounded-xl p-1.5 flex flex-col gap-0.5 animate-in fade-in slide-in-from-top-2 duration-200 shadow-[0_20px_60px_rgba(0,0,0,0.5)] text-xs">
                        {(item === "Solutions"
                          ? solutionsList
                          : item === "Use Cases"
                            ? useCasesList
                            : resourcesList
                        ).map((subItem, idx) => {
                          const Icon = subItem.icon;
                          return (
                            <button
                              key={idx}
                              onClick={() => handleDropdownClick(subItem)}
                              className="flex items-start gap-3 p-3 rounded-lg hover:bg-white/[0.06] transition-all duration-150 text-left group"
                            >
                              <div className="w-9 h-9 rounded-lg bg-white/[0.04] text-zinc-500 flex items-center justify-center shrink-0 group-hover:text-indigo-400 group-hover:bg-indigo-500/10 transition-colors border border-white/[0.06]">
                                {typeof Icon === "string" ? (
                                  <img src={Icon} alt="" className="w-4 h-4" />
                                ) : (
                                  <Icon className="w-4 h-4" />
                                )}
                              </div>
                              <div>
                                <div className="text-gray-200 font-semibold text-[13px] mb-0.5">
                                  {subItem.title}
                                </div>
                                <div className="text-[11px] text-zinc-500 leading-relaxed group-hover:text-zinc-400 transition-colors">
                                  {subItem.desc}
                                </div>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              ))}
              <div
                className="relative"
                onMouseEnter={() => setActiveMenu("Case Studies")}
                onMouseLeave={() => setActiveMenu(null)}
              >
                <button
                  className={`flex items-center gap-1.5 transition-all duration-200 px-3 text-xs py-2 rounded-lg ${
                    activeMenu === "Case Studies"
                      ? "text-white"
                      : "hover:text-white"
                  }`}
                >
                  Case Studies
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-300 ${activeMenu === "Case Studies" ? "rotate-180 text-indigo-400" : ""}`}
                  />
                </button>
                {activeMenu === "Case Studies" && (
                  <div
                    className="absolute top-full left-1/2 -translate-x-1/2 pt-3 w-80"
                    style={{ zIndex: 99999 }}
                  >
                    <div className="bg-[#0e0e12]/95 backdrop-blur-xl border border-white/[0.08] rounded-xl p-1.5 flex flex-col gap-0.5 animate-in fade-in slide-in-from-top-2 duration-200 shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
                      {caseStudiesLoading
                        ? Array.from({ length: 3 }).map((_, i) => (
                            <div
                              key={i}
                              className="flex items-start gap-3 p-3 rounded-lg animate-pulse"
                            >
                              <div className="w-9 h-9 rounded-lg bg-white/[0.04] shrink-0" />
                              <div className="flex-1 space-y-2 pt-1">
                                <div className="h-3 bg-zinc-800 rounded w-3/4" />
                                <div className="h-2.5 bg-zinc-800 rounded w-full" />
                              </div>
                            </div>
                          ))
                        : caseStudiesPreview.length > 0
                          ? caseStudiesPreview.map((study, idx) => {
                              const slug = study.slug || study.id || "";
                              const desc = (
                                study.description ||
                                study.excerpt ||
                                ""
                              )
                                .replace(/<[^>]+>/g, "")
                                .slice(0, 80);
                              return (
                                <button
                                  key={idx}
                                  onClick={() => {
                                    navigate(`/case-studies/${slug}`);
                                    setActiveMenu(null);
                                  }}
                                  className="flex items-start gap-3 p-3 rounded-lg hover:bg-white/[0.06] transition-all duration-150 text-left group"
                                >
                                  <div className="w-9 h-9 rounded-lg bg-white/[0.04] text-zinc-500 flex items-center justify-center shrink-0 group-hover:text-indigo-400 group-hover:bg-indigo-500/10 transition-colors border border-white/[0.06]">
                                    <TrendingUp className="w-4 h-4" />
                                  </div>
                                  <div className="min-w-0">
                                    <div className="text-gray-200 font-semibold text-[13px] mb-0.5 line-clamp-1">
                                      {study.title || "Case Study"}
                                    </div>
                                    {desc && (
                                      <div className="text-[11px] text-zinc-500 leading-relaxed group-hover:text-zinc-400 transition-colors line-clamp-1">
                                        {desc}
                                      </div>
                                    )}
                                  </div>
                                </button>
                              );
                            })
                          : null}
                      <div className="border-t border-white/[0.06] mt-1 pt-1 px-1">
                        <button
                          onClick={() => {
                            navigate("/case-studies");
                            setActiveMenu(null);
                          }}
                          className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg hover:bg-white/[0.06] transition-all duration-150 group"
                        >
                          <span className="text-[12px] font-semibold text-indigo-400 group-hover:text-indigo-300 transition-colors">
                            View all case studies
                          </span>
                          <ChevronRight className="w-3.5 h-3.5 text-indigo-400 group-hover:text-indigo-300 transition-colors" />
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <button
                onClick={() => handleSetPage("pricing")}
                className="hover:text-white transition-colors duration-200 px-3 text-xs py-2 rounded-lg font-medium"
              >
                Pricing
              </button>
            </div>

            <div className="hidden md:flex items-center gap-3">
              <button
                onClick={() =>
                  window.open(
                    "https://app.nexuscale.ai/users/register",
                    "_blank",
                  )
                }
                className="text-[13px] font-medium text-zinc-400 hover:text-white transition-all duration-200 px-4 py-2 rounded-lg border border-white/[0.08] hover:border-white/[0.15] hover:bg-white/[0.04]"
              >
                Open app
              </button>
              <button
                onClick={() =>
                  window.open(
                    "https://app.nexuscale.ai/users/register",
                    "_blank",
                  )
                }
                className="text-[13px] font-semibold text-white px-5 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 transition-all duration-200 shadow-[0_0_20px_rgba(99,102,241,0.25)] hover:shadow-[0_0_30px_rgba(99,102,241,0.4)] hover:scale-[1.02] active:scale-[0.98]"
              >
                Start Now
              </button>
            </div>

            <button
              className="md:hidden text-zinc-400 hover:text-white transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>

          {/* Scroll progress bar */}
          <div
            className="absolute bottom-0 left-0 h-[1px] bg-gradient-to-r from-transparent via-indigo-500 to-transparent transition-all duration-100 ease-out opacity-60 rounded-full"
            style={{ width: `${scrollProgress}%` }}
          />

          {/* Features Full-Width Mega Menu */}
          {activeMenu === "Features" && (
            <div
              className="absolute top-full left-0 w-full pt-2 hidden md:block"
              style={{ zIndex: 99999 }}
              onMouseEnter={() => setActiveMenu("Features")}
            >
              <div className="bg-[#0e0e12]/95 backdrop-blur-xl border border-white/[0.08] rounded-xl p-5 animate-in fade-in slide-in-from-top-2 duration-200 shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
                <div className="grid grid-cols-4 gap-1">
                  {featuresList.map((subItem, idx) => {
                    const Icon = subItem.icon;
                    return (
                      <button
                        key={idx}
                        onClick={() => {
                          handleSetPage(subItem.id);
                          setActiveMenu(null);
                        }}
                        className="flex items-start gap-3 p-3 rounded-lg hover:bg-white/[0.06] transition-all duration-150 text-left group"
                      >
                        <div className="w-9 h-9 rounded-lg bg-white/[0.04] text-zinc-500 flex items-center justify-center shrink-0 group-hover:text-indigo-400 group-hover:bg-indigo-500/10 transition-colors border border-white/[0.06]">
                          {typeof Icon === "string" ? (
                            <img
                              src={Icon}
                              alt=""
                              className="w-4 h-4 brightness-0 invert opacity-50 group-hover:opacity-100"
                            />
                          ) : (
                            <Icon className="w-4 h-4" />
                          )}
                        </div>
                        <div>
                          <div className="text-gray-200 font-semibold text-[13px] mb-0.5 flex items-center gap-2">
                            {subItem.title}
                            {subItem.comingSoon && (
                              <span className="text-[9px] bg-indigo-500/20 text-indigo-400 px-1.5 py-0.5 rounded-full font-medium">
                                Soon
                              </span>
                            )}
                          </div>
                          <div className="text-[11px] text-zinc-500 leading-relaxed group-hover:text-zinc-400 transition-colors">
                            {subItem.desc}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      {mobileMenuOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm md:hidden"
            onClick={() => setMobileMenuOpen(false)}
            style={{ zIndex: 99998 }}
          />
          <div
            className="fixed inset-0 bg-[#0a0a0f] md:hidden overflow-y-auto"
            style={{ zIndex: 99999 }}
          >
            <div className="sticky top-0 bg-[#0a0a0f] border-b border-white/[0.06] px-5 py-4 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <img
                  src="https://cdn.brandfetch.io/nexuscale.ai/w/512/h/512"
                  alt="Nexuscale"
                  className="h-8 w-8 rounded-full"
                />
                <div className="font-bold text-white text-sm tracking-wide">
                  NEXUSCALE
                </div>
              </div>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="text-zinc-400 hover:text-white transition-colors p-2 -mr-2"
                aria-label="Close menu"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="max-h-[calc(100vh-64px)] overflow-y-auto">
              <div className="p-4 space-y-1">
                <div>
                  <button
                    onClick={() => handleMobileSubmenuClick("Features")}
                    className="w-full flex items-center justify-between text-left py-3 px-4 rounded-lg hover:bg-white/5 transition-colors"
                  >
                    <span className="text-sm font-bold text-zinc-300">
                      Solutions
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-zinc-500 transition-transform duration-200 ${expandedMobileMenu === "Features" ? "rotate-180" : ""}`}
                    />
                  </button>
                  {expandedMobileMenu === "Features" && (
                    <div className="ml-4 mt-1 space-y-1 border-l border-white/10 pl-4">
                      {featuresList.map((item, idx) => {
                        const Icon = item.icon;
                        return (
                          <button
                            key={idx}
                            onClick={() => handleMobileItemClick(item)}
                            className="w-full flex items-center gap-3 py-2.5 px-3 rounded-lg hover:bg-white/5 transition-colors text-left group"
                          >
                            <div className="w-8 h-8 rounded-lg bg-white/5 text-zinc-500 flex items-center justify-center shrink-0 group-hover:text-indigo-400 group-hover:bg-indigo-500/10 transition-colors border border-white/5">
                              {typeof Icon === "string" ? (
                                <img
                                  src={Icon}
                                  alt=""
                                  className="w-4 h-4 brightness-0 invert opacity-50"
                                />
                              ) : (
                                <Icon className="w-4 h-4" />
                              )}
                            </div>
                            <div className="flex-1">
                              <div className="text-xs font-bold text-zinc-200 mb-0.5">
                                {item.title}
                              </div>
                              <div className="text-[10px] text-zinc-500 leading-tight">
                                {item.desc}
                              </div>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* <div>
                  <button
                    onClick={() => handleMobileSubmenuClick("Solutions")}
                    className="w-full flex items-center justify-between text-left py-3 px-4 rounded-lg hover:bg-white/5 transition-colors"
                  >
                    <span className="text-sm font-bold text-zinc-300">
                      Solutions
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-zinc-500 transition-transform duration-200 ${expandedMobileMenu === "Solutions" ? "rotate-180" : ""}`}
                    />
                  </button>
                  {expandedMobileMenu === "Solutions" && (
                    <div className="ml-4 mt-1 space-y-1 border-l border-white/10 pl-4">
                      {featuresList.map((item, idx) => {
                        const Icon = item.icon;
                        return (
                          <button
                            key={idx}
                            onClick={() => handleMobileItemClick(item)}
                            className="w-full flex items-center gap-3 py-2.5 px-3 rounded-lg hover:bg-white/5 transition-colors text-left group"
                          >
                            <div className="w-8 h-8 rounded-lg bg-white/5 text-zinc-500 flex items-center justify-center shrink-0 group-hover:text-indigo-400 group-hover:bg-indigo-500/10 transition-colors border border-white/5">
                              <Icon className="w-4 h-4" />
                            </div>
                            <div className="flex-1">
                              <div className="text-xs font-bold text-zinc-200 mb-0.5">
                                {item.title}
                              </div>
                              <div className="text-[10px] text-zinc-500 leading-tight">
                                {item.desc}
                              </div>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div> */}

                <div>
                  <button
                    onClick={() => handleMobileSubmenuClick("Use Cases")}
                    className="w-full flex items-center justify-between text-left py-3 px-4 rounded-lg hover:bg-white/5 transition-colors"
                  >
                    <span className="text-sm font-bold text-zinc-300">
                      Use Cases
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-zinc-500 transition-transform duration-200 ${expandedMobileMenu === "Use Cases" ? "rotate-180" : ""}`}
                    />
                  </button>
                  {expandedMobileMenu === "Use Cases" && (
                    <div className="ml-4 mt-1 space-y-1 border-l border-white/10 pl-4">
                      {useCasesList.map((item, idx) => {
                        const Icon = item.icon;
                        return (
                          <button
                            key={idx}
                            onClick={() => handleMobileItemClick(item)}
                            className="w-full flex items-center gap-3 py-2.5 px-3 rounded-lg hover:bg-white/5 transition-colors text-left group"
                          >
                            <div className="w-8 h-8 rounded-lg bg-white/5 text-zinc-500 flex items-center justify-center shrink-0 group-hover:text-indigo-400 group-hover:bg-indigo-500/10 transition-colors border border-white/5">
                              <Icon className="w-4 h-4" />
                            </div>
                            <div className="flex-1">
                              <div className="text-xs font-bold text-zinc-200 mb-0.5">
                                {item.title}
                              </div>
                              <div className="text-[10px] text-zinc-500 leading-tight">
                                {item.desc}
                              </div>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>

                <div>
                  <button
                    onClick={() => handleMobileSubmenuClick("Resources")}
                    className="w-full flex items-center justify-between text-left py-3 px-4 rounded-lg hover:bg-white/5 transition-colors"
                  >
                    <span className="text-sm font-bold text-zinc-300">
                      Resources
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-zinc-500 transition-transform duration-200 ${expandedMobileMenu === "Resources" ? "rotate-180" : ""}`}
                    />
                  </button>
                  {expandedMobileMenu === "Resources" && (
                    <div className="ml-4 mt-1 space-y-1 border-l border-white/10 pl-4">
                      {resourcesList.map((item, idx) => {
                        const Icon = item.icon;
                        return (
                          <button
                            key={idx}
                            onClick={() => handleMobileItemClick(item)}
                            className="w-full flex items-center gap-3 py-2.5 px-3 rounded-lg hover:bg-white/5 transition-colors text-left group"
                          >
                            <div className="w-8 h-8 rounded-lg bg-white/5 text-zinc-500 flex items-center justify-center shrink-0 group-hover:text-indigo-400 group-hover:bg-indigo-500/10 transition-colors border border-white/5">
                              <Icon className="w-4 h-4" />
                            </div>
                            <div className="flex-1">
                              <div className="text-xs font-bold text-zinc-200 mb-0.5">
                                {item.title}
                              </div>
                              <div className="text-[10px] text-zinc-500 leading-tight">
                                {item.desc}
                              </div>
                            </div>
                            {item.url && (
                              <ChevronRight className="w-4 h-4 text-zinc-500" />
                            )}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>

                <div>
                  <button
                    onClick={() => handleMobileSubmenuClick("Case Studies")}
                    className="w-full flex items-center justify-between text-left py-3 px-4 rounded-lg hover:bg-white/5 transition-colors"
                  >
                    <span className="text-sm font-bold text-zinc-300">
                      Case Studies
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-zinc-500 transition-transform duration-200 ${expandedMobileMenu === "Case Studies" ? "rotate-180" : ""}`}
                    />
                  </button>
                  {expandedMobileMenu === "Case Studies" && (
                    <div className="ml-4 mt-1 space-y-1 border-l border-white/10 pl-4">
                      {caseStudiesLoading
                        ? Array.from({ length: 3 }).map((_, i) => (
                            <div
                              key={i}
                              className="flex items-center gap-3 py-2.5 px-3 animate-pulse"
                            >
                              <div className="w-8 h-8 rounded-lg bg-white/5 shrink-0" />
                              <div className="flex-1 space-y-1.5">
                                <div className="h-3 bg-zinc-800 rounded w-3/4" />
                                <div className="h-2.5 bg-zinc-800 rounded w-full" />
                              </div>
                            </div>
                          ))
                        : caseStudiesPreview.length > 0
                          ? caseStudiesPreview.map((study, idx) => {
                              const slug = study.slug || study.id || "";
                              const desc = (
                                study.description ||
                                study.excerpt ||
                                ""
                              )
                                .replace(/<[^>]+>/g, "")
                                .slice(0, 60);
                              return (
                                <button
                                  key={idx}
                                  onClick={() => {
                                    navigate(`/case-studies/${slug}`);
                                    setMobileMenuOpen(false);
                                    setExpandedMobileMenu(null);
                                  }}
                                  className="w-full flex items-center gap-3 py-2.5 px-3 rounded-lg hover:bg-white/5 transition-colors text-left group"
                                >
                                  <div className="w-8 h-8 rounded-lg bg-white/5 text-zinc-500 flex items-center justify-center shrink-0 group-hover:text-indigo-400 group-hover:bg-indigo-500/10 transition-colors border border-white/5">
                                    <TrendingUp className="w-4 h-4" />
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <div className="text-xs font-bold text-zinc-200 mb-0.5 line-clamp-1">
                                      {study.title || "Case Study"}
                                    </div>
                                    {desc && (
                                      <div className="text-[10px] text-zinc-500 leading-tight line-clamp-1">
                                        {desc}
                                      </div>
                                    )}
                                  </div>
                                </button>
                              );
                            })
                          : null}
                      <Link
                        to="/case-studies"
                        onClick={() => {
                          setMobileMenuOpen(false);
                          setExpandedMobileMenu(null);
                        }}
                        className="flex items-center justify-between py-2.5 px-3 rounded-lg hover:bg-white/5 transition-colors"
                      >
                        <span className="text-xs font-bold text-indigo-400">
                          View all case studies
                        </span>
                        <ChevronRight className="w-4 h-4 text-indigo-400" />
                      </Link>
                    </div>
                  )}
                </div>

                <button
                  onClick={() => {
                    handleSetPage("pricing");
                    setMobileMenuOpen(false);
                  }}
                  className="w-full text-left py-3 px-4 rounded-lg hover:bg-white/5 transition-colors"
                >
                  <span className="text-sm font-bold text-zinc-300">
                    Pricing
                  </span>
                </button>

                <div className="pt-6 pb-2 space-y-3">
                  <button
                    onClick={() => {
                      window.open(
                        "https://app.nexuscale.ai/users/register",
                        "_blank",
                      );
                      setMobileMenuOpen(false);
                    }}
                    className="w-full py-3.5 text-sm font-semibold text-zinc-300 border border-white/[0.1] rounded-xl hover:bg-white/5 transition-colors"
                  >
                    Open app
                  </button>
                  <button
                    onClick={() => {
                      window.open(
                        "https://app.nexuscale.ai/users/register",
                        "_blank",
                      );
                      setMobileMenuOpen(false);
                    }}
                    className="w-full py-3.5 text-sm font-bold text-white bg-indigo-600 rounded-xl hover:bg-indigo-500 transition-colors shadow-[0_0_20px_rgba(99,102,241,0.3)]"
                  >
                    Start Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
