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
        "Dragon",
        "AI",
        "AI Agents",
        "Computer Vision",
        "LLM",
        "LLMs",
        "RAG",
        "MVP",
        "NDA",
        "OCR",
        "Health Support AI",
        "Equine Health AI",
        "Motion Analysis",
        "Biomechanics Analysis",
        "Pose Estimation",
        "Deep Learning",
        "Multimodal AI",
        "Google Cloud",
        "Supabase",
        "Underwater Inspection AI",
        "Robotics-Oriented Inspection",
        "Underwater Image Analysis",
        "Object Detection",
        "Image Segmentation",
        "Anomaly Detection",
        "Corrosion Assessment",
        "Predictive Maintenance",
        "Autonomous Inspection Pipelines",
        "Quantum Trading AI",
        "Market Intelligence",
        "AI Decision Support",
        "Adaptive Quantitative Models",
        "Quantum Research Layer",
        "Research Platform",
        "Real-time streaming architecture",
        "Quantitative scoring engine",
        "Adaptive analytics modules",
        "Private Shopper AI",
        "Product Discovery",
        "Multimodal Commerce Intelligence",
        "Adaptive Preference Modeling",
        "Recommendation intelligence",
        "Multimodal product analysis",
        "Golden Dragon AI",
        "GOLDEN DRAGON AI",
        "Golden Dragon",
        "Dragon Chat",
        "AI SOLUTIONS",
        "DRAGON CHAT",
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
