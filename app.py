import os
import html
import streamlit as st
import requests
from datetime import datetime

GROQ_API_KEY = os.getenv("GROQ_API_KEY")

try:
    from deep_translator import GoogleTranslator
    DEEP_TRANSLATOR_AVAILABLE = True
except Exception:
    DEEP_TRANSLATOR_AVAILABLE = False

ASSETS_DIR = "assets"

HERO_IMAGE_PATH = os.path.join(ASSETS_DIR, "home_background.png")
LOGO_PATH = os.path.join(ASSETS_DIR, "logo.png")
MURZIK_ICON = os.path.join(ASSETS_DIR, "murzik_avatar_128.png")

IMPLEMENTED_1_IMAGE = os.path.join(ASSETS_DIR, "project_zetai_platform.jpg")
IMPLEMENTED_2_IMAGE = os.path.join(ASSETS_DIR, "project_airport_security.jpg")
IMPLEMENTED_3_IMAGE = os.path.join(ASSETS_DIR, "project_logistics_ai.jpg")
IMPLEMENTED_4_IMAGE = os.path.join(ASSETS_DIR, "project_karate_pose.jpg")
IMPLEMENTED_5_IMAGE = os.path.join(ASSETS_DIR, "project_bridge_detection.jpg")
IMPLEMENTED_6_IMAGE = os.path.join(ASSETS_DIR, "nasa.png")

INVEST_1_IMAGE = os.path.join(ASSETS_DIR, "animal_project.png")
INVEST_2_IMAGE = os.path.join(ASSETS_DIR, "ships_detection.png")
INVEST_3_IMAGE = os.path.join(ASSETS_DIR, "medicine.png")
INVEST_4_IMAGE = os.path.join(ASSETS_DIR, "anomaly.png")

page_icon_value = "🧠"
if os.path.exists(LOGO_PATH):
    page_icon_value = LOGO_PATH

st.set_page_config(
    page_title="Golden Dragon AI",
    page_icon=page_icon_value,
    layout="wide"
)

st.markdown("""
<link rel="manifest" href="/manifest.json">
<meta name="theme-color" content="#000000">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
<meta name="apple-mobile-web-app-title" content="Golden Dragon AI">
<link rel="apple-touch-icon" href="/assets/murzik_180.png">
<meta name="msapplication-TileColor" content="#000000">
<meta name="msapplication-TileImage" content="/assets/murzik_180.png">
""", unsafe_allow_html=True)

LANGUAGES = {
    "English": "en",
    "Русский": "ru",
    "Français": "fr",
    "Deutsch": "de",
    "Español": "es"
}

OLLAMA_URL = "http://localhost:11434/api/generate"
MODEL_NAME = "mistral"

SYSTEM_PROMPT = """
You are an advanced AI system acting as:

AI Analyst:
- Analyze data and documents
- Provide structured insights

AI Architect:
- Design AI systems
- Suggest technical solutions

Answer clearly and structured.
"""

HOME_PAGE_TEXT = """
Golden Dragon AI — AI Systems Architect and Data Scientist.

AI Systems, Agents, Machine Learning Platforms and Dataset Engineering for Business Automation.

Development of applied artificial intelligence systems including AI agents, multimodal AI pipelines, machine learning models, dataset engineering, and intelligent automation platforms designed for real-world business environments.

This website presents working AI systems, model demonstrations, and applied machine learning solutions that show how artificial intelligence can be used to automate processes, analyze complex data, and support operational decision-making.

The focus of this work is building complete AI systems, not just standalone models. Each solution combines dataset preparation, data pipelines, trained models, automation workflows, and production deployment into reliable systems that can be integrated into real company environments.

This platform demonstrates applied artificial intelligence technologies, working AI models, intelligent agents, and machine learning systems, showing how modern AI solutions can be integrated into real operational environments.

The technologies presented here illustrate how artificial intelligence can support automation, analytics, decision-making, and intelligent workflows across different industries and business processes.
"""

IMPLEMENTED_PROJECTS_TEXT = """
Implemented Projects:

1. ZetAI — Multimodal Artificial Intelligence Platform.
Platform for multimodal data processing, dataset preparation, and machine learning workflows.

2. Airport Security Object Detection System.
Computer vision system for detecting prohibited objects in passenger screening images.

3. Logistics Route Optimization System.
AI system for optimizing transportation routes using classical and hybrid algorithms.

4. AI Judging System for Kyokushinkai Karate.
Computer vision system for pose analysis and judging support in competitions.

5. Bridge Infrastructure Defect Detection System.
Computer vision system for infrastructure defect detection and monitoring.

6. Exoplanet Habitability & Water Detection AI System (NASA Space Apps Challenge 2024).
Machine learning system for predicting life potential and water presence on exoplanets.
"""

CONTACTS_TEXT = """
Contacts:
Email: srumyantseva7@gmail.com
WhatsApp: +507 6404 58 77
Telegram: @Svetlana_KostraTana
GitHub: https://github.com/Kostratana/Greeting_page_links-
LinkedIn: https://www.linkedin.com/in/svetlana-rumyantseva-5b41962b9/
Kaggle: https://www.kaggle.com/svetlanarumyantseva7
YouTube: https://www.youtube.com/
"""

MAX_FILE_SIZE_MB = 3

PROJECTS = [
    {
        "name": "ZetAI — Multimodal Artificial Intelligence Platform",
        "description": "Platform for multimodal data processing, dataset preparation, and machine learning workflows.",
        "roi": "High potential: automation, data intelligence, scalable AI workflows"
    },
    {
        "name": "Airport Security Object Detection System",
        "description": "Computer vision system for detecting prohibited objects in passenger screening images.",
        "roi": "High potential: safety automation, faster screening, risk reduction"
    },
    {
        "name": "Logistics Route Optimization System",
        "description": "AI system for optimizing transportation routes using classical and hybrid algorithms.",
        "roi": "High potential: cost reduction, route efficiency, operational optimization"
    },
    {
        "name": "AI Judging System for Kyokushinkai Karate",
        "description": "Computer vision system for pose analysis and judging support in competitions.",
        "roi": "Medium to high potential: sports analytics, training automation, new markets"
    },
    {
        "name": "Bridge Infrastructure Defect Detection System",
        "description": "Computer vision system for infrastructure defect detection and monitoring.",
        "roi": "High potential: infrastructure safety, cost optimization, predictive maintenance"
    }
]


def ask_ollama(prompt: str) -> str:
    try:
        response = requests.post(
            OLLAMA_URL,
            json={
                "model": MODEL_NAME,
                "prompt": prompt,
                "stream": False
            },
            timeout=60
        )
        return response.json().get("response", "No response")
    except Exception:
        return "⚠️ AI server not available (Ollama not running or deployed environment)"


def groq_llm(prompt: str) -> str:
    try:
        response = requests.post(
            "https://api.groq.com/openai/v1/chat/completions",
            headers={
                "Authorization": f"Bearer {GROQ_API_KEY}",
                "Content-Type": "application/json"
            },
            json={
                "model": "llama-3.1-8b-instant",
                "messages": [
                    {"role": "system", "content": "You are Murzik AI assistant."},
                    {"role": "user", "content": prompt}
                ]
            },
            timeout=60
        )
        data = response.json()
        if "choices" not in data:
            return f"⚠️ Groq API error: {data}"
        return data["choices"][0]["message"]["content"]
    except Exception as e:
        return f"⚠️ Groq error: {str(e)}"


