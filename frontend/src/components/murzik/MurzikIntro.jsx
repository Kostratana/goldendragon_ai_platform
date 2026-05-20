import {
    useEffect,
    useRef
} from "react";

export default function MurzikIntro({
    enabled = false
}) {

    const hasPlayedRef =
        useRef(false);

    useEffect(() => {

        /* STRICT MANUAL ONLY */

        if (!enabled) {

            hasPlayedRef.current =
                false;

            if (
                window.speechSynthesis
            ) {

                window.speechSynthesis.cancel();

            }

            return;
        }

        if (
            hasPlayedRef.current
        ) {
            return;
        }

        hasPlayedRef.current =
            true;

        if (
            !window.speechSynthesis
        ) {
            return;
        }

        const synth =
            window.speechSynthesis;

        synth.cancel();

        const text = `
        Hello.

        I am Murzik.

        Personal AI business assistant
        of Svetlana Rumyantseva.

        I will guide you
        through the world
        of artificial intelligence.

        I will introduce
        advanced AI systems,
        hybrid intelligence architectures,
        multimodal technologies,
        orchestration pipelines,
        computer vision systems
        and intelligent assistants.

        You can explore
        implemented AI projects,
        MVP platforms,
        research systems
        and scalable AI solutions.

        To request access
        to private MVP demonstrations,
        please contact
        Svetlana directly by email.

        For now,
        feel free to open
        the chat page
        or visit the projects section.

        Thank you
        for your attention.
        `;

        const utterance =
            new SpeechSynthesisUtterance(
                text
            );

        utterance.lang =
            "en-US";

        /* CLEANER SOFT AI VOICE */

        utterance.rate = 0.78;

        utterance.pitch = 0.32;

        utterance.volume = 1;

        const loadVoices = () => {

            const voices =
                synth.getVoices();

            const preferredVoice =

                voices.find(
                    (voice) =>
                        voice.name.includes(
                            "Google UK English Male"
                        )
                ) ||

                voices.find(
                    (voice) =>
                        voice.name.includes(
                            "Daniel"
                        )
                ) ||

                voices.find(
                    (voice) =>
                        voice.name.includes(
                            "Alex"
                        )
                ) ||

                voices.find(
                    (voice) =>
                        voice.name.includes(
                            "Microsoft David"
                        )
                ) ||

                voices.find(
                    (voice) =>
                        voice.name.includes(
                            "Google US English"
                        )
                ) ||

                voices.find(
                    (voice) =>
                        voice.name.includes(
                            "Male"
                        )
                );

            if (
                preferredVoice
            ) {

                utterance.voice =
                    preferredVoice;

            }

            synth.speak(
                utterance
            );
        };

        if (
            synth.getVoices()
                .length > 0
        ) {

            loadVoices();

        } else {

            synth.onvoiceschanged =
                loadVoices;

            /* MOBILE SAFARI FIX */

            setTimeout(() => {

                loadVoices();

            }, 250);
        }

        return () => {

            synth.cancel();

        };

    }, [enabled]);

    return null;
}