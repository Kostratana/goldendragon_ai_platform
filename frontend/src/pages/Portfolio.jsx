import {
    Link
} from "react-router-dom";

import { motion } from "framer-motion";

import AnimatedInkText from "../components/AnimatedInkText";
import Footer from "../components/Footer";

import useFounderBreakpoints from "../hooks/useFounderBreakpoints";

import {
    T,
    useLanguage,
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

import dragonEyeVideo from "../assets/murzik/murzik-eyes.mp4";

const HERO_TITLE =
    "Selected AI Engineering Projects";

const HERO_SUBTITLE =
    "Explore a selection of AI systems, research projects and production platforms developed across computer vision, multimodal AI, enterprise AI, healthcare, optimization, autonomous systems and quantitative finance.";

const PROJECTS = [
    {
        title: "Enterprise Multimodal AI Platforms (NDA)",
        description:
            "Designed and developed two production-grade enterprise AI platforms under a non-disclosure agreement, taking ownership of the complete AI lifecycle from research and system architecture to production deployment and long-term platform support. The platforms integrated Large Language Models (LLMs), Retrieval-Augmented Generation (RAG), Computer Vision, OCR, intelligent document processing, AI agents, custom neural networks, benchmark development, model evaluation and scalable production inference pipelines. The work also included dataset engineering, synthetic data generation, model training, fine-tuning, optimization, deployment and continuous platform evolution.",
        technologies:
            "Python • PyTorch • LLMs • Computer Vision • OCR • RAG • AI Agents • Benchmarking • GPU Training • Production AI"
    },
    {
        title: "Marketplace AI Platform",
        description:
            "Designed and developed a production-oriented AI platform for marketplace analytics, workflow automation and intelligent business decision support. The system combined a modular Go backend with Python AI services to provide analytics, forecasting and automation for large-scale e-commerce operations. The project included AI agents for sales analytics, advertising optimization, inventory management, demand forecasting, customer review analysis, SEO optimization and intelligent recommendation pipelines.",
        technologies:
            "Go • Python • Google Gemini • AI Agents • REST API • n8n • Business Intelligence"
    },
    {
        title: "Bridge Infrastructure Inspection AI",
        description:
            "Developed a Computer Vision solution for automated bridge inspection and structural condition assessment using deep learning, object detection and image segmentation. The project focused on identifying structural defects, evaluating infrastructure condition and improving inspection efficiency. The work included dataset preparation, annotation pipelines, model training, benchmarking and optimization using industrial Computer Vision techniques.",
        technologies:
            "YOLO • U-Net • Mask R-CNN • PyTorch • Computer Vision • Image Segmentation"
    },
    {
        title: "Sports Performance AI",
        description:
            "Developed an AI-assisted sports performance analysis system for karate competition judging using Computer Vision, pose estimation and multimodal analysis. The platform combined movement recognition, temporal event detection and respiratory audio analysis to support objective performance evaluation and intelligent judging workflows.",
        technologies:
            "MediaPipe • YOLO • Pose Estimation • Audio AI • Computer Vision • Deep Learning"
    },
    {
        title: "Logistics Route Optimization AI",
        description:
            "Designed an intelligent decision-support system for logistics optimization, vehicle routing and truck loading under operational and capacity constraints. The solution combined Operations Research methods with optimization algorithms to improve delivery planning, fleet utilization, cargo allocation and transportation efficiency.",
        technologies:
            "Python • Operations Research • TSP • Hungarian Algorithm • Genetic Algorithms • Optimization"
    },
    {
        title: "Airport Security X-ray AI",
        description:
            "Developed a Computer Vision system for automated airport security screening using X-ray image analysis to detect prohibited objects and concealed threats. The project covered dataset engineering, image preprocessing, annotation, model training, evaluation and deployment of intelligent AI-assisted security inspection workflows.",
        technologies:
            "Computer Vision • X-ray Imaging • Deep Learning • Object Detection • Security AI"
    }
];

export default function Portfolio() {

    const {
        isMobile,
        isTablet
    } = useFounderBreakpoints();

    const {
        language
    } = useLanguage();

    const isRussian =
        language === "ru";

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
            ? "70px"
            : isTablet
                ? "92px"
                : "112px";

    const heroTitleLines =
        isRussian
            ? isMobile
                ? [
                    "Избранные",
                    "инженерные",
                    "ИИ-проекты"
                ]
                : [
                    "Избранные инженерные",
                    "ИИ-проекты"
                ]
            : null;

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
        textWrap: "balance",
        overflowWrap: "break-word",
        hyphens:
            isRussian
                ? "auto"
                : "manual",
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
        maxWidth: "820px",
        marginInline: "auto",
        textAlign: "center",
        textWrap: "pretty",
        overflowWrap: "break-word",
        hyphens:
            isRussian
                ? "auto"
                : "manual",
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
        textWrap: "balance",
        overflowWrap: "break-word",
        textShadow:
            "0 0 20px rgba(216,176,122,0.22)"
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
        maxWidth: "100%",
        textWrap: "pretty",
        overflowWrap: "break-word",
        hyphens:
            isRussian
                ? "auto"
                : "manual"
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
        textWrap: "balance",
        overflowWrap: "break-word",
        textShadow:
            "0 0 15px rgba(216,176,122,0.18)"
    };

    const technologiesStyle = {
        color: GOLD,
        fontFamily: FONT_IM_FELL,
        fontSize:
            isMobile
                ? "17px"
                : "19px",
        lineHeight: 1.65,
        letterSpacing: "0.02em",
        margin: 0,
        maxWidth: "100%",
        overflowWrap: "anywhere"
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
                        lines={heroTitleLines}
                    />

                    <AnimatedInkText
                        as="p"
                        style={heroSubtitleStyle}
                        text={translatedHeroSubtitle}
                    />
                </div>
            </section>

            <section
                style={{
                    position: "relative",
                    zIndex: 2,
                    paddingLeft: pagePaddingX,
                    paddingRight: pagePaddingX,
                    paddingBottom: sectionSpacing,
                    boxSizing: "border-box"
                }}
            >
                <div
                    style={{
                        maxWidth: maxTextWidth,
                        margin: "0 auto",
                        display: "flex",
                        flexDirection: "column",
                        gap:
                            isMobile
                                ? "54px"
                                : "68px"
                    }}
                >
                    {PROJECTS.map((project, index) => (
                        <article
                            key={project.title}
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                gap:
                                    isMobile
                                        ? "18px"
                                        : "22px",
                                textAlign: "center"
                            }}
                        >
                            <h2 style={smallHeadingStyle}>
                                <T>
                                    {project.title}
                                </T>
                            </h2>

                            <p style={paragraphStyle}>
                                <T>
                                    {project.description}
                                </T>
                            </p>

                            <div
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    gap:
                                        isMobile
                                            ? "8px"
                                            : "10px",
                                    marginTop:
                                        isMobile
                                            ? "2px"
                                            : "6px"
                                }}
                            >
                                <h3
                                    style={{
                                        ...smallHeadingStyle,
                                        fontSize:
                                            isMobile
                                                ? "16px"
                                                : "18px",
                                        letterSpacing: "0.06em",
                                        textTransform: "uppercase"
                                    }}
                                >
                                    <T>
                                        Technologies
                                    </T>
                                </h3>

                                <p style={technologiesStyle}>
                                    <T brand>
                                        {project.technologies}
                                    </T>
                                </p>
                            </div>

                            {index < PROJECTS.length - 1 && (
                                <div
                                    aria-hidden="true"
                                    style={{
                                        width:
                                            isMobile
                                                ? "92px"
                                                : "120px",
                                        height: "1px",
                                        marginTop:
                                            isMobile
                                                ? "30px"
                                                : "38px",
                                        background:
                                            "linear-gradient(to right, transparent, rgba(216,176,122,0.52), transparent)"
                                    }}
                                />
                            )}
                        </article>
                    ))}
                </div>
            </section>

            <section
                style={{
                    position: "relative",
                    zIndex: 2,
                    paddingLeft: pagePaddingX,
                    paddingRight: pagePaddingX,
                    paddingBottom:
                        isMobile
                            ? "70px"
                            : "94px",
                    boxSizing: "border-box"
                }}
            >
                <div
                    style={{
                        maxWidth: maxTextWidth,
                        margin: "0 auto",
                        display: "flex",
                        flexDirection: "column",
                        gap:
                            isMobile
                                ? "24px"
                                : "30px",
                        alignItems: "center",
                        textAlign: "center"
                    }}
                >
                    <h2 style={sectionTitleStyle}>
                        <T>
                            Interested in building a similar AI solution?
                        </T>
                    </h2>

                    <p style={paragraphStyle}>
                        <T>
                            Our team can help transform your idea into a production-ready AI system tailored to your business needs.
                        </T>
                    </p>

                    <Link
                        to="/chat"
                        aria-label="Open Dragon Chat"
                        style={{
                            display: "block",
                            width:
                                isMobile
                                    ? "112px"
                                    : isTablet
                                        ? "124px"
                                        : "136px",
                            maxWidth: "100%",
                            lineHeight: 0,
                            borderRadius: "50%",
                            overflow: "hidden",
                            background:
                                "linear-gradient(to bottom, rgba(34,18,10,0.90), rgba(16,8,4,0.94))",
                            filter:
                                "drop-shadow(0 0 24px rgba(216,176,122,0.18))"
                        }}
                    >
                        <video
                            src={dragonEyeVideo}
                            autoPlay
                            muted
                            loop
                            playsInline
                            preload="metadata"
                            style={{
                                display: "block",
                                width: "100%",
                                aspectRatio: "1 / 1",
                                objectFit: "cover",
                                borderRadius: "50%"
                            }}
                        />
                    </Link>

                    <Link
                        to="/chat"
                        style={{
                            color: GOLD,
                            fontFamily: FONT_CINZEL,
                            fontSize:
                                isMobile
                                    ? "18px"
                                    : "20px",
                            lineHeight: 1.45,
                            letterSpacing: "0.06em",
                            textTransform: "uppercase",
                            textDecoration: "underline",
                            textDecorationColor:
                                "rgba(216,176,122,0.42)",
                            textUnderlineOffset: "7px",
                            textShadow:
                                "0 0 16px rgba(216,176,122,0.18)"
                        }}
                    >
                        <T brand>
                            Talk to Dragon →
                        </T>
                    </Link>
                </div>
            </section>

            <Footer />

        </main>
    );
}
