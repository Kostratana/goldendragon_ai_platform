import {
    Link
} from "react-router-dom";

import { motion } from "framer-motion";

import AnimatedInkText from "../components/AnimatedInkText";
import Footer from "../components/Footer";

import useFounderBreakpoints from "../hooks/useFounderBreakpoints";

import {
    T,
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

const HERO_TITLE =
    "Research & Innovation Showcase";

const HERO_SUBTITLE =
    "Explore the proprietary AI technologies, intelligent systems and next-generation products currently being developed by Golden Dragon AI Studio.";

const INTRODUCTION_PARAGRAPHS = [
    "Golden Dragon AI Studio develops proprietary artificial intelligence solutions that combine advanced research, modern AI technologies and real-world engineering.",
    "This section presents our original AI products, intelligent assistants and industry-focused technologies currently under active development. Each solution demonstrates our engineering approach, system architecture and long-term product vision.",
    "Our technologies are designed both as commercial AI products and as flexible technology platforms that can be adapted to solve complex business challenges across multiple industries."
];

const AUDIENCE_SECTIONS = [
    {
        title: "For Clients",
        paragraphs: [
            "Our AI solutions demonstrate the technologies and engineering capabilities that can be customized for your organization.",
            "Depending on your business objectives, we can adapt existing platforms or develop completely new AI systems using the same architecture, including enterprise AI assistants, Computer Vision, multimodal AI, Retrieval-Augmented Generation (RAG), intelligent automation and custom machine learning models."
        ]
    },
    {
        title: "For Investors",
        paragraphs: [
            "Several projects presented in this showcase are being developed as long-term technology platforms with significant commercial potential.",
            "We welcome discussions with strategic partners and investors interested in supporting the development and global commercialization of next-generation AI products."
        ]
    }
];

const TECHNOLOGY_AREAS = [
    "Large Language Models (LLMs)",
    "AI Agents",
    "Computer Vision",
    "Multimodal AI",
    "Retrieval-Augmented Generation (RAG)",
    "OCR & Document Intelligence",
    "Machine Learning",
    "Deep Learning",
    "Reinforcement Learning",
    "Intelligent Automation",
    "Healthcare AI",
    "Enterprise AI Systems",
    "Quantitative Finance AI",
    "Robotics & Autonomous Systems",
    "Cloud AI Infrastructure"
];

const AVAILABLE_SOLUTIONS = [
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
        label: "Private Shopper AI",
        to: "/solutions/private-shopper"
    }
];

const INTELLECTUAL_PROPERTY_PARAGRAPHS = [
    "The AI technologies, software architectures, intelligent systems, concepts, algorithms, datasets, product designs and visual materials presented in this showcase represent proprietary developments of Golden Dragon AI Studio.",
    "These technologies demonstrate our research, engineering capabilities and long-term product vision for commercial AI systems and custom enterprise solutions."
];

export default function AISolutions() {

    const {
        isMobile,
        isTablet
    } = useFounderBreakpoints();

    const translatedHeroTitle =
        useTranslatedText(
            HERO_TITLE
        );

    const translatedHeroSubtitle =
        useTranslatedText(
            HERO_SUBTITLE
        );

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
            ? "68px"
            : isTablet
                ? "92px"
                : "112px";

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
        maxWidth: maxTextWidth,
        marginInline: "auto",
        textAlign: "center",
        textShadow:
            "0 0 16px rgba(216,176,122,0.16)"
    };

    const sectionTitleStyle = {
        color: GOLD,
        fontFamily: FONT_CINZEL_DECORATIVE,
        fontSize:
            isMobile
                ? "25px"
                : isTablet
                    ? "31px"
                    : "38px",
        fontWeight: "700",
        lineHeight: 1.25,
        letterSpacing:
            isMobile
                ? "0.03em"
                : "0.06em",
        margin: 0,
        textAlign: "center",
        textShadow:
            "0 0 20px rgba(216,176,122,0.22)"
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

    const sectionShellStyle = {
        position: "relative",
        zIndex: 2,
        paddingLeft: pagePaddingX,
        paddingRight: pagePaddingX,
        paddingBottom: sectionSpacing,
        boxSizing: "border-box"
    };

    const centeredFlowStyle = {
        maxWidth: maxTextWidth,
        margin: "0 auto",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap:
            isMobile
                ? "28px"
                : "36px",
        textAlign: "center"
    };

    const paragraphFlowStyle = {
        display: "flex",
        flexDirection: "column",
        gap:
            isMobile
                ? "18px"
                : "22px"
    };

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
                            : "82vh",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    paddingTop:
                        isMobile
                            ? "max(118px, calc(98px + env(safe-area-inset-top, 0px)))"
                            : isTablet
                                ? "142px"
                                : "158px",
                    paddingBottom:
                        isMobile
                            ? "72px"
                            : "98px",
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

            <section style={sectionShellStyle}>
                <div style={centeredFlowStyle}>
                    <h2 style={sectionTitleStyle}>
                        <T>
                            Building the Future of Intelligent AI Products
                        </T>
                    </h2>

                    <div style={paragraphFlowStyle}>
                        {INTRODUCTION_PARAGRAPHS.map((paragraph) => (
                            <p
                                key={paragraph}
                                style={paragraphStyle}
                            >
                                <T>
                                    {paragraph}
                                </T>
                            </p>
                        ))}
                    </div>
                </div>
            </section>

            <section style={sectionShellStyle}>
                <div
                    style={{
                        ...centeredFlowStyle,
                        gap:
                            isMobile
                                ? "48px"
                                : "62px"
                    }}
                >
                    {AUDIENCE_SECTIONS.map((section) => (
                        <article
                            key={section.title}
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                gap:
                                    isMobile
                                        ? "16px"
                                        : "20px",
                                textAlign: "center"
                            }}
                        >
                            <h2 style={smallHeadingStyle}>
                                <T>
                                    {section.title}
                                </T>
                            </h2>

                            <div style={paragraphFlowStyle}>
                                {section.paragraphs.map((paragraph) => (
                                    <p
                                        key={paragraph}
                                        style={paragraphStyle}
                                    >
                                        <T>
                                            {paragraph}
                                        </T>
                                    </p>
                                ))}
                            </div>
                        </article>
                    ))}
                </div>
            </section>

            <section style={sectionShellStyle}>
                <div style={centeredFlowStyle}>
                    <h2 style={sectionTitleStyle}>
                        <T>
                            Technology Areas
                        </T>
                    </h2>

                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            gap:
                                isMobile
                                    ? "10px"
                                    : "12px",
                            color: GOLD,
                            fontFamily: FONT_IM_FELL,
                            fontSize:
                                isMobile
                                    ? "17px"
                                    : isTablet
                                        ? "18px"
                                        : "20px",
                            lineHeight: 1.6,
                            letterSpacing: "0.02em",
                            textAlign: "center"
                        }}
                    >
                        {TECHNOLOGY_AREAS.map((area, index) => (
                            <span key={area}>
                                {index > 0 && (
                                    <span
                                        aria-hidden="true"
                                        style={{
                                            color:
                                                "rgba(216,176,122,0.42)",
                                            marginRight:
                                                isMobile
                                                    ? "9px"
                                                    : "12px"
                                        }}
                                    >
                                        •
                                    </span>
                                )}
                                <T>
                                    {area}
                                </T>
                            </span>
                        ))}
                    </div>
                </div>
            </section>

            <section style={sectionShellStyle}>
                <div style={centeredFlowStyle}>
                    <h2 style={sectionTitleStyle}>
                        <T>
                            Available Solutions
                        </T>
                    </h2>

                    <nav
                        aria-label="Available AI solutions"
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            gap:
                                isMobile
                                    ? "16px"
                                    : "18px",
                            fontFamily: FONT_CINZEL,
                            fontSize:
                                isMobile
                                    ? "18px"
                                    : isTablet
                                        ? "20px"
                                        : "22px",
                            lineHeight: 1.5,
                            letterSpacing: "0.04em",
                            textAlign: "center"
                        }}
                    >
                        {AVAILABLE_SOLUTIONS.map((solution) => (
                            <Link
                                key={solution.to}
                                to={solution.to}
                                style={{
                                    color: GOLD,
                                    textDecoration: "none",
                                    textShadow:
                                        "0 0 14px rgba(216,176,122,0.16)",
                                    transition:
                                        "color 180ms ease, text-shadow 180ms ease"
                                }}
                                onMouseEnter={(event) => {
                                    event.currentTarget.style.color =
                                        "#ffe2b2";
                                    event.currentTarget.style.textShadow =
                                        "0 0 22px rgba(216,176,122,0.34)";
                                }}
                                onMouseLeave={(event) => {
                                    event.currentTarget.style.color =
                                        GOLD;
                                    event.currentTarget.style.textShadow =
                                        "0 0 14px rgba(216,176,122,0.16)";
                                }}
                            >
                                <T>
                                    {solution.label}
                                </T>
                            </Link>
                        ))}
                    </nav>
                </div>
            </section>

            <section style={sectionShellStyle}>
                <div style={centeredFlowStyle}>
                    <h2 style={sectionTitleStyle}>
                        <T>
                            Intellectual Property
                        </T>
                    </h2>

                    <div style={paragraphFlowStyle}>
                        {INTELLECTUAL_PROPERTY_PARAGRAPHS.map((paragraph) => (
                            <p
                                key={paragraph}
                                style={paragraphStyle}
                            >
                                <T>
                                    {paragraph}
                                </T>
                            </p>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />

        </main>
    );
}
