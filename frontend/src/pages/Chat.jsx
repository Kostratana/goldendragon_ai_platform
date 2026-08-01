import {
    useState,
    useRef,
    useEffect
} from "react";

import Footer from "../components/Footer";

import useDragResize from "../hooks/useDragResize";

import ChatWindow from "../features/chat/ChatWindow";

import {
    T,
    useLanguage,
    useTranslatedText
} from "../services/translation";

import chatMainImage from "../assets/murzik/chat-main-image.webp";

import {
    GOLD
} from "../theme/colors";

import {
    FONT_IM_FELL
} from "../theme/fonts";

const PROJECT_MODES = {

    CHAT: "chat",

    MVP_1: "mvp1_food_safety_ai",

    MVP_2: "mvp2",

    LOGGER: "logger",

    VOICE: "voice",

    VIDEO: "video"
};

const PROJECT_SLOTS = {

    mvp1: "mvp1_food_safety_ai",

    mvp2: "mvp2_horse_health_ai"
};

const PROJECT_TYPE_OPTIONS = [
    "AI Agent",
    "AI Assistant",
    "Large Language Model (LLM)",
    "Computer Vision",
    "Machine Learning",
    "AI Automation",
    "RAG System",
    "Custom AI Software",
    "AI Consulting",
    "Other"
];

const BUDGET_OPTIONS = [
    "Under $1,000",
    "$1,000–5,000",
    "$5,000–10,000",
    "$10,000–25,000",
    "Over $25,000",
    "Prefer not to say"
];

const TIMELINE_OPTIONS = [
    "ASAP",
    "Within 1 Month",
    "2–3 Months",
    "Flexible"
];

const TRUST_ITEMS = [
    "AI Agents",
    "Large Language Models",
    "Computer Vision",
    "Machine Learning"
];

const INITIAL_LEAD_FORM = {
    projectIdea: "",
    fullName: "",
    company: "",
    country: "",
    email: "",
    phone: "",
    website: "",
    projectType: PROJECT_TYPE_OPTIONS[0],
    budget: BUDGET_OPTIONS[0],
    timeline: TIMELINE_OPTIONS[0]
};

