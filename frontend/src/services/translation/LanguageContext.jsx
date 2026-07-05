import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState
} from "react";

import {
    DEFAULT_LANGUAGE,
    LANGUAGE_LABELS,
    LANGUAGE_STORAGE_KEY,
    SUPPORTED_LANGUAGES
} from "./constants.js";

import {
    getCachedTranslation,
    setCachedTranslation
} from "./translationCache.js";

import {
    translateTexts
} from "./translationApi.js";

import {
    childrenToTranslatable
} from "./translateContent.js";

import {
    finalizeTranslatedText,
    interpolateValues,
    prepareTextForTranslation
} from "./translationUtils.js";

const LanguageContext =
    createContext(null);

function readStoredLanguage() {

    try {

        const stored =
            localStorage.getItem(
                LANGUAGE_STORAGE_KEY
            );

        if (
            stored &&
            LANGUAGE_LABELS[stored]
        ) {
            return stored;
        }

    } catch (error) {

        console.warn(
            "Unable to read stored language:",
            error
        );
    }

    return DEFAULT_LANGUAGE;
}

export function resolveTranslation(
    language,
    template,
    values = null
) {

    if (
        !template ||
        language ===
            DEFAULT_LANGUAGE
    ) {
        return interpolateValues(
            template,
            values
        );
    }

    const cached =
        getCachedTranslation(
            language,
            template
        );

    if (
        typeof cached ===
        "string"
    ) {
        return finalizeTranslatedText(
            cached,
            {},
            {},
            values
        );
    }

    return interpolateValues(
        template,
        values
    );
}

