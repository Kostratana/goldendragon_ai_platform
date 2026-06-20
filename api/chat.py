import json
import os

from groq import Groq


PROMPTS_DIR = "prompts"

PROMPT_FOLDERS = [
    "core",
    "identity",
    "memory",
    "modes",
    "profile"
]


def load_prompts():

    parts = []

    if not os.path.exists(PROMPTS_DIR):
        return ""

    for folder in PROMPT_FOLDERS:

        folder_path = os.path.join(
            PROMPTS_DIR,
            folder
        )

        if not os.path.exists(folder_path):
            continue

        for filename in sorted(
            os.listdir(folder_path)
        ):

            file_path = os.path.join(
                folder_path,
                filename
            )

            if not os.path.isfile(file_path):
                continue

            try:

                with open(
                    file_path,
                    "r",
                    encoding="utf-8"
                ) as file:

                    parts.append(
                        file.read()
                    )

            except Exception as error:

                print(
                    f"Prompt load error: {error}"
                )

    return "\n\n".join(parts)


SYSTEM_PROMPT = load_prompts()


CORS_HEADERS = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type"
}


def handler(request):

    try:

        method = getattr(
            request,
            "method",
            "UNKNOWN"
        )

        body_preview = None

        try:

            body_preview = str(
                getattr(
                    request,
                    "body",
                    None
                )
            )[:500]

        except Exception:
            body_preview = "unavailable"

        return {
            "statusCode": 200,
            "headers": CORS_HEADERS,
            "body": json.dumps(
                {
                    "status": "debug",
                    "method": method,
                    "request_type": str(
                        type(request)
                    ),
                    "body_preview": body_preview,
                    "groq_key": bool(
                        os.environ.get(
                            "GROQ_API_KEY"
                        )
                    ),
                    "model": os.environ.get(
                        "GROQ_MODEL",
                        "llama-3.3-70b-versatile"
                    ),
                    "prompts_loaded": len(
                        SYSTEM_PROMPT
                    )
                }
            )
        }

    except Exception as error:

        return {
            "statusCode": 500,
            "headers": CORS_HEADERS,
            "body": json.dumps(
                {
                    "status": "error",
                    "error": str(error)
                }
            )
        }