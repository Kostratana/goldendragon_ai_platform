from fastapi import APIRouter, UploadFile, File
from pydantic import BaseModel

from dotenv import load_dotenv
from groq import Groq

import shutil
import os

load_dotenv()

router = APIRouter()

BASE_DIR = os.path.dirname(
    os.path.dirname(
        os.path.abspath(__file__)
    )
)

PROMPTS_DIR = os.path.join(
    BASE_DIR,
    "prompts"
)

PROMPT_FOLDERS = [
    "core",
    "identity",
    "memory",
    "modes",
    "profile"
]


def load_prompts():

    parts = []

    for folder in PROMPT_FOLDERS:

        folder_path = os.path.join(
            PROMPTS_DIR,
            folder
        )

        if not os.path.exists(
            folder_path
        ):
            continue

        for filename in sorted(
            os.listdir(folder_path)
        ):

            file_path = os.path.join(
                folder_path,
                filename
            )

            if not os.path.isfile(
                file_path
            ):
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

GROQ_API_KEY = os.getenv(
    "GROQ_API_KEY"
)

if not GROQ_API_KEY:

    raise ValueError(
        "GROQ_API_KEY not found in .env"
    )

GROQ_MODEL = os.getenv(
    "GROQ_MODEL",
    "llama-3.3-70b-versatile"
)

client = Groq(
    api_key=GROQ_API_KEY
)

UPLOAD_DIR = "uploads"

os.makedirs(
    UPLOAD_DIR,
    exist_ok=True
)


class ChatRequest(BaseModel):

    message: str

    image_path: str | None = None


@router.post("/upload")
async def upload_file(
    file: UploadFile = File(...)
):

    file_path = os.path.join(
        UPLOAD_DIR,
        file.filename
    )

    with open(
        file_path,
        "wb"
    ) as buffer:

        shutil.copyfileobj(
            file.file,
            buffer
        )

    return {
        "status": "uploaded",
        "filename": file.filename,
        "path": file_path
    }


@router.post("/chat")
async def chat(
    request: ChatRequest
):

    try:

        completion = (
            client.chat.completions.create(
                model=GROQ_MODEL,
                messages=[
                    {
                        "role": "system",
                        "content":
                            SYSTEM_PROMPT
                            + """

IMPORTANT LANGUAGE RULE:

Always answer ONLY in the language of the user's latest message.

Russian input -> Russian output only.

English input -> English output only.

Spanish input -> Spanish output only.

Never mix languages.

Never switch languages automatically.

Always identify yourself as Murzik AI.
"""
                    },
                    {
                        "role": "user",
                        "content":
                            request.message
                    }
                ],
                temperature=0.3,
                max_completion_tokens=2048
            )
        )

        answer = (
            completion
            .choices[0]
            .message
            .content
        )

        return {
            "response": answer,
            "model": GROQ_MODEL,
            "status": "ok"
        }

    except Exception as error:

        print(
            f"Chat error: {error}"
        )

        return {
            "response": "",
            "status": "error",
            "error": str(error)
        }