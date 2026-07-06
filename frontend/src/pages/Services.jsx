import {
    Link
} from "react-router-dom";

import { motion } from "framer-motion";

import AnimatedInkText from "../components/AnimatedInkText";
import Footer from "../components/Footer";

import useFounderBreakpoints from "../hooks/useFounderBreakpoints";

import {
    CONTACT_LINKS
} from "../constants/links";

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

import dragonEyeVideo from "../assets/murzik/murzik-eyes.mp4";

const HERO_TITLE =
    "What Can We Do for You?";

const HERO_SUBTITLE =
    "We develop modern AI solutions for businesses — from research and concept design to production-ready intelligent systems.";

const SERVICE_GROUPS = [
    {
        title: "AI Strategy & Consulting",
        description:
            "We help companies understand where AI creates real value, define priorities and turn ambitious ideas into a clear implementation path.",
        included: [
            "AI Consulting",
            "AI Roadmaps",
            "AI MVP Development",
            "Business Process Automation"
        ]
    },
    {
        title: "AI Development",
        description:
            "We design, build and train intelligent systems tailored to your product, data and business processes.",
        included: [
            "Custom AI Models",
            "Machine Learning Models",
            "Fine-Tuning Existing Models",
            "Training Models on Custom Datasets",
            "Training AI Models from Scratch",
            "Custom Neural Network Architectures"
        ]
    },
    {
        title: "LLM & Generative AI",
        description:
            "We integrate language models, knowledge bases and generative tools into practical business workflows.",
        included: [
            "RAG Systems",
            "LLM Integration",
            "Enterprise Knowledge Bases",
            "Generative AI",
            "AI Agents & Multi-Agent Systems"
        ]
    },
    {
        title: "Computer Vision",
        description:
            "We build visual intelligence for image analysis, object detection, monitoring, classification and quality control.",
        included: [
            "Computer Vision",
            "Data Analytics",
            "Recommendation Systems",
            "Anomaly Detection"
        ]
    },
    {
        title: "AI Evaluation & Benchmarking",
        description:
            "We define quality standards, evaluate model behavior and create reliable benchmarks for technical decisions.",
        included: [
            "Benchmark Development",
            "AI Evaluation",
            "ML Metrics",
            "Predictive Analytics"
        ]
    },
    {
        title: "Research & Enterprise AI",
        description:
            "We prototype advanced architectures, explore experimental ideas and prepare scalable AI systems for long-term enterprise use.",
        included: [
            "Research & Development (R&D)",
            "Enterprise AI Integration",
            "Custom AI Development",
            "Enterprise Knowledge Bases"
        ]
    }
];

const WORK_STEPS = [
    {
        title: "Requirements Analysis",
        description:
            "We clarify the business goal, technical constraints, data sources and expected result."
    },
    {
        title: "Solution Architecture",
        description:
            "We define the AI system structure, integrations, data flow and development roadmap."
    },
    {
        title: "AI Development",
        description:
            "We build the core intelligence, interfaces and automation logic required for the product."
    },
    {
        title: "Model Training",
        description:
            "We prepare data, train or fine-tune models and align them with the target use case."
    },
    {
        title: "Evaluation & Benchmarking",
        description:
            "We test model quality with benchmarks, metrics and practical performance checks."
    },
    {
        title: "Deployment",
        description:
            "We prepare the solution for real users, production environments and business workflows."
    },
    {
        title: "Support & Future Development",
        description:
            "We continue improving the system as your data, users and goals evolve."
    }
];

const WHY_ITEMS = [
    "Tailor-made AI solutions",
    "Full-cycle AI development",
    "Custom AI models",
    "Training on customer datasets",
    "Benchmarking & evaluation",
    "Modern AI technologies",
    "Scalable architectures",
    "Long-term technical support"
];

