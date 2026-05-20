export default function MurzikVoiceButton() {

    const speakMurzik = () => {

        const text =
            "Hello. I am Murzik. I want to be your guide in the world of artificial intelligence and show you our projects. Please enter the chat page.";

        const speech = new SpeechSynthesisUtterance(text);

        const voices = window.speechSynthesis.getVoices();

        const preferredVoice =
            voices.find((voice) =>
                voice.name.toLowerCase().includes("daniel")
            ) ||
            voices.find((voice) =>
                voice.name.toLowerCase().includes("alex")
            ) ||
            voices.find((voice) =>
                voice.lang.includes("en")
            );

        if (preferredVoice) {
            speech.voice = preferredVoice;
        }

        speech.rate = 0.92;
        speech.pitch = 0.8;
        speech.volume = 1;

        window.speechSynthesis.cancel();
        window.speechSynthesis.speak(speech);
    };

    return (
        <button
            onClick={speakMurzik}
            className="
                rounded-2xl
                border
                border-orange-400/30
                bg-black/40
                px-8
                py-4
                text-lg
                font-medium
                text-orange-300
                backdrop-blur-xl
                transition-all
                duration-300
                hover:scale-105
                hover:border-orange-300
                hover:bg-orange-500/10
                hover:text-white
                active:scale-95
            "
        >
            Ask Murzik
        </button>
    );
}