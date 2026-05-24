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

    isThinking,

    isMobile,
    isTablet,

    chatBox,

    startTopLeftResize,
    startDrag
}) {

    function selectMode(nextMode, nextProject) {

        setMode(nextMode);
        setActiveProject(nextProject);
    }

    function handleKeyDown(event) {

        if (event.key === "Enter") {
            sendMessage();
        }
    }

    return (

        <div
            style={{
                position:
                    isMobile
                        ? "relative"
                        : "absolute",

                left:
                    isMobile
                        ? "auto"
                        : `${chatBox.x}px`,

                top:
                    isMobile
                        ? "auto"
                        : `${chatBox.y}px`,

                width:
                    `${chatBox.width}px`,

                height:
                    `${chatBox.height}px`,

                minWidth:
                    isMobile
                        ? "300px"
                        : "340px",

                minHeight:
                    isMobile
                        ? "420px"
                        : "320px",

                maxWidth:
                    isMobile
                        ? "96vw"
                        : "88vw",

                maxHeight:
                    isMobile
                        ? "82vh"
                        : "90vh",

                overflow: "hidden",

                marginTop:
                    isMobile
                        ? "420px"
                        : "0px",

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

            <div
                onMouseDown={startTopLeftResize}
                onTouchStart={startTopLeftResize}
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

                    zIndex: 50,

                    touchAction: "none"
                }}
            />

            <div
                onMouseDown={startDrag}
                onTouchStart={startDrag}
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

                    WebkitOverflowScrolling: "touch",

                    cursor:
                        isMobile
                            ? "default"
                            : "grab"
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
                        mode={mode}
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
                        mode={mode}
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
                        mode={mode}
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
                        mode={mode}
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
                        mode={mode}
                        isMobile={isMobile}
                        onClick={() =>
                            selectMode(
                                "VIDEO",
                                PROJECT_MODES.VIDEO
                            )
                        }
                    />

                </div>

                <button
                    onClick={clearMessages}
                    style={getToolbarButton(isMobile)}
                >
                    CLEAR
                </button>

            </div>

            <div
                style={{
                    display: "flex",
                    gap:
                        isMobile
                            ? "5px"
                            : "8px",

                    marginBottom:
                        isMobile
                            ? "8px"
                            : "14px"
                }}
            >

                <label style={getToolbarButton(isMobile)}>
                    UPLOAD
                    <input
                        type="file"
                        style={{
                            display: "none"
                        }}
                    />
                </label>

                <button
                    onClick={copyMessages}
                    style={getToolbarButton(isMobile)}
                >
                    COPY
                </button>

            </div>

            <div
                ref={messagesRef}
                style={{
                    flex: 1,

                    overflowY: "auto",

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
                        "rgba(255,240,220,0.05)"
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
                                    `
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

                                    marginBottom:
                                        isMobile
                                            ? "6px"
                                            : "10px"
                                }}
                            />

                        )}

                        <div
                            style={{
                                color: "#fff2de",

                                fontSize:
                                    isMobile
                                        ? "10px"
                                        : "14px",

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
                            : "14px"
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
                            `
                            linear-gradient(
                                to bottom,
                                rgba(44,24,12,0.98),
                                rgba(24,12,6,0.98)
                            )
                            `,

                        color: "#fff2de"
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

                        cursor: "pointer"
                    }}
                >
                    SEND
                </button>

            </div>

        </div>
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
                    active
                        ? "#2a180c"
                        : "#fff0d6",

                cursor: "pointer",

                flexShrink: 0
            }}
        >
            {text}
        </button>
    );
}

function getToolbarButton(isMobile) {

    return {

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
            "1px solid rgba(255,220,170,0.12)",

        background:
            "rgba(255,255,255,0.03)",

        color:
            "#f4dcc0",

        cursor:
            "pointer",

        flexShrink:
            0
    };
}