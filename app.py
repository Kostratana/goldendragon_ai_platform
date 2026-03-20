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

.stImage,
.stImage > img,
.stImage > figure,
.stImage > figure > img,
div[data-testid="stImage"],
div[data-testid="stImage"] > img,
div[data-testid="stImage"] > figure,
div[data-testid="stImage"] img,
img {
    border: none !important;
    outline: none !important;
    box-shadow: none !important;
    background: transparent !important;
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
    height: 500px;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
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

    st.session_state.chat_messages.append(message)
    st.session_state.murzik_memory.append(f"User: {message}")
    st.session_state.murzik_memory = st.session_state.murzik_memory[-10:]

    prompt = "\n".join(st.session_state.murzik_memory)

    response = groq_llm(prompt)
    st.session_state.chat_messages.append(response)
    st.session_state.murzik_memory.append(f"Murzik: {response}")
    st.session_state.murzik_memory = st.session_state.murzik_memory[-10:]


def on_enter_send() -> None:
    message = st.session_state.chat_input_line
    if message.strip():
        send_chat_message(message)
    st.session_state.chat_input_line = ""


def render_chat_component() -> None:
    st.markdown("### Chat")

    for message in st.session_state.chat_messages:
        st.markdown(message)

    st.text_input(tr("Message"), key="chat_input_line", on_change=on_enter_send)

    uploaded_file = st.file_uploader(tr("Upload file"), type=["txt", "pdf", "csv", "json", "py", "md", "zip", "jpg", "png"])
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
