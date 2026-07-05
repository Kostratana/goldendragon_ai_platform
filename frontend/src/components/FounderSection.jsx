import {
    useEffect,
    useMemo
} from "react";

import founderImage from "../assets/murzik/doc_photo.webp";

import { Link } from "react-router-dom";

import { CONTACT_LINKS } from "../constants/links";

import {
    DECLARATION_PARAGRAPHS,
    FOUNDER_BRANDS,
    FOUNDER_TEXT,
    FOUNDER_TEXT_VALUES
} from "../content/founderTexts";

import useFounderBreakpoints from "../hooks/useFounderBreakpoints";

import {
    T,
    useTranslatedText,
    useLanguage,
    useTranslate,
    DEFAULT_LANGUAGE
} from "../services/translation";

import {
    GOLD,
    TEXT,
    BACKGROUND_DARK
} from "../theme/colors";

import {
    FONT_CINZEL,
    FONT_CINZEL_DECORATIVE,
    FONT_IM_FELL
} from "../theme/fonts";

import {
    CONTENT_MAX_WIDTH,
    FULL_WIDTH_BOX,
    OUTER_MAX_WIDTH
} from "../theme/layout";

import {
    CTA_LINK_STYLE
} from "../theme/linkStyles";

const CONTACT_BUTTONS = [
    {
        id: "github",
        href:
            CONTACT_LINKS.GITHUB,
        label:
            FOUNDER_BRANDS.GITHUB,
        isBrand: true
    },
    {
        id: "linkedin",
        href:
            CONTACT_LINKS.LINKEDIN,
        label:
            FOUNDER_BRANDS.LINKEDIN,
        isBrand: true
    },
    {
        id: "email",
        href:
            CONTACT_LINKS.EMAIL,
        label:
            FOUNDER_TEXT.BUTTON_EMAIL,
        isBrand: false
    }
];

function getStackSectionMarginTop(
    isMobile,
    isTablet
) {

    if (isMobile) {
        return "54px";
    }

    if (isTablet) {
        return "70px";
    }

    return "90px";
}

function getHeroTitleMarginBottom(
    isMobile,
    isTablet
) {

    if (isMobile) {
        return "42px";
    }

    if (isTablet) {
        return "50px";
    }

    return "58px";
}

