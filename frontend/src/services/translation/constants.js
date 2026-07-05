/*
Golden Dragon AI Studio
Official Language Policy

English is the canonical source language.
All source texts must be written in English.
Translations flow only from English into
supported target languages.

Language order is fixed.
Do not sort SUPPORTED_LANGUAGES.
*/

export const LANGUAGE_STORAGE_KEY =
    "gd-selected-language";

export const CANONICAL_SOURCE_LANGUAGE =
    "en";

export const DEFAULT_LANGUAGE =
    CANONICAL_SOURCE_LANGUAGE;

export const SUPPORTED_LANGUAGES = [
    {
        code: "en",
        nativeName: "English",
        flag: "gb"
    },
    {
        code: "ru",
        nativeName: "Русский",
        flag: "ru"
    },
    {
        code: "es",
        nativeName: "Español",
        flag: "es"
    },
    {
        code: "fr",
        nativeName: "Français",
        flag: "fr"
    },
    {
        code: "de",
        nativeName: "Deutsch",
        flag: "de"
    },
    {
        code: "it",
        nativeName: "Italiano",
        flag: "it"
    }
];

export const SUPPORTED_LANGUAGE_CODES =
    SUPPORTED_LANGUAGES.map(
        ({
            code
        }) => code
    );

export const TARGET_LANGUAGE_CODES =
    SUPPORTED_LANGUAGE_CODES.filter(
        (code) =>
            code !==
            CANONICAL_SOURCE_LANGUAGE
    );

export const LANGUAGE_LABELS =
    Object.fromEntries(
        SUPPORTED_LANGUAGES.map(
            ({
                code,
                nativeName
            }) => [
                code,
                nativeName
            ]
        )
    );
