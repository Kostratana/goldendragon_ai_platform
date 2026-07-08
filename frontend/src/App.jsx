import { Helmet } from 'react-helmet-async';
import AppRouter from './router/AppRouter';
import { TranslationProvider } from './services/translation';
import { getSeoData } from './config/seoConfig';
import { useLocation } from 'react-router-dom';

function AppContent() {
    const location = useLocation();
    const seoData = getSeoData(location.pathname);

    return (
        <>
            <Helmet>
                <title>{seoData.title}</title>
                <meta name="description" content={seoData.description} />
                <link rel="canonical" href={seoData.canonical} />
                
                {/* Open Graph */}
                <meta property="og:title" content={seoData.ogTitle} />
                <meta property="og:description" content={seoData.ogDescription} />
                <meta property="og:url" content={seoData.canonical} />
                <meta property="og:image" content={seoData.ogImage} />
                <meta property="og:type" content={seoData.ogType} />
                <meta property="og:site_name" content="Golden Dragon AI" />
                
                {/* Twitter Card */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={seoData.twitterTitle} />
                <meta name="twitter:description" content={seoData.twitterDescription} />
                <meta name="twitter:image" content={seoData.twitterImage} />
                
                {/* hreflang for multilingual support */}
                <link rel="alternate" hrefLang="en" href={seoData.canonical} />
                <link rel="alternate" hrefLang="ru" href={`https://www.goldendragonai.com/ru${location.pathname === '/' ? '' : location.pathname}`} />
                <link rel="alternate" hrefLang="es" href={`https://www.goldendragonai.com/es${location.pathname === '/' ? '' : location.pathname}`} />
                <link rel="alternate" hrefLang="fr" href={`https://www.goldendragonai.com/fr${location.pathname === '/' ? '' : location.pathname}`} />
                <link rel="alternate" hrefLang="de" href={`https://www.goldendragonai.com/de${location.pathname === '/' ? '' : location.pathname}`} />
                <link rel="alternate" hrefLang="it" href={`https://www.goldendragonai.com/it${location.pathname === '/' ? '' : location.pathname}`} />
                <link rel="alternate" hrefLang="x-default" href={seoData.canonical} />
                
                {/* Structured Data */}
                <script type="application/ld+json">
                    {JSON.stringify({
                        '@context': 'https://schema.org',
                        '@type': 'Organization',
                        'name': 'Golden Dragon AI',
                        'url': 'https://www.goldendragonai.com',
                        'logo': 'https://www.goldendragonai.com/favicon.png',
                        'description': 'Advanced AI orchestration platform with multimodal intelligence and intelligent automation.',
                        'founder': {
                            '@type': 'Person',
                            'name': 'Svetlana Rumyantseva'
                        },
                        'contactPoint': {
                            '@type': 'ContactPoint',
                            'contactType': 'Sales',
                            'email': 'srumyantseva7@gmail.com'
                        }
                    })}
                </script>
            </Helmet>
            <AppRouter />
        </>
    );
}

export default function App() {
    return (
        <TranslationProvider>
            <AppContent />
        </TranslationProvider>
    );
}
