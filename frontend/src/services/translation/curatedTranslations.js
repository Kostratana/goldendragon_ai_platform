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

import {
    CHAT_TRANSLATIONS_DE
} from "../../content/chatTranslations.de.js";

import {
    CHAT_TRANSLATIONS_ES
} from "../../content/chatTranslations.es.js";

import {
    CHAT_TRANSLATIONS_FR
} from "../../content/chatTranslations.fr.js";

import {
    CHAT_TRANSLATIONS_IT
} from "../../content/chatTranslations.it.js";

import {
    CHAT_TRANSLATIONS_RU
} from "../../content/chatTranslations.ru.js";

function mergeCuratedDictionaries(
    ...dictionaries
) {

    return Object.assign(
        {},
        ...dictionaries
    );
}

const CURATED_BY_LANGUAGE = {
    ru: mergeCuratedDictionaries(
        FOUNDER_TRANSLATIONS_RU,
        CHAT_TRANSLATIONS_RU
    ),
    es: mergeCuratedDictionaries(
        FOUNDER_TRANSLATIONS_ES,
        CHAT_TRANSLATIONS_ES
    ),
    fr: mergeCuratedDictionaries(
        FOUNDER_TRANSLATIONS_FR,
        CHAT_TRANSLATIONS_FR
    ),
    de: mergeCuratedDictionaries(
        FOUNDER_TRANSLATIONS_DE,
        CHAT_TRANSLATIONS_DE
    ),
    it: mergeCuratedDictionaries(
        FOUNDER_TRANSLATIONS_IT,
        CHAT_TRANSLATIONS_IT
    )
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
