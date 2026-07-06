import useFounderBreakpoints from "../hooks/useFounderBreakpoints";

import {
    FOOTER_TEXT
} from "../content/footerTexts";

import {
    T
} from "../services/translation";

import {
    GOLD
} from "../theme/colors";

import {
    FONT_CINZEL
} from "../theme/fonts";

export default function Footer() {

    const {
        isMobile,
        isTablet
    } = useFounderBreakpoints();

    return (
        <footer
            style={{
                position: "relative",

                paddingTop:
                    isMobile
                        ? "40px"
                        : isTablet
                            ? "55px"
                            : "70px",

                paddingBottom:
                    isMobile
                        ? "40px"
                        : isTablet
                            ? "55px"
                            : "70px",

                paddingLeft:
                    isMobile
                        ? "20px"
                        : isTablet
                            ? "32px"
                            : "40px",

                paddingRight:
                    isMobile
                        ? "20px"
                        : isTablet
                            ? "32px"
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
                            : isTablet
                                ? "-190px"
                                : "-220px",

                    transform:
                        "translateX(-50%)",

                    width:
                        isMobile
                            ? "320px"
                            : isTablet
                                ? "420px"
                                : "520px",

                    height:
                        isMobile
                            ? "320px"
                            : isTablet
                                ? "420px"
                                : "520px",

                    background:
                        "rgba(255,140,0,0.08)",

                    borderRadius: "9999px",

                    filter:
                        isMobile
                            ? "blur(90px)"
                            : isTablet
                                ? "blur(125px)"
                                : "blur(160px)",

                    opacity:
                        isMobile
                            ? 0.7
                            : isTablet
                                ? 0.85
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
                        color: GOLD,

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
                                : isTablet
                                    ? "0.18em"
                                    : "0.22em",

                        lineHeight:
                            isMobile
                                ? "1.9"
                                : isTablet
                                    ? "2"
                                    : "2.1",

                        textTransform: "uppercase",

                        fontFamily:
                            FONT_CINZEL,

                        maxWidth:
                            isMobile
                                ? "100%"
                                : "900px"
                    }}
                >
                    <span data-no-translate>
                        {
                            FOOTER_TEXT.COPYRIGHT_LINE
                        }
                    </span>
                    <br />
                    <T>
                        {
                            FOOTER_TEXT.RIGHTS_RESERVED
                        }
                    </T>
                </div>

            </div>

        </footer>
    );
}
