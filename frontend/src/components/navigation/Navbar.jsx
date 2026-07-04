import {
    useEffect,
    useRef,
    useState
} from "react";

import {
    Link,
    useLocation
} from "react-router-dom";

/*
All future AI products
must be added ONLY here.

Do not hardcode solution items
inside JSX.
*/
const SOLUTIONS_LINKS = [
    {
        label: "Golden Dragon Health AI",
        to: "/solutions/health-ai"
    },
    {
        label: "Animal Health Detection",
        to: "/solutions/animal-health"
    },
    {
        label: "Underwater AI",
        to: "/solutions/underwater-ai"
    },
    {
        label: "Whale Hunter AI",
        to: "/solutions/whale-hunter"
    },
    {
        label: "Sentinel AI",
        to: "/solutions/sentinel-ai"
    },
    {
        label: "Private Shopper AI",
        to: "/solutions/private-shopper"
    }
];

export default function Navbar() {

    const location =
        useLocation();

    const audioRef =
        useRef(null);

    const [screenWidth, setScreenWidth] =
        useState(window.innerWidth);

    const [isVoiceLoading, setIsVoiceLoading] =
        useState(false);

    const [solutionsOpen, setSolutionsOpen] =
        useState(false);

    const [voiceHovered, setVoiceHovered] =
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

            stopVoice();
        };

    }, []);

    const isMobile =
        screenWidth <= 768;

    const isTablet =
        screenWidth > 768 &&
        screenWidth <= 1200;

    function stopVoice() {

        if (audioRef.current) {

            audioRef.current.pause();

            audioRef.current.currentTime =
                0;
        }

        setIsVoiceLoading(false);
    }

    async function enableVoice() {

        try {

            if (!audioRef.current) {

                audioRef.current =
                    new Audio(
                        "/audio/audio_webside.wav"
                    );

                audioRef.current.preload =
                    "metadata";

                audioRef.current.volume =
                    1;

                audioRef.current.onended =
                    () => {

                        setIsVoiceLoading(false);
                    };

                audioRef.current.onerror =
                    (error) => {

                        console.error(
                            "Dragon audio error:",
                            error
                        );

                        setIsVoiceLoading(false);
                    };
            }

            if (isVoiceLoading) {

                stopVoice();

                return;
            }

            stopVoice();

            setIsVoiceLoading(true);

            audioRef.current.currentTime =
                0;

            await audioRef.current.play();

        } catch (error) {

            console.error(
                "Dragon audio runtime error:",
                error
            );

            setIsVoiceLoading(false);
        }
    }

    const pathname =
        location.pathname
            .toLowerCase()
            .replace(/\/+$/, "") || "/";

    const isHomeActive =
        pathname === "/";

    const isChatActive =
        pathname === "/chat" ||
        pathname.startsWith("/chat/");

    const isSolutionsActive =
        pathname === "/solutions" ||
        pathname.startsWith("/solutions/");

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

                    <SolutionsDropdown
                        active={isSolutionsActive}
                        isMobile={isMobile}
                        isTablet={isTablet}
                        pathname={pathname}
                        open={solutionsOpen}
                        onOpenChange={setSolutionsOpen}
                    />

                    <NavButton
                        to="/chat"
                        text="DRAGON CHAT"
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
                        type="button"
                        onClick={
                            isVoiceLoading
                                ? stopVoice
                                : enableVoice
                        }

                        onMouseEnter={() =>
                            setVoiceHovered(true)
                        }

                        onMouseLeave={() =>
                            setVoiceHovered(false)
                        }

                        aria-label={
                            isVoiceLoading
                                ? "Stop presentation audio"
                                : "Play presentation audio"
                        }

                        style={{

                            ...getButtonStyle(
                                isMobile,
                                isTablet
                            ),

                            minWidth:
                                isMobile
                                    ? "34px"
                                    : "40px",

                            paddingLeft: 0,

                            paddingRight: 0,

                            fontSize:
                                isMobile
                                    ? "16px"
                                    : "18px",

                            letterSpacing: 0,

                            lineHeight: 1,

                            transition:
                                "transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease",

                            transform:
                                voiceHovered
                                    ? "scale(1.08)"
                                    : "scale(1)",

                            color:
                                isVoiceLoading ||
                                voiceHovered
                                    ? "#ffe2b2"
                                    : "#8c8c8c",

                            background:
                                isVoiceLoading ||
                                voiceHovered
                                    ? `
                                    linear-gradient(
                                        to bottom,
                                        rgba(255,170,70,0.28),
                                        rgba(255,120,20,0.16)
                                    )
                                    `
                                    : "rgba(255,255,255,0.015)",

                            border:
                                isVoiceLoading ||
                                voiceHovered
                                    ? "1px solid rgba(255,190,90,0.22)"
                                    : "1px solid rgba(255,255,255,0.03)",

                            boxShadow:
                                isVoiceLoading ||
                                voiceHovered
                                    ? `
                                    0 0 34px rgba(255,140,0,0.28),
                                    inset 0 0 16px rgba(255,190,80,0.10)
                                    `
                                    : "none"
                        }}
                    >
                        {
                            isVoiceLoading
                                ? "⏹"
                                : "🎙"
                        }
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

