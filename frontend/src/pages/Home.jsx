import { motion } from "framer-motion";

import FounderSection from "../components/FounderSection";
import Footer from "../components/Footer";

import useFounderBreakpoints from "../hooks/useFounderBreakpoints";

import murzikImage from "../assets/murzik/murzik-main.webp";

export default function Home() {

    const {
        isMobile,
        isTablet
    } = useFounderBreakpoints();

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
                            : isTablet
                                ? "-140px"
                                : "-180px",

                    top:
                        isMobile
                            ? "-100px"
                            : isTablet
                                ? "-140px"
                                : "-180px",

                    width:
                        isMobile
                            ? "240px"
                            : isTablet
                                ? "420px"
                                : "680px",

                    height:
                        isMobile
                            ? "240px"
                            : isTablet
                                ? "420px"
                                : "680px",

                    background:
                        "rgba(255,140,0,0.08)",

                    borderRadius: "9999px",

                    filter:
                        isMobile
                            ? "blur(40px)"
                            : isTablet
                                ? "blur(65px)"
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

                    justifyContent:
                        isMobile
                            ? "flex-start"
                            : isTablet
                                ? "flex-start"
                                : "center",

                    minHeight:
                        isMobile
                            ? "auto"
                            : isTablet
                                ? "auto"
                                : "100vh",

                    paddingTop:
                        isMobile
                            ? "max(86px, calc(76px + env(safe-area-inset-top, 0px)))"
                            : isTablet
                                ? "96px"
                                : "108px",

                    paddingBottom:
                        isMobile
                            ? "24px"
                            : isTablet
                                ? "32px"
                                : "40px",

                    paddingLeft:
                        isMobile
                            ? "max(16px, env(safe-area-inset-left, 0px))"
                            : isTablet
                                ? "28px"
                                : "40px",

                    paddingRight:
                        isMobile
                            ? "max(16px, env(safe-area-inset-right, 0px))"
                            : isTablet
                                ? "28px"
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
                                        : isTablet
                                            ? "2px"
                                            : "3px",

                                height:
                                    isMobile
                                        ? "2px"
                                        : isTablet
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

                {/* hero */}
                <div
                    style={{
                        position: "relative",

                        width: "100%",

                        display: "flex",

                        justifyContent: "center",

                        alignItems: "center"
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
                                    ? "360px"
                                    : isTablet
                                        ? "560px"
                                        : "820px",

                            height:
                                isMobile
                                    ? "360px"
                                    : isTablet
                                        ? "560px"
                                        : "820px",

                            background:
                                "rgba(255,140,0,0.08)",

                            borderRadius: "9999px",

                            filter:
                                isMobile
                                    ? "blur(50px)"
                                    : isTablet
                                        ? "blur(85px)"
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
                                y:
                                    isMobile
                                        ? [0, -4, 0]
                                        : isTablet
                                            ? [0, -5, 0]
                                            : [0, -6, 0]
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

                                    margin: "0 auto",

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
                                                : isTablet
                                                    ? "drop-shadow(0 0 55px rgba(255,140,0,0.13))"
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
                                                : isTablet
                                                    ? "-7%"
                                                    : "-10%",

                                        left:
                                            isMobile
                                                ? "0"
                                                : isTablet
                                                    ? "-4%"
                                                    : "-8%",

                                        width:
                                            isMobile
                                                ? "100%"
                                                : isTablet
                                                    ? "108%"
                                                    : "116%",

                                        height:
                                            isMobile
                                                ? "108%"
                                                : isTablet
                                                    ? "112%"
                                                    : "116%",

                                        objectFit: "cover",

                                        pointerEvents: "none",

                                        zIndex: 3,

                                        mixBlendMode: "screen",

                                        opacity:
                                            isMobile
                                                ? 0.28
                                                : isTablet
                                                    ? 0.4
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