export default function FounderSection() {

    const {
        isMobile,
        isTablet
    } = useFounderBreakpoints();

    const {
        language
    } = useLanguage();

    const {
        t: translateFounderText
    } = useTranslate();

    const founderPortraitAlt =
        useTranslatedText(
            FOUNDER_TEXT.ALT_PORTRAIT
        );

    useEffect(() => {

        if (
            language ===
                DEFAULT_LANGUAGE
        ) {
            return;
        }

        const warmupTasks = [

            ...DECLARATION_PARAGRAPHS.map(
                ({
                    text,
                    values
                }) =>
                    translateFounderText(
                        text,
                        values ||
                            null
                    )
            ),

            translateFounderText(
                FOUNDER_TEXT.SUBTITLE_LINE_1
            ),

            translateFounderText(
                FOUNDER_TEXT.SUBTITLE_LINE_2
            ),

            translateFounderText(
                FOUNDER_TEXT.DECLARATION_HEADING,
                FOUNDER_TEXT_VALUES.DECLARATION_HEADING
            ),

            translateFounderText(
                FOUNDER_TEXT.CTA_HEADING
            ),

            translateFounderText(
                FOUNDER_TEXT.CTA_CONVERSATION
            ),

            translateFounderText(
                FOUNDER_TEXT.CTA_READY,
                FOUNDER_TEXT_VALUES.CTA_READY
            ),

            translateFounderText(
                FOUNDER_TEXT.CTA_PROJECT
            ),

            translateFounderText(
                FOUNDER_TEXT.CTA_CONTACT_PREFIX
            ),

            translateFounderText(
                FOUNDER_TEXT.CTA_EMAIL_LINK
            ),

            translateFounderText(
                FOUNDER_TEXT.CTA_CONTACT_AFTER_EMAIL
            ),

            translateFounderText(
                FOUNDER_TEXT.CTA_CONTACT_AFTER_CHAT
            ),

            translateFounderText(
                FOUNDER_TEXT.CTA_TRANSFORM
            ),

            translateFounderText(
                FOUNDER_TEXT.FOUNDER_ROLE
            ),

            translateFounderText(
                FOUNDER_TEXT.FOUNDER_OWNER,
                FOUNDER_TEXT_VALUES.FOUNDER_OWNER
            ),

            translateFounderText(
                FOUNDER_TEXT.BUTTON_EMAIL
            ),

            translateFounderText(
                FOUNDER_TEXT.ALT_PORTRAIT
            )
        ];

        Promise.all(
            warmupTasks
        ).catch(
            (error) => {

                console.error(
                    "Founder translation warmup failed:",
                    error
                );
            }
        );

    }, [
        language,
        translateFounderText
    ]);

    const paragraphStyle =
        useMemo(
            () =>
                declarationParagraphStyle(
                    isMobile,
                    isTablet
                ),
            [
                isMobile,
                isTablet
            ]
        );

    const headingStyle =
        useMemo(
            () =>
                declarationHeadingStyle(
                    isMobile,
                    isTablet
                ),
            [
                isMobile,
                isTablet
            ]
        );

    const heroTitleStyle =
        useMemo(
            () =>
                animatedHeroTitleStyle(
                    isMobile,
                    isTablet,
                    "title"
                ),
            [
                isMobile,
                isTablet
            ]
        );

    const heroSubtitleStyle =
        useMemo(
            () =>
                animatedHeroTitleStyle(
                    isMobile,
                    isTablet,
                    "subtitle"
                ),
            [
                isMobile,
                isTablet
            ]
        );

    const buttonStyle =
        useMemo(
            () =>
                mobileButtonStyle(
                    isMobile
                ),
            [isMobile]
        );

    const sectionStyle =
        useMemo(
            () => ({
                position: "relative",
                ...FULL_WIDTH_BOX,
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
                fontFamily: FONT_IM_FELL,
                overflow: "hidden"
            }),
            [isMobile]
        );

    const ambientGlowStyle =
        useMemo(
            () => ({
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
            }),
            [isMobile]
        );

    const contentColumnStyle =
        useMemo(
            () => ({
                ...FULL_WIDTH_BOX,
                maxWidth:
                    CONTENT_MAX_WIDTH,
                margin: "0 auto",
                textAlign: "center"
            }),
            []
        );

    const stackSectionStyle =
        useMemo(
            () => ({
                ...contentColumnStyle,
                margin: `${getStackSectionMarginTop(
                    isMobile,
                    isTablet
                )} auto 0`
            }),
            [
                contentColumnStyle,
                isMobile,
                isTablet
            ]
        );

    const founderBlockStyle =
        useMemo(
            () => ({
                marginTop:
                    getStackSectionMarginTop(
                        isMobile,
                        isTablet
                    ),
                ...FULL_WIDTH_BOX,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center"
            }),
            [
                isMobile,
                isTablet
            ]
        );

    const ctaHeadingStyle =
        useMemo(
            () => ({
                ...headingStyle,
                marginTop: 0,
                marginBottom:
                    isMobile
                        ? "18px"
                        : "28px"
            }),
            [
                headingStyle,
                isMobile
            ]
        );

    const ctaTransformStyle =
        useMemo(
            () => ({
                ...paragraphStyle,
                fontSize:
                    isMobile
                        ? "19px"
                        : isTablet
                            ? "21px"
                            : "27px",
                color: GOLD,
                fontWeight: "700",
                marginBottom: 0
            }),
            [
                paragraphStyle,
                isMobile,
                isTablet
            ]
        );

    const heroTitleBlockStyle =
        useMemo(
            () => ({
                ...FULL_WIDTH_BOX,
                overflow: "visible",
                marginBottom:
                    getHeroTitleMarginBottom(
                        isMobile,
                        isTablet
                    )
            }),
            [
                isMobile,
                isTablet
            ]
        );

    const outerContainerStyle =
        useMemo(
            () => ({
                maxWidth:
                    OUTER_MAX_WIDTH,
                margin: "0 auto",
                position: "relative",
                zIndex: 2
            }),
            []
        );

    const mainStackStyle =
        useMemo(
            () => ({
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                ...FULL_WIDTH_BOX
            }),
            []
        );

    const avatarWrapperStyle =
        useMemo(
            () => ({
                width:
                    isMobile
                        ? "150px"
                        : "220px",
                height:
                    isMobile
                        ? "150px"
                        : "220px",
                borderRadius:
                    "9999px",
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
            }),
            [isMobile]
        );

    const avatarInnerStyle =
        useMemo(
            () => ({
                width: "100%",
                height: "100%",
                borderRadius:
                    "9999px",
                overflow:
                    "hidden",
                background:
                    BACKGROUND_DARK
            }),
            []
        );

    const avatarImageStyle =
        useMemo(
            () => ({
                width: "100%",
                height: "100%",
                objectFit: "cover"
            }),
            []
        );

    const founderInfoStyle =
        useMemo(
            () => ({
                marginTop:
                    isMobile
                        ? "18px"
                        : "34px",
                display: "flex",
                flexDirection:
                    "column",
                gap:
                    isMobile
                        ? "8px"
                        : "14px",
                color: TEXT,
                fontSize:
                    isMobile
                        ? "12px"
                        : isTablet
                            ? "15px"
                            : "18px",
                fontWeight:
                    "600",
                lineHeight:
                    isMobile
                        ? "1.6"
                        : "1.55",
                letterSpacing:
                    isMobile
                        ? "0.08em"
                        : "0.18em",
                textTransform:
                    "uppercase",
                fontFamily:
                    FONT_IM_FELL
            }),
            [
                isMobile,
                isTablet
            ]
        );

    const founderNameStyle =
        useMemo(
            () => ({
                fontSize:
                    isMobile
                        ? "15px"
                        : isTablet
                            ? "17px"
                            : "20px",
                color: GOLD,
                margin: 0
            }),
            [
                isMobile,
                isTablet
            ]
        );

    const zeroMarginStyle =
        useMemo(
            () => ({
                margin: 0
            }),
            []
        );

    const contactButtonsRowStyle =
        useMemo(
            () => ({
                marginTop:
                    isMobile
                        ? "18px"
                        : "38px",
                ...FULL_WIDTH_BOX,
                display: "flex",
                flexWrap: "wrap",
                justifyContent:
                    "center",
                gap:
                    isMobile
                        ? "8px"
                        : "14px"
            }),
            [isMobile]
        );

    return (
        <section
            style={sectionStyle}
            aria-labelledby="founder-hero-title"
        >

            <div
                style={ambientGlowStyle}
                aria-hidden="true"
            />

            <div style={outerContainerStyle}>

                <div style={mainStackStyle}>

                    <div
                        style={
                            contentColumnStyle
                        }
                    >

                        <div
                            style={
                                heroTitleBlockStyle
                            }
                        >

                            <h1
                                id="founder-hero-title"
                                className="gd-ancient-ink-text"
                                style={
                                    heroTitleStyle
                                }
                            >
                                <T brand>
                                    {
                                        FOUNDER_BRANDS.GOLDEN_DRAGON_AI_STUDIO
                                    }
                                </T>
                            </h1>

                            <p
                                className="gd-ancient-ink-text"
                                style={
                                    heroSubtitleStyle
                                }
                            >
                                <T>
                                    {
                                        FOUNDER_TEXT.SUBTITLE_LINE_1
                                    }
                                </T>
                                <br />
                                <T>
                                    {
                                        FOUNDER_TEXT.SUBTITLE_LINE_2
                                    }
                                </T>
                            </p>

                        </div>

                        <h2
                            style={
                                headingStyle
                            }
                        >
                            <T
                                values={
                                    FOUNDER_TEXT_VALUES.DECLARATION_HEADING
                                }
                            >
                                {
                                    FOUNDER_TEXT.DECLARATION_HEADING
                                }
                            </T>
                        </h2>

                        {DECLARATION_PARAGRAPHS.map(
                            ({
                                id,
                                text,
                                values,
                                isLast
                            }) => (

                                <FounderParagraph
                                    key={id}
                                    style={
                                        isLast
                                            ? {
                                                ...paragraphStyle,
                                                marginBottom: 0
                                            }
                                            : paragraphStyle
                                    }
                                    values={
                                        values
                                    }
                                >
                                    {text}
                                </FounderParagraph>

                            )
                        )}

                    </div>

                    <div
                        style={
                            stackSectionStyle
                        }
                    >

                        <h2
                            style={
                                ctaHeadingStyle
                            }
                        >
                            <T>
                                {
                                    FOUNDER_TEXT.CTA_HEADING
                                }
                            </T>
                        </h2>

                        <FounderParagraph
                            style={
                                paragraphStyle
                            }
                        >
                            {
                                FOUNDER_TEXT.CTA_CONVERSATION
                            }
                        </FounderParagraph>

                        <FounderParagraph
                            style={
                                paragraphStyle
                            }
                            values={
                                FOUNDER_TEXT_VALUES.CTA_READY
                            }
                        >
                            {
                                FOUNDER_TEXT.CTA_READY
                            }
                        </FounderParagraph>

                        <FounderParagraph
                            style={
                                paragraphStyle
                            }
                        >
                            {
                                FOUNDER_TEXT.CTA_PROJECT
                            }
                        </FounderParagraph>

                        <p
                            style={
                                paragraphStyle
                            }
                        >
                            <T>
                                {
                                    FOUNDER_TEXT.CTA_CONTACT_PREFIX
                                }
                            </T>
                            <a
                                href={
                                    CONTACT_LINKS.EMAIL
                                }
                                target="_blank"
                                rel="noopener noreferrer"
                                style={
                                    CTA_LINK_STYLE
                                }
                            >
                                <T>
                                    {
                                        FOUNDER_TEXT.CTA_EMAIL_LINK
                                    }
                                </T>
                            </a>
                            <T>
                                {
                                    FOUNDER_TEXT.CTA_CONTACT_AFTER_EMAIL
                                }
                            </T>
                            <Link
                                to="/chat"
                                style={
                                    CTA_LINK_STYLE
                                }
                            >
                                <T brand>
                                    {
                                        FOUNDER_BRANDS.DRAGON_CHAT
                                    }
                                </T>
                            </Link>
                            <T>
                                {
                                    FOUNDER_TEXT.CTA_CONTACT_AFTER_CHAT
                                }
                            </T>
                        </p>

                        <FounderParagraph
                            style={
                                ctaTransformStyle
                            }
                        >
                            {
                                FOUNDER_TEXT.CTA_TRANSFORM
                            }
                        </FounderParagraph>

                    </div>

                    <div
                        style={
                            founderBlockStyle
                        }
                    >

                        <div
                            style={
                                avatarWrapperStyle
                            }
                        >

                            <div
                                style={
                                    avatarInnerStyle
                                }
                            >

                                <img
                                    src={
                                        founderImage
                                    }
                                    alt={
                                        founderPortraitAlt
                                    }
                                    width={
                                        220
                                    }
                                    height={
                                        220
                                    }
                                    loading="lazy"
                                    decoding="async"
                                    style={
                                        avatarImageStyle
                                    }
                                />

                            </div>

                        </div>

                        <div
                            style={
                                founderInfoStyle
                            }
                        >

                            <p
                                style={
                                    founderNameStyle
                                }
                            >
                                <T brand>
                                    {
                                        FOUNDER_BRANDS.FOUNDER_NAME
                                    }
                                </T>
                            </p>

                            <p
                                style={
                                    zeroMarginStyle
                                }
                            >
                                <T>
                                    {
                                        FOUNDER_TEXT.FOUNDER_ROLE
                                    }
                                </T>
                            </p>

                            <p
                                style={
                                    zeroMarginStyle
                                }
                            >
                                <T
                                    values={
                                        FOUNDER_TEXT_VALUES.FOUNDER_OWNER
                                    }
                                >
                                    {
                                        FOUNDER_TEXT.FOUNDER_OWNER
                                    }
                                </T>
                            </p>

                        </div>

                        <div
                            style={
                                contactButtonsRowStyle
                            }
                        >

                            {CONTACT_BUTTONS.map(
                                ({
                                    id,
                                    href,
                                    label,
                                    isBrand
                                }) => (

                                    <a
                                        key={
                                            id
                                        }
                                        href={
                                            href
                                        }
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        style={
                                            buttonStyle
                                        }
                                    >
                                        {isBrand ? (
                                            <T brand>
                                                {
                                                    label
                                                }
                                            </T>
                                        ) : (
                                            <T>
                                                {
                                                    label
                                                }
                                            </T>
                                        )}
                                    </a>

                                )
                            )}

                        </div>

                    </div>

                </div>

            </div>

        </section>
    );
}