export function TranslationProvider({
    children
}) {

    const [language, setLanguageState] =
        useState(readStoredLanguage);

    const [isTranslating, setIsTranslating] =
        useState(false);

    const persistLanguage =
        useCallback(
            (nextLanguage) => {

                try {

                    localStorage.setItem(
                        LANGUAGE_STORAGE_KEY,
                        nextLanguage
                    );

                } catch (error) {

                    console.warn(
                        "Unable to store language:",
                        error
                    );
                }
            },
            []
        );

    const setLanguage =
        useCallback(
            (nextLanguage) => {

                if (
                    !LANGUAGE_LABELS[
                        nextLanguage
                    ]
                ) {
                    return;
                }

                setLanguageState(
                    nextLanguage
                );

                persistLanguage(
                    nextLanguage
                );
            },
            [persistLanguage]
        );

    const translateText =
        useCallback(
            async (
                template,
                values = null
            ) => {

                if (
                    !template ||
                    language ===
                        DEFAULT_LANGUAGE
                ) {
                    return interpolateValues(
                        template,
                        values
                    );
                }

                const cached =
                    getCachedTranslation(
                        language,
                        template
                    );

                if (
                    typeof cached ===
                    "string"
                ) {
                    return finalizeTranslatedText(
                        cached,
                        {},
                        {},
                        values
                    );
                }

                const {
                    preparedText,
                    placeholders,
                    brands
                } =
                    prepareTextForTranslation(
                        template
                    );

                setIsTranslating(true);

                try {

                    const [translated] =
                        await translateTexts(
                            [
                                preparedText
                            ],
                            language,
                            [
                                template
                            ]
                        );

                    setCachedTranslation(
                        language,
                        template,
                        finalizeTranslatedText(
                            translated,
                            placeholders,
                            brands,
                            null
                        )
                    );

                    return finalizeTranslatedText(
                        translated,
                        placeholders,
                        brands,
                        values
                    );

                } finally {

                    setIsTranslating(
                        false
                    );
                }
            },
            [language]
        );

    const value =
        useMemo(
            () => ({

                language,

                languageLabel:
                    LANGUAGE_LABELS[
                        language
                    ] ||

                    LANGUAGE_LABELS[
                        DEFAULT_LANGUAGE
                    ],

                supportedLanguages:
                    SUPPORTED_LANGUAGES,

                isTranslating,

                setLanguage,

                translateText,

                currentUserLanguage:
                    language
            }),
            [
                language,
                isTranslating,
                setLanguage,
                translateText
            ]
        );

    return (
        <LanguageContext.Provider
            value={value}
        >
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {

    const context =
        useContext(
            LanguageContext
        );

    if (!context) {

        throw new Error(
            "useLanguage must be used within TranslationProvider"
        );
    }

    return context;
}

export function useTranslate() {

    const {
        language,
        translateText,
        currentUserLanguage
    } = useLanguage();

    const tSync =
        useCallback(
            (
                template,
                values = null
            ) =>
                resolveTranslation(
                    language,
                    template,
                    values
                ),
            [language]
        );

    return {
        language,
        currentUserLanguage,
        t: translateText,
        tSync
    };
}

export function useTranslatedText(
    sourceText,
    {
        brand = false,
        noTranslate = false,
        translate = true,
        values = null
    } = {}
) {

    const {
        language,
        translateText
    } = useLanguage();

    const isProtected =
        brand ||
        noTranslate;

    const shouldTranslate =
        translate &&
        !isProtected;

    const [
        translatedText,
        setTranslatedText
    ] = useState(
        () => {

            if (
                !shouldTranslate
            ) {
                return interpolateValues(
                    sourceText,
                    values
                );
            }

            return resolveTranslation(
                language,
                sourceText,
                values
            );
        }
    );

    useEffect(() => {

        let active = true;

        if (
            !shouldTranslate ||
            language ===
                DEFAULT_LANGUAGE
        ) {
            setTranslatedText(
                interpolateValues(
                    sourceText,
                    values
                )
            );

            return undefined;
        }

        const cached =
            getCachedTranslation(
                language,
                sourceText
            );

        if (
            typeof cached ===
            "string"
        ) {
            setTranslatedText(
                finalizeTranslatedText(
                    cached,
                    {},
                    {},
                    values
                )
            );

            return undefined;
        }

        setTranslatedText(
            interpolateValues(
                sourceText,
                values
            )
        );

        translateText(
            sourceText,
            values
        ).then(
            (result) => {

                if (active) {
                    setTranslatedText(
                        result
                    );
                }
            }
        ).catch(
            (error) => {

                console.error(
                    "Translation failed:",
                    sourceText,
                    error
                );
            }
        );

        return () => {

            active = false;
        };

    }, [
        language,
        sourceText,
        translateText,
        shouldTranslate,
        values
    ]);

    return translatedText;
}

export function Translate({
    children,
    brand = false,
    noTranslate = false,
    translate = true,
    values = null
}) {

    const content =
        childrenToTranslatable(
            children,
            values
        );

    if (content.raw) {
        return content.raw;
    }

    const {
        template,
        values:
            mergedValues
    } = content;

    const isProtected =
        brand ||
        noTranslate;

    const shouldTranslate =
        translate &&
        !isProtected;

    const {
        language,
        translateText
    } = useLanguage();

    const [
        translatedText,
        setTranslatedText
    ] = useState(
        () => {

            if (
                !shouldTranslate
            ) {
                return interpolateValues(
                    template,
                    mergedValues
                );
            }

            return resolveTranslation(
                language,
                template,
                mergedValues
            );
        }
    );

    const valuesKey =
        JSON.stringify(
            mergedValues ||
                {}
        );

    useEffect(() => {

        let active = true;

        if (
            !shouldTranslate ||
            language ===
                DEFAULT_LANGUAGE
        ) {
            setTranslatedText(
                interpolateValues(
                    template,
                    mergedValues
                )
            );

            return undefined;
        }

        const cached =
            getCachedTranslation(
                language,
                template
            );

        if (
            typeof cached ===
            "string"
        ) {
            setTranslatedText(
                finalizeTranslatedText(
                    cached,
                    {},
                    {},
                    mergedValues
                )
            );

            return undefined;
        }

        setTranslatedText(
            interpolateValues(
                template,
                mergedValues
            )
        );

        translateText(
            template,
            mergedValues
        ).then(
            (result) => {

                if (active) {
                    setTranslatedText(
                        result
                    );
                }
            }
        ).catch(
            (error) => {

                console.error(
                    "Translation failed:",
                    template,
                    error
                );
            }
        );

        return () => {

            active = false;
        };

    }, [
        language,
        template,
        valuesKey,
        translateText,
        shouldTranslate
    ]);

    return translatedText;
}

export const T = Translate;

export function getCurrentUserLanguage() {

    return readStoredLanguage();
}
