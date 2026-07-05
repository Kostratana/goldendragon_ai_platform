import {
    CANONICAL_SOURCE_LANGUAGE,
    DEFAULT_LANGUAGE,
    TARGET_LANGUAGE_CODES
} from "./constants.js";

import {
    primeTranslationCache,
    getCachedTranslations
} from "./translationCache.js";

async function requestTranslations(
    texts,
    targetLanguage
) {

    const response =
        await fetch(
            "/api/translate",
            {
                method: "POST",

                headers: {
                    "Content-Type":
                        "application/json"
                },

                body: JSON.stringify({
                    texts,
                    targetLanguage,
                    sourceLanguage:
                        CANONICAL_SOURCE_LANGUAGE
                })
            }
        );

    if (!response.ok) {

        let details = "";

        try {

            const errorPayload =
                await response.json();

            details =
                errorPayload.error ||
                JSON.stringify(
                    errorPayload
                );

        } catch (error) {

            details =
                await response.text();
        }

        console.error(
            "Translation API failed:",
            response.status,
            details
        );

        throw new Error(
            `Translation API failed with status ${response.status}`
        );
    }

    const payload =
        await response.json();

    if (
        !Array.isArray(
            payload.translations
        )
    ) {

        throw new Error(
            "Translation API returned an invalid payload"
        );
    }

    return payload.translations;
}

export async function translateTexts(
    texts,
    targetLanguage
) {

    if (
        !texts.length ||
        !targetLanguage ||
        targetLanguage ===
            DEFAULT_LANGUAGE
    ) {

        return [...texts];
    }

    if (
        !TARGET_LANGUAGE_CODES.includes(
            targetLanguage
        )
    ) {

        return [...texts];
    }

    const cached =
        getCachedTranslations(
            targetLanguage,
            texts
        );

    const missingTexts = [];

    const missingIndexes = [];

    cached.forEach(
        (value, index) => {

            if (
                typeof value ===
                "string"
            ) {
                return;
            }

            missingTexts.push(
                texts[index]
            );

            missingIndexes.push(
                index
            );
        }
    );

    if (!missingTexts.length) {

        return cached;
    }

    const translatedMissing =
        await requestTranslations(
            missingTexts,
            targetLanguage
        );

    primeTranslationCache(
        targetLanguage,
        missingTexts,
        translatedMissing
    );

    const results = [...cached];

    missingIndexes.forEach(
        (index, missingIndex) => {

            results[index] =
                translatedMissing[
                    missingIndex
                ];
        }
    );

    return results;
}
