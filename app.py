import streamlit as st
from PIL import Image
import datetime
import base64

st.set_page_config(
    page_title="Golden Dragon AI",
    layout="wide"
)

# ---------- Стили ----------
st.markdown("""
<style>

body {
    background-color: black;
}

.main-title {
    color: gold;
    font-size: 48px;
    font-weight: bold;
}

.subtitle {
    color: white;
    font-size: 24px;
}

.description {
    color: white;
    font-size: 18px;
}

.log-window {
    background-color: #111;
    color: #00ff9c;
    padding: 10px;
    height: 250px;
    overflow-y: scroll;
    border-radius: 8px;
}

.chat-window {
    background-color: #111;
    padding: 10px;
    height: 300px;
    overflow-y: scroll;
    border-radius: 8px;
}

</style>
""", unsafe_allow_html=True)


# ---------- Фон страницы ----------
def set_background(image_file):

    with open(image_file, "rb") as image:
        encoded = base64.b64encode(image.read()).decode()

    st.markdown(
        f"""
        <style>
        .stApp {{
            background-image: url("data:image/jpg;base64,{encoded}");
            background-size: cover;
        }}
        </style>
        """,
        unsafe_allow_html=True
    )


# подключаем фон
set_background("assets/home_background.jpg")


# ---------- Меню ----------
menu = st.sidebar.selectbox(
    "Navigation",
    [
        "Home",
        "Technology",
        "Solutions",
        "Demo",
        "Projects",
        "Research",
        "About",
        "Contact"
    ]
)


# ---------- Логи ----------
logs = []

def add_log(message):
    time = datetime.datetime.now().strftime("%H:%M:%S")
    logs.append(f"[{time}] {message}")


# ---------- HOME ----------
if menu == "Home":

    st.markdown('<p class="main-title">AI Systems Architect and Data Scientist</p>', unsafe_allow_html=True)

    st.markdown('<p class="subtitle">AI Systems, Agents, Machine Learning Platforms and Dataset Engineering for Business Automation</p>', unsafe_allow_html=True)

    st.markdown("""
<div class="description">

Development of applied artificial intelligence systems including AI agents, multimodal AI pipelines, machine learning models, dataset engineering, and intelligent automation platforms designed for real-world business environments.

This website presents working AI systems, model demonstrations, and applied machine learning solutions that show how artificial intelligence can be used to automate processes, analyze complex data, and support operational decision-making.

The focus of this work is building complete AI systems, not just standalone models.

</div>
""", unsafe_allow_html=True)

    st.write("")
    st.write("")

    col1, col2, col3 = st.columns(3)

    col1.metric("AI Systems", "Architecture")
    col2.metric("Machine Learning", "Models")
    col3.metric("Dataset Engineering", "Pipelines")


# ---------- TECHNOLOGY ----------
if menu == "Technology":

    st.title("Technology")

    st.subheader("AI Systems Architecture")
    st.write("Design of scalable AI systems and pipelines")

    st.subheader("AI Agents")
    st.write("Intelligent agents for automation")

    st.subheader("Machine Learning")
    st.write("Model development and training")

    st.subheader("Multimodal AI")
    st.write("Processing text, images, audio and video")

    st.subheader("Dataset Engineering")
    st.write("Data preparation and pipelines")

    st.subheader("AI Infrastructure")
    st.write("Deployment and integration")


# ---------- SOLUTIONS ----------
if menu == "Solutions":

    st.title("AI Solutions")

    st.write("AI for Business")
    st.write("Computer Vision")
    st.write("Conversational AI")
    st.write("AI Analytics")
    st.write("Decision Systems")


# ---------- DEMO ----------
if menu == "Demo":

    st.title("AI Model Demo")

    model = st.selectbox(
        "Select AI Model",
        [
            "Object Detection",
            "Bridge Defect Detection",
            "Pose Detection",
            "Multimodal AI"
        ]
    )

    uploaded_file = st.file_uploader("Upload File")

    if uploaded_file:

        add_log("File uploaded")

        try:
            image = Image.open(uploaded_file)
            st.image(image)

        except:
            st.write("File uploaded")

    if st.button("Run Inference"):

        add_log("Running model")
        add_log("Processing data")
        add_log("Inference completed")

        st.success("Model execution completed")

        result = "AI result example"

        st.write(result)

        st.download_button(
            label="Download Result",
            data=result,
            file_name="result.txt"
        )


# ---------- PROJECTS ----------
if menu == "Projects":

    st.title("Industrial and Research AI Projects")

    col1, col2 = st.columns(2)

    with col1:

        st.subheader("Airport Security Detection")
        st.image("assets/project_airport_security.jpg")
        st.write("Computer vision system for detecting prohibited objects in airport security environments.")

        st.subheader("Logistics Route Optimization")
        st.image("assets/project_logistics_ai.jpg")
        st.write("AI system for logistics optimization and transport planning.")

        st.subheader("ZetAI Multimodal Platform")
        st.image("assets/project_zetai_platform.jpg")
        st.write("Multimodal AI platform for dataset processing and machine learning workflows.")

    with col2:

        st.subheader("Bridge Defect Detection")
        st.image("assets/project_bridge_detection.jpg")
        st.write("AI system for corrosion and structural damage detection in bridge inspection.")

        st.subheader("Karate Pose Detection")
        st.image("assets/project_karate_pose.jpg")
        st.write("AI judging system using pose estimation for sports analysis.")


# ---------- RESEARCH ----------
if menu == "Research":

    st.title("Research")

    st.write("AI experiments")
    st.write("Model development")
    st.write("Dataset engineering")


# ---------- ABOUT ----------
if menu == "About":

    st.title("About")

    st.write("""
AI Systems Architect and Data Scientist specializing in applied artificial intelligence systems,
machine learning platforms, dataset engineering and intelligent automation.
""")


# ---------- CONTACT ----------
if menu == "Contact":

    st.title("Contact")

    name = st.text_input("Name")
    email = st.text_input("Email")
    message = st.text_area("Message")

    if st.button("Send"):
        st.success("Message sent")


# ---------- LOG WINDOW ----------
st.sidebar.write("Logs")

log_box = st.sidebar.empty()

log_box.markdown(
    f'<div class="log-window">{"<br>".join(logs)}</div>',
    unsafe_allow_html=True
)


# ---------- CHAT ----------
st.sidebar.write("AI Chat")

chat_input = st.sidebar.text_input("Message")

if st.sidebar.button("Send"):

    response = "AI response example"

    st.sidebar.write(response)

    st.sidebar.download_button(
        label="Download Chat",
        data=response,
        file_name="chat.txt"
    )