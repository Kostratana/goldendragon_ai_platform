import { useState } from "react";

export default function MurzikVoiceButton() {

    const [isLoading, setIsLoading] =
        useState(false);

    async function speakMurzik() {

        /*
        STOP PREVIOUS AUDIO
        */

        window.speechSynthesis?.cancel();

        const existingAudio =
            document.getElementById(
                "murzik-openai-audio"
            );

        if (existingAudio) {

            existingAudio.pause();

            existingAudio.remove();
        }

        try {

            setIsLoading(true);

            const text =
                `
                Hello.

                I am Murzik.

                Personal AI business assistant
                of Svetlana Rumyantseva.

                I want to guide you
                through the world
                of artificial intelligence
                and present our AI systems,
                multimodal technologies
                and orchestration platforms.

                Please open
                the chat page
                to explore our projects.
                `;

            /*
            OPENAI TTS
            */

            const response =
                await fetch(
                    "https://api.openai.com/v1/audio/speech",
                    {

                        method: "POST",

                        headers: {

                            "Content-Type":
                                "application/json",

                            Authorization:
                                `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`
                        },

                        body: JSON.stringify({

                            model: "gpt-4o-mini-tts",

                            /*
                            LOW DEEP MALE VOICE
                            */

                            voice: "onyx",

                            input: text,

                            format: "mp3",

                            speed: 0.92
                        })
                    }
                );

            if (!response.ok) {

                throw new Error(
                    "OpenAI voice request failed"
                );
            }

            const audioBlob =
                await response.blob();

            const audioUrl =
                URL.createObjectURL(
                    audioBlob
                );

            const audio =
                new Audio(audioUrl);

            audio.id =
                "murzik-openai-audio";

            audio.volume = 1;

            audio.onended = () => {

                URL.revokeObjectURL(
                    audioUrl
                );

                setIsLoading(false);
            };

            audio.onerror = () => {

                setIsLoading(false);
            };

            await audio.play();

        } catch (error) {

            console.error(
                "Murzik OpenAI voice error:",
                error
            );

            setIsLoading(false);
        }
    }

    return (

        <button
            onClick={speakMurzik}

            disabled={isLoading}

            className="
                rounded-2xl
                border
                border-orange-400/20
                bg-black/35
                px-8
                py-4
                text-lg
                font-medium
                text-orange-300
                backdrop-blur-xl
                transition-all
                duration-300
                hover:scale-[1.03]
                hover:border-orange-300/60
                hover:bg-orange-500/10
                hover:text-white
                active:scale-95
                shadow-[0_0_30px_rgba(255,140,0,0.08)]
                disabled:opacity-60
                disabled:cursor-not-allowed
            "
        >

            {isLoading
                ? "Murzik Speaking..."
                : "Ask Murzik"}

        </button>
    );
}