function SolutionsDropdown({
    active,
    isMobile,
    isTablet,
    pathname,
    open,
    onOpenChange
}) {

    const containerRef =
        useRef(null);

    useEffect(() => {

        if (!open || !isMobile) {
            return;
        }

        function handleClickOutside(
            event
        ) {

            if (
                containerRef.current &&
                !containerRef.current.contains(
                    event.target
                )
            ) {

                onOpenChange(false);
            }
        }

        document.addEventListener(
            "mousedown",
            handleClickOutside
        );

        return () => {

            document.removeEventListener(
                "mousedown",
                handleClickOutside
            );
        };

    }, [open, isMobile, onOpenChange]);

    function handleMouseEnter() {

        if (!isMobile) {
            onOpenChange(true);
        }
    }

    function handleMouseLeave() {

        if (!isMobile) {
            onOpenChange(false);
        }
    }

    function handleTriggerClick() {

        if (isMobile) {
            onOpenChange(!open);
        }
    }

    return (

        <div
            ref={containerRef}

            style={{
                position: "relative",
                flexShrink: 0
            }}

            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >

            <style>
                {`
                    @keyframes navDropdownOpen {
                        from {
                            opacity: 0;
                            transform: translateX(-50%) translateY(-6px);
                        }
                        to {
                            opacity: 1;
                            transform: translateX(-50%) translateY(0);
                        }
                    }
                `}
            </style>

            <button
                type="button"
                onClick={handleTriggerClick}
                aria-expanded={open}
                aria-haspopup="menu"

                style={{

                    ...getButtonStyle(
                        isMobile,
                        isTablet
                    ),

                    display: "flex",

                    alignItems: "center",

                    justifyContent: "center",

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
                AI SOLUTIONS
                <ChevronDown
                    open={open}
                    active={active}
                />
            </button>

            {
                open && (
                    <div
                        role="menu"

                        style={{

                            position: "absolute",

                            top: "100%",

                            left: "50%",

                            transform:
                                "translateX(-50%)",

                            marginTop: "10px",

                            minWidth:
                                isMobile
                                    ? "240px"
                                    : "300px",

                            padding: "8px",

                            borderRadius: "12px",

                            background:
                                `
                                linear-gradient(
                                    to bottom,
                                    rgba(10,10,10,0.92),
                                    rgba(6,6,6,0.88)
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
                                0 0 60px rgba(255,140,0,0.08),
                                inset 0 0 18px rgba(255,140,0,0.03)
                                `,

                            zIndex: 999999,

                            animation:
                                "navDropdownOpen 200ms ease-out forwards"
                        }}
                    >

                        {
                            SOLUTIONS_LINKS.map(
                                ({
                                    label,
                                    to
                                }) => {

                                    const itemPath =
                                        to
                                            .toLowerCase()
                                            .replace(
                                                /\/+$/,
                                                ""
                                            );

                                    const itemActive =
                                        pathname === itemPath ||
                                        pathname.startsWith(
                                            itemPath + "/"
                                        );

                                    return (

                                        <SolutionMenuItem
                                            key={to}
                                            label={label}
                                            to={to}
                                            active={itemActive}
                                            isMobile={isMobile}
                                            onNavigate={() =>
                                                onOpenChange(false)
                                            }
                                        />
                                    );
                                }
                            )
                        }

                    </div>
                )
            }

        </div>
    );
}

function ChevronDown({
    open,
    active
}) {

    return (

        <svg
            width="10"
            height="10"
            viewBox="0 0 10 10"
            fill="none"
            aria-hidden="true"

            style={{

                marginLeft: "6px",

                flexShrink: 0,

                display: "block",

                transition:
                    "transform 200ms ease",

                transform:
                    open
                        ? "rotate(180deg)"
                        : "rotate(0deg)"
            }}
        >
            <path
                d="M2 3.5L5 6.5L8 3.5"
                stroke={
                    active
                        ? "#ffe2b2"
                        : "#c9a050"
                }
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}

function SolutionMenuItem({
    label,
    to,
    active,
    isMobile,
    onNavigate
}) {

    const [hovered, setHovered] =
        useState(false);

    return (

        <Link
            to={to}
            role="menuitem"

            onClick={onNavigate}

            onMouseEnter={() =>
                setHovered(true)
            }

            onMouseLeave={() =>
                setHovered(false)
            }

            style={{

                display: "block",

                padding:
                    isMobile
                        ? "8px 10px"
                        : "10px 14px",

                borderRadius: "8px",

                textDecoration:
                    "none",

                fontSize:
                    isMobile
                        ? "8px"
                        : "10px",

                fontWeight: "700",

                letterSpacing:
                    "0.08em",

                fontFamily:
                    "'Cinzel', serif",

                whiteSpace:
                    "nowrap",

                color:
                    active
                        ? "#ffe2b2"
                        : "#8c8c8c",

                background:
                    active
                        ? `
                        linear-gradient(
                            to bottom,
                            rgba(255,170,70,0.18),
                            rgba(255,120,20,0.10)
                        )
                        `
                        : hovered
                            ? `
                            linear-gradient(
                                to bottom,
                                rgba(255,170,70,0.12),
                                rgba(255,120,20,0.06)
                            )
                            `
                            : "transparent",

                border:
                    active
                        ? "1px solid rgba(255,170,70,0.14)"
                        : hovered
                            ? "1px solid rgba(255,170,70,0.10)"
                            : "1px solid transparent",

                boxShadow:
                    hovered
                        ? `
                        0 0 20px rgba(255,140,0,0.16),
                        inset 0 0 10px rgba(255,190,80,0.05)
                        `
                        : "none",

                transition:
                    "all 0.20s ease"
            }}
        >
            {label}
        </Link>
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