import {
    useEffect,
    useState
} from "react";

import {
    Link,
    useLocation
} from "react-router-dom";

export default function Navbar() {

    const location =
        useLocation();

    const [screenWidth, setScreenWidth] =
        useState(window.innerWidth);

    const [isVoiceLoading, setIsVoiceLoading] =
        useState(false);

    useEffect(() => {

        function handleResize() {

            setScreenWidth(
                window.innerWidth
            );
        }

        window.addEventListener(
            "resize",
            handleResize
        );

        document.documentElement.style.overflowX =
            "hidden";

        document.body.style.overflowX =
            "hidden";

        return () => {

            window.removeEventListener(
                "resize",
                handleResize
            );
        };

    }, []);

    const isMobile =
        screenWidth <= 768;

    const isTablet =
        screenWidth > 768 &&
        screenWidth <= 1200;

    async function enableVoice() {

        try {

            setIsVoiceLoading(true);

            /*
            STOP OLD AUDIO
            */

            const existingAudio =
                document.getElementById(
                    "murzik-navbar-audio"
                );

            if (existingAudio) {

                existingAudio.pause();

                existingAudio.remove();
            }

            const text = `
            Hello.

            I am Murzik.

            Personal AI business assistant
            of Svetlana Rumyantseva.

            I will guide you
            through the world
            of artificial intelligence.

            Please open the chat page
            to explore our AI systems,
            projects and multimodal platforms.
            `;

            /*
            OPENAI TTS
            */

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
                    "OpenAI voice request failed"
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

            audio.id =
                "murzik-navbar-audio";

            audio.volume =
                1;

            audio.onended = () => {

                URL.revokeObjectURL(
                    audioUrl
                );

                setIsVoiceLoading(false);
            };

            audio.onerror = () => {

                setIsVoiceLoading(false);
            };

            await audio.play();

        } catch (error) {

            console.error(
                "Murzik OpenAI voice error:",
                error
            );

            setIsVoiceLoading(false);
        }
    }

    function disableVoice() {

        const existingAudio =
            document.getElementById(
                "murzik-navbar-audio"
            );

        if (existingAudio) {

            existingAudio.pause();

            existingAudio.remove();
        }

        setIsVoiceLoading(false);
    }

    const pathname =
        location.pathname
            .toLowerCase()
            .replace(/\/+$/, "") || "/";

    /*
    FIX ACTIVE LOGIC
    */

    const isHomeActive =
        pathname === "/";

    const isChatActive =
        pathname.includes("/chat");

    return (

        <>
            <div
                style={{

                    position: "fixed",

                    top: 0,

                    left: 0,

                    width: "100%",

                    display: "flex",

                    justifyContent: "center",

                    alignItems: "flex-start",

                    paddingTop:
                        isMobile
                            ? "max(10px, env(safe-area-inset-top))"
                            : "16px",

                    paddingLeft:
                        isMobile
                            ? "10px"
                            : "18px",

                    paddingRight:
                        isMobile
                            ? "10px"
                            : "18px",

                    zIndex: 999999,

                    pointerEvents: "none",

                    boxSizing:
                        "border-box",

                    transform:
                        "translateZ(0)",

                    willChange:
                        "transform"
                }}
            >

                <nav
                    style={{

                        pointerEvents: "auto",

                        width:
                            isMobile
                                ? "100%"
                                : "fit-content",

                        maxWidth:
                            "96vw",

                        display: "flex",

                        alignItems: "center",

                        justifyContent: "center",

                        flexWrap:
                            isMobile
                                ? "wrap"
                                : "nowrap",

                        gap:
                            isMobile
                                ? "6px"
                                : isTablet
                                    ? "8px"
                                    : "10px",

                        padding:
                            isMobile
                                ? "8px"
                                : "10px 16px",

                        borderRadius:
                            isMobile
                                ? "16px"
                                : "20px",

                        background:
                            `
                            linear-gradient(
                                to bottom,
                                rgba(10,10,10,0.78),
                                rgba(6,6,6,0.66)
                            )
                            `,

                        border:
                            "1px solid rgba(255,140,0,0.08)",

                        backdropFilter:
                            "blur(16px)",

                        WebkitBackdropFilter:
                            "blur(16px)",

                        boxShadow:
                            `
                            0 0 40px rgba(255,140,0,0.08),
                            inset 0 0 18px rgba(255,140,0,0.03)
                            `,

                        overflow: "hidden",

                        boxSizing:
                            "border-box"
                    }}
                >

                    <NavButton
                        to="/"
                        text="HOME"
                        active={isHomeActive}
                        isMobile={isMobile}
                        isTablet={isTablet}
                    />

                    <NavButton
                        to="/chat"
                        text="CHAT"
                        active={isChatActive}
                        isMobile={isMobile}
                        isTablet={isTablet}
                    />

                    {
                        !isMobile && (
                            <Divider />
                        )
                    }

                    <button
                        onClick={enableVoice}

                        disabled={isVoiceLoading}

                        style={{

                            ...getButtonStyle(
                                isMobile,
                                isTablet
                            ),

                            color:
                                "#ffe2b2",

                            background:
                                `
                                linear-gradient(
                                    to bottom,
                                    rgba(255,170,70,0.20),
                                    rgba(255,120,20,0.12)
                                )
                                `,

                            border:
                                "1px solid rgba(255,190,90,0.16)",

                            boxShadow:
                                `
                                0 0 24px rgba(255,140,0,0.16)
                                `
                        }}
                    >

                        {
                            isVoiceLoading
                                ? "MURZIK..."
                                : "VOICE ON"
                        }

                    </button>

                    <button
                        onClick={disableVoice}

                        style={{

                            ...getButtonStyle(
                                isMobile,
                                isTablet
                            ),

                            color:
                                "#ff9a9a",

                            background:
                                "rgba(255,40,40,0.05)",

                            border:
                                "1px solid rgba(255,80,80,0.10)"
                        }}
                    >
                        VOICE OFF
                    </button>

                </nav>

            </div>

            <div
                style={{
                    height:
                        isMobile
                            ? "82px"
                            : "96px",

                    width: "100%"
                }}
            />
        </>
    );
}