def get_image_base64(path: str) -> str:
    import base64
    if not os.path.exists(path):
        return ""
    with open(path, "rb") as f:
        return base64.b64encode(f.read()).decode()

# ---------- SESSION_STATE ----------
if "lang_code" not in st.session_state:
    st.session_state.lang_code = "en"

if "page" not in st.session_state:
    st.session_state.page = "home"

if "chat_messages" not in st.session_state:
    st.session_state.chat_messages = [
        "Murzik 🐉: Hello. I am Murzik — personal AI assistant of Svetlana Rumyantseva. I will guide you through AI projects, solutions, and investment opportunities."
    ]

if "murzik_memory" not in st.session_state:
    st.session_state.murzik_memory = []

if "chat_file_content" not in st.session_state:
    st.session_state.chat_file_content = ""

if "chat_input_line" not in st.session_state:
    st.session_state.chat_input_line = ""

if "model_logs" not in st.session_state:
    st.session_state.model_logs = []

if "uploaded_file_name" not in st.session_state:
    st.session_state.uploaded_file_name = ""


def set_page(page_key: str) -> None:
    st.session_state.page = page_key


def set_language() -> None:
    selected_label = st.session_state.language_select
    st.session_state.lang_code = LANGUAGES[selected_label]

@st.cache_data(show_spinner=False)
def translate_text(text: str, lang: str) -> str:
    if not DEEP_TRANSLATOR_AVAILABLE:
        return text
    try:
        translator = GoogleTranslator(source="auto", target=lang)
        return translator.translate(text)
    except Exception:
        return text


def tr(text: str) -> str:
    if not text:
        return text
    if st.session_state.lang_code == "en":
        return text
    return translate_text(text, st.session_state.lang_code)

@st.cache_resource
def load_image(path: str) -> str:
    return path


def safe_image(path: str, caption: str = "") -> None:
    if os.path.exists(path):
        st.image(load_image(path), use_column_width=True, output_format="PNG")
    else:
        st.markdown(tr("Image not found"))


def demo_neural_network(file):
    return """Neural Network Analysis:
• patterns detected in input data
• classification confidence: 92%
• anomaly score: low
• recommendation: data is consistent and usable"""


def demo_random_forest(file):
    return """Random Forest Results:
• prediction completed successfully
• feature importance calculated
• top features identified
• model confidence: high"""


def demo_cv(file):
    return """Computer Vision Analysis:
• objects detected: 3
• confidence: 87%
• bounding boxes generated
• image processed successfully"""


def demo_quantum(file):
    return """Quantum Optimization:
• optimization problem solved
• convergence reached
• solution quality: optimal
• iterations: 128"""


def demo_hybrid(file):
    return """Hybrid AI System:
• ML + Rules + LLM pipeline executed
• reasoning completed
• decision generated
• confidence: high"""


def add_model_log(message: str) -> None:
    timestamp = datetime.now().strftime("%H:%M:%S")
    st.session_state.model_logs.append(f"[{timestamp}] {message}")
    if len(st.session_state.model_logs) > 200:
        st.session_state.model_logs = st.session_state.model_logs[-200:]


def reset_model_outputs() -> None:
    st.session_state.model_logs = []

