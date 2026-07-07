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

import {
    FOOTER_TRANSLATIONS_DE
} from "../../content/footerTranslations.de.js";

import {
    FOOTER_TRANSLATIONS_ES
} from "../../content/footerTranslations.es.js";

import {
    FOOTER_TRANSLATIONS_FR
} from "../../content/footerTranslations.fr.js";

import {
    FOOTER_TRANSLATIONS_IT
} from "../../content/footerTranslations.it.js";

import {
    FOOTER_TRANSLATIONS_RU
} from "../../content/footerTranslations.ru.js";

import {
    HEALTH_SUPPORT_TRANSLATIONS_DE
} from "../../content/healthSupportTranslations.de.js";

import {
    HEALTH_SUPPORT_TRANSLATIONS_RU
} from "../../content/healthSupportTranslations.ru.js";

import {
    UNDERWATER_INSPECTION_TRANSLATIONS_DE
} from "../../content/underwaterInspectionTranslations.de.js";

import {
    UNDERWATER_INSPECTION_TRANSLATIONS_RU
} from "../../content/underwaterInspectionTranslations.ru.js";

import {
    PORTFOLIO_TRANSLATIONS_DE
} from "../../content/portfolioTranslations.de.js";

import {
    PORTFOLIO_TRANSLATIONS_RU
} from "../../content/portfolioTranslations.ru.js";

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
        CHAT_TRANSLATIONS_RU,
        FOOTER_TRANSLATIONS_RU,
        HEALTH_SUPPORT_TRANSLATIONS_RU,
        UNDERWATER_INSPECTION_TRANSLATIONS_RU,
        PORTFOLIO_TRANSLATIONS_RU
    ),
    es: mergeCuratedDictionaries(
        FOUNDER_TRANSLATIONS_ES,
        CHAT_TRANSLATIONS_ES,
        FOOTER_TRANSLATIONS_ES
    ),
    fr: mergeCuratedDictionaries(
        FOUNDER_TRANSLATIONS_FR,
        CHAT_TRANSLATIONS_FR,
        FOOTER_TRANSLATIONS_FR
    ),
    de: mergeCuratedDictionaries(
        FOUNDER_TRANSLATIONS_DE,
        CHAT_TRANSLATIONS_DE,
        FOOTER_TRANSLATIONS_DE,
        HEALTH_SUPPORT_TRANSLATIONS_DE,
        UNDERWATER_INSPECTION_TRANSLATIONS_DE,
        PORTFOLIO_TRANSLATIONS_DE
    ),
    it: mergeCuratedDictionaries(
        FOUNDER_TRANSLATIONS_IT,
        CHAT_TRANSLATIONS_IT,
        FOOTER_TRANSLATIONS_IT
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
