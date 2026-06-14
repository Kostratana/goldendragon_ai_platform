import { create } from "zustand";

export const useLoggerStore = create((set) => ({

    logs: [],

    addLog: (
        source,
        type,
        message
    ) =>

        set((state) => ({

            logs: [

                {
                    id:
                        Date.now() +
                        Math.random(),

                    time:
                        new Date()
                            .toLocaleTimeString(),

                    source,

                    type,

                    message
                },

                ...state.logs

            ]

        })),

    clearLogs: () =>
        set({
            logs: []
        })

}));