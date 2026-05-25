import {
    useState,
    useEffect
} from "react";

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

    const initialWidth =

        viewport.width < 768
            ? viewport.width * 0.94
            : viewport.width < 1200
                ? 760
                : 860;

    const initialHeight =

        viewport.width < 768
            ? viewport.height * 0.54
            : viewport.width < 1200
                ? 560
                : 620;

    const [chatBox, setChatBox] =
        useState({

            width:
                initialWidth,

            height:
                initialHeight,

            /*
            KEEP WINDOW CENTERED
            UNDER MURZIK MONITOR
            */

            x:
                (viewport.width / 2) -
                (initialWidth / 2),

            y:
                viewport.width < 768
                    ? 620
                    : viewport.width < 1200
                        ? 780
                        : 820
        });

    useEffect(() => {

        function handleResize() {

            const nextViewport = {

                width:
                    window.innerWidth,

                height:
                    window.innerHeight
            };

            setViewport(nextViewport);

            setChatBox(prev => {

                const maxWidth =
                    nextViewport.width * 0.96;

                const maxHeight =
                    nextViewport.height * 0.82;

                const nextWidth =
                    Math.min(
                        prev.width,
                        maxWidth
                    );

                const nextHeight =
                    Math.min(
                        prev.height,
                        maxHeight
                    );

                return {

                    ...prev,

                    width:
                        nextWidth,

                    height:
                        nextHeight,

                    x:
                        Math.max(
                            0,
                            Math.min(
                                prev.x,
                                nextViewport.width - nextWidth
                            )
                        ),

                    y:
                        Math.max(
                            80,
                            Math.min(
                                prev.y,
                                nextViewport.height - nextHeight
                            )
                        )
                };
            });
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

        if (
            event.touches &&
            event.touches[0]
        ) {

            return {

                x:
                    event.touches[0].clientX,

                y:
                    event.touches[0].clientY
            };
        }

        return {

            x:
                event.clientX,

            y:
                event.clientY
        };
    }

    function clampBox(next) {

        const minWidth =
            isMobile
                ? 320
                : 560;

        const minHeight =
            isMobile
                ? 320
                : 420;

        const maxWidth =
            viewport.width * 0.96;

        const maxHeight =
            viewport.height * 0.84;

        const width =
            Math.max(
                minWidth,
                Math.min(
                    next.width,
                    maxWidth
                )
            );

        const height =
            Math.max(
                minHeight,
                Math.min(
                    next.height,
                    maxHeight
                )
            );

        return {

            ...next,

            width,

            height,

            x:
                Math.max(
                    0,
                    Math.min(
                        next.x,
                        viewport.width - width
                    )
                ),

            y:
                Math.max(
                    80,
                    Math.min(
                        next.y,
                        viewport.height - height
                    )
                )
        };
    }

    function createResizeHandler(direction) {

        return function startResize(event) {

            event.preventDefault();

            event.stopPropagation();

            const start =
                getClientPosition(event);

            const startBox =
                { ...chatBox };

            function resizeMove(moveEvent) {

                if (
                    moveEvent.cancelable
                ) {

                    moveEvent.preventDefault();
                }

                const current =
                    getClientPosition(moveEvent);

                const deltaX =
                    current.x - start.x;

                const deltaY =
                    current.y - start.y;

                let nextBox =
                    { ...startBox };

                /*
                RIGHT
                */

                if (
                    direction.includes("right")
                ) {

                    nextBox.width =
                        startBox.width + deltaX;
                }

                /*
                LEFT
                */

                if (
                    direction.includes("left")
                ) {

                    nextBox.width =
                        startBox.width - deltaX;

                    nextBox.x =
                        startBox.x + deltaX;
                }

                /*
                BOTTOM
                */

                if (
                    direction.includes("bottom")
                ) {

                    nextBox.height =
                        startBox.height + deltaY;
                }

                /*
                TOP
                */

                if (
                    direction.includes("top")
                ) {

                    nextBox.height =
                        startBox.height - deltaY;

                    nextBox.y =
                        startBox.y + deltaY;
                }

                nextBox =
                    clampBox(nextBox);

                requestAnimationFrame(() => {

                    setChatBox(nextBox);
                });
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
        };
    }

    function startDrag(event) {

        event.preventDefault();

        event.stopPropagation();

        const start =
            getClientPosition(event);

        const startBox =
            { ...chatBox };

        function dragMove(moveEvent) {

            if (
                moveEvent.cancelable
            ) {

                moveEvent.preventDefault();
            }

            const current =
                getClientPosition(moveEvent);

            const deltaX =
                current.x - start.x;

            const deltaY =
                current.y - start.y;

            const nextBox =
                clampBox({

                    ...startBox,

                    x:
                        startBox.x + deltaX,

                    y:
                        startBox.y + deltaY
                });

            requestAnimationFrame(() => {

                setChatBox(nextBox);
            });
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

        startDrag,

        /*
        TRUE RESIZE HANDLES
        */

        startTopLeftResize:
            createResizeHandler(
                "top-left"
            ),

        startTopRightResize:
            createResizeHandler(
                "top-right"
            ),

        startBottomLeftResize:
            createResizeHandler(
                "bottom-left"
            ),

        startBottomRightResize:
            createResizeHandler(
                "bottom-right"
            ),

        startRightResize:
            createResizeHandler(
                "right"
            ),

        startBottomResize:
            createResizeHandler(
                "bottom"
            )
    };
}