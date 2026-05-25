import {
    useRef,
    useState
} from "react";

import murzikMain from "../assets/murzik/murzik-main.webp";
import svetlanaAvatar from "../assets/murzik/svetlana-avatar.png";
import murzikChat from "../assets/murzik/murzik-chat.png";

export default function HeroBanner() {

    const [language, setLanguage] =
        useState("en");

    const [isPlaying, setIsPlaying] =
        useState(false);

    const audioRef =
        useRef(null);

    const voiceTexts = {

        en:
            "Murzik English runtime enabled.",

        ru:
            "Русский режим Мурзика активирован.",

        fr:
            "Le mode français de Murzik est activé.",

        es:
            "El modo español de Murzik está activado.",

        de:
            "Der deutsche Murzik-Modus wurde aktiviert.",
    };

    function stopMurzikVoice() {

        try {

            if (audioRef.current) {

                audioRef.current.pause();

                audioRef.current.currentTime =
                    0;
            }

            setIsPlaying(false);

        } catch (error) {

            console.error(
                "Murzik audio stop error:",
                error
            );
        }
    }

    async function speakMurzik() {

        try {

            if (!audioRef.current) {

                audioRef.current =
                    new Audio(
                        "/audio/audio_webside.wav"
                    );

                audioRef.current.preload =
                    "metadata";

                audioRef.current.volume =
                    1;

                audioRef.current.onended =
                    () => {

                        setIsPlaying(false);
                    };

                audioRef.current.onerror =
                    (event) => {

                        console.error(
                            "Murzik audio error:",
                            event
                        );

                        setIsPlaying(false);
                    };
            }

            if (isPlaying) {

                stopMurzikVoice();

                return;
            }

            stopMurzikVoice();

            setIsPlaying(true);

            audioRef.current.currentTime =
                0;

            await audioRef.current.play();

            console.log(
                voiceTexts[language]
            );

        } catch (error) {

            console.error(
                "Murzik audio runtime error:",
                error
            );

            setIsPlaying(false);
        }
    }

    return (

        <section className="hero-section">

            <div className="hero-overlay"></div>

            <div className="hero-navbar">

                <div className="hero-logo">
                    GOLDEN DRAGON AI
                </div>

                <div className="hero-nav-center">

                    <button className="hero-nav-btn">
                        Chat
                    </button>

                    <button className="hero-nav-btn">
                        Projects
                    </button>

                    <button className="hero-nav-btn">
                        Presentations
                    </button>

                    <button className="hero-nav-btn">
                        Investor Access
                    </button>

                </div>

                <div className="hero-nav-right">

                    <button
                        className="voice-toggle-btn"
                        onClick={speakMurzik}
                    >
                        {
                            isPlaying
                                ? "Playing..."
                                : "Voice"
                        }
                    </button>

                    <button
                        className="voice-toggle-btn"
                        onClick={stopMurzikVoice}
                    >
                        Stop
                    </button>

                    <div className="hero-language-switcher">

                        <button
                            onClick={() =>
                                setLanguage("en")
                            }
                        >
                            EN
                        </button>

                        <button
                            onClick={() =>
                                setLanguage("ru")
                            }
                        >
                            RU
                        </button>

                        <button
                            onClick={() =>
                                setLanguage("fr")
                            }
                        >
                            FR
                        </button>

                        <button
                            onClick={() =>
                                setLanguage("es")
                            }
                        >
                            ES
                        </button>

                        <button
                            onClick={() =>
                                setLanguage("de")
                            }
                        >
                            DE
                        </button>

                    </div>

                </div>

            </div>

            <div className="hero-container">

                <div className="hero-left">

                    <div className="hero-top-avatar">

                        <img
                            src={murzikChat}
                            alt="Murzik Avatar"
                            className="hero-chat-avatar"
                        />

                        <div>

                            <h1 className="hero-title">
                                Ask Murzik
                            </h1>

                            <h2 className="hero-subtitle">
                                AI Business Assistant • AI Entity • Platform Guide
                            </h2>

                        </div>

                    </div>

                    <p className="hero-description">
                        Welcome to Golden Dragon AI Systems.
                        Murzik will guide you through advanced AI systems,
                        orchestration architectures,
                        multimodal technologies
                        and intelligent platforms.
                    </p>

                    <div className="hero-buttons">

                        <button
                            className="primary-btn"
                            onClick={speakMurzik}
                        >
                            {
                                isPlaying
                                    ? "Murzik Speaking..."
                                    : "Talk With Murzik"
                            }
                        </button>

                        <button className="secondary-btn">
                            Enter AI Chat
                        </button>

                    </div>

                    <div className="hero-founder-mini">

                        <img
                            src={svetlanaAvatar}
                            alt="Svetlana"
                            className="hero-founder-avatar"
                        />

                        <p className="hero-founder-text">
                            AI systems architect and creator of Golden Dragon AI.
                        </p>

                    </div>

                </div>

                <div className="hero-right">

                    <div className="murzik-glow"></div>

                    <div className="smoke-layer"></div>

                    <div className="fire-particles"></div>

                    <div className="cinematic-shadow"></div>

                    <div className="murzik-image-wrapper">

                        <img
                            src={murzikMain}
                            alt="Murzik AI"
                            className="murzik-main"
                            draggable="false"
                        />

                    </div>

                </div>

            </div>

        </section>
    );
}