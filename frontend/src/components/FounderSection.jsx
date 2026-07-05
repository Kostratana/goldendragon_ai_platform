import founderImage from "../assets/murzik/doc_photo.webp";

import { Link } from "react-router-dom";

const EMAIL_LINK =
    "https://mail.google.com/mail/?view=cm&fs=1&to=srumyantseva7@gmail.com&su=Golden%20Dragon%20AI";

export default function FounderSection() {

    const isMobile =
        window.innerWidth <= 768;

    const isTablet =
        window.innerWidth > 768 &&
        window.innerWidth < 1200;

    return (
        <section
            style={{
                position: "relative",

                width: "100%",

                boxSizing: "border-box",

                paddingTop:
                    isMobile
                        ? "56px"
                        : "120px",

                paddingBottom:
                    isMobile
                        ? "64px"
                        : "140px",

                paddingLeft:
                    isMobile
                        ? "20px"
                        : "70px",

                paddingRight:
                    isMobile
                        ? "20px"
                        : "70px",

                background:
                    "linear-gradient(to bottom, #080603 0%, #040404 100%)",

                fontFamily:
                    "'Cormorant Garamond', serif",

                overflow: "hidden"
            }}
        >

            {/* ambient glow */}

            <div
                style={{
                    position: "absolute",

                    top:
                        isMobile
                            ? "-120px"
                            : "120px",

                    left:
                        isMobile
                            ? "-200px"
                            : "-180px",

                    width:
                        isMobile
                            ? "320px"
                            : "520px",

                    height:
                        isMobile
                            ? "320px"
                            : "520px",

                    background:
                        "rgba(255,140,0,0.08)",

                    borderRadius: "9999px",

                    filter:
                        isMobile
                            ? "blur(70px)"
                            : "blur(160px)"
                }}
            />

            <div
                style={{
                    maxWidth: "1450px",

                    margin: "0 auto",

                    position: "relative",

                    zIndex: 2
                }}
            >

                <div
                    style={{
                        display: "flex",

                        flexDirection: "column",

                        alignItems: "center",

                        width: "100%",

                        boxSizing: "border-box"
                    }}
                >

                    {/* DECLARATION */}

                    <div
                        style={{
                            width: "100%",

                            maxWidth: "820px",

                            margin: "0 auto",

                            boxSizing: "border-box",

                            textAlign: "center"
                        }}
                    >

                        <div
                            style={{
                                color: "#d8b07a",

                                fontSize:
                                    isMobile
                                        ? "20px"
                                        : isTablet
                                            ? "28px"
                                            : "37px",

                                fontWeight: "700",

                                fontFamily:
                                    "'Cinzel', serif",

                                letterSpacing:
                                    isMobile
                                        ? "0.01em"
                                        : "0.06em",

                                lineHeight:
                                    isMobile
                                        ? "1.45"
                                        : 1.5,

                                marginBottom:
                                    isMobile
                                        ? "14px"
                                        : "18px"
                            }}
                        >
                            The Golden Dragon Declaration
                        </div>

                        <p style={declarationParagraphStyle(isMobile, isTablet)}>
                            Every great journey begins with a vision.
                        </p>

                        <p style={declarationParagraphStyle(isMobile, isTablet)}>
                            Golden Dragon AI was founded with a simple but ambitious purpose: to create intelligent technologies that improve life.
                        </p>

                        <p style={declarationParagraphStyle(isMobile, isTablet)}>
                            We believe that throughout history humanity has repeatedly discovered, forgotten, and rediscovered knowledge. Every generation inherits ideas from the past and transforms them into the future.
                        </p>

                        <p style={declarationParagraphStyle(isMobile, isTablet)}>
                            For us, the Golden Dragon is the symbol of this timeless wisdom.
                        </p>

                        <p style={declarationParagraphStyle(isMobile, isTablet)}>
                            Not a myth of the past, but a reminder that knowledge never truly disappears. It waits to be rediscovered and reimagined for a new generation.
                        </p>

                        <p style={declarationParagraphStyle(isMobile, isTablet)}>
                            The Golden Dragon was born from this philosophy.
                        </p>

                        <p style={declarationParagraphStyle(isMobile, isTablet)}>
                            More than an AI assistant, the Golden Dragon is the symbolic guardian of knowledge and the intelligence at the heart of Golden Dragon AI Studio.
                        </p>

                        <p style={declarationParagraphStyle(isMobile, isTablet)}>
                            Golden Dragon AI is our commitment to bringing timeless wisdom into the modern world through responsible artificial intelligence.
                        </p>

                        <p style={declarationParagraphStyle(isMobile, isTablet)}>
                            Our technologies are created for one purpose:
                        </p>

                        <p style={declarationParagraphStyle(isMobile, isTablet)}>
                            To serve life.
                        </p>

                        <p style={declarationParagraphStyle(isMobile, isTablet)}>
                            We believe artificial intelligence should help people—not replace them.
                        </p>

                        <p style={declarationParagraphStyle(isMobile, isTablet)}>
                            It should help us make better decisions, improve health, support businesses, protect animals, preserve nature, and build a better future for generations to come.
                        </p>

                        <p style={declarationParagraphStyle(isMobile, isTablet)}>
                            Every system we create is another chapter in this journey.
                        </p>

                        <p style={declarationParagraphStyle(isMobile, isTablet)}>
                            Every project reflects the same philosophy while solving real-world challenges.
                        </p>

                        <p style={declarationParagraphStyle(isMobile, isTablet)}>
                            Together, they form a single ecosystem united by one vision and one purpose.
                        </p>

                        <p style={declarationParagraphStyle(isMobile, isTablet)}>
                            This declaration defines the path we have chosen.
                        </p>

                        <p style={declarationParagraphStyle(isMobile, isTablet)}>
                            A path where knowledge is shared.
                        </p>

                        <p style={declarationParagraphStyle(isMobile, isTablet)}>
                            Technology empowers humanity.
                        </p>

                        <p style={declarationParagraphStyle(isMobile, isTablet)}>
                            Innovation carries responsibility.
                        </p>

                        <p
                            style={{
                                ...declarationParagraphStyle(isMobile, isTablet),

                                marginBottom: 0
                            }}
                        >
                            And every new chapter brings us one step closer to a better future.
                        </p>

                    </div>

                    {/* BUSINESS CTA */}

                    <div
                        style={{
                            width: "100%",

                            maxWidth: "820px",

                            margin:
                                isMobile
                                    ? "44px auto 0"
                                    : isTablet
                                        ? "70px auto 0"
                                        : "90px auto 0",

                            boxSizing: "border-box",

                            textAlign: "center"
                        }}
                    >

                        <div
                            style={{
                                ...declarationHeadingStyle(isMobile, isTablet),

                                fontSize:
                                    isMobile
                                        ? "17px"
                                        : isTablet
                                            ? "24px"
                                            : "30px",

                                marginTop: 0,

                                marginBottom:
                                    isMobile
                                        ? "18px"
                                        : "28px"
                            }}
                        >
                            Let's Build the Future Together
                        </div>

                        <p style={ctaParagraphStyle(isMobile, isTablet)}>
                            Every great solution begins with a conversation.
                        </p>

                        <p style={ctaParagraphStyle(isMobile, isTablet)}>
                            Whether you want to automate your business, develop an intelligent AI assistant, build a computer vision system, create a custom machine learning model, or transform an idea into a complete AI product, Golden Dragon AI Studio is ready to build your next intelligent system.
                        </p>

                        <p style={ctaParagraphStyle(isMobile, isTablet)}>
                            Start by telling us about your project.
                        </p>

                        <p style={ctaParagraphStyle(isMobile, isTablet)}>
                            You can contact us directly by{" "}
                            <a
                                href={EMAIL_LINK}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={ctaLinkStyle()}
                            >
                                email
                            </a>
                            {" "}or continue to the{" "}
                            <Link
                                to="/chat"
                                style={ctaLinkStyle()}
                            >
                                Dragon Chat
                            </Link>
                            {" "}page, where our AI Business Assistant will help you define your goals, collect your requirements, and prepare the foundation for your future intelligent system.
                        </p>

                        <p
                            style={{
                                ...ctaParagraphStyle(isMobile, isTablet),

                                fontSize:
                                    isMobile
                                        ? "17px"
                                        : isTablet
                                            ? "21px"
                                            : "27px",

                                color: "#d8b07a",

                                fontWeight: "700",

                                marginBottom: 0
                            }}
                        >
                            Let's transform your ideas into intelligent technology.
                        </p>

                    </div>

                    {/* FOUNDER BLOCK */}

                    <div
                        style={{
                            marginTop:
                                isMobile
                                    ? "44px"
                                    : isTablet
                                        ? "70px"
                                        : "90px",

                            width: "100%",

                            boxSizing: "border-box",

                            display: "flex",

                            flexDirection: "column",

                            alignItems: "center",

                            textAlign: "center"
                        }}
                    >

                        {/* avatar */}

                        <div
                            style={{
                                width:
                                    isMobile
                                        ? "150px"
                                        : "220px",

                                height:
                                    isMobile
                                        ? "150px"
                                        : "220px",

                                borderRadius: "9999px",

                                padding:
                                    isMobile
                                        ? "3px"
                                        : "4px",

                                background:
                                    "linear-gradient(135deg, rgba(216,176,122,1), rgba(120,70,20,0.55))",

                                boxShadow:
                                    isMobile
                                        ? "0 0 30px rgba(255,140,0,0.12)"
                                        : "0 0 100px rgba(255,140,0,0.16)"
                            }}
                        >

                            <div
                                style={{
                                    width: "100%",

                                    height: "100%",

                                    borderRadius: "9999px",

                                    overflow: "hidden",

                                    background:
                                        "#101010"
                                }}
                            >

                                <img
                                    src={founderImage}

                                    alt="Svetlana Rumyantseva"

                                    style={{
                                        width: "100%",

                                        height: "100%",

                                        objectFit: "cover"
                                    }}
                                />

                            </div>

                        </div>

                        {/* NAME */}

                        <div
                            style={{
                                marginTop:
                                    isMobile
                                        ? "18px"
                                        : "34px",

                                display: "flex",

                                flexDirection: "column",

                                gap:
                                    isMobile
                                        ? "8px"
                                        : "14px",

                                color: "#c9aa82",

                                fontSize:
                                    isMobile
                                        ? "10px"
                                        : isTablet
                                            ? "15px"
                                            : "18px",

                                fontWeight: "600",

                                lineHeight:
                                    isMobile
                                        ? "1.6"
                                        : "1.55",

                                letterSpacing:
                                    isMobile
                                        ? "0.08em"
                                        : "0.18em",

                                textTransform: "uppercase",

                                fontFamily:
                                    "'Cinzel', serif"
                            }}
                        >

                            <div
                                style={
                                    isMobile
                                        ? { fontSize: "11px" }
                                        : undefined
                                }
                            >
                                Svetlana Rumyantseva
                            </div>

                            <div>
                                Founder • Lead AI Engineer
                            </div>

                            <div>
                                Owner of Golden Dragon AI Studio
                            </div>

                        </div>

                        {/* BUTTONS */}

                        <div
                            style={{
                                marginTop:
                                    isMobile
                                        ? "18px"
                                        : "38px",

                                width: "100%",

                                display: "flex",

                                flexWrap: "wrap",

                                justifyContent: "center",

                                gap:
                                    isMobile
                                        ? "8px"
                                        : "14px"
                            }}
                        >

                            <a
                                href="https://github.com/Kostratana"

                                target="_blank"

                                rel="noopener noreferrer"

                                style={mobileButtonStyle(isMobile)}
                            >
                                GitHub
                            </a>

                            <a
                                href="https://linkedin.com/in/svetlana-rumyantseva-5b41962b9"

                                target="_blank"

                                rel="noopener noreferrer"

                                style={mobileButtonStyle(isMobile)}
                            >
                                LinkedIn
                            </a>

                            <a
                                href="https://mail.google.com/mail/?view=cm&fs=1&to=srumyantseva7@gmail.com&su=Golden%20Dragon%20AI"

                                target="_blank"

                                rel="noopener noreferrer"

                                style={mobileButtonStyle(isMobile)}
                            >
                                Email
                            </a>

                        </div>

                    </div>

                </div>

            </div>

        </section>
    );
}

