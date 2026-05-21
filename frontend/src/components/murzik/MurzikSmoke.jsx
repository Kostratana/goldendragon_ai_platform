import { motion } from "framer-motion";

export default function MurzikSmoke() {

    return (

        <div
            style={{
                position: "absolute",
                right: "14%",
                top: "14%",
                zIndex: 80,
                pointerEvents: "none",
                width: "400px",
                height: "400px",
            }}
        >

            {/* DEBUG TEST */}
            <div
                style={{
                    width: "80px",
                    height: "80px",
                    background: "red",
                    position: "absolute",
                    zIndex: 9999,
                    opacity: 0.7,
                }}
            />

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
                    position: "absolute",
                    width: "140px",
                    height: "260px",
                    borderRadius: "999px",
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
                    position: "absolute",
                    left: "30px",
                    top: "10px",
                    width: "160px",
                    height: "300px",
                    borderRadius: "999px",
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
                    position: "absolute",
                    right: "-10px",
                    top: "20px",
                    width: "180px",
                    height: "340px",
                    borderRadius: "999px",
                    background: "rgba(240,240,240,0.15)",
                    filter: "blur(75px)",
                }}
            />

        </div>

    );

}