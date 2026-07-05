export const BREAKPOINTS = {
    MOBILE_MAX: 768,
    TABLET_MIN: 769,
    TABLET_MAX: 1199,
    DESKTOP_MIN: 1200
};

export const MOBILE_MEDIA_QUERY =
    `(max-width: ${BREAKPOINTS.MOBILE_MAX}px)`;

export const TABLET_MEDIA_QUERY =
    `(min-width: ${BREAKPOINTS.TABLET_MIN}px) and (max-width: ${BREAKPOINTS.TABLET_MAX}px)`;
