import { motion } from "framer-motion";

import murzikImage from "../../assets/murzik/murzik-main.png";

import MurzikSmoke from "./MurzikSmoke";
import MurzikVoiceButton from "./MurzikVoiceButton";

export default function MurzikHero() {

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
                    scale: [1, 1.08, 1],
                    opacity: [0.45, 0.7, 0.45],
                }}
                transition={{
                    duration: 12,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                className="
                    absolute
                    inset-0
                    bg-[radial-gradient(circle_at_70%_35%,rgba(255,140,0,0.22),transparent_42%)]
                "
            />

            {/* cinematic smoke video */}
            <video
                autoPlay
                muted
                loop
                playsInline
                preload="auto"

                src="/videos/murzik-smoke-v2.mp4"

                style={{
                    position: "absolute",
                    top: "-10%",
                    left: "-10%",
                    width: "120%",
                    height: "120%",
                    objectFit: "cover",
                    opacity: 0.32,
                    mixBlendMode: "screen",
                    pointerEvents: "none",
                    zIndex: 50,
                    filter: "blur(18px)",
                }}
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

            {/* floating particles */}
            <div className="absolute inset-0 overflow-hidden">

                {[...Array(18)].map((_, i) => (

                    <motion.div
                        key={i}

                        animate={{
                            y: [0, -900],
                            opacity: [0, 0.9, 0],
                            x: [0, Math.random() * 120 - 60],
                            scale: [0.6, 1.4, 0.4],
                        }}

                        transition={{
                            duration: 12 + i,
                            repeat: Infinity,
                            ease: "linear",
                            delay: i * 0.4,
                        }}

                        className="
                            absolute
                            bottom-[-100px]
                            h-[4px]
                            w-[4px]
                            rounded-full
                            bg-orange-300/60
                            blur-[1px]
                        "

                        style={{
                            left: `${8 + i * 5}%`,
                        }}
                    />

                ))}

            </div>

            {/* content */}
            <div
                className="
                    relative
                    z-20
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
                            y: 40,
                        }}

                        animate={{
                            opacity: 1,
                            y: 0,
                        }}

                        transition={{
                            duration: 1.2,
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
                            width: [160, 240, 160],
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
                            duration: 1.2,
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
                                scale: 1.04,
                            }}

                            whileTap={{
                                scale: 0.97,
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
                                backdrop-blur-xl
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

                    {/* massive cinematic glow */}
                    <motion.div
                        animate={{
                            scale: [1, 1.12, 1],
                            opacity: [0.25, 0.42, 0.25],
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
                            h-[620px]
                            w-[620px]
                            rounded-full
                            bg-orange-500/25
                            blur-[150px]
                        "
                    />

                    {/* eye glow */}
                    <motion.div
                        animate={{
                            opacity: [0.2, 1, 0.2],
                            scale: [0.95, 1.1, 0.95],
                        }}

                        transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}

                        className="
                            absolute
                            right-[32%]
                            top-[30%]
                            z-40
                            h-[24px]
                            w-[90px]
                            rounded-full
                            bg-orange-300
                            blur-[18px]
                        "
                    />

                    {/* smoke particles */}
                    <MurzikSmoke />

                    {/* breathing shadow */}
                    <motion.div
                        animate={{
                            opacity: [0.18, 0.35, 0.18],
                            scale: [1, 1.06, 1],
                        }}

                        transition={{
                            duration: 6,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}

                        className="
                            absolute
                            bottom-[6%]
                            right-[12%]
                            h-[180px]
                            w-[420px]
                            rounded-full
                            bg-orange-500/20
                            blur-[70px]
                        "
                    />

                    {/* floating murzik */}
                    <motion.div
                        animate={{
                            y: [0, -24, 0],
                            rotate: [0, -1.2, 0],
                            scale: [1, 1.015, 1],
                        }}

                        transition={{
                            duration: 7,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}

                        whileHover={{
                            scale: 1.03,
                            rotate: -1,
                        }}

                        style={{
                            position: "relative",
                            zIndex: 30,
                        }}
                    >

                        <motion.img
                            initial={{
                                opacity: 0,
                                scale: 0.92,
                            }}

                            animate={{
                                opacity: 1,
                                scale: 1,
                            }}

                            transition={{
                                duration: 1.4,
                            }}

                            src={murzikImage}

                            alt="Murzik"

                            style={{
                                width: "1050px",
                                maxWidth: "none",
                                objectFit: "contain",
                                transform: "translateY(60px)",
                                filter:
                                    "drop-shadow(0 0 120px rgba(255,140,0,0.42))",
                                userSelect: "none",
                            }}
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