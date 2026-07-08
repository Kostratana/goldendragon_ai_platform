#!/usr/bin/env node

/**
 * Sitemap Generator
 * Автоматически генерирует sitemap.xml на основе маршрутов
 */

const fs = require('fs');
const path = require('path');

const BASE_URL = 'https://www.goldendragonai.com';

const ROUTES = [
  { path: '/', changefreq: 'weekly', priority: '1.0' },
  { path: '/chat', changefreq: 'weekly', priority: '0.9' },
  { path: '/services', changefreq: 'weekly', priority: '0.9' },
  { path: '/services/portfolio', changefreq: 'monthly', priority: '0.8' },
  { path: '/solutions', changefreq: 'monthly', priority: '0.8' },
  { path: '/solutions/health-support-ai', changefreq: 'monthly', priority: '0.7' },
  { path: '/solutions/animal-health', changefreq: 'monthly', priority: '0.7' },
  { path: '/solutions/underwater-ai', changefreq: 'monthly', priority: '0.7' },
  { path: '/solutions/quantum-trading-ai', changefreq: 'monthly', priority: '0.7' },
  { path: '/solutions/luxury-concierge-ai', changefreq: 'monthly', priority: '0.7' },
  { path: '/news', changefreq: 'weekly', priority: '0.6' },
];

const today = new Date().toISOString().split('T')[0];

function generateSitemapXML() {
  const urlEntries = ROUTES.map(route => `  <url>
    <loc>${BASE_URL}${route.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`).join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlEntries}
</urlset>
`;
}

function main() {
  try {
    const sitemapPath = path.join(__dirname, '..', 'frontend', 'public', 'sitemap.xml');
    const sitemapContent = generateSitemapXML();
    
    fs.writeFileSync(sitemapPath, sitemapContent, 'utf-8');
    console.log(`✅ Sitemap generated: ${sitemapPath}`);
    console.log(`   Routes: ${ROUTES.length}`);
    console.log(`   Last modified: ${today}`);
  } catch (error) {
    console.error('❌ Error generating sitemap:', error.message);
    process.exit(1);
  }
}

main();
