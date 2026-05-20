import {
    useState
} from "react";

import {
    Link,
    useLocation
} from "react-router-dom";

import {
    createPortal
} from "react-dom";

import MurzikIntro from "../murzik/MurzikIntro";

export default function Navbar() {

    const location =
        useLocation();

    const [voiceEnabled, setVoiceEnabled] =
        useState(false);

    const isMobile =
        window.innerWidth <= 768;

    const isTablet =
        window.innerWidth > 768 &&
        window.innerWidth < 1200;

    function enableVoice() {

        if (
            !window.speechSynthesis
        ) {
            return;
        }

        const synth =
            window.speechSynthesis;

        synth.cancel();

        setVoiceEnabled(false);

        setTimeout(() => {

            setVoiceEnabled(true);

        }, 120);
    }

    function disableVoice() {

        if (
            window.speechSynthesis
        ) {

            window.speechSynthesis.cancel();

        }

        setVoiceEnabled(false);
    }

    return createPortal(

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

                    pointerEvents: "none",

                    paddingTop:
                        isMobile
                            ? "10px"
                            : "18px",

                    zIndex: 999999
                }}
            >

                <nav
                    style={{
                        pointerEvents: "all",

                        touchAction:
                            "manipulation",

                        display: "flex",

                        alignItems: "center",

                        justifyContent: "center",

                        gap:
                            isMobile
                                ? "6px"
                                : "14px",

                        flexWrap:
                            isMobile
                                ? "wrap"
                                : "nowrap",

                        width:
                            isMobile
                                ? "88vw"
                                : "fit-content",

                        maxWidth:
                            isMobile
                                ? "88vw"
                                : "95vw",

                        padding:
                            isMobile
                                ? "8px 10px"
                                : "14px 22px",

                        borderRadius:
                            isMobile
                                ? "18px"
                                : "24px",

                        background:
                            "rgba(10,10,10,0.72)",

                        backdropFilter:
                            isMobile
                                ? "blur(8px)"
                                : "blur(18px)",

                        WebkitBackdropFilter:
                            isMobile
                                ? "blur(8px)"
                                : "blur(18px)",

                        border:
                            "1px solid rgba(255,140,0,0.12)",

                        boxShadow:
                            isMobile
                                ? "0 0 20px rgba(255,140,0,0.05)"
                                : "0 0 50px rgba(255,140,0,0.08)",

                        boxSizing:
                            "border-box"
                    }}
                >

                    <NavButton
                        to="/"
                        text="HOME"
                        active={
                            location.pathname === "/"
                        }
                    />

                    <NavButton
                        to="/chat"
                        text="CHAT"
                        active={
                            location.pathname === "/chat"
                        }
                    />

                    <Divider />

                    <button
                        onClick={enableVoice}

                        style={{
                            ...buttonStyle,

                            background:
                                "linear-gradient(to bottom, rgba(255,140,0,0.18), rgba(255,140,0,0.08))",

                            border:
                                "1px solid rgba(255,140,0,0.16)",

                            color:
                                "#ffcf7a",

                            boxShadow:
                                isMobile
                                    ? "0 0 10px rgba(255,140,0,0.08)"
                                    : "0 0 25px rgba(255,140,0,0.12)"
                        }}
                    >
                        VOICE ON
                    </button>

                    <button
                        onClick={disableVoice}

                        style={{
                            ...buttonStyle,

                            background:
                                "linear-gradient(to bottom, rgba(255,60,60,0.25), rgba(255,20,20,0.08))",

                            border:
                                "1px solid rgba(255,60,60,0.20)",

                            color:
                                "#ffb0b0",

                            boxShadow:
                                isMobile
                                    ? "0 0 10px rgba(255,60,60,0.10)"
                                    : "0 0 25px rgba(255,60,60,0.16)"
                        }}
                    >
                        VOICE OFF
                    </button>

                </nav>

            </div>

        </>,

        document.getElementById(
            "navbar-root"
        )
    );
}

function NavButton({
    to,
    text,
    active
}) {

    const isMobile =
        window.innerWidth <= 768;

    return (
        <Link
            to={to}

            style={{
                ...buttonStyle,

                color:
                    active
                        ? "#ffcf7a"
                        : "#d8d8d8",

                textDecoration:
                    "none",

                display:
                    "flex",

                alignItems:
                    "center",

                justifyContent:
                    "center",

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
                                ? "0 0 10px rgba(255,140,0,0.08)"
                                : "0 0 25px rgba(255,140,0,0.12)"
                        )
                        : "none"
            }}
        >
            {text}
        </Link>
    );
}

function Divider() {

    const isMobile =
        window.innerWidth <= 768;

    return (
        <div
            style={{
                width: "1px",

                height:
                    isMobile
                        ? "16px"
                        : "22px",

                background:
                    "rgba(255,255,255,0.08)",

                flexShrink: 0
            }}
        />
    );
}

const buttonStyle = {

    height:
        window.innerWidth <= 768
            ? "26px"
            : "42px",

    paddingLeft:
        window.innerWidth <= 768
            ? "8px"
            : "18px",

    paddingRight:
        window.innerWidth <= 768
            ? "8px"
            : "18px",

    borderRadius:
        window.innerWidth <= 768
            ? "10px"
            : "14px",

    border:
        "1px solid rgba(255,255,255,0.04)",

    background:
        "rgba(255,255,255,0.02)",

    fontSize:
        window.innerWidth <= 768
            ? "7px"
            : "12px",

    fontWeight: "700",

    letterSpacing:
        window.innerWidth <= 768
            ? "0.06em"
            : "0.18em",

    cursor: "pointer",

    outline: "none",

    transition: "0.3s",

    fontFamily:
        "'Cinzel', serif",

    backdropFilter:
        window.innerWidth <= 768
            ? "blur(6px)"
            : "blur(10px)",

    WebkitBackdropFilter:
        window.innerWidth <= 768
            ? "blur(6px)"
            : "blur(10px)",

    flexShrink: 0
};