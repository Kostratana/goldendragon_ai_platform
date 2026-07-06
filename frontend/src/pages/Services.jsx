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

const SERVICE_DIRECTIONS = [
    "AI Consulting",
    "AI Agents & Multi-Agent Systems",
    "Business Process Automation",
    "Computer Vision",
    "Custom AI Development",
    "Machine Learning Models",
    "Training Models on Custom Datasets",
    "Training AI Models from Scratch",
    "Fine-Tuning Existing Models",
    "Custom Neural Network Architectures",
    "RAG Systems",
    "Enterprise Knowledge Bases",
    "LLM Integration",
    "Generative AI",
    "Data Analytics",
    "Predictive Analytics",
    "Recommendation Systems",
    "Anomaly Detection",
    "Benchmark Development",
    "AI Evaluation",
    "ML Metrics",
    "AI MVP Development",
    "Research & Development (R&D)",
    "Enterprise AI Integration"
];

const SERVICE_SECTIONS = [
    {
        title: "AI Consulting",
        description:
            "We analyze your business goals, identify practical AI opportunities and shape a clear technical roadmap for implementation."
    },
    {
        title: "AI Agents",
        description:
            "We design intelligent agents and multi-agent systems that coordinate tasks, automate decisions and support complex workflows."
    },
    {
        title: "Business Process Automation",
        description:
            "We automate repetitive operations with AI-powered systems that reduce manual work, improve accuracy and save time."
    },
    {
        title: "Computer Vision",
        description:
            "We build vision systems for image analysis, object detection, monitoring, classification and visual quality control."
    },
    {
        title: "Custom AI Models",
        description:
            "We create AI models tailored to your data, domain and product requirements instead of relying on generic solutions."
    },
    {
        title: "Machine Learning Models",
        description:
            "We develop machine learning models for prediction, classification, ranking, segmentation, anomaly detection and business intelligence."
    },
    {
        title: "Training Models on Custom Datasets",
        description:
            "We prepare datasets, clean data, structure annotations and train models on customer-specific data."
    },
    {
        title: "Training AI Models from Scratch",
        description:
            "We design and train models from scratch when a task requires a custom architecture, domain-specific training or full control over model behavior."
    },
    {
        title: "Fine-Tuning Existing Models",
        description:
            "We adapt existing models to your business domain, improve their accuracy and align them with your workflows and data."
    },
    {
        title: "Custom Neural Network Architectures",
        description:
            "We design custom neural network architectures for specialized tasks where standard models are not sufficient."
    },
    {
        title: "RAG & LLM Solutions",
        description:
            "We build RAG systems, enterprise knowledge bases, document search, LLM-powered assistants and generative AI tools."
    },
    {
        title: "Benchmark Development & AI Evaluation",
        description:
            "We design benchmarks, define evaluation protocols, measure ML metrics, compare models and prepare technical reports on model quality."
    },
    {
        title: "AI MVP Development",
        description:
            "We build fast MVPs and demos to validate ideas, attract investment and test AI product hypotheses before full-scale development."
    },
    {
        title: "Research & Development",
        description:
            "We conduct AI research, prototype experimental models, test advanced architectures and turn research ideas into applied systems."
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
        "940px";

    const sectionSpacing =
        isMobile
            ? "78px"
            : isTablet
                ? "104px"
                : "132px";

    const heroTitleStyle = {
        color: GOLD,
        fontFamily: FONT_CINZEL_DECORATIVE,
        fontWeight: "700",
        fontSize:
            isMobile
                ? "34px"
                : isTablet
                    ? "48px"
                    : "64px",
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
                ? "28px"
                : isTablet
                    ? "36px"
                    : "46px",
        fontWeight: "700",
        lineHeight: 1.25,
        letterSpacing:
            isMobile
                ? "0.03em"
                : "0.06em",
        margin: 0,
        textAlign:
            isMobile
                ? "center"
                : "left",
        textShadow:
            "0 0 20px rgba(216,176,122,0.22)"
    };

    const paragraphStyle = {
        color: TEXT,
        fontFamily: FONT_IM_FELL,
        fontSize:
            isMobile
                ? "20px"
                : isTablet
                    ? "22px"
                    : "25px",
        lineHeight:
            isMobile
                ? 1.58
                : 1.72,
        margin: 0
    };

    const smallHeadingStyle = {
        color: GOLD,
        fontFamily: FONT_CINZEL,
        fontSize:
            isMobile
                ? "22px"
                : isTablet
                    ? "25px"
                    : "29px",
        fontWeight: "700",
        lineHeight: 1.32,
        letterSpacing: "0.04em",
        margin: 0,
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
                            display: "grid",
                            gridTemplateColumns:
                                isMobile
                                    ? "1fr"
                                    : "repeat(2, minmax(0, 1fr))",
                            columnGap:
                                isMobile
                                    ? "0"
                                    : "56px",
                            rowGap:
                                isMobile
                                    ? "10px"
                                    : "12px",
                            color: GOLD,
                            fontFamily: FONT_CINZEL,
                            fontSize:
                                isMobile
                                    ? "17px"
                                    : "18px",
                            lineHeight: 1.55,
                            letterSpacing: "0.04em"
                        }}
                    >
                        {SERVICE_DIRECTIONS.map((service) => (
                            <div key={service}>
                                <T>
                                    {service}
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
                                ? "48px"
                                : "60px"
                    }}
                >
                    {SERVICE_SECTIONS.map((service) => (
                        <article
                            key={service.title}
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                gap:
                                    isMobile
                                        ? "12px"
                                        : "16px"
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
                            gap:
                                isMobile
                                    ? "24px"
                                    : "30px"
                        }}
                    >
                        {WORK_STEPS.map((step) => (
                            <div
                                key={step.title}
                                style={{
                                    display: "grid",
                                    gridTemplateColumns:
                                        isMobile
                                            ? "1fr"
                                            : "minmax(220px, 0.45fr) minmax(0, 1fr)",
                                    gap:
                                        isMobile
                                            ? "8px"
                                            : "30px",
                                    alignItems: "baseline"
                                }}
                            >
                                <h3 style={smallHeadingStyle}>
                                    <T>
                                        {step.title}
                                    </T>
                                </h3>

                                <p style={paragraphStyle}>
                                    <T>
                                        {step.description}
                                    </T>
                                </p>
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
                            display: "grid",
                            gridTemplateColumns:
                                isMobile
                                    ? "1fr"
                                    : "repeat(2, minmax(0, 1fr))",
                            columnGap: "56px",
                            rowGap:
                                isMobile
                                    ? "12px"
                                    : "16px",
                            color: TEXT,
                            fontFamily: FONT_IM_FELL,
                            fontSize:
                                isMobile
                                    ? "20px"
                                    : "23px",
                            lineHeight: 1.55
                        }}
                    >
                        {WHY_ITEMS.map((item) => (
                            <div key={item}>
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
                        display: "grid",
                        gridTemplateColumns:
                            isMobile
                                ? "1fr"
                                : "minmax(0, 0.7fr) minmax(0, 1fr)",
                        gap:
                            isMobile
                                ? "44px"
                                : "64px",
                        alignItems: "center"
                    }}
                >
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "18px"
                        }}
                    >
                        <h2 style={sectionTitleStyle}>
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
                                fontFamily: FONT_CINZEL,
                                fontSize:
                                    isMobile
                                        ? "17px"
                                        : "19px",
                                lineHeight: 1.45,
                                letterSpacing: "0.04em",
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
                            alignItems:
                                isMobile
                                    ? "center"
                                    : "flex-start",
                            gap:
                                isMobile
                                    ? "18px"
                                    : "22px",
                            textAlign:
                                isMobile
                                    ? "center"
                                    : "left"
                        }}
                    >
                        <Link
                            to="/chat"
                            aria-label="Open Dragon Chat"
                            style={{
                                display: "block",
                                width:
                                    isMobile
                                        ? "184px"
                                        : isTablet
                                            ? "210px"
                                            : "238px",
                                maxWidth: "100%",
                                lineHeight: 0,
                                filter:
                                    "drop-shadow(0 0 30px rgba(216,176,122,0.24))"
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
                                    borderRadius:
                                        isMobile
                                            ? "18px"
                                            : "24px"
                                }}
                            />
                        </Link>

                        <h2
                            style={{
                                ...sectionTitleStyle,
                                textAlign:
                                    isMobile
                                        ? "center"
                                        : "left"
                            }}
                        >
                            <T brand>
                                Dragon Chat
                            </T>
                        </h2>

                        <p style={paragraphStyle}>
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
                            flexDirection:
                                isMobile
                                    ? "column"
                                    : "row",
                            gap:
                                isMobile
                                    ? "14px"
                                    : "28px",
                            alignItems:
                                isMobile
                                    ? "flex-start"
                                    : "center"
                        }}
                    >
                        <a
                            href="#"
                            style={documentLinkStyle(isMobile)}
                        >
                            <T>
                                Service Agreement
                            </T>
                        </a>

                        <a
                            href="#"
                            style={documentLinkStyle(isMobile)}
                        >
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
