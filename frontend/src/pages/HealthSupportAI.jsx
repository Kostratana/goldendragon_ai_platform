import {
    useEffect,
    useRef,
    useState
} from "react";

import { motion } from "framer-motion";

import AnimatedInkText from "../components/AnimatedInkText";
import Footer from "../components/Footer";

import ChatWindow from "../features/chat/ChatWindow";

import useDragResize from "../hooks/useDragResize";
import useFounderBreakpoints from "../hooks/useFounderBreakpoints";

import {
    T,
    useLanguage,
    useTranslatedText
} from "../services/translation";

import {
    GOLD,
    TEXT
} from "../theme/colors";

import {
    FONT_CINZEL,
    FONT_CINZEL_DECORATIVE,
    FONT_IM_FELL
} from "../theme/fonts";

import foodMurzikImage from "../assets/food_murzik.png";

const HERO_TITLE =
    "Health Support AI";

const HERO_SUBTITLE =
    "An intelligent AI assistant helping people make healthier food choices through computer vision, nutritional intelligence and personalized health analysis.";

const PROJECT_MODES = {
    CHAT: "chat"
};

const SECTIONS = [
    {
        title: "Project Overview",
        paragraphs: [
            "Health Support AI is an intelligent healthcare assistant designed to help people make healthier nutritional decisions through artificial intelligence, computer vision and personalized health analysis.",
            "The platform combines food recognition, ingredient analysis, health assessment and intelligent recommendations into a single AI assistant focused on preventive healthcare."
        ]
    },
    {
        title: "Food Ingredient Analysis",
        paragraphs: [
            "Users scan food packaging or upload product images directly into the chat.",
            "The AI automatically detects ingredients, identifies potentially harmful additives, explains each ingredient in clear language and evaluates possible health risks.",
            "The assistant recommends healthier alternatives and helps users make informed purchasing decisions before buying food products."
        ]
    },
    {
        title: "Personal Health Assessment",
        paragraphs: [
            "The assistant creates an individual health profile through an intelligent questionnaire.",
            "Using the user's answers, lifestyle, nutrition, symptoms and personal preferences, the AI evaluates the current health condition and prepares personalized nutritional recommendations.",
            "Every recommendation is tailored specifically to the individual user."
        ]
    },
    {
        title: "Body Symmetry & Inflammation Analysis",
        paragraphs: [
            "Using Computer Vision, the platform analyzes body symmetry through smartphone images.",
            "Future multimodal analysis combines body posture, movement patterns and infrared imaging concepts to detect possible signs of inflammation.",
            "The AI combines visual analysis with questionnaire results to generate personalized health insights and nutrition recommendations."
        ]
    },
    {
        title: "Core Mission",
        paragraphs: [
            "The primary goal of Health Support AI is to help people identify harmful food ingredients before purchase, better understand nutritional choices and receive intelligent AI-powered recommendations that support preventive healthcare."
        ]
    }
];

const CURRENT_DEVELOPMENT_ITEMS = [
    "Google Cloud backend",
    "Retrieval-Augmented Generation (RAG)",
    "Supabase database",
    "Prompt system",
    "AI orchestration",
    "Product knowledge pipeline"
];

