import { motion } from "framer-motion";

export default function MurzikSmoke() {

    console.log("SMOKE VERSION PRODUCTION TEST");

    const smokeBaseStyle = {
        position: "absolute",
        borderRadius: "999px",
        willChange: "transform, opacity",
        transform: "translate3d(0,0,0)",
        backfaceVisibility: "hidden",
        WebkitBackfaceVisibility: "hidden",
    };

    return (

        <div
            style={{
                position: "absolute",
                right: "6%",
                top: "0%",
                zIndex: 999999,
                pointerEvents: "none",
                width: "1200px",
                height: "1200px",
                overflow: "visible",
            }}
        >

            {/* DEBUG TEST BLOCK */}
            <div
                style={{
                    position: "absolute",
                    top: "120px",
                    right: "220px",
                    width: "240px",
                    height: "240px",
                    background: "red",
                    opacity: 0.8,
                    zIndex: 999999,
                }}
            />

            {/* SMOKE LAYER 1 */}
            <motion.div

                animate={{
                    y: [0, -220],
                    x: [0, 40],
                    opacity: [0.15, 0.55, 0.12],
                    scale: [1, 2.2],
                }}

                transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}

                style={{
                    ...smokeBaseStyle,
                    width: "420px",
                    height: "620px",
                    background: "rgba(255,255,255,0.55)",
                    filter: "blur(70px)",
                }}
            />

            {/* SMOKE LAYER 2 */}
            <motion.div

                animate={{
                    y: [0, -320],
                    x: [0, -60],
                    opacity: [0.12, 0.48, 0.1],
                    scale: [1.2, 2.8],
                }}

                transition={{
                    duration: 11,
                    repeat: Infinity,
                    delay: 1,
                    ease: "easeInOut",
                }}

                style={{
                    ...smokeBaseStyle,
                    left: "120px",
                    top: "40px",
                    width: "520px",
                    height: "720px",
                    background: "rgba(255,240,220,0.42)",
                    filter: "blur(90px)",
                }}
            />

            {/* SMOKE LAYER 3 */}
            <motion.div

                animate={{
                    y: [0, -420],
                    x: [0, 90],
                    opacity: [0.08, 0.34, 0.06],
                    scale: [1.1, 3.2],
                }}

                transition={{
                    duration: 14,
                    repeat: Infinity,
                    delay: 2,
                    ease: "easeInOut",
                }}

                style={{
                    ...smokeBaseStyle,
                    right: "60px",
                    top: "100px",
                    width: "620px",
                    height: "820px",
                    background: "rgba(240,240,240,0.30)",
                    filter: "blur(110px)",
                }}
            />

        </div>

    );

}