function ctaParagraphStyle(isMobile, isTablet) {

    return {
        color: "#c9aa82",

        fontSize:
            isMobile
                ? "15px"
                : isTablet
                    ? "18px"
                    : "22px",

        lineHeight:
            isMobile
                ? "1.75"
                : "1.9",

        fontWeight: "400",

        marginTop: 0,

        marginBottom:
            isMobile
                ? "14px"
                : "24px",

        width: "100%",

        boxSizing: "border-box"
    };
}

function ctaLinkStyle() {

    return {
        color: "#d8b07a",

        textDecoration:
            "underline",

        textDecorationColor:
            "rgba(216,176,122,0.35)",

        textUnderlineOffset:
            "3px"
    };
}

function declarationParagraphStyle(isMobile, isTablet) {

    return {
        color: "#c9aa82",

        fontSize:
            isMobile
                ? "15px"
                : isTablet
                    ? "18px"
                    : "22px",

        lineHeight:
            isMobile
                ? "1.75"
                : "1.9",

        fontWeight: "500",

        marginTop: 0,

        marginBottom:
            isMobile
                ? "14px"
                : "24px",

        width: "100%",

        boxSizing: "border-box"
    };
}

function declarationHeadingStyle(isMobile, isTablet) {

    return {
        color: "#d8b07a",

        fontSize:
            isMobile
                ? "15px"
                : isTablet
                    ? "20px"
                    : "24px",

        fontWeight: "700",

        fontFamily:
            "'Cinzel', serif",

        letterSpacing:
            isMobile
                ? "0.02em"
                : "0.06em",

        lineHeight:
            isMobile
                ? "1.45"
                : "1.5",

        marginBottom:
            isMobile
                ? "12px"
                : "20px",

        width: "100%",

        boxSizing: "border-box"
    };
}

function mobileButtonStyle(isMobile) {

    return {

        height:
            isMobile
                ? "34px"
                : "48px",

        paddingLeft:
            isMobile
                ? "14px"
                : "22px",

        paddingRight:
            isMobile
                ? "14px"
                : "22px",

        borderRadius:
            isMobile
                ? "10px"
                : "16px",

        border:
            "1px solid rgba(216,176,122,0.16)",

        background:
            "rgba(255,255,255,0.03)",

        color:
            "#d8b07a",

        textDecoration:
            "none",

        display:
            "flex",

        alignItems:
            "center",

        justifyContent:
            "center",

        fontWeight:
            "700",

        transition:
            "0.3s",

        cursor:
            "pointer",

        boxShadow:
            "0 0 30px rgba(255,140,0,0.04)",

        fontFamily:
            "'Cinzel', serif",

        fontSize:
            isMobile
                ? "9px"
                : "14px",

        letterSpacing:
            isMobile
                ? "0.06em"
                : "0.14em"
    };
}