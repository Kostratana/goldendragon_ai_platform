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

import privateShopperBanner from "../assets/private-shopper-banner.png";

const HERO_TITLE =
    "Private Shopper AI";

const HERO_SUBTITLE =
    "An intelligent AI concierge for personalized product discovery, premium shopping assistance and adaptive lifestyle recommendations.";

const PROJECT_MODES = {
    CHAT: "chat"
};

const PROJECT_SECTIONS = [
    {
        title: "Project Overview",
        paragraphs: [
            "Private Shopper AI is an intelligent concierge platform being developed to assist users with personalized product discovery, premium shopping decisions and lifestyle-oriented recommendations through artificial intelligence.",
            "The system combines conversational AI, multimodal product understanding, preference modeling and recommendation intelligence to help users find products that match their needs, taste, context and budget.",
            "The platform is designed as a flexible AI shopping assistant that can evolve across fashion, beauty, home, travel, gifts, luxury goods and personalized commerce experiences."
        ]
    },
    {
        title: "Personalized Shopping Concierge",
        paragraphs: [
            "The first public layer of the platform focuses on conversational shopping guidance.",
            "Users can describe what they are looking for, share preferences, define constraints and receive curated recommendations adapted to their individual goals.",
            "The assistant is designed to reduce decision fatigue by narrowing broad product choices into a more relevant and personalized selection."
        ]
    },
    {
        title: "Product Discovery & Recommendations",
        paragraphs: [
            "Private Shopper AI evaluates product attributes, use cases, customer preferences, visual style, pricing context and practical requirements to support intelligent product discovery.",
            "The platform can compare options, explain trade-offs and recommend alternatives that better match the user's intent.",
            "The long-term vision includes adaptive recommendations that improve as the assistant learns more about each user's taste and shopping behavior."
        ]
    },
    {
        title: "Multimodal Commerce Intelligence",
        paragraphs: [
            "The platform is designed to support multimodal analysis across text, product images, style references, catalogs and structured product data.",
            "Computer Vision and language models can work together to understand visual preferences, compare products and identify items that fit a requested aesthetic or functional need.",
            "This multimodal layer enables more natural shopping workflows than keyword search alone."
        ]
    },
    {
        title: "Adaptive Preference Modeling",
        paragraphs: [
            "Private Shopper AI is being developed with adaptive preference modeling that can refine recommendations based on user feedback, previous selections, style patterns and contextual shopping goals.",
            "The assistant can support both fast product discovery and more deliberate premium shopping journeys where personalization, explanation and trust are essential.",
            "The goal is to make digital shopping feel more like working with a knowledgeable personal concierge."
        ]
    },
    {
        title: "Current Development",
        paragraphs: [
            "The current platform infrastructure includes:"
        ],
        items: [
            "Google Cloud backend",
            "Retrieval-Augmented Generation (RAG)",
            "Supabase database",
            "AI orchestration",
            "Prompt system",
            "Product knowledge pipeline",
            "Preference modeling pipeline",
            "Recommendation intelligence",
            "Multimodal product analysis"
        ]
    },
    {
        title: "Future Development",
        paragraphs: [
            "Private Shopper AI is designed as a scalable AI commerce platform with future expansion into personalized catalogs, premium concierge workflows, multimodal style analysis and intelligent purchasing support.",
            "Additional commercial integrations, proprietary recommendation logic and advanced personalization layers remain part of the long-term roadmap and are not publicly disclosed.",
            "The platform demonstrates Golden Dragon AI Studio's ability to design intelligent assistants for consumer commerce, lifestyle technology and custom enterprise shopping experiences."
        ]
    }
];

export default function PrivateShopperAI() {

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
                            ? 680
                            : 860
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
                        (isMobile ? 40 : isTablet ? 88 : 96),
                    isMobile
                        ? window.innerWidth - 40
                        : isTablet
                            ? 820
                            : 1180
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
            zIndex: 300,
            touchAction: "none",
            background: "transparent"
        };

        const edgeOffset =
            isMobile
                ? "4px"
                : "6px";

        const edgeSize =
            isMobile
                ? "22px"
                : "24px";

        const cornerSize =
            isMobile
                ? "34px"
                : "38px";

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
                cursor: "ns-resize",
                borderTop:
                    "1px solid rgba(216,176,122,0.18)"
            },
            right: {
                top: cornerSize,
                right: 0,
                bottom: cornerSize,
                width: edgeSize,
                cursor: "ew-resize",
                borderRight:
                    "1px solid rgba(216,176,122,0.22)"
            },
            bottom: {
                bottom: 0,
                left: cornerSize,
                right: cornerSize,
                height: edgeSize,
                cursor: "ns-resize",
                borderBottom:
                    "1px solid rgba(216,176,122,0.22)"
            },
            left: {
                top: cornerSize,
                left: 0,
                bottom: cornerSize,
                width: edgeSize,
                cursor: "ew-resize",
                borderLeft:
                    "1px solid rgba(216,176,122,0.18)"
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
                    src={privateShopperBanner}
                    alt={translatedProjectBannerAlt}
                    loading="eager"
                    decoding="async"
                    style={{
                        display: "block",
                        width: "100%",
                        maxWidth:
                            isMobile
                                ? "100%"
                                : "900px",
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
                                    ? "92%"
                                    : isTablet
                                        ? "min(92%, 760px)"
                                        : "min(88%, 960px)",
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
                    {PROJECT_SECTIONS.map((section) => (
                        <div
                            key={section.title}
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                gap:
                                    isMobile
                                        ? "12px"
                                        : "14px",
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

                            {section.items && (
                                <div
                                    style={{
                                        display: "flex",
                                        flexDirection: "column",
                                        alignItems: "center",
                                        gap:
                                            isMobile
                                                ? "10px"
                                                : "12px",
                                        marginTop:
                                            isMobile
                                                ? "2px"
                                                : "6px",
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
                                    {section.items.map((item) => (
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
                            )}

                            {section.afterItems && (
                                <p style={paragraphStyle}>
                                    <T>
                                        {section.afterItems}
                                    </T>
                                </p>
                            )}
                        </div>
                    ))}
                </div>
            </section>

            <Footer />

        </main>
    );
}
