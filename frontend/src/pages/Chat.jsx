import {
    useState,
    useRef,
    useEffect
} from "react";

import Footer from "../components/Footer";

import useDragResize from "../hooks/useDragResize";

import ChatWindow from "../features/chat/ChatWindow";

import chatMainImage from "../assets/murzik/chat-main-image.png";

const PROJECT_MODES = {
    CHAT: "chat",
    MVP_1: "murzik_health",
    MVP_2: "horse_ai",
    LOGGER: "logger",
    VOICE: "voice",
    VIDEO: "video"
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

    const messagesRef =
        useRef(null);

    const {
        isMobile,
        isTablet,
        chatBox,
        startTopLeftResize,
        startDrag
    } = useDragResize();

    const [messages, setMessages] =
        useState([
            {
                role: "assistant",
                text: "Welcome."
            }
        ]);

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

    function sendMessage() {

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

        setTimeout(() => {

            let responseText =
                "Murzik processed request.";

            if (activeProject === PROJECT_MODES.MVP_1) {

                responseText =
                    "MVP 1 Health mode is active. Murzik is ready for product composition analysis, harmful substances detection, OCR labels and health explanation.";
            }

            if (activeProject === PROJECT_MODES.MVP_2) {

                responseText =
                    "MVP 2 Horse AI mode is prepared. Video runtime, movement anomaly detection, pain detection and infrared analysis will be connected in the next module.";
            }

            if (activeProject === PROJECT_MODES.LOGGER) {

                responseText =
                    "Runtime logger mode is active. Murzik will display orchestration state, active brain, routing, memory and model runtime logs.";
            }

            if (activeProject === PROJECT_MODES.VOICE) {

                responseText =
                    "Voice mode is active. Murzik voice runtime will be connected through the frontend voice layer and backend streaming.";
            }

            if (activeProject === PROJECT_MODES.VIDEO) {

                responseText =
                    "Video mode is active. Murzik video presentation runtime is ready for MVP demo connection.";
            }

            setMessages(prev => [
                ...prev,
                {
                    role: "assistant",
                    text: responseText
                }
            ]);

            setIsThinking(false);

        }, 1800);
    }

    function clearMessages() {

        setMessages([]);
    }

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
                paddingTop:
                    isMobile
                        ? "70px"
                        : "80px"
            }}
        >

            <section
                style={{
                    position: "relative",

                    width: "100%",

                    height:
                        isMobile
                            ? "1120px"
                            : isTablet
                                ? "1220px"
                                : "1360px",

                    paddingTop:
                        isMobile
                            ? "8px"
                            : "20px",

                    overflow: "hidden",

                    display: "flex",

                    justifyContent: "center",

                    alignItems: "flex-start",

                    background: "#040404"
                }}
            >

                <img
                    src={chatMainImage}
                    alt="Murzik"
                    style={{
                        position: "absolute",

                        top: 0,
                        left: 0,

                        width: "100%",
                        height: "100%",

                        objectFit:
                            isMobile
                                ? "cover"
                                : "contain",

                        objectPosition: "center top",

                        filter:
                            isMobile
                                ? "brightness(1.05) contrast(1.02)"
                                : "brightness(1.12) contrast(1.04)",

                        pointerEvents: "none",

                        userSelect: "none"
                    }}
                />

                <div
                    style={{
                        position: "absolute",

                        top:
                            isMobile
                                ? "180px"
                                : "438px",

                        left: "50%",

                        transform:
                            "translateX(-50%)",

                        width:
                            isMobile
                                ? "180px"
                                : "420px",

                        height:
                            isMobile
                                ? "80px"
                                : "190px",

                        pointerEvents: "none",

                        zIndex: 5,

                        overflow: "hidden",

                        borderRadius:
                            isMobile
                                ? "12px"
                                : "18px",

                        opacity:
                            isMobile
                                ? 0.55
                                : 1
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
                                    rgba(255,220,120,0.30),
                                    rgba(255,180,60,0.12),
                                    transparent 72%
                                )
                                `,

                            filter:
                                isMobile
                                    ? "blur(8px)"
                                    : "blur(18px)",

                            animation:
                                "portalPulse 3.5s ease-in-out infinite"
                        }}
                    />

                    {Array.from({
                        length:
                            isMobile
                                ? 8
                                : 18
                    }).map((_, index) => (

                        <div
                            key={index}
                            style={{
                                position: "absolute",

                                width:
                                    `${2 + (index % 3)}px`,

                                height:
                                    `${12 + (index % 6)}px`,

                                left:
                                    `${5 + (index * 5)}%`,

                                top:
                                    `${10 + ((index * 7) % 70)}%`,

                                borderRadius: "999px",

                                background:
                                    `
                                    linear-gradient(
                                        to bottom,
                                        rgba(255,255,255,0.95),
                                        rgba(255,200,90,0.95),
                                        rgba(255,140,40,0)
                                    )
                                    `,

                                opacity:
                                    isMobile
                                        ? 0.55
                                        : 0.9,

                                filter: "blur(0.4px)",

                                animation:
                                    `
                                    sparkFloat${index % 4}
                                    ${3 + (index * 0.2)}s
                                    linear
                                    infinite
                                    `
                            }}
                        />

                    ))}

                </div>

                <div
                    style={{
                        position: "absolute",

                        inset: 0,

                        background:
                            `
                            linear-gradient(
                                to bottom,
                                rgba(0,0,0,0.02),
                                rgba(0,0,0,0.18)
                            )
                            `
                    }}
                />

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

                    isThinking={isThinking}

                    isMobile={isMobile}
                    isTablet={isTablet}

                    chatBox={chatBox}

                    startTopLeftResize={startTopLeftResize}
                    startDrag={startDrag}
                />

            </section>

            <section
                style={{
                    width: "100%",

                    background: "#050505",

                    paddingTop:
                        isMobile
                            ? "40px"
                            : "70px",

                    paddingBottom:
                        isMobile
                            ? "40px"
                            : "70px",

                    paddingLeft:
                        isMobile
                            ? "20px"
                            : "40px",

                    paddingRight:
                        isMobile
                            ? "20px"
                            : "40px",

                    boxSizing: "border-box",

                    borderTop:
                        "1px solid rgba(255,220,170,0.06)"
                }}
            >

                <div
                    style={{
                        maxWidth: "1200px",

                        margin: "0 auto",

                        textAlign: "center",

                        color: "#d7c1a4",

                        fontSize:
                            isMobile
                                ? "11px"
                                : "13px",

                        lineHeight:
                            isMobile
                                ? "1.7"
                                : "2",

                        fontFamily:
                            "'Inter', sans-serif"
                    }}
                >
                    Murzik is a next-generation multimodal intelligence system powered by adaptive quantum orchestration layers and cognitive runtime architecture.
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
                        opacity: 1;
                        transform: scale(1.04);
                    }

                    100% {
                        opacity: 0.45;
                        transform: scale(1);
                    }
                }

                @keyframes sparkFloat0 {

                    0% {
                        transform:
                            translateY(0px)
                            scale(0.8);
                        opacity: 0;
                    }

                    20% {
                        opacity: 1;
                    }

                    100% {
                        transform:
                            translateY(-120px)
                            translateX(30px)
                            scale(1.2);
                        opacity: 0;
                    }
                }

                @keyframes sparkFloat1 {

                    0% {
                        transform:
                            translateY(0px)
                            scale(0.7);
                        opacity: 0;
                    }

                    20% {
                        opacity: 1;
                    }

                    100% {
                        transform:
                            translateY(-160px)
                            translateX(-20px)
                            scale(1.3);
                        opacity: 0;
                    }
                }

                @keyframes sparkFloat2 {

                    0% {
                        transform:
                            translateY(0px)
                            scale(0.9);
                        opacity: 0;
                    }

                    20% {
                        opacity: 1;
                    }

                    100% {
                        transform:
                            translateY(-140px)
                            translateX(12px)
                            scale(1.1);
                        opacity: 0;
                    }
                }

                @keyframes sparkFloat3 {

                    0% {
                        transform:
                            translateY(0px)
                            scale(0.6);
                        opacity: 0;
                    }

                    20% {
                        opacity: 1;
                    }

                    100% {
                        transform:
                            translateY(-170px)
                            translateX(-12px)
                            scale(1.4);
                        opacity: 0;
                    }
                }
                `}
            </style>

        </div>
    );
}