function NavButton({
    to,
    text,
    active,
    isMobile,
    isTablet
}) {

    return (

        <Link
            to={to}

            style={{

                ...getButtonStyle(
                    isMobile,
                    isTablet
                ),

                textDecoration:
                    "none",

                display: "flex",

                alignItems: "center",

                justifyContent: "center",

                /*
                FIX ACTIVE VISUAL
                */

                color:
                    active
                        ? "#ffe2b2"
                        : "#8c8c8c",

                background:
                    active
                        ? `
                        linear-gradient(
                            to bottom,
                            rgba(255,170,70,0.22),
                            rgba(255,120,20,0.14)
                        )
                        `
                        : "rgba(255,255,255,0.015)",

                border:
                    active
                        ? "1px solid rgba(255,170,70,0.18)"
                        : "1px solid rgba(255,255,255,0.03)",

                boxShadow:
                    active
                        ? `
                        0 0 34px rgba(255,140,0,0.22),
                        inset 0 0 16px rgba(255,190,80,0.08)
                        `
                        : "none"
            }}
        >
            {text}
        </Link>
    );
}

function Divider() {

    return (
        <div
            style={{

                width: "1px",

                height: "20px",

                background:
                    "rgba(255,255,255,0.05)"
            }}
        />
    );
}

function getButtonStyle(
    isMobile,
    isTablet
) {

    return {

        minWidth:
            isMobile
                ? "74px"
                : isTablet
                    ? "88px"
                    : "104px",

        height:
            isMobile
                ? "34px"
                : "40px",

        paddingLeft:
            isMobile
                ? "10px"
                : "16px",

        paddingRight:
            isMobile
                ? "10px"
                : "16px",

        borderRadius:
            isMobile
                ? "11px"
                : "13px",

        fontSize:
            isMobile
                ? "9px"
                : "11px",

        fontWeight: "700",

        letterSpacing:
            "0.14em",

        whiteSpace: "nowrap",

        cursor: "pointer",

        outline: "none",

        transition:
            "all 0.20s ease",

        fontFamily:
            "'Cinzel', serif",

        backdropFilter:
            "blur(8px)",

        WebkitBackdropFilter:
            "blur(8px)",

        flexShrink: 0,

        userSelect: "none",

        WebkitTapHighlightColor:
            "transparent"
    };
}