import {
    useLoggerStore
}
from "./loggerStore";

import { T } from "../services/translation";

export default function LoggerPanel() {

    const logs =
        useLoggerStore(
            state => state.logs
        );

    return (

        <div
            style={{

                width: "100%",

                height: "100%",

                overflowY: "auto",

                padding: "16px",

                boxSizing: "border-box",

                background:
                    `
                    linear-gradient(
                        180deg,
                        rgba(14,8,4,0.76),
                        rgba(6,3,2,0.86)
                    )
                    `,

                backdropFilter:
                    "blur(14px)",

                WebkitBackdropFilter:
                    "blur(14px)"
            }}
        >

            <div
                style={{

                    marginBottom: "18px",

                    color: "#ffd59a",

                    fontSize: "14px",

                    letterSpacing: "0.14em",

                    textTransform: "uppercase",

                    fontWeight: "600"
                }}
            >
                <T>Runtime Logger</T>
            </div>

            {

                logs.length === 0 && (

                    <div
                        style={{

                            padding: "14px",

                            borderRadius: "12px",

                            color: "#d8b78c",

                            background:
                                `
                                linear-gradient(
                                    to bottom,
                                    rgba(26,14,8,0.80),
                                    rgba(10,5,3,0.90)
                                )
                                `,

                            border:
                                "1px solid rgba(255,220,170,0.08)"
                        }}
                    >
                        <T>Waiting for runtime events...</T>
                    </div>

                )

            }

            {

                logs.map(log => (

                    <div

                        key={log.id}

                        style={{

                            marginBottom: "10px",

                            padding: "12px",

                            borderRadius: "12px",

                            background:
                                `
                                linear-gradient(
                                    to bottom,
                                    rgba(28,14,8,0.82),
                                    rgba(12,6,3,0.92)
                                )
                                `,

                            border:
                                "1px solid rgba(255,220,170,0.08)",

                            boxShadow:
                                `
                                0 0 16px rgba(255,170,80,0.04)
                                `
                        }}
                    >

                        <div
                            style={{

                                color: "#ffd59a",

                                fontSize: "11px",

                                letterSpacing: "0.08em",

                                marginBottom: "6px"
                            }}
                        >

                            [{log.time}]
                            {" "}

                            [{log.source}]
                            {" "}

                            [{log.type}]

                        </div>

                        <div
                            style={{

                                color: "#fff4e4",

                                fontSize: "13px",

                                lineHeight: "1.5"
                            }}
                        >
                            <T>{log.message}</T>
                        </div>

                    </div>

                ))

            }

        </div>

    );
}