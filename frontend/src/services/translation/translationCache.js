const translationCache =
    new Map();

function buildCacheKey(
    language,
    text
) {

    return `${language}::${text}`;
}

export function getCachedTranslation(
    language,
    text
) {

    return translationCache.get(
        buildCacheKey(
            language,
            text
        )
    );
}

export function setCachedTranslation(
    language,
    text,
    translated
) {

    translationCache.set(
        buildCacheKey(
            language,
            text
        ),
        translated
    );
}

export function getCachedTranslations(
    language,
    texts
) {

    return texts.map(
        (text) =>
            getCachedTranslation(
                language,
                text
            )
    );
}

export function primeTranslationCache(
    language,
    originals,
    translated
) {

    originals.forEach(
        (text, index) => {

            setCachedTranslation(
                language,
                text,
                translated[index]
            );
        }
    );
}
