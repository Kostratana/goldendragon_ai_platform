import {
    useState,
    useRef,
    useEffect
} from "react";

import Footer from "../components/Footer";

import chatMainImage from "../assets/murzik/chat-main-image.png";
import murzikEyes from "../assets/murzik/murzik-eyes.mp4";

export default function Chat() {

    const [mode, setMode] =
        useState("CHAT");

    const [message, setMessage] =
        useState("");

    const [isOnline, setIsOnline] =
        useState(true);

    const [isThinking, setIsThinking] =
        useState(false);

    const messagesRef =
        useRef(null);

    const isMobile =
        window.innerWidth < 768;

    const isTablet =
        window.innerWidth >= 768 &&
        window.innerWidth < 1200;

    const [messages, setMessages] =
        useState([
            {
                role: "assistant",
                text: "Welcome."
            }
        ]);

    const [chatBox, setChatBox] =
        useState({

            width:
                isMobile
                    ? window.innerWidth * 0.96
                    : isTablet
                        ? 620
                        : 540,

            height:
                isMobile
                    ? window.innerHeight * 0.72
                    : isTablet
                        ? 440
                        : 370,

            marginTop:
                isMobile
                    ? 420
                    : isTablet
                        ? 560
                        : 760
        });

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

            setMessages(prev => [
                ...prev,
                {
                    role: "assistant",
                    text: "Murzik processed request."
                }
            ]);

            setIsThinking(false);

        }, 1800);
    }

    function clearMessages() {

        setMessages([]);
    }

    function handleKeyDown(event) {

        if (event.key === "Enter") {
            sendMessage();
        }
    }

    function startTopLeftResize(event) {

        event.preventDefault();

        const startX =
            event.clientX;

        const startY =
            event.clientY;

        const startWidth =
            chatBox.width;

        const startHeight =
            chatBox.height;

        function resizeMove(moveEvent) {

            const deltaX =
                moveEvent.clientX - startX;

            const deltaY =
                moveEvent.clientY - startY;

            const nextWidth =
                Math.max(
                    isMobile
                        ? 300
                        : 320,
                    startWidth - deltaX
                );

            const nextHeight =
                Math.max(
                    isMobile
                        ? 360
                        : 240,
                    startHeight - deltaY
                );

            setChatBox(prev => ({
                ...prev,
                width: nextWidth,
                height: nextHeight
            }));
        }

        function stopResize() {

            window.removeEventListener(
                "mousemove",
                resizeMove
            );

            window.removeEventListener(
                "mouseup",
                stopResize
            );
        }

        window.addEventListener(
            "mousemove",
            resizeMove
        );

        window.addEventListener(
            "mouseup",
            stopResize
        );
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

                {/* PORTAL FX */}

                <div
                    style={{
                        position: "absolute",
                        top:
                            isMobile
                                ? "180px"
                                : "438px",
                        left: "50%",
                        transform: "translateX(-50%)",
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
                                width: `${2 + (index % 3)}px`,
                                height: `${12 + (index % 6)}px`,
                                left: `${5 + (index * 5)}%`,
                                top: `${10 + ((index * 7) % 70)}%`,
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
                                boxShadow:
                                    isMobile
                                        ? "0 0 8px rgba(255,180,80,0.45)"
                                        : `
                                        0 0 10px rgba(255,200,90,0.9),
                                        0 0 20px rgba(255,140,50,0.6)
                                        `,
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

                <div
                    style={{
                        position: "relative",
                        width: `${chatBox.width}px`,
                        height: `${chatBox.height}px`,
                        minWidth:
                            isMobile
                                ? "300px"
                                : "320px",
                        minHeight:
                            isMobile
                                ? "360px"
                                : "240px",
                        maxWidth:
                            isMobile
                                ? "96vw"
                                : "88vw",
                        maxHeight:
                            isMobile
                                ? "76vh"
                                : "none",
                        resize: "both",
                        overflow: "hidden",
                        marginTop: `${chatBox.marginTop}px`,
                        borderRadius:
                            isMobile
                                ? "20px"
                                : "28px",
                        padding:
                            isMobile
                                ? "8px"
                                : "16px",
                        boxSizing: "border-box",
                        display: "flex",
                        flexDirection: "column",
                        zIndex: 20,
                        background:
                            `
                            linear-gradient(
                                to bottom,
                                rgba(56,32,18,0.84),
                                rgba(24,12,6,0.78)
                            )
                            `,
                        backdropFilter:
                            isMobile
                                ? "blur(5px)"
                                : "blur(8px)",
                        border:
                            "2px solid rgba(255,220,170,0.18)",
                        boxShadow:
                            isMobile
                                ? "0 0 20px rgba(255,180,100,0.12)"
                                : "0 0 40px rgba(255,180,100,0.18)"
                    }}
                >

                    {/* CHAT PARTICLES */}

                    <div
                        style={{
                            position: "absolute",
                            inset: 0,
                            pointerEvents: "none",
                            overflow: "hidden",
                            borderRadius:
                                isMobile
                                    ? "20px"
                                    : "28px",
                            zIndex: 1
                        }}
                    >

                        {Array.from({
                            length:
                                isMobile
                                    ? 8
                                    : 18
                        }).map((_, index) => (

                            <div
                                key={`chat-spark-${index}`}
                                style={{
                                    position: "absolute",

                                    width:
                                        `${2 + (index % 3)}px`,

                                    height:
                                        `${2 + (index % 3)}px`,

                                    left:
                                        `${(index * 6) % 100}%`,

                                    top:
                                        `${(index * 9) % 100}%`,

                                    borderRadius: "999px",

                                    background:
                                        `
                                        radial-gradient(
                                            circle,
                                            rgba(255,240,190,1),
                                            rgba(255,180,80,0.9),
                                            rgba(255,120,40,0)
                                        )
                                        `,

                                    opacity:
                                        isMobile
                                            ? 0.45
                                            : 0.75,

                                    boxShadow:
                                        isMobile
                                            ? "0 0 8px rgba(255,180,80,0.35)"
                                            : `
                                            0 0 10px rgba(255,210,120,0.8),
                                            0 0 20px rgba(255,160,70,0.4)
                                            `,

                                    animation:
                                        `
                                        chatSpark${index % 4}
                                        ${5 + (index * 0.2)}s
                                        linear
                                        infinite
                                        `
                                }}
                            />

                        ))}

                    </div>

                    <div
                        onMouseDown={startTopLeftResize}
                        style={{
                            position: "absolute",
                            top: "6px",
                            left: "6px",
                            width:
                                isMobile
                                    ? "22px"
                                    : "28px",
                            height:
                                isMobile
                                    ? "22px"
                                    : "28px",
                            borderTop:
                                "2px solid rgba(255,220,170,0.95)",
                            borderLeft:
                                "2px solid rgba(255,220,170,0.95)",
                            borderTopLeftRadius: "8px",
                            cursor: "nwse-resize",
                            zIndex: 50
                        }}
                    />

                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            gap:
                                isMobile
                                    ? "6px"
                                    : "10px",
                            flexWrap:
                                isMobile
                                    ? "nowrap"
                                    : "wrap",
                            marginBottom:
                                isMobile
                                    ? "6px"
                                    : "14px",
                            position: "relative",
                            zIndex: 3,
                            overflowX:
                                isMobile
                                    ? "auto"
                                    : "visible",
                            whiteSpace:
                                isMobile
                                    ? "nowrap"
                                    : "normal",
                            WebkitOverflowScrolling: "touch"
                        }}
                    >

                        <div
                            style={{
                                display: "flex",
                                gap:
                                    isMobile
                                        ? "5px"
                                        : "8px",
                                flexWrap:
                                    isMobile
                                        ? "nowrap"
                                        : "wrap",
                                overflowX:
                                    isMobile
                                        ? "auto"
                                        : "visible",
                                whiteSpace:
                                    isMobile
                                        ? "nowrap"
                                        : "normal",
                                WebkitOverflowScrolling: "touch",
                                paddingLeft:
                                    isMobile
                                        ? "24px"
                                        : "0"
                            }}
                        >

                            <ModeButton
                                text="CHAT"
                                active={mode === "CHAT"}
                                mode={mode}
                                onClick={() => setMode("CHAT")}
                            />

                            <ModeButton
                                text="MVP"
                                active={mode === "MVP"}
                                mode={mode}
                                onClick={() => setMode("MVP")}
                            />

                            <ModeButton
                                text="LOGGER"
                                active={mode === "LOGGER"}
                                mode={mode}
                                onClick={() => setMode("LOGGER")}
                            />

                            <ModeButton
                                text="VOICE"
                                active={mode === "VOICE"}
                                mode={mode}
                                onClick={() => setMode("VOICE")}
                            />

                            <ModeButton
                                text="VIDEO"
                                active={mode === "VIDEO"}
                                mode={mode}
                                onClick={() => setMode("VIDEO")}
                            />

                        </div>

                        <div
                            style={{
                                display: "flex",
                                gap:
                                    isMobile
                                        ? "5px"
                                        : "8px",
                                alignItems: "center"
                            }}
                        >

                            <button
                                onClick={clearMessages}
                                style={{
                                    ...statusButton,
                                    background:
                                        "rgba(90,40,20,0.82)",
                                    color: "#fff0d6"
                                }}
                            >
                                CLEAR
                            </button>

                        </div>

                    </div>

                    <div
                        style={{
                            display: "flex",
                            gap:
                                isMobile
                                    ? "5px"
                                    : "8px",
                            flexWrap:
                                isMobile
                                    ? "nowrap"
                                    : "wrap",
                            marginBottom:
                                isMobile
                                    ? "6px"
                                    : "14px",
                            position: "relative",
                            zIndex: 3,
                            overflowX:
                                isMobile
                                    ? "auto"
                                    : "visible",
                            whiteSpace:
                                isMobile
                                    ? "nowrap"
                                    : "normal",
                            WebkitOverflowScrolling: "touch"
                        }}
                    >

                        <label style={toolbarButton}>
                            UPLOAD
                            <input
                                type="file"
                                style={{
                                    display: "none"
                                }}
                            />
                        </label>

                        <button style={toolbarButton}>
                            EXPORT
                        </button>

                        <button
                            onClick={copyMessages}
                            style={toolbarButton}
                        >
                            COPY
                        </button>

                    </div>

                    <div
                        ref={messagesRef}
                        style={{
                            flex: 1,
                            minHeight: 0,
                            overflowY: "auto",
                            WebkitOverflowScrolling: "touch",
                            borderRadius:
                                isMobile
                                    ? "15px"
                                    : "22px",
                            padding:
                                isMobile
                                    ? "8px"
                                    : "18px",
                            display: "flex",
                            flexDirection: "column",
                            gap:
                                isMobile
                                    ? "7px"
                                    : "12px",
                            background:
                                mode === "CHAT"
                                    ? "rgba(255,240,220,0.05)"
                                    : "rgba(255,248,236,0.92)",
                            position: "relative",
                            zIndex: 3
                        }}
                    >

                        {messages.map((item, index) => (

                            <div
                                key={index}
                                style={{
                                    width: "fit-content",
                                    maxWidth:
                                        isMobile
                                            ? "88%"
                                            : "78%",
                                    marginLeft:
                                        item.role === "user"
                                            ? "auto"
                                            : "0",
                                    borderRadius:
                                        isMobile
                                            ? "12px"
                                            : "18px",
                                    padding:
                                        isMobile
                                            ? "7px 9px"
                                            : "10px 12px",
                                    background:
                                        item.role === "user"
                                            ? `
                                            linear-gradient(
                                                to bottom,
                                                rgba(76,46,24,0.98),
                                                rgba(42,22,10,0.98)
                                            )
                                            `
                                            : `
                                            linear-gradient(
                                                to bottom,
                                                rgba(58,34,18,0.96),
                                                rgba(34,18,8,0.98)
                                            )
                                            `,
                                    border:
                                        "1px solid rgba(255,220,170,0.10)",
                                    display: "flex",
                                    alignItems: "center",
                                    gap:
                                        isMobile
                                            ? "7px"
                                            : "12px"
                                }}
                            >

                                {item.role === "assistant" && (

                                    <video
                                        src={murzikEyes}
                                        autoPlay
                                        muted
                                        loop={isThinking}
                                        playsInline
                                        style={{
                                            width:
                                                isMobile
                                                    ? "32px"
                                                    : "54px",
                                            height:
                                                isMobile
                                                    ? "32px"
                                                    : "54px",
                                            objectFit: "cover",
                                            borderRadius:
                                                isMobile
                                                    ? "10px"
                                                    : "16px",
                                            border:
                                                "1px solid rgba(255,220,170,0.18)",
                                            boxShadow:
                                                isMobile
                                                    ? "0 0 8px rgba(255,180,100,0.12)"
                                                    : "0 0 16px rgba(255,180,100,0.22)"
                                        }}
                                    />

                                )}

                                <div
                                    style={{
                                        color:
                                            mode === "CHAT"
                                                ? "#fff2de"
                                                : "#ffffff",
                                        fontSize:
                                            isMobile
                                                ? "10px"
                                                : "14px",
                                        fontWeight:
                                            mode === "CHAT"
                                                ? "400"
                                                : "700",
                                        lineHeight:
                                            isMobile
                                                ? "1.35"
                                                : "1.5"
                                    }}
                                >
                                    {item.text}
                                </div>

                            </div>

                        ))}

                    </div>

                    <div
                        style={{
                            display: "flex",
                            gap:
                                isMobile
                                    ? "6px"
                                    : "10px",
                            marginTop:
                                isMobile
                                    ? "8px"
                                    : "14px",
                            position: "relative",
                            zIndex: 3
                        }}
                    >

                        <input
                            value={message}
                            onChange={(e) =>
                                setMessage(e.target.value)
                            }
                            onKeyDown={handleKeyDown}
                            placeholder="Ask Murzik..."
                            style={{
                                flex: 1,
                                height:
                                    isMobile
                                        ? "34px"
                                        : "46px",
                                borderRadius:
                                    isMobile
                                        ? "12px"
                                        : "18px",
                                paddingLeft:
                                    isMobile
                                        ? "10px"
                                        : "16px",
                                paddingRight:
                                    isMobile
                                        ? "10px"
                                        : "16px",
                                border:
                                    "1px solid rgba(255,220,170,0.12)",
                                outline: "none",
                                background:
                                    mode === "CHAT"
                                        ? `
                                        linear-gradient(
                                            to bottom,
                                            rgba(44,24,12,0.98),
                                            rgba(24,12,6,0.98)
                                        )
                                        `
                                        : "rgba(255,248,236,0.96)",
                                color:
                                    mode === "CHAT"
                                        ? "#fff2de"
                                        : "#2a1a0e",
                                fontSize:
                                    isMobile
                                        ? "10px"
                                        : "12px"
                            }}
                        />

                        <button
                            onClick={sendMessage}
                            style={{
                                width:
                                    isMobile
                                        ? "58px"
                                        : "92px",
                                borderRadius:
                                    isMobile
                                        ? "12px"
                                        : "18px",
                                border:
                                    "1px solid rgba(255,220,170,0.16)",
                                background:
                                    `
                                    linear-gradient(
                                        to bottom,
                                        rgba(92,56,28,0.96),
                                        rgba(56,30,12,0.98)
                                    )
                                    `,
                                color: "#fff0d6",
                                fontSize:
                                    isMobile
                                        ? "8px"
                                        : "11px",
                                cursor: "pointer",
                                fontFamily: "'Cinzel', serif"
                            }}
                        >
                            SEND
                        </button>

                    </div>

                </div>

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
                        fontFamily: "'Inter', sans-serif"
                    }}
                >
                    Murzik is a next-generation multimodal intelligence system powered by adaptive quantum orchestration layers and cognitive runtime architecture. Designed for scalable reasoning, multimodal interaction and intelligent real-time processing.
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

                @keyframes chatSpark0 {

                    0% {
                        transform:
                            translateY(0px)
                            translateX(0px)
                            scale(0.6);
                        opacity: 0;
                    }

                    20% {
                        opacity: 1;
                    }

                    100% {
                        transform:
                            translateY(-180px)
                            translateX(30px)
                            scale(1.2);
                        opacity: 0;
                    }
                }

                @keyframes chatSpark1 {

                    0% {
                        transform:
                            translateY(0px)
                            translateX(0px)
                            scale(0.7);
                        opacity: 0;
                    }

                    20% {
                        opacity: 1;
                    }

                    100% {
                        transform:
                            translateY(-220px)
                            translateX(-20px)
                            scale(1.3);
                        opacity: 0;
                    }
                }

                @keyframes chatSpark2 {

                    0% {
                        transform:
                            translateY(0px)
                            translateX(0px)
                            scale(0.8);
                        opacity: 0;
                    }

                    20% {
                        opacity: 1;
                    }

                    100% {
                        transform:
                            translateY(-200px)
                            translateX(12px)
                            scale(1.1);
                        opacity: 0;
                    }
                }

                @keyframes chatSpark3 {

                    0% {
                        transform:
                            translateY(0px)
                            translateX(0px)
                            scale(0.5);
                        opacity: 0;
                    }

                    20% {
                        opacity: 1;
                    }

                    100% {
                        transform:
                            translateY(-240px)
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

function ModeButton({
    text,
    active,
    mode,
    onClick
}) {

    const isMobile =
        window.innerWidth < 768;

    return (
        <button
            onClick={onClick}
            style={{
                height:
                    isMobile
                        ? "24px"
                        : "34px",

                paddingLeft:
                    isMobile
                        ? "8px"
                        : "14px",

                paddingRight:
                    isMobile
                        ? "8px"
                        : "14px",

                borderRadius:
                    isMobile
                        ? "8px"
                        : "14px",

                border:
                    active
                        ? "1px solid rgba(255,220,170,0.22)"
                        : "1px solid rgba(255,255,255,0.06)",

                background:
                    active
                        ? `
                        linear-gradient(
                            to bottom,
                            rgba(244,228,202,0.96),
                            rgba(228,204,170,0.96)
                        )
                        `
                        : "rgba(255,255,255,0.03)",

                color:
                    mode === "CHAT"
                        ? active
                            ? "#2a180c"
                            : "#fff0d6"
                        : "#ffffff",

                fontSize:
                    isMobile
                        ? "7px"
                        : "10px",

                fontWeight:
                    mode === "CHAT"
                        ? "400"
                        : "700",

                letterSpacing:
                    isMobile
                        ? "0.06em"
                        : "0.12em",

                cursor: "pointer",

                fontFamily:
                    "'Cinzel', serif",

                flexShrink: 0
            }}
        >
            {text}
        </button>
    );
}

const toolbarButton = {

    height:
        window.innerWidth < 768
            ? "22px"
            : "34px",

    paddingLeft:
        window.innerWidth < 768
            ? "6px"
            : "14px",

    paddingRight:
        window.innerWidth < 768
            ? "6px"
            : "14px",

    borderRadius:
        window.innerWidth < 768
            ? "8px"
            : "14px",

    border:
        "1px solid rgba(255,220,170,0.12)",

    background:
        "rgba(255,255,255,0.03)",

    color:
        "#f4dcc0",

    display:
        "flex",

    alignItems:
        "center",

    cursor:
        "pointer",

    fontSize:
        window.innerWidth < 768
            ? "7px"
            : "10px",

    fontFamily:
        "'Cinzel', serif",

    flexShrink:
        0
};

const statusButton = {

    height:
        window.innerWidth < 768
            ? "24px"
            : "34px",

    paddingLeft:
        window.innerWidth < 768
            ? "8px"
            : "14px",

    paddingRight:
        window.innerWidth < 768
            ? "8px"
            : "14px",

    borderRadius:
        window.innerWidth < 768
            ? "8px"
            : "14px",

    border:
        "1px solid rgba(255,220,170,0.12)",

    cursor:
        "pointer",

    fontSize:
        window.innerWidth < 768
            ? "7px"
            : "10px",

    letterSpacing:
        window.innerWidth < 768
            ? "0.06em"
            : "0.12em",

    fontFamily:
        "'Cinzel', serif",

    flexShrink:
        0
};