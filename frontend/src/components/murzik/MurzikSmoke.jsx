import { motion } from "framer-motion";

export default function MurzikSmoke() {

    return (

        <div
            className="
                pointer-events-none
                absolute
                right-[14%]
                top-[14%]
                z-[80]
            "
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

                className="
                    absolute
                    h-[260px]
                    w-[140px]
                    rounded-full
                    bg-white/20
                    blur-[55px]
                "
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

                className="
                    absolute
                    left-[30px]
                    top-[10px]
                    h-[300px]
                    w-[160px]
                    rounded-full
                    bg-orange-100/20
                    blur-[65px]
                "
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

                className="
                    absolute
                    right-[-10px]
                    top-[20px]
                    h-[340px]
                    w-[180px]
                    rounded-full
                    bg-gray-100/15
                    blur-[75px]
                "
            />

        </div>

    );

}