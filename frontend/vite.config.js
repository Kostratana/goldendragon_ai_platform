import {
    defineConfig,
    loadEnv
} from "vite";

import react from "@vitejs/plugin-react";

const ALLOWED_TARGET_LANGUAGES =
    new Set([
        "ru",
        "es",
        "fr",
        "de",
        "it"
    ]);

async function translateWithMyMemory(
    texts,
    targetLanguage
) {

    const translations = [];

    for (const text of texts) {

        const params =
            new URLSearchParams({
                q: text,
                langpair: `en|${targetLanguage}`
            });

        const response =
            await fetch(
                `https://api.mymemory.translated.net/get?${params.toString()}`
            );

        const payload =
            await response.json();

        translations.push(
            payload
                ?.responseData
                ?.translatedText ||
            text
        );
    }

    return translations;
}

function translateDevApiPlugin(
    env
) {

    return {
        name: "gd-translate-dev-api",

        configureServer(
            server
        ) {

            server.middlewares.use(
                async (
                    req,
                    res,
                    next
                ) => {

                    const url =
                        req.url ||
                        "";

                    if (
                        !url.startsWith(
                            "/api/translate"
                        )
                    ) {
                        next();

                        return;
                    }

                    if (
                        req.method ===
                        "OPTIONS"
                    ) {
                        res.statusCode = 200;
                        res.setHeader(
                            "Access-Control-Allow-Origin",
                            "*"
                        );
                        res.setHeader(
                            "Access-Control-Allow-Methods",
                            "GET,POST,OPTIONS"
                        );
                        res.setHeader(
                            "Access-Control-Allow-Headers",
                            "Content-Type"
                        );
                        res.end();

                        return;
                    }

                    if (
                        req.method !==
                        "POST"
                    ) {
                        res.statusCode = 405;
                        res.end();

                        return;
                    }

                    const apiKey =
                        env.GOOGLE_TRANSLATE_API_KEY ||
                        env.VITE_GOOGLE_TRANSLATE_API_KEY;

                    const chunks = [];

                    req.on(
                        "data",
                        (chunk) => {
                            chunks.push(
                                chunk
                            );
                        }
                    );

                    req.on(
                        "end",
                        async () => {

                            try {

                                const body =
                                    JSON.parse(
                                        Buffer.concat(
                                            chunks
                                        ).toString(
                                            "utf-8"
                                        ) ||
                                            "{}"
                                    );

                                const texts =
                                    Array.isArray(
                                        body.texts
                                    )
                                        ? body.texts.filter(
                                            (
                                                text
                                            ) =>
                                                String(
                                                    text
                                                ).trim()
                                        )
                                        : [];

                                const targetLanguage =
                                    body.targetLanguage ||
                                    "en";

                                if (
                                    !texts.length ||
                                    targetLanguage ===
                                        "en"
                                ) {
                                    sendJson(
                                        res,
                                        200,
                                        {
                                            translations:
                                                texts
                                        }
                                    );

                                    return;
                                }

                                if (
                                    !ALLOWED_TARGET_LANGUAGES.has(
                                        targetLanguage
                                    )
                                ) {
                                    sendJson(
                                        res,
                                        400,
                                        {
                                            error:
                                                "Unsupported target language"
                                        }
                                    );

                                    return;
                                }

                                if (
                                    !apiKey
                                ) {
                                    const translations =
                                        await translateWithMyMemory(
                                            texts,
                                            targetLanguage
                                        );

                                    sendJson(
                                        res,
                                        200,
                                        {
                                            translations
                                        }
                                    );

                                    return;
                                }

                                const googleResponse =
                                    await fetch(
                                        `https://translation.googleapis.com/language/translate/v2?key=${apiKey}`,
                                        {
                                            method: "POST",
                                            headers: {
                                                "Content-Type":
                                                    "application/json"
                                            },
                                            body: JSON.stringify(
                                                {
                                                    q: texts,
                                                    source: "en",
                                                    target: targetLanguage,
                                                    format: "text"
                                                }
                                            )
                                        }
                                    );

                                const googlePayload =
                                    await googleResponse.json();

                                if (
                                    !googleResponse.ok
                                ) {
                                    sendJson(
                                        res,
                                        googleResponse.status,
                                        {
                                            error:
                                                "Translation service request failed",
                                            details:
                                                googlePayload
                                        }
                                    );

                                    return;
                                }

                                const translations =
                                    googlePayload
                                        ?.data
                                        ?.translations
                                        ?.map(
                                            (
                                                item
                                            ) =>
                                                item.translatedText
                                        ) ||
                                    [];

                                if (
                                    translations.length !==
                                    texts.length
                                ) {
                                    sendJson(
                                        res,
                                        502,
                                        {
                                            error:
                                                "Translation service returned an incomplete result"
                                        }
                                    );

                                    return;
                                }

                                sendJson(
                                    res,
                                    200,
                                    {
                                        translations
                                    }
                                );

                            } catch (error) {

                                sendJson(
                                    res,
                                    500,
                                    {
                                        error:
                                            error.message
                                    }
                                );
                            }
                        }
                    );
                }
            );
        }
    };
}

function sendJson(
    res,
    statusCode,
    payload
) {

    res.statusCode = statusCode;
    res.setHeader(
        "Content-Type",
        "application/json"
    );
    res.setHeader(
        "Access-Control-Allow-Origin",
        "*"
    );
    res.end(
        JSON.stringify(
            payload
        )
    );
}

export default defineConfig(
    ({
        mode
    }) => {

        const env =
            loadEnv(
                mode,
                process.cwd(),
                ""
            );

        const parentEnv =
            loadEnv(
                mode,
                "..",
                ""
            );

        const mergedEnv =
            {
                ...parentEnv,
                ...env
            };

        return {
            plugins: [
                react(),
                translateDevApiPlugin(
                    mergedEnv
                )
            ]
        };
    }
);
