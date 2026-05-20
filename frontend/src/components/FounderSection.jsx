import founderImage from "../assets/murzik/doc_photo.png";

export default function FounderSection() {

    const isMobile =
        window.innerWidth <= 768;

    const isTablet =
        window.innerWidth > 768 &&
        window.innerWidth < 1200;

    const cards = [
        {
            title: "AI Architecture",

            text:
                "Design and development of scalable AI architectures, distributed orchestration systems, intelligent routing pipelines, backend infrastructure and hybrid cognitive frameworks for production-grade artificial intelligence environments."
        },

        {
            title: "Computer Vision",

            text:
                "Development of advanced computer vision systems including OCR pipelines, multimodal visual intelligence, object detection, medical imaging analysis, video understanding, automated inspection systems and AI-driven visual analytics."
        },

        {
            title: "LLM Fine-Tuning",

            text:
                "Fine-tuning and adaptation of large language models using LoRA training, memory systems, reasoning pipelines, alignment strategies, prompt engineering and conversational AI optimization for specialized production tasks."
        },

        {
            title: "AI Pipelines",

            text:
                "Full-cycle AI workflow development including preprocessing, multimodal orchestration, training systems, inference pipelines, deployment infrastructure, runtime optimization and scalable AI production integration."
        },

        {
            title: "Multimodal Systems",

            text:
                "Integrated multimodal AI systems combining text, image, audio and video intelligence with unified orchestration logic, intelligent routing systems and scalable cognitive processing architectures."
        },

        {
            title: "Voice & AI Agents",

            text:
                "Development of intelligent conversational agents, voice interfaces, speech-driven AI systems, autonomous assistants and interactive multimodal communication environments for real-world AI applications."
        },

        {
            title: "Quantum Hybrid AI",

            text:
                "Research and development of quantum-inspired hybrid intelligence systems combining classical machine learning architectures with advanced orchestration models, cognitive reasoning systems and adaptive AI workflows."
        },

        {
            title: "Trading AI",

            text:
                "AI trading intelligence systems focused on liquidity analysis, whale tracking, signal processing, market structure analysis, capital flow detection and hybrid AI-assisted analytical trading infrastructures."
        }
    ];

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
                        display: "grid",

                        gridTemplateColumns:
                            isMobile
                                ? "1fr"
                                : isTablet
                                    ? "1fr"
                                    : "360px 1fr",

                        gap:
                            isMobile
                                ? "40px"
                                : isTablet
                                    ? "50px"
                                    : "90px",

                        alignItems: "start"
                    }}
                >

                    {/* LEFT COLUMN */}

                    <div
                        style={{
                            display: "flex",

                            flexDirection: "column",

                            alignItems:
                                isMobile
                                    ? "center"
                                    : "flex-start",

                            textAlign:
                                isMobile
                                    ? "center"
                                    : "left"
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
                                AI Engineer
                            </div>

                            <div>
                                Multimodal AI Architect
                            </div>

                            <div>
                                AI Systems Researcher
                            </div>

                            <div>
                                Data Scientist
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

                                justifyContent:
                                    isMobile
                                        ? "center"
                                        : "flex-start",

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
                                href="https://www.kaggle.com/svetlanarumyantseva7"

                                target="_blank"

                                rel="noopener noreferrer"

                                style={mobileButtonStyle(isMobile)}
                            >
                                Kaggle
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

                    {/* RIGHT COLUMN */}

                    <div>

                        {/* intro */}

                        <div
                            style={{
                                color: "#c9aa82",

                                fontSize:
                                    isMobile
                                        ? "14px"
                                        : isTablet
                                            ? "22px"
                                            : "28px",

                                lineHeight:
                                    isMobile
                                        ? "1.7"
                                        : "1.9",

                                marginBottom:
                                    isMobile
                                        ? "26px"
                                        : "58px",

                                maxWidth: "920px",

                                fontWeight: "500",

                                textAlign:
                                    isMobile
                                        ? "center"
                                        : "left"
                            }}
                        >
                            Designing advanced intelligent AI systems
                            from research and architecture
                            to orchestration, multimodal cognition,
                            deployment infrastructure and scalable
                            production-grade artificial intelligence environments.
                        </div>

                        {/* CARDS */}

                        <div
                            style={{
                                display: "grid",

                                gridTemplateColumns:
                                    isMobile
                                        ? "1fr"
                                        : isTablet
                                            ? "1fr"
                                            : "repeat(2, minmax(0, 1fr))",

                                gap:
                                    isMobile
                                        ? "14px"
                                        : "26px"
                            }}
                        >

                            {cards.map((card) => (

                                <div
                                    key={card.title}

                                    style={{
                                        padding:
                                            isMobile
                                                ? "18px"
                                                : "36px",

                                        borderRadius:
                                            isMobile
                                                ? "18px"
                                                : "30px",

                                        border:
                                            "1px solid rgba(216,176,122,0.16)",

                                        background:
                                            "rgba(10,10,10,0.72)",

                                        backdropFilter:
                                            isMobile
                                                ? "blur(6px)"
                                                : "blur(18px)",

                                        boxShadow:
                                            isMobile
                                                ? "0 0 18px rgba(255,140,0,0.03)"
                                                : "0 0 50px rgba(255,140,0,0.04)"
                                    }}
                                >

                                    <div
                                        style={{
                                            color: "#d8b07a",

                                            fontSize:
                                                isMobile
                                                    ? "15px"
                                                    : isTablet
                                                        ? "20px"
                                                        : "24px",

                                            fontWeight: "700",

                                            marginBottom:
                                                isMobile
                                                    ? "10px"
                                                    : "20px",

                                            fontFamily:
                                                "'Cinzel', serif",

                                            letterSpacing:
                                                isMobile
                                                    ? "0.02em"
                                                    : "0.06em",

                                            lineHeight:
                                                isMobile
                                                    ? "1.4"
                                                    : "1.5"
                                        }}
                                    >
                                        {card.title}
                                    </div>

                                    <div
                                        style={{
                                            color: "#d8d8d8",

                                            fontSize:
                                                isMobile
                                                    ? "12px"
                                                    : isTablet
                                                        ? "18px"
                                                        : "22px",

                                            lineHeight:
                                                isMobile
                                                    ? "1.65"
                                                    : "1.9",

                                            fontWeight: "400"
                                        }}
                                    >
                                        {card.text}
                                    </div>

                                </div>

                            ))}

                        </div>

                    </div>

                </div>

            </div>

        </section>
    );
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