import { motion } from "framer-motion";

export default function MurzikSmoke() {

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
                right: "14%",
                top: "14%",
                zIndex: 9999,
                isolation: "isolate",
                pointerEvents: "none",
                width: "500px",
                height: "500px",
                overflow: "visible",
            }}
        >

            {/* smoke layer 1 */}
            <motion.div

                animate={{
                    y: [0, -180],
                    x: [0, 40],
                    opacity: [0, 0.22, 0],
                    scale: [0.8, 2.4],
                }}

                transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeOut",
                }}

                style={{
                    ...smokeBaseStyle,
                    width: "140px",
                    height: "260px",
                    background: "rgba(255,255,255,0.20)",
                    filter: "blur(55px)",
                }}
            />

            {/* smoke layer 2 */}
            <motion.div

                animate={{
                    y: [0, -220],
                    x: [0, -30],
                    opacity: [0, 0.18, 0],
                    scale: [0.7, 2.8],
                }}

                transition={{
                    duration: 10,
                    repeat: Infinity,
                    delay: 1,
                    ease: "easeOut",
                }}

                style={{
                    ...smokeBaseStyle,
                    left: "30px",
                    top: "10px",
                    width: "160px",
                    height: "300px",
                    background: "rgba(255,240,220,0.20)",
                    filter: "blur(65px)",
                }}
            />

            {/* smoke layer 3 */}
            <motion.div

                animate={{
                    y: [0, -260],
                    x: [0, 50],
                    opacity: [0, 0.12, 0],
                    scale: [0.9, 3],
                }}

                transition={{
                    duration: 12,
                    repeat: Infinity,
                    delay: 2,
                    ease: "easeOut",
                }}

                style={{
                    ...smokeBaseStyle,
                    right: "-10px",
                    top: "20px",
                    width: "180px",
                    height: "340px",
                    background: "rgba(240,240,240,0.15)",
                    filter: "blur(75px)",
                }}
            />

        </div>

    );

}