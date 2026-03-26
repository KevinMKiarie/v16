import { QueryClient } from "@tanstack/react-query";
import axios from "axios";

const API_URL = "https://articles.nexuscale.ai";
const CACHE_KEY = "nexuscale_articles_cache";
const CACHE_EXPIRY_MS = 30 * 60 * 1000;

const STARTUP_URL = "https://app.nexuscale.ai";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 30, // 30 minutes
      gcTime: 1000 * 60 * 60, // 60 minutes (formerly cacheTime)
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

const getCachedData = () => {
  try {
    const cached = localStorage.getItem(CACHE_KEY);
    if (!cached) return null;

    const { data, timestamp } = JSON.parse(cached);
    const now = Date.now();

    if (now - timestamp < CACHE_EXPIRY_MS) {
      return data;
    }

    localStorage.removeItem(CACHE_KEY);
    return null;
  } catch (error) {
    console.error("Error reading cache:", error);
    return null;
  }
};

const setCachedData = (data) => {
  try {
    const cacheData = {
      data,
      timestamp: Date.now(),
    };
    localStorage.setItem(CACHE_KEY, JSON.stringify(cacheData));
  } catch (error) {
    console.error("Error saving to cache:", error);
  }
};

export const fetchArticles = async (page = 1, perPage = 15) => {
  try {
    const response = await axios.get(`${API_URL}/api/blogs`, {
      headers: {
        accept: "application/json",
      },
      params: {
        page,
        per_page: perPage,
      },
    });

    return (
      response.data?.data || {
        entries: [],
        page_number: 1,
        page_size: perPage,
        total_pages: 0,
        total_entries: 0,
      }
    );
  } catch (error) {
    console.error("Error fetching articles:", error);
    return {
      entries: [],
      page_number: 1,
      page_size: perPage,
      total_pages: 0,
      total_entries: 0,
    };
  }
};

export const fetchAllArticles = async () => {
  const cached = getCachedData();
  if (cached) {
    return cached;
  }

  const firstPageData = await fetchArticles(1, 15);
  const articles = firstPageData.entries || [];

  setCachedData(articles);

  return articles;
};

export const fetchArticleBySlug = async (slug) => {
  const cachedArticles = queryClient.getQueryData(["articles"]);

  if (cachedArticles && Array.isArray(cachedArticles)) {
    const article = cachedArticles.find((a) => a.slug === slug);
    if (article) return article;
  }

  const localCached = getCachedData();
  if (localCached && Array.isArray(localCached)) {
    const article = localCached.find((a) => a.slug === slug);
    if (article) return article;
  }

  const { data } = await axios.get(`${API_URL}/api/blogs/${slug}`, {
    headers: {
      accept: "application/json",
    },
  });

  return data?.data || data || null;
};

const CASE_STUDIES_CACHE_KEY = "nexuscale_case_studies_cache";

const getCaseStudiesCached = () => {
  try {
    const cached = localStorage.getItem(CASE_STUDIES_CACHE_KEY);
    if (!cached) return null;
    const { data, timestamp } = JSON.parse(cached);
    if (Date.now() - timestamp < CACHE_EXPIRY_MS) return data;
    localStorage.removeItem(CASE_STUDIES_CACHE_KEY);
    return null;
  } catch {
    return null;
  }
};

const setCaseStudiesCached = (data) => {
  try {
    localStorage.setItem(
      CASE_STUDIES_CACHE_KEY,
      JSON.stringify({ data, timestamp: Date.now() }),
    );
  } catch (e) {
    console.error("Error saving case studies cache:", e);
  }
};

export const fetchCaseStudies = async (page = 1, perPage = 15) => {
  try {
    const response = await axios.get(`${API_URL}/api/case-studies`, {
      headers: { accept: "application/json" },
      params: { page, per_page: perPage },
    });
    const payload = response.data?.data || response.data;
    return {
      entries: payload?.entries || [],
      total_pages: payload?.total_pages ?? 1,
      page_number: payload?.page_number ?? page,
      page_size: payload?.page_size ?? perPage,
      total_entries: payload?.total_entries ?? 0,
    };
  } catch (error) {
    console.error("Error fetching case studies:", error);
    return {
      entries: [],
      page_number: page,
      page_size: perPage,
      total_pages: 0,
      total_entries: 0,
    };
  }
};

