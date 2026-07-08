import {
    useEffect,
    useLayoutEffect,
    useRef,
    useState
} from "react";

import {
    createPortal
} from "react-dom";

import {
    Link,
    useLocation
} from "react-router-dom";

import {
    useLanguage,
    T as Translate,
    BRAND_TERMS,
    SUPPORTED_LANGUAGES
} from "../../services/translation";

/*
Navigation translation policy:

• Translate normal user-facing labels (HOME, future nav items).
• Never translate brand or product names.
• Protected names live in BRAND_TERMS (Brand Registry).
• New AI products: add ONLY to SOLUTIONS_LINKS below.
  Each label must already exist in BRAND_TERMS.
*/

function T({
    children,
    brand = false,
    values = null,
    translate = true
}) {

    return (
        <Translate
            noTranslate={brand}
            translate={translate}
            values={values}
        >
            {children}
        </Translate>
    );
}

/*
All future AI products
must be added ONLY here.

Do not hardcode solution items
inside JSX.
*/
const SOLUTIONS_LINKS = [
    {
        label: "Health Support AI",
        to: "/solutions/health-support-ai"
    },
    {
        label: "Equine Health AI",
        to: "/solutions/animal-health"
    },
    {
        label: "Underwater Inspection AI",
        to: "/solutions/underwater-ai"
    },
    {
        label: "Quantum Trading AI",
        to: "/solutions/quantum-trading-ai"
    },
    {
        label: "Luxury Concierge AI",
        to: "/solutions/luxury-concierge-ai"
    }
];

const NAV_GOLD =
    "#d8b07a";

const NAV_GOLD_ACTIVE =
    "#ffe2b2";

const NAV_IDLE_BACKGROUND =
    "rgba(216,176,122,0.045)";

const NAV_IDLE_BORDER =
    "1px solid rgba(216,176,122,0.12)";

const NAV_IDLE_SHADOW =
    `
    0 0 18px rgba(216,176,122,0.09),
    inset 0 0 10px rgba(216,176,122,0.035)
    `;

