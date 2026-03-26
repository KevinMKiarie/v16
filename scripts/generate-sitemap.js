import axios from 'axios';
import { writeFileSync, readFileSync } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const API_URL = 'https://articles.nexuscale.ai';
const BASE_URL = 'https://www.nexuscale.ai';

// Static pages that should always be in the sitemap
const staticPages = [
  { url: '/', priority: '1.0', changefreq: 'weekly' },
  { url: '/pricing', priority: '0.8', changefreq: 'monthly' },
  { url: '/apis', priority: '0.8', changefreq: 'monthly' },
  { url: '/affiliate', priority: '0.7', changefreq: 'monthly' },
  { url: '/blogs', priority: '0.9', changefreq: 'weekly' },
  { url: '/privacy', priority: '0.5', changefreq: 'yearly' },
  { url: '/terms', priority: '0.5', changefreq: 'yearly' },
  { url: '/doctrine', priority: '0.7', changefreq: 'monthly' },
];

// Dynamically load feature and use case pages by parsing the files
function getDynamicPages() {
  const dynamicPages = [];
  
  try {
    // Load features by parsing the file
    const featuresPath = join(__dirname, '../src/data/features.js');
    const featuresContent = readFileSync(featuresPath, 'utf-8');
    const featuresMatch = featuresContent.match(/id:\s*['"]([^'"]+)['"]/g);
    if (featuresMatch) {
      featuresMatch.forEach(match => {
        const id = match.match(/['"]([^'"]+)['"]/)[1];
        dynamicPages.push({ url: `/${id}`, priority: '0.7', changefreq: 'monthly' });
      });
    }
  } catch (error) {
    console.warn('⚠️  Could not load features:', error.message);
  }

  try {
    // Load use cases by parsing the file
    const useCasesPath = join(__dirname, '../src/data/useCases.js');
    const useCasesContent = readFileSync(useCasesPath, 'utf-8');
    const useCasesMatch = useCasesContent.match(/id:\s*['"]([^'"]+)['"]/g);
    if (useCasesMatch) {
      useCasesMatch.forEach(match => {
        const id = match.match(/['"]([^'"]+)['"]/)[1];
        dynamicPages.push({ url: `/${id}`, priority: '0.7', changefreq: 'monthly' });
      });
    }
  } catch (error) {
    console.warn('⚠️  Could not load use cases:', error.message);
  }

  return dynamicPages;
}

async function fetchAllArticles() {
  try {
    console.log('📡 Fetching articles from API...');

    let allArticles = [];
    let currentPage = 1;
    let totalPages = 1;

    // Fetch pages sequentially to avoid overwhelming the server
    do {
      try {
        const response = await axios.get(`${API_URL}/api/blogs`, {
          headers: { 'accept': 'application/json' },
          params: { page: currentPage, per_page: 100 }, // Fetch 100 per page for efficiency
        });

        const responseData = response.data?.data;

        if (responseData && responseData.entries && Array.isArray(responseData.entries)) {
          allArticles = allArticles.concat(responseData.entries);
          totalPages = responseData.total_pages || 1;

          console.log(`✅ Fetched page ${currentPage}/${totalPages} (${responseData.entries.length} articles)`);
        } else {
          break; // No more data
        }

        currentPage++;

        // Add a small delay between requests to avoid rate limiting
        if (currentPage <= totalPages) {
          await new Promise(resolve => setTimeout(resolve, 100)); // 100ms delay
        }
      } catch (error) {
        console.warn(`⚠️  Failed to fetch page ${currentPage}:`, error.message);
        break;
      }
    } while (currentPage <= totalPages);

    console.log(`✅ Found ${allArticles.length} articles total`);
    return allArticles;
  } catch (error) {
    console.error('❌ Error fetching articles:', error.message);
    return [];
  }
}

function generateSitemap(articles) {
  const currentDate = new Date().toISOString().split('T')[0];
  
  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
`;

  // Add static pages
  staticPages.forEach((page) => {
    sitemap += `  <url>
    <loc>${BASE_URL}${page.url}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>
`;
  });

  // Add dynamic pages (features and use cases)
  const dynamicPages = getDynamicPages();
  dynamicPages.forEach((page) => {
    sitemap += `  <url>
    <loc>${BASE_URL}${page.url}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>
`;
  });

  // Add blog posts
  articles.forEach((article) => {
    if (article.slug) {
      const publishedDate = article.publishedAt || 
                           article.published_at || 
                           article.createdAt || 
                           article.created_at || 
                           currentDate;
      
      // Format date properly
      const lastmod = new Date(publishedDate).toISOString().split('T')[0];
      
      // Use /blogs/{slug} as per SEO requirements
      const blogUrl = `${BASE_URL}/blogs/${article.slug}`;
      
      sitemap += `  <url>
    <loc>${blogUrl}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
`;
    }
  });

  sitemap += `</urlset>`;

  return sitemap;
}

async function main() {
  console.log('🚀 Generating sitemap...\n');

  const articles = await fetchAllArticles();
  const dynamicPages = getDynamicPages();
  const sitemap = generateSitemap(articles);

  const outputPath = join(__dirname, '../public/sitemap.xml');
  writeFileSync(outputPath, sitemap, 'utf-8');

  const totalUrls = staticPages.length + dynamicPages.length + articles.filter(a => a.slug).length;

  console.log(`\n✅ Sitemap generated successfully!`);
  console.log(`   📄 Total URLs: ${totalUrls}`);
  console.log(`   📝 Static pages: ${staticPages.length}`);
  console.log(`   🔧 Dynamic pages (features/use cases): ${dynamicPages.length}`);
  console.log(`   📰 Blog posts: ${articles.filter(a => a.slug).length}`);
  console.log(`   📍 Saved to: ${outputPath}\n`);
}

main().catch((error) => {
  console.error('❌ Failed to generate sitemap:', error);
  console.warn('⚠️  Continuing build with existing sitemap...');
  process.exit(0);
});
