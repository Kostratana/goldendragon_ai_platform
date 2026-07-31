/**
 * SEO Configuration - Centralized metadata for all pages
 * Do NOT include keywords - they have no ranking impact
 */

const BASE_URL = 'https://www.goldendragonai.com';
const BRAND = 'Golden Dragon AI';
const AUTHOR = 'Svetlana Rumyantseva';

export const seoConfig = {
  '/': {
    title: 'AI Development Company | Custom AI Solutions | Golden Dragon AI',
    description: 'Explore Golden Dragon AI, an advanced platform for multimodal intelligence, voice AI, intelligent automation, and sophisticated AI orchestration systems.',
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
    title: 'AI Project Assistant & Strategy Chat | Golden Dragon AI',
    description: 'Chat with Murzik, an interactive AI assistant delivering intelligent guidance, responsive support, and practical AI-powered recommendations in real time.',
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
    title: 'AI Consulting & Development Services | Golden Dragon AI',
    description: 'Discover professional AI services for custom models, LLM integration, computer vision, intelligent automation, consulting, and enterprise implementation.',
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
    title: 'AI Development Portfolio & Projects | Golden Dragon AI',
    description: 'Explore selected AI projects spanning enterprise platforms, computer vision, intelligent automation, optimization systems, and applied research initiatives.',
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
    title: 'Industry AI Solutions & Products | Golden Dragon AI',
    description: 'Explore Golden Dragon AI solutions, proprietary technologies, intelligent systems, and next-generation products designed for complex real-world challenges.',
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
    title: 'Food Safety & Health Support AI | Golden Dragon AI',
    description: 'Explore AI-powered health support and food safety analysis using multimodal intelligence to identify harmful additives and assess nutritional information.',
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
    title: 'Equine Health & Horse Pain Detection AI | Golden Dragon AI',
    description: 'Discover equine health AI that uses computer vision to help identify pain, inflammation, stress, and behavioral anomalies in horses with greater clarity.',
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
    title: 'Underwater Inspection & Marine AI | Golden Dragon AI',
    description: 'Explore underwater inspection AI for marine visual analysis, structural assessment, and advanced computer vision across challenging subsea environments.',
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
    title: 'Quantum Trading & Financial Market AI | Golden Dragon AI',
    description: 'Discover quantum-inspired trading AI for quantitative finance, advanced market analysis, financial reasoning, and intelligent decision support for investors.',
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
    title: 'Luxury Concierge & Personalization AI | Golden Dragon AI',
    description: 'Explore an AI-powered luxury concierge platform delivering personalized assistance, intelligent service automation, and premium customer experiences at scale.',
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
    title: 'AI Research, Product News & Updates | Golden Dragon AI',
    description: 'Read the latest Golden Dragon AI news, including research announcements, product developments, platform updates, and insights from ongoing AI innovation work.',
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
