import {
    Link
} from "react-router-dom";

import { motion } from "framer-motion";

import Footer from "../components/Footer";

import useFounderBreakpoints from "../hooks/useFounderBreakpoints";

import {
    CONTACT_LINKS
} from "../constants/links";

import {
    GOLD,
    TEXT
} from "../theme/colors";

import {
    FONT_CINZEL,
    FONT_IM_FELL
} from "../theme/fonts";

import dragonEyeImage from "../assets/murzik/chat-main-image.webp";

const SERVICE_AREAS = [
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

const SERVICES = [
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
            "We develop machine learning models for prediction, classification, ranking, segmentation and business intelligence."
    },
    {
        title: "Training Models on Custom Datasets",
        description:
            "We prepare datasets, build training pipelines and train models on your proprietary data with measurable performance goals."
    },
    {
        title: "Training Models from Scratch",
        description:
            "We design and train models from the ground up when your use case requires a fully custom AI foundation."
    },
    {
        title: "Fine-Tuning Existing Models",
        description:
            "We adapt existing models to your business context, improving quality, tone, accuracy and domain-specific behavior."
    },
    {
        title: "Custom Neural Network Development",
        description:
            "We develop neural architectures for specialized tasks where standard models are not precise, efficient or flexible enough."
    },
    {
        title: "RAG & LLM Solutions",
        description:
            "We integrate language models with enterprise knowledge bases, retrieval systems and secure business data sources."
    },
    {
        title: "Benchmark Development & AI Evaluation",
        description:
            "We create benchmarks, evaluation metrics and testing workflows to measure AI quality before and after deployment."
    },
    {
        title: "AI MVP Development",
        description:
            "We turn AI ideas into focused MVPs that validate market value, technical feasibility and future product direction."
    },
    {
        title: "Research & Development (R&D)",
        description:
            "We explore advanced AI concepts, prototype new approaches and help transform research into production-ready systems."
    }
];

