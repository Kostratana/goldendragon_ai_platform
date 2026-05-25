import { useRef, useState } from "react";

export default function MurzikVoiceButton() {

    const audioRef =
        useRef(null);

    const [isPlaying, setIsPlaying] =
        useState(false);

    function stopMurzikVoice() {

        if (!audioRef.current) {
            return;
        }

        audioRef.current.pause();

        audioRef.current.currentTime =
            0;

        setIsPlaying(false);
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
                    (error) => {

                        console.error(
                            "Murzik audio error:",
                            error
                        );

                        setIsPlaying(false);
                    };
            }

            if (isPlaying) {

                stopMurzikVoice();

                return;
            }

            setIsPlaying(true);

            audioRef.current.currentTime =
                0;

            await audioRef.current.play();

        } catch (error) {

            console.error(
                "Murzik runtime error:",
                error
            );

            setIsPlaying(false);
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
                "
            >

                {
                    isPlaying
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