function FounderParagraph({
    style,
    values,
    children
}) {

    return (
        <p style={style}>
            {values ? (
                <T
                    values={
                        values
                    }
                >
                    {children}
                </T>
            ) : (
                <T>
                    {children}
                </T>
            )}
        </p>
    );
}

function declarationHeadingStyle(
    isMobile,
    isTablet
) {

    return {
        color: GOLD,
        fontSize:
            isMobile
                ? "24px"
                : isTablet
                    ? "30px"
                    : "40px",
        fontWeight: "700",
        fontFamily: FONT_CINZEL,
        letterSpacing:
            isMobile
                ? "0"
                : "0.06em",
        lineHeight:
            isMobile
                ? "1.45"
                : 1.5,
        marginTop: 0,
        marginBottom:
            isMobile
                ? "14px"
                : "18px",
        ...FULL_WIDTH_BOX
    };
}

function declarationParagraphStyle(
    isMobile,
    isTablet
) {

    return {
        color: TEXT,
        fontSize:
            isMobile
                ? "16px"
                : isTablet
                    ? "19px"
                    : "23px",
        lineHeight:
            isMobile
                ? "1.88"
                : "2.08",
        fontWeight: "500",
        fontFamily: FONT_IM_FELL,
        marginTop: 0,
        marginBottom:
            isMobile
                ? "16px"
                : "26px",
        ...FULL_WIDTH_BOX
    };
}

