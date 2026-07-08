/**
 * SEO Configuration - Centralized metadata for all pages
 * Do NOT include keywords - they have no ranking impact
 */

const BASE_URL = 'https://www.goldendragonai.com';
const BRAND = 'Golden Dragon AI';
const AUTHOR = 'Svetlana Rumyantseva';

export const seoConfig = {
  '/': {
    title: 'Golden Dragon AI - Advanced AI Orchestration Platform',
    description: 'Advanced AI orchestration platform combining multimodal intelligence, voice AI, quantum-inspired reasoning, and intelligent automation systems.',
    canonical: `${BASE_URL}/`,
    ogTitle: 'Golden Dragon AI - Advanced AI Orchestration',
    ogDescription: 'Next-generation AI orchestration platform with multimodal processing and intelligent automation.',
    ogImage: `${BASE_URL}/favicon.png`,
    ogType: 'website',
    twitterTitle: 'Golden Dragon AI Platform',
    twitterDescription: 'Advanced multimodal AI systems and intelligent orchestration.',
    twitterImage: `${BASE_URL}/favicon.png`,
  },
  '/chat': {
    title: 'Dragon Chat - AI Assistant | Golden Dragon AI',
    description: 'Interactive AI assistant powered by Murzik. Get intelligent solutions, automated support, and AI-powered recommendations.',
    canonical: `${BASE_URL}/chat`,
    ogTitle: 'Dragon Chat - AI Assistant',
    ogDescription: 'Chat with Murzik - an advanced AI assistant for intelligent solutions and automation.',
    ogImage: `${BASE_URL}/favicon.png`,
    ogType: 'website',
    twitterTitle: 'Dragon Chat - AI Assistant',
    twitterDescription: 'Interactive AI chatbot with multimodal intelligence and real-time reasoning.',
    twitterImage: `${BASE_URL}/favicon.png`,
  },
  '/services': {
    title: 'AI Services & Development | Golden Dragon AI',
    description: 'Professional AI development services including consulting, custom AI models, LLM integration, computer vision, and enterprise AI solutions.',
    canonical: `${BASE_URL}/services`,
    ogTitle: 'AI Services & Development',
    ogDescription: 'Custom AI solutions from concept to production. AI consulting, development, and enterprise integration.',
    ogImage: `${BASE_URL}/favicon.png`,
    ogType: 'website',
    twitterTitle: 'AI Services & Development',
    twitterDescription: 'Professional AI development and consulting services for your business.',
    twitterImage: `${BASE_URL}/favicon.png`,
  },
  '/services/portfolio': {
    title: 'Portfolio - AI Projects | Golden Dragon AI',
    description: 'Explore our portfolio of AI projects including enterprise platforms, computer vision systems, optimization algorithms, and research initiatives.',
    canonical: `${BASE_URL}/services/portfolio`,
    ogTitle: 'AI Portfolio & Projects',
    ogDescription: 'Selected AI engineering projects demonstrating expertise in enterprise AI, computer vision, and optimization.',
    ogImage: `${BASE_URL}/favicon.png`,
    ogType: 'website',
    twitterTitle: 'AI Portfolio - Selected Projects',
    twitterDescription: 'Enterprise AI platforms, computer vision systems, and advanced ML solutions.',
    twitterImage: `${BASE_URL}/favicon.png`,
  },
  '/solutions': {
    title: 'AI Solutions Showcase | Golden Dragon AI',
    description: 'Research and innovation showcase. Explore proprietary AI technologies, intelligent systems, and next-generation products in development.',
    canonical: `${BASE_URL}/solutions`,
    ogTitle: 'AI Solutions & Research',
    ogDescription: 'Next-generation AI solutions and research projects combining advanced AI technologies.',
    ogImage: `${BASE_URL}/favicon.png`,
    ogType: 'website',
    twitterTitle: 'AI Solutions Showcase',
    twitterDescription: 'Proprietary AI technologies and intelligent systems currently in development.',
    twitterImage: `${BASE_URL}/favicon.png`,
  },
  '/solutions/health-support-ai': {
    title: 'Health Support AI | Food Safety Detection | Golden Dragon AI',
    description: 'AI-powered health analysis and food safety detection. Multimodal intelligence for detecting harmful additives and nutritional analysis.',
    canonical: `${BASE_URL}/solutions/health-support-ai`,
    ogTitle: 'Health Support AI',
    ogDescription: 'Advanced food safety and health analysis using multimodal AI intelligence.',
    ogImage: `${BASE_URL}/favicon.png`,
    ogType: 'website',
    twitterTitle: 'Health Support AI',
    twitterDescription: 'Food safety detection and nutritional analysis powered by AI.',
    twitterImage: `${BASE_URL}/favicon.png`,
  },
  '/solutions/animal-health': {
    title: 'Equine Health AI | Horse Pain Detection | Golden Dragon AI',
    description: 'Veterinary AI for equine health. Detect pain, inflammation, stress, and behavioral anomalies in horses using computer vision.',
    canonical: `${BASE_URL}/solutions/animal-health`,
    ogTitle: 'Equine Health AI',
    ogDescription: 'Veterinary intelligence for horse health monitoring and pain detection.',
    ogImage: `${BASE_URL}/favicon.png`,
    ogType: 'website',
    twitterTitle: 'Equine Health AI',
    twitterDescription: 'AI-powered horse health analysis and pain detection system.',
    twitterImage: `${BASE_URL}/favicon.png`,
  },
  '/solutions/underwater-ai': {
    title: 'Underwater Inspection AI | Marine Visual Analysis | Golden Dragon AI',
    description: 'Computer vision system for underwater inspection and structural analysis. Advanced visual recognition for subsea environments.',
    canonical: `${BASE_URL}/solutions/underwater-ai`,
    ogTitle: 'Underwater Inspection AI',
    ogDescription: 'Advanced AI system for underwater inspection and visual analysis in marine environments.',
    ogImage: `${BASE_URL}/favicon.png`,
    ogType: 'website',
    twitterTitle: 'Underwater Inspection AI',
    twitterDescription: 'Computer vision for underwater inspection and structural analysis.',
    twitterImage: `${BASE_URL}/favicon.png`,
  },
  '/solutions/quantum-trading-ai': {
    title: 'Quantum Trading AI | Financial Intelligence | Golden Dragon AI',
    description: 'Quantum-inspired AI for financial markets and trading. Advanced reasoning system for quantitative finance and market analysis.',
    canonical: `${BASE_URL}/solutions/quantum-trading-ai`,
    ogTitle: 'Quantum Trading AI',
    ogDescription: 'Quantum-inspired AI system for advanced financial market analysis and trading insights.',
    ogImage: `${BASE_URL}/favicon.png`,
    ogType: 'website',
    twitterTitle: 'Quantum Trading AI',
    twitterDescription: 'Advanced AI for quantitative finance and market analysis.',
    twitterImage: `${BASE_URL}/favicon.png`,
  },
  '/solutions/luxury-concierge-ai': {
    title: 'Luxury Concierge AI | Premium Services | Golden Dragon AI',
    description: 'AI-powered luxury concierge platform. Personalized service automation and intelligent assistant for premium experiences.',
    canonical: `${BASE_URL}/solutions/luxury-concierge-ai`,
    ogTitle: 'Luxury Concierge AI',
    ogDescription: 'Premium AI concierge service with personalized intelligence and service automation.',
    ogImage: `${BASE_URL}/favicon.png`,
    ogType: 'website',
    twitterTitle: 'Luxury Concierge AI',
    twitterDescription: 'AI-powered luxury service platform with personalized intelligence.',
    twitterImage: `${BASE_URL}/favicon.png`,
  },
  '/news': {
    title: 'News & Updates | Golden Dragon AI',
    description: 'Latest updates, research announcements, product releases, and development news from Golden Dragon AI Studio.',
    canonical: `${BASE_URL}/news`,
    ogTitle: 'News & Updates',
    ogDescription: 'Latest news, research, and updates from Golden Dragon AI Studio.',
    ogImage: `${BASE_URL}/favicon.png`,
    ogType: 'website',
    twitterTitle: 'News & Updates',
    twitterDescription: 'Latest AI research and product development news.',
    twitterImage: `${BASE_URL}/favicon.png`,
  },
};

export function getSeoData(pathname) {
  return seoConfig[pathname] || seoConfig['/'];
}

export function getAllRoutes() {
  return Object.keys(seoConfig);
}

export const SITE_NAME = BRAND;
export const SITE_URL = BASE_URL;
export const SITE_AUTHOR = AUTHOR;
