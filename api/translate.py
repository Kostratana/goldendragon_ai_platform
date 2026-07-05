import json
import os
import urllib.error
import urllib.parse
import urllib.request

from http.server import BaseHTTPRequestHandler


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


def send_json(handler, status_code, payload):

    body = json.dumps(payload).encode("utf-8")

    handler.send_response(status_code)

    for header, value in CORS_HEADERS.items():
        handler.send_header(header, value)

    handler.send_header("Content-Length", str(len(body)))
    handler.end_headers()
    handler.wfile.write(body)


def translate_with_mymemory(
    texts,
    target_language
):

    translations = []

    for text in texts:

        query = urllib.parse.urlencode({
            "q": text,
            "langpair": (
                f"{CANONICAL_SOURCE_LANGUAGE}|"
                f"{target_language}"
            )
        })

        url = (
            "https://api.mymemory.translated.net/get?"
            f"{query}"
        )

        with urllib.request.urlopen(
            url,
            timeout=20
        ) as response:

            payload = json.loads(
                response.read().decode("utf-8")
            )

        translated = (
            payload
            .get("responseData", {})
            .get("translatedText", text)
        )

        translations.append(translated)

    return translations


def translate_with_google(
    texts,
    target_language,
    api_key
):

    payload = json.dumps({
        "q": texts,
        "source": CANONICAL_SOURCE_LANGUAGE,
        "target": target_language,
        "format": "text"
    }).encode("utf-8")

    api_request = urllib.request.Request(
        (
            "https://translation.googleapis.com/"
            "language/translate/v2"
            f"?key={api_key}"
        ),
        data=payload,
        headers={
            "Content-Type": "application/json"
        },
        method="POST"
    )

    with urllib.request.urlopen(
        api_request,
        timeout=20
    ) as response:

        response_payload = json.loads(
            response.read().decode("utf-8")
        )

    translations = [
        item.get("translatedText", texts[index])
        for index, item in enumerate(
            response_payload.get("data", {}).get(
                "translations",
                []
            )
        )
    ]

    if len(translations) != len(texts):
        raise ValueError(
            "Translation service returned an incomplete result"
        )

    return translations


def translate_texts(texts, target_language):

    api_key = os.environ.get("GOOGLE_TRANSLATE_API_KEY")

    if api_key:

        try:

            translations = translate_with_google(
                texts,
                target_language,
                api_key
            )

            return 200, {
                "translations": translations
            }

        except urllib.error.HTTPError as error:

            try:
                error_body = error.read().decode("utf-8")
            except Exception:
                error_body = str(error)

            return error.code, {
                "error": "Translation service request failed",
                "details": error_body
            }

        except Exception as error:

            return 500, {
                "error": str(error)
            }

    try:

        translations = translate_with_mymemory(
            texts,
            target_language
        )

        return 200, {
            "translations": translations
        }

    except Exception as error:

        return 503, {
            "error": "Translation service is not configured",
            "details": str(error)
        }


class handler(BaseHTTPRequestHandler):

    def do_OPTIONS(self):

        send_json(self, 200, {})

    def do_POST(self):

        try:

            content_length = int(
                self.headers.get("Content-Length", 0)
            )

            raw_body = (
                self.rfile.read(content_length).decode("utf-8")
                if content_length
                else "{}"
            )

            body = json.loads(raw_body or "{}")

            texts = body.get("texts", [])

            if not isinstance(texts, list):
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
                or target_language == CANONICAL_SOURCE_LANGUAGE
            ):
                send_json(
                    self,
                    200,
                    {"translations": texts}
                )

                return

            if target_language not in ALLOWED_TARGET_LANGUAGES:
                send_json(
                    self,
                    400,
                    {"error": "Unsupported target language"}
                )

                return

            status_code, payload = translate_texts(
                texts,
                target_language
            )

            send_json(self, status_code, payload)

        except Exception as error:

            send_json(
                self,
                500,
                {"error": str(error)}
            )

    def log_message(self, format, *args):
        return
