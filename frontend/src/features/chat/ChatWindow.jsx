import {
    useState,
    useRef
} from "react";

import ReactMarkdown from "react-markdown";

import murzikEyes from "../../assets/murzik/murzik-eyes.mp4";

import ChatInput from "./ChatInput";

import LoggerPanel from "../../logger/LoggerPanel";

import { T } from "../../services/translation";

const PROJECT_MODES = {
    CHAT: "chat",
    MVP_1: "mvp1_food_safety_ai",
    MVP_2: "mvp_2",
    LOGGER: "logger"
};

const FOOD_UPLOAD_TIMEOUT_MS =
    45000;

function fetchWithTimeout(url, options, timeoutMs) {

    const controller =
        new AbortController();

    const timeout =
        window.setTimeout(
            () => controller.abort(),
            timeoutMs
        );

    return fetch(
        url,
        {
            ...options,
            signal: controller.signal
        }
    ).finally(() => {
        window.clearTimeout(timeout);
    });
}

export default function ChatWindow({

    mode,
    setMode,

    activeProject,
    setActiveProject,

    message,
    setMessage,

    uploadedFile,
    setUploadedFile,

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

    stopMurzikVoice,

    uploadEndpoint,
    uploadQuestion,
    uploadLanguage,
    onUploadResult

}) {

    const fileInputRef = useRef(null);

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

    function clearChatWindow() {

        messages.forEach(item => {

            if (item.imagePreview) {

                URL.revokeObjectURL(item.imagePreview);
            }
        });

        setUploadedFile(null);

        clearMessages();
    }

    async function handleFileUpload(event) {

        const files =
            Array.from(
                event.target.files || []
            );

        if (!files.length) {
            return;
        }

        for (const file of files) {

            const previewUrl =
                file.type.startsWith("image/")
                    ? URL.createObjectURL(file)
                    : "";

            const uploadStatusText =
                String(uploadLanguage || "").includes("rus")
                    ? "Изображение принято.\n\nВыполняю OCR, извлекаю ингредиенты и сверяю состав с базой знаний. Это может занять несколько секунд."
                    : "Image received.\n\nRunning OCR, extracting ingredients and checking the label against the knowledge base. This may take a few seconds.";

            const uploadMessageId =
                `upload-${Date.now()}-${file.name}`;

            setUploadedFile(file.name);

            if (onUploadResult) {

                onUploadResult(
                    {
                        status: "uploading",
                        formatted_response:
                            uploadStatusText,
                        uploaded_file: {
                            filename: file.name,
                            content_type: file.type,
                            received: true
                        }
                    },
                    file,
                    {
                        messageId: uploadMessageId,
                        imagePreview: previewUrl
                    }
                );
            }

            const formData =
                new FormData();

            formData.append(
                "file",
                file
            );

            if (uploadQuestion) {

                formData.append(
                    "user_question",
                    uploadQuestion
                );
            }

            if (uploadLanguage) {

                formData.append(
                    "lang",
                    uploadLanguage
                );
            }

            formData.append(
                "use_supabase",
                "true"
            );

            formData.append(
                "compact",
                "true"
            );

            try {

                const response =
                    await fetchWithTimeout(
                        uploadEndpoint || "http://127.0.0.1:8000/upload",
                        {
                            method: "POST",
                            body: formData
                        },
                        FOOD_UPLOAD_TIMEOUT_MS
                    );

                const result =
                    await response.json();

                if (!response.ok) {

                    if (onUploadResult) {

                        onUploadResult(
                            result,
                            file,
                            {
                                messageId: uploadMessageId,
                                imagePreview: previewUrl
                            }
                        );
                    }

                    return;
                }

                setUploadedFile(
                    result.uploaded_file ||
                    result.path ||
                    file.name
                );

                if (onUploadResult) {

                    onUploadResult(
                        result,
                        file,
                        {
                            messageId: uploadMessageId,
                            imagePreview: previewUrl
                        }
                    );
                }

                console.log(
                    "Murzik upload result:",
                    result
                );

            } catch (error) {

                console.error(
                    "Murzik upload error:",
                    error
                );

                if (onUploadResult) {

                    const timeoutMessage =
                        error.name === "AbortError"
                            ? (
                                String(uploadLanguage || "").includes("rus")
                                    ? "Анализ занял слишком много времени. Попробуйте загрузить более крупное и чёткое фото только стороны упаковки с составом."
                                    : "Analysis is taking too long. Please upload a sharper close-up photo of only the ingredient label."
                            )
                            : `Не удалось отправить изображение: ${error.message}`;

                    onUploadResult(
                        {
                            status: "error",
                            formatted_response:
                                timeoutMessage
                        },
                        file,
                        {
                            messageId: uploadMessageId,
                            imagePreview: previewUrl
                        }
                    );
                }
            }
        }

        event.target.value = "";
    }

    function handleUploadClick() {

        if (fileInputRef.current) {

            fileInputRef.current.click();
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

        flexDirection: "column",

        gap: "8px",

        marginBottom:
            isMobile
                ? "10px"
                : "12px",

        position: "relative",

        zIndex: 5,

        cursor: "grab"
    }}
>

    <div
        style={{

            display: "none",

            gap: "6px",

            flexWrap: "wrap",

            alignItems: "center",

            justifyContent:
                isMobile
                    ? "center"
                    : "flex-start"
        }}
    >

        <input
            ref={fileInputRef}
            type="file"
            accept="
                image/*,
                video/*,
                audio/*,
                .pdf,
                .txt,
                .csv,
                .json,
                .doc,
                .docx,
                .xls,
                .xlsx,
                .ppt,
                .pptx
            "
            multiple
            style={{
                display: "none"
            }}
            onChange={handleFileUpload}
        />

    </div>

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
                                preload="metadata"
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

                        {item.imagePreview && (

                            <img
                                src={item.imagePreview}
                                alt={item.fileName || "Uploaded product label"}
                                style={{
                                    display: "block",
                                    width: "100%",
                                    maxWidth:
                                        isMobile
                                            ? "220px"
                                            : "280px",
                                    maxHeight:
                                        isMobile
                                            ? "180px"
                                            : "220px",
                                    objectFit: "cover",
                                    borderRadius: "12px",
                                    marginBottom: "10px",
                                    border: "1px solid rgba(255,220,170,0.18)"
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
                                        : "1.6",

                                whiteSpace: "pre-wrap",

                                overflowWrap: "anywhere"
                            }}
                        >
                            <ReactMarkdown
                                components={{
                                    p: ({ children }) => (
                                        <p
                                            style={{
                                                margin: "0 0 10px"
                                            }}
                                        >
                                            {children}
                                        </p>
                                    ),
                                    ul: ({ children }) => (
                                        <ul
                                            style={{
                                                margin: "0 0 10px",
                                                paddingLeft: "18px"
                                            }}
                                        >
                                            {children}
                                        </ul>
                                    ),
                                    ol: ({ children }) => (
                                        <ol
                                            style={{
                                                margin: "0 0 10px",
                                                paddingLeft: "18px"
                                            }}
                                        >
                                            {children}
                                        </ol>
                                    ),
                                    h2: ({ children }) => (
                                        <div
                                            style={{
                                                color: "#ffe2b2",
                                                fontSize: isMobile ? "14px" : "17px",
                                                fontWeight: 700,
                                                marginBottom: "10px"
                                            }}
                                        >
                                            {children}
                                        </div>
                                    ),
                                    h3: ({ children }) => (
                                        <div
                                            style={{
                                                color: "#ffd59a",
                                                fontSize: isMobile ? "12px" : "15px",
                                                fontWeight: 700,
                                                margin: "12px 0 6px"
                                            }}
                                        >
                                            {children}
                                        </div>
                                    ),
                                    strong: ({ children }) => (
                                        <strong
                                            style={{
                                                color: "#ffe2b2"
                                            }}
                                        >
                                            {children}
                                        </strong>
                                    )
                                }}
                            >
                                {item.text || ""}
                            </ReactMarkdown>
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
                            <T>Dragon is thinking...</T>
                        </div>

                    </div>

                )}

            </div>

<ChatInput

    message={message}
    setMessage={setMessage}

    sendMessage={sendMessage}
    clearMessages={clearChatWindow}
    copyMessages={copyMessages}
    downloadMessages={downloadMessages}

    handleUploadClick={handleUploadClick}

    voiceEnabled={voiceEnabled}
    setVoiceEnabled={setVoiceEnabled}

    stopMurzikVoice={stopMurzikVoice}

/>

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

                height: "30px",

                minWidth: "92px",

                paddingLeft: "12px",
                paddingRight: "12px",

                borderRadius: "10px",

                border:
                    active
                        ? "1px solid rgba(255,190,90,0.22)"
                        : "1px solid rgba(255,220,170,0.05)",

                background:
                    active
                        ? `
                        linear-gradient(
                            to bottom,
                            rgba(255,170,70,0.14),
                            rgba(255,120,20,0.08)
                        )
                        `
                        : `
                        linear-gradient(
                            to bottom,
                            rgba(255,255,255,0.018),
                            rgba(255,255,255,0.008)
                        )
                        `,

                color:
                    active
                        ? "#ffe2b2"
                        : "#f2dcc2",

                cursor: "pointer",

                fontSize: "9px",

                fontWeight: "500",

                letterSpacing: "0.16em",

                transition:
                    "all 0.20s ease",

                backdropFilter:
                    "blur(10px)",

                WebkitBackdropFilter:
                    "blur(10px)",

                boxShadow:
                    active
                        ? `
                        0 0 16px rgba(255,140,0,0.10)
                        `
                        : `
                        0 0 8px rgba(255,255,255,0.015)
                        `,

                whiteSpace: "nowrap",

                flexShrink: 0,

                display: "flex",

                alignItems: "center",

                justifyContent: "center",

                lineHeight: 1,

                userSelect: "none"
            }}
        >
            <T>{text}</T>
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

                height: "30px",

                minWidth:
                    isMobile
                        ? "74px"
                        : "86px",

                paddingLeft: "12px",
                paddingRight: "12px",

                borderRadius: "10px",

                border:
                    active
                        ? "1px solid rgba(255,220,170,0.18)"
                        : "1px solid rgba(255,255,255,0.04)",

                background:
                    active
                        ? `
                        linear-gradient(
                            to bottom,
                            rgba(255,220,170,0.88),
                            rgba(220,180,120,0.78)
                        )
                        `
                        : `
                        linear-gradient(
                            to bottom,
                            rgba(255,255,255,0.02),
                            rgba(255,255,255,0.008)
                        )
                        `,

                color:
                    active
                        ? "#1c120a"
                        : "#f5dfc5",

                cursor: "pointer",

                flexShrink: 0,

                fontSize:
                    isMobile
                        ? "8px"
                        : "9px",

                fontWeight: "500",

                letterSpacing: "0.16em",

                transition:
                    "all 0.20s ease",

                backdropFilter:
                    "blur(10px)",

                WebkitBackdropFilter:
                    "blur(10px)",

                boxShadow:
                    active
                        ? `
                        0 0 18px rgba(255,180,70,0.12)
                        `
                        : `
                        0 0 8px rgba(255,255,255,0.015)
                        `,

                display: "flex",

                alignItems: "center",

                justifyContent: "center",

                lineHeight: 1,

                userSelect: "none"
            }}
        >
            <T>{text}</T>
        </button>
    );
}
