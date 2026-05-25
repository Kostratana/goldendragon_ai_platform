import founderImage from "../assets/murzik/doc_photo.webp";

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
                "Development of advanced AI architectures and scalable intelligent ecosystems including orchestration layers, adaptive reasoning systems, multimodal processing pipelines, distributed runtime coordination and production-grade cognitive infrastructures for next-generation AI platforms."
        },

        {
            title: "AI Orchestration Systems",

            text:
                "Design of orchestration-driven intelligence systems capable of dynamic model routing, task distribution, memory coordination, execution planning, realtime synchronization and hybrid cognitive workflow management across complex AI environments."
        },

        {
            title: "End-to-End AI Development",

            text:
                "Full-cycle creation of intelligent software solutions from concept research and system architecture to model training, backend engineering, deployment infrastructure, optimization and scalable production implementation tailored to specific client goals."
        },

        {
            title: "Custom AI Solutions",

            text:
                "Development of custom AI systems designed around real client ideas, workflows and business objectives including analytical platforms, intelligent assistants, automation systems, recommendation engines and adaptive AI applications across multiple industries."
        },

        {
            title: "Computer Vision",

            text:
                "Creation of advanced computer vision systems including OCR pipelines, medical imaging analysis, infrared diagnostics, intelligent object detection, visual overlays, automated inspection platforms, video understanding and multimodal perception infrastructures."
        },

        {
            title: "Multimodal AI Systems",

            text:
                "Engineering of unified multimodal intelligence platforms combining text, image, audio and video processing with collaborative reasoning layers, orchestration logic, adaptive memory systems and scalable cognitive runtime architectures."
        },

        {
            title: "Voice & Conversational AI",

            text:
                "Development of intelligent conversational agents, realtime voice interfaces, multimodal communication environments, speech-driven assistants and interactive AI systems designed for natural human interaction and advanced user experiences."
        },

        {
            title: "Security & Detection Systems",

            text:
                "Design of intelligent monitoring and detection infrastructures including anomaly analysis, behavioral pattern recognition, fraud detection, inspection systems, adaptive alert pipelines and AI-powered analytical security environments."
        },

        {
            title: "Trading Intelligence Systems",

            text:
                "Development of AI-powered analytical trading systems focused on liquidity analysis, whale activity monitoring, market structure evaluation, signal orchestration, capital flow analytics and adaptive predictive intelligence infrastructures."
        },

        {
            title: "Quantum Hybrid AI Research",

            text:
                "Research and prototyping of quantum-inspired hybrid intelligence systems combining classical machine learning, orchestration research, graph optimization, adaptive scheduling, cognitive routing and advanced coordination architectures for future AI infrastructures."
        },

        {
            title: "AGI Research Systems",

            text:
                "Exploration of next-generation AGI-oriented architectures integrating multimodal cognition, autonomous reasoning, adaptive memory systems, orchestration intelligence and collaborative AI runtime ecosystems for advanced intelligent platforms."
        },

        {
            title: "Scientific & Research AI",

            text:
                "Development of AI systems for scientific and analytical domains including genetics, biological data analysis, healthcare intelligence, research automation, multimodal analytics and advanced cognitive processing for complex research environments."
        },

        {
            title: "Human-Centered AI",

            text:
                "I truly love my work and believe that artificial intelligence should serve people, improve everyday life and make advanced technology accessible and useful for everyone. That is why I focus on creating practical, human-centered AI systems and intelligent applications designed around real human needs, ideas and goals. I would be happy to help transform your ideas into real intelligent systems and AI solutions designed specifically for you."
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
                            Development of next-generation multimodal AI ecosystems combining orchestration intelligence, adaptive cognitive architectures, computer vision, conversational agents, hybrid reasoning systems and scalable AGI-oriented runtime infrastructures for advanced intelligent platforms.
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