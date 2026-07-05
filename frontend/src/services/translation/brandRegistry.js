/*
Golden Dragon AI Studio
Brand Registry

All protected brand and product names
must be added ONLY here.

The translation layer consults this
registry before requesting translation.
*/

export const BRAND_TERMS =
    new Set([
        "Golden Dragon AI Studio",
        "Golden Dragon Health AI",
        "Golden Dragon AI",
        "GOLDEN DRAGON AI",
        "Golden Dragon",
        "Dragon Chat",
        "AI SOLUTIONS",
        "DRAGON CHAT",
        "Animal Health Detection",
        "Underwater AI",
        "Whale Hunter AI",
        "Sentinel AI",
        "Private Shopper AI",
        "Murzik",
        "MURZIK",
        "GitHub",
        "LinkedIn"
    ]);

const SORTED_BRAND_TERMS = [
    ...BRAND_TERMS
].sort(
    (left, right) =>
        right.length -
        left.length
);

export function isProtectedBrand(
    text
) {

    if (
        !text ||
        typeof text !==
            "string"
    ) {
        return false;
    }

    return BRAND_TERMS.has(
        text.trim()
    );
}

export function getSortedBrandTerms() {

    return SORTED_BRAND_TERMS;
}
