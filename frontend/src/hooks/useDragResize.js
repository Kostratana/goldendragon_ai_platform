import { useState, useEffect } from "react";

export default function useDragResize() {

    const [viewport, setViewport] =
        useState({
            width: window.innerWidth,
            height: window.innerHeight
        });

    const isMobile =
        viewport.width < 768;

    const isTablet =
        viewport.width >= 768 &&
        viewport.width < 1200;

    const [chatBox, setChatBox] =
        useState({

            width:
                viewport.width < 768
                    ? viewport.width * 0.96
                    : viewport.width < 1200
                        ? 620
                        : 540,

            height:
                viewport.width < 768
                    ? viewport.height * 0.72
                    : viewport.width < 1200
                        ? 460
                        : 420,

            x:
                viewport.width < 768
                    ? viewport.width * 0.02
                    : (viewport.width / 2) - 270,

            y:
                viewport.width < 768
                    ? 420
                    : viewport.width < 1200
                        ? 560
                        : 760
        });

    useEffect(() => {

        function handleResize() {

            const nextViewport = {
                width: window.innerWidth,
                height: window.innerHeight
            };

            setViewport(nextViewport);

            setChatBox(prev => ({

                ...prev,

                width:
                    Math.min(
                        prev.width,
                        nextViewport.width * 0.98
                    ),

                height:
                    Math.min(
                        prev.height,
                        nextViewport.height * 0.88
                    ),

                x:
                    Math.min(
                        prev.x,
                        nextViewport.width - prev.width
                    ),

                y:
                    Math.min(
                        prev.y,
                        nextViewport.height - 120
                    )
            }));
        }

        window.addEventListener(
            "resize",
            handleResize
        );

        return () => {

            window.removeEventListener(
                "resize",
                handleResize
            );
        };

    }, []);

    function getClientPosition(event) {

        if (event.touches && event.touches[0]) {

            return {
                x: event.touches[0].clientX,
                y: event.touches[0].clientY
            };
        }

        return {
            x: event.clientX,
            y: event.clientY
        };
    }

    function startTopLeftResize(event) {

        event.preventDefault();

        const start =
            getClientPosition(event);

        const startWidth =
            chatBox.width;

        const startHeight =
            chatBox.height;

        function resizeMove(moveEvent) {

            const current =
                getClientPosition(moveEvent);

            const deltaX =
                current.x - start.x;

            const deltaY =
                current.y - start.y;

            const nextWidth =
                Math.max(
                    isMobile ? 300 : 340,
                    Math.min(
                        startWidth - deltaX,
                        viewport.width * 0.98
                    )
                );

            const nextHeight =
                Math.max(
                    isMobile ? 420 : 320,
                    Math.min(
                        startHeight - deltaY,
                        viewport.height * 0.88
                    )
                );

            setChatBox(prev => ({
                ...prev,
                width: nextWidth,
                height: nextHeight
            }));
        }

        function stopResize() {

            window.removeEventListener(
                "mousemove",
                resizeMove
            );

            window.removeEventListener(
                "mouseup",
                stopResize
            );

            window.removeEventListener(
                "touchmove",
                resizeMove
            );

            window.removeEventListener(
                "touchend",
                stopResize
            );
        }

        window.addEventListener(
            "mousemove",
            resizeMove
        );

        window.addEventListener(
            "mouseup",
            stopResize
        );

        window.addEventListener(
            "touchmove",
            resizeMove,
            { passive: false }
        );

        window.addEventListener(
            "touchend",
            stopResize
        );
    }

    function startDrag(event) {

        const start =
            getClientPosition(event);

        const startLeft =
            chatBox.x;

        const startTop =
            chatBox.y;

        function dragMove(moveEvent) {

            const current =
                getClientPosition(moveEvent);

            const deltaX =
                current.x - start.x;

            const deltaY =
                current.y - start.y;

            setChatBox(prev => ({

                ...prev,

                x:
                    Math.max(
                        0,
                        Math.min(
                            startLeft + deltaX,
                            viewport.width - prev.width
                        )
                    ),

                y:
                    Math.max(
                        60,
                        Math.min(
                            startTop + deltaY,
                            viewport.height - 100
                        )
                    )
            }));
        }

        function stopDrag() {

            window.removeEventListener(
                "mousemove",
                dragMove
            );

            window.removeEventListener(
                "mouseup",
                stopDrag
            );

            window.removeEventListener(
                "touchmove",
                dragMove
            );

            window.removeEventListener(
                "touchend",
                stopDrag
            );
        }

        window.addEventListener(
            "mousemove",
            dragMove
        );

        window.addEventListener(
            "mouseup",
            stopDrag
        );

        window.addEventListener(
            "touchmove",
            dragMove,
            { passive: false }
        );

        window.addEventListener(
            "touchend",
            stopDrag
        );
    }

    return {

        viewport,

        isMobile,

        isTablet,

        chatBox,

        setChatBox,

        startTopLeftResize,

        startDrag
    };
}