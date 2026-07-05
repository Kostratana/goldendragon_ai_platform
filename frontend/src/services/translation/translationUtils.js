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

export function finalizeTranslatedText(
    translatedText,
    placeholders,
    brands,
    values
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

    return interpolateValues(
        withPlaceholders,
        values
    );
}
