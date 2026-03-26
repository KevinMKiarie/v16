import React, { useEffect, useRef, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { fetchAllArticles, fetchArticleBySlug } from "../lib/queryClient";
import { accentColor } from "../constants/theme";
import { ArrowLeft } from "lucide-react";

const API_URL = "https://articles.nexuscale.ai/api/blogs";

const getOrCreateMetaTag = (name, property = false) => {
  const attribute = property ? 'property' : 'name';
  const selector = property ? `meta[property="${name}"]` : `meta[name="${name}"]`;
  let meta = document.querySelector(selector);
  if (!meta) {
    meta = document.createElement('meta');
    meta.setAttribute(attribute, name);
    document.head.appendChild(meta);
  }
  return meta;
};

const getOrCreateLinkTag = (rel) => {
  let link = document.querySelector(`link[rel="${rel}"]`);
  if (!link) {
    link = document.createElement('link');
    link.setAttribute('rel', rel);
    document.head.appendChild(link);
  }
  return link;
};


const normalizeMarkdown = (text) => {
  if (!text || typeof text !== "string") return text || "";

 
  let normalized = text.replace(/^(\s*)(#{1,6})([^\s#\n])/gm, '$1$2 $3');

  normalized = normalized.replace(/^(#{1,6}\s+[^\n]+)\n(?!\n|#|\s*$)([^\n])/gm, '$1\n\n$2');

  return normalized;
};

// Shared markdown components matching Phoenix preview styles
const markdownComponents = {
  h1: (props) => (
    <h1 className="text-3xl font-semibold text-white mb-4 mt-6 pb-1 border-b border-zinc-700 leading-tight first:mt-0" {...props} />
  ),
  h2: (props) => (
    <h2 className="text-2xl font-semibold text-white mb-4 mt-6 pb-1 border-b border-zinc-700 leading-tight first:mt-0" {...props} />
  ),
  h3: (props) => (
    <h3 className="text-xl font-semibold text-white mb-4 mt-6 leading-tight first:mt-0" {...props} />
  ),
  h4: (props) => (
    <h4 className="text-lg font-semibold text-white mb-4 mt-6 leading-tight first:mt-0" {...props} />
  ),
  h5: (props) => (
    <h5 className="text-base font-semibold text-white mb-4 mt-6 leading-tight first:mt-0" {...props} />
  ),
  h6: (props) => (
    <h6 className="text-sm font-semibold text-zinc-400 mb-4 mt-6 leading-tight first:mt-0" {...props} />
  ),
  p: (props) => (
    <p className="mb-4 text-zinc-300 leading-[1.75] mt-0 last:mb-0" {...props} />
  ),
  a: (props) => (
    <a
      className="text-[#787ff7] hover:text-[#6366f1] underline underline-offset-2 decoration-[#787ff7] hover:decoration-[#6366f1]"
      target="_blank"
      rel="noopener noreferrer"
      {...props}
    />
  ),
  ul: (props) => (
    <ul className="list-disc mb-4 mt-0 pl-8 text-zinc-300 space-y-2" {...props} />
  ),
  ol: (props) => (
    <ol className="list-decimal mb-4 mt-0 pl-8 text-zinc-300 space-y-2" {...props} />
  ),
  li: (props) => (
    <li className="mb-2 leading-[1.75]" {...props} />
  ),
  blockquote: (props) => (
    <blockquote className="my-6 py-3 pl-6 pr-4 border-l-4 border-[#787ff7] bg-zinc-800 text-zinc-300 italic rounded-r border-r-0 first:mt-0 last:mb-0" {...props} />
  ),
  code: ({ inline, className, children, ...props }) => {
    const match = /language-(\w+)/.exec(className || '');
    return inline ? (
      <code className="bg-zinc-800 px-1.5 py-0.5 rounded text-sm font-mono text-zinc-300 border border-zinc-700" {...props}>
        {children}
      </code>
    ) : (
      <pre className="bg-zinc-800 text-zinc-50 p-4 rounded-lg overflow-x-auto my-6 leading-relaxed border border-zinc-700">
        <code className={`text-sm font-mono bg-transparent p-0 border-0 text-inherit ${className || ''}`} {...props}>
          {children}
        </code>
      </pre>
    );
  },
  img: (props) => (
    <img
      className="rounded-lg my-6 max-w-full h-auto mx-auto"
      alt={props.alt || ""}
      loading="lazy"
      decoding="async"
      {...props}
    />
  ),
  table: (props) => (
    <table className="w-full border-collapse my-6" {...props} />
  ),
  th: (props) => (
    <th className="border border-zinc-700 px-3 py-2 bg-zinc-800 font-semibold text-left text-white" {...props} />
  ),
  td: (props) => (
    <td className="border border-zinc-700 px-3 py-2 text-zinc-300" {...props} />
  ),
  hr: (props) => (
    <hr className="my-8 border-0 border-t-2 border-zinc-700 bg-transparent" {...props} />
  ),
  strong: (props) => (
    <strong className="font-semibold text-white" {...props} />
  ),
  em: (props) => (
    <em className="italic" {...props} />
  ),
};

const BlogDetailsPage = () => {
  const { slug } = useParams();
  const jsonLdScriptRef = useRef(null);

  // Fetch all articles with shared cache key
  const { data: allArticles } = useQuery({
    queryKey: ["articles"],
    queryFn: fetchAllArticles,
  });

  // Get the specific blog from the cached articles
  const {
    data: blog,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["blog", slug],
    queryFn: () => fetchArticleBySlug(slug),
    enabled: !!slug,
  });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [slug]);

  useEffect(() => {
    if (!blog || !slug) return;

    const title = blog.title || 'Blog Post';
    const publishedAt = blog.publishedAt || blog.published_at || blog.createdAt || blog.created_at;
    const author = typeof blog.author === 'string' ? blog.author : blog.author?.name || 'Nexuscale Team';
    const cover = blog.cover || blog.coverImage || blog.image;
    let imageUrl = cover?.formats?.large?.url || cover?.formats?.medium?.url || cover?.url || cover || null;

    // If it's a relative path (starts with /), make it absolute
    if (imageUrl && typeof imageUrl === 'string' && imageUrl.startsWith('/')) {
      imageUrl = `https://articles.nexuscale.ai${imageUrl}`;
    }

    const description = blog.description || blog.excerpt || blog.summary || '';
    const cleanDescription = description.replace(/<[^>]+>/g, '').slice(0, 160);

    const canonicalUrl = `https://www.nexuscale.ai/blogs/${slug}`;
    const canonicalLink = getOrCreateLinkTag('canonical');
    canonicalLink.setAttribute('href', canonicalUrl);

    document.title = `${title} | Nexuscale Blog`;

    const metaDescription = getOrCreateMetaTag('description');
    metaDescription.setAttribute('content', cleanDescription || `${title} - Nexuscale Blog`);

    const ogTitle = getOrCreateMetaTag('og:title', true);
    ogTitle.setAttribute('content', title);

    const ogDescription = getOrCreateMetaTag('og:description', true);
    ogDescription.setAttribute('content', cleanDescription || `${title} - Nexuscale Blog`);

    const ogUrl = getOrCreateMetaTag('og:url', true);
    ogUrl.setAttribute('content', canonicalUrl);

    const ogType = getOrCreateMetaTag('og:type', true);
    ogType.setAttribute('content', 'article');

    if (imageUrl) {
      const fullImageUrl = imageUrl.startsWith('http') ? imageUrl : `https://articles.nexuscale.ai${imageUrl}`;
      const ogImage = getOrCreateMetaTag('og:image', true);
      ogImage.setAttribute('content', fullImageUrl);
    }

    const ogSiteName = getOrCreateMetaTag('og:site_name', true);
    ogSiteName.setAttribute('content', 'Nexuscale');

    const twitterCard = getOrCreateMetaTag('twitter:card');
    twitterCard.setAttribute('content', 'summary_large_image');

    const twitterTitle = getOrCreateMetaTag('twitter:title');
    twitterTitle.setAttribute('content', title);

    const twitterDescription = getOrCreateMetaTag('twitter:description');
    twitterDescription.setAttribute('content', cleanDescription || `${title} - Nexuscale Blog`);

    if (imageUrl) {
      const fullImageUrl = imageUrl.startsWith('http') ? imageUrl : `https://articles.nexuscale.ai${imageUrl}`;
      const twitterImage = getOrCreateMetaTag('twitter:image');
      twitterImage.setAttribute('content', fullImageUrl);
    }

    if (publishedAt) {
      const articlePublishedTime = getOrCreateMetaTag('article:published_time');
      articlePublishedTime.setAttribute('content', new Date(publishedAt).toISOString());

      const articleModifiedTime = getOrCreateMetaTag('article:modified_time');
      articleModifiedTime.setAttribute('content', new Date(publishedAt).toISOString());
    }

    if (author) {
      const articleAuthor = getOrCreateMetaTag('article:author');
      articleAuthor.setAttribute('content', author);
    }

    if (jsonLdScriptRef.current) {
      jsonLdScriptRef.current.remove();
    }

    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": title,
      "description": cleanDescription || `${title} - Nexuscale Blog`,
      "author": {
        "@type": "Person",
        "name": author
      },
      "publisher": {
        "@type": "Organization",
        "name": "Nexuscale",
        "url": "https://www.nexuscale.ai"
      },
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": canonicalUrl
      }
    };

    if (publishedAt) {
      jsonLd.datePublished = new Date(publishedAt).toISOString();
      jsonLd.dateModified = new Date(publishedAt).toISOString();
    }

    if (imageUrl) {
      const fullImageUrl = imageUrl.startsWith('http') ? imageUrl : `https://articles.nexuscale.ai${imageUrl}`;
      jsonLd.image = fullImageUrl;
    }

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(jsonLd);
    script.id = 'blog-json-ld';
    jsonLdScriptRef.current = script;
    document.head.appendChild(script);

    return () => {
      if (jsonLdScriptRef.current) {
        jsonLdScriptRef.current.remove();
        jsonLdScriptRef.current = null;
      }
    };
  }, [blog, slug]);

  if (isLoading)
    return (
      <div className="pt-4 pb-20 min-h-screen bg-[#020203]">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <Link
            to="/blogs"
            className="text-indigo-400 hover:text-indigo-300 text-sm inline-flex items-center gap-2 mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Blogs
          </Link>
          <div className="bg-[#09090B]/50 border border-white/[0.08] rounded-2xl p-8 md:p-12 animate-pulse backdrop-blur-sm">
            <div className="mb-10">
              <div className="h-10 bg-zinc-800 rounded w-3/4 mb-4"></div>
              <div className="h-8 bg-zinc-800 rounded w-2/3 mb-6"></div>
              <div className="flex gap-4">
                <div className="h-4 bg-zinc-800 rounded w-32"></div>
                <div className="h-4 bg-zinc-800 rounded w-24"></div>
              </div>
            </div>
            <div className="mb-10 h-96 bg-gradient-to-r from-zinc-800 via-zinc-700 to-zinc-800 rounded-xl"></div>
            <div className="space-y-4">
              <div className="h-6 bg-zinc-800 rounded w-full"></div>
              <div className="h-6 bg-zinc-800 rounded w-5/6"></div>
              <div className="h-6 bg-zinc-800 rounded w-full"></div>
              <div className="h-6 bg-zinc-800 rounded w-4/5"></div>
              <div className="pt-6 space-y-3">
                <div className="h-4 bg-zinc-800 rounded w-full"></div>
                <div className="h-4 bg-zinc-800 rounded w-full"></div>
                <div className="h-4 bg-zinc-800 rounded w-full"></div>
                <div className="h-4 bg-zinc-800 rounded w-5/6"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );

  if (isError)
    return (
      <div className="pt-4 pb-20 min-h-screen bg-[#020203] text-center">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <p className="text-red-400 text-lg mb-4">Failed to load blog.</p>
          <button
            onClick={refetch}
            className="text-indigo-400 hover:text-indigo-300 underline transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );

  if (!blog) return null;

  const title = blog.title;
  const publishedAt = blog.publishedAt || blog.published_at || blog.createdAt || blog.created_at;
  const author = blog.author;
  const blocks = blog.blocks || blog.content;
  const rawContent = blog.content || blog.body;
  const content =
    typeof rawContent === "string" ? normalizeMarkdown(rawContent) : rawContent;

  const getTrendingBlogs = () => {
    if (!allArticles || !Array.isArray(allArticles)) return [];

    const filtered = allArticles
      .filter(article => article.slug !== slug)
      .sort((a, b) => {
        const dateA = new Date(a.publishedAt || a.published_at || a.createdAt || a.created_at || 0);
        const dateB = new Date(b.publishedAt || b.published_at || b.createdAt || b.created_at || 0);
        return dateB - dateA;
      })
      .slice(0, 3);

    return filtered;
  };

  const trendingBlogs = getTrendingBlogs();

  const getTrendingBlogImage = (article) => {
    const cover = article.cover || article.coverImage || article.image;
    let imageUrl = cover?.formats?.small?.url || cover?.url || cover;

    if (!imageUrl) return null;
    if (typeof imageUrl === 'string' && imageUrl.startsWith('/')) {
      imageUrl = `https://articles.nexuscale.ai${imageUrl}`;
    }
    return imageUrl;
  };

  const getTrendingBlogTitle = (article) => {
    return article.title || article.name || 'Untitled Article';
  };

  const getTrendingBlogSlug = (article) => {
    return article.slug || article.id || 'untitled';
  };

  const getTrendingBlogDate = (article) => {
    const dateStr = article.publishedAt || article.published_at || article.createdAt || article.created_at;
    if (!dateStr) return '';
    try {
      return new Date(dateStr).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    } catch {
      return '';
    }
  };

  const getTrendingBlogReadTime = (article) => {
    const readTime = article.read_time || article.readTime;
    if (!readTime || typeof readTime !== 'number') return null;
    return `${readTime} min read`;
  };

  const getTrendingBlogDescription = (article) => {
    const description = article.description || article.excerpt || article.summary || '';
    if (!description) return '';

    if (typeof description === 'object') {
      const text = description.text || description.content || description.body || '';
      if (text) {
        const cleaned = text.replace(/<[^>]+>/g, '').slice(0, 120);
        return cleaned || '';
      }
      return '';
    }

    if (typeof description === 'string') {
      const cleaned = description.replace(/<[^>]+>/g, '').slice(0, 120);
      return cleaned || '';
    }

    return '';
  };

  return (
    <div className="pt-4 pb-20 min-h-screen bg-[#020203]">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <Link
          to="/blogs"
          className="text-indigo-400 hover:text-indigo-300 text-sm inline-flex items-center gap-2 mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Blogs
        </Link>

        <article className="bg-[#09090B]/50 border border-white/[0.08] rounded-2xl p-8 md:p-12 backdrop-blur-sm">
          <header className="mb-10">
            <h1
              className="text-4xl md:text-5xl font-bold text-white mb-2 leading-tight"
              style={{
                background: `linear-gradient(120deg, ${accentColor} 20%, #ffffff 100%)`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
            >
              {title}
            </h1>
            <div className="text-zinc-400 text-sm mt-3">
              {author && (
                <span className="font-medium text-zinc-300">
                  By {typeof author === 'string' ? author : author.name || 'Unknown Author'}
                </span>
              )}
              {author && publishedAt && <span className="mx-2">•</span>}
              {publishedAt && (
                <span>
                  {new Date(publishedAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              )}
            </div>
          </header>

          <div className="markdown-content prose prose-invert max-w-none">
            {/* Handle structured blocks content */}
            {blocks && Array.isArray(blocks) &&
              blocks.map((block, index) => {
                if (block.__component === "shared.rich-text" || block.type === "rich-text") {
                  return (
                    <div key={index}>
                      <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        components={markdownComponents}
                      >
                        {normalizeMarkdown(block.body || block.content || "")}
                      </ReactMarkdown>
                    </div>
                  );
                }
                return null;
              })}

            {/* Handle simple content string */}
            {content && typeof content === 'string' && (
              <div>
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={markdownComponents}
                >
                  {content}
                </ReactMarkdown>
              </div>
            )}

            {/* Fallback if no content structure is recognized */}
            {!blocks && !content && (
              <div className="text-zinc-400 text-center py-8">
                <p>No content available for this article.</p>
              </div>
            )}
          </div>
        </article>

        {/* Trending Blogs Section */}
        {trendingBlogs.length > 0 && (
          <div className="mt-16">
            <h2 className="text-3xl font-bold text-white mb-8">Trending Blogs</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {trendingBlogs.map((article) => {
                const articleTitle = getTrendingBlogTitle(article);
                const articleSlug = getTrendingBlogSlug(article);
                const articleImage = getTrendingBlogImage(article);
                const articleDate = getTrendingBlogDate(article);
                const articleDescription = getTrendingBlogDescription(article);
                const articleReadTime = getTrendingBlogReadTime(article);

                return (
                  <TrendingBlogCard
                    key={articleSlug}
                    articleSlug={articleSlug}
                    articleTitle={articleTitle}
                    articleImage={articleImage}
                    articleDate={articleDate}
                    articleDescription={articleDescription}
                    articleReadTime={articleReadTime}
                  />
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const TrendingBlogCard = ({ articleSlug, articleTitle, articleImage, articleDate, articleDescription, articleReadTime }) => {
  const [imageError, setImageError] = useState(false);
  const showPlaceholder = !articleImage || imageError;

  return (
    <Link
      to={`/blogs/${articleSlug}`}
      className="group block bg-[#09090B]/50 border border-white/[0.08] rounded-xl hover:border-white/[0.12] transition-all duration-300 overflow-hidden backdrop-blur-sm"
    >
      <div className="relative w-full aspect-video overflow-hidden">
        {!showPlaceholder && (
          <img
            src={articleImage}
            alt={articleTitle}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            onError={() => setImageError(true)}
          />
        )}
        {showPlaceholder && (
          <div
            className="w-full h-full flex items-center justify-center"
            style={{ backgroundColor: accentColor }}
          >
            <span className="text-white font-bold text-xl md:text-2xl">Nexuscale</span>
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-bold text-lg text-white mb-2 line-clamp-2 group-hover:text-indigo-300 transition-colors">
          {articleTitle}
        </h3>
        {articleDescription && (
          <p className="text-sm text-zinc-400 mb-2 line-clamp-2 leading-relaxed">
            {articleDescription}
          </p>
        )}
        {(articleDate || articleReadTime) && (
          <div className="text-xs text-zinc-500 flex items-center justify-between">
            <span></span>
            <div className="flex items-center gap-2">
              {articleReadTime && <span>{articleReadTime}</span>}
              {articleReadTime && articleDate && <span>&bull;</span>}
              {articleDate && <span>{articleDate}</span>}
            </div>
          </div>
        )}
      </div>
    </Link>
  );
};

export default BlogDetailsPage;

