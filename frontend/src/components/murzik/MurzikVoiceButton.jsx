import { useState } from "react";

export default function MurzikVoiceButton() {

    const [isLoading, setIsLoading] =
        useState(false);

    function stopMurzikVoice() {

        window.speechSynthesis?.cancel();

        setIsLoading(false);
    }

    async function speakMurzik() {

        try {

            stopMurzikVoice();

            if (
                !window.speechSynthesis
            ) {

                console.error(
                    "Speech synthesis not supported"
                );

                return;
            }

            setIsLoading(true);

            const synth =
                window.speechSynthesis;

            /*
            SHORT CLEAN INTRO
            */

            const text =
                `
                Hello.

                I am Murzik.

                AI assistant
                of Svetlana Rumyantseva.

                Welcome to our
                artificial intelligence platform.

                Open the chat
                to explore our systems.
                `;

            const speech =
                new SpeechSynthesisUtterance(
                    text
                );

            speech.lang =
                "en-US";

            /*
            GOOGLE MALE SETTINGS
            */

            speech.rate =
                0.92;

            speech.pitch =
                0.82;

            speech.volume =
                1;

            let voices =
                synth.getVoices();

            /*
            WAIT VOICES
            */

            if (
                voices.length === 0
            ) {

                await new Promise(
                    (resolve) => {

                        synth.onvoiceschanged =
                            () => {

                                voices =
                                    synth.getVoices();

                                resolve();
                            };

                        setTimeout(
                            resolve,
                            1200
                        );
                    }
                );

                voices =
                    synth.getVoices();
            }

            console.log(
                "Murzik voices:",
                voices.map(v => v.name)
            );

            /*
            GOOGLE MALE PRIORITY
            */

            const preferredVoice =

                voices.find((voice) =>
                    voice.name.includes(
                        "Google UK English Male"
                    )
                ) ||

                voices.find((voice) =>
                    voice.name.includes(
                        "Google US English"
                    )
                ) ||

                voices.find((voice) =>
                    voice.name.includes(
                        "Alex"
                    )
                ) ||

                voices.find((voice) =>
                    voice.name.includes(
                        "Daniel"
                    )
                ) ||

                voices.find((voice) =>
                    voice.name.includes(
                        "Male"
                    )
                ) ||

                voices.find((voice) =>
                    voice.lang ===
                    "en-US"
                ) ||

                voices[0];

            if (
                preferredVoice
            ) {

                speech.voice =
                    preferredVoice;

                console.log(
                    "Murzik selected voice:",
                    preferredVoice.name
                );
            }

            speech.onstart = () => {

                console.log(
                    "Murzik voice started"
                );
            };

            speech.onend = () => {

                console.log(
                    "Murzik voice ended"
                );

                setIsLoading(false);
            };

            speech.onerror = (
                error
            ) => {

                console.error(
                    "Murzik voice error:",
                    error
                );

                setIsLoading(false);
            };

            /*
            PREVENT OVERLAP GLITCH
            */

            await new Promise(resolve =>
                setTimeout(resolve, 180)
            );

            synth.speak(
                speech
            );

        } catch (error) {

            console.error(
                "Murzik runtime error:",
                error
            );

            setIsLoading(false);
        }
    }

    return (

        <div
            className="
                flex
                items-center
                gap-3
            "
        >

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

                {
                    isLoading
                        ? "Murzik Speaking..."
                        : "Ask Murzik"
                }

            </button>

            <button
                onClick={stopMurzikVoice}

                className="
                    rounded-2xl
                    border
                    border-red-400/20
                    bg-red-500/5
                    px-6
                    py-4
                    text-lg
                    font-medium
                    text-red-300
                    backdrop-blur-xl
                    transition-all
                    duration-300
                    hover:scale-[1.03]
                    hover:border-red-300/60
                    hover:bg-red-500/10
                    hover:text-white
                    active:scale-95
                    shadow-[0_0_30px_rgba(255,80,80,0.08)]
                "
            >
                Stop
            </button>

        </div>
    );
}