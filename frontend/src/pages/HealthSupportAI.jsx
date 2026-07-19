import {
    useEffect,
    useRef,
    useState
} from "react";

import { motion } from "framer-motion";

import AnimatedInkText from "../components/AnimatedInkText";
import Footer from "../components/Footer";

import ChatWindow from "../features/chat/ChatWindow";

import useDragResize from "../hooks/useDragResize";
import useFounderBreakpoints from "../hooks/useFounderBreakpoints";

import {
    T,
    useLanguage,
    useTranslatedText
} from "../services/translation";

import {
    GOLD,
    TEXT
} from "../theme/colors";

import {
    FONT_CINZEL,
    FONT_CINZEL_DECORATIVE,
    FONT_IM_FELL
} from "../theme/fonts";

import foodMurzikImage from "../assets/food_murzik.png";

const HERO_TITLE =
    "Health Support AI";

const HERO_SUBTITLE =
    "An intelligent AI assistant helping people make healthier food choices through computer vision, nutritional intelligence and personalized health analysis.";

const PROJECT_MODES = {
    CHAT: "mvp1_food_safety_ai"
};

const DRAGON_CHAT_ENDPOINT =
    "https://golden-dragon-backend-91075651557.us-central1.run.app/api/chat";

const FOOD_AI_UPLOAD_ENDPOINT =
    "https://murzik-food-ai-91075651557.us-central1.run.app/api/upload";

const DRAGON_MVP_HANDOFF_TIMEOUT_MS =
    12000;

function isRussianLanguage(language) {

    return String(language || "")
        .toLowerCase()
        .startsWith("ru");
}

function detectRequestLanguage(text, fallbackLanguage) {

    if (/[А-Яа-яЁё]/.test(String(text || ""))) {

        return "ru";
    }

    if (/[A-Za-z]/.test(String(text || ""))) {

        return "en";
    }

    return isRussianLanguage(fallbackLanguage)
        ? "ru"
        : "en";
}

function localizedChatContext(userMessage, requestLanguage) {

    if (requestLanguage === "ru") {

        return `Вы отвечаете внутри страницы Health Support AI MVP 1. Пользователь тестирует анализ пищевых продуктов по фото упаковки. Отвечайте строго на русском языке. Сообщение пользователя: ${userMessage}`;
    }

    return `You are answering inside the Health Support AI MVP 1 page. The user is testing food product analysis from package photos. Reply strictly in English. User message: ${userMessage}`;
}

const MVP_WELCOME_RU =
    `Здравствуйте. Это MVP 1 Health Support AI: первый тестовый модуль Golden Dragon AI для анализа продуктов питания по фото упаковки.

Что можно проверить сейчас:
- извлечение ингредиентов с изображения;
- поиск вредных или сомнительных добавок;
- E-номера, красители, подсластители, консерванты, эмульгаторы и загустители;
- возможные следы аллергенов и спорных компонентов;
- рекомендации перед покупкой продукта.

Как протестировать:
1. Нажмите значок скрепки.
2. Загрузите фото состава продукта, где виден список ingredients/ингредиентов.
3. Лучше фотографировать без цифрового зума, при хорошем рассеянном свете, без бликов, держа камеру параллельно упаковке.
4. Если упаковка большая или текст мелкий, загрузите несколько фото разных частей состава.

После загрузки я извлеку текст, проверю ингредиенты по базе знаний и Supabase RAG, покажу найденные совпадения, объясню, что в продукте хорошего, что сомнительно, есть ли искусственные красители, химические добавки, спорные компоненты или ингредиенты животного/насекомого происхождения, если такие данные есть в контексте.

Результаты являются информационным анализом продукта и не заменяют консультацию врача, диетолога или другого профильного специалиста.`;

const MVP_WELCOME_EN =
    `Welcome. This is MVP 1 Health Support AI: the first Golden Dragon AI test module for food product analysis from package photos.

What you can test now:
- ingredient extraction from images;
- detection of harmful or questionable additives;
- E-numbers, colorants, sweeteners, preservatives, emulsifiers and thickeners;
- possible allergens and questionable components;
- purchase-oriented product recommendations.

How to test it:
1. Click the paperclip icon.
2. Upload a clear photo of the ingredient list.
3. Avoid digital zoom, use daylight or soft light, avoid glare and keep the camera parallel to the package.
4. If the package is large or the text is tiny, upload several photos of different ingredient sections.

After upload, I will extract the text, check the ingredients against the knowledge base and Supabase RAG, show the matched findings, explain what looks acceptable, what is questionable, and whether there are artificial colors, chemical additives, controversial ingredients or animal/insect-derived components when that information is available in the context.

The result is informational product analysis and does not replace advice from a doctor, dietitian or other qualified specialist.`;

