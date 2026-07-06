import {
    T,
    useTranslatedText
} from "../../services/translation";

export default function ChatInput({

    message,
    setMessage,

    sendMessage,
    clearMessages,
    copyMessages,
    downloadMessages,

    handleUploadClick,

    voiceEnabled,
    setVoiceEnabled,

    uploadedFile,

    uploadStatus,

    uploadProgress

}) {

    const placeholderText =
        useTranslatedText(
            "Ask Dragon..."
        );

    const uploadFileTitle =
        useTranslatedText(
            "Upload File"
        );

    const voiceTitle =
        useTranslatedText(
            "Voice"
        );

    const sendMessageTitle =
        useTranslatedText(
            "Send Message"
        );

    const clearChatTitle =
        useTranslatedText(
            "Clear Chat"
        );

    const copyConversationTitle =
        useTranslatedText(
            "Copy Conversation"
        );

    const downloadConversationTitle =
        useTranslatedText(
            "Download Conversation"
        );

    const messageLineCount =
        Math.min(
            4,
            Math.max(
                1,
                message.split("\n").length
            )
        );

    const textareaHeight =
        `${Math.min(
            96,
            Math.max(
                44,
                24 + messageLineCount * 20
            )
        )}px`;

    const iconButtonStyle = {

        width: "44px",

        height: "44px",

        borderRadius: "12px",

        border:
            "1px solid rgba(216,176,122,0.42)",

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

        boxShadow:
            "0 0 0 rgba(216,176,122,0)",

        transition:
            "border-color 180ms ease, box-shadow 180ms ease, color 180ms ease",

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
                            <T>Status:</T>
                            {" "}
                            {uploadStatus}
                        </div>

                        <div>
                            <T>Progress:</T>
                            {" "}
                            {uploadProgress}%
                        </div>

                    </div>

                )
            }

            <div
                className="dragon-chat-input-row"
                style={{

                    display: "flex",

                    alignItems: "flex-end",

                    gap: "8px",

                    flexWrap: "wrap"
                }}
            >

                <button
                    style={iconButtonStyle}
                    onClick={handleUploadClick}
                    title={uploadFileTitle}
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
                    title={voiceTitle}
                >
                    🎤
                </button>

                <textarea
                    rows={messageLineCount}

                    value={message}

                    onChange={event =>
                        setMessage(
                            event.target.value
                        )
                    }

                    onKeyDown={event => {

                        if (
                            event.key === "Enter" &&
                            !event.shiftKey
                        ) {

                            event.preventDefault();

                            sendMessage();
                        }
                    }}

                    placeholder={placeholderText}

                    style={{

                        flex: 1,

                        flexBasis: "180px",

                        minWidth: 0,

                        height: textareaHeight,

                        minHeight: "44px",

                        maxHeight: "96px",

                        borderRadius: "12px",

                        padding:
                            "12px 14px",

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

                        fontSize: "14px",

                        lineHeight: "20px",

                        resize: "none",

                        overflowY: "auto",

                        boxSizing: "border-box"
                    }}
                />

                <div
                    className="dragon-chat-actions-bar"
                    style={{

                        display: "flex",

                        alignItems: "center",

                        gap: "6px",

                        flexShrink: 0
                    }}
                >

                    <button
                        className="dragon-chat-icon-button"
                        onClick={clearMessages}
                        title={clearChatTitle}
                        style={iconButtonStyle}
                    >
                        🗑
                    </button>

                    <button
                        className="dragon-chat-icon-button"
                        onClick={copyMessages}
                        title={copyConversationTitle}
                        style={iconButtonStyle}
                    >
                        📋
                    </button>

                    <button
                        className="dragon-chat-icon-button"
                        onClick={downloadMessages}
                        title={downloadConversationTitle}
                        style={iconButtonStyle}
                    >
                        ⬇
                    </button>

                </div>

                <button
                    className="dragon-chat-send-button"
                    onClick={sendMessage}
                    title={sendMessageTitle}
                    style={{

                        width: "44px",

                        height: "44px",

                        borderRadius: "50%",

                        border:
                            "1px solid rgba(216,176,122,0.58)",

                        background:
                            `
                            linear-gradient(
                                to bottom,
                                rgba(40,18,8,0.95),
                                rgba(18,8,4,0.95)
                            )
                            `,

                        color: "#ffd59a",

                        fontSize: "18px",

                        fontWeight: "700",

                        cursor: "pointer",

                        boxShadow:
                            "0 0 0 rgba(216,176,122,0)",

                        display: "flex",

                        alignItems: "center",

                        justifyContent: "center",

                        transition:
                            "border-color 180ms ease, box-shadow 180ms ease, color 180ms ease",

                        backdropFilter:
                            "blur(10px)",

                        WebkitBackdropFilter:
                            "blur(10px)"
                    }}
                >
                    ➤
                </button>

            </div>

            <style>
                {`
                .dragon-chat-icon-button:hover,
                .dragon-chat-send-button:hover {
                    border-color: rgba(255,213,154,0.78);
                    color: #ffe3b0;
                    box-shadow:
                        0 0 16px rgba(216,176,122,0.24),
                        inset 0 0 18px rgba(255,220,170,0.04);
                }

                @media (max-width: 520px) {
                    .dragon-chat-actions-bar {
                        order: 5;
                        width: 100%;
                        justify-content: flex-end;
                    }

                    .dragon-chat-send-button {
                        order: 4;
                    }
                }
                `}
            </style>

        </div>
    );
}
