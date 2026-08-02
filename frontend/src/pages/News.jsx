import Footer from "../components/Footer";

import agentsArchitectureImage from "../assets/agents.png";

import useFounderBreakpoints from "../hooks/useFounderBreakpoints";

import {
    T
} from "../services/translation";

import {
    GOLD,
    TEXT
} from "../theme/colors";

import {
    FONT_CINZEL_DECORATIVE,
    FONT_IM_FELL
} from "../theme/fonts";

export default function News() {

    const {
        isMobile,
        isTablet
    } = useFounderBreakpoints();

    const pagePaddingX =
        isMobile
            ? "max(20px, env(safe-area-inset-left, 0px))"
            : isTablet
                ? "44px"
                : "64px";

    const contentMaxWidth =
        "1040px";

    const textMaxWidth =
        "820px";

    const sectionPaddingTop =
        isMobile
            ? "max(118px, calc(98px + env(safe-area-inset-top, 0px)))"
            : isTablet
                ? "142px"
                : "158px";

    const headingStyle = {
        color: GOLD,
        fontFamily: FONT_CINZEL_DECORATIVE,
        fontSize:
            isMobile
                ? "28px"
                : isTablet
                    ? "38px"
                    : "48px",
        fontWeight: "700",
        letterSpacing:
            isMobile
                ? "0.02em"
                : "0.05em",
        lineHeight:
            isMobile
                ? 1.24
                : 1.2,
        margin: 0,
        textAlign: "center",
        textShadow:
            "0 0 24px rgba(216,176,122,0.28), 0 0 52px rgba(255,140,0,0.10)"
    };

    const paragraphStyle = {
        color: TEXT,
        fontFamily: FONT_IM_FELL,
        fontSize:
            isMobile
                ? "19px"
                : isTablet
                    ? "22px"
                    : "25px",
        fontWeight: "400",
        letterSpacing:
            isMobile
                ? "0.01em"
                : "0.025em",
        lineHeight:
            isMobile
                ? 1.56
                : 1.64,
        margin: 0,
        textAlign: "center",
        textShadow:
            "0 0 16px rgba(216,176,122,0.14)"
    };

    const contactStyle = {
        ...paragraphStyle,
        color: GOLD,
        fontWeight: "700",
        textShadow:
            "0 0 18px rgba(216,176,122,0.22)"
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

            <section
                style={{
                    position: "relative",
                    zIndex: 2,
                    paddingTop: sectionPaddingTop,
                    paddingBottom:
                        isMobile
                            ? "78px"
                            : "108px",
                    paddingLeft: pagePaddingX,
                    paddingRight: pagePaddingX,
                    boxSizing: "border-box"
                }}
            >
                <div
                    style={{
                        width: "100%",
                        maxWidth: contentMaxWidth,
                        margin: "0 auto",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap:
                            isMobile
                                ? "34px"
                                : "46px"
                    }}
                >
                    <img
                        src={agentsArchitectureImage}
                        alt="AI Agent architecture"
                        style={{
                            display: "block",
                            width: "100%",
                            height: "auto",
                            objectFit: "contain",
                            borderRadius:
                                isMobile
                                    ? "18px"
                                    : "24px",
                            boxShadow:
                                `
                                0 0 0 1px rgba(216,176,122,0.16),
                                0 24px 64px rgba(0,0,0,0.42),
                                0 0 54px rgba(216,176,122,0.16)
                                `
                        }}
                    />

                    <div
                        style={{
                            width: "100%",
                            maxWidth: textMaxWidth,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            gap:
                                isMobile
                                    ? "18px"
                                    : "22px"
                        }}
                    >
                        <h1 style={headingStyle}>
                            <T>
                                Build the Right AI Agent for Your Business
                            </T>
                        </h1>

                        <p style={paragraphStyle}>
                            <T>
                                Every business is unique, and your AI solution should be too.
                            </T>
                        </p>

                        <p style={paragraphStyle}>
                            <T>
                                At Golden Dragon AI Studio, we design custom AI Agents tailored to your business goals, workflows, and data. Whether you need intelligent assistants, enterprise knowledge systems, automation, computer vision, or multi-agent platforms, we can create a solution that fits your organization.
                            </T>
                        </p>

                        <p style={paragraphStyle}>
                            <T>
                                Let's discuss your ideas and discover how AI can automate processes, reduce costs, save time, and improve productivity.
                            </T>
                        </p>

                        <p style={contactStyle}>
                            <T>
                                Contact us to start designing your AI solution.
                            </T>
                        </p>
                    </div>
                </div>
            </section>

            <Footer />

        </main>
    );
}