function animatedHeroTitleStyle(
    isMobile,
    isTablet,
    variant
) {

    const isTitle =
        variant === "title";

    return {
        color: GOLD,
        fontFamily:
            FONT_CINZEL_DECORATIVE,
        fontWeight:
            isTitle
                ? "700"
                : "400",
        fontSize:
            isTitle
                ? isMobile
                    ? "26px"
                    : isTablet
                        ? "34px"
                        : "44px"
                : isMobile
                    ? "14px"
                    : isTablet
                        ? "16px"
                        : "18px",
        letterSpacing:
            isTitle
                ? isMobile
                    ? "0.02em"
                    : isTablet
                        ? "0.06em"
                        : "0.08em"
                : isMobile
                    ? "0.01em"
                    : "0.03em",
        lineHeight:
            isTitle
                ? isMobile
                    ? "1.4"
                    : "1.45"
                : isMobile
                    ? "1.55"
                    : "1.6",
        margin: 0,
        marginTop:
            isTitle
                ? 0
                : isMobile
                    ? "10px"
                    : "14px",
        maxWidth:
            isTitle
                ? undefined
                : "640px",
        marginInline:
            isTitle
                ? undefined
                : "auto",
        ...FULL_WIDTH_BOX
    };
}

function mobileButtonStyle(
    isMobile
) {

    return {
        height:
            isMobile
                ? "38px"
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
        color: GOLD,
        textDecoration: "none",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontWeight: "700",
        transition: "0.3s",
        cursor: "pointer",
        boxShadow:
            "0 0 30px rgba(255,140,0,0.04)",
        fontFamily: FONT_CINZEL,
        fontSize:
            isMobile
                ? "11px"
                : "14px",
        letterSpacing:
            isMobile
                ? "0.06em"
                : "0.14em"
    };
}
