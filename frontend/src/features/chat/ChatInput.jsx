import {
    T,
    useTranslatedText
} from "../../services/translation";

import {
    Clipboard,
    Download,
    Mic,
    Paperclip,
    SendHorizontal
} from "lucide-react";

export default function ChatInput({

    message,
    setMessage,

    sendMessage,
    clearMessages,
    copyMessages,
    downloadMessages,

    handleUploadClick,

    voiceEnabled,
    setVoiceEnabled

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

    const iconSize =
        18;

    const iconStrokeWidth =
        1.75;

    const iconButtonStyle = {

        width: "44px",

        height: "44px",

        borderRadius: "50%",

        border:
            "1px solid rgba(216,176,122,0.48)",

        background:
            `
            linear-gradient(
                to bottom,
                rgba(28,15,8,0.94),
                rgba(10,5,3,0.96)
            )
            `,

        color: "#d8b07a",

        cursor: "pointer",

        fontSize: 0,

        display: "flex",

        alignItems: "center",

        justifyContent: "center",

        boxShadow:
            `
            0 0 12px rgba(216,176,122,0.08),
            inset 0 0 10px rgba(216,176,122,0.035)
            `,

        transition:
            "border-color 180ms ease, box-shadow 180ms ease, color 180ms ease, background 180ms ease",

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
                    aria-label={uploadFileTitle}
                >
                    <Paperclip
                        size={iconSize}
                        strokeWidth={iconStrokeWidth}
                    />
                </button>

                <button
                    style={{
                        ...iconButtonStyle,

                        color:
                            voiceEnabled
                                ? "#ffe2b2"
                                : "#d8b07a",

                        boxShadow:
                            voiceEnabled
                                ? `
                                0 0 18px rgba(255,190,90,0.30),
                                inset 0 0 14px rgba(255,220,170,0.06)
                                `
                                : iconButtonStyle.boxShadow
                    }}
                    onClick={() =>
                        setVoiceEnabled(
                            !voiceEnabled
                        )
                    }
                    title={voiceTitle}
                    aria-label={voiceTitle}
                >
                    <Mic
                        size={iconSize}
                        strokeWidth={iconStrokeWidth}
                    />
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
                        aria-label={clearChatTitle}
                        style={{
                            ...iconButtonStyle,
                            width: "68px",
                            borderRadius: "999px",
                            fontSize: "12px",
                            letterSpacing: "0.04em",
                            fontWeight: 600
                        }}
                    >
                        <T>Clear</T>
                    </button>

                    <button
                        className="dragon-chat-icon-button"
                        onClick={copyMessages}
                        title={copyConversationTitle}
                        aria-label={copyConversationTitle}
                        style={iconButtonStyle}
                    >
                        <Clipboard
                            size={iconSize}
                            strokeWidth={iconStrokeWidth}
                        />
                    </button>

                    <button
                        className="dragon-chat-icon-button"
                        onClick={downloadMessages}
                        title={downloadConversationTitle}
                        aria-label={downloadConversationTitle}
                        style={iconButtonStyle}
                    >
                        <Download
                            size={iconSize}
                            strokeWidth={iconStrokeWidth}
                        />
                    </button>

                </div>

                <button
                    className="dragon-chat-send-button"
                    onClick={sendMessage}
                    title={sendMessageTitle}
                    aria-label={sendMessageTitle}
                    style={{

                        ...iconButtonStyle,

                        fontWeight: "700",

                        boxShadow:
                            `
                            0 0 16px rgba(216,176,122,0.12),
                            inset 0 0 12px rgba(216,176,122,0.04)
                            `
                    }}
                >
                    <SendHorizontal
                        size={19}
                        strokeWidth={1.8}
                    />
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
