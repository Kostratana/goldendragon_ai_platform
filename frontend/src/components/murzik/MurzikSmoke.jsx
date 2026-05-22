export default function MurzikSmoke() {

    return (

        <div
            style={{
                position: "absolute",
                inset: 0,
                zIndex: 999999,
                pointerEvents: "none",
                overflow: "visible",
            }}
        >

            {/* SMOKE CLOUD 1 */}
            <div
                style={{
                    position: "absolute",
                    top: "60px",
                    right: "180px",
                    width: "420px",
                    height: "420px",
                    borderRadius: "999px",
                    background:
                        "radial-gradient(circle, rgba(255,255,255,0.34) 0%, rgba(255,255,255,0.12) 40%, transparent 75%)",
                    filter: "blur(60px)",
                    opacity: 0.9,
                }}
            />

            {/* SMOKE CLOUD 2 */}
            <div
                style={{
                    position: "absolute",
                    top: "140px",
                    right: "40px",
                    width: "520px",
                    height: "520px",
                    borderRadius: "999px",
                    background:
                        "radial-gradient(circle, rgba(255,240,220,0.30) 0%, rgba(255,240,220,0.10) 45%, transparent 75%)",
                    filter: "blur(80px)",
                    opacity: 0.8,
                }}
            />

            {/* SMOKE CLOUD 3 */}
            <div
                style={{
                    position: "absolute",
                    top: "0px",
                    right: "320px",
                    width: "300px",
                    height: "300px",
                    borderRadius: "999px",
                    background:
                        "radial-gradient(circle, rgba(255,255,255,0.28) 0%, rgba(255,255,255,0.08) 45%, transparent 75%)",
                    filter: "blur(55px)",
                    opacity: 0.8,
                }}
            />

        </div>

    );

}