if (
    import.meta.env.DEV
) {

    SOLUTIONS_LINKS.forEach(
        ({
            label
        }) => {

            if (
                !BRAND_TERMS.has(
                    label
                )
            ) {

                console.warn(
                    `Navbar: "${label}" is missing from BRAND_TERMS registry.`
                );
            }
        }
    );
}

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

    const [servicesOpen, setServicesOpen] =
        useState(false);

    const [languageOpen, setLanguageOpen] =
        useState(false);

    const [
        navbarPortalTarget,
        setNavbarPortalTarget
    ] = useState(null);

    const [voiceHovered, setVoiceHovered] =
        useState(false);

    const {
        language,
        setLanguage
    } = useLanguage();

    useLayoutEffect(() => {

        setNavbarPortalTarget(
            document.getElementById(
                "navbar-root"
            )
        );
    }, []);

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

    const isLanguageActive =
        languageOpen;

    const fixedNavbarBar = (
            <div
                className="gd-navbar-shell"
                style={{

                    position: "relative",

                    transform: "none",

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

                    pointerEvents: "none",

                    boxSizing:
                        "border-box",

                    willChange:
                        "auto"
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

                    <ServicesDropdown
                        isMobile={isMobile}
                        isTablet={isTablet}
                        open={servicesOpen}
                        onOpenChange={setServicesOpen}
                    />

                    <LanguageDropdown
                        active={isLanguageActive}
                        isMobile={isMobile}
                        isTablet={isTablet}
                        open={languageOpen}
                        currentLanguage={language}
                        onOpenChange={setLanguageOpen}
                        onLanguageChange={setLanguage}
                    />

                    <NavButton
                        to="/chat"
                        text="DRAGON CHAT"
                        brand
                        active={isChatActive}
                        isMobile={isMobile}
                        isTablet={isTablet}
                    />

                    <NavButton
                        to="/news"
                        text="NEWS"
                        active={pathname === "/news"}
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

                        data-no-translate

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
                                    ? NAV_GOLD_ACTIVE
                                    : NAV_GOLD,

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
                                    : NAV_IDLE_BACKGROUND,

                            border:
                                isVoiceLoading ||
                                voiceHovered
                                    ? "1px solid rgba(255,190,90,0.22)"
                                    : NAV_IDLE_BORDER,

                            boxShadow:
                                isVoiceLoading ||
                                voiceHovered
                                    ? `
                                    0 0 34px rgba(255,140,0,0.28),
                                    inset 0 0 16px rgba(255,190,80,0.10)
                                    `
                                    : NAV_IDLE_SHADOW
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
    );

    return (

        <>
            {
                navbarPortalTarget
                    ? createPortal(
                        fixedNavbarBar,
                        navbarPortalTarget
                    )
                    : null
            }

            <div
                style={{
                    height:
                        isMobile
                            ? "82px"
                            : isTablet
                                ? "90px"
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

            <div
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
                            ? NAV_GOLD_ACTIVE
                            : NAV_GOLD,

                    background:
                        active
                            ? `
                            linear-gradient(
                                to bottom,
                                rgba(255,170,70,0.22),
                                rgba(255,120,20,0.14)
                            )
                            `
                            : NAV_IDLE_BACKGROUND,

                    border:
                        active
                            ? "1px solid rgba(255,170,70,0.18)"
                            : NAV_IDLE_BORDER,

                    boxShadow:
                        active
                            ? `
                            0 0 34px rgba(255,140,0,0.22),
                            inset 0 0 16px rgba(255,190,80,0.08)
                            `
                            : NAV_IDLE_SHADOW
                }}
            >
                <Link
                    to="/solutions"
                    data-no-translate
                    onClick={() =>
                        onOpenChange(false)
                    }
                    style={{
                        color: "inherit",
                        textDecoration: "none"
                    }}
                >
                    AI SOLUTIONS
                </Link>

                <button
                    type="button"
                    onClick={handleTriggerClick}
                    aria-expanded={open}
                    aria-haspopup="menu"
                    aria-label="Open AI solutions menu"
                    data-no-translate

                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: "18px",
                        height: "100%",
                        padding: 0,
                        margin: 0,
                        border: "none",
                        background: "transparent",
                        color: "inherit",
                        cursor: "pointer",
                        outline: "none"
                    }}
                >
                <ChevronDown
                    open={open}
                    active={active}
                />
                </button>
            </div>

            {
                open && (
                    <div
                        style={{
                            position: "absolute",
                            top: "100%",
                            left: "50%",
                            transform:
                                "translateX(-50%)",
                            paddingTop: "10px",
                            minWidth:
                                isMobile
                                    ? "240px"
                                    : "300px",
                            zIndex: 999999
                        }}
                    >
                        <div
                            role="menu"

                            style={{

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
                    </div>
                )
            }

        </div>
    );
}

function LanguageDropdown({
    active,
    isMobile,
    isTablet,
    open,
    currentLanguage,
    onOpenChange,
    onLanguageChange
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

        onOpenChange(!open);
    }

    function handleLanguageSelect(
        code
    ) {

        onLanguageChange(code);

        onOpenChange(false);
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
                            ? NAV_GOLD_ACTIVE
                            : NAV_GOLD,

                    background:
                        active
                            ? `
                            linear-gradient(
                                to bottom,
                                rgba(255,170,70,0.22),
                                rgba(255,120,20,0.14)
                            )
                            `
                            : NAV_IDLE_BACKGROUND,

                    border:
                        active
                            ? "1px solid rgba(255,170,70,0.18)"
                            : NAV_IDLE_BORDER,

                    boxShadow:
                        active
                            ? `
                            0 0 34px rgba(255,140,0,0.22),
                            inset 0 0 16px rgba(255,190,80,0.08)
                            `
                            : NAV_IDLE_SHADOW
                }}
            >
                <span data-no-translate>
                    LANGUAGE
                </span>
                <ChevronDown
                    open={open}
                    active={active}
                />
            </button>

            {
                open && (
                    <div
                        style={{
                            position: "absolute",
                            top: "100%",
                            left: "50%",
                            transform:
                                "translateX(-50%)",
                            paddingTop: "10px",
                            minWidth:
                                isMobile
                                    ? "240px"
                                    : "300px",
                            zIndex: 999999
                        }}
                    >
                        <div
                            role="menu"

                            style={{

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

                                animation:
                                    "navDropdownOpen 200ms ease-out forwards"
                            }}
                        >

                        {
                            SUPPORTED_LANGUAGES.map(
                                ({
                                    code,
                                    nativeName,
                                    flag
                                }) => {

                                    const itemActive =
                                        currentLanguage ===
                                        code;

                                    return (

                                        <LanguageMenuItem
                                            key={code}
                                            label={nativeName}
                                            flag={flag}
                                            active={itemActive}
                                            isMobile={isMobile}
                                            onSelect={() =>
                                                handleLanguageSelect(
                                                    code
                                                )
                                            }
                                        />
                                    );
                                }
                            )
                        }

                        </div>
                    </div>
                )
            }

        </div>
    );
}

