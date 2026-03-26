import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';
import { Section } from '../components/ui/Section';
import { accentColor, accentColorEnd } from '../constants/theme';
import { useQuery } from '@tanstack/react-query';
import { fetchCaseStudies } from '../lib/queryClient';

const PER_PAGE = 10;

const extractText = (obj, fallback = '') => {
  if (typeof obj === 'string') return obj;
  if (obj && typeof obj === 'object') {
    return obj.text || obj.content || obj.body || obj.name || obj.title || obj.label || obj.slug || fallback;
  }
  return fallback;
};

const CaseStudyCard = ({ study, large = false, count = null }) => {
  const [imageError, setImageError] = useState(false);
  if (!study) return null;

  const imageUrl = study.image?.url || study.image || study.coverImage || study.cover?.url;
  const showPlaceholder = !imageUrl || imageError;
  const author = extractText(study.author, 'Nexuscale Team') || 'Nexuscale Team';
  const readTime = study.read_time ?? study.readTime;
  const readTimeStr = typeof readTime === 'number' ? `${readTime} min read` : null;
  const description = study.description || study.excerpt || study.summary || '';
  const descText = extractText(description);
  const snippet = descText ? descText.replace(/<[^>]+>/g, '').slice(0, 200) : 'Read more about this case study...';
  const title = study.title || study.name || 'Untitled Case Study';
  const slug = study.slug || study.id || 'untitled';

  return (
    <Link to={`/case-studies/${slug}`} className="block h-full">
      <div className="flex flex-col h-full cursor-pointer bg-[#09090B]/50 backdrop-blur-sm rounded-2xl border border-white/[0.08] hover:border-white/[0.12] transition-all duration-300 overflow-hidden group">
        <div className="relative w-full aspect-[16/9] overflow-hidden rounded-t-2xl">
          {!showPlaceholder && imageUrl && (
            <img
              src={imageUrl.startsWith('/') ? `https://articles.nexuscale.ai${imageUrl}` : imageUrl}
              alt={title}
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              onError={() => setImageError(true)}
            />
          )}
          {showPlaceholder && (
            <div
              className="absolute inset-0 w-full h-full flex items-center justify-center"
              style={{ backgroundColor: accentColor }}
            >
              <span className="text-white font-bold text-2xl md:text-3xl">Nexuscale</span>
            </div>
          )}
        </div>
        <div className="flex flex-col flex-grow p-6">
          {count !== null && (
            <div className="flex items-center justify-between mb-2">
              <div className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/[0.08] flex-shrink-0">
                <span className="text-sm font-bold text-indigo-400">{count}</span>
              </div>
            </div>
          )}
          <h3 className={`font-bold text-white mb-3 group-hover:text-indigo-300 transition-colors ${large ? 'text-2xl' : 'text-xl'}`}>
            {title}
          </h3>
          <p className="text-zinc-400 text-base leading-relaxed mb-4 flex-grow">{snippet}</p>
          <div className="text-sm text-zinc-500 flex items-center justify-between">
            <span>By {author}</span>
            {readTimeStr && <span>{readTimeStr}</span>}
          </div>
        </div>
      </div>
    </Link>
  );
};

const SkeletonCard = () => (
  <div className="flex flex-col h-full bg-[#09090B]/50 backdrop-blur-sm rounded-2xl border border-white/[0.08] overflow-hidden animate-pulse">
    <div className="relative w-full aspect-[16/9] rounded-t-2xl bg-gradient-to-r from-zinc-800 via-zinc-700 to-zinc-800" />
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

export default function CaseStudiesPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = parseInt(searchParams.get('page') || '1', 10);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['case-studies', currentPage],
    queryFn: () => fetchCaseStudies(currentPage, PER_PAGE),
    retry: 1,
    retryDelay: 1000,
  });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  const entries = data?.entries || [];
  const totalPages = data?.total_pages || 1;
  const featured = currentPage === 1 && entries.length > 0 ? entries[0] : null;
  const rest = currentPage === 1 ? entries.slice(1) : entries;

  const handlePageChange = (newPage) => {
    setSearchParams({ page: newPage.toString() });
  };

  return (
    <div className="min-h-screen bg-[#020203]">
      <main className="max-w-6xl mx-auto px-6 pt-4 pb-20 sm:pb-32 relative z-10">
        <Section className="mb-8 md:mb-10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div>
              <h1
                className="text-4xl md:text-6xl font-extrabold mb-2 leading-tight tracking-tight"
                style={{
                  background: `linear-gradient(120deg, ${accentColor} 20%, #ffffff 100%)`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Case Studies
              </h1>
              <p className="text-base md:text-lg leading-relaxed text-zinc-400">
                Real results from teams using Nexuscale for outbound growth.
              </p>
            </div>
          </div>
        </Section>

        {isLoading ? (
          <>
            <Section className="mb-8 md:mb-10">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Featured</h2>
              <SkeletonCard />
            </Section>
            <Section>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">More Case Studies</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <SkeletonCard key={i} />
                ))}
              </div>
            </Section>
          </>
        ) : isError ? (
          <Section className="mb-8 md:mb-10">
            <div className="text-center py-8">
              <p className="text-red-400 mb-4">Failed to load case studies</p>
              {error && <p className="text-zinc-500 text-sm mt-2">{error.message || 'Please try again later'}</p>}
            </div>
          </Section>
        ) : entries.length === 0 ? (
          <Section className="mb-8 md:mb-10">
            <div className="text-center py-8">
              <p className="text-zinc-400">No case studies found.</p>
            </div>
          </Section>
        ) : (
          <>
            {featured && (
              <Section className="mb-8 md:mb-10">
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Featured</h2>
                <CaseStudyCard study={featured} large count={1} />
              </Section>
            )}
            {rest.length > 0 && (
              <Section>
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">More Case Studies</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {rest.map((study, index) => {
                    if (!study) return null;
                    const num = currentPage === 1 ? index + 2 : (currentPage - 1) * PER_PAGE + index + 1;
                    return (
                      <CaseStudyCard
                        key={study.id ?? study.slug ?? `study-${num}`}
                        study={study}
                        count={num}
                      />
                    );
                  })}
                </div>
                {totalPages > 1 && (
                  <div className="flex items-center justify-center gap-4 mt-12">
                    <button
                      type="button"
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="flex items-center gap-2 px-4 py-2 bg-[#09090B]/50 border border-white/[0.08] text-zinc-300 rounded-full hover:bg-white/[0.05] hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      Previous
                    </button>
                    <span className="flex items-center gap-2 px-4 text-zinc-400">
                      <span className="font-medium">Page {currentPage}</span>
                      <span className="text-zinc-600">of</span>
                      <span className="font-medium">{totalPages}</span>
                    </span>
                    <button
                      type="button"
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage >= totalPages}
                      className="flex items-center gap-2 px-4 py-2 text-white rounded-full hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition"
                      style={{
                        background: `linear-gradient(120deg, ${accentColor}, ${accentColorEnd})`,
                      }}
                    >
                      Next
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </Section>
            )}
          </>
        )}
      </main>
    </div>
  );
}
