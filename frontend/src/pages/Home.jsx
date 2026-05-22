import { motion } from "framer-motion";

import FounderSection from "../components/FounderSection";
import Footer from "../components/Footer";

import murzikImage from "../assets/murzik/murzik-main.png";

export default function Home() {

    const isMobile =
        window.innerWidth <= 768;

    const isTablet =
        window.innerWidth > 768 &&
        window.innerWidth < 1200;

    return (
        <main
            style={{
                minHeight: "100vh",

                background:
                    "linear-gradient(to bottom, #050505 0%, #080603 100%)",

                color: "white",

                overflowX: "hidden",

                position: "relative",

                fontFamily:
                    "'Cormorant Garamond', serif"
            }}
        >

            {/* ambient glow */}

            <motion.div
                animate={{
                    scale: [1, 1.04, 1],
                    opacity: [0.10, 0.20, 0.10]
                }}
                transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
                style={{
                    position: "absolute",

                    right:
                        isMobile
                            ? "-140px"
                            : "-260px",

                    top:
                        isMobile
                            ? "-120px"
                            : "-220px",

                    width:
                        isMobile
                            ? "320px"
                            : "900px",

                    height:
                        isMobile
                            ? "320px"
                            : "900px",

                    background:
                        "rgba(255,140,0,0.08)",

                    borderRadius: "9999px",

                    filter:
                        isMobile
                            ? "blur(80px)"
                            : "blur(200px)",

                    pointerEvents: "none"
                }}
            />

            {/* HERO */}

            <section
                style={{
                    position: "relative",

                    zIndex: 10,

                    display: "flex",

                    flexDirection: "column",

                    alignItems: "center",

                    justifyContent: "flex-start",

                    minHeight:
                        isMobile
                            ? "760px"
                            : "100vh",

                    paddingTop:
                        isMobile
                            ? "110px"
                            : "130px",

                    paddingBottom:
                        isMobile
                            ? "20px"
                            : "20px",

                    paddingLeft:
                        isMobile
                            ? "14px"
                            : "40px",

                    paddingRight:
                        isMobile
                            ? "14px"
                            : "40px",

                    overflow: "hidden"
                }}
            >

                {/* particles */}

                <div
                    style={{
                        position: "absolute",
                        inset: 0,
                        overflow: "hidden",
                        pointerEvents: "none"
                    }}
                >

                    {[...Array(
                        isMobile
                            ? 6
                            : 16
                    )].map((_, i) => (

                        <motion.div
                            key={i}
                            animate={{
                                y: [0, -1000],
                                opacity: [0, 0.4, 0],
                                x: [0, Math.random() * 60 - 30],
                                scale: [0.4, 1, 0.3]
                            }}
                            transition={{
                                duration: 12 + i,
                                repeat: Infinity,
                                ease: "linear",
                                delay: i * 0.45
                            }}
                            style={{
                                position: "absolute",

                                bottom: "-100px",

                                left: `${4 + i * 8}%`,

                                width:
                                    isMobile
                                        ? "2px"
                                        : "4px",

                                height:
                                    isMobile
                                        ? "2px"
                                        : "4px",

                                borderRadius: "9999px",

                                background:
                                    "rgba(255,180,120,0.35)",

                                filter: "blur(1px)"
                            }}
                        />

                    ))}

                </div>

                {/* text */}

                <motion.div
                    initial={{
                        opacity: 0,
                        y: 40
                    }}
                    animate={{
                        opacity: 1,
                        y: 0
                    }}
                    transition={{
                        duration: 1.2
                    }}
                    style={{
                        position: "relative",

                        zIndex: 4,

                        textAlign: "center",

                        marginBottom:
                            isMobile
                                ? "10px"
                                : "10px",

                        maxWidth:
                            isMobile
                                ? "100%"
                                : "1100px"
                    }}
                >

                    <motion.div
                        animate={{
                            opacity: [0.7, 1, 0.7]
                        }}
                        transition={{
                            duration: 5,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                        style={{
                            color: "#d8b07a",

                            fontSize:
                                isMobile
                                    ? "10px"
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
                                    ? "0.10em"
                                    : "0.22em",

                            textTransform: "uppercase",

                            textShadow:
                                "0 0 16px rgba(255,180,120,0.14)",

                            marginBottom:
                                isMobile
                                    ? "10px"
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
                                    ? "11px"
                                    : isTablet
                                        ? "18px"
                                        : "24px",

                            lineHeight:
                                isMobile
                                    ? "1.6"
                                    : "1.9",

                            fontWeight: "500",

                            letterSpacing:
                                isMobile
                                    ? "0.01em"
                                    : "0.03em",

                            textShadow:
                                "0 0 12px rgba(255,180,120,0.08)",

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

                {/* dragon area */}

                <div
                    style={{
                        position: "relative",

                        width: "100%",

                        display: "flex",

                        justifyContent: "center",

                        alignItems: "center",

                        marginTop:
                            isMobile
                                ? "0px"
                                : "40px"
                    }}
                >

                    {/* cinematic glow */}

                    <motion.div
                        animate={{
                            scale: [1, 1.05, 1],
                            opacity: [0.08, 0.14, 0.08]
                        }}
                        transition={{
                            duration: 8,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                        style={{
                            position: "absolute",

                            width:
                                isMobile
                                    ? "340px"
                                    : "1200px",

                            height:
                                isMobile
                                    ? "340px"
                                    : "1200px",

                            background:
                                "rgba(255,140,0,0.10)",

                            borderRadius: "9999px",

                            filter:
                                isMobile
                                    ? "blur(70px)"
                                    : "blur(190px)",

                            pointerEvents: "none"
                        }}
                    />

                    {/* murzik */}

                    <div
                        style={{
                            position: "relative",
                            zIndex: 3
                        }}
                    >

                        <motion.div
                            animate={{
                                scale: [1, 1.004, 1]
                            }}
                            transition={{
                                duration: 5,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                        >

                            <div
                                style={{
                                    position: "relative",

                                    width:
                                        isMobile
                                            ? "115%"
                                            : "1350px",

                                    maxWidth:
                                        isMobile
                                            ? "115%"
                                            : "100%",

                                    marginLeft:
                                        isMobile
                                            ? "-7%"
                                            : "0"
                                }}
                            >

                                {/* image */}

                                <img
                                    src={murzikImage}
                                    alt="Murzik AI"
                                    draggable={false}
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
                                                ? "drop-shadow(0 0 40px rgba(255,140,0,0.12))"
                                                : "drop-shadow(0 0 170px rgba(255,140,0,0.20))"
                                    }}
                                />

                                {/* smoke overlay */}

                                <video
                                    autoPlay
                                    muted
                                    loop
                                    playsInline
                                    preload="auto"
                                    style={{
                                        position: "absolute",

                                        inset: 0,

                                        width: "100%",

                                        height: "100%",

                                        objectFit: "cover",

                                        pointerEvents: "none",

                                        zIndex: 3,

                                        opacity:
                                            isMobile
                                                ? 0.45
                                                : 0.95
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