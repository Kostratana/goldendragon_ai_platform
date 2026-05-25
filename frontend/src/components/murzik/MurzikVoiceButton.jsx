import { useState } from "react";

export default function MurzikVoiceButton() {

    const [isLoading, setIsLoading] =
        useState(false);

    function stopMurzikVoice() {

        /*
        STOP ALL ACTIVE SPEECH
        */

        window.speechSynthesis?.cancel();

        setIsLoading(false);
    }

    async function speakMurzik() {

        try {

            /*
            RESET PREVIOUS
            */

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

            const speech =
                new SpeechSynthesisUtterance(
                    text
                );

            speech.lang =
                "en-US";

            /*
            CLEAN PREMIUM SETTINGS
            */

            speech.rate =
                0.96;

            speech.pitch =
                1;

            speech.volume =
                1;

            /*
            LOAD AVAILABLE VOICES
            */

            let voices =
                synth.getVoices();

            /*
            WAIT FOR VOICES
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
                "Murzik available voices:",
                voices.map(v => v.name)
            );

            /*
            PRIORITY:
            EDGE NEURAL
            ↓
            MAC ALEX
            ↓
            DANIEL
            ↓
            WINDOWS DAVID
            */

            const preferredVoice =

                voices.find((voice) =>
                    voice.name.includes(
                        "Neural"
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
                        "Microsoft David"
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