export default function Chat() {

    const [mode, setMode] =
        useState("CHAT");

    const [activeProject, setActiveProject] =
        useState(PROJECT_MODES.CHAT);

    const [message, setMessage] =
        useState("");

    const [isThinking, setIsThinking] =
        useState(false);

    /*
    FUTURE BACKEND VOICE RUNTIME
    */

    const [voiceEnabled, setVoiceEnabled] =
        useState(false);

    const messagesRef =
        useRef(null);

    /*
    FUTURE XTTS AUDIO STREAM
    */

    const audioRuntimeRef =
        useRef(null);

    const {

        isMobile,
        isTablet,

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

    const [messages, setMessages] =
        useState([
            {
                role: "assistant",
                text: "Welcome."
            }
        ]);

    const [leadForm, setLeadForm] =
        useState(INITIAL_LEAD_FORM);

    const [isLeadSubmitted, setIsLeadSubmitted] =
        useState(false);

    const projectIdeaPlaceholder =
        useTranslatedText(
            "Describe your project, business challenge, automation idea, AI assistant, computer vision system, or any intelligent solution you would like to build..."
        );

    /*
    FUTURE BACKEND XTTS STOP
    */

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

    /*
    FUTURE BACKEND XTTS AUDIO STREAM
    */

    async function playMurzikAudio(
        audioUrl
    ) {

        try {

            if (!voiceEnabled) {
                return;
            }

            stopMurzikVoice();

            audioRuntimeRef.current =
                new Audio(audioUrl);

            audioRuntimeRef.current.preload =
                "metadata";

            audioRuntimeRef.current.volume =
                1;

            await audioRuntimeRef.current.play();

        } catch (error) {

            console.error(
                "Murzik audio runtime error:",
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
                "https://golden-dragon-backend-91075651557.us-central1.run.app/api/chat",
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

        let responseText =
            data.response ||
            "Murzik returned an empty response.";

        setMessages(prev => [
            ...prev,
            {
                role: "assistant",
                text: responseText
            }
        ]);

        /*
        FUTURE XTTS BACKEND CALL

        Example:

        playMurzikAudio(
            backendAudioUrl
        );
        */

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

    function updateLeadForm(
        field,
        value
    ) {

        setLeadForm(prev => ({
            ...prev,
            [field]: value
        }));

        if (isLeadSubmitted) {
            setIsLeadSubmitted(false);
        }
    }

    function submitLeadForm(
        event
    ) {

        event.preventDefault();

        setIsLeadSubmitted(true);
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

        function handlePointerMove(
            moveEvent
        ) {

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

    const contactInputStyle = {
        width: "100%",
        boxSizing: "border-box",
        border:
            "1px solid rgba(216,176,122,0.18)",
        borderRadius: "12px",
        background:
            "rgba(255,255,255,0.026)",
        color: "rgba(255,247,232,0.94)",
        padding:
            isMobile
                ? "13px 14px"
                : "14px 16px",
        fontSize: "15px",
        lineHeight: 1.45,
        outline: "none",
        boxShadow:
            "inset 0 1px 0 rgba(255,255,255,0.025)"
    };

    const contactLabelStyle = {
        display: "block",
        marginBottom: "9px",
        color: "rgba(232,202,152,0.78)",
        fontSize: "13px",
        lineHeight: 1.35,
        fontWeight: 500
    };

    const requiredMarkStyle = {
        color: GOLD,
        marginLeft: "4px"
    };

    useEffect(() => {

        if (messagesRef.current) {

            messagesRef.current.scrollTop =
                messagesRef.current.scrollHeight;
        }

    }, [messages]);

    return (

        <div
            style={{

                width: "100%",

                minHeight: "100vh",

                background: "#040404",

                overflowX: "hidden",

                overflowY: "visible",

                paddingTop:
                    isMobile
                        ? "72px"
                        : "90px",

                position: "relative"
            }}
        >

            <section
                style={{

                    position: "relative",

                    width: "100%",

                    minHeight:
                        isMobile
                            ? "1180px"
                            : isTablet
                                ? "1380px"
                                : "1460px",

                    overflow: "hidden",

                    display: "flex",

                    justifyContent: "center",

                    alignItems: "flex-start",

                    background: "#040404"
                }}
            >

                {/* BACKGROUND */}

                <img
                    src={chatMainImage}
                    alt="Murzik"
                    loading="eager"
                    decoding="async"
                    style={{

                        position: "absolute",

                        inset: 0,

                        width: "100%",

                        height: "100%",

                        objectFit: "cover",

                        objectPosition:
                            isMobile
                                ? "center center"
                                : "center top",

                        filter:
                            "brightness(1.06) contrast(1.02)",

                        pointerEvents: "none",

                        userSelect: "none",

                        zIndex: 1
                    }}
                />

                {/* PORTAL */}

                <div
                    style={{

                        position: "absolute",

                        top:
                            isMobile
                                ? "470px"
                                : "590px",

                        left: "50%",

                        transform:
                            "translateX(-50%)",

                        width:
                            isMobile
                                ? "300px"
                                : "520px",

                        height:
                            isMobile
                                ? "120px"
                                : "220px",

                        overflow: "hidden",

                        borderRadius:
                            isMobile
                                ? "20px"
                                : "28px",

                        zIndex: 3,

                        pointerEvents: "none"
                    }}
                >

                    <div
                        style={{

                            position: "absolute",

                            inset: 0,

                            background:
                                `
                                radial-gradient(
                                    circle at center,
                                    rgba(255,220,120,0.18),
                                    rgba(255,160,40,0.06),
                                    transparent 72%
                                )
                                `,

                            filter:
                                "blur(14px)",

                            animation:
                                "portalPulse 4s ease-in-out infinite"
                        }}
                    />

                    {Array.from({
                        length:
                            isMobile
                                ? 8
                                : 14
                    }).map((_, index) => (

                        <div
                            key={index}
                            style={{

                                position: "absolute",

                                width:
                                    `${2 + (index % 2)}px`,

                                height:
                                    `${10 + (index % 5)}px`,

                                left:
                                    `${(index * 6.5) % 100}%`,

                                top:
                                    `${(index * 8) % 80}%`,

                                borderRadius:
                                    "999px",

                                background:
                                    `
                                    linear-gradient(
                                        to bottom,
                                        rgba(255,255,255,0.92),
                                        rgba(255,190,80,0.88),
                                        rgba(255,140,40,0)
                                    )
                                    `,

                                boxShadow:
                                    `
                                    0 0 6px rgba(255,200,120,0.25)
                                    `,

                                animation:
                                    `
                                    sparkFloat${index % 4}
                                    ${3 + index * 0.15}s
                                    linear
                                    infinite
                                    `
                            }}
                        />

                    ))}

                </div>

                {/* OVERLAY */}

                <div
                    style={{

                        position: "absolute",

                        inset: 0,

                        background:
                            `
                            linear-gradient(
                                to bottom,
                                rgba(0,0,0,0.02),
                                rgba(0,0,0,0.08)
                            )
                            `,

                        zIndex: 2
                    }}
                />

                {/* CHAT WINDOW */}

                <div
                    ref={chatFrameRef}
                    style={{

                        position: "absolute",

                        top:
                            isMobile
                                ? "610px"
                                : isTablet
                                    ? "760px"
                                    : "790px",

                        left: "50%",

                        transform:
                            "translateX(-50%)",

                        zIndex: 10,

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

                        boxSizing: "border-box"
                    }}
                >

                    <ChatWindow

                        mode={mode}
                        setMode={setMode}

                        activeProject={activeProject}
                        setActiveProject={setActiveProject}

                        message={message}
                        setMessage={setMessage}

                        messages={messages}
                        messagesRef={messagesRef}

                        sendMessage={sendMessage}
                        clearMessages={clearMessages}
                        copyMessages={copyMessages}
                        downloadMessages={downloadMessages}

                        isThinking={isThinking}

                        isMobile={isMobile}
                        isTablet={isTablet}

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

                    width: "100%",

                    background: "#050505",

                    padding:
                        isMobile
                            ? "72px 18px 64px"
                            : "104px 24px 92px",

                    borderTop:
                        "1px solid rgba(255,220,170,0.05)",

                    display: "flex",

                    justifyContent: "center",

                    overflow: "hidden"
                }}
            >

                <div
                    style={{

                        width: "100%",

                        maxWidth:
                            isMobile
                                ? "94vw"
                                : "980px",

                        margin: "0 auto",

                        textAlign: "center"
                    }}
                >

                    <div
                        style={{
                            maxWidth:
                                isMobile
                                    ? "100%"
                                    : "760px",

                            margin:
                                "0 auto 56px",

                            textAlign: "center"
                        }}
                    >

                        <h2
                            style={{
                                color:
                                    GOLD,

                                fontFamily:
                                    FONT_IM_FELL,

                                fontSize:
                                    isMobile
                                        ? "34px"
                                        : isTablet
                                            ? "42px"
                                            : "52px",

                                lineHeight: 1.05,

                                fontWeight: 600,

                                margin:
                                    "0 0 20px",

                                textShadow:
                                    `
                                    0 0 12px rgba(226,197,138,0.20),
                                    0 0 32px rgba(226,197,138,0.10)
                                    `
                            }}
                        >
                            <T>
                                Start Your AI Project
                            </T>
                        </h2>

                        <p
                            style={{
                                color:
                                    "rgba(232,213,184,0.74)",

                                fontSize:
                                    isMobile
                                        ? "16px"
                                        : "18px",

                                lineHeight: 1.7,

                                margin:
                                    "0 auto",

                                maxWidth:
                                    "680px"
                            }}
                        >
                            <T>
                                Ready to transform your ideas into intelligent technology?
                            </T>
                            {" "}
                            <T>
                                Tell us about your project and our team will contact you to discuss the best AI solution for your business.
                            </T>
                        </p>

                    </div>

                    <form
                        onSubmit={submitLeadForm}
                        style={{
                            width: "100%",

                            maxWidth:
                                "900px",

                            margin:
                                "0 auto",

                            textAlign: "left",

                            border:
                                "1px solid rgba(216,176,122,0.16)",

                            borderRadius:
                                isMobile
                                    ? "22px"
                                    : "24px",

                            background:
                                `
                                linear-gradient(
                                    180deg,
                                    rgba(12,9,6,0.62),
                                    rgba(6,5,4,0.78)
                                )
                                `,

                            boxShadow:
                                `
                                0 18px 54px rgba(0,0,0,0.22),
                                inset 0 1px 0 rgba(255,255,255,0.035)
                                `,

                            padding:
                                isMobile
                                    ? "22px"
                                    : "34px"
                        }}
                    >

                        <div
                            style={{
                                marginBottom:
                                    "26px"
                            }}
                        >

                            <h3
                                style={{
                                    color:
                                        "rgba(255,242,218,0.92)",

                                    fontSize:
                                        isMobile
                                            ? "22px"
                                            : "28px",

                                    lineHeight: 1.2,

                                    fontWeight: 600,

                                    margin:
                                        "0 0 10px"
                                }}
                            >
                                <T>
                                    What would you like to build?
                                </T>
                            </h3>

                            <p
                                style={{
                                    color:
                                        "rgba(232,213,184,0.66)",

                                    fontSize:
                                        "15px",

                                    lineHeight: 1.65,

                                    margin:
                                        "0"
                                }}
                            >
                                <T>
                                    Describe your idea in a few sentences.
                                </T>
                                {" "}
                                <T>
                                    We'll help transform it into an intelligent AI solution.
                                </T>
                            </p>

                        </div>

                        <label
                            style={contactLabelStyle}
                            htmlFor="projectIdea"
                        >
                            <T>
                                Project idea
                            </T>
                            <span style={requiredMarkStyle}>
                                *
                            </span>
                        </label>

                        <textarea
                            id="projectIdea"
                            required
                            value={leadForm.projectIdea}
                            onChange={(event) =>
                                updateLeadForm(
                                    "projectIdea",
                                    event.target.value
                                )
                            }
                            placeholder={projectIdeaPlaceholder}
                            rows={isMobile ? 7 : 8}
                            style={{
                                ...contactInputStyle,
                                minHeight:
                                    isMobile
                                        ? "190px"
                                        : "220px",
                                resize:
                                    "vertical",
                                marginBottom:
                                    "26px"
                            }}
                        />

                        <div
                            style={{
                                display: "grid",
                                gridTemplateColumns:
                                    isMobile
                                        ? "1fr"
                                        : "repeat(2, minmax(0, 1fr))",
                                gap:
                                    isMobile
                                        ? "18px"
                                        : "22px",
                                marginBottom:
                                    "24px"
                            }}
                        >

                            {[
                                {
                                    id: "fullName",
                                    label: "Full Name",
                                    required: true,
                                    type: "text"
                                },
                                {
                                    id: "company",
                                    label: "Company",
                                    required: false,
                                    type: "text"
                                },
                                {
                                    id: "country",
                                    label: "Country",
                                    required: false,
                                    type: "text"
                                },
                                {
                                    id: "email",
                                    label: "Email",
                                    required: true,
                                    type: "email"
                                },
                                {
                                    id: "phone",
                                    label: "Phone",
                                    required: false,
                                    type: "tel"
                                },
                                {
                                    id: "website",
                                    label: "Website",
                                    required: false,
                                    type: "url"
                                }
                            ].map((field) => (

                                <div key={field.id}>
                                    <label
                                        style={contactLabelStyle}
                                        htmlFor={field.id}
                                    >
                                        <T>
                                            {field.label}
                                        </T>
                                        {field.required && (
                                            <span style={requiredMarkStyle}>
                                                *
                                            </span>
                                        )}
                                    </label>

                                    <input
                                        id={field.id}
                                        required={field.required}
                                        type={field.type}
                                        value={leadForm[field.id]}
                                        onChange={(event) =>
                                            updateLeadForm(
                                                field.id,
                                                event.target.value
                                            )
                                        }
                                        style={contactInputStyle}
                                    />
                                </div>

                            ))}

                            {[
                                {
                                    id: "projectType",
                                    label: "Project Type",
                                    options: PROJECT_TYPE_OPTIONS
                                },
                                {
                                    id: "budget",
                                    label: "Estimated Budget",
                                    options: BUDGET_OPTIONS
                                },
                                {
                                    id: "timeline",
                                    label: "Timeline",
                                    options: TIMELINE_OPTIONS
                                }
                            ].map((field) => (

                                <div key={field.id}>
                                    <label
                                        style={contactLabelStyle}
                                        htmlFor={field.id}
                                    >
                                        <T>
                                            {field.label}
                                        </T>
                                    </label>

                                    <select
                                        id={field.id}
                                        value={leadForm[field.id]}
                                        onChange={(event) =>
                                            updateLeadForm(
                                                field.id,
                                                event.target.value
                                            )
                                        }
                                        style={{
                                            ...contactInputStyle,
                                            appearance: "none"
                                        }}
                                    >
                                        {field.options.map((option) => (
                                            <option
                                                key={option}
                                                value={option}
                                                style={{
                                                    color: "#101010"
                                                }}
                                            >
                                                <T>
                                                    {option}
                                                </T>
                                            </option>
                                        ))}
                                    </select>
                                </div>

                            ))}

                        </div>

                        <button
                            type="submit"
                            style={{
                                width:
                                    isMobile
                                        ? "100%"
                                        : "auto",
                                minWidth:
                                    isMobile
                                        ? "100%"
                                        : "260px",
                                border: "none",
                                borderRadius: "999px",
                                padding:
                                    "14px 26px",
                                color:
                                    "#120b04",
                                background:
                                    `
                                    linear-gradient(
                                        135deg,
                                        #f3d49a,
                                        #d8b07a
                                    )
                                    `,
                                fontSize:
                                    "15px",
                                fontWeight: 600,
                                cursor: "pointer",
                                boxShadow:
                                    `
                                    0 10px 24px rgba(216,176,122,0.16),
                                    inset 0 1px 0 rgba(255,255,255,0.24)
                                    `
                            }}
                        >
                            <T>
                                Start My AI Project
                            </T>
                        </button>

                        {isLeadSubmitted && (
                            <div
                                role="status"
                                style={{
                                    marginTop:
                                        "28px",
                                    border:
                                        "1px solid rgba(216,176,122,0.18)",
                                    borderRadius:
                                        "16px",
                                    background:
                                        "rgba(216,176,122,0.055)",
                                    padding:
                                        isMobile
                                            ? "18px"
                                            : "22px",
                                    color:
                                        "rgba(255,247,232,0.9)"
                                }}
                            >
                                <h3
                                    style={{
                                        margin:
                                            "0 0 8px",
                                        color:
                                            GOLD,
                                        fontSize:
                                            "22px",
                                        lineHeight:
                                            1.25
                                    }}
                                >
                                    <T>
                                        Thank You!
                                    </T>
                                </h3>

                                <p
                                    style={{
                                        margin:
                                            "0",
                                        fontSize:
                                            "15px",
                                        lineHeight:
                                            1.7
                                    }}
                                >
                                    <T>
                                        Your request has been successfully received.
                                    </T>
                                    {" "}
                                    <T>
                                        Our team will review your project and contact you as soon as possible.
                                    </T>
                                </p>
                            </div>
                        )}

                    </form>

                    <div
                        style={{
                            marginTop:
                                isMobile
                                    ? "56px"
                                    : "72px",
                            textAlign:
                                "center"
                        }}
                    >

                        <h2
                            style={{
                                color:
                                    GOLD,
                                fontFamily:
                                    FONT_IM_FELL,
                                fontSize:
                                    isMobile
                                        ? "30px"
                                        : "40px",
                                lineHeight:
                                    1.15,
                                fontWeight:
                                    600,
                                margin:
                                    "0 0 28px"
                            }}
                        >
                            <T>
                                Why Golden Dragon AI Studio?
                            </T>
                        </h2>

                        <div
                            style={{
                                display: "grid",
                                gridTemplateColumns:
                                    isMobile
                                        ? "1fr"
                                        : isTablet
                                            ? "repeat(2, minmax(0, 1fr))"
                                            : "repeat(4, minmax(0, 1fr))",
                                gap:
                                    "16px"
                            }}
                        >
                            {TRUST_ITEMS.map((item) => (
                                <div
                                    key={item}
                                    style={{
                                        border:
                                            "1px solid rgba(216,176,122,0.13)",
                                        borderRadius:
                                            "12px",
                                        background:
                                            "rgba(255,255,255,0.02)",
                                        color:
                                            "rgba(255,242,218,0.88)",
                                        padding:
                                            "18px 16px",
                                        fontSize:
                                            "15px",
                                        fontWeight:
                                            600,
                                        lineHeight:
                                            1.35
                                    }}
                                >
                                    <span
                                        style={{
                                            color:
                                                GOLD,
                                            marginRight:
                                                "8px"
                                        }}
                                    >
                                        ✓
                                    </span>
                                    <T>
                                        {item}
                                    </T>
                                </div>
                            ))}
                        </div>

                    </div>

                </div>

            </section>

            <Footer />

            <style>
                {`
                @keyframes portalPulse {

                    0% {
                        opacity: 0.45;
                        transform: scale(1);
                    }

                    50% {
                        opacity: 0.92;
                        transform: scale(1.02);
                    }

                    100% {
                        opacity: 0.45;
                        transform: scale(1);
                    }
                }

                @keyframes sparkFloat0 {

                    0% {
                        transform: translateY(0px);
                        opacity: 0;
                    }

                    20% {
                        opacity: 1;
                    }

                    100% {
                        transform:
                            translateY(-90px)
                            translateX(14px);

                        opacity: 0;
                    }
                }

                @keyframes sparkFloat1 {

                    0% {
                        transform: translateY(0px);
                        opacity: 0;
                    }

                    20% {
                        opacity: 1;
                    }

                    100% {
                        transform:
                            translateY(-110px)
                            translateX(-14px);

                        opacity: 0;
                    }
                }

                @keyframes sparkFloat2 {

                    0% {
                        transform: translateY(0px);
                        opacity: 0;
                    }

                    20% {
                        opacity: 1;
                    }

                    100% {
                        transform:
                            translateY(-100px)
                            translateX(10px);

                        opacity: 0;
                    }
                }

                @keyframes sparkFloat3 {

                    0% {
                        transform: translateY(0px);
                        opacity: 0;
                    }

                    20% {
                        opacity: 1;
                    }

                    100% {
                        transform:
                            translateY(-120px)
                            translateX(-8px);

                        opacity: 0;
                    }
                }
                `}
            </style>

        </div>
    );
}
