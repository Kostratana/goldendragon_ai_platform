import {
    useState,
    useRef,
    useEffect
} from "react";

import Footer from "../components/Footer";

import useDragResize from "../hooks/useDragResize";

import ChatWindow from "../features/chat/ChatWindow";

import chatMainImage from "../assets/murzik/chat-main-image.webp";

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

    const [messages, setMessages] =
        useState([
            {
                role: "assistant",
                text: "Welcome."
            }
        ]);

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
                    "Voice mode is active. XTTS backend streaming runtime will be connected through the Murzik orchestration layer.";
            }

            if (activeProject === PROJECT_MODES.VIDEO) {

                responseText =
                    "Video mode is active. Murzik video presentation runtime is ready for MVP demo connection.";
            }

            /*
            FUTURE XTTS BACKEND CALL

            Example:

            playMurzikAudio(
                backendAudioUrl
            );
            */

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

        stopMurzikVoice();
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

                        zIndex: 10
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

                </div>

            </section>

            <section
                style={{

                    width: "100%",

                    background: "#050505",

                    padding:
                        isMobile
                            ? "42px 18px"
                            : "62px 24px",

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

                    <h2
                        style={{

                            color: "#f0c88f",

                            fontSize:
                                isMobile
                                    ? "15px"
                                    : "22px",

                            letterSpacing:
                                isMobile
                                    ? "0.10em"
                                    : "0.18em",

                            marginBottom:
                                isMobile
                                    ? "18px"
                                    : "26px",

                            fontWeight: 700,

                            lineHeight: 1.4
                        }}
                    >
                        MURZIK AI ORCHESTRATION SYSTEM
                    </h2>

                    <p
                        style={{

                            color: "#d7c1a4",

                            fontSize:
                                isMobile
                                    ? "11px"
                                    : "13px",

                            lineHeight:
                                isMobile
                                    ? 1.8
                                    : 1.9,

                            marginBottom:
                                isMobile
                                    ? "16px"
                                    : "18px",

                            maxWidth: "900px",

                            marginLeft: "auto",

                            marginRight: "auto"
                        }}
                    >
                        Murzik is an advanced multimodal AI orchestration system designed as an adaptive cognitive architecture for next-generation AGI research, intelligent automation, reasoning, investor interaction and modular AI runtime coordination.
                    </p>

                    <p
                        style={{

                            color: "#c9b18d",

                            fontSize:
                                isMobile
                                    ? "10px"
                                    : "12px",

                            lineHeight:
                                isMobile
                                    ? 1.8
                                    : 1.9,

                            maxWidth: "920px",

                            marginLeft: "auto",

                            marginRight: "auto"
                        }}
                    >
                        The platform combines multiple specialized AI systems, orchestration layers, reasoning engines and multimodal interfaces into a unified extensible intelligence ecosystem capable of communication, analysis, execution planning and autonomous cognitive collaboration.
                    </p>

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