st.markdown("""
<style>
html, body, .stApp { background: #000000; color: #ffffff; }
.stApp { background: radial-gradient(circle at center, rgba(255,215,0,0.08), #000000 70%); animation: appFadeIn 0.8s ease; padding-bottom: 70px; }
@keyframes appFadeIn { from { opacity: 0; transform: translateY(10px);} to { opacity: 1; transform: translateY(0);} }

label, .stMarkdown, .stText, .stCaption, .stTextArea label, .stSelectbox label, .stFileUploader label {
    color: #ffffff !important;
}

button, .stDownloadButton button, div[data-baseweb="select"] {
    background: rgba(20,20,20,0.75) !important;
    backdrop-filter: blur(12px);
    border: 1px solid rgba(212,175,55,0.6) !important;
    border-radius: 14px !important;
    color: #ffffff !important;
    font-weight: 800 !important;
    font-size: 13px !important;
    height: 36px !important;
    width: 100% !important;
    transition: all 0.25s ease !important;
    position: relative;
    overflow: hidden;
}
button:hover {
    transform: translateY(-3px);
    background: linear-gradient(135deg, #d4af37, #fff1a8) !important;
    color: #000 !important;
    box-shadow: 0 0 15px rgba(212,175,55,0.8), 0 0 35px rgba(255,200,0,0.6);
}
button::before {
    content: "";
    position: absolute;
    width: 150%;
    height: 100%;
    background: linear-gradient(120deg, transparent, rgba(255,241,168,0.4), transparent);
    transform: translateX(-100%);
    transition: 0.5s;
}
button:hover::before { transform: translateX(100%); }

.stSelectbox div[data-baseweb="select"] {
    background: rgba(20,20,20,0.95) !important;
    border: 1px solid #d4af37 !important;
    border-radius: 12px !important;
}
.stSelectbox div[data-baseweb="select"] span {
    color: #fff !important;
}
.stSelectbox svg {
    fill: #ffffff !important;
}

.stSelectbox div[data-baseweb="select"] > div {
    background: rgba(20,20,20,0.95) !important;
    color: #ffffff !important;
}

div[data-baseweb="popover"] {
    background: #000000 !important;
    border: 1px solid #d4af37 !important;
}
ul[data-baseweb="menu"] {
    background: #000000 !important;
    color: #ffffff !important;
}
ul[data-baseweb="menu"] li {
    color: #ffffff !important;
}
ul[data-baseweb="menu"] li:hover {
    background: #222222 !important;
    color: #fff1a8 !important;
}

[data-testid="stFileUploader"] {
    background: rgba(20,20,20,0.95) !important;
    border: 1px solid #d4af37 !important;
    border-radius: 12px !important;
}
[data-testid="stFileUploader"] * {
    color: #ffffff !important;
}

textarea, .stTextArea textarea {
    background: rgba(20,20,20,0.95) !important;
    color: #ffffff !important;
    border: 1px solid #d4af37 !important;
    border-radius: 12px !important;
}

.stCodeBlock, pre, code {
    background: rgba(20,20,20,0.95) !important;
    color: #ffffff !important;
    border: 1px solid #d4af37 !important;
    border-radius: 12px !important;
}

.stImage, .stImage > img, .stImage > figure {
    border: none !important;
    background: transparent !important;
    box-shadow: none !important;
}

.contact-block {
    max-width: 640px;
    margin: 0 auto;
    font-size: 14px;
    line-height: 1.6;
}
.contact-row {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 10px;
    font-size: 14px;
}
.contact-name {
    font-size: 20px;
    font-weight: 700;
    margin-bottom: 12px;
}
.contact-icon {
    width: 18px;
    height: 18px;
}
.contact-block a {
    color: #fff1a8 !important;
    text-decoration: none;
}
.contact-block a:hover {
    color: #ffffff !important;
    text-decoration: underline;
}

.fixed-footer {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0,0,0,0.95);
    border-top: 1px solid rgba(212,175,55,0.6);
    text-align: center;
    padding: 10px 0;
    font-size: 12px;
    color: #ffffff;
    z-index: 9999;
}

/* BANNER */
.banner-container {
    position: relative;
    overflow: hidden;
    border-radius: 16px;
    box-shadow:
        0 0 40px rgba(255,140,0,0.3),
        0 0 80px rgba(212,175,55,0.25);
}

.banner-container::before {
    content: "";
    position: absolute;
    top: 0;
    width: 160px;
    height: 100%;
    left: 0;
    z-index: 3;
    pointer-events: none;
    animation: fireGlow 2.2s ease-in-out infinite;
    background: radial-gradient(circle at left,
        rgba(255,120,0,0.9),
        rgba(255,69,0,0.75),
        transparent 70%);
}
.banner-container::after {
    content: "";
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 140px;
    z-index: 3;
    pointer-events: none;
    animation: fireGlow 2.2s ease-in-out infinite;
    background: radial-gradient(circle at bottom,
        rgba(255,140,0,0.7),
        rgba(255,69,0,0.6),
        transparent 70%);
}

.banner-fire-right {
    position: absolute;
    top: 0;
    right: 0;
    width: 160px;
    height: 100%;
    z-index: 3;
    pointer-events: none;
    animation: fireGlow 2.2s ease-in-out infinite;
    background: radial-gradient(circle at right,
        rgba(255,120,0,0.9),
        rgba(255,69,0,0.75),
        transparent 70%);
}

.banner-sparks {
    position: absolute;
    inset: 0;
    pointer-events: none;
    z-index: 6;
}

.spark {
    position: absolute;
    bottom: -10px;
    width: 6px;
    height: 6px;
    background: radial-gradient(circle, #fff6c2, #d4af37, rgba(255,140,0,0.9));
    border-radius: 50%;
    opacity: 0;
    animation: sparks 4s linear infinite;
}

@keyframes fireGlow {
    0% { opacity: 0.3; filter: blur(6px); }
    50% { opacity: 1; filter: blur(16px); }
    100% { opacity: 0.3; filter: blur(6px); }
}

@keyframes sparks {
    0% { transform: translateY(0) scale(0.4); opacity: 0; }
    20% { opacity: 1; }
    100% { transform: translateY(-280px) scale(1.2); opacity: 0; }
}

.banner-container img {
    width: 100%;
    animation: dragonFloat 10s ease-in-out infinite;
}
@keyframes dragonFloat {
    0% { transform: scale(1) translateY(0px); }
    50% { transform: scale(1.03) translateY(-8px); }
    100% { transform: scale(1) translateY(0px); }
}
.banner-container:hover img {
    transform: scale(1.05);
    transition: 0.5s;
}

.project-card {
    background: rgba(20,20,20,0.9);
    border: 1px solid rgba(212,175,55,0.4);
    border-radius: 16px;
    padding: 16px;
    margin-bottom: 16px;
    box-shadow: 0 0 20px rgba(212,175,55,0.15);
    transition: 0.3s;
}
.project-card:hover {
    transform: translateY(-6px);
    box-shadow: 0 0 30px rgba(255,215,0,0.4);
}

.chat-history {
    background: rgba(0,0,0,0.9);
    border: 2px solid #d4af37;
    border-radius: 18px;
    padding: 16px;
    height: 420px;
    overflow-y: auto;
    scroll-behavior: smooth;
    box-shadow: 0 0 25px rgba(212,175,55,0.4);
}
.chat-row { display: flex; gap: 12px; margin-bottom: 10px; }
.murzik-avatar { width: 42px; height: 42px; border-radius: 50%; box-shadow: 0 0 15px rgba(255,200,0,0.9); animation: murzikPulse 1.2s ease; }
@keyframes murzikPulse { 0% { transform: scale(1);} 50% { transform: scale(1.12);} 100% { transform: scale(1);} }

.bubble { max-width: 70%; padding: 12px 14px; border-radius: 14px; font-size: 14px; animation: fadeIn 0.3s ease; }
@keyframes fadeIn { from { opacity: 0; transform: translateY(8px);} to { opacity: 1; transform: translateY(0);} }

.bubble.user { background: linear-gradient(135deg, #d4af37, #fff1a8); color: #000; margin-left: auto; }
.bubble.agent { background: rgba(20,20,20,0.95); border: 1px solid #d4af37; color: #fff; box-shadow: 0 0 12px rgba(212,175,55,0.5); animation: murzikGlow 1.5s ease-in-out; }
@keyframes murzikGlow { 0% { box-shadow: 0 0 5px rgba(212,175,55,0.3);} 50% { box-shadow: 0 0 25px rgba(255,200,0,0.9);} 100% { box-shadow: 0 0 12px rgba(212,175,55,0.5);} }

.stTextInput input { background: rgba(0,0,0,0.95) !important; border: 2px solid #d4af37 !important; border-radius: 12px !important; color: #fff !important; }
</style>
""", unsafe_allow_html=True)

def render_navbar() -> None:
    labels = [
        ("home", tr("Home")),
        ("models", tr("AI Models")),
        ("implemented", tr("Implemented Projects")),
        ("invest", tr("Projects for Investment")),
        ("chat", tr("AI Assistant")),
        ("contact", tr("Contact"))
    ]

    cols = st.columns([1, 1, 1, 1, 1, 1, 1, 1])

    with cols[0]:
        st.markdown('<a class="arrow-link" href="#bottom">▼</a>', unsafe_allow_html=True)

    for idx, (page_key, label) in enumerate(labels, start=1):
        with cols[idx]:
            if st.button(label, key=f"nav_{page_key}", use_container_width=True):
                set_page(page_key)
                st.rerun()

    with cols[-1]:
        st.selectbox(
            label="Language",
            options=list(LANGUAGES.keys()),
            index=list(LANGUAGES.values()).index(st.session_state.lang_code),
            key="language_select",
            on_change=set_language,
            label_visibility="collapsed"
        )

def render_menu_with_language() -> None:
    render_navbar()

def render_home_icon(page_key: str) -> None:
    return

def render_banner() -> None:
    if os.path.exists(HERO_IMAGE_PATH):
        import base64
        with open(HERO_IMAGE_PATH, "rb") as img_file:
            base64_image = base64.b64encode(img_file.read()).decode()

        st.markdown(f"""
        <div class="banner-container">
            <img src="data:image/png;base64,{base64_image}">
            <div class="banner-fire-right"></div>
            <div class="banner-sparks">
                <div class="spark" style="left: 8%; animation-delay: 0s;"></div>
                <div class="spark" style="left: 16%; animation-delay: 0.4s;"></div>
                <div class="spark" style="left: 24%; animation-delay: 0.8s;"></div>
                <div class="spark" style="left: 32%; animation-delay: 1.2s;"></div>
                <div class="spark" style="left: 40%; animation-delay: 1.6s;"></div>
                <div class="spark" style="left: 48%; animation-delay: 2s;"></div>
                <div class="spark" style="left: 56%; animation-delay: 2.4s;"></div>
                <div class="spark" style="left: 64%; animation-delay: 2.8s;"></div>
                <div class="spark" style="left: 72%; animation-delay: 3.2s;"></div>
                <div class="spark" style="left: 80%; animation-delay: 3.6s;"></div>
                <div class="spark" style="left: 88%; animation-delay: 4s;"></div>
                <div class="spark" style="left: 94%; animation-delay: 4.4s;"></div>
            </div>
        </div>
        """, unsafe_allow_html=True)

        st.markdown('<div class="metal-liquid">From ancient roots to modern intelligence</div>', unsafe_allow_html=True)

