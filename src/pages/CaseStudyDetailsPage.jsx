import { useEffect, useRef, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { fetchCaseStudies, fetchCaseStudyBySlug } from '../lib/queryClient';
import { accentColor } from '../constants/theme';
import { ArrowLeft } from 'lucide-react';

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
  const link = document.querySelector(`link[rel="${rel}"]`) || document.createElement('link');
  if (!link.getAttribute('rel')) {
    link.setAttribute('rel', rel);
    document.head.appendChild(link);
  }
  return link;
};

const normalizeMarkdown = (text) => {
  if (!text || typeof text !== 'string') return text || '';
  let normalized = text.replace(/^(\s*)(#{1,6})([^\s#\n])/gm, '$1$2 $3');
  normalized = normalized.replace(/^(#{1,6}\s+[^\n]+)\n(?!\n|#|\s*$)([^\n])/gm, '$1\n\n$2');
  return normalized;
};

const markdownComponents = {
  h1: (props) => <h1 className="text-3xl font-semibold text-white mb-4 mt-6 pb-1 border-b border-zinc-700 leading-tight first:mt-0" {...props} />,
  h2: (props) => <h2 className="text-2xl font-semibold text-white mb-4 mt-6 pb-1 border-b border-zinc-700 leading-tight first:mt-0" {...props} />,
  h3: (props) => <h3 className="text-xl font-semibold text-white mb-4 mt-6 leading-tight first:mt-0" {...props} />,
  h4: (props) => <h4 className="text-lg font-semibold text-white mb-4 mt-6 leading-tight first:mt-0" {...props} />,
  h5: (props) => <h5 className="text-base font-semibold text-white mb-4 mt-6 leading-tight first:mt-0" {...props} />,
  h6: (props) => <h6 className="text-sm font-semibold text-zinc-400 mb-4 mt-6 leading-tight first:mt-0" {...props} />,
  p: (props) => <p className="mb-4 text-zinc-300 leading-[1.75] mt-0 last:mb-0" {...props} />,
  a: (props) => (
    <a className="text-[#787ff7] hover:text-[#6366f1] underline underline-offset-2 decoration-[#787ff7] hover:decoration-[#6366f1]" target="_blank" rel="noopener noreferrer" {...props} />
  ),
  ul: (props) => <ul className="list-disc mb-4 mt-0 pl-8 text-zinc-300 space-y-2" {...props} />,
  ol: (props) => <ol className="list-decimal mb-4 mt-0 pl-8 text-zinc-300 space-y-2" {...props} />,
  li: (props) => <li className="mb-2 leading-[1.75]" {...props} />,
  blockquote: (props) => (
    <blockquote className="my-6 py-3 pl-6 pr-4 border-l-4 border-[#787ff7] bg-zinc-800 text-zinc-300 italic rounded-r border-r-0 first:mt-0 last:mb-0" {...props} />
  ),
  code: ({ inline, className, children, ...props }) =>
    inline ? (
      <code className="bg-zinc-800 px-1.5 py-0.5 rounded text-sm font-mono text-zinc-300 border border-zinc-700" {...props}>
        {children}
      </code>
    ) : (
      <pre className="bg-zinc-800 text-zinc-50 p-4 rounded-lg overflow-x-auto my-6 leading-relaxed border border-zinc-700">
        <code className={`text-sm font-mono bg-transparent p-0 border-0 text-inherit ${className || ''}`} {...props}>
          {children}
        </code>
      </pre>
    ),
  img: (props) => <img className="rounded-lg my-6 max-w-full h-auto mx-auto" alt={props.alt || ''} loading="lazy" decoding="async" {...props} />,
  table: (props) => <table className="w-full border-collapse my-6" {...props} />,
  th: (props) => <th className="border border-zinc-700 px-3 py-2 bg-zinc-800 font-semibold text-left text-white" {...props} />,
  td: (props) => <td className="border border-zinc-700 px-3 py-2 text-zinc-300" {...props} />,
  hr: (props) => <hr className="my-8 border-0 border-t-2 border-zinc-700 bg-transparent" {...props} />,
  strong: (props) => <strong className="font-semibold text-white" {...props} />,
  em: (props) => <em className="italic" {...props} />,
};

export default function CaseStudyDetailsPage() {
  const { slug } = useParams();
  const jsonLdRef = useRef(null);

  const { data: study, isLoading, isError, refetch } = useQuery({
    queryKey: ['case-study', slug],
    queryFn: () => fetchCaseStudyBySlug(slug),
    enabled: !!slug,
  });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [slug]);

  useEffect(() => {
    if (!study || !slug) return;

    const title = study.title || 'Case Study';
    const description = (study.description || study.excerpt || study.summary || '').replace(/<[^>]+>/g, '').slice(0, 160);
    const author = typeof study.author === 'string' ? study.author : study.author?.name || 'Nexuscale';
    const updatedAt = study.updated_at || study.inserted_at || study.published_at;
    const canonicalUrl = `https://www.nexuscale.ai/case-studies/${slug}`;

    const canonicalLink = getOrCreateLinkTag('canonical');
    canonicalLink.setAttribute('href', canonicalUrl);
    document.title = `${title} | Nexuscale Case Studies`;
    getOrCreateMetaTag('description').setAttribute('content', description || `${title} - Nexuscale Case Study`);
    getOrCreateMetaTag('og:title', true).setAttribute('content', title);
    getOrCreateMetaTag('og:description', true).setAttribute('content', description || `${title} - Nexuscale Case Study`);
    getOrCreateMetaTag('og:url', true).setAttribute('content', canonicalUrl);
    getOrCreateMetaTag('og:type', true).setAttribute('content', 'article');
    getOrCreateMetaTag('og:site_name', true).setAttribute('content', 'Nexuscale');
    getOrCreateMetaTag('twitter:card').setAttribute('content', 'summary_large_image');
    getOrCreateMetaTag('twitter:title').setAttribute('content', title);
    getOrCreateMetaTag('twitter:description').setAttribute('content', description || `${title} - Nexuscale Case Study`);

    const imageUrl = study.image?.url || study.image || study.cover?.url;
    if (imageUrl) {
      const full = imageUrl.startsWith('http') ? imageUrl : `https://articles.nexuscale.ai${imageUrl}`;
      getOrCreateMetaTag('og:image', true).setAttribute('content', full);
      getOrCreateMetaTag('twitter:image').setAttribute('content', full);
    }
    if (updatedAt) {
      getOrCreateMetaTag('article:published_time').setAttribute('content', new Date(updatedAt).toISOString());
      getOrCreateMetaTag('article:modified_time').setAttribute('content', new Date(updatedAt).toISOString());
    }
    if (author) getOrCreateMetaTag('article:author').setAttribute('content', author);

    if (jsonLdRef.current) jsonLdRef.current.remove();
    const jsonLd = {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: title,
      description: description || `${title} - Nexuscale Case Study`,
      author: { '@type': 'Person', name: author },
      publisher: { '@type': 'Organization', name: 'Nexuscale', url: 'https://www.nexuscale.ai' },
      mainEntityOfPage: { '@type': 'WebPage', '@id': canonicalUrl },
    };
    if (updatedAt) {
      jsonLd.datePublished = new Date(updatedAt).toISOString();
      jsonLd.dateModified = new Date(updatedAt).toISOString();
    }
    if (imageUrl) jsonLd.image = imageUrl.startsWith('http') ? imageUrl : `https://articles.nexuscale.ai${imageUrl}`;
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(jsonLd);
    script.id = 'case-study-json-ld';
    jsonLdRef.current = script;
    document.head.appendChild(script);
    return () => {
      if (jsonLdRef.current) {
        jsonLdRef.current.remove();
        jsonLdRef.current = null;
      }
    };
  }, [study, slug]);

  if (isLoading) {
    return (
      <div className="pt-4 pb-20 min-h-screen bg-[#020203]">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <Link to="/case-studies" className="text-indigo-400 hover:text-indigo-300 text-sm inline-flex items-center gap-2 mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Case Studies
          </Link>
          <div className="bg-[#09090B]/50 border border-white/[0.08] rounded-2xl p-8 md:p-12 animate-pulse backdrop-blur-sm">
            <div className="h-10 bg-zinc-800 rounded w-3/4 mb-4" />
            <div className="h-8 bg-zinc-800 rounded w-2/3 mb-6" />
            <div className="h-4 bg-zinc-800 rounded w-32 mb-10" />
            <div className="h-96 bg-gradient-to-r from-zinc-800 via-zinc-700 to-zinc-800 rounded-xl" />
            <div className="mt-10 space-y-4">
              <div className="h-6 bg-zinc-800 rounded w-full" />
              <div className="h-6 bg-zinc-800 rounded w-5/6" />
              <div className="h-6 bg-zinc-800 rounded w-full" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="pt-4 pb-20 min-h-screen bg-[#020203] text-center">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <p className="text-red-400 text-lg mb-4">Failed to load case study.</p>
          <button type="button" onClick={() => refetch()} className="text-indigo-400 hover:text-indigo-300 underline transition-colors">
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!study) return null;

  const title = study.title;
  const content = study.content || study.body || '';
  const normalizedContent = typeof content === 'string' ? normalizeMarkdown(content) : '';
  const author = study.author;
  const updatedAt = study.updated_at || study.inserted_at;
  const readTime = study.read_time ?? study.readTime;

  return (
    <div className="pt-4 pb-20 min-h-screen bg-[#020203]">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <Link to="/case-studies" className="text-indigo-400 hover:text-indigo-300 text-sm inline-flex items-center gap-2 mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Back to Case Studies
        </Link>

        <article className="bg-[#09090B]/50 border border-white/[0.08] rounded-2xl p-8 md:p-12 backdrop-blur-sm">
          <header className="mb-10">
            <h1
              className="text-4xl md:text-5xl font-bold text-white mb-2 leading-tight"
              style={{
                background: `linear-gradient(120deg, ${accentColor} 20%, #ffffff 100%)`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              {title}
            </h1>
            <div className="text-zinc-400 text-sm mt-3 flex flex-wrap items-center gap-x-4 gap-y-1">
              {author && (
                <span className="font-medium text-zinc-300">
                  By {typeof author === 'string' ? author : author?.name ?? 'Nexuscale'}
                </span>
              )}
              {updatedAt && (
                <span>
                  {new Date(updatedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                </span>
              )}
              {typeof readTime === 'number' && <span>{readTime} min read</span>}
            </div>
          </header>

          <div className="markdown-content prose prose-invert max-w-none">
            {normalizedContent ? (
              <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
                {normalizedContent}
              </ReactMarkdown>
            ) : (
              <p className="text-zinc-400">No content available.</p>
            )}
          </div>
        </article>

        <MoreCaseStudies currentSlug={slug} />
      </div>
    </div>
  );
}

function MoreCaseStudies({ currentSlug }) {
  const { data } = useQuery({
    queryKey: ['case-studies', 1],
    queryFn: () => fetchCaseStudies(1, 6),
  });
  const entries = data?.entries || [];
  const others = entries.filter((e) => (e.slug || e.id) !== currentSlug).slice(0, 3);
  if (others.length === 0) return null;

  return (
    <div className="mt-16">
      <h2 className="text-3xl font-bold text-white mb-8">More Case Studies</h2>
      <div className="grid md:grid-cols-3 gap-6">
        {others.map((s) => (
          <CaseStudyCard key={s.id ?? s.slug} study={s} />
        ))}
      </div>
    </div>
  );
}

function CaseStudyCard({ study }) {
  const [imgErr, setImgErr] = useState(false);
  const title = study.title || study.name || 'Case Study';
  const slug = study.slug || study.id || 'untitled';
  const desc = (study.description || '').replace(/<[^>]+>/g, '').slice(0, 120);
  const imageUrl = study.image?.url || study.image;
  const showPlaceholder = !imageUrl || imgErr;

  return (
    <Link
      to={`/case-studies/${slug}`}
      className="group block bg-[#09090B]/50 border border-white/[0.08] rounded-xl hover:border-white/[0.12] transition-all duration-300 overflow-hidden backdrop-blur-sm"
    >
      <div className="relative w-full aspect-video overflow-hidden">
        {!showPlaceholder && imageUrl && (
          <img
            src={imageUrl.startsWith('/') ? `https://articles.nexuscale.ai${imageUrl}` : imageUrl}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            onError={() => setImgErr(true)}
          />
        )}
        {showPlaceholder && (
          <div className="w-full h-full flex items-center justify-center" style={{ backgroundColor: accentColor }}>
            <span className="text-white font-bold text-xl">Nexuscale</span>
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-bold text-lg text-white mb-2 line-clamp-2 group-hover:text-indigo-300 transition-colors">
          {title}
        </h3>
        {desc && <p className="text-sm text-zinc-400 line-clamp-2 leading-relaxed">{desc}</p>}
      </div>
    </Link>
  );
}
