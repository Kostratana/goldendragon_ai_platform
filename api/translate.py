import json
import os
import urllib.error
import urllib.request


CORS_HEADERS = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type"
}

CANONICAL_SOURCE_LANGUAGE = "en"

ALLOWED_TARGET_LANGUAGES = {
    "ru",
    "es",
    "fr",
    "de",
    "it"
}


def handler(request):

    try:

        method = getattr(
            request,
            "method",
            "POST"
        )

        if method == "OPTIONS":

            return {
                "statusCode": 200,
                "headers": CORS_HEADERS,
                "body": ""
            }

        body = {}

        try:

            raw_body = getattr(
                request,
                "body",
                "{}"
            )

            if isinstance(
                raw_body,
                bytes
            ):
                raw_body = raw_body.decode(
                    "utf-8"
                )

            body = json.loads(
                raw_body or "{}"
            )

        except Exception:

            body = {}

        texts = body.get(
            "texts",
            []
        )

        if not isinstance(
            texts,
            list
        ):
            texts = []

        texts = [
            str(text)
            for text in texts
            if str(text).strip()
        ]

        target_language = body.get(
            "targetLanguage",
            CANONICAL_SOURCE_LANGUAGE
        )

        if (
            not texts
            or target_language ==
                CANONICAL_SOURCE_LANGUAGE
        ):

            return {
                "statusCode": 200,
                "headers": CORS_HEADERS,
                "body": json.dumps(
                    {
                        "translations": texts
                    }
                )
            }

        if (
            target_language not in
            ALLOWED_TARGET_LANGUAGES
        ):

            return {
                "statusCode": 400,
                "headers": CORS_HEADERS,
                "body": json.dumps(
                    {
                        "error":
                            "Unsupported target language"
                    }
                )
            }

        source_language = (
            CANONICAL_SOURCE_LANGUAGE
        )

        api_key = os.environ.get(
            "GOOGLE_TRANSLATE_API_KEY"
        )

        if not api_key:

            return {
                "statusCode": 503,
                "headers": CORS_HEADERS,
                "body": json.dumps(
                    {
                        "error":
                            "Translation service is not configured"
                    }
                )
            }

        payload = json.dumps(
            {
                "q": texts,
                "source": source_language,
                "target": target_language,
                "format": "text"
            }
        ).encode("utf-8")

        api_request = urllib.request.Request(
            (
                "https://translation.googleapis.com/"
                "language/translate/v2"
                f"?key={api_key}"
            ),
            data=payload,
            headers={
                "Content-Type":
                    "application/json"
            },
            method="POST"
        )

        with urllib.request.urlopen(
            api_request,
            timeout=20
        ) as response:

            response_payload = json.loads(
                response.read().decode(
                    "utf-8"
                )
            )

        translations = [
            item.get(
                "translatedText",
                texts[index]
            )
            for index, item in enumerate(
                response_payload.get(
                    "data",
                    {}
                ).get(
                    "translations",
                    []
                )
            )
        ]

        if len(translations) != len(texts):

            return {
                "statusCode": 502,
                "headers": CORS_HEADERS,
                "body": json.dumps(
                    {
                        "error":
                            "Translation service returned an incomplete result"
                    }
                )
            }

        return {
            "statusCode": 200,
            "headers": CORS_HEADERS,
            "body": json.dumps(
                {
                    "translations":
                        translations
                }
            )
        }

    except urllib.error.HTTPError as error:

        try:

            error_body = error.read().decode(
                "utf-8"
            )

        except Exception:

            error_body = str(error)

        return {
            "statusCode": error.code,
            "headers": CORS_HEADERS,
            "body": json.dumps(
                {
                    "error":
                        "Translation service request failed",
                    "details":
                        error_body
                }
            )
        }

    except Exception as error:

        return {
            "statusCode": 500,
            "headers": CORS_HEADERS,
            "body": json.dumps(
                {
                    "error": str(error)
                }
            )
        }