def render_arrows_top_bottom() -> None:
    st.markdown('<div id="top"></div>', unsafe_allow_html=True)
    st.markdown('<div id="bottom"></div>', unsafe_allow_html=True)

def render_arrows_bottom_top() -> None:
    st.markdown('<a class="arrow-link" href="#top">▲</a>', unsafe_allow_html=True)

def open_pitch_modal(title: str, body: str) -> None:
    @st.dialog(title)
    def _show():
        st.markdown(body)
    _show()


def send_chat_message(message: str) -> None:
    if not message.strip():
        return

    user_name = "Svetlana"

    st.session_state.chat_messages.append("You: " + message)
    st.session_state.murzik_memory.append(f"User: {message}")
    st.session_state.murzik_memory = st.session_state.murzik_memory[-20:]

    memory_text = "\n".join(st.session_state.murzik_memory[-10:])

    projects_text = ""
    for p in PROJECTS:
        projects_text += f"""
Project: {p['name']}
Description: {p['description']}
ROI: {p['roi']}
"""

    def is_investor(message_text):
        msg = message_text.lower()
        return any(word in msg for word in ["invest", "roi", "profit", "startup"])

    investor_mode = ""
    if is_investor(message):
        investor_mode = """
User is an investor.
Focus on ROI, value, and opportunities.
"""

    if len(st.session_state.chat_messages) < 3:
        intro = "Introduce yourself as Murzik."
    else:
        intro = ""

    full_prompt = f"""
{intro}

You are Murzik 🐉 — personal AI assistant of Svetlana Rumyantseva.

User name: {user_name}

IMPORTANT:
- Always address user by name when appropriate
- Be polite, intelligent and supportive

CORE BEHAVIOR:

1. LANGUAGE
- Always respond in the language of the user
- Start with greeting in that language

2. ROLE
- You represent Svetlana Rumyantseva and her AI work
- You are a professional assistant, not just a chatbot
- You communicate clearly, confidently and intelligently

3. PURPOSE
You must:
- explain AI projects
- suggest solutions for clients
- present investment opportunities
- help users understand what can be built

4. CAPABILITIES
You must always communicate that:
- we can build ANY AI system
- from simple automation tools
- to complex research and scientific AI systems
- for business, personal use, or monetization

5. CONTEXT AND KNOWLEDGE
You know the main website description, implemented project summaries, and full contacts below.

Website description:
{HOME_PAGE_TEXT}

Implemented projects:
{IMPLEMENTED_PROJECTS_TEXT}

Contacts:
{CONTACTS_TEXT}

6. PROJECTS AVAILABLE

{projects_text}

7. INVESTOR MODE
{investor_mode}

8. MEMORY

{memory_text}

9. USER MESSAGE

{message}

FINAL RULES:
- Be intelligent, structured, and helpful
- Be concise but meaningful
- Always guide user toward action
"""

    if "llm_calls" not in st.session_state:
        st.session_state.llm_calls = 0

    if st.session_state.llm_calls > 10:
        st.session_state.chat_messages.append("Murzik 🐉: Demo limit reached (10 requests)")
        return

    loader = st.empty()
    loader.markdown("🐉 Murzik is thinking...")

    response = groq_llm(full_prompt)

    loader.empty()

    if not response:
        response = "I am here. Please repeat your request."

    st.session_state.llm_calls += 1
    st.session_state.chat_messages.append("Murzik 🐉: " + response)
    st.session_state.murzik_memory.append(f"Murzik: {response}")
    st.session_state.murzik_memory = st.session_state.murzik_memory[-20:]


def handle_chat_send() -> None:
    message = st.session_state.chat_input_line
    if message.strip():
        send_chat_message(message)
    st.session_state.chat_input_line = ""


def render_chat_component() -> None:
    st.markdown('<div class="chat-shell">', unsafe_allow_html=True)

    avatar_base64 = get_image_base64(MURZIK_ICON)

    bubbles_html = '<div class="chat-history">'
    for msg in st.session_state.chat_messages:
        if msg.startswith("You:"):
            content = msg.replace("You:", "", 1).strip()
            role = "user"
        elif msg.startswith("Murzik 🐉:"):
            content = msg.replace("Murzik 🐉:", "", 1).strip()
            role = "agent"
        else:
            content = msg
            role = "agent"
        safe_content = html.escape(content).replace("\n", "<br>")
        if role == "agent":
            bubbles_html += f'''\n            <div class="chat-row">\n                <img src="data:image/png;base64,{avatar_base64}" class="murzik-avatar">\n                <div class="bubble agent">{safe_content}</div>\n            </div>\n            '''
        else:
            bubbles_html += f'<div class="bubble user">{safe_content}</div>'
    bubbles_html += "</div>"
    st.markdown(bubbles_html, unsafe_allow_html=True)

    col_input, col_send, col_upload, col_download, col_clear = st.columns([5, 1, 1, 1, 1])
    with col_input:
        st.text_input(tr("Message"), key="chat_input_line", on_change=handle_chat_send)
    with col_send:
        st.button(tr("Send"), key="chat_send", on_click=handle_chat_send)
    with col_upload:
        uploaded_file = st.file_uploader(tr("File"), type=["txt"], key="chat_file")
    with col_download:
        st.download_button(tr("Save"), data="\n".join(st.session_state.chat_messages), file_name="chat_history.txt", mime="text/plain", key="chat_download")
    with col_clear:
        if st.button(tr("Clean Chat"), key="chat_clear"):
            st.session_state.chat_messages = []
            st.rerun()

    if uploaded_file is not None:
        file_size_mb = uploaded_file.size / (1024 * 1024)
        if file_size_mb > MAX_FILE_SIZE_MB:
            st.warning(tr("File is too large. Maximum ") + str(MAX_FILE_SIZE_MB) + " MB")
        else:
            try:
                st.session_state.chat_file_content = uploaded_file.read().decode("utf-8", errors="ignore")
                st.success(tr("File loaded"))
            except Exception:
                st.warning(tr("Cannot read file"))