const WORK_STEPS = [
    "Requirements Analysis",
    "Solution Architecture",
    "AI Development",
    "Model Training",
    "Evaluation & Benchmarking",
    "Deployment",
    "Support & Future Development"
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

    const sectionPaddingX =
        isMobile
            ? "max(18px, env(safe-area-inset-left, 0px))"
            : isTablet
                ? "32px"
                : "48px";

    const sectionPaddingY =
        isMobile
            ? "54px"
            : isTablet
                ? "70px"
                : "88px";

    const maxContentWidth =
        "1180px";

    const sectionTitleStyle = {
        color: GOLD,
        fontFamily: FONT_CINZEL,
        fontSize:
            isMobile
                ? "30px"
                : isTablet
                    ? "40px"
                    : "52px",
        fontWeight: 700,
        lineHeight: 1.15,
        margin: 0,
        textAlign: "center",
        textShadow:
            "0 0 18px rgba(216,176,122,0.26)"
    };

    const paragraphStyle = {
        color: TEXT,
        fontFamily: FONT_IM_FELL,
        fontSize:
            isMobile
                ? "19px"
                : isTablet
                    ? "21px"
                    : "24px",
        lineHeight:
            isMobile
                ? 1.55
                : 1.65,
        margin: 0,
        textAlign: "center"
    };

    const cardStyle = {
        background:
            "linear-gradient(180deg, rgba(18,13,7,0.92), rgba(7,6,5,0.94))",
        border:
            "1px solid rgba(216,176,122,0.30)",
        borderRadius: "8px",
        boxShadow:
            "0 18px 46px rgba(0,0,0,0.34), inset 0 0 22px rgba(216,176,122,0.045)",
        boxSizing: "border-box"
    };

    return (
        <main
            style={{
                minHeight: "100vh",
                width: "100%",
                maxWidth: "100vw",
                overflowX: "hidden",
                background:
                    "linear-gradient(to bottom, #050505 0%, #080603 54%, #050505 100%)",
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
                    top: isMobile ? "-90px" : "-160px",
                    right: isMobile ? "-120px" : "-220px",
                    width: isMobile ? "280px" : isTablet ? "480px" : "720px",
                    height: isMobile ? "280px" : isTablet ? "480px" : "720px",
                    borderRadius: "9999px",
                    background: "rgba(255,140,0,0.10)",
                    filter: isMobile ? "blur(54px)" : "blur(105px)",
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
                            : "78vh",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    paddingTop:
                        isMobile
                            ? "max(116px, calc(96px + env(safe-area-inset-top, 0px)))"
                            : isTablet
                                ? "138px"
                                : "154px",
                    paddingBottom:
                        isMobile
                            ? "58px"
                            : "82px",
                    paddingLeft: sectionPaddingX,
                    paddingRight: sectionPaddingX,
                    boxSizing: "border-box"
                }}
            >
                <div
                    style={{
                        width: "100%",
                        maxWidth: maxContentWidth,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap:
                            isMobile
                                ? "22px"
                                : "28px",
                        textAlign: "center"
                    }}
                >
                    <motion.h1
                        initial={{
                            opacity: 0,
                            y: 18
                        }}
                        animate={{
                            opacity: 1,
                            y: 0
                        }}
                        transition={{
                            duration: 0.8,
                            ease: "easeOut"
                        }}
                        style={{
                            color: GOLD,
                            fontFamily: FONT_CINZEL,
                            fontSize:
                                isMobile
                                    ? "42px"
                                    : isTablet
                                        ? "62px"
                                        : "84px",
                            fontWeight: 700,
                            lineHeight: 1.04,
                            margin: 0,
                            textShadow:
                                "0 0 26px rgba(216,176,122,0.32), 0 0 58px rgba(255,140,0,0.12)"
                        }}
                    >
                        What Can We Do for You?
                    </motion.h1>

                    <p
                        style={{
                            ...paragraphStyle,
                            maxWidth: "920px",
                            fontSize:
                                isMobile
                                    ? "21px"
                                    : isTablet
                                        ? "25px"
                                        : "31px"
                        }}
                    >
                        We develop modern AI solutions for businesses — from research and concept design to production-ready intelligent systems.
                    </p>
                </div>
            </section>

            <section
                style={{
                    position: "relative",
                    zIndex: 2,
                    padding: `${sectionPaddingY} ${sectionPaddingX}`,
                    boxSizing: "border-box"
                }}
            >
                <div
                    style={{
                        maxWidth: maxContentWidth,
                        margin: "0 auto",
                        display: "flex",
                        flexDirection: "column",
                        gap:
                            isMobile
                                ? "28px"
                                : "34px"
                    }}
                >
                    <h2 style={sectionTitleStyle}>
                        Helping Your Business Grow with AI
                    </h2>

                    <p
                        style={{
                            ...paragraphStyle,
                            maxWidth: "960px",
                            margin: "0 auto"
                        }}
                    >
                        We help companies implement artificial intelligence, automate business processes and build intelligent products that increase efficiency, reduce costs and create new business opportunities.
                    </p>

                    <p
                        style={{
                            ...paragraphStyle,
                            color: GOLD,
                            fontSize:
                                isMobile
                                    ? "20px"
                                    : isTablet
                                        ? "23px"
                                        : "27px"
                        }}
                    >
                        Choose the area that best matches your business needs:
                    </p>

                    <div
                        style={{
                            display: "flex",
                            flexWrap: "wrap",
                            justifyContent: "center",
                            gap:
                                isMobile
                                    ? "10px"
                                    : "12px"
                        }}
                    >
                        {SERVICE_AREAS.map((service) => (
                            <span
                                key={service}
                                style={{
                                    color: GOLD,
                                    fontFamily: FONT_CINZEL,
                                    fontSize:
                                        isMobile
                                            ? "11px"
                                            : "12px",
                                    fontWeight: 700,
                                    letterSpacing: "0.08em",
                                    textTransform: "uppercase",
                                    padding:
                                        isMobile
                                            ? "9px 12px"
                                            : "10px 14px",
                                    border:
                                        "1px solid rgba(216,176,122,0.32)",
                                    borderRadius: "999px",
                                    background:
                                        "rgba(8,6,4,0.72)",
                                    boxShadow:
                                        "0 0 18px rgba(216,176,122,0.06)",
                                    boxSizing: "border-box"
                                }}
                            >
                                {service}
                            </span>
                        ))}
                    </div>
                </div>
            </section>

            <section
                style={{
                    position: "relative",
                    zIndex: 2,
                    padding: `${sectionPaddingY} ${sectionPaddingX}`,
                    boxSizing: "border-box"
                }}
            >
                <div
                    style={{
                        maxWidth: maxContentWidth,
                        margin: "0 auto",
                        display: "flex",
                        flexDirection: "column",
                        gap:
                            isMobile
                                ? "28px"
                                : "38px"
                    }}
                >
                    <h2 style={sectionTitleStyle}>
                        Our Services
                    </h2>

                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns:
                                isMobile
                                    ? "1fr"
                                    : isTablet
                                        ? "repeat(2, minmax(0, 1fr))"
                                        : "repeat(3, minmax(0, 1fr))",
                            gap:
                                isMobile
                                    ? "16px"
                                    : "20px"
                        }}
                    >
                        {SERVICES.map((service) => (
                            <article
                                key={service.title}
                                style={{
                                    ...cardStyle,
                                    padding:
                                        isMobile
                                            ? "22px 18px"
                                            : "26px 24px",
                                    minHeight:
                                        isMobile
                                            ? "auto"
                                            : "220px"
                                }}
                            >
                                <h3
                                    style={{
                                        color: GOLD,
                                        fontFamily: FONT_CINZEL,
                                        fontSize:
                                            isMobile
                                                ? "20px"
                                                : "22px",
                                        lineHeight: 1.25,
                                        margin: "0 0 14px",
                                        textShadow:
                                            "0 0 14px rgba(216,176,122,0.18)"
                                    }}
                                >
                                    {service.title}
                                </h3>

                                <p
                                    style={{
                                        color: TEXT,
                                        fontFamily: FONT_IM_FELL,
                                        fontSize:
                                            isMobile
                                                ? "18px"
                                                : "19px",
                                        lineHeight: 1.55,
                                        margin: 0
                                    }}
                                >
                                    {service.description}
                                </p>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            <section
                style={{
                    position: "relative",
                    zIndex: 2,
                    padding: `${sectionPaddingY} ${sectionPaddingX}`,
                    boxSizing: "border-box"
                }}
            >
                <div
                    style={{
                        maxWidth: maxContentWidth,
                        margin: "0 auto",
                        display: "grid",
                        gridTemplateColumns:
                            isMobile
                                ? "1fr"
                                : "minmax(0, 0.9fr) minmax(0, 1.1fr)",
                        gap:
                            isMobile
                                ? "28px"
                                : isTablet
                                    ? "34px"
                                    : "48px",
                        alignItems: "start"
                    }}
                >
                    <h2
                        style={{
                            ...sectionTitleStyle,
                            textAlign:
                                isMobile
                                    ? "center"
                                    : "left"
                        }}
                    >
                        How We Work
                    </h2>

                    <div
                        style={{
                            display: "grid",
                            gap: "14px"
                        }}
                    >
                        {WORK_STEPS.map((step, index) => (
                            <div
                                key={step}
                                style={{
                                    ...cardStyle,
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "16px",
                                    padding:
                                        isMobile
                                            ? "16px"
                                            : "18px 20px"
                                }}
                            >
                                <span
                                    style={{
                                        flex: "0 0 auto",
                                        width: "34px",
                                        height: "34px",
                                        borderRadius: "50%",
                                        display: "inline-flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        color: GOLD,
                                        border:
                                            "1px solid rgba(216,176,122,0.46)",
                                        fontFamily: FONT_CINZEL,
                                        fontSize: "13px",
                                        fontWeight: 700
                                    }}
                                >
                                    {index + 1}
                                </span>

                                <span
                                    style={{
                                        color: TEXT,
                                        fontFamily: FONT_IM_FELL,
                                        fontSize:
                                            isMobile
                                                ? "18px"
                                                : "21px",
                                        lineHeight: 1.35
                                    }}
                                >
                                    {step}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section
                style={{
                    position: "relative",
                    zIndex: 2,
                    padding: `${sectionPaddingY} ${sectionPaddingX}`,
                    boxSizing: "border-box"
                }}
            >
                <div
                    style={{
                        maxWidth: maxContentWidth,
                        margin: "0 auto",
                        display: "flex",
                        flexDirection: "column",
                        gap:
                            isMobile
                                ? "28px"
                                : "36px"
                    }}
                >
                    <h2 style={sectionTitleStyle}>
                        Why Golden Dragon AI Studio
                    </h2>

                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns:
                                isMobile
                                    ? "1fr"
                                    : isTablet
                                        ? "repeat(2, minmax(0, 1fr))"
                                        : "repeat(4, minmax(0, 1fr))",
                            gap:
                                isMobile
                                    ? "12px"
                                    : "16px"
                        }}
                    >
                        {WHY_ITEMS.map((item) => (
                            <div
                                key={item}
                                style={{
                                    ...cardStyle,
                                    color: GOLD,
                                    fontFamily: FONT_CINZEL,
                                    fontSize:
                                        isMobile
                                            ? "15px"
                                            : "16px",
                                    fontWeight: 700,
                                    lineHeight: 1.35,
                                    letterSpacing: "0.04em",
                                    textAlign: "center",
                                    padding:
                                        isMobile
                                            ? "16px"
                                            : "18px"
                                }}
                            >
                                {item}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section
                style={{
                    position: "relative",
                    zIndex: 2,
                    padding: `${sectionPaddingY} ${sectionPaddingX}`,
                    boxSizing: "border-box"
                }}
            >
                <div
                    style={{
                        maxWidth: "920px",
                        margin: "0 auto",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap:
                            isMobile
                                ? "20px"
                                : "24px"
                    }}
                >
                    <h2 style={sectionTitleStyle}>
                        Start Your Project
                    </h2>

                    <p style={paragraphStyle}>
                        Tell us what you want to build, automate or improve. We will help you define the best AI direction and turn your idea into a practical solution.
                    </p>
                </div>
            </section>

            <section
                style={{
                    position: "relative",
                    zIndex: 2,
                    padding: `${sectionPaddingY} ${sectionPaddingX}`,
                    boxSizing: "border-box"
                }}
            >
                <div
                    style={{
                        maxWidth: maxContentWidth,
                        margin: "0 auto",
                        display: "grid",
                        gridTemplateColumns:
                            isMobile
                                ? "1fr"
                                : "repeat(2, minmax(0, 1fr))",
                        gap:
                            isMobile
                                ? "20px"
                                : "24px",
                        alignItems: "stretch"
                    }}
                >
                    <div
                        style={{
                            ...cardStyle,
                            padding:
                                isMobile
                                    ? "26px 20px"
                                    : "34px",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            gap: "16px",
                            textAlign: "center"
                        }}
                    >
                        <h2
                            style={{
                                ...sectionTitleStyle,
                                fontSize:
                                    isMobile
                                        ? "28px"
                                        : isTablet
                                            ? "34px"
                                            : "42px"
                            }}
                        >
                            Email
                        </h2>

                        <a
                            href={CONTACT_LINKS.EMAIL}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                                color: GOLD,
                                fontFamily: FONT_CINZEL,
                                fontSize:
                                    isMobile
                                        ? "16px"
                                        : "18px",
                                fontWeight: 700,
                                letterSpacing: "0.08em",
                                textTransform: "uppercase",
                                textDecoration: "none"
                            }}
                        >
                            srumyantseva7@gmail.com
                        </a>
                    </div>

                    <div
                        style={{
                            ...cardStyle,
                            padding:
                                isMobile
                                    ? "26px 20px"
                                    : "34px",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            gap: "18px",
                            textAlign: "center"
                        }}
                    >
                        <Link
                            to="/chat"
                            aria-label="Open Dragon Chat"
                            style={{
                                display: "block",
                                width:
                                    isMobile
                                        ? "190px"
                                        : "230px",
                                maxWidth: "100%",
                                borderRadius: "50%",
                                border:
                                    "1px solid rgba(216,176,122,0.50)",
                                overflow: "hidden",
                                boxShadow:
                                    "0 0 30px rgba(216,176,122,0.18)",
                                lineHeight: 0
                            }}
                        >
                            <img
                                src={dragonEyeImage}
                                alt="Dragon Chat"
                                draggable={false}
                                style={{
                                    display: "block",
                                    width: "100%",
                                    aspectRatio: "1 / 1",
                                    objectFit: "cover"
                                }}
                            />
                        </Link>

                        <h2
                            style={{
                                ...sectionTitleStyle,
                                fontSize:
                                    isMobile
                                        ? "28px"
                                        : isTablet
                                            ? "34px"
                                            : "42px"
                            }}
                        >
                            Dragon Chat
                        </h2>

                        <p style={paragraphStyle}>
                            Describe your project and Dragon will help you find the best AI solution.
                        </p>
                    </div>
                </div>
            </section>

            <section
                style={{
                    position: "relative",
                    zIndex: 2,
                    padding: `${sectionPaddingY} ${sectionPaddingX}`,
                    boxSizing: "border-box"
                }}
            >
                <div
                    style={{
                        maxWidth: "780px",
                        margin: "0 auto",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap:
                            isMobile
                                ? "22px"
                                : "28px",
                        textAlign: "center"
                    }}
                >
                    <h2 style={sectionTitleStyle}>
                        Documents
                    </h2>

                    <div
                        style={{
                            display: "flex",
                            flexDirection:
                                isMobile
                                    ? "column"
                                    : "row",
                            gap: "14px",
                            width:
                                isMobile
                                    ? "100%"
                                    : "auto",
                            justifyContent: "center"
                        }}
                    >
                        {["Service Agreement", "NDA"].map((document) => (
                            <a
                                key={document}
                                href="#"
                                style={{
                                    color: GOLD,
                                    fontFamily: FONT_CINZEL,
                                    fontSize:
                                        isMobile
                                            ? "14px"
                                            : "15px",
                                    fontWeight: 700,
                                    letterSpacing: "0.08em",
                                    textTransform: "uppercase",
                                    textDecoration: "none",
                                    padding: "14px 20px",
                                    minHeight: "48px",
                                    minWidth:
                                        isMobile
                                            ? "100%"
                                            : "220px",
                                    display: "inline-flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    border:
                                        "1px solid rgba(216,176,122,0.48)",
                                    borderRadius: "8px",
                                    background:
                                        "rgba(7,6,5,0.82)",
                                    boxShadow:
                                        "0 0 18px rgba(216,176,122,0.08)",
                                    boxSizing: "border-box"
                                }}
                            >
                                {document}
                            </a>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />

        </main>
    );
}
