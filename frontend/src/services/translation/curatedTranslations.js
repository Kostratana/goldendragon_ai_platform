import {
    FOUNDER_TRANSLATIONS_DE
} from "../../content/founderTranslations.de.js";

import {
    FOUNDER_TRANSLATIONS_ES
} from "../../content/founderTranslations.es.js";

import {
    FOUNDER_TRANSLATIONS_FR
} from "../../content/founderTranslations.fr.js";

import {
    FOUNDER_TRANSLATIONS_IT
} from "../../content/founderTranslations.it.js";

import {
    FOUNDER_TRANSLATIONS_RU
} from "../../content/founderTranslations.ru.js";

const CURATED_BY_LANGUAGE = {
    ru: FOUNDER_TRANSLATIONS_RU,
    es: FOUNDER_TRANSLATIONS_ES,
    fr: FOUNDER_TRANSLATIONS_FR,
    de: FOUNDER_TRANSLATIONS_DE,
    it: FOUNDER_TRANSLATIONS_IT
};

export function getCuratedTranslation(
    language,
    template
) {

    if (
        !template ||
        !language
    ) {
        return null;
    }

    const dictionary =
        CURATED_BY_LANGUAGE[
            language
        ];

    if (!dictionary) {
        return null;
    }

    const translated =
        dictionary[template];

    return typeof translated ===
        "string"
        ? translated
        : null;
}

export function hasCuratedDictionary(
    language
) {

    return Boolean(
        CURATED_BY_LANGUAGE[
            language
        ]
    );
}
