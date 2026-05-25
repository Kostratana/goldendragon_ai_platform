import { motion } from "framer-motion";

import murzikImage from "../../assets/murzik/murzik-main.webp";
import murzikSmokeVideo from "../../assets/murzik/murzik-smoke-v2.mp4";

import MurzikVoiceButton from "./MurzikVoiceButton";

export default function MurzikHero() {

    const particles = [
        {
            left: "10%",
            delay: 0,
            duration: 15,
        },
        {
            left: "24%",
            delay: 1.2,
            duration: 17,
        },
        {
            left: "39%",
            delay: 2.4,
            duration: 16,
        },
        {
            left: "55%",
            delay: 0.8,
            duration: 18,
        },
        {
            left: "71%",
            delay: 1.8,
            duration: 16,
        },
        {
            left: "88%",
            delay: 3,
            duration: 19,
        },
    ];

    return (

        <section
            className="
                relative
                h-[820px]
                overflow-hidden
                bg-[#050505]
            "
        >

            {/* animated ambient background */}
            <motion.div
                animate={{
                    opacity: [0.38, 0.58, 0.38],
                }}
                transition={{
                    duration: 12,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                className="
                    absolute
                    inset-0
                    bg-[radial-gradient(circle_at_70%_35%,rgba(255,140,0,0.20),transparent_44%)]
                "
            />

            {/* cinematic overlay */}
            <div
                className="
                    absolute
                    inset-0
                    bg-gradient-to-b
                    from-black/40
                    via-black/10
                    to-[#050505]
                "
            />

            {/* optimized floating particles */}
            <div
                className="
                    absolute
                    inset-0
                    overflow-hidden
                    pointer-events-none
                "
            >

                {particles.map((particle, i) => (

                    <motion.div
                        key={i}
                        animate={{
                            y: [0, -760],
                            opacity: [0, 0.75, 0],
                        }}
                        transition={{
                            duration: particle.duration,
                            repeat: Infinity,
                            ease: "linear",
                            delay: particle.delay,
                        }}
                        className="
                            absolute
                            bottom-[-90px]
                            h-[3px]
                            w-[3px]
                            rounded-full
                            bg-orange-300/55
                        "
                        style={{
                            left: particle.left,
                        }}
                    />

                ))}

            </div>

            {/* content */}
            <div
                className="
                    relative
                    z-[10]
                    mx-auto
                    flex
                    h-full
                    max-w-[1650px]
                    items-center
                    justify-between
                    px-20
                "
            >

                {/* LEFT */}
                <div
                    className="
                        relative
                        z-30
                        max-w-[720px]
                    "
                >

                    <motion.h1
                        initial={{
                            opacity: 0,
                            y: 36,
                        }}
                        animate={{
                            opacity: 1,
                            y: 0,
                        }}
                        transition={{
                            duration: 1.1,
                        }}
                        className="
                            text-[110px]
                            font-black
                            leading-[0.88]
                            tracking-[-0.06em]
                            text-white
                        "
                    >
                        MURZIK
                    </motion.h1>

                    <motion.div
                        animate={{
                            opacity: [0.7, 1, 0.7],
                        }}
                        transition={{
                            duration: 5,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                        className="
                            mt-7
                            h-[2px]
                            w-[210px]
                            bg-gradient-to-r
                            from-orange-400
                            via-orange-300
                            to-transparent
                        "
                    />

                    <motion.p
                        initial={{
                            opacity: 0,
                        }}
                        animate={{
                            opacity: 1,
                        }}
                        transition={{
                            delay: 0.5,
                            duration: 1.1,
                        }}
                        className="
                            mt-12
                            max-w-[620px]
                            text-[22px]
                            font-light
                            leading-[1.9]
                            tracking-[0.02em]
                            text-gray-300
                        "
                    >
                        Advanced AI Architectures,
                        Multimodal Systems,
                        LLM Fine-Tuning,
                        Quantum Hybrid Intelligence,
                        Intelligent Agents,
                        AI Orchestration Platforms
                        and Autonomous Cognitive Systems.
                    </motion.p>

                    {/* buttons */}
                    <div
                        className="
                            mt-14
                            flex
                            items-center
                            gap-7
                        "
                    >

                        <MurzikVoiceButton />

                        <motion.button
                            whileHover={{
                                scale: 1.025,
                            }}
                            whileTap={{
                                scale: 0.98,
                            }}
                            className="
                                rounded-2xl
                                border
                                border-orange-400/20
                                bg-orange-500/10
                                px-9
                                py-4
                                text-[16px]
                                font-medium
                                text-orange-300
                                backdrop-blur-sm
                                transition-all
                                duration-300
                                hover:border-orange-300
                                hover:bg-orange-500/20
                                hover:text-white
                            "
                        >
                            View Projects
                        </motion.button>

                    </div>

                </div>

                {/* RIGHT */}
                <div
                    className="
                        relative
                        flex
                        h-full
                        items-end
                        justify-end
                    "
                >

                    {/* floating murzik */}
                    <motion.div
                        animate={{
                            y: [0, -14, 0],
                        }}
                        transition={{
                            duration: 8,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                        style={{
                            position: "relative",
                            zIndex: 20,
                        }}
                    >

                        {/* cinematic glow */}
                        <motion.div
                            animate={{
                                opacity: [0.22, 0.36, 0.22],
                            }}
                            transition={{
                                duration: 8,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                            className="
                                absolute
                                right-[6%]
                                top-[14%]
                                h-[560px]
                                w-[560px]
                                rounded-full
                                bg-orange-500/22
                                blur-[120px]
                            "
                        />

                        {/* smoke video */}
                        <video
                            autoPlay
                            muted
                            loop
                            playsInline
                            preload="metadata"
                            src={murzikSmokeVideo}
                            style={{
                                position: "absolute",
                                top: "10px",
                                right: "0px",
                                width: "900px",
                                height: "900px",
                                objectFit: "cover",
                                opacity: 0.92,
                                pointerEvents: "none",
                                zIndex: 18,
                            }}
                        />

                        {/* eye glow */}
                        <motion.div
                            animate={{
                                opacity: [0.25, 0.9, 0.25],
                            }}
                            transition={{
                                duration: 3.4,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                            className="
                                absolute
                                right-[32%]
                                top-[30%]
                                z-40
                                h-[22px]
                                w-[86px]
                                rounded-full
                                bg-orange-300
                                blur-[15px]
                            "
                        />

                        {/* breathing shadow */}
                        <motion.div
                            animate={{
                                opacity: [0.16, 0.3, 0.16],
                            }}
                            transition={{
                                duration: 6.5,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                            className="
                                absolute
                                bottom-[6%]
                                right-[12%]
                                h-[170px]
                                w-[400px]
                                rounded-full
                                bg-orange-500/18
                                blur-[60px]
                            "
                        />

                        <motion.img
                            initial={{
                                opacity: 0,
                                scale: 0.93,
                            }}
                            animate={{
                                opacity: 1,
                                scale: 1,
                            }}
                            transition={{
                                duration: 1.3,
                            }}
                            src={murzikImage}
                            alt="Murzik"
                            loading="eager"
                            style={{
                                width: "1050px",
                                maxWidth: "none",
                                objectFit: "contain",
                                transform: "translateY(60px)",
                                filter:
                                    "drop-shadow(0 0 90px rgba(255,140,0,0.34))",
                                userSelect: "none",
                                position: "relative",
                                zIndex: 20,
                            }}
                            draggable="false"
                        />

                    </motion.div>

                </div>

            </div>

            {/* bottom fade */}
            <div
                className="
                    absolute
                    bottom-0
                    left-0
                    h-40
                    w-full
                    bg-gradient-to-t
                    from-[#050505]
                    to-transparent
                "
            />

        </section>
    );
}