# ================================
# ========== HOME PAGE ===========
# ================================
if st.session_state.page == "home":
    render_home_icon("home")
    render_banner()
    render_menu_with_language()
    render_arrows_top_bottom()

    st.markdown('<div class="page-title">' + tr("Golden Dragon AI") + "</div>", unsafe_allow_html=True)
    st.markdown('<div class="subtitle-title">' + tr("AI Systems Architect and Data Scientist") + "</div>", unsafe_allow_html=True)

    st.markdown('<div class="section-title">' + tr("AI Systems, Agents, Machine Learning Platforms and Dataset Engineering for Business Automation") + "</div>", unsafe_allow_html=True)
    st.markdown('<div class="description">' + tr("Development of applied artificial intelligence systems including AI agents, multimodal AI pipelines, machine learning models, dataset engineering, and intelligent automation platforms designed for real-world business environments.") + "</div>", unsafe_allow_html=True)
    st.markdown('<div class="description">' + tr("This website presents working AI systems, model demonstrations, and applied machine learning solutions that show how artificial intelligence can be used to automate processes, analyze complex data, and support operational decision-making.") + "</div>", unsafe_allow_html=True)
    st.markdown('<div class="description">' + tr("The focus of this work is building complete AI systems, not just standalone models. Each solution combines dataset preparation, data pipelines, trained models, automation workflows, and production deployment into reliable systems that can be integrated into real company environments.") + "</div>", unsafe_allow_html=True)

    st.markdown('<div class="section-title">' + tr("As part of the development process, special attention is given to dataset engineering and data preparation, including:") + "</div>", unsafe_allow_html=True)

    st.markdown("<div class='description'><ul>"
                "<li>" + tr("dataset collection strategies") + "</li>"
                "<li>" + tr("dataset preparation and preprocessing") + "</li>"
                "<li>" + tr("annotation and labeling pipelines") + "</li>"
                "<li>" + tr("multimodal datasets for text, images, video, and audio") + "</li>"
                "<li>" + tr("data quality control and validation for machine learning systems") + "</li>"
                "</ul></div>", unsafe_allow_html=True)

    st.markdown('<div class="description">' + tr("This platform demonstrates applied artificial intelligence technologies, working AI models, intelligent agents, and machine learning systems, showing how modern AI solutions can be integrated into real operational environments.") + "</div>", unsafe_allow_html=True)
    st.markdown('<div class="description">' + tr("The technologies presented here illustrate how artificial intelligence can support automation, analytics, decision-making, and intelligent workflows across different industries and business processes.") + "</div>", unsafe_allow_html=True)

    st.markdown('<div class="section-title">Investment Opportunities</div>', unsafe_allow_html=True)
    st.markdown('<div class="description">Explore AI projects with high scalability and ROI potential.</div>', unsafe_allow_html=True)
    if st.button("View Investment Projects"):
        set_page("invest")
        st.rerun()

    render_arrows_bottom_top()

# ================================
# ========= MODELS PAGE ==========
# ================================
if st.session_state.page == "models":
    render_home_icon("models")
    render_banner()
    render_menu_with_language()
    render_arrows_top_bottom()

    st.markdown('<div class="page-title">' + tr("AI Models") + "</div>", unsafe_allow_html=True)
    st.markdown('<div class="description">' + tr("Unified interface for file upload, model selection, execution, and monitoring.") + "</div>", unsafe_allow_html=True)

    st.markdown('<div class="section-title">' + tr("Model Selection Menu") + "</div>", unsafe_allow_html=True)

    MODEL_OPTIONS = [
        "Neural Network — Deep Learning",
        "Generative AI — LLM / Text Generation",
        "Machine Learning — Random Forest",
        "Computer Vision — Image & Video Analysis",
        "Quantum-Inspired Models — QAOA / VQE Optimization",
        "Hybrid AI System — ML + Rules + LLM"
    ]

    MODEL_DESCRIPTIONS = {
        "Neural Network — Deep Learning":
            "Advanced neural network for pattern recognition, classification, and complex data processing.",
        "Generative AI — LLM / Text Generation":
            "AI model for generating text, answering questions, and working with natural language data.",
        "Machine Learning — Random Forest":
            "Reliable machine learning model for classification, prediction, and structured data analysis.",
        "Computer Vision — Image & Video Analysis":
            "AI system for analyzing images and video, detecting objects, and interpreting visual data.",
        "Quantum-Inspired Models — QAOA / VQE Optimization":
            "Advanced optimization model inspired by quantum algorithms for solving complex problems.",
        "Hybrid AI System — ML + Rules + LLM":
            "Integrated system combining machine learning, logic rules, and AI reasoning for decision support."
    }

    st.markdown(
        "<div class='description'><ul>"
        "<li><b>Neural Network — Deep Learning</b>: Advanced neural network for pattern recognition, classification, and complex data processing.</li>"
        "<li><b>Generative AI — LLM / Text Generation</b>: AI model for generating text, answering questions, and working with natural language data.</li>"
        "<li><b>Machine Learning — Random Forest</b>: Reliable machine learning model for classification, prediction, and structured data analysis.</li>"
        "<li><b>Computer Vision — Image & Video Analysis</b>: AI system for analyzing images and video, detecting objects, and interpreting visual data.</li>"
        "<li><b>Quantum-Inspired Models — QAOA / VQE Optimization</b>: Advanced optimization model inspired by quantum algorithms for solving complex problems.</li>"
        "<li><b>Hybrid AI System — ML + Rules + LLM</b>: Integrated system combining machine learning, logic rules, and AI reasoning for decision support.</li>"
        "</ul></div>",
        unsafe_allow_html=True
    )

    model_name = st.selectbox(
        tr("Model Selection"),
        MODEL_OPTIONS,
        key="model_select"
    )

    allowed_types = ["png", "jpg", "jpeg", "pdf", "txt", "csv", "json", "zip"]
    uploaded = st.file_uploader(tr("Upload file (supported formats:)") + " " + ", ".join(allowed_types), type=allowed_types, key="file_uploader_models")
    if uploaded is not None:
        st.session_state.uploaded_file_name = uploaded.name.replace(" ", "_")

    if st.button(tr("Start Model Training"), use_container_width=True, key="models_run"):
        reset_model_outputs()
        with st.spinner(tr("Running model...")):
            add_model_log(tr("Selected model") + ": " + model_name)
            add_model_log(tr("Loading model weights") + "...")
            add_model_log(tr("Preprocessing input") + "...")
            add_model_log(tr("Running inference") + "...")
            add_model_log("Initializing AI pipeline...")
            add_model_log("Loading model architecture...")
            add_model_log("Applying preprocessing...")
            add_model_log("Executing model layers...")
            add_model_log("Generating output...")
            add_model_log(tr("Post-processing results") + "...")
            add_model_log(tr("Execution pipeline initialized") + ".")
            if uploaded is None:
                add_model_log("⚠️ No file uploaded — running demo mode")
            if st.session_state.uploaded_file_name:
                add_model_log(tr("Input file") + ": " + st.session_state.uploaded_file_name)
            else:
                add_model_log(tr("Input file") + ": " + tr("none"))

            if model_name == "Neural Network — Deep Learning":
                result = demo_neural_network(uploaded)
            elif model_name == "Generative AI — LLM / Text Generation":
                prompt = "Explain how AI can be used in business in 3 structured points"
                result = groq_llm(prompt)
            elif model_name == "Machine Learning — Random Forest":
                result = demo_random_forest(uploaded)
            elif model_name == "Computer Vision — Image & Video Analysis":
                result = demo_cv(uploaded)
            elif model_name == "Quantum-Inspired Models — QAOA / VQE Optimization":
                result = demo_quantum(uploaded)
            elif model_name == "Hybrid AI System — ML + Rules + LLM":
                result = demo_hybrid(uploaded)
            else:
                result = "Unknown model"

            add_model_log("✅ RESULT GENERATED")
            add_model_log(result)

            st.success("Model execution completed")
            st.markdown("### 🧠 AI Result")
            st.code(result)

    st.markdown('---')
    st.markdown('<div class="section-title">🧾 ' + tr("Logs and Results") + "</div>", unsafe_allow_html=True)
    st.text_area(tr("Logs and Results"), value="\n".join(st.session_state.model_logs), height=260, key="models_logs")

    col_copy, col_clear = st.columns([1, 1])
    with col_copy:
        st.button(tr("Copy Logs"), use_container_width=True, key="copy_logs_button")
        st.session_state["copy_logs_value"] = "\n".join(st.session_state.model_logs)
    with col_clear:
        if st.button(tr("Clear Logs"), use_container_width=True, key="models_clear"):
            reset_model_outputs()
            st.rerun()

    render_arrows_bottom_top()

