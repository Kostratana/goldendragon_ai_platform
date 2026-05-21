import { motion } from "framer-motion";

export default function MurzikSmoke() {

    return (

        <div
            className="
                absolute
                right-[18%]
                top-[6%]
                z-[120]
                pointer-events-none
            "
        >

            {/* smoke layer 1 */}
            <motion.div

                animate={{
                    y: [-20, -140],
                    x: [0, 30],
                    opacity: [0.14, 0],
                    scale: [1, 2],
                }}

                transition={{
                    repeat: Infinity,
                    duration: 8,
                    ease: "easeOut",
                }}

                className="
                    h-72
                    w-44
                    rounded-full
                    bg-white/10
                    blur-3xl
                "
            />

            {/* smoke layer 2 */}
            <motion.div

                animate={{
                    y: [0, -180],
                    x: [0, -40],
                    opacity: [0.12, 0],
                    scale: [1, 2.4],
                }}

                transition={{
                    repeat: Infinity,
                    duration: 10,
                    ease: "easeOut",
                    delay: 1,
                }}

                className="
                    absolute
                    left-10
                    top-10
                    h-80
                    w-52
                    rounded-full
                    bg-orange-100/10
                    blur-3xl
                "
            />

            {/* smoke layer 3 */}
            <motion.div

                animate={{
                    y: [-10, -160],
                    x: [0, 60],
                    opacity: [0.08, 0],
                    scale: [1, 2.2],
                }}

                transition={{
                    repeat: Infinity,
                    duration: 12,
                    ease: "easeOut",
                    delay: 2,
                }}

                className="
                    absolute
                    right-0
                    top-0
                    h-96
                    w-56
                    rounded-full
                    bg-gray-100/10
                    blur-3xl
                "
            />

        </div>

    );
}