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
    startBottomResize,

    voiceEnabled,
    setVoiceEnabled,

    stopMurzikVoice

}) {

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
                                rgba(255,180,80,0.10),
                                rgba(255,120,30,0.03),
                                transparent 72%
                            )
                            `
                    }}
                />

                {Array.from({
                    length:
                        isMobile
                            ? 18
                            : 34
                }).map((_, index) => (

                    <div
                        key={index}
                        style={{

                            position: "absolute",

                            width:
                                `${1.5 + (index % 2)}px`,

                            height:
                                `${14 + (index % 7)}px`,

                            left:
                                `${(index * 5.4) % 100}%`,

                            top:
                                `${(index * 9) % 92}%`,

                            borderRadius:
                                "999px",

                            background:
                                `
                                linear-gradient(
                                    to bottom,
                                    rgba(255,255,255,0.98),
                                    rgba(255,220,120,0.95),
                                    rgba(255,160,40,0.35),
                                    rgba(255,120,40,0)
                                )
                                `,

                            boxShadow:
                                `
                                0 0 12px rgba(255,210,120,0.35),
                                0 0 22px rgba(255,140,40,0.18)
                                `,

                            filter:
                                "blur(0.2px)",

                            opacity: 0.92,

                            animation:
                                `
                                murzikSpark${index % 4}
                                ${3.4 + index * 0.14}s
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
                        gap: "8px",
                        flexWrap: "wrap"
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
                        gap: "8px",
                        flexWrap: "wrap"
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

                    gap: "8px",

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
                            : "VOICE OFF"
                    }
                    active={voiceEnabled}
                    onClick={() =>
                        setVoiceEnabled(
                            prev => !prev
                        )
                    }
                />

                <ToolbarButton
                    text="STOP VOICE"
                    onClick={stopMurzikVoice}
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

                        height: "42px",

                        borderRadius: "14px",

                        paddingLeft: "16px",
                        paddingRight: "16px",

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

                        width: "110px",

                        borderRadius: "14px",

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

                        fontWeight: "500",

                        fontSize: "10px",

                        letterSpacing: "0.12em"
                    }}
                >
                    SEND
                </button>

            </div>

            <style>
                {`
                @keyframes murzikSpark0 {

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
                            translateY(-180px)
                            translateX(22px)
                            scale(1.1);

                        opacity: 0;
                    }
                }

                @keyframes murzikSpark1 {

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
                            translateX(-18px)
                            scale(1);

                        opacity: 0;
                    }
                }

                @keyframes murzikSpark2 {

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
                            translateY(-160px)
                            translateX(16px)
                            scale(1.2);

                        opacity: 0;
                    }
                }

                @keyframes murzikSpark3 {

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
                            translateY(-240px)
                            translateX(-12px)
                            scale(1.15);

                        opacity: 0;
                    }
                }
                `}
            </style>

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

                height: "34px",

                minWidth: "110px",

                paddingLeft: "14px",
                paddingRight: "14px",

                borderRadius: "12px",

                border:
                    active
                        ? "1px solid rgba(255,190,90,0.18)"
                        : "1px solid rgba(255,220,170,0.06)",

                background:
                    active
                        ? `
                        linear-gradient(
                            to bottom,
                            rgba(255,170,70,0.18),
                            rgba(255,120,20,0.10)
                        )
                        `
                        : `
                        linear-gradient(
                            to bottom,
                            rgba(255,255,255,0.025),
                            rgba(255,255,255,0.012)
                        )
                        `,

                color:
                    active
                        ? "#ffe2b2"
                        : "#f4dcc0",

                cursor: "pointer",

                fontSize: "10px",

                fontWeight: "500",

                letterSpacing: "0.12em",

                transition:
                    "all 0.22s ease",

                backdropFilter:
                    "blur(10px)",

                WebkitBackdropFilter:
                    "blur(10px)",

                boxShadow:
                    active
                        ? `
                        0 0 18px rgba(255,140,0,0.12)
                        `
                        : `
                        0 0 10px rgba(255,255,255,0.02)
                        `,

                whiteSpace: "nowrap",

                flexShrink: 0
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

                height: "34px",

                minWidth:
                    isMobile
                        ? "82px"
                        : "94px",

                paddingLeft: "14px",
                paddingRight: "14px",

                borderRadius: "12px",

                border:
                    active
                        ? "1px solid rgba(255,220,170,0.16)"
                        : "1px solid rgba(255,255,255,0.05)",

                background:
                    active
                        ? `
                        linear-gradient(
                            to bottom,
                            rgba(255,220,170,0.92),
                            rgba(220,180,120,0.82)
                        )
                        `
                        : `
                        linear-gradient(
                            to bottom,
                            rgba(255,255,255,0.03),
                            rgba(255,255,255,0.015)
                        )
                        `,

                color:
                    active
                        ? "#24140a"
                        : "#f6e3ca",

                cursor: "pointer",

                flexShrink: 0,

                fontSize:
                    isMobile
                        ? "9px"
                        : "10px",

                fontWeight: "500",

                letterSpacing: "0.12em",

                transition:
                    "all 0.22s ease",

                backdropFilter:
                    "blur(10px)",

                WebkitBackdropFilter:
                    "blur(10px)",

                boxShadow:
                    active
                        ? `
                        0 0 22px rgba(255,180,70,0.14)
                        `
                        : `
                        0 0 10px rgba(255,255,255,0.02)
                        `
            }}
        >
            {text}
        </button>
    );
}