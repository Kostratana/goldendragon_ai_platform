import {
    getSortedBrandTerms
} from "./brandRegistry.js";

export function interpolateValues(
    template,
    values
) {

    if (
        !template ||
        !values
    ) {
        return template;
    }

    return template.replace(
        /\{\{(\w+)\}\}/g,
        (
            _,
            key
        ) => {

            const value =
                values[key];

            if (
                value ===
                    undefined ||
                value ===
                    null
            ) {
                return "";
            }

            return String(value);
        }
    );
}

export function protectPlaceholders(
    text
) {

    const placeholders = {};

    let index = 0;

    const protectedText =
        text.replace(
            /\{\{(\w+)\}\}/g,
            (match) => {

                const token =
                    `__GD_PH_${index}__`;

                placeholders[token] =
                    match;

                index += 1;

                return token;
            }
        );

    return {
        text: protectedText,
        placeholders
    };
}

export function restorePlaceholders(
    text,
    placeholders
) {

    let restored = text;

    Object.entries(
        placeholders
    ).forEach(
        ([
            token,
            original
        ]) => {

            restored =
                restored.replaceAll(
                    token,
                    original
                );
        }
    );

    return restored;
}

export function protectBrands(
    text
) {

    const brands = {};

    let protectedText = text;

    let index = 0;

    const SORTED_BRAND_TERMS =
        getSortedBrandTerms();

    SORTED_BRAND_TERMS.forEach(
        (brand) => {

            if (
                !protectedText.includes(
                    brand
                )
            ) {
                return;
            }

            const token =
                `__GD_BR_${index}__`;

            brands[token] = brand;

            index += 1;

            protectedText =
                protectedText.replaceAll(
                    brand,
                    token
                );
        }
    );

    return {
        text: protectedText,
        brands
    };
}

export function restoreBrands(
    text,
    brands
) {

    let restored = text;

    Object.entries(
        brands
    ).forEach(
        ([
            token,
            brand
        ]) => {

            restored =
                restored.replaceAll(
                    token,
                    brand
                );
        }
    );

    return restored;
}

export function prepareTextForTranslation(
    text
) {

    const {
        text: withProtectedPlaceholders,
        placeholders
    } = protectPlaceholders(
        text
    );

    const {
        text: preparedText,
        brands
    } = protectBrands(
        withProtectedPlaceholders
    );

    return {
        preparedText,
        placeholders,
        brands
    };
}

const RUSSIAN_TERM_REPLACEMENTS = [
    ["AI-решение", "ИИ-решение"],
    ["AI-решения", "ИИ-решения"],
    ["AI-систем", "ИИ-систем"],
    ["AI-система", "ИИ-система"],
    ["AI-платформа", "ИИ-платформа"],
    ["AI-платформы", "ИИ-платформы"],
    ["AI-агентов", "ИИ-агентов"],
    ["AI-агенты", "ИИ-агенты"],
    ["AI-ассистент", "ИИ-ассистент"],
    ["AI-ассистентов", "ИИ-ассистентов"],
    ["AI-инженерные", "ИИ-инженерные"],
    ["мультимодального AI", "мультимодального ИИ"],
    ["корпоративные AI", "корпоративного ИИ"],
    ["enterprise AI", "корпоративного ИИ"],
    ["production-платформ", "промышленных платформ"],
    ["production-платформы", "промышленные платформы"],
    ["Enterprise мультимодальный ИИ Platforms (NDA)", "Корпоративные мультимодальные ИИ-платформы (NDA)"],
    ["Enterprise Multimodal AI Platforms (NDA)", "Корпоративные мультимодальные ИИ-платформы (NDA)"],
    ["AI-powered", "на базе ИИ"],
    ["AI-assisted", "с поддержкой ИИ"],
    ["AI-driven", "на базе ИИ"],
    ["Artificial Intelligence", "искусственный интеллект"],
    ["artificial intelligence", "искусственного интеллекта"],
    ["Computer Vision", "компьютерное зрение"],
    ["computer vision", "компьютерного зрения"],
    ["Deep Learning", "глубокое обучение"],
    ["Machine Learning", "машинное обучение"],
    ["machine learning", "машинное обучение"],
    ["Large Language Models", "большие языковые модели"],
    ["language models", "языковые модели"],
    ["Knowledge Graphs", "графы знаний"],
    ["Semantic Search", "семантический поиск"],
    ["semantic search", "семантический поиск"],
    ["Recommendation Systems", "рекомендательные системы"],
    ["recommendation systems", "рекомендательные системы"],
    ["recommendation models", "рекомендательные модели"],
    ["Personalized AI Assistants", "персонализированные ИИ-ассистенты"],
    ["Intelligent Product Discovery", "интеллектуальный поиск продуктов"],
    ["Multimodal AI", "мультимодальный ИИ"],
    ["multimodal AI", "мультимодальный ИИ"],
    ["multimodal intelligence", "мультимодального интеллекта"],
    ["multimodal analysis", "мультимодальный анализ"],
    ["Multimodal Commerce Intelligence", "мультимодальная коммерческая аналитика"],
    ["Retrieval-Augmented Generation", "генерация с дополненным поиском"],
    ["Product Discovery", "поиск продуктов"],
    ["product discovery", "поиск продуктов"],
    ["Product knowledge pipeline", "конвейер знаний о продуктах"],
    ["Intelligent product knowledge base", "интеллектуальная база знаний о продуктах"],
    ["Semantic search pipeline", "конвейер семантического поиска"],
    ["Personalized recommendation engine", "персонализированный рекомендательный движок"],
    ["Google Cloud backend", "backend на Google Cloud"],
    ["Supabase database", "база данных Supabase"],
    ["AI orchestration", "оркестрация ИИ"],
    ["Prompt system", "система промптов"],
    ["healthcare assistant", "медицинский ассистент"],
    ["preventive healthcare", "профилактическое здравоохранение"],
    ["health profile", "профиль здоровья"],
    ["health insights", "выводы о здоровье"],
    ["nutritional intelligence", "нутрициологическая аналитика"],
    ["food recognition", "распознавание продуктов"],
    ["ingredient analysis", "анализ ингредиентов"],
    ["health assessment", "оценку здоровья"],
    ["body symmetry", "симметрию тела"],
    ["movement analysis", "анализ движений"],
    ["infrared imaging", "инфракрасной визуализации"],
    ["Robotics-Oriented Inspection", "роботизированная инспекция"],
    ["robotics-oriented inspection workflows", "роботизированные инспекционные процессы"],
    ["Underwater Image Analysis", "анализ подводных изображений"],
    ["Object Detection", "обнаружение объектов"],
    ["object detection", "обнаружение объектов"],
    ["Image Segmentation", "сегментация изображений"],
    ["image segmentation", "сегментация изображений"],
    ["Anomaly Detection", "обнаружение аномалий"],
    ["Corrosion Assessment", "оценка коррозии"],
    ["Predictive Maintenance", "предиктивное обслуживание"],
    ["predictive maintenance", "предиктивное обслуживание"],
    ["Autonomous Inspection Pipelines", "автономные инспекционные конвейеры"],
    ["inspection pipelines", "инспекционные конвейеры"],
    ["Marine inspection knowledge pipeline", "конвейер знаний для морской инспекции"],
    ["proprietary algorithms", "собственные алгоритмы"],
    ["datasets", "наборы данных"],
    ["roadmap", "дорожная карта"],
    ["Non-Disclosure Agreements", "соглашения о неразглашении"],
    ["Proprietary AI research platform", "Собственная исследовательская ИИ-платформа"],
    ["proprietary research platform", "собственная исследовательская платформа"],
    ["quantitative market intelligence", "количественная рыночная аналитика"],
    ["algorithmic decision support", "алгоритмическая поддержка решений"],
    ["quantitative financial modeling", "количественное финансовое моделирование"],
    ["real-time", "в реальном времени"],
    ["statistical modeling", "статистическое моделирование"],
    ["AI reasoning", "рассуждение ИИ"],
    ["research environment", "исследовательская среда"],
    ["AI models", "модели ИИ"],
    ["analytical pipelines", "аналитические конвейеры"],
    ["live market activity", "рыночную активность в реальном времени"],
    ["liquidity dynamics", "динамику ликвидности"],
    ["order flow", "поток ордеров"],
    ["market structure", "структуры рынка"],
    ["market confidence", "рыночную уверенность"],
    ["intelligent decision making", "интеллектуальное принятие решений"],
    ["analytical reasoning", "аналитическое рассуждение"],
    ["prediction model", "прогнозной модели"],
    ["adaptive statistical models", "адаптивные статистические модели"],
    ["probabilistic analysis", "вероятностный анализ"],
    ["reinforcement learning concepts", "концепции обучения с подкреплением"],
    ["scoring mechanisms", "механизмы оценки"],
    ["explainability", "объяснимость"],
    ["ongoing research", "текущие исследования"],
    ["quantum-inspired optimization methods", "квантово-вдохновленные методы оптимизации"],
    ["advanced computational approaches", "продвинутые вычислительные подходы"],
    ["quantum technologies", "квантовые технологии"],
    ["optimization", "оптимизацию"],
    ["portfolio analysis", "анализ портфеля"],
    ["market computations", "рыночные вычисления"],
    ["multi-layer research platform", "многоуровневая исследовательская платформа"],
    ["analytical modules", "аналитические модули"],
    ["advanced research components", "продвинутые исследовательские компоненты"],
    ["private concierge platform", "частная concierge-платформа"],
    ["частная concierge-платформа", "частная консьерж-платформа"],
    ["Private AI concierge", "Частный ИИ-консьерж"],
    ["AI concierge", "ИИ-консьерж"],
    ["luxury products", "люксовые продукты"],
    ["luxury shopping", "люксового шопинга"],
    ["lifestyle services", "lifestyle-сервисов"],
    ["lifestyle-сервисов", "сервисов премиального образа жизни"],
    ["concierge technologies", "concierge-технологии"],
    ["premium shopping experiences", "премиальный покупательский опыт"],
    ["luxury markets", "люксовым рынкам"],
    ["traditional shopping", "традиционный шопинг"],
    ["fashion collections", "модные коллекции"],
    ["limited editions", "лимитированные издания"],
    ["emerging designers", "новые дизайнеры"],
    ["luxury boutiques", "люксовые бутики"],
    ["fine jewelry", "ювелирные украшения"],
    ["luxury watches", "люксовые часы"],
    ["collectibles", "предметы коллекционирования"],
    ["historical artifacts", "исторические артефакты"],
    ["one-of-a-kind objects", "уникальные предметы"],
    ["search results", "результатов поиска"],
    ["personalized recommendations", "персонализированные рекомендации"],
    ["highly personalized recommendations", "точно персонализированные рекомендации"],
    ["authenticity", "подлинности"],
    ["intelligent sourcing", "интеллектуальный поиск поставщиков"],
    ["authenticated luxury marketplaces", "проверенные люксовые маркетплейсы"],
    ["private collectors", "частных коллекционеров"],
    ["premium concierge services", "премиальные concierge-сервисы"],
    ["concierge-сервисы", "консьерж-сервисы"],
    ["personalized acquisition assistance", "персонализированное сопровождение покупки"],
    ["advanced personalization", "расширенную персонализацию"],
    ["authenticated luxury verification", "проверку подлинности люксовых товаров"],
    ["multimodal product understanding", "мультимодальное понимание продуктов"],
    ["premium AI lifestyle services", "премиальные lifestyle-сервисы на базе ИИ"],
    ["platform architecture", "архитектура платформы"],
    ["supplier intelligence", "аналитика поставщиков"],
    ["search technologies", "поисковые технологии"],
    ["intelligent search", "интеллектуальный поиск"],
    ["AI-powered concierge services", "concierge-сервисы на базе ИИ"],
    ["exclusivity", "эксклюзивность"],
    ["premium customer experience", "премиальный клиентский опыт"],
    ["production-grade", "промышленного уровня"],
    ["enterprise", "корпоративные"],
    ["production deployment", "промышленное развертывание"],
    ["production inference pipelines", "промышленные конвейеры инференса"],
    ["dataset engineering", "подготовка наборов данных"],
    ["synthetic data generation", "генерация синтетических данных"],
    ["fine-tuning", "дообучение"],
    ["deployment", "развертывание"],
    ["production-ready", "готовую к промышленному запуску"],
    ["marketplace analytics", "аналитики маркетплейсов"],
    ["workflow automation", "автоматизации процессов"],
    ["Go backend", "backend на Go"],
    ["e-commerce", "электронной коммерции"],
    ["sales analytics", "аналитики продаж"],
    ["advertising optimization", "оптимизации рекламы"],
    ["inventory management", "управления запасами"],
    ["demand forecasting", "прогнозирования спроса"],
    ["customer review analysis", "анализа отзывов клиентов"],
    ["recommendation pipelines", "рекомендательных конвейеров"],
    ["pose estimation", "оценки позы"],
    ["temporal event detection", "обнаружение временных событий"],
    ["respiratory audio analysis", "анализ дыхательного аудио"],
    ["judging workflows", "сценарии судейства"],
    ["decision-support", "поддержки решений"],
    ["vehicle routing", "маршрутизации транспорта"],
    ["truck loading", "загрузки грузовиков"],
    ["Operations Research", "исследования операций"],
    ["optimization algorithms", "алгоритмами оптимизации"],
    ["fleet utilization", "использования автопарка"],
    ["cargo allocation", "распределения груза"],
    ["airport security screening", "досмотра безопасности аэропорта"],
    ["X-ray", "рентгеновских"],
    ["image preprocessing", "предобработку изображений"],
    ["model training", "обучение моделей"],
    ["evaluation", "оценку"],
    ["security inspection workflows", "процессы проверки безопасности"]
];

export function normalizeRussianTranslation(
    text
) {

    if (!text) {
        return text;
    }

    return RUSSIAN_TERM_REPLACEMENTS.reduce(
        (
            current,
            [
                source,
                replacement
            ]
        ) =>
            current.replaceAll(
                source,
                replacement
            ),
        text
    );
}

export function finalizeTranslatedText(
    translatedText,
    placeholders,
    brands,
    values,
    language = null
) {

    const withBrands =
        restoreBrands(
            translatedText,
            brands
        );

    const withPlaceholders =
        restorePlaceholders(
            withBrands,
            placeholders
        );

    const withValues =
        interpolateValues(
            withPlaceholders,
            values
        );

    if (language === "ru") {
        return normalizeRussianTranslation(
            withValues
        );
    }

    return withValues;
}
