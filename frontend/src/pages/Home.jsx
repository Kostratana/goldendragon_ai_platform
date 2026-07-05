import { motion } from "framer-motion";

import FounderSection from "../components/FounderSection";
import Footer from "../components/Footer";

import murzikImage from "../assets/murzik/murzik-main.webp";

export default function Home() {

    const isMobile =
        window.innerWidth <= 768;

    const isTablet =
        window.innerWidth > 768 &&
        window.innerWidth < 1200;

    const particles = [
        {
            left: "8%",
            duration: 14,
            delay: 0,
        },
        {
            left: "26%",
            duration: 16,
            delay: 1,
        },
        {
            left: "44%",
            duration: 18,
            delay: 2,
        },
        {
            left: "62%",
            duration: 15,
            delay: 1.5,
        },
    ];

    const heroBreathTransition = {
        duration: 20,
        repeat: Infinity,
        ease: "easeInOut"
    };

    const heroTitleBreath = {
        opacity: [0.40, 0.88, 0.40],
        textShadow: [
            "0 0 6px rgba(255,170,90,0.04)",
            "0 0 16px rgba(255,160,80,0.12)",
            "0 0 6px rgba(255,170,90,0.04)"
        ]
    };

    const heroSubtitleBreath = {
        opacity: [0.38, 0.75, 0.38],
        textShadow: [
            "0 0 4px rgba(255,170,90,0.03)",
            "0 0 10px rgba(255,160,80,0.08)",
            "0 0 4px rgba(255,170,90,0.03)"
        ]
    };

    return (
        <main
            style={{
                minHeight: "100vh",

                width: "100%",

                maxWidth: "100vw",

                overflowX: "hidden",

                background:
                    "linear-gradient(to bottom, #050505 0%, #080603 100%)",

                color: "white",

                position: "relative",

                fontFamily:
                    "'Cormorant Garamond', serif"
            }}
        >

            {/* optimized ambient glow */}
            <motion.div
                animate={{
                    opacity: [0.10, 0.16, 0.10]
                }}
                transition={{
                    duration: 12,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
                style={{
                    position: "absolute",

                    right:
                        isMobile
                            ? "-100px"
                            : "-180px",

                    top:
                        isMobile
                            ? "-100px"
                            : "-180px",

                    width:
                        isMobile
                            ? "240px"
                            : "680px",

                    height:
                        isMobile
                            ? "240px"
                            : "680px",

                    background:
                        "rgba(255,140,0,0.08)",

                    borderRadius: "9999px",

                    filter:
                        isMobile
                            ? "blur(40px)"
                            : "blur(90px)",

                    pointerEvents: "none"
                }}
            />

            <section
                style={{
                    position: "relative",

                    zIndex: 10,

                    display: "flex",

                    flexDirection: "column",

                    alignItems: "center",

                    justifyContent: "center",

                    minHeight: "100vh",

                    paddingTop:
                        isMobile
                            ? "max(86px, calc(76px + env(safe-area-inset-top, 0px)))"
                            : "108px",

                    paddingBottom:
                        isMobile
                            ? "40px"
                            : "40px",

                    paddingLeft:
                        isMobile
                            ? "max(16px, env(safe-area-inset-left, 0px))"
                            : "40px",

                    paddingRight:
                        isMobile
                            ? "max(16px, env(safe-area-inset-right, 0px))"
                            : "40px",

                    boxSizing: "border-box",

                    width: "100%",

                    overflowX: "hidden"
                }}
            >

                {/* optimized particles */}
                <div
                    style={{
                        position: "absolute",

                        inset: 0,

                        overflow: "hidden",

                        pointerEvents: "none"
                    }}
                >

                    {particles.map((particle, i) => (

                        <motion.div
                            key={i}
                            animate={{
                                y: [0, -900],
                                opacity: [0, 0.35, 0],
                            }}
                            transition={{
                                duration: particle.duration,
                                repeat: Infinity,
                                ease: "linear",
                                delay: particle.delay
                            }}
                            style={{
                                position: "absolute",

                                bottom: "-100px",

                                left: particle.left,

                                width:
                                    isMobile
                                        ? "2px"
                                        : "3px",

                                height:
                                    isMobile
                                        ? "2px"
                                        : "3px",

                                borderRadius: "9999px",

                                background:
                                    "rgba(255,180,120,0.28)"
                            }}
                        />

                    ))}

                </div>

                {/* hero composition */}
                <div
                    style={{
                        position: "relative",

                        zIndex: 4,

                        display: "flex",

                        flexDirection: "column",

                        alignItems: "center",

                        justifyContent: "center",

                        width: "100%",

                        flex: 1,

                        boxSizing: "border-box",

                        maxWidth: "100%"
                    }}
                >

                {/* title */}
                <motion.div
                    initial={{
                        opacity: 0
                    }}
                    animate={{
                        opacity: 1
                    }}
                    transition={{
                        duration: 1
                    }}
                    style={{
                        position: "relative",

                        textAlign: "center",

                        marginBottom:
                            isMobile
                                ? "10px"
                                : "8px",

                        maxWidth:
                            isMobile
                                ? "100%"
                                : "1100px",

                        width: "100%",

                        boxSizing: "border-box"
                    }}
                >

                    <motion.div
                        animate={heroTitleBreath}
                        transition={heroBreathTransition}
                        style={{
                            background:
                                "linear-gradient(to bottom, #dfc493 0%, #c9a866 42%, #9a7340 100%)",

                            WebkitBackgroundClip:
                                "text",

                            WebkitTextFillColor:
                                "transparent",

                            backgroundClip:
                                "text",

                            fontSize:
                                isMobile
                                    ? "24px"
                                    : isTablet
                                        ? "32px"
                                        : "40px",

                            lineHeight:
                                isMobile
                                    ? "1.5"
                                    : "1.45",

                            fontWeight: "800",

                            letterSpacing:
                                isMobile
                                    ? "0.11em"
                                    : isTablet
                                        ? "0.18em"
                                        : "0.22em",

                            textTransform: "uppercase",

                            marginBottom:
                                isMobile
                                    ? "16px"
                                    : "18px",

                            fontFamily:
                                "'Cinzel Decorative', 'Cinzel', serif"
                        }}
                    >
                        Golden Dragon AI Studio
                    </motion.div>

                    <motion.div
                        animate={heroSubtitleBreath}
                        transition={heroBreathTransition}
                        style={{
                            background:
                                "linear-gradient(to bottom, #d4bc96 0%, #c9aa82 52%, #b89868 100%)",

                            WebkitBackgroundClip:
                                "text",

                            WebkitTextFillColor:
                                "transparent",

                            backgroundClip:
                                "text",

                            fontSize:
                                isMobile
                                    ? "16px"
                                    : isTablet
                                        ? "18px"
                                        : "22px",

                            lineHeight:
                                isMobile
                                    ? "1.8"
                                    : "1.9",

                            fontWeight: "400",

                            letterSpacing:
                                isMobile
                                    ? "0.02em"
                                    : "0.04em",

                            maxWidth:
                                isMobile
                                    ? "100%"
                                    : isTablet
                                        ? "620px"
                                        : "820px",

                            margin: "0 auto",

                            fontFamily:
                                "'Cinzel', serif"
                        }}
                    >
                        Inspired by Ancient Wisdom,
                        <br />
                        Transforming Knowledge into Technology for a Better Life.
                    </motion.div>

                </motion.div>

                {/* hero */}
                <div
                    style={{
                        position: "relative",

                        width: "100%",

                        display: "flex",

                        justifyContent: "center",

                        alignItems: "center",

                        marginTop:
                            isMobile
                                ? "8px"
                                : "22px"
                    }}
                >

                    {/* optimized glow */}
                    <motion.div
                        animate={{
                            opacity: [0.08, 0.12, 0.08]
                        }}
                        transition={{
                            duration: 10,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                        style={{
                            position: "absolute",

                            width:
                                isMobile
                                    ? "320px"
                                    : "820px",

                            height:
                                isMobile
                                    ? "320px"
                                    : "820px",

                            background:
                                "rgba(255,140,0,0.08)",

                            borderRadius: "9999px",

                            filter:
                                isMobile
                                    ? "blur(50px)"
                                    : "blur(120px)",

                            pointerEvents: "none"
                        }}
                    />

                    <div
                        style={{
                            position: "relative",

                            zIndex: 3,

                            width: "100%",

                            display: "flex",

                            justifyContent: "center"
                        }}
                    >

                        <motion.div
                            animate={{
                                y: [0, -6, 0]
                            }}
                            transition={{
                                duration: 7,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                        >

                            <div
                                style={{
                                    position: "relative",

                                    width: "100%",

                                    maxWidth: "1150px",

                                    boxSizing: "border-box",

                                    overflow: "visible"
                                }}
                            >

                                <img
                                    src={murzikImage}
                                    alt="Golden Dragon AI Studio"
                                    draggable={false}
                                    loading="eager"
                                    style={{
                                        position: "relative",

                                        width: "100%",

                                        height: "auto",

                                        maxWidth: "100%",

                                        objectFit: "contain",

                                        display: "block",

                                        userSelect: "none",

                                        pointerEvents: "none",

                                        zIndex: 1,

                                        filter:
                                            isMobile
                                                ? "drop-shadow(0 0 28px rgba(255,140,0,0.10))"
                                                : "drop-shadow(0 0 90px rgba(255,140,0,0.16))"
                                    }}
                                />

                                <video
                                    autoPlay
                                    muted
                                    loop
                                    playsInline
                                    preload="metadata"
                                    style={{
                                        position: "absolute",

                                        top:
                                            isMobile
                                                ? "-4%"
                                                : "-10%",

                                        left:
                                            isMobile
                                                ? "0"
                                                : "-8%",

                                        width:
                                            isMobile
                                                ? "100%"
                                                : "116%",

                                        height:
                                            isMobile
                                                ? "108%"
                                                : "116%",

                                        objectFit: "cover",

                                        pointerEvents: "none",

                                        zIndex: 3,

                                        mixBlendMode: "screen",

                                        opacity:
                                            isMobile
                                                ? 0.22
                                                : 0.52,

                                        filter:
                                            "brightness(1.08)"
                                    }}
                                >
                                    <source
                                        src="/videos/murzik-smoke-v2.mp4"
                                        type="video/mp4"
                                    />
                                </video>

                            </div>

                        </motion.div>

                    </div>

                </div>

                </div>

            </section>

            <FounderSection />

            <Footer />

        </main>
    );
}