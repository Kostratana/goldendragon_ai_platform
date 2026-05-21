import { motion } from "framer-motion";

export default function MurzikSmoke() {

    const smokeBaseStyle = {
        position: "absolute",
        borderRadius: "999px",
        willChange: "transform, opacity",
        transform: "translate3d(0,0,0)",
        backfaceVisibility: "hidden",
        WebkitBackfaceVisibility: "hidden",
        mixBlendMode: "screen",
    };

    return (

        <div
            style={{
                position: "absolute",
                right: "10%",
                top: "2%",
                zIndex: 99999,
                isolation: "isolate",
                pointerEvents: "none",
                width: "900px",
                height: "900px",
                overflow: "visible",
            }}
        >

            {/* MASSIVE SMOKE LAYER 1 */}
            <motion.div

                animate={{
                    y: [0, -260],
                    x: [0, 60],
                    opacity: [0, 0.32, 0],
                    scale: [0.8, 2.8],
                }}

                transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: "easeOut",
                }}

                style={{
                    ...smokeBaseStyle,
                    width: "320px",
                    height: "520px",
                    background: "rgba(255,255,255,0.28)",
                    filter: "blur(120px)",
                }}
            />

            {/* MASSIVE SMOKE LAYER 2 */}
            <motion.div

                animate={{
                    y: [0, -320],
                    x: [0, -80],
                    opacity: [0, 0.26, 0],
                    scale: [0.9, 3.4],
                }}

                transition={{
                    duration: 13,
                    repeat: Infinity,
                    delay: 1,
                    ease: "easeOut",
                }}

                style={{
                    ...smokeBaseStyle,
                    left: "120px",
                    top: "40px",
                    width: "420px",
                    height: "620px",
                    background: "rgba(255,240,220,0.24)",
                    filter: "blur(150px)",
                }}
            />

            {/* MASSIVE SMOKE LAYER 3 */}
            <motion.div

                animate={{
                    y: [0, -380],
                    x: [0, 90],
                    opacity: [0, 0.18, 0],
                    scale: [1, 3.8],
                }}

                transition={{
                    duration: 15,
                    repeat: Infinity,
                    delay: 2,
                    ease: "easeOut",
                }}

                style={{
                    ...smokeBaseStyle,
                    right: "40px",
                    top: "80px",
                    width: "520px",
                    height: "720px",
                    background: "rgba(240,240,240,0.18)",
                    filter: "blur(180px)",
                }}
            />

        </div>

    );

}