const PROJECT_DESCRIPTION = [
    {
        title: "Project Overview",
        text:
            "Health Support AI is an intelligent healthcare assistant for preventive nutrition and personalized health support."
    },
    {
        title: "Food Ingredient Analysis",
        text:
            "Users simply scan food packaging or upload a product image into the chat. The AI automatically recognizes ingredients, detects potentially harmful food additives, explains their purpose in clear language, evaluates possible health risks and recommends healthier alternatives before the product is purchased. The objective is to help people make informed nutritional decisions directly in the store."
    },
    {
        title: "Personal Health Assessment",
        text:
            "The platform creates an individual health profile through an intelligent questionnaire covering lifestyle, nutrition, daily habits, symptoms, allergies and personal preferences. Based on this information, the AI evaluates the user's current condition and prepares personalized nutrition recommendations tailored to individual health goals rather than generic dietary advice."
    },
    {
        title: "Body Symmetry & Inflammation Analysis",
        text:
            "Health Support AI extends nutritional analysis with Computer Vision. Using smartphone images, the system analyzes body symmetry and posture, while the planned multimodal pipeline combines movement analysis with infrared imaging concepts to identify potential signs of inflammation. Visual analysis is combined with questionnaire results to generate more personalized health insights and nutritional recommendations."
    },
    {
        title: "Core Mission",
        text:
            "The primary mission of Health Support AI is to help people identify harmful food ingredients before purchase, better understand the impact of nutrition on long-term health and receive intelligent AI-powered recommendations that support preventive healthcare. Instead of reacting to health problems after they occur, the platform encourages healthier everyday decisions through accessible AI assistance."
    }
];

const CURRENT_DEVELOPMENT_ITEMS = [
    "Google Cloud backend",
    "Retrieval-Augmented Generation (RAG)",
    "Supabase database",
    "Prompt orchestration system",
    "AI orchestration pipeline",
    "Product knowledge pipeline"
];

