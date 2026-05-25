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

                    justifyContent: "flex-start",

                    minHeight: "100vh",

                    paddingTop:
                        isMobile
                            ? "95px"
                            : "130px",

                    paddingBottom:
                        isMobile
                            ? "40px"
                            : "40px",

                    paddingLeft:
                        isMobile
                            ? "16px"
                            : "40px",

                    paddingRight:
                        isMobile
                            ? "16px"
                            : "40px",

                    overflow: "hidden"
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

                {/* title */}
                <motion.div
                    initial={{
                        opacity: 0,
                        y: 30
                    }}
                    animate={{
                        opacity: 1,
                        y: 0
                    }}
                    transition={{
                        duration: 1
                    }}
                    style={{
                        position: "relative",

                        zIndex: 4,

                        textAlign: "center",

                        marginBottom:
                            isMobile
                                ? "20px"
                                : "10px",

                        maxWidth:
                            isMobile
                                ? "100%"
                                : "1100px"
                    }}
                >

                    <motion.div
                        animate={{
                            opacity: [0.82, 1, 0.82]
                        }}
                        transition={{
                            duration: 6,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                        style={{
                            color: "#d8b07a",

                            fontSize:
                                isMobile
                                    ? "15px"
                                    : isTablet
                                        ? "18px"
                                        : "22px",

                            lineHeight:
                                isMobile
                                    ? "1.7"
                                    : "2",

                            fontWeight: "700",

                            letterSpacing:
                                isMobile
                                    ? "0.14em"
                                    : "0.22em",

                            textTransform: "uppercase",

                            textShadow:
                                "0 0 10px rgba(255,180,120,0.10)",

                            marginBottom:
                                isMobile
                                    ? "18px"
                                    : "22px",

                            fontFamily:
                                "'Cinzel', serif"
                        }}
                    >
                        Murzik AI
                        <br />
                        Hybrid Intelligence Systems
                    </motion.div>

                    <div
                        style={{
                            color: "#c9aa82",

                            fontSize:
                                isMobile
                                    ? "16px"
                                    : isTablet
                                        ? "18px"
                                        : "24px",

                            lineHeight:
                                isMobile
                                    ? "1.8"
                                    : "1.9",

                            fontWeight: "500",

                            letterSpacing:
                                isMobile
                                    ? "0.01em"
                                    : "0.03em",

                            textShadow:
                                "0 0 8px rgba(255,180,120,0.05)",

                            maxWidth:
                                isMobile
                                    ? "100%"
                                    : "1000px",

                            margin: "0 auto"
                        }}
                    >
                        Multimodal intelligence systems powered by adaptive quantum-inspired layers, cognitive runtime architecture, visual analysis, voice interaction and scalable AI orchestration.
                    </div>

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
                                ? "10px"
                                : "40px"
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

                                    width:
                                        isMobile
                                            ? "100%"
                                            : "1150px",

                                    maxWidth: "100%",

                                    overflow: "visible"
                                }}
                            >

                                <img
                                    src={murzikImage}
                                    alt="Murzik AI"
                                    draggable={false}
                                    loading="eager"
                                    style={{
                                        position: "relative",

                                        width: "100%",

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

            </section>

            <FounderSection />

            <Footer />

        </main>
    );
}