export const fetchCaseStudyBySlug = async (slug) => {
  const cached = queryClient.getQueryData(["case-studies", 1]);
  if (cached?.entries) {
    const found = cached.entries.find((c) => c.slug === slug);
    if (found) return found;
  }
  const localCached = getCaseStudiesCached();
  if (Array.isArray(localCached)) {
    const found = localCached.find((c) => c.slug === slug);
    if (found) return found;
  }
  const { data } = await axios.get(`${API_URL}/api/case-studies/${slug}`, {
    headers: { accept: "application/json" },
  });
  return data?.data || data || null;
};

const WHITEPAPERS_CACHE_KEY = "nexuscale_whitepapers_cache";

const getWhitepapersCached = () => {
  try {
    const cached = localStorage.getItem(WHITEPAPERS_CACHE_KEY);
    if (!cached) return null;
    const { data, timestamp } = JSON.parse(cached);
    if (Date.now() - timestamp < CACHE_EXPIRY_MS) return data;
    localStorage.removeItem(WHITEPAPERS_CACHE_KEY);
    return null;
  } catch {
    return null;
  }
};

const setWhitepapersCached = (data) => {
  try {
    localStorage.setItem(
      WHITEPAPERS_CACHE_KEY,
      JSON.stringify({ data, timestamp: Date.now() }),
    );
  } catch (e) {
    console.error("Error saving whitepapers cache:", e);
  }
};

export const fetchWhitepapers = async (page = 1, perPage = 15) => {
  try {
    const response = await axios.get(`${API_URL}/api/white-papers`, {
      headers: { accept: "application/json" },
      params: { page, per_page: perPage },
    });
    const payload = response.data?.data || response.data;
    return {
      entries: payload?.entries || [],
      total_pages: payload?.total_pages ?? 1,
      page_number: payload?.page_number ?? page,
      page_size: payload?.page_size ?? perPage,
      total_entries: payload?.total_entries ?? 0,
    };
  } catch (error) {
    console.error("Error fetching whitepapers:", error);
    return {
      entries: [],
      page_number: page,
      page_size: perPage,
      total_pages: 0,
      total_entries: 0,
    };
  }
};

export const fetchAllWhitepapers = async () => {
  const cached = getWhitepapersCached();
  if (cached) return cached;

  const firstPageData = await fetchWhitepapers(1, 15);
  const whitepapers = firstPageData.entries || [];

  setWhitepapersCached(whitepapers);
  return whitepapers;
};

export const fetchWhitepaperBySlug = async (slug) => {
  const cached = queryClient.getQueryData(["whitepapers", 1]);
  if (cached?.entries) {
    const found = cached.entries.find((w) => w.slug === slug);
    if (found) return found;
  }
  const localCached = getWhitepapersCached();
  if (Array.isArray(localCached)) {
    const found = localCached.find((w) => w.slug === slug);
    if (found) return found;
  }
  const { data } = await axios.get(`${API_URL}/api/white-papers/${slug}`, {
    headers: { accept: "application/json" },
  });
  return data?.data || data || null;
};

export const sendWhitepaperPdf = async (email, paper) => {
  const body = { email };
  const id = paper?.id ?? paper?.white_paper_id;
  const slug = paper?.slug;
  if (slug) body.slug = slug;
  else if (id != null) body.white_paper_id = Number(id);
  else throw new Error("White paper id or slug is required");

  const { data, status } = await axios.post(
    `${API_URL}/api/white-papers/send-pdf`,
    body,
    {
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
      },
      validateStatus: () => true,
    },
  );

  if (status === 200) return data;
  throw new Error(data?.error || data?.message || "Something went wrong");
};

export const fetchCategories = async () => {
  try {
    const response = await axios.get(`${API_URL}/api/categories`, {
      headers: { accept: "application/json" },
    });
    const payload = response.data?.data || response.data;
    return Array.isArray(payload) ? payload : payload?.entries || [];
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
};

export const createCategory = async (name) => {
  return { name };
};

export const cacheUtils = {
  clearCache: () => {
    try {
      localStorage.removeItem(CACHE_KEY);
      queryClient.invalidateQueries({ queryKey: ["articles"] });
    } catch (error) {
      console.error("Error clearing cache:", error);
    }
  },
};

export const sendStartupProgramRequest = async (formData) => {
  const body = {
    company_info: formData.companyInfo,
    work_email: formData.workEmail,
    proof_link: formData.proofLink,
    outbound_stack: formData.outboundStack,
    agreed_to_terms: formData.agreedToTerms,
  };

  const { data, status } = await axios.post(
    `${STARTUP_URL}/api/startup-program`,
    body,
    {
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
      },
      validateStatus: () => true,
    },
  );

  if (status === 200 || status === 201) return data;
  throw new Error(data?.error || data?.message || "Something went wrong");
};