export default function HealthSupportAI() {

    const {
        isMobile,
        isTablet
    } = useFounderBreakpoints();

    const {
        isMobile: isChatMobile,
        isTablet: isChatTablet,
        startDrag,
        startTopLeftResize,
        startTopRightResize,
        startBottomLeftResize,
        startBottomRightResize,
        startRightResize,
        startBottomResize
    } = useDragResize();

    const {
        currentUserLanguage
    } = useLanguage();

    const translatedHeroTitle =
        useTranslatedText(
            HERO_TITLE,
            {
                brand: true
            }
        );

    const translatedHeroSubtitle =
        useTranslatedText(
            HERO_SUBTITLE
        );

    const translatedProjectBannerAlt =
        useTranslatedText(
            HERO_TITLE,
            {
                brand: true
            }
        );

    const [mode, setMode] =
        useState("CHAT");

    const [activeProject, setActiveProject] =
        useState(PROJECT_MODES.CHAT);

    const [message, setMessage] =
        useState("");

    const [messages, setMessages] =
        useState([
            {
                role: "assistant",
                text:
                    isRussianLanguage(currentUserLanguage)
                        ? MVP_WELCOME_RU
                        : MVP_WELCOME_EN
            }
        ]);

    const [lastRequestLanguage, setLastRequestLanguage] =
        useState(
            isRussianLanguage(currentUserLanguage)
                ? "ru"
                : "en"
        );

    const [uploadedFile, setUploadedFile] =
        useState(null);

    const [isThinking, setIsThinking] =
        useState(false);

    const [voiceEnabled, setVoiceEnabled] =
        useState(false);

    const messagesRef =
        useRef(null);

    const audioRuntimeRef =
        useRef(null);

    const chatFrameRef =
        useRef(null);

    const createEmbeddedChatBox = () => {

        const viewportWidth =
            window.innerWidth;

        const viewportHeight =
            window.innerHeight;

        const framePadding =
            isMobile
                ? 24
                : 32;

        const width =
            Math.round(
                Math.min(
                    viewportWidth -
                        (isMobile ? 40 : isTablet ? 88 : 128) -
                        framePadding,
                    isMobile
                        ? viewportWidth - 64
                        : isTablet
                            ? 680
                            : 860
                )
            );

        const height =
            Math.round(
                Math.min(
                    viewportHeight *
                        (isMobile ? 0.64 : 0.74),
                    isMobile
                        ? 620
                        : isTablet
                            ? 760
                            : 820
                )
            );

        return {
            width:
                Math.max(
                    isMobile ? 320 : 560,
                    width
                ),
            height:
                Math.max(
                    isMobile ? 460 : 620,
                    height
                )
        };
    };

    const [embeddedChatBox, setEmbeddedChatBox] =
        useState(createEmbeddedChatBox);

    const [chatFrameSize, setChatFrameSize] =
        useState(null);

    const pagePaddingX =
        isMobile
            ? "max(20px, env(safe-area-inset-left, 0px))"
            : isTablet
                ? "44px"
                : "64px";

    const maxTextWidth =
        "820px";

    const sectionSpacing =
        isMobile
            ? "54px"
            : isTablet
                ? "68px"
                : "78px";

    const heroTitleStyle = {
        color: GOLD,
        fontFamily: FONT_CINZEL_DECORATIVE,
        fontWeight: "700",
        fontSize:
            isMobile
                ? "31px"
                : isTablet
                    ? "44px"
                    : "58px",
        letterSpacing:
            isMobile
                ? "0.02em"
                : isTablet
                    ? "0.05em"
                    : "0.07em",
        lineHeight:
            isMobile
                ? "1.26"
                : "1.22",
        margin: 0,
        "--gd-ink-duration": "22s",
        "--gd-ink-delay-step": "0.10s",
        textAlign: "center",
        textShadow:
            "0 0 26px rgba(216,176,122,0.30), 0 0 58px rgba(255,140,0,0.12)"
    };

    const heroSubtitleStyle = {
        color: TEXT,
        fontFamily: FONT_IM_FELL,
        fontWeight: "400",
        fontSize:
            isMobile
                ? "20px"
                : isTablet
                    ? "23px"
                    : "27px",
        letterSpacing:
            isMobile
                ? "0.01em"
                : "0.03em",
        lineHeight:
            isMobile
                ? "1.55"
                : "1.65",
        margin: 0,
        maxWidth: "820px",
        marginInline: "auto",
        textAlign: "center",
        textShadow:
            "0 0 16px rgba(216,176,122,0.16)"
    };

    const paragraphStyle = {
        color: TEXT,
        fontFamily: FONT_IM_FELL,
        fontSize:
            isMobile
                ? "18px"
                : isTablet
                    ? "20px"
                    : "22px",
        lineHeight:
            isMobile
                ? 1.75
                : 1.82,
        letterSpacing: "0.01em",
        margin: 0,
        textAlign: "center"
    };

    const smallHeadingStyle = {
        color: GOLD,
        fontFamily: FONT_CINZEL,
        fontSize:
            isMobile
                ? "21px"
                : isTablet
                    ? "23px"
                    : "26px",
        fontWeight: "700",
        lineHeight: 1.32,
        letterSpacing: "0.04em",
        margin: 0,
        textAlign: "center",
        textShadow:
            "0 0 15px rgba(216,176,122,0.18)"
    };

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

    async function sendMessage() {

        if (!message.trim()) {
            return;
        }

        const userMessage =
            message;

        const requestLanguage =
            detectRequestLanguage(
                userMessage,
                currentUserLanguage
            );

        setLastRequestLanguage(requestLanguage);

        setMessages(prev => [
            ...prev,
            {
                role: "user",
                text: userMessage
            }
        ]);

        setMessage("");

        setIsThinking(true);

        try {

            const response =
                await fetch(
                    DRAGON_CHAT_ENDPOINT,
                    {
                        method: "POST",

                        headers: {
                            "Content-Type": "application/json"
                        },

                        body: JSON.stringify({

                            message:
                                localizedChatContext(
                                    userMessage,
                                    requestLanguage
                                ),

                            session_id: `health-support-ai-${requestLanguage}`

                        })
                    }
                );

            if (!response.ok) {

                throw new Error(
                    `Backend error: ${response.status}`
                );
            }

            const data =
                await response.json();

            const responseText =
                data.formatted_response ||
                data.response ||
                data.message ||
                "Murzik returned an empty response.";

            setMessages(prev => [
                ...prev,
                {
                    role: "assistant",
                    text: responseText
                }
            ]);

        } catch (error) {

            console.error(
                "Murzik backend error:",
                error
            );

            setMessages(prev => [
                ...prev,
                {
                    role: "assistant",
                    text:
                        `ERROR: ${error.message}`
                }
            ]);
        }

        setIsThinking(false);
    }


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


    async function requestDragonMvpAnswer(
        result,
        statusMessageId,
        fallbackText
    ) {

        const promptPayload =
            result.llm_prompts || {};

        if (
            !promptPayload.system_prompt ||
            !promptPayload.user_prompt
        ) {
            return;
        }

        const requestLanguage =
            detectRequestLanguage(
                fallbackText,
                currentUserLanguage
            );

        setIsThinking(true);

        try {

            const response =
                await fetchWithTimeout(
                    DRAGON_CHAT_ENDPOINT,
                    {
                        method: "POST",

                        headers: {
                            "Content-Type": "application/json"
                        },

                        body: JSON.stringify({
                            message:
                                requestLanguage === "ru"
                                    ? "Объясни результат анализа продукта понятным языком. Ответь строго на русском языке."
                                    : "Explain the product analysis result clearly. Reply strictly in English.",
                            session_id: `health-support-ai-${requestLanguage}-${statusMessageId}`,
                            llm_prompts: promptPayload
                        })
                    },
                    DRAGON_MVP_HANDOFF_TIMEOUT_MS
                );

            if (!response.ok) {

                throw new Error(
                    `Dragon backend error: ${response.status}`
                );
            }

            const data =
                await response.json();

            const dragonText =
                data.answer ||
                data.response ||
                data.message ||
                fallbackText;

            setMessages(prev =>
                prev.map(item =>
                    item.id === statusMessageId
                        ? {
                            ...item,
                            text: dragonText
                        }
                        : item
                )
            );

        } catch (error) {

            console.error(
                "Dragon prompt handoff error:",
                error
            );

            setMessages(prev =>
                prev.map(item =>
                    item.id === statusMessageId
                        ? {
                            ...item,
                            text: fallbackText
                        }
                        : item
                )
            );
        }

        setIsThinking(false);
    }


    function handleUploadResult(result, file, meta = {}) {

        const responseText =
            result.formatted_response ||
            result.response ||
            result.message ||
            "The product image was uploaded, but no analysis text was returned.";

        const messageId =
            meta.messageId ||
            `upload-${Date.now()}-${file.name}`;

        if (result.status === "uploading") {

            setMessages(prev => [
                ...prev,
                {
                    id: `${messageId}-file`,
                    role: "user",
                    text: `Загружено изображение продукта: ${file.name}`,
                    fileName: file.name,
                    imagePreview: meta.imagePreview || ""
                },
                {
                    id: `${messageId}-status`,
                    role: "assistant",
                    text: responseText
                }
            ]);

            return;
        }

        const statusText =
            responseText;

        setMessages(prev => {

            const nextMessages =
                prev.map(item => {

                    if (item.id !== `${messageId}-status`) {

                        return item;
                    }

                    return {
                        ...item,
                        text: statusText
                    };
                });

            const statusFound =
                nextMessages.some(item => item.id === `${messageId}-status`);

            if (statusFound) {

                return nextMessages;
            }

            return [
                ...nextMessages,
                {
                    id: `${messageId}-file`,
                    role: "user",
                    text: `Загружено изображение продукта: ${file.name}`,
                    fileName: file.name,
                    imagePreview: meta.imagePreview || ""
                },
                {
                    id: `${messageId}-status`,
                    role: "assistant",
                    text: statusText
                }
            ];
        });

        requestDragonMvpAnswer(
            result,
            `${messageId}-status`,
            responseText
        );
    }

    function clearMessages() {

        messages.forEach(item => {

            if (item.imagePreview) {

                URL.revokeObjectURL(item.imagePreview);
            }
        });

        setUploadedFile(null);

        setMessages([
            {
                role: "assistant",
                text:
                    isRussianLanguage(currentUserLanguage)
                        ? MVP_WELCOME_RU
                        : MVP_WELCOME_EN
            }
        ]);

        stopMurzikVoice();
    }

    function updateEmbeddedChatSize(
        frameWidth,
        frameHeight
    ) {

        const framePadding =
            isMobile
                ? 24
                : 32;

        setEmbeddedChatBox({
            width:
                Math.max(
                    isMobile ? 320 : 560,
                    Math.round(
                        frameWidth -
                            framePadding
                    )
                ),
            height:
                Math.max(
                    isMobile ? 460 : 620,
                    Math.round(
                        frameHeight -
                            framePadding
                    )
                )
        });
    }

    function startChatFrameResize(
        event,
        direction
    ) {

        event.preventDefault();

        event.stopPropagation();

        const frame =
            chatFrameRef.current;

        if (!frame) {
            return;
        }

        const rect =
            frame.getBoundingClientRect();

        const startX =
            event.clientX;

        const startY =
            event.clientY;

        const startWidth =
            rect.width;

        const startHeight =
            rect.height;

        const minWidth =
            isMobile
                ? Math.min(
                    window.innerWidth - 40,
                    344
                )
                : 620;

        const maxWidth =
            Math.max(
                minWidth,
                Math.min(
                    window.innerWidth -
                        (isMobile ? 40 : isTablet ? 88 : 96),
                    isMobile
                        ? window.innerWidth - 40
                        : isTablet
                            ? 820
                            : 1180
                )
            );

        const minHeight =
            isMobile
                ? 520
                : 620;

        const maxHeight =
            Math.max(
                minHeight,
                Math.round(
                    window.innerHeight *
                        (isMobile ? 0.82 : 0.9)
                )
            );

        function handlePointerMove(moveEvent) {

            const deltaX =
                moveEvent.clientX -
                startX;

            const deltaY =
                moveEvent.clientY -
                startY;

            const widthDelta =
                direction.includes("right")
                    ? deltaX
                    : direction.includes("left")
                        ? -deltaX
                        : 0;

            const heightDelta =
                direction.includes("bottom")
                    ? deltaY
                    : direction.includes("top")
                        ? -deltaY
                        : 0;

            const nextWidth =
                Math.max(
                    minWidth,
                    Math.min(
                        maxWidth,
                        startWidth +
                            widthDelta
                    )
                );

            const nextHeight =
                Math.max(
                    minHeight,
                    Math.min(
                        maxHeight,
                        startHeight +
                            heightDelta
                    )
                );

            setChatFrameSize({
                width:
                    Math.round(
                        nextWidth
                    ),
                height:
                    Math.round(
                        nextHeight
                    )
            });

            updateEmbeddedChatSize(
                nextWidth,
                nextHeight
            );
        }

        function handlePointerUp() {

            window.removeEventListener(
                "pointermove",
                handlePointerMove
            );

            window.removeEventListener(
                "pointerup",
                handlePointerUp
            );
        }

        window.addEventListener(
            "pointermove",
            handlePointerMove
        );

        window.addEventListener(
            "pointerup",
            handlePointerUp
        );
    }

    function getChatFrameResizeHandleStyle(
        direction
    ) {

        const baseStyle = {
            position: "absolute",
            zIndex: 300,
            touchAction: "none",
            background: "transparent"
        };

        const edgeOffset =
            isMobile
                ? "4px"
                : "6px";

        const edgeSize =
            isMobile
                ? "22px"
                : "24px";

        const cornerSize =
            isMobile
                ? "34px"
                : "38px";

        const cornerAccent = {
            borderColor:
                "rgba(216,176,122,0.58)",
            boxShadow:
                "0 0 16px rgba(216,176,122,0.16)"
        };

        const styles = {
            top: {
                top: 0,
                left: cornerSize,
                right: cornerSize,
                height: edgeSize,
                cursor: "ns-resize",
                borderTop:
                    "1px solid rgba(216,176,122,0.18)"
            },
            right: {
                top: cornerSize,
                right: 0,
                bottom: cornerSize,
                width: edgeSize,
                cursor: "ew-resize",
                borderRight:
                    "1px solid rgba(216,176,122,0.22)"
            },
            bottom: {
                bottom: 0,
                left: cornerSize,
                right: cornerSize,
                height: edgeSize,
                cursor: "ns-resize",
                borderBottom:
                    "1px solid rgba(216,176,122,0.22)"
            },
            left: {
                top: cornerSize,
                left: 0,
                bottom: cornerSize,
                width: edgeSize,
                cursor: "ew-resize",
                borderLeft:
                    "1px solid rgba(216,176,122,0.18)"
            },
            "top-left": {
                top: edgeOffset,
                left: edgeOffset,
                width: cornerSize,
                height: cornerSize,
                cursor: "nwse-resize",
                borderTop: "2px solid",
                borderLeft: "2px solid",
                borderTopLeftRadius:
                    isMobile
                        ? "10px"
                        : "12px",
                ...cornerAccent
            },
            "top-right": {
                top: edgeOffset,
                right: edgeOffset,
                width: cornerSize,
                height: cornerSize,
                cursor: "nesw-resize",
                borderTop: "2px solid",
                borderRight: "2px solid",
                borderTopRightRadius:
                    isMobile
                        ? "10px"
                        : "12px",
                ...cornerAccent
            },
            "bottom-left": {
                bottom: edgeOffset,
                left: edgeOffset,
                width: cornerSize,
                height: cornerSize,
                cursor: "nesw-resize",
                borderBottom: "2px solid",
                borderLeft: "2px solid",
                borderBottomLeftRadius:
                    isMobile
                        ? "10px"
                        : "12px",
                ...cornerAccent
            },
            "bottom-right": {
                bottom: edgeOffset,
                right: edgeOffset,
                width: cornerSize,
                height: cornerSize,
                cursor: "nwse-resize",
                borderBottom: "2px solid",
                borderRight: "2px solid",
                borderBottomRightRadius:
                    isMobile
                        ? "10px"
                        : "12px",
                background:
                    `
                    linear-gradient(
                        135deg,
                        transparent 0%,
                        transparent 48%,
                        rgba(216,176,122,0.12) 49%,
                        rgba(216,176,122,0.22) 100%
                    )
                    `,
                ...cornerAccent
            }
        };

        return {
            ...baseStyle,
            ...styles[direction]
        };
    }

    useEffect(() => {

        if (messagesRef.current) {

            messagesRef.current.scrollTop =
                messagesRef.current.scrollHeight;
        }

    }, [messages]);

    useEffect(() => {

        setEmbeddedChatBox(
            createEmbeddedChatBox()
        );

        setChatFrameSize(null);

    }, [
        isMobile,
        isTablet
    ]);

    useEffect(() => {

        if (
            !chatFrameRef.current ||
            typeof ResizeObserver === "undefined"
        ) {
            return undefined;
        }

        const observer =
            new ResizeObserver(
                ([entry]) => {

                    const nextWidth =
                        Math.round(
                            entry.contentRect.width
                        );

                    const nextHeight =
                        Math.round(
                            entry.contentRect.height
                        );

                    setEmbeddedChatBox(prev => {

                        if (
                            Math.abs(
                                prev.width -
                                    nextWidth
                            ) < 2 &&
                            Math.abs(
                                prev.height -
                                    nextHeight
                            ) < 2
                        ) {
                            return prev;
                        }

                        return {
                            width:
                                Math.max(
                                    isMobile ? 320 : 560,
                                    nextWidth
                                ),
                            height:
                                Math.max(
                                    isMobile ? 460 : 620,
                                    nextHeight
                                )
                        };
                    });
                }
            );

        observer.observe(
            chatFrameRef.current
        );

        return () => {

            observer.disconnect();
        };

    }, [
        isMobile
    ]);

    return (
        <main
            style={{
                minHeight: "100vh",
                width: "100%",
                maxWidth: "100vw",
                overflowX: "hidden",
                background:
                    "linear-gradient(to bottom, #050505 0%, #080603 48%, #050505 100%)",
                color: "white",
                position: "relative",
                fontFamily: FONT_IM_FELL
            }}
        >

            <motion.div
                animate={{
                    opacity: [0.08, 0.14, 0.08]
                }}
                transition={{
                    duration: 12,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
                style={{
                    position: "absolute",
                    top:
                        isMobile
                            ? "-110px"
                            : "-190px",
                    right:
                        isMobile
                            ? "-140px"
                            : "-260px",
                    width:
                        isMobile
                            ? "300px"
                            : isTablet
                                ? "520px"
                                : "760px",
                    height:
                        isMobile
                            ? "300px"
                            : isTablet
                                ? "520px"
                                : "760px",
                    borderRadius: "9999px",
                    background:
                        "rgba(255,140,0,0.10)",
                    filter:
                        isMobile
                            ? "blur(58px)"
                            : "blur(112px)",
                    pointerEvents: "none"
                }}
            />

            <section
                style={{
                    position: "relative",
                    zIndex: 2,
                    minHeight:
                        isMobile
                            ? "auto"
                            : isTablet
                                ? "64vh"
                                : "60vh",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    paddingTop:
                        isMobile
                            ? "max(92px, calc(78px + env(safe-area-inset-top, 0px)))"
                            : isTablet
                                ? "112px"
                                : "118px",
                    paddingBottom:
                        isMobile
                            ? "48px"
                            : isTablet
                                ? "62px"
                                : "66px",
                    paddingLeft: pagePaddingX,
                    paddingRight: pagePaddingX,
                    boxSizing: "border-box"
                }}
            >
                <div
                    style={{
                        width: "100%",
                        maxWidth: maxTextWidth,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap:
                            isMobile
                                ? "24px"
                                : "30px",
                        textAlign: "center"
                    }}
                >
                    <AnimatedInkText
                        as="h1"
                        style={heroTitleStyle}
                        text={translatedHeroTitle}
                    />

                    <AnimatedInkText
                        as="p"
                        style={heroSubtitleStyle}
                        text={translatedHeroSubtitle}
                    />
                </div>
            </section>

            <section
                style={{
                    position: "relative",
                    zIndex: 2,
                    paddingLeft: pagePaddingX,
                    paddingRight: pagePaddingX,
                    paddingBottom: sectionSpacing,
                    boxSizing: "border-box"
                }}
            >
                <img
                    src={foodMurzikImage}
                    alt={translatedProjectBannerAlt}
                    loading="eager"
                    decoding="async"
                    style={{
                        display: "block",
                        width: "100%",
                        maxWidth:
                            isMobile
                                ? "100%"
                                : "680px",
                        margin: "0 auto",
                        borderRadius:
                            isMobile
                                ? "22px"
                                : "30px",
                        boxShadow:
                            `
                            0 0 42px rgba(216,176,122,0.16),
                            0 0 100px rgba(255,140,0,0.08)
                            `
                    }}
                />
            </section>

            <section
                style={{
                    position: "relative",
                    zIndex: 2,
                    paddingLeft: pagePaddingX,
                    paddingRight: pagePaddingX,
                    paddingBottom: sectionSpacing,
                    boxSizing: "border-box",
                    display: "flex",
                    justifyContent: "center",
                    overflowX: "hidden"
                }}
            >
                <div
                    ref={chatFrameRef}
                    style={{
                        width:
                            chatFrameSize
                                ? `${chatFrameSize.width}px`
                                : isMobile
                                    ? "92%"
                                    : isTablet
                                        ? "min(92%, 760px)"
                                        : "min(88%, 960px)",
                        height:
                            chatFrameSize
                                ? `${chatFrameSize.height}px`
                                : isMobile
                                ? "64vh"
                                : isTablet
                                    ? "72vh"
                                    : "74vh",
                        minWidth:
                            isMobile
                                ? "min(100%, 344px)"
                                : "min(100%, 620px)",
                        minHeight:
                            isMobile
                                ? "520px"
                                : "620px",
                        maxWidth: "100%",
                        maxHeight:
                            isMobile
                                ? "78vh"
                                : "86vh",
                        resize: "both",
                        overflow: "auto",
                        borderRadius:
                            isMobile
                                ? "26px"
                                : "34px",
                        border:
                            "1px solid rgba(216,176,122,0.32)",
                        background:
                            `
                            linear-gradient(
                                180deg,
                                rgba(11,7,4,0.92),
                                rgba(5,3,2,0.96)
                            )
                            `,
                        boxShadow:
                            `
                            0 0 34px rgba(216,176,122,0.14),
                            0 0 90px rgba(255,140,0,0.08),
                            inset 0 0 24px rgba(216,176,122,0.04)
                            `,
                        padding:
                            isMobile
                                ? "12px"
                                : "16px",
                        boxSizing: "border-box",
                        position: "relative"
                    }}
                >
                    <ChatWindow
                        mode={mode}
                        setMode={setMode}
                        activeProject={activeProject}
                        setActiveProject={setActiveProject}
                        message={message}
                        setMessage={setMessage}
                        uploadedFile={uploadedFile}
                        setUploadedFile={setUploadedFile}
                        messages={messages}
                        messagesRef={messagesRef}
                        sendMessage={sendMessage}
                        clearMessages={clearMessages}
                        copyMessages={copyMessages}
                        downloadMessages={downloadMessages}
                        isThinking={isThinking}
                        isMobile={isChatMobile}
                        isTablet={isChatTablet}
                        chatBox={embeddedChatBox}
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
                        uploadEndpoint={FOOD_AI_UPLOAD_ENDPOINT}
                        uploadQuestion={
                            lastRequestLanguage === "ru"
                                ? "Проанализируй этот продукт по фото состава и ответь на русском языке."
                                : "Analyze this product from the ingredient label photo and reply in English."
                        }
                        uploadLanguage={
                            lastRequestLanguage === "ru"
                                ? "rus+eng"
                                : "eng"
                        }
                        onUploadResult={handleUploadResult}
                    />

                    {[
                        "top",
                        "right",
                        "bottom",
                        "left",
                        "top-left",
                        "top-right",
                        "bottom-left",
                        "bottom-right"
                    ].map((direction) => (
                        <div
                            key={direction}
                            aria-hidden="true"
                            onPointerDown={(event) =>
                                startChatFrameResize(
                                    event,
                                    direction
                                )
                            }
                            style={
                                getChatFrameResizeHandleStyle(
                                    direction
                                )
                            }
                        />
                    ))}
                </div>
            </section>

            <section
                style={{
                    position: "relative",
                    zIndex: 2,
                    paddingLeft: pagePaddingX,
                    paddingRight: pagePaddingX,
                    paddingBottom: sectionSpacing,
                    boxSizing: "border-box"
                }}
            >
                <div
                    style={{
                        maxWidth: maxTextWidth,
                        margin: "0 auto",
                        display: "flex",
                        flexDirection: "column",
                        gap:
                            isMobile
                                ? "54px"
                                : "48px"
                    }}
                >
                    {PROJECT_DESCRIPTION.map((section) => (
                        <div
                            key={section.title}
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                gap:
                                    isMobile
                                        ? "12px"
                                        : "14px",
                                textAlign: "center"
                            }}
                        >
                            <h2 style={smallHeadingStyle}>
                                <T>
                                    {section.title}
                                </T>
                            </h2>

                            <p style={paragraphStyle}>
                                <T>
                                    {section.text}
                                </T>
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            <section
                style={{
                    position: "relative",
                    zIndex: 2,
                    paddingLeft: pagePaddingX,
                    paddingRight: pagePaddingX,
                    paddingBottom: sectionSpacing,
                    boxSizing: "border-box"
                }}
            >
                <div
                    style={{
                        maxWidth: maxTextWidth,
                        margin: "0 auto",
                        display: "flex",
                        flexDirection: "column",
                        gap:
                            isMobile
                                ? "22px"
                                : "28px",
                        textAlign: "center"
                    }}
                >
                    <h2 style={smallHeadingStyle}>
                        <T>
                            Current Platform
                        </T>
                    </h2>

                    <p style={paragraphStyle}>
                        <T>
                            The current platform already includes a production-oriented AI infrastructure consisting of:
                        </T>
                    </p>

                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            gap:
                                isMobile
                                    ? "10px"
                                    : "12px",
                            color: TEXT,
                            fontFamily: FONT_IM_FELL,
                            fontSize:
                                isMobile
                                    ? "18px"
                                    : "21px",
                            lineHeight: 1.65,
                            textAlign: "center"
                        }}
                    >
                        {CURRENT_DEVELOPMENT_ITEMS.map((item) => (
                            <div
                                key={item}
                                style={{
                                    display: "flex",
                                    alignItems: "baseline",
                                    justifyContent: "center",
                                    gap: "10px",
                                    width: "100%"
                                }}
                            >
                                <span
                                    aria-hidden="true"
                                    style={{
                                        color: GOLD,
                                        flex: "0 0 auto"
                                    }}
                                >
                                    •
                                </span>

                                <T>
                                    {item}
                                </T>
                            </div>
                        ))}
                    </div>

                    <p style={paragraphStyle}>
                        <T>
                            The platform is designed as a scalable foundation for a fully integrated intelligent healthcare assistant, with future expansion toward multimodal health analysis, personalized nutrition and preventive health support.
                        </T>
                    </p>
                </div>
            </section>

            <Footer />

        </main>
    );
}