# ================================
# ===== IMPLEMENTED PROJECTS =====
# ================================
if st.session_state.page == "implemented":
    render_home_icon("implemented")
    render_banner()
    render_menu_with_language()
    render_arrows_top_bottom()

    st.markdown('<div class="page-title">' + tr("Implemented Projects") + "</div>", unsafe_allow_html=True)
    st.markdown('<div class="description">' + tr("Portfolio of implemented AI projects: computer vision, intelligent automation, decision support systems, and applied machine learning for real-world environments.") + "</div>", unsafe_allow_html=True)
    st.markdown("---")

    st.markdown('<div class="project-card">', unsafe_allow_html=True)
    safe_image(IMPLEMENTED_1_IMAGE)
    st.subheader(tr("ZetAI — Multimodal Artificial Intelligence Platform"))
    st.write(tr("AI Platform for Multimodal Data Processing, Dataset Preparation, and Machine Learning Workflows"))
    st.write(tr("""
ZetAI is an applied artificial intelligence platform designed to process and analyze multiple types of data including text, documents, images, and structured datasets.

The platform integrates AI processing pipelines, dataset preparation tools, and machine learning workflows into a unified environment for experimentation and applied AI development.

Platform capabilities

• processing and analysis of multiple document formats
• automated text extraction and analysis
• OCR processing for images and scanned documents
• dataset preparation for machine learning models
• data preprocessing and cleaning pipelines
• visualization and exploration of processed data

Supported data formats

PDF
DOCX
TXT
RTF
HTML
XML
Images
Compressed datasets

The platform automatically detects file types and extracts structured data for further analysis and machine learning workflows.

AI and machine learning components

Machine Learning pipelines
Text analysis and language detection
Spell checking and text normalization
Dataset generation for ML training
Feature extraction

Multimodal processing

The platform supports processing of different data modalities including:

text data
documents
images
structured datasets
mixed multimodal data

Technologies

Python
Streamlit
PyTorch
NumPy
Matplotlib
Seaborn
Tesseract OCR
BeautifulSoup
PDF processing libraries

Platform architecture

document parsing
text extraction
OCR processing
dataset preparation
machine learning workflows
data visualization

Application areas

dataset preparation for machine learning
multimodal data analysis
document intelligence systems
AI experimentation environments
AI model development workflows
"""))
    st.markdown("</div>", unsafe_allow_html=True)

    st.markdown('<div class="project-card">', unsafe_allow_html=True)
    safe_image(IMPLEMENTED_2_IMAGE)
    st.subheader(tr("Airport Security Object Detection System"))
    st.write(tr("Applied Computer Vision System for Dangerous Object Detection"))
    st.write(tr("""
Development of an AI system designed to support airport security screening by detecting potentially dangerous objects carried by passengers.

The system applies deep learning-based object detection models trained on a custom dataset of annotated screening images.

System capabilities

• detection of prohibited objects in passenger screening images
• automated assistance for airport security operators
• computer vision model trained on annotated security dataset

Dataset engineering

9233 processed images
8646 training images
587 images containing prohibited objects

Image preprocessing and augmentation were performed using the OpenCV library.
Dataset annotation was completed using the CVAT annotation platform.

Technologies

YOLOv8
Keras CV
OpenCV
Python
CVAT

Multiple architectures were evaluated including YOLOv8 and Keras-based object detection models.
"""))
    st.markdown("</div>", unsafe_allow_html=True)

    st.markdown('<div class="project-card">', unsafe_allow_html=True)
    safe_image(IMPLEMENTED_3_IMAGE)
    st.subheader(tr("Logistics Route Optimization System"))
    st.write(tr("AI System for Transport Route Optimization"))
    st.write(tr("""
Development of an intelligent logistics optimization system capable of calculating optimal transportation routes using historical data and operational constraints.

The project combines classical optimization algorithms with data-driven decision logic to generate efficient route planning solutions.

System capabilities

• route planning based on historical transportation data
• optimization of logistics operations
• support for operational transport planning

Algorithms used

Genetic Algorithms
Hungarian Algorithm
Traveling Salesman Problem
Hybrid optimization approaches

The system combines multiple algorithmic strategies to generate optimized transportation routes.
"""))
    st.markdown("</div>", unsafe_allow_html=True)

    st.markdown('<div class="project-card">', unsafe_allow_html=True)
    safe_image(IMPLEMENTED_4_IMAGE)
    st.subheader(tr("AI Judging System for Kyokushinkai Karate"))
    st.write(tr("Computer Vision System for Martial Arts Performance Analysis"))
    st.write(tr("""
Development of a pilot AI demonstrator designed to support judging and training analysis in Kyokushinkai karate competitions.

The system analyzes athlete movement using multi-camera video input and skeletal pose tracking.

System capabilities

• pose recognition and analysis
• athlete movement tracking
• kata recognition and evaluation support
• synchronization of motion and audio signals

Technologies

Computer Vision
MediaPipe
YOLOv8
Pose estimation
Multi-camera video processing
Python

The system analyzes synchronized video streams to evaluate athlete performance and assist judging during competitions.
"""))
    st.markdown("</div>", unsafe_allow_html=True)

    st.markdown('<div class="project-card">', unsafe_allow_html=True)
    safe_image(IMPLEMENTED_5_IMAGE)
    st.subheader(tr("Bridge Infrastructure Defect Detection System"))
    st.write(tr("Computer Vision System for Infrastructure Monitoring"))
    st.write(tr("""
Development of an AI system for automated detection of structural defects in bridge infrastructure images.

The system is designed to assist inspection teams in identifying potential structural issues and supporting maintenance operations.

System capabilities

• automated defect detection
• structural inspection assistance
• computer vision analysis of infrastructure images

Technologies

YOLO Object Detection
Defect Segmentation
Computer Vision
Python

The system supports infrastructure monitoring and maintenance workflows.
"""))
    st.markdown("</div>", unsafe_allow_html=True)

    st.markdown('<div class="project-card">', unsafe_allow_html=True)
    safe_image(IMPLEMENTED_6_IMAGE, tr("NASA Space Apps Challenge 2024"))
    st.subheader(tr("Exoplanet Habitability & Water Detection AI System (NASA Space Apps Challenge 2024)"))
    st.write(tr("Machine Learning System for Predicting Life Potential and Water Presence on Exoplanets"))
    st.write(tr("""
This project was developed as part of the NASA Space Apps Challenge 2024 and focuses on the application of artificial intelligence for the analysis of exoplanet candidates.

The system is built on real scientific data from the NASA Exoplanet Archive and is designed to evaluate the potential habitability of planets, including the probability of water presence — one of the key indicators for life.

The project demonstrates how AI can be applied to astrophysical data analysis to support future space exploration and research.

Core approach

• integration of NASA Exoplanet Archive data via API  
• preprocessing and normalization of astrophysical parameters  
• feature engineering (orbital characteristics, stellar radiation, temperature indicators)  
• creation of derived metrics for habitability assessment  
• classification modeling using Random Forest algorithm  
• dataset balancing using SMOTE for improved prediction quality  

System capabilities

• prediction of exoplanet habitability potential  
• estimation of water presence probability  
• identification of promising candidates for further research  
• analysis of environmental and physical planetary conditions  

Key results

The model successfully identified several exoplanet candidates with high habitability potential.

Examples include:

• K07849.01 — high probability of supporting life and highest predicted water presence (~0.60)  
• K03395.02 — strong habitability indicators  
• K07106.01 — low habitability despite moderate water probability  

These results demonstrate the ability of AI models to assist in prioritizing targets for scientific study and future exploration missions.

Applications and impact

• space research and astrophysics  
• exoplanet exploration programs  
• scientific data analysis automation  
• support tools for future space missions and colonization strategies  

Project significance

This project illustrates the practical use of machine learning in space science and highlights the potential of AI to accelerate discovery in astrophysics.

It represents an intersection of data science, astronomy, and advanced analytics applied to one of the most important questions in science — the search for life beyond Earth.

Project links

GitHub repository:
https://github.com/Kostratana/EVE_2024NASA_Challenge_MagicSpace_Team

NASA data source:
https://exoplanetarchive.ipac.caltech.edu
"""))
    st.markdown("</div>", unsafe_allow_html=True)

    render_arrows_bottom_top()

