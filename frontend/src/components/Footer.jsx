export default function Footer() {

    const isMobile =
        window.innerWidth < 768;

    const isTablet =
        window.innerWidth >= 768 &&
        window.innerWidth < 1200;

    return (
        <footer
            style={{
                position: "relative",

                paddingTop:
                    isMobile
                        ? "40px"
                        : "70px",

                paddingBottom:
                    isMobile
                        ? "40px"
                        : "70px",

                paddingLeft:
                    isMobile
                        ? "20px"
                        : "40px",

                paddingRight:
                    isMobile
                        ? "20px"
                        : "40px",

                background:
                    "linear-gradient(to bottom, #090603 0%, #050505 100%)",

                borderTop:
                    "1px solid rgba(255,180,120,0.10)",

                overflow: "hidden"
            }}
        >

            {/* glow */}

            <div
                style={{
                    position: "absolute",

                    left: "50%",

                    bottom:
                        isMobile
                            ? "-160px"
                            : "-220px",

                    transform:
                        "translateX(-50%)",

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
                            ? "blur(90px)"
                            : "blur(160px)",

                    opacity:
                        isMobile
                            ? 0.7
                            : 1,

                    pointerEvents: "none"
                }}
            />

            {/* content */}

            <div
                style={{
                    position: "relative",

                    zIndex: 2,

                    display: "flex",

                    justifyContent: "center",

                    alignItems: "center",

                    textAlign: "center"
                }}
            >

                <div
                    style={{
                        color: "#c6a57d",

                        fontSize:
                            isMobile
                                ? "10px"
                                : isTablet
                                    ? "11px"
                                    : "12px",

                        fontWeight: "700",

                        letterSpacing:
                            isMobile
                                ? "0.12em"
                                : "0.22em",

                        lineHeight:
                            isMobile
                                ? "1.9"
                                : "2.1",

                        textTransform: "uppercase",

                        fontFamily:
                            "'Cinzel', serif",

                        maxWidth:
                            isMobile
                                ? "100%"
                                : "900px"
                    }}
                >
                    © 2026 GOLDEN DRAGON AI
                    <br />
                    ALL RIGHTS RESERVED
                </div>

            </div>

        </footer>
    );
}