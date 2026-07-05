import {
    useEffect,
    useState
} from "react";

import {
    MOBILE_MEDIA_QUERY,
    TABLET_MEDIA_QUERY
} from "../constants/breakpoints";

export default function useFounderBreakpoints() {

    const [
        breakpoints,
        setBreakpoints
    ] = useState({
        isMobile: false,
        isTablet: false
    });

    useEffect(() => {

        const mobileQuery =
            window.matchMedia(
                MOBILE_MEDIA_QUERY
            );

        const tabletQuery =
            window.matchMedia(
                TABLET_MEDIA_QUERY
            );

        const updateBreakpoints = () => {

            setBreakpoints({
                isMobile:
                    mobileQuery.matches,
                isTablet:
                    tabletQuery.matches
            });
        };

        updateBreakpoints();

        mobileQuery.addEventListener(
            "change",
            updateBreakpoints
        );

        tabletQuery.addEventListener(
            "change",
            updateBreakpoints
        );

        return () => {

            mobileQuery.removeEventListener(
                "change",
                updateBreakpoints
            );

            tabletQuery.removeEventListener(
                "change",
                updateBreakpoints
            );
        };

    }, []);

    return breakpoints;
}
