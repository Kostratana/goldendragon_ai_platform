import founderImage from "../assets/murzik/doc_photo.webp";

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

                paddingTop:
                    isMobile
                        ? "60px"
                        : "120px",

                paddingBottom:
                    isMobile
                        ? "70px"
                        : "140px",

                paddingLeft:
                    isMobile
                        ? "16px"
                        : "70px",

                paddingRight:
                    isMobile
                        ? "16px"
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

                        alignItems: "center"
                    }}
                >

                    {/* DECLARATION */}

                    <div
                        style={{
                            width: "100%",

                            maxWidth: "960px",

                            margin: "0 auto",

                            textAlign:
                                isMobile
                                    ? "center"
                                    : "left"
                        }}
                    >

                        <div
                            style={{
                                color: "#d8b07a",

                                fontSize:
                                    isMobile
                                        ? "19px"
                                        : isTablet
                                            ? "24px"
                                            : "32px",

                                fontWeight: "700",

                                fontFamily:
                                    "'Cinzel', serif",

                                letterSpacing:
                                    isMobile
                                        ? "0.02em"
                                        : "0.06em",

                                lineHeight: 1.5,

                                marginBottom:
                                    isMobile
                                        ? "12px"
                                        : "18px"
                            }}
                        >
                            The Golden Dragon Declaration
                        </div>

                        <div
                            style={{
                                color: "#c9aa82",

                                fontSize:
                                    isMobile
                                        ? "14px"
                                        : isTablet
                                            ? "18px"
                                            : "22px",

                                fontWeight: "500",

                                lineHeight:
                                    isMobile
                                        ? "1.7"
                                        : "1.9",

                                marginBottom:
                                    isMobile
                                        ? "50px"
                                        : "60px"
                            }}
                        >
                            Ancient Wisdom. Modern Technology. Better Future.
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

                        <p style={declarationParagraphStyle(isMobile, isTablet)}>
                            And every new chapter brings us one step closer to a better future.
                        </p>

                        <div
                            style={{
                                ...declarationHeadingStyle(isMobile, isTablet),

                                marginTop:
                                    isMobile
                                        ? "28px"
                                        : "42px"
                            }}
                        >
                            Our Philosophy
                        </div>

                        <p style={declarationParagraphStyle(isMobile, isTablet)}>
                            Ancient Wisdom. Modern Technology. Better Future.
                        </p>

                        <div
                            style={{
                                ...declarationHeadingStyle(isMobile, isTablet),

                                marginTop:
                                    isMobile
                                        ? "28px"
                                        : "42px"
                            }}
                        >
                            Our Mission
                        </div>

                        <p style={declarationParagraphStyle(isMobile, isTablet)}>
                            To build intelligent technologies that improve life, empower people, protect animals, support businesses, preserve nature, and inspire future generations.
                        </p>

                        <div
                            style={{
                                ...declarationHeadingStyle(isMobile, isTablet),

                                marginTop:
                                    isMobile
                                        ? "28px"
                                        : "42px"
                            }}
                        >
                            Our Vision
                        </div>

                        <p style={declarationParagraphStyle(isMobile, isTablet)}>
                            To create a global ecosystem of AI systems inspired by timeless wisdom and dedicated to improving life through responsible innovation.
                        </p>

                        <p style={declarationParagraphStyle(isMobile, isTablet)}>
                            This is where our story begins.
                        </p>

                        <p
                            style={{
                                ...declarationParagraphStyle(isMobile, isTablet),

                                fontWeight: "600",

                                marginBottom: 0
                            }}
                        >
                            Welcome to Golden Dragon AI Studio.
                        </p>

                    </div>

                    {/* FOUNDER BLOCK */}

                    <div
                        style={{
                            marginTop:
                                isMobile
                                    ? "50px"
                                    : isTablet
                                        ? "70px"
                                        : "90px",

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
                                        ? "22px"
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

                            <div>
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
                                        ? "22px"
                                        : "38px",

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

function declarationParagraphStyle(isMobile, isTablet) {

    return {
        color: "#d8d8d8",

        fontSize:
            isMobile
                ? "14px"
                : isTablet
                    ? "18px"
                    : "22px",

        lineHeight:
            isMobile
                ? "1.7"
                : "1.9",

        fontWeight: "400",

        marginTop: 0,

        marginBottom:
            isMobile
                ? "16px"
                : "24px"
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
                ? "1.4"
                : "1.5",

        marginBottom:
            isMobile
                ? "14px"
                : "20px"
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
                : "13px",

        letterSpacing:
            isMobile
                ? "0.06em"
                : "0.14em"
    };
}