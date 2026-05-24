import {
    useEffect,
    useState
} from "react";

import {
    Link,
    useLocation
} from "react-router-dom";

import MurzikIntro from "../murzik/MurzikIntro";

export default function Navbar() {

    const location =
        useLocation();

    const [voiceEnabled, setVoiceEnabled] =
        useState(false);

    const [screenWidth, setScreenWidth] =
        useState(window.innerWidth);

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

        document.body.style.margin =
            "0";

        document.body.style.padding =
            "0";

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

    function enableVoice() {

        if (
            !window.speechSynthesis
        ) {
            return;
        }

        window.speechSynthesis.cancel();

        setVoiceEnabled(false);

        setTimeout(() => {

            setVoiceEnabled(true);

        }, 100);
    }

    function disableVoice() {

        if (
            window.speechSynthesis
        ) {

            window.speechSynthesis.cancel();
        }

        setVoiceEnabled(false);
    }

    const isHomeActive =
        location.pathname === "/";

    const isChatActive =
        location.pathname.startsWith(
            "/chat"
        );

    return (
        <>
            <MurzikIntro
                enabled={voiceEnabled}
            />

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
                            : "18px",

                    paddingLeft:
                        isMobile
                            ? "10px"
                            : "20px",

                    paddingRight:
                        isMobile
                            ? "10px"
                            : "20px",

                    boxSizing:
                        "border-box",

                    zIndex: 999999,

                    pointerEvents: "none"
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
                            isMobile
                                ? "100%"
                                : "96vw",

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
                                    ? "10px"
                                    : "14px",

                        overflow: "hidden",

                        padding:
                            isMobile
                                ? "10px"
                                : isTablet
                                    ? "12px 16px"
                                    : "14px 22px",

                        borderRadius:
                            isMobile
                                ? "18px"
                                : "24px",

                        background:
                            "rgba(8,8,8,0.78)",

                        backdropFilter:
                            "blur(18px)",

                        WebkitBackdropFilter:
                            "blur(18px)",

                        border:
                            "1px solid rgba(255,140,0,0.12)",

                        boxShadow:
                            isMobile
                                ? "0 0 20px rgba(255,140,0,0.08)"
                                : "0 0 50px rgba(255,140,0,0.12)",

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

                    <Divider
                        isMobile={isMobile}
                    />

                    <button
                        onClick={enableVoice}

                        style={{
                            ...getButtonStyle(
                                isMobile,
                                isTablet
                            ),

                            color:
                                "#ffcf7a",

                            background:
                                "linear-gradient(to bottom, rgba(255,140,0,0.18), rgba(255,140,0,0.08))",

                            border:
                                "1px solid rgba(255,140,0,0.18)",

                            boxShadow:
                                isMobile
                                    ? "0 0 12px rgba(255,140,0,0.10)"
                                    : "0 0 24px rgba(255,140,0,0.14)"
                        }}
                    >
                        VOICE ON
                    </button>

                    <button
                        onClick={disableVoice}

                        style={{
                            ...getButtonStyle(
                                isMobile,
                                isTablet
                            ),

                            color:
                                "#ffb0b0",

                            background:
                                "linear-gradient(to bottom, rgba(255,60,60,0.20), rgba(255,20,20,0.08))",

                            border:
                                "1px solid rgba(255,60,60,0.18)",

                            boxShadow:
                                isMobile
                                    ? "0 0 12px rgba(255,60,60,0.10)"
                                    : "0 0 24px rgba(255,60,60,0.14)"
                        }}
                    >
                        VOICE OFF
                    </button>

                </nav>

            </div>

            <div
                style={{
                    paddingTop:
                        isMobile
                            ? "78px"
                            : "110px"
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

                color:
                    active
                        ? "#ffcf7a"
                        : "#d8d8d8",

                background:
                    active
                        ? "linear-gradient(to bottom, rgba(255,140,0,0.18), rgba(255,140,0,0.08))"
                        : "rgba(255,255,255,0.02)",

                border:
                    active
                        ? "1px solid rgba(255,140,0,0.16)"
                        : "1px solid rgba(255,255,255,0.04)",

                boxShadow:
                    active
                        ? (
                            isMobile
                                ? "0 0 12px rgba(255,140,0,0.08)"
                                : "0 0 24px rgba(255,140,0,0.12)"
                        )
                        : "none"
            }}
        >
            {text}
        </Link>
    );
}

function Divider({
    isMobile
}) {

    if (isMobile) {

        return null;
    }

    return (
        <div
            style={{
                width: "1px",

                height: "22px",

                background:
                    "rgba(255,255,255,0.08)",

                flexShrink: 0
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
                    ? "90px"
                    : "110px",

        height:
            isMobile
                ? "34px"
                : isTablet
                    ? "40px"
                    : "44px",

        paddingLeft:
            isMobile
                ? "10px"
                : "18px",

        paddingRight:
            isMobile
                ? "10px"
                : "18px",

        borderRadius:
            isMobile
                ? "12px"
                : "14px",

        border:
            "1px solid rgba(255,255,255,0.04)",

        background:
            "rgba(255,255,255,0.02)",

        fontSize:
            isMobile
                ? "10px"
                : isTablet
                    ? "11px"
                    : "12px",

        fontWeight: "700",

        letterSpacing:
            isMobile
                ? "0.08em"
                : "0.16em",

        whiteSpace: "nowrap",

        cursor: "pointer",

        outline: "none",

        transition:
            "all 0.25s ease",

        fontFamily:
            "'Cinzel', serif",

        backdropFilter:
            "blur(10px)",

        WebkitBackdropFilter:
            "blur(10px)",

        flexShrink: 0,

        userSelect: "none",

        WebkitTapHighlightColor:
            "transparent"
    };
}