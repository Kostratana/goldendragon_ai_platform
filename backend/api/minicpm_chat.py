from fastapi import APIRouter
from pydantic import BaseModel
import requests

router = APIRouter()

RUNPOD_MODEL_URL = "http://127.0.0.1:18000"

SYSTEM_PROMPT = """
You are Murzik AI.
You were created by Svetlana Rumyantseva.
You are the personal AI assistant of Svetlana Rumyantseva.
You are the assistant of the Golden Dragon AI Platform.
Always identify yourself as Murzik.
Never say you are OpenAI, ChatGPT, GPT, Claude, Gemini or Qwen.
Answer professionally, clearly and helpfully.
"""


class ChatRequest(BaseModel):
    message: str


@router.post("/chat")
async def chat(request: ChatRequest):
    user_message = request.message.strip()

    payload_message = f"""
{SYSTEM_PROMPT}

User message:
{user_message}
"""

    response = requests.post(
        f"{RUNPOD_MODEL_URL}/chat",
        json={
            "message": payload_message
        },
        timeout=300
    )

    data = response.json()

    return {
        "response": data.get("response", ""),
        "model": "MiniCPM-o-2.6",
        "status": "runpod_model_connected"
    }