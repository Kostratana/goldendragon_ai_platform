import {
    useState,
    useRef,
    useEffect
} from "react";

import murzikEyes from "../../assets/murzik/murzik-eyes.mp4";

const PROJECT_MODES = {
    CHAT: "chat",
    MVP_1: "murzik_health",
    MVP_2: "horse_ai",
    LOGGER: "logger",
    VOICE: "voice",
    VIDEO: "video"
};

export default function ChatWindow({

    mode,
    setMode,

    activeProject,
    setActiveProject,

    message,
    setMessage,

    messages,
    messagesRef,

    sendMessage,
    clearMessages,
    copyMessages,
    downloadMessages,

    isThinking,

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

}) {

    const [voiceEnabled, setVoiceEnabled] =
        useState(false);

    const [voiceLoading, setVoiceLoading] =
        useState(false);

    const audioRef =
        useRef(null);

    const lastSpokenMessageRef =
        useRef("");

    function selectMode(nextMode, nextProject) {

        setMode(nextMode);

        setActiveProject(
            nextProject
        );
    }

    function handleKeyDown(event) {

        if (event.key === "Enter") {

            sendMessage();
        }
    }

    async function speakText(text) {

        if (!text) {
            return;
        }

        try {

            setVoiceLoading(true);

            /*
            STOP OLD AUDIO
            */

            if (
                audioRef.current
            ) {

                audioRef.current.pause();

                audioRef.current = null;
            }

            const response =
                await fetch(
                    "https://api.openai.com/v1/audio/speech",
                    {

                        method: "POST",

                        headers: {

                            "Content-Type":
                                "application/json",

                            Authorization:
                                `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`
                        },

                        body: JSON.stringify({

                            model:
                                "gpt-4o-mini-tts",

                            /*
                            DEEP MALE VOICE
                            */

                            voice:
                                "onyx",

                            input:
                                text,

                            format:
                                "mp3",

                            speed:
                                0.92
                        })
                    }
                );

            if (!response.ok) {

                throw new Error(
                    "OpenAI voice failed"
                );
            }

            const audioBlob =
                await response.blob();

            const audioUrl =
                URL.createObjectURL(
                    audioBlob
                );

            const audio =
                new Audio(audioUrl);

            audioRef.current =
                audio;

            audio.volume = 1;

            audio.onended = () => {

                URL.revokeObjectURL(
                    audioUrl
                );

                setVoiceLoading(false);
            };

            audio.onerror = () => {

                setVoiceLoading(false);
            };

            await audio.play();

        } catch (error) {

            console.error(
                "Murzik voice runtime error:",
                error
            );

            setVoiceLoading(false);
        }
    }

    function stopVoice() {

        if (
            audioRef.current
        ) {

            audioRef.current.pause();

            audioRef.current = null;
        }

        setVoiceLoading(false);
    }

    async function readLastAssistantMessage() {

        const assistantMessages =
            messages.filter(
                item =>
                    item.role ===
                    "assistant"
            );

        const lastMessage =
            assistantMessages[
                assistantMessages.length - 1
            ];

        if (!lastMessage) {
            return;
        }

        await speakText(
            lastMessage.text
        );
    }

    /*
    MANUAL VOICE MODE
    */

    useEffect(() => {

        if (!voiceEnabled) {
            return;
        }

        const assistantMessages =
            messages.filter(
                item =>
                    item.role ===
                    "assistant"
            );

        const lastMessage =
            assistantMessages[
                assistantMessages.length - 1
            ];

        if (!lastMessage) {
            return;
        }

        /*
        PREVENT DOUBLE PLAYBACK
        */

        if (
            lastSpokenMessageRef.current ===
            lastMessage.text
        ) {
            return;
        }

        lastSpokenMessageRef.current =
            lastMessage.text;

        speakText(
            lastMessage.text
        );

    }, [messages, voiceEnabled]);

    return (

        <div
            style={{

                position: "relative",

                width:
                    `${chatBox.width}px`,

                height:
                    `${chatBox.height}px`,

                minWidth:
                    isMobile
                        ? "320px"
                        : "560px",

                minHeight:
                    isMobile
                        ? "420px"
                        : "520px",

                maxWidth:
                    "96vw",

                maxHeight:
                    "84vh",

                overflow: "hidden",

                borderRadius:
                    isMobile
                        ? "24px"
                        : "30px",

                padding:
                    isMobile
                        ? "12px"
                        : "16px",

                boxSizing: "border-box",

                display: "flex",

                flexDirection: "column",

                zIndex: 20,

                background:
                    `
                    linear-gradient(
                        180deg,
                        rgba(14,8,4,0.76),
                        rgba(6,3,2,0.86)
                    )
                    `,

                backdropFilter:
                    "blur(14px)",

                WebkitBackdropFilter:
                    "blur(14px)",

                border:
                    "1px solid rgba(255,220,170,0.08)",

                boxShadow:
                    `
                    0 0 40px rgba(255,170,80,0.08),
                    0 0 120px rgba(255,110,40,0.05),
                    inset 0 0 40px rgba(255,220,180,0.02)
                    `
            }}
        >

            {/* TRUE RESIZE HANDLES */}

            <ResizeCorner
                position="top-left"
                onMouseDown={startTopLeftResize}
                onTouchStart={startTopLeftResize}
            />

            <ResizeCorner
                position="top-right"
                onMouseDown={startTopRightResize}
                onTouchStart={startTopRightResize}
            />

            <ResizeCorner
                position="bottom-left"
                onMouseDown={startBottomLeftResize}
                onTouchStart={startBottomLeftResize}
            />

            <ResizeCorner
                position="bottom-right"
                onMouseDown={startBottomRightResize}
                onTouchStart={startBottomRightResize}
            />

            {/* RIGHT RESIZE */}

            <div
                onMouseDown={startRightResize}
                onTouchStart={startRightResize}
                style={{

                    position: "absolute",

                    right: 0,

                    top: "50%",

                    transform:
                        "translateY(-50%)",

                    width: "14px",

                    height: "50%",

                    cursor: "ew-resize",

                    zIndex: 120
                }}
            />

            {/* BOTTOM RESIZE */}

            <div
                onMouseDown={startBottomResize}
                onTouchStart={startBottomResize}
                style={{

                    position: "absolute",

                    bottom: 0,

                    left: "50%",

                    transform:
                        "translateX(-50%)",

                    width: "50%",

                    height: "14px",

                    cursor: "ns-resize",

                    zIndex: 120
                }}
            />

            {/* TUNNEL */}

            <div
                style={{
                    position: "absolute",
                    inset: 0,
                    overflow: "hidden",
                    pointerEvents: "none",
                    zIndex: 1
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
                                rgba(255,180,80,0.12),
                                rgba(255,120,30,0.04),
                                transparent 72%
                            )
                            `
                    }}
                />

                {Array.from({
                    length:
                        isMobile
                            ? 14
                            : 28
                }).map((_, index) => (

                    <div
                        key={index}
                        style={{

                            position: "absolute",

                            width:
                                `${1 + (index % 2)}px`,

                            height:
                                `${10 + (index % 5)}px`,

                            left:
                                `${(index * 7) % 100}%`,

                            top:
                                `${(index * 11) % 90}%`,

                            borderRadius:
                                "999px",

                            background:
                                `
                                linear-gradient(
                                    to bottom,
                                    rgba(255,255,255,0.95),
                                    rgba(255,220,140,0.85),
                                    rgba(255,120,40,0)
                                )
                                `,

                            boxShadow:
                                `
                                0 0 12px rgba(255,190,80,0.35)
                                `,

                            animation:
                                `
                                murzikSpark${index % 4}
                                ${3 + index * 0.12}s
                                linear
                                infinite
                                `
                        }}
                    />

                ))}

            </div>

            {/* HEADER */}

            <div
                onMouseDown={startDrag}
                onTouchStart={startDrag}
                style={{

                    display: "flex",

                    justifyContent: "space-between",

                    alignItems: "center",

                    gap: "10px",

                    marginBottom:
                        isMobile
                            ? "10px"
                            : "14px",

                    position: "relative",

                    zIndex: 5,

                    overflowX: "auto",

                    cursor: "grab",

                    paddingBottom: "4px"
                }}
            >

                <div
                    style={{
                        display: "flex",
                        gap: "8px"
                    }}
                >

                    <ModeButton
                        text="CHAT"
                        active={mode === "CHAT"}
                        isMobile={isMobile}
                        onClick={() =>
                            selectMode(
                                "CHAT",
                                PROJECT_MODES.CHAT
                            )
                        }
                    />

                    <ModeButton
                        text="MVP 1"
                        active={mode === "MVP_1"}
                        isMobile={isMobile}
                        onClick={() =>
                            selectMode(
                                "MVP_1",
                                PROJECT_MODES.MVP_1
                            )
                        }
                    />

                    <ModeButton
                        text="MVP 2"
                        active={mode === "MVP_2"}
                        isMobile={isMobile}
                        onClick={() =>
                            selectMode(
                                "MVP_2",
                                PROJECT_MODES.MVP_2
                            )
                        }
                    />

                    <ModeButton
                        text="LOGGER"
                        active={mode === "LOGGER"}
                        isMobile={isMobile}
                        onClick={() =>
                            selectMode(
                                "LOGGER",
                                PROJECT_MODES.LOGGER
                            )
                        }
                    />

                    <ModeButton
                        text="VOICE"
                        active={mode === "VOICE"}
                        isMobile={isMobile}
                        onClick={() =>
                            selectMode(
                                "VOICE",
                                PROJECT_MODES.VOICE
                            )
                        }
                    />

                    <ModeButton
                        text="VIDEO"
                        active={mode === "VIDEO"}
                        isMobile={isMobile}
                        onClick={() =>
                            selectMode(
                                "VIDEO",
                                PROJECT_MODES.VIDEO
                            )
                        }
                    />

                </div>

                <div
                    style={{
                        display: "flex",
                        gap: "8px"
                    }}
                >

                    <ToolbarButton
                        text="CLEAR"
                        onClick={clearMessages}
                    />

                    <ToolbarButton
                        text="COPY"
                        onClick={copyMessages}
                    />

                    <ToolbarButton
                        text="DOWNLOAD"
                        onClick={downloadMessages}
                    />

                </div>

            </div>

            {/* VOICE BAR */}

            <div
                style={{

                    display: "flex",

                    gap: "10px",

                    marginBottom:
                        isMobile
                            ? "10px"
                            : "14px",

                    flexWrap: "wrap",

                    position: "relative",

                    zIndex: 5
                }}
            >

                <ToolbarButton
                    text={
                        voiceEnabled
                            ? "VOICE ACTIVE"
                            : "START VOICE"
                    }
                    active={voiceEnabled}
                    onClick={() =>
                        setVoiceEnabled(
                            prev => !prev
                        )
                    }
                />

                <ToolbarButton
                    text={
                        voiceLoading
                            ? "READING..."
                            : "READ LAST"
                    }
                    onClick={
                        readLastAssistantMessage
                    }
                />

                <ToolbarButton
                    text="STOP VOICE"
                    onClick={stopVoice}
                />

                <label
                    style={{
                        display:
                            "inline-flex"
                    }}
                >

                    <input
                        type="file"
                        style={{
                            display:
                                "none"
                        }}
                    />

                    <ToolbarButton
                        text="UPLOAD"
                    />

                </label>

            </div>

            {/* MESSAGES */}

            <div
                ref={messagesRef}
                style={{

                    flex: 1,

                    overflowY: "auto",

                    borderRadius:
                        isMobile
                            ? "18px"
                            : "24px",

                    padding:
                        isMobile
                            ? "12px"
                            : "18px",

                    display: "flex",

                    flexDirection: "column",

                    gap:
                        isMobile
                            ? "10px"
                            : "14px",

                    background:
                        `
                        linear-gradient(
                            180deg,
                            rgba(255,235,200,0.02),
                            rgba(20,8,4,0.08)
                        )
                        `,

                    border:
                        "1px solid rgba(255,220,170,0.05)",

                    position: "relative",

                    zIndex: 5
                }}
            >

                {messages.map((item, index) => (

                    <div
                        key={index}
                        style={{

                            width: "fit-content",

                            maxWidth:
                                isMobile
                                    ? "92%"
                                    : "74%",

                            marginLeft:
                                item.role === "user"
                                    ? "auto"
                                    : "0",

                            borderRadius:
                                isMobile
                                    ? "14px"
                                    : "18px",

                            padding:
                                isMobile
                                    ? "10px"
                                    : "14px",

                            background:
                                item.role === "user"
                                    ? `
                                    linear-gradient(
                                        to bottom,
                                        rgba(56,30,16,0.90),
                                        rgba(22,10,6,0.94)
                                    )
                                    `
                                    : `
                                    linear-gradient(
                                        to bottom,
                                        rgba(34,18,10,0.90),
                                        rgba(16,8,4,0.94)
                                    )
                                    `,

                            border:
                                "1px solid rgba(255,220,170,0.06)"
                        }}
                    >

                        {item.role === "assistant" && (

                            <video
                                src={murzikEyes}
                                autoPlay
                                muted
                                loop
                                playsInline
                                style={{

                                    width:
                                        isMobile
                                            ? "40px"
                                            : "54px",

                                    height:
                                        isMobile
                                            ? "40px"
                                            : "54px",

                                    objectFit: "cover",

                                    borderRadius:
                                        isMobile
                                            ? "10px"
                                            : "14px",

                                    marginBottom:
                                        isMobile
                                            ? "6px"
                                            : "10px"
                                }}
                            />

                        )}

                        <div
                            style={{

                                color: "#fff4e4",

                                fontSize:
                                    isMobile
                                        ? "11px"
                                        : "14px",

                                lineHeight:
                                    isMobile
                                        ? "1.45"
                                        : "1.6"
                            }}
                        >
                            {item.text}
                        </div>

                    </div>

                ))}

                {isThinking && (

                    <div
                        style={{

                            width: "fit-content",

                            borderRadius: "18px",

                            padding: "14px",

                            background:
                                `
                                linear-gradient(
                                    to bottom,
                                    rgba(34,18,10,0.90),
                                    rgba(16,8,4,0.94)
                                )
                                `,

                            border:
                                "1px solid rgba(255,220,170,0.06)"
                        }}
                    >

                        <div
                            style={{
                                color: "#f0d7b5",
                                letterSpacing: "0.08em"
                            }}
                        >
                            Murzik is thinking...
                        </div>

                    </div>

                )}

            </div>

            {/* INPUT */}

            <div
                style={{

                    display: "flex",

                    gap:
                        isMobile
                            ? "8px"
                            : "10px",

                    marginTop:
                        isMobile
                            ? "10px"
                            : "14px",

                    position: "relative",

                    zIndex: 5
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
                                ? "44px"
                                : "52px",

                        borderRadius:
                            isMobile
                                ? "16px"
                                : "20px",

                        paddingLeft: "18px",
                        paddingRight: "18px",

                        border:
                            "1px solid rgba(255,220,170,0.08)",

                        outline: "none",

                        background:
                            `
                            linear-gradient(
                                to bottom,
                                rgba(20,10,6,0.96),
                                rgba(10,4,2,0.98)
                            )
                            `,

                        color: "#fff4e4"
                    }}
                />

                <button
                    onClick={sendMessage}
                    style={{

                        width:
                            isMobile
                                ? "84px"
                                : "110px",

                        borderRadius:
                            isMobile
                                ? "16px"
                                : "20px",

                        border:
                            "1px solid rgba(255,220,170,0.08)",

                        background:
                            `
                            linear-gradient(
                                to bottom,
                                rgba(92,50,24,0.92),
                                rgba(42,20,10,0.96)
                            )
                            `,

                        color: "#fff2de",

                        cursor: "pointer",

                        fontWeight: "600",

                        letterSpacing: "0.05em"
                    }}
                >
                    SEND
                </button>

            </div>

        </div>
    );
}

function ResizeCorner({
    position,
    onMouseDown,
    onTouchStart
}) {

    const styles = {

        position: "absolute",

        width: "22px",

        height: "22px",

        zIndex: 200,

        opacity: 0.85,

        borderColor:
            "rgba(255,220,170,0.45)"
    };

    if (position === "top-left") {

        styles.left = 0;
        styles.top = 0;

        styles.cursor =
            "nwse-resize";

        styles.borderLeft =
            "2px solid rgba(255,220,170,0.45)";

        styles.borderTop =
            "2px solid rgba(255,220,170,0.45)";
    }

    if (position === "top-right") {

        styles.right = 0;
        styles.top = 0;

        styles.cursor =
            "nesw-resize";

        styles.borderRight =
            "2px solid rgba(255,220,170,0.45)";

        styles.borderTop =
            "2px solid rgba(255,220,170,0.45)";
    }

    if (position === "bottom-left") {

        styles.left = 0;
        styles.bottom = 0;

        styles.cursor =
            "nesw-resize";

        styles.borderLeft =
            "2px solid rgba(255,220,170,0.45)";

        styles.borderBottom =
            "2px solid rgba(255,220,170,0.45)";
    }

    if (position === "bottom-right") {

        styles.right = 0;
        styles.bottom = 0;

        styles.cursor =
            "nwse-resize";

        styles.borderRight =
            "2px solid rgba(255,220,170,0.45)";

        styles.borderBottom =
            "2px solid rgba(255,220,170,0.45)";
    }

    return (

        <div
            onMouseDown={onMouseDown}
            onTouchStart={onTouchStart}
            style={styles}
        />
    );
}

function ToolbarButton({
    text,
    onClick,
    active = false
}) {

    return (

        <button
            onClick={onClick}
            style={{

                height: "38px",

                paddingLeft: "16px",
                paddingRight: "16px",

                borderRadius: "999px",

                border:
                    active
                        ? "1px solid rgba(255,190,90,0.16)"
                        : "1px solid rgba(255,220,170,0.08)",

                background:
                    active
                        ? `
                        linear-gradient(
                            to bottom,
                            rgba(255,170,70,0.20),
                            rgba(255,120,20,0.12)
                        )
                        `
                        : "rgba(255,255,255,0.03)",

                color:
                    active
                        ? "#ffe2b2"
                        : "#fff0d6",

                cursor: "pointer",

                fontSize: "11px",

                fontWeight: "600",

                letterSpacing: "0.08em",

                boxShadow:
                    active
                        ? `
                        0 0 24px rgba(255,140,0,0.16)
                        `
                        : "none"
            }}
        >
            {text}
        </button>
    );
}

function ModeButton({
    text,
    active,
    isMobile,
    onClick
}) {

    return (

        <button
            onClick={onClick}
            style={{

                height:
                    isMobile
                        ? "30px"
                        : "34px",

                paddingLeft:
                    isMobile
                        ? "12px"
                        : "16px",

                paddingRight:
                    isMobile
                        ? "12px"
                        : "16px",

                borderRadius:
                    "999px",

                border:
                    active
                        ? "1px solid rgba(255,220,170,0.16)"
                        : "1px solid rgba(255,255,255,0.04)",

                background:
                    active
                        ? `
                        linear-gradient(
                            to bottom,
                            rgba(246,226,190,0.92),
                            rgba(218,184,130,0.88)
                        )
                        `
                        : "rgba(255,255,255,0.022)",

                color:
                    active
                        ? "#24140a"
                        : "#fff0d6",

                cursor: "pointer",

                flexShrink: 0,

                fontSize:
                    isMobile
                        ? "9px"
                        : "10px",

                fontWeight: "600",

                letterSpacing: "0.08em"
            }}
        >
            {text}
        </button>
    );
}