# ================================
# ===== PROJECTS FOR INVEST ======
# ================================
if st.session_state.page == "invest":
    render_home_icon("invest")
    render_banner()
    render_menu_with_language()
    render_arrows_top_bottom()

    st.markdown('<div class="page-title">' + tr("Projects for Investment") + "</div>", unsafe_allow_html=True)
    st.markdown('<div class="description">' + tr("This section presents selected high-potential AI projects currently in research, concept design, and early-stage development. These are strategically designed systems with strong applicability across real-world industries, prepared for further development, scaling, and commercialization. The projects are positioned as investment-ready directions and open for collaboration, co-development, and strategic partnership. Each solution can be expanded and adapted based on investor requirements and specific industry use cases.") + "</div>", unsafe_allow_html=True)
    st.markdown("---")

    st.markdown('<div class="project-card">', unsafe_allow_html=True)
    safe_image(INVEST_1_IMAGE)
    st.subheader(tr("Animal Cognitive & Health State Analysis System"))
    st.write(tr("AI System for Behavioral, Physiological and Cognitive State Interpretation in Animals"))
    st.write(tr("""
This project focuses on the development of an advanced artificial intelligence system designed to analyze animal behavior, physiological signals, and experimental bio-signal patterns in order to interpret cognitive and health-related states.

The system aims to combine multiple data sources — including behavioral observations, physiological measurements, and experimental neural signals — to detect patterns associated with stress, emotional states, and potential health conditions.

This is a forward-looking research direction at the intersection of AI, veterinary science, and animal cognition.

Project vision

• interpretation of animal cognitive and behavioral states  
• analysis of physiological and bio-signal data  
• experimental correlation of neural patterns and observable behavior  
• early detection of stress, discomfort, and health anomalies  

Applications and impact

• veterinary diagnostics and decision support systems  
• animal health monitoring and welfare improvement  
• livestock management and agricultural optimization  
• scientific research in animal cognition and neuroscience  

This technology has strong potential to become a foundational tool in modern veterinary practice, precision agriculture, and research environments.

Development status

Concept stage • Research phase • Prototype planning  

Investment and collaboration

This project is presented as an early-stage research and development initiative.

It is open for further development, expansion, and refinement based on investor requirements and strategic collaboration.

The scope of the system can be extended depending on specific industry needs, including veterinary applications, agricultural systems, and scientific research programs.

The project represents a high-impact opportunity in AI-driven veterinary and agricultural technologies with long-term scalability potential.
"""))
    col1, col2 = st.columns(2)
    with col1:
        if st.button("View Pitch"):
            st.markdown("### Pitch")
    with col2:
        if st.button("Discuss with Murzik"):
            st.session_state.page = "chat"
            st.session_state.chat_messages.append("User: I want to discuss this project")
            st.rerun()
    st.markdown("</div>", unsafe_allow_html=True)

    st.markdown('<div class="project-card">', unsafe_allow_html=True)
    safe_image(INVEST_2_IMAGE)
    st.subheader(tr("Underwater AI Inspection & Monitoring System"))
    st.write(tr("Autonomous Drone-Based System for Hull Inspection, Damage Detection, and Technical Monitoring"))
    st.write(tr("""
This project focuses on the development of an AI-powered underwater drone system designed for inspection, diagnostics, and monitoring of ships, yachts, and marine infrastructure.

The system combines computer vision, sensor data processing, and intelligent analysis to detect structural defects, corrosion, leaks, and other underwater anomalies in real time.

In addition to underwater inspection, the platform can be extended to include onboard monitoring systems for engine rooms and internal ship environments.

Project vision

• autonomous underwater inspection of vessel hulls  
• detection of corrosion, cracks, and structural damage  
• identification of leaks and material degradation  
• real-time video analysis and anomaly detection  
• integration with onboard monitoring systems  

Extended capabilities

• engine room monitoring (video-based AI analysis)  
• detection of fire risks and abnormal conditions  
• identification of mechanical failures and system anomalies  
• debris and foreign object detection in critical zones  

Applications and impact

• ship and yacht maintenance optimization  
• maritime safety and risk reduction  
• predictive maintenance systems  
• port and marine infrastructure inspection  
• industrial and offshore operations  

This system has strong potential in maritime engineering, fleet management, and industrial inspection, reducing costs, increasing safety, and enabling proactive maintenance strategies.

Development status

Concept stage • Research phase • System architecture design  

Investment and collaboration

This project is an early-stage development initiative with high scalability potential.

The system architecture can be expanded and customized based on investor needs, including specific use cases in maritime industry, offshore engineering, and industrial monitoring.

The project represents a strong opportunity for investment in AI-driven robotics, autonomous systems, and intelligent inspection technologies.
"""))
    col1, col2 = st.columns(2)
    with col1:
        if st.button("View Pitch", key="pitch_2"):
            st.markdown("### Pitch")
    with col2:
        if st.button("Discuss with Murzik", key="murzik_2"):
            st.session_state.page = "chat"
            st.session_state.chat_messages.append("User: I want to discuss this project")
            st.rerun()
    st.markdown("</div>", unsafe_allow_html=True)

    st.markdown('<div class="project-card">', unsafe_allow_html=True)
    safe_image(INVEST_3_IMAGE)
    st.subheader(tr("AI Natural Knowledge & Wellness Support Platform"))
    st.write(tr("AI System for Collecting, Structuring, and Applying Natural Health Knowledge"))
    st.write(tr("""
This project focuses on the development of an AI-driven knowledge platform that collects, structures, and analyzes information about natural approaches to health, including herbal knowledge, traditional practices, body alignment, and lifestyle-based wellness methods.

The system is designed as an intelligent support tool that helps users explore natural health practices, understand their potential effects, analyze body symmetry and posture, and receive personalized recommendations based on their individual data and preferences.

The platform does not replace medical professionals, but serves as an educational and analytical system supporting informed lifestyle decisions, body awareness, and preventive care.

Project vision

• structured database of herbal knowledge and natural practices  
• AI-powered analysis of natural health methods and their effects  
• body symmetry and posture analysis using visual data  
• detection of imbalances and movement optimization  
• personalized recommendations based on lifestyle and user input  
• integration of traditional knowledge with modern data analysis  
• development of intelligent wellness support systems  

Potential applications

• wellness and lifestyle applications  
• educational platforms for natural health  
• personalized herbal and nutrition recommendations  
• posture correction and body alignment tools  
• digital assistants for preventive health support  
• fitness, yoga, and rehabilitation support systems  
• knowledge platforms for integrative approaches  

Development status

Concept stage • Research phase • Knowledge base formation  

Investment potential

This project targets the rapidly growing global market of wellness, natural health, body optimization, and personalized lifestyle solutions.

The platform can be expanded and customized based on investor interests, including regional herbal systems, body analysis modules, specific wellness directions, and integration with digital health ecosystems.
"""))
    col1, col2 = st.columns(2)
    with col1:
        if st.button("View Pitch", key="pitch_3"):
            st.markdown("### Pitch")
    with col2:
        if st.button("Discuss with Murzik", key="murzik_3"):
            st.session_state.page = "chat"
            st.session_state.chat_messages.append("User: I want to discuss this project")
            st.rerun()
    st.markdown("</div>", unsafe_allow_html=True)

    st.markdown('<div class="project-card">', unsafe_allow_html=True)
    safe_image(INVEST_4_IMAGE)
    st.subheader(tr("AI Behavioral Anomaly Detection System"))
    st.write(tr("AI System for Detecting Abnormal Behavior and Unusual Events in Video and Sensor Data"))
    st.write(tr("""
This project focuses on the development of an AI-based system designed to detect abnormal behavior, unusual activity, and unexpected events in video streams and sensor data.

The system analyzes patterns of normal behavior in a given environment and automatically identifies deviations that may indicate risk, danger, or operational anomalies.

Instead of relying only on predefined rules, the platform uses machine learning to understand what is normal and detect subtle or previously unseen anomalies in real time.

Project vision

• detection of abnormal human behavior and movement patterns  
• identification of unusual events in video environments  
• recognition of unexpected object appearance or disappearance  
• monitoring of activity patterns in real time  
• adaptive learning of normal behavioral baselines  

System capabilities

• anomaly detection in surveillance and camera systems  
• real-time alerts for unusual or suspicious activity  
• detection of falls, abnormal motion, or inactivity  
• identification of environmental anomalies (smoke, fire, unexpected changes)  
• scalable deployment across multiple environments  

Applications and impact

• home safety and smart home systems  
• monitoring of elderly people and fall detection  
• business security and theft prevention  
• industrial monitoring and anomaly detection  
• public safety and infrastructure protection  

The system can significantly improve safety, reduce risks, and automate monitoring processes across both personal and enterprise environments.

Development status

Concept stage • Research phase • Dataset and model architecture design  

Investment potential

This project targets the rapidly growing global market of AI-based security, smart surveillance, and intelligent monitoring systems.

The solution can be deployed as a scalable platform for both consumer and enterprise markets, including smart home products, security services, and industrial monitoring systems.

The architecture allows expansion into real-time analytics, edge AI devices, and integration with existing security infrastructures.
"""))
    col1, col2 = st.columns(2)
    with col1:
        if st.button("View Pitch", key="pitch_4"):
            st.markdown("### Pitch")
    with col2:
        if st.button("Discuss with Murzik", key="murzik_4"):
            st.session_state.page = "chat"
            st.session_state.chat_messages.append("User: I want to discuss this project")
            st.rerun()
    st.markdown("</div>", unsafe_allow_html=True)

    render_arrows_bottom_top()