export default function HealthSupportAI() {

    const {
        isMobile,
        isTablet
    } = useFounderBreakpoints();

    const {
        isMobile: isChatMobile,
        isTablet: isChatTablet,
        chatBox,
        startDrag,
        startTopLeftResize,
        startTopRightResize,
        startBottomLeftResize,
        startBottomRightResize,
        startRightResize,
        startBottomResize
    } = useDragResize();

    const {
        currentUserLanguage
    } = useLanguage();

    const translatedHeroTitle =
        useTranslatedText(
            HERO_TITLE,
            {
                brand: true
            }
        );

    const translatedHeroSubtitle =
        useTranslatedText(
            HERO_SUBTITLE
        );

    const translatedProjectBannerAlt =
        useTranslatedText(
            HERO_TITLE,
            {
                brand: true
            }
        );

    const [mode, setMode] =
        useState("CHAT");

    const [activeProject, setActiveProject] =
        useState(PROJECT_MODES.CHAT);

    const [message, setMessage] =
        useState("");

    const [messages, setMessages] =
        useState([
            {
                role: "assistant",
                text: "Welcome."
            }
        ]);

    const [uploadedFile, setUploadedFile] =
        useState(null);

    const [isThinking, setIsThinking] =
        useState(false);

    const [voiceEnabled, setVoiceEnabled] =
        useState(false);

    const messagesRef =
        useRef(null);

    const audioRuntimeRef =
        useRef(null);

    const pagePaddingX =
        isMobile
            ? "max(20px, env(safe-area-inset-left, 0px))"
            : isTablet
                ? "44px"
                : "64px";

    const maxTextWidth =
        "820px";

    const sectionSpacing =
        isMobile
            ? "70px"
            : isTablet
                ? "92px"
                : "112px";

    const heroTitleStyle = {
        color: GOLD,
        fontFamily: FONT_CINZEL_DECORATIVE,
        fontWeight: "700",
        fontSize:
            isMobile
                ? "31px"
                : isTablet
                    ? "44px"
                    : "58px",
        letterSpacing:
            isMobile
                ? "0.02em"
                : isTablet
                    ? "0.05em"
                    : "0.07em",
        lineHeight:
            isMobile
                ? "1.26"
                : "1.22",
        margin: 0,
        "--gd-ink-duration": "22s",
        "--gd-ink-delay-step": "0.10s",
        textAlign: "center",
        textShadow:
            "0 0 26px rgba(216,176,122,0.30), 0 0 58px rgba(255,140,0,0.12)"
    };

    const heroSubtitleStyle = {
        color: TEXT,
        fontFamily: FONT_IM_FELL,
        fontWeight: "400",
        fontSize:
            isMobile
                ? "20px"
                : isTablet
                    ? "23px"
                    : "27px",
        letterSpacing:
            isMobile
                ? "0.01em"
                : "0.03em",
        lineHeight:
            isMobile
                ? "1.55"
                : "1.65",
        margin: 0,
        maxWidth: "820px",
        marginInline: "auto",
        textAlign: "center",
        textShadow:
            "0 0 16px rgba(216,176,122,0.16)"
    };

    const paragraphStyle = {
        color: TEXT,
        fontFamily: FONT_IM_FELL,
        fontSize:
            isMobile
                ? "18px"
                : isTablet
                    ? "20px"
                    : "22px",
        lineHeight:
            isMobile
                ? 1.75
                : 1.82,
        letterSpacing: "0.01em",
        margin: 0,
        textAlign: "center"
    };

    const smallHeadingStyle = {
        color: GOLD,
        fontFamily: FONT_CINZEL,
        fontSize:
            isMobile
                ? "21px"
                : isTablet
                    ? "23px"
                    : "26px",
        fontWeight: "700",
        lineHeight: 1.32,
        letterSpacing: "0.04em",
        margin: 0,
        textAlign: "center",
        textShadow:
            "0 0 15px rgba(216,176,122,0.18)"
    };

    function stopMurzikVoice() {

        try {

            if (
                audioRuntimeRef.current
            ) {

                audioRuntimeRef.current.pause();

                audioRuntimeRef.current.currentTime =
                    0;
            }

        } catch (error) {

            console.error(
                "Murzik stop runtime error:",
                error
            );
        }
    }

    async function copyMessages() {

        try {

            const text =
                messages
                    .map(item => item.text)
                    .join("\n\n");

            await navigator.clipboard.writeText(text);

        } catch (error) {

            console.log(error);
        }
    }

    function downloadMessages() {

        const text =
            messages
                .map(item =>
                    `[${item.role.toUpperCase()}]\n${item.text}`
                )
                .join("\n\n");

        const blob =
            new Blob(
                [text],
                {
                    type: "text/plain"
                }
            );

        const url =
            URL.createObjectURL(blob);

        const link =
            document.createElement("a");

        link.href = url;

        link.download =
            "murzik-chat.txt";

        document.body.appendChild(link);

        link.click();

        document.body.removeChild(link);

        URL.revokeObjectURL(url);
    }

    async function sendMessage() {

        if (!message.trim()) {
            return;
        }

        const userMessage =
            message;

        setMessages(prev => [
            ...prev,
            {
                role: "user",
                text: userMessage
            }
        ]);

        setMessage("");

        setIsThinking(true);

        try {

            const response =
                await fetch(
                    "https://murzik-chat-backend.vercel.app/api/chat",
                    {
                        method: "POST",

                        headers: {
                            "Content-Type": "application/json"
                        },

                        body: JSON.stringify({

                            message: userMessage,

                            mode: activeProject,

                            language:
                                currentUserLanguage

                        })
                    }
                );

            if (!response.ok) {

                throw new Error(
                    `Backend error: ${response.status}`
                );
            }

            const data =
                await response.json();

            const responseText =
                data.response ||
                "Murzik returned an empty response.";

            setMessages(prev => [
                ...prev,
                {
                    role: "assistant",
                    text: responseText
                }
            ]);

        } catch (error) {

            console.error(
                "Murzik backend error:",
                error
            );

            setMessages(prev => [
                ...prev,
                {
                    role: "assistant",
                    text:
                        `ERROR: ${error.message}`
                }
            ]);
        }

        setIsThinking(false);
    }

    function clearMessages() {

        setMessages([]);

        stopMurzikVoice();
    }

    useEffect(() => {

        if (messagesRef.current) {

            messagesRef.current.scrollTop =
                messagesRef.current.scrollHeight;
        }

    }, [messages]);

    return (
        <main
            style={{
                minHeight: "100vh",
                width: "100%",
                maxWidth: "100vw",
                overflowX: "hidden",
                background:
                    "linear-gradient(to bottom, #050505 0%, #080603 48%, #050505 100%)",
                color: "white",
                position: "relative",
                fontFamily: FONT_IM_FELL
            }}
        >

            <motion.div
                animate={{
                    opacity: [0.08, 0.14, 0.08]
                }}
                transition={{
                    duration: 12,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
                style={{
                    position: "absolute",
                    top:
                        isMobile
                            ? "-110px"
                            : "-190px",
                    right:
                        isMobile
                            ? "-140px"
                            : "-260px",
                    width:
                        isMobile
                            ? "300px"
                            : isTablet
                                ? "520px"
                                : "760px",
                    height:
                        isMobile
                            ? "300px"
                            : isTablet
                                ? "520px"
                                : "760px",
                    borderRadius: "9999px",
                    background:
                        "rgba(255,140,0,0.10)",
                    filter:
                        isMobile
                            ? "blur(58px)"
                            : "blur(112px)",
                    pointerEvents: "none"
                }}
            />

            <section
                style={{
                    position: "relative",
                    zIndex: 2,
                    minHeight:
                        isMobile
                            ? "auto"
                            : "82vh",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    paddingTop:
                        isMobile
                            ? "max(118px, calc(98px + env(safe-area-inset-top, 0px)))"
                            : isTablet
                                ? "142px"
                                : "158px",
                    paddingBottom:
                        isMobile
                            ? "72px"
                            : "98px",
                    paddingLeft: pagePaddingX,
                    paddingRight: pagePaddingX,
                    boxSizing: "border-box"
                }}
            >
                <div
                    style={{
                        width: "100%",
                        maxWidth: maxTextWidth,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap:
                            isMobile
                                ? "24px"
                                : "30px",
                        textAlign: "center"
                    }}
                >
                    <AnimatedInkText
                        as="h1"
                        style={heroTitleStyle}
                        text={translatedHeroTitle}
                    />

                    <AnimatedInkText
                        as="p"
                        style={heroSubtitleStyle}
                        text={translatedHeroSubtitle}
                    />
                </div>
            </section>

            <section
                style={{
                    position: "relative",
                    zIndex: 2,
                    paddingLeft: pagePaddingX,
                    paddingRight: pagePaddingX,
                    paddingBottom: sectionSpacing,
                    boxSizing: "border-box"
                }}
            >
                <img
                    src={foodMurzikImage}
                    alt={translatedProjectBannerAlt}
                    loading="eager"
                    decoding="async"
                    style={{
                        display: "block",
                        width: "100%",
                        maxWidth: "900px",
                        margin: "0 auto",
                        borderRadius:
                            isMobile
                                ? "22px"
                                : "30px",
                        boxShadow:
                            `
                            0 0 42px rgba(216,176,122,0.16),
                            0 0 100px rgba(255,140,0,0.08)
                            `
                    }}
                />
            </section>

            <section
                style={{
                    position: "relative",
                    zIndex: 2,
                    paddingLeft: pagePaddingX,
                    paddingRight: pagePaddingX,
                    paddingBottom: sectionSpacing,
                    boxSizing: "border-box"
                }}
            >
                <div
                    style={{
                        maxWidth: maxTextWidth,
                        margin: "0 auto",
                        display: "flex",
                        flexDirection: "column",
                        gap:
                            isMobile
                                ? "54px"
                                : "68px"
                    }}
                >
                    {SECTIONS.map((section) => (
                        <article
                            key={section.title}
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                gap:
                                    isMobile
                                        ? "18px"
                                        : "22px",
                                textAlign: "center"
                            }}
                        >
                            <h2 style={smallHeadingStyle}>
                                <T>
                                    {section.title}
                                </T>
                            </h2>

                            {section.paragraphs.map((paragraph) => (
                                <p
                                    key={paragraph}
                                    style={paragraphStyle}
                                >
                                    <T>
                                        {paragraph}
                                    </T>
                                </p>
                            ))}
                        </article>
                    ))}
                </div>
            </section>

            <section
                style={{
                    position: "relative",
                    zIndex: 2,
                    paddingLeft: pagePaddingX,
                    paddingRight: pagePaddingX,
                    paddingBottom: sectionSpacing,
                    boxSizing: "border-box"
                }}
            >
                <div
                    style={{
                        maxWidth: maxTextWidth,
                        margin: "0 auto",
                        display: "flex",
                        flexDirection: "column",
                        gap:
                            isMobile
                                ? "22px"
                                : "28px",
                        textAlign: "center"
                    }}
                >
                    <h2 style={smallHeadingStyle}>
                        <T>
                            Current Platform Infrastructure
                        </T>
                    </h2>

                    <p style={paragraphStyle}>
                        <T>
                            The current platform already includes:
                        </T>
                    </p>

                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            gap:
                                isMobile
                                    ? "10px"
                                    : "12px",
                            color: TEXT,
                            fontFamily: FONT_IM_FELL,
                            fontSize:
                                isMobile
                                    ? "18px"
                                    : "21px",
                            lineHeight: 1.65,
                            textAlign: "center"
                        }}
                    >
                        {CURRENT_DEVELOPMENT_ITEMS.map((item) => (
                            <div
                                key={item}
                                style={{
                                    display: "flex",
                                    alignItems: "baseline",
                                    justifyContent: "center",
                                    gap: "10px",
                                    width: "100%"
                                }}
                            >
                                <span
                                    aria-hidden="true"
                                    style={{
                                        color: GOLD,
                                        flex: "0 0 auto"
                                    }}
                                >
                                    •
                                </span>

                                <T>
                                    {item}
                                </T>
                            </div>
                        ))}
                    </div>

                    <p style={paragraphStyle}>
                        <T>
                            The platform continues evolving toward a fully integrated intelligent healthcare assistant.
                        </T>
                    </p>
                </div>
            </section>

            <section
                style={{
                    position: "relative",
                    zIndex: 2,
                    paddingLeft: pagePaddingX,
                    paddingRight: pagePaddingX,
                    paddingBottom:
                        isMobile
                            ? "70px"
                            : "94px",
                    boxSizing: "border-box",
                    display: "flex",
                    justifyContent: "center"
                }}
            >
                <ChatWindow
                    mode={mode}
                    setMode={setMode}
                    activeProject={activeProject}
                    setActiveProject={setActiveProject}
                    message={message}
                    setMessage={setMessage}
                    uploadedFile={uploadedFile}
                    setUploadedFile={setUploadedFile}
                    messages={messages}
                    messagesRef={messagesRef}
                    sendMessage={sendMessage}
                    clearMessages={clearMessages}
                    copyMessages={copyMessages}
                    downloadMessages={downloadMessages}
                    isThinking={isThinking}
                    isMobile={isChatMobile}
                    isTablet={isChatTablet}
                    chatBox={chatBox}
                    startDrag={startDrag}
                    startTopLeftResize={startTopLeftResize}
                    startTopRightResize={startTopRightResize}
                    startBottomLeftResize={startBottomLeftResize}
                    startBottomRightResize={startBottomRightResize}
                    startRightResize={startRightResize}
                    startBottomResize={startBottomResize}
                    voiceEnabled={voiceEnabled}
                    setVoiceEnabled={setVoiceEnabled}
                    stopMurzikVoice={stopMurzikVoice}
                />
            </section>

            <Footer />

        </main>
    );
}
