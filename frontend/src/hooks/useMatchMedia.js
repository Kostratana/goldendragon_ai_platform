import {
    useEffect,
    useState
} from "react";

export default function useMatchMedia(
    query
) {

    const [matches, setMatches] =
        useState(false);

    useEffect(() => {

        const mediaQueryList =
            window.matchMedia(
                query
            );

        const handleChange = () => {

            setMatches(
                mediaQueryList.matches
            );
        };

        handleChange();

        mediaQueryList.addEventListener(
            "change",
            handleChange
        );

        return () => {

            mediaQueryList.removeEventListener(
                "change",
                handleChange
            );
        };

    }, [query]);

    return matches;
}