function ServicesDropdown({
    isMobile,
    isTablet,
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

        onOpenChange(!open);
    }

    return (

        <div
            ref={containerRef}

            style={{
                position: "relative",
                flexShrink: 0
            }}

        >

            <div
                style={{

                    ...getButtonStyle(
                        isMobile,
                        isTablet
                    ),

                    display: "flex",

                    alignItems: "center",

                    justifyContent: "center",

                    gap: "6px",

                    color:
                        open
                            ? NAV_GOLD_ACTIVE
                            : NAV_GOLD,

                    background:
                        open
                            ? `
                            linear-gradient(
                                to bottom,
                                rgba(255,170,70,0.22),
                                rgba(255,120,20,0.14)
                            )
                            `
                            : NAV_IDLE_BACKGROUND,

                    border:
                        open
                            ? "1px solid rgba(255,170,70,0.18)"
                            : NAV_IDLE_BORDER,

                    boxShadow:
                        open
                            ? `
                            0 0 34px rgba(255,140,0,0.22),
                            inset 0 0 16px rgba(255,190,80,0.08)
                            `
                            : NAV_IDLE_SHADOW
                }}
            >
                <Link
                    to="/services"
                    data-no-translate
                    style={{
                        color: "inherit",
                        textDecoration: "none"
                    }}
                >
                    SERVICES
                </Link>

                <button
                    type="button"
                    onClick={handleTriggerClick}
                    aria-expanded={open}
                    aria-haspopup="menu"
                    aria-label="Open services menu"
                    data-no-translate

                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: "18px",
                        height: "100%",
                        padding: 0,
                        margin: 0,
                        border: "none",
                        background: "transparent",
                        color: "inherit",
                        cursor: "pointer",
                        outline: "none"
                    }}
                >
                    <ChevronDown
                        open={open}
                        active={open}
                    />
                </button>
            </div>

            {
                open && (
                    <div
                        style={{
                            position: "absolute",
                            top: "100%",
                            left: "50%",
                            transform:
                                "translateX(-50%)",
                            paddingTop: "10px",
                            minWidth:
                                isMobile
                                    ? "180px"
                                    : "220px",
                            zIndex: 999999
                        }}
                    >
                        <div
                            role="menu"

                            style={{

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

                                animation:
                                    "navDropdownOpen 200ms ease-out forwards"
                            }}
                        >

                            <SolutionMenuItem
                                label="Portfolio"
                                to="/services/portfolio"
                                active={false}
                                isMobile={isMobile}
                                onNavigate={() =>
                                    onOpenChange(false)
                                }
                            />

                        </div>
                    </div>
                )
            }

        </div>
    );
}

function getDropdownMenuFontSize(
    isMobile
) {

    return isMobile
        ? "10px"
        : "11px";
}

function LanguageFlag({
    flag
}) {

    const shared = {
        width: "16",
        height: "11",
        viewBox: "0 0 16 11",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg",
        "aria-hidden": "true",
        style: {
            flexShrink: 0,
            display: "block",
            borderRadius: "2px",
            boxShadow:
                "0 0 0 1px rgba(255,255,255,0.08)"
        }
    };

    if (flag === "gb") {

        return (
            <svg {...shared}>
                <rect width="16" height="11" fill="#012169" />
                <path d="M0 0L16 11M16 0L0 11" stroke="#FFFFFF" strokeWidth="2.2" />
                <path d="M0 0L16 11M16 0L0 11" stroke="#C8102E" strokeWidth="1.1" />
                <path d="M8 0V11M0 5.5H16" stroke="#FFFFFF" strokeWidth="3.2" />
                <path d="M8 0V11M0 5.5H16" stroke="#C8102E" strokeWidth="1.8" />
            </svg>
        );
    }

    if (flag === "ru") {

        return (
            <svg {...shared}>
                <rect width="16" height="3.67" y="0" fill="#FFFFFF" />
                <rect width="16" height="3.67" y="3.67" fill="#0039A6" />
                <rect width="16" height="3.66" y="7.34" fill="#D52B1E" />
            </svg>
        );
    }

    if (flag === "es") {

        return (
            <svg {...shared}>
                <rect width="16" height="11" fill="#AA151B" />
                <rect width="16" height="5.5" y="2.75" fill="#F1BF00" />
            </svg>
        );
    }

    if (flag === "fr") {

        return (
            <svg {...shared}>
                <rect width="5.33" height="11" fill="#0055A4" />
                <rect width="5.34" height="11" x="5.33" fill="#FFFFFF" />
                <rect width="5.33" height="11" x="10.67" fill="#EF4135" />
            </svg>
        );
    }

    if (flag === "de") {

        return (
            <svg {...shared}>
                <rect width="16" height="3.67" y="0" fill="#000000" />
                <rect width="16" height="3.67" y="3.67" fill="#DD0000" />
                <rect width="16" height="3.66" y="7.34" fill="#FFCE00" />
            </svg>
        );
    }

    if (flag === "it") {

        return (
            <svg {...shared}>
                <rect width="5.33" height="11" fill="#009246" />
                <rect width="5.34" height="11" x="5.33" fill="#FFFFFF" />
                <rect width="5.33" height="11" x="10.67" fill="#CE2B37" />
            </svg>
        );
    }

    return null;
}

