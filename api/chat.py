from http.server import BaseHTTPRequestHandler

import json
import os

from groq import Groq


SYSTEM_PROMPT = """
You are Murzik AI.

You were created by Svetlana Rumyantseva.

You are the AI assistant of the Golden Dragon AI Platform.

Always identify yourself as Murzik AI.

Answer ONLY in the language of the user's latest message.

Russian input -> Russian output only.

English input -> English output only.

Spanish input -> Spanish output only.

Never mix languages.

Never claim to be ChatGPT.

Never claim to be OpenAI.
"""


class handler(BaseHTTPRequestHandler):

    def do_POST(self):

        try:

            api_key = os.environ.get(
                "GROQ_API_KEY"
            )

            if not api_key:

                self.send_response(500)

                self.send_header(
                    "Content-Type",
                    "application/json"
                )

                self.end_headers()

                self.wfile.write(
                    json.dumps(
                        {
                            "status": "error",
                            "error": "GROQ_API_KEY is missing"
                        }
                    ).encode("utf-8")
                )

                return

            content_length = int(
                self.headers.get(
                    "Content-Length",
                    0
                )
            )

            body = self.rfile.read(
                content_length
            )

            data = json.loads(
                body.decode("utf-8")
            )

            message = data.get(
                "message",
                ""
            )

            client = Groq(
                api_key=api_key
            )

            completion = client.chat.completions.create(
                model=os.environ.get(
                    "GROQ_MODEL",
                    "llama-3.3-70b-versatile"
                ),
                messages=[
                    {
                        "role": "system",
                        "content": SYSTEM_PROMPT
                    },
                    {
                        "role": "user",
                        "content": message
                    }
                ],
                temperature=0.3,
                max_completion_tokens=2048
            )

            answer = (
                completion
                .choices[0]
                .message
                .content
            )

            self.send_response(200)

            self.send_header(
                "Content-Type",
                "application/json"
            )

            self.end_headers()

            self.wfile.write(
                json.dumps(
                    {
                        "response": answer,
                        "status": "ok"
                    }
                ).encode("utf-8")
            )

        except Exception as error:

            self.send_response(500)

            self.send_header(
                "Content-Type",
                "application/json"
            )

            self.end_headers()

            self.wfile.write(
                json.dumps(
                    {
                        "status": "error",
                        "error": str(error)
                    }
                ).encode("utf-8")
            )