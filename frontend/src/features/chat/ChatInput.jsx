export default function ChatInput({

    message,
    setMessage,

    sendMessage,

    handleUploadClick,

    voiceEnabled,
    setVoiceEnabled,

    uploadedFile,

    uploadStatus,

    uploadProgress

}) {

    const iconButtonStyle = {

        width: "42px",

        height: "42px",

        borderRadius: "12px",

        border:
            "1px solid rgba(255,220,170,0.10)",

        background:
            `
            linear-gradient(
                to bottom,
                rgba(40,18,8,0.95),
                rgba(18,8,4,0.95)
            )
            `,

        color: "#ffd59a",

        cursor: "pointer",

        fontSize: "18px",

        display: "flex",

        alignItems: "center",

        justifyContent: "center",

        backdropFilter: "blur(10px)",

        WebkitBackdropFilter:
            "blur(10px)"
    };

    return (

        <div
            style={{

                display: "flex",

                flexDirection: "column",

                gap: "10px",

                paddingTop: "10px"
            }}
        >

            {
                uploadedFile && (

                    <div
                        style={{

                            display: "flex",

                            flexDirection: "column",

                            gap: "4px",

                            padding: "10px",

                            borderRadius: "12px",

                            border:
                                "1px solid rgba(255,220,170,0.08)",

                            background:
                                "rgba(255,180,80,0.05)",

                            color: "#ffd59a",

                            fontSize: "12px"
                        }}
                    >

                        <div>
                            📎 {
                                uploadedFile.filename ||
                                uploadedFile.path ||
                                "file"
                            }
                        </div>

                        <div>
                            Status:
                            {" "}
                            {uploadStatus}
                        </div>

                        <div>
                            Progress:
                            {" "}
                            {uploadProgress}%
                        </div>

                    </div>

                )
            }

            <div
                style={{

                    display: "flex",

                    alignItems: "center",

                    gap: "8px"
                }}
            >

                <button
                    style={iconButtonStyle}
                    onClick={handleUploadClick}
                    title="Upload File"
                >
                    📎
                </button>

                <button
                    style={{
                        ...iconButtonStyle,

                        color:
                            voiceEnabled
                                ? "#ffcf6a"
                                : "#ffd59a",

                        boxShadow:
                            voiceEnabled
                                ? "0 0 18px rgba(255,190,90,0.35)"
                                : "none"
                    }}
                    onClick={() =>
                        setVoiceEnabled(
                            !voiceEnabled
                        )
                    }
                    title="Voice"
                >
                    🎤
                </button>

                <input

                    value={message}

                    onChange={event =>
                        setMessage(
                            event.target.value
                        )
                    }

                    onKeyDown={event => {

                        if (
                            event.key === "Enter"
                        ) {

                            sendMessage();
                        }
                    }}

                    placeholder="Ask Murzik..."

                    style={{

                        flex: 1,

                        height: "44px",

                        borderRadius: "12px",

                        paddingLeft: "14px",

                        paddingRight: "14px",

                        border:
                            "1px solid rgba(255,220,170,0.08)",

                        background:
                            `
                            linear-gradient(
                                to bottom,
                                rgba(20,10,6,0.96),
                                rgba(10,4,2,0.98)
                            )
                            `,

                        color: "#fff4e4",

                        outline: "none",

                        fontSize: "14px"
                    }}
                />

                <button
                    onClick={sendMessage}
                    title="Send Message"
                    style={{

                        width: "72px",

                        height: "42px",

                        borderRadius: "12px",

                        border:
                            "1px solid rgba(255,220,170,0.15)",

                        background:
                            `
                            linear-gradient(
                                to bottom,
                                rgba(255,190,90,0.22),
                                rgba(255,120,40,0.12)
                            )
                            `,

                        color: "#ffe3b0",

                        fontSize: "11px",

                        fontWeight: "700",

                        letterSpacing: "0.12em",

                        cursor: "pointer",

                        boxShadow:
                            "0 0 18px rgba(255,180,70,0.18)",

                        backdropFilter:
                            "blur(10px)",

                        WebkitBackdropFilter:
                            "blur(10px)"
                    }}
                >
                    SEND
                </button>

            </div>

        </div>
    );
}