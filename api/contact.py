import json
import os
import smtplib
import ssl

from email.message import EmailMessage
from http.server import BaseHTTPRequestHandler


CORS_HEADERS = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST,OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type"
}

CONTACT_TO_EMAIL = "srumyantseva7@gmail.com"


def send_json(handler, status_code, payload):

    body = json.dumps(payload).encode("utf-8")

    handler.send_response(status_code)

    for header, value in CORS_HEADERS.items():
        handler.send_header(header, value)

    handler.send_header("Content-Length", str(len(body)))
    handler.end_headers()
    handler.wfile.write(body)


def clean_text(value):

    return str(value or "").strip()


def get_smtp_config():

    host = os.environ.get("SMTP_HOST")
    port = int(os.environ.get("SMTP_PORT", "587"))
    username = (
        os.environ.get("SMTP_USER") or
        os.environ.get("SMTP_USERNAME") or
        os.environ.get("GMAIL_USER")
    )
    password = (
        os.environ.get("SMTP_PASS") or
        os.environ.get("SMTP_PASSWORD") or
        os.environ.get("GMAIL_APP_PASSWORD")
    )
    from_email = (
        os.environ.get("SMTP_FROM_EMAIL") or
        username
    )
    to_email = (
        os.environ.get("CONTACT_TO_EMAIL") or
        CONTACT_TO_EMAIL
    )

    if not all([
        host,
        port,
        username,
        password,
        from_email,
        to_email
    ]):
        return None

    return {
        "host": host,
        "port": port,
        "username": username,
        "password": password,
        "from_email": from_email,
        "to_email": to_email
    }


def build_email(payload, smtp_config):

    full_name = clean_text(payload.get("fullName"))
    email = clean_text(payload.get("email"))
    phone = clean_text(payload.get("phone")) or "Not provided"
    message = clean_text(payload.get("message"))
    source_page = clean_text(payload.get("sourcePage"))

    subject = "Golden Dragon AI Studio website contact"

    plain_body = "\n".join([
        "New message from Golden Dragon AI Studio website.",
        "",
        f"Name: {full_name}",
        f"Email: {email}",
        f"Phone: {phone}",
        "",
        "Message:",
        message,
        "",
        f"Source page: {source_page}",
        "",
        "Golden Dragon AI Studio"
    ])

    html_body = f"""
    <div style="font-family: Arial, sans-serif; color: #111; line-height: 1.55;">
        <h2 style="margin: 0 0 16px;">Golden Dragon AI Studio website contact</h2>
        <p><strong>Name:</strong> {full_name}</p>
        <p><strong>Email:</strong> {email}</p>
        <p><strong>Phone:</strong> {phone}</p>
        <p><strong>Message:</strong></p>
        <p style="white-space: pre-wrap;">{message}</p>
        <p><strong>Source page:</strong> {source_page}</p>
        <p style="margin-top: 24px;">Golden Dragon AI Studio</p>
    </div>
    """

    email_message = EmailMessage()
    email_message["Subject"] = subject
    email_message["From"] = (
        f"Golden Dragon AI Studio <{smtp_config['from_email']}>"
    )
    email_message["To"] = smtp_config["to_email"]
    email_message["Reply-To"] = email
    email_message.set_content(plain_body)
    email_message.add_alternative(
        html_body,
        subtype="html"
    )

    return email_message


def send_contact_email(payload):

    smtp_config = get_smtp_config()

    if not smtp_config:
        raise RuntimeError(
            "SMTP is not configured"
        )

    email_message = build_email(
        payload,
        smtp_config
    )

    context = ssl.create_default_context()

    if smtp_config["port"] == 465:
        with smtplib.SMTP_SSL(
            smtp_config["host"],
            smtp_config["port"],
            context=context,
            timeout=20
        ) as server:
            server.login(
                smtp_config["username"],
                smtp_config["password"]
            )
            server.send_message(email_message)
        return

    with smtplib.SMTP(
        smtp_config["host"],
        smtp_config["port"],
        timeout=20
    ) as server:
        server.starttls(context=context)
        server.login(
            smtp_config["username"],
            smtp_config["password"]
        )
        server.send_message(email_message)


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

            full_name = clean_text(body.get("fullName"))
            email = clean_text(body.get("email"))
            message = clean_text(body.get("message"))

            if not full_name or not email or not message:
                send_json(
                    self,
                    400,
                    {
                        "error": (
                            "Name, email and message are required"
                        )
                    }
                )
                return

            send_contact_email(body)

            send_json(
                self,
                200,
                {
                    "ok": True
                }
            )

        except RuntimeError as error:

            send_json(
                self,
                503,
                {
                    "error": str(error)
                }
            )

        except Exception as error:

            send_json(
                self,
                500,
                {
                    "error": str(error)
                }
            )

    def log_message(self, format, *args):
        return
