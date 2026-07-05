export {
    CANONICAL_SOURCE_LANGUAGE,
    DEFAULT_LANGUAGE,
    LANGUAGE_LABELS,
    LANGUAGE_STORAGE_KEY,
    SUPPORTED_LANGUAGES,
    SUPPORTED_LANGUAGE_CODES,
    TARGET_LANGUAGE_CODES
} from "./constants.js";

export {
    BRAND_TERMS,
    isProtectedBrand,
    getSortedBrandTerms
} from "./brandRegistry.js";

export {
    translateTexts
} from "./translationApi.js";

export {
    getCachedTranslation,
    setCachedTranslation
} from "./translationCache.js";

export {
    interpolateValues,
    prepareTextForTranslation,
    finalizeTranslatedText
} from "./translationUtils.js";

export {
    TranslationProvider,
    Translate,
    T,
    useLanguage,
    useTranslate,
    useTranslatedText,
    getCurrentUserLanguage,
    resolveTranslation
} from "./LanguageContext.jsx";