function LanguageMenuItem({
    label,
    flag,
    active,
    isMobile,
    onSelect
}) {

    const [hovered, setHovered] =
        useState(false);

    return (

        <button
            type="button"
            role="menuitem"
            data-no-translate

            onClick={onSelect}

            onMouseEnter={() =>
                setHovered(true)
            }

            onMouseLeave={() =>
                setHovered(false)
            }

            style={{

                display: "flex",

                alignItems: "center",

                gap: "8px",

                width: "100%",

                padding:
                    isMobile
                        ? "8px 10px"
                        : "10px 14px",

                borderRadius: "8px",

                textDecoration:
                    "none",

                fontSize:
                    getDropdownMenuFontSize(
                        isMobile
                    ),

                fontWeight: "700",

                letterSpacing:
                    "0.08em",

                fontFamily:
                    "'Cinzel Decorative', 'Cinzel', serif",

                whiteSpace:
                    "nowrap",

                color:
                    active
                        ? NAV_GOLD_ACTIVE
                        : NAV_GOLD,

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
                    hovered || active
                        ? `
                        0 0 20px rgba(255,140,0,0.16),
                        inset 0 0 10px rgba(255,190,80,0.05)
                        `
                        : "0 0 12px rgba(216,176,122,0.06)",

                transition:
                    "all 0.20s ease",

                cursor: "pointer",

                outline: "none",

                textAlign: "left"
            }}
        >
            <LanguageFlag flag={flag} />
            {label}
        </button>
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
                        ? NAV_GOLD_ACTIVE
                        : NAV_GOLD
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

    const MenuLink =
        to === "#"
            ? "a"
            : Link;

    const menuLinkProps =
        to === "#"
            ? {
                href: to
            }
            : {
                to
            };

    return (

        <MenuLink
            {...menuLinkProps}
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
                    getDropdownMenuFontSize(
                        isMobile
                    ),

                fontWeight: "700",

                letterSpacing:
                    "0.08em",

                fontFamily:
                    "'Cinzel Decorative', 'Cinzel', serif",

                whiteSpace:
                    "nowrap",

                color:
                    active
                        ? NAV_GOLD_ACTIVE
                        : NAV_GOLD,

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
                    hovered || active
                        ? `
                        0 0 20px rgba(255,140,0,0.16),
                        inset 0 0 10px rgba(255,190,80,0.05)
                        `
                        : "0 0 12px rgba(216,176,122,0.06)",

                transition:
                    "all 0.20s ease"
            }}
        >
            <T brand>{label}</T>
        </MenuLink>
    );
}

function NavButton({
    to,
    text,
    active,
    isMobile,
    isTablet,
    brand = false
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
                        ? NAV_GOLD_ACTIVE
                        : NAV_GOLD,

                background:
                    active
                        ? `
                        linear-gradient(
                            to bottom,
                            rgba(255,170,70,0.22),
                            rgba(255,120,20,0.14)
                        )
                        `
                        : NAV_IDLE_BACKGROUND,

                border:
                    active
                        ? "1px solid rgba(255,170,70,0.18)"
                        : NAV_IDLE_BORDER,

                boxShadow:
                    active
                        ? `
                        0 0 34px rgba(255,140,0,0.22),
                        inset 0 0 16px rgba(255,190,80,0.08)
                        `
                        : NAV_IDLE_SHADOW
            }}
        >
            <T brand={brand}>{text}</T>
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
            "'Cinzel Decorative', 'Cinzel', serif",

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