export default function Services() {

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
            ? "70px"
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
        maxWidth: "820px",
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
        textAlign:
            "center",
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
        margin: 0
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
                                ? "30px"
                                : "38px"
                    }}
                >
                    <h2 style={sectionTitleStyle}>
                        <T>
                            Our Help for Your Business
                        </T>
                    </h2>

                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            gap:
                                isMobile
                                    ? "18px"
                                    : "22px"
                        }}
                    >
                        <p style={paragraphStyle}>
                            <T>
                                We help companies implement artificial intelligence, automate business processes and build intelligent products that increase efficiency, reduce costs and create new business opportunities.
                            </T>
                        </p>

                        <p style={paragraphStyle}>
                            <T>
                                Choose the direction that best matches your business needs.
                            </T>
                        </p>
                    </div>

                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            gap:
                                isMobile
                                    ? "8px"
                                    : "10px",
                            color: GOLD,
                            fontFamily: FONT_CINZEL,
                            fontSize:
                                isMobile
                                    ? "16px"
                                    : "17px",
                            lineHeight: 1.7,
                            letterSpacing: "0.03em",
                            textAlign: "center"
                        }}
                    >
                        {SERVICE_GROUPS.map((service) => (
                            <span key={service.title}>
                                <T>{service.title}</T>
                            </span>
                        ))}
                    </div>
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
                    {SERVICE_GROUPS.map((service) => (
                        <article
                            key={service.title}
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
                                    {service.title}
                                </T>
                            </h2>

                            <p style={paragraphStyle}>
                                <T>
                                    {service.description}
                                </T>
                            </p>

                            <div
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    gap:
                                        isMobile
                                            ? "8px"
                                            : "10px",
                                    marginTop:
                                        isMobile
                                            ? "4px"
                                            : "8px",
                                    color: GOLD,
                                    fontFamily: FONT_IM_FELL,
                                    fontSize:
                                        isMobile
                                            ? "17px"
                                            : "19px",
                                    lineHeight: 1.65,
                                    letterSpacing: "0.02em"
                                }}
                            >
                                <span
                                    style={{
                                        color: TEXT,
                                        opacity: 0.82
                                    }}
                                >
                                    <T>
                                        Included:
                                    </T>
                                </span>

                                {service.included.map((item) => (
                                    <span key={item}>
                                        <T>
                                            {item}
                                        </T>
                                    </span>
                                ))}
                            </div>
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
                                ? "30px"
                                : "40px"
                    }}
                >
                    <h2 style={sectionTitleStyle}>
                        <T>
                            How We Work
                        </T>
                    </h2>

                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            gap:
                                isMobile
                                    ? "12px"
                                    : "14px",
                            textAlign: "center"
                        }}
                    >
                        {WORK_STEPS.map((step, index) => (
                            <div
                                key={step.title}
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    gap:
                                        isMobile
                                            ? "10px"
                                            : "12px"
                                }}
                            >
                                <div
                                    style={{
                                        display: "flex",
                                        flexDirection: "column",
                                        alignItems: "center",
                                        gap:
                                            isMobile
                                                ? "8px"
                                                : "10px"
                                    }}
                                >
                                    <h3 style={smallHeadingStyle}>
                                        <T>
                                            {step.title}
                                        </T>
                                    </h3>

                                    <p
                                        style={{
                                            ...paragraphStyle,
                                            maxWidth: "640px"
                                        }}
                                    >
                                        <T>
                                            {step.description}
                                        </T>
                                    </p>
                                </div>

                                {index < WORK_STEPS.length - 1 && (
                                    <span
                                        aria-hidden="true"
                                        style={{
                                            color: GOLD,
                                            fontFamily: FONT_CINZEL,
                                            fontSize:
                                                isMobile
                                                    ? "18px"
                                                    : "20px",
                                            opacity: 0.72,
                                            lineHeight: 1
                                        }}
                                    >
                                        ↓
                                    </span>
                                )}
                            </div>
                        ))}
                    </div>
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
                                ? "30px"
                                : "40px"
                    }}
                >
                    <h2 style={sectionTitleStyle}>
                        <T>
                            Why Golden Dragon AI Studio
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
                            color: TEXT,
                            fontFamily: FONT_IM_FELL,
                            fontSize:
                                isMobile
                                    ? "18px"
                                    : "21px",
                            lineHeight: 1.65,
                            textAlign: "center"
                        }}
                    >
                        {WHY_ITEMS.map((item) => (
                            <div
                                key={item}
                                style={{
                                    display: "flex",
                                    alignItems: "baseline",
                                    justifyContent: "center",
                                    gap: "10px",
                                    width: "100%"
                                }}
                            >
                                <span
                                    aria-hidden="true"
                                    style={{
                                        color: GOLD,
                                        flex: "0 0 auto"
                                    }}
                                >
                                    •
                                </span>

                                <T>
                                    {item}
                                </T>
                            </div>
                        ))}
                    </div>
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
                                ? "22px"
                                : "28px"
                    }}
                >
                    <h2 style={sectionTitleStyle}>
                        <T>
                            Start Your Project
                        </T>
                    </h2>

                    <p style={paragraphStyle}>
                        <T>
                            Tell us about your task.
                        </T>
                    </p>

                    <p style={paragraphStyle}>
                        <T>
                            We will help you define the optimal AI solution, prepare a project concept and choose the most effective implementation path.
                        </T>
                    </p>
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
                                ? "46px"
                                : "58px",
                        alignItems: "center",
                        textAlign: "center"
                    }}
                >
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            gap:
                                isMobile
                                    ? "10px"
                                    : "12px"
                        }}
                    >
                        <h2
                            style={{
                                ...smallHeadingStyle,
                                fontSize:
                                    isMobile
                                        ? "20px"
                                        : "22px"
                            }}
                        >
                            <T>
                                Email
                            </T>
                        </h2>

                        <a
                            href={CONTACT_LINKS.EMAIL}
                            target="_blank"
                            rel="noopener noreferrer"
                            data-no-translate
                            style={{
                                color: GOLD,
                                fontFamily: FONT_IM_FELL,
                                fontSize:
                                    isMobile
                                        ? "18px"
                                        : "20px",
                                lineHeight: 1.55,
                                letterSpacing: "0.02em",
                                textDecoration:
                                    "underline",
                                textDecorationColor:
                                    "rgba(216,176,122,0.42)",
                                textUnderlineOffset:
                                    "6px",
                                overflowWrap: "anywhere"
                            }}
                        >
                            srumyantseva7@gmail.com
                        </a>
                    </div>

                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            gap:
                                isMobile
                                    ? "14px"
                                    : "18px",
                            textAlign: "center",
                            maxWidth: "560px"
                        }}
                    >
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
                                border:
                                    "1px solid rgba(255,220,170,0.06)",
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

                        <h2
                            style={{
                                ...sectionTitleStyle,
                                fontSize:
                                    isMobile
                                        ? "24px"
                                        : isTablet
                                            ? "28px"
                                            : "32px",
                                textAlign: "center"
                            }}
                        >
                            <T brand>
                                Dragon Chat
                            </T>
                        </h2>

                        <p
                            style={{
                                ...paragraphStyle,
                                maxWidth: "500px"
                            }}
                        >
                            <T>
                                Describe your project and Dragon will help you find the best AI solution.
                            </T>
                        </p>
                    </div>
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
                                ? "22px"
                                : "28px"
                    }}
                >
                    <h2 style={sectionTitleStyle}>
                        <T>
                            Documents
                        </T>
                    </h2>

                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            gap:
                                isMobile
                                    ? "12px"
                                    : "14px",
                            alignItems: "center",
                            textAlign: "center"
                        }}
                    >
                        <a
                            href="#"
                            style={documentLinkStyle(isMobile)}
                        >
                            <span aria-hidden="true">
                                •
                            </span>
                            {" "}
                            <T>
                                Service Agreement
                            </T>
                        </a>

                        <a
                            href="#"
                            style={documentLinkStyle(isMobile)}
                        >
                            <span aria-hidden="true">
                                •
                            </span>
                            {" "}
                            <T brand>
                                NDA
                            </T>
                        </a>
                    </div>
                </div>
            </section>

            <Footer />

        </main>
    );
}

function documentLinkStyle(
    isMobile
) {

    return {
        color: GOLD,
        fontFamily: FONT_CINZEL,
        fontSize:
            isMobile
                ? "17px"
                : "18px",
        lineHeight: 1.45,
        letterSpacing: "0.06em",
        textTransform: "uppercase",
        textDecoration: "underline",
        textDecorationColor:
            "rgba(216,176,122,0.42)",
        textUnderlineOffset: "7px"
    };
}
