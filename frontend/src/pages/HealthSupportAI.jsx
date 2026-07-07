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
            "Health Support AI combines food recognition, ingredient analysis and personalized health assessment in one preventive healthcare assistant."
        ]
    },
    {
        title: "Food Ingredient Analysis",
        paragraphs: [
            "Users scan packaging or upload product images, then the AI explains ingredients, flags harmful additives and recommends healthier alternatives before purchase."
        ]
    },
    {
        title: "Personal Health Assessment",
        paragraphs: [
            "An intelligent questionnaire builds a health profile from lifestyle, nutrition, symptoms, habits, allergies and personal preferences."
        ]
    },
    {
        title: "Body Symmetry & Inflammation Analysis",
        paragraphs: [
            "Computer Vision analyzes body symmetry from smartphone images and supports future posture, movement and inflammation insight workflows."
        ]
    },
    {
        title: "Core Mission",
        paragraphs: [
            "The mission is to help people understand food choices faster and receive AI-powered recommendations that support preventive healthcare."
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

    const chatFrameRef =
        useRef(null);

    const createEmbeddedChatBox = () => {

        const viewportWidth =
            window.innerWidth;

        const viewportHeight =
            window.innerHeight;

        const framePadding =
            isMobile
                ? 24
                : 32;

        const width =
            Math.round(
                Math.min(
                    viewportWidth -
                        (isMobile ? 40 : isTablet ? 88 : 128) -
                        framePadding,
                    isMobile
                        ? viewportWidth - 64
                        : isTablet
                            ? 820
                            : 980
                )
            );

        const height =
            Math.round(
                Math.min(
                    viewportHeight *
                        (isMobile ? 0.64 : 0.74),
                    isMobile
                        ? 620
                        : isTablet
                            ? 760
                            : 820
                )
            );

        return {
            width:
                Math.max(
                    isMobile ? 320 : 560,
                    width
                ),
            height:
                Math.max(
                    isMobile ? 460 : 620,
                    height
                )
        };
    };

    const [embeddedChatBox, setEmbeddedChatBox] =
        useState(createEmbeddedChatBox);

    const [chatFrameSize, setChatFrameSize] =
        useState(null);

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
            ? "54px"
            : isTablet
                ? "68px"
                : "78px";

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

    function updateEmbeddedChatSize(
        frameWidth,
        frameHeight
    ) {

        const framePadding =
            isMobile
                ? 24
                : 32;

        setEmbeddedChatBox({
            width:
                Math.max(
                    isMobile ? 320 : 560,
                    Math.round(
                        frameWidth -
                            framePadding
                    )
                ),
            height:
                Math.max(
                    isMobile ? 460 : 620,
                    Math.round(
                        frameHeight -
                            framePadding
                    )
                )
        });
    }

    function startChatFrameResize(
        event,
        direction
    ) {

        event.preventDefault();

        event.stopPropagation();

        const frame =
            chatFrameRef.current;

        if (!frame) {
            return;
        }

        const rect =
            frame.getBoundingClientRect();

        const startX =
            event.clientX;

        const startY =
            event.clientY;

        const startWidth =
            rect.width;

        const startHeight =
            rect.height;

        const minWidth =
            isMobile
                ? Math.min(
                    window.innerWidth - 40,
                    344
                )
                : 620;

        const maxWidth =
            Math.max(
                minWidth,
                Math.min(
                    window.innerWidth -
                        (isMobile ? 40 : isTablet ? 88 : 128),
                    isMobile
                        ? window.innerWidth - 40
                        : isTablet
                            ? 760
                            : 1120
                )
            );

        const minHeight =
            isMobile
                ? 520
                : 620;

        const maxHeight =
            Math.max(
                minHeight,
                Math.round(
                    window.innerHeight *
                        (isMobile ? 0.82 : 0.9)
                )
            );

        function handlePointerMove(moveEvent) {

            const deltaX =
                moveEvent.clientX -
                startX;

            const deltaY =
                moveEvent.clientY -
                startY;

            const widthDelta =
                direction.includes("right")
                    ? deltaX
                    : direction.includes("left")
                        ? -deltaX
                        : 0;

            const heightDelta =
                direction.includes("bottom")
                    ? deltaY
                    : direction.includes("top")
                        ? -deltaY
                        : 0;

            const nextWidth =
                Math.max(
                    minWidth,
                    Math.min(
                        maxWidth,
                        startWidth +
                            widthDelta
                    )
                );

            const nextHeight =
                Math.max(
                    minHeight,
                    Math.min(
                        maxHeight,
                        startHeight +
                            heightDelta
                    )
                );

            setChatFrameSize({
                width:
                    Math.round(
                        nextWidth
                    ),
                height:
                    Math.round(
                        nextHeight
                    )
            });

            updateEmbeddedChatSize(
                nextWidth,
                nextHeight
            );
        }

        function handlePointerUp() {

            window.removeEventListener(
                "pointermove",
                handlePointerMove
            );

            window.removeEventListener(
                "pointerup",
                handlePointerUp
            );
        }

        window.addEventListener(
            "pointermove",
            handlePointerMove
        );

        window.addEventListener(
            "pointerup",
            handlePointerUp
        );
    }

    function getChatFrameResizeHandleStyle(
        direction
    ) {

        const baseStyle = {
            position: "absolute",
            zIndex: 60,
            touchAction: "none",
            background: "transparent"
        };

        const edgeOffset =
            isMobile
                ? "6px"
                : "8px";

        const edgeSize =
            isMobile
                ? "14px"
                : "16px";

        const cornerSize =
            isMobile
                ? "28px"
                : "32px";

        const cornerAccent = {
            borderColor:
                "rgba(216,176,122,0.58)",
            boxShadow:
                "0 0 16px rgba(216,176,122,0.16)"
        };

        const styles = {
            top: {
                top: 0,
                left: cornerSize,
                right: cornerSize,
                height: edgeSize,
                cursor: "ns-resize"
            },
            right: {
                top: cornerSize,
                right: 0,
                bottom: cornerSize,
                width: edgeSize,
                cursor: "ew-resize"
            },
            bottom: {
                bottom: 0,
                left: cornerSize,
                right: cornerSize,
                height: edgeSize,
                cursor: "ns-resize"
            },
            left: {
                top: cornerSize,
                left: 0,
                bottom: cornerSize,
                width: edgeSize,
                cursor: "ew-resize"
            },
            "top-left": {
                top: edgeOffset,
                left: edgeOffset,
                width: cornerSize,
                height: cornerSize,
                cursor: "nwse-resize",
                borderTop: "2px solid",
                borderLeft: "2px solid",
                borderTopLeftRadius:
                    isMobile
                        ? "10px"
                        : "12px",
                ...cornerAccent
            },
            "top-right": {
                top: edgeOffset,
                right: edgeOffset,
                width: cornerSize,
                height: cornerSize,
                cursor: "nesw-resize",
                borderTop: "2px solid",
                borderRight: "2px solid",
                borderTopRightRadius:
                    isMobile
                        ? "10px"
                        : "12px",
                ...cornerAccent
            },
            "bottom-left": {
                bottom: edgeOffset,
                left: edgeOffset,
                width: cornerSize,
                height: cornerSize,
                cursor: "nesw-resize",
                borderBottom: "2px solid",
                borderLeft: "2px solid",
                borderBottomLeftRadius:
                    isMobile
                        ? "10px"
                        : "12px",
                ...cornerAccent
            },
            "bottom-right": {
                bottom: edgeOffset,
                right: edgeOffset,
                width: cornerSize,
                height: cornerSize,
                cursor: "nwse-resize",
                borderBottom: "2px solid",
                borderRight: "2px solid",
                borderBottomRightRadius:
                    isMobile
                        ? "10px"
                        : "12px",
                background:
                    `
                    linear-gradient(
                        135deg,
                        transparent 0%,
                        transparent 48%,
                        rgba(216,176,122,0.12) 49%,
                        rgba(216,176,122,0.22) 100%
                    )
                    `,
                ...cornerAccent
            }
        };

        return {
            ...baseStyle,
            ...styles[direction]
        };
    }

    useEffect(() => {

        if (messagesRef.current) {

            messagesRef.current.scrollTop =
                messagesRef.current.scrollHeight;
        }

    }, [messages]);

    useEffect(() => {

        setEmbeddedChatBox(
            createEmbeddedChatBox()
        );

        setChatFrameSize(null);

    }, [
        isMobile,
        isTablet
    ]);

    useEffect(() => {

        if (
            !chatFrameRef.current ||
            typeof ResizeObserver === "undefined"
        ) {
            return undefined;
        }

        const observer =
            new ResizeObserver(
                ([entry]) => {

                    const nextWidth =
                        Math.round(
                            entry.contentRect.width
                        );

                    const nextHeight =
                        Math.round(
                            entry.contentRect.height
                        );

                    setEmbeddedChatBox(prev => {

                        if (
                            Math.abs(
                                prev.width -
                                    nextWidth
                            ) < 2 &&
                            Math.abs(
                                prev.height -
                                    nextHeight
                            ) < 2
                        ) {
                            return prev;
                        }

                        return {
                            width:
                                Math.max(
                                    isMobile ? 320 : 560,
                                    nextWidth
                                ),
                            height:
                                Math.max(
                                    isMobile ? 460 : 620,
                                    nextHeight
                                )
                        };
                    });
                }
            );

        observer.observe(
            chatFrameRef.current
        );

        return () => {

            observer.disconnect();
        };

    }, [
        isMobile
    ]);

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
                            : isTablet
                                ? "64vh"
                                : "60vh",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    paddingTop:
                        isMobile
                            ? "max(92px, calc(78px + env(safe-area-inset-top, 0px)))"
                            : isTablet
                                ? "112px"
                                : "118px",
                    paddingBottom:
                        isMobile
                            ? "48px"
                            : isTablet
                                ? "62px"
                                : "66px",
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
                        maxWidth:
                            isMobile
                                ? "100%"
                                : "680px",
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
                    boxSizing: "border-box",
                    display: "flex",
                    justifyContent: "center",
                    overflowX: "hidden"
                }}
            >
                <div
                    ref={chatFrameRef}
                    style={{
                        width:
                            chatFrameSize
                                ? `${chatFrameSize.width}px`
                                : isMobile
                                ? "100%"
                                : "min(100%, 1040px)",
                        height:
                            chatFrameSize
                                ? `${chatFrameSize.height}px`
                                : isMobile
                                ? "64vh"
                                : isTablet
                                    ? "72vh"
                                    : "74vh",
                        minWidth:
                            isMobile
                                ? "min(100%, 344px)"
                                : "min(100%, 620px)",
                        minHeight:
                            isMobile
                                ? "520px"
                                : "620px",
                        maxWidth: "100%",
                        maxHeight:
                            isMobile
                                ? "78vh"
                                : "86vh",
                        resize: "both",
                        overflow: "auto",
                        borderRadius:
                            isMobile
                                ? "26px"
                                : "34px",
                        border:
                            "1px solid rgba(216,176,122,0.32)",
                        background:
                            `
                            linear-gradient(
                                180deg,
                                rgba(11,7,4,0.92),
                                rgba(5,3,2,0.96)
                            )
                            `,
                        boxShadow:
                            `
                            0 0 34px rgba(216,176,122,0.14),
                            0 0 90px rgba(255,140,0,0.08),
                            inset 0 0 24px rgba(216,176,122,0.04)
                            `,
                        padding:
                            isMobile
                                ? "12px"
                                : "16px",
                        boxSizing: "border-box",
                        position: "relative"
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
                        chatBox={embeddedChatBox}
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

                    {[
                        "top",
                        "right",
                        "bottom",
                        "left",
                        "top-left",
                        "top-right",
                        "bottom-left",
                        "bottom-right"
                    ].map((direction) => (
                        <div
                            key={direction}
                            aria-hidden="true"
                            onPointerDown={(event) =>
                                startChatFrameResize(
                                    event,
                                    direction
                                )
                            }
                            style={
                                getChatFrameResizeHandleStyle(
                                    direction
                                )
                            }
                        />
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
                                ? "54px"
                                : "48px"
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
                            Current Platform
                        </T>
                    </h2>

                    <p style={paragraphStyle}>
                        <T>
                            Current infrastructure already implemented:
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

            <Footer />

        </main>
    );
}