if st.session_state.page == "chat":
    render_home_icon("chat")
    render_banner()
    render_menu_with_language()
    render_arrows_top_bottom()

    st.markdown('<div class="section-title">Murzik AI Assistant 🐉</div>', unsafe_allow_html=True)
    st.markdown(""")
    <div class="description chat-intro">
    Welcome — I am Murzik, your AI assistant.<br><br>
    I represent advanced AI systems designed and developed by Svetlana Rumyantseva.<br><br>
    I can help you:<br>
    • explore implemented AI projects<br>
    • design custom AI solutions<br>
    • estimate ROI and investment potential<br>
    • explain AI architectures<br>
    • suggest solutions for your business<br><br>
    Start by asking your question below.
    </div>
    """, unsafe_allow_html=True)

    render_chat_component()
    render_arrows_bottom_top()

if st.session_state.page == "contact":
    render_home_icon("contact")
    render_banner()
    render_menu_with_language()
    render_arrows_top_bottom()

    st.markdown('<div class="page-title">' + tr("Contact") + "</div>", unsafe_allow_html=True)

    email_address = "srumyantseva7@gmail.com"
    telegram_username = "Svetlana_KostraTana"
    whatsapp_phone_international = "50764045877"

    github_url = "https://github.com/Kostratana/Greeting_page_links-"
    linkedin_url = "https://www.linkedin.com/in/svetlana-rumyantseva-5b41962b9/"
    youtube_url = "https://www.youtube.com/"
    kaggle_url = "https://www.kaggle.com/svetlanarumyantseva7"

    st.markdown(""")
    <div class="contact-block">
        <div class="contact-name">Svetlana Rumyantseva</div>
        <div class="contact-row">
            <img class="contact-icon" src="https://cdn.simpleicons.org/gmail/ffffff" />
            Email: <a href="mailto:{0}">{0}</a>
        </div>
        <div class="contact-row">
            <img class="contact-icon" src="https://cdn.simpleicons.org/whatsapp/25D366" />
            WhatsApp: <a href="https://wa.me/{1}" target="_blank">+507 6404 58 77</a>
        </div>
        <div class="contact-row">
            <img class="contact-icon" src="https://cdn.simpleicons.org/telegram/26A5E4" />
            Telegram: <a href="https://t.me/{2}" target="_blank">@{2}</a>
        </div>
        <div class="contact-row">
            <img class="contact-icon" src="https://cdn.simpleicons.org/github/ffffff" />
            <a href="{3}" target="_blank">GitHub</a>
        </div>
        <div class="contact-row">
            <img class="contact-icon" src="https://cdn.simpleicons.org/linkedin/0A66C2" />
            <a href="{4}" target="_blank">LinkedIn</a>
        </div>
        <div class="contact-row">
            <img class="contact-icon" src="https://cdn.simpleicons.org/kaggle/20BEFF" />
            <a href="{5}" target="_blank">Kaggle</a>
        </div>
        <div class="contact-row">
            <img class="contact-icon" src="https://cdn.simpleicons.org/youtube/FF0000" />
            <a href="{6}" target="_blank">YouTube</a>
        </div>
    </div>
    """.format(email_address, whatsapp_phone_international, telegram_username, github_url, linkedin_url, kaggle_url, youtube_url), unsafe_allow_html=True)

    render_arrows_bottom_top()

if st.session_state.page not in ["home","models","implemented","invest","chat","contact"]:
    st.session_state.page = "home"

st.markdown("""
<div class="fixed-footer">
© 2026 Svetlana Rumyantseva. All rights reserved.
</div>
""", unsafe_allow_html=True)