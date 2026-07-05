export const FOUNDER_BRANDS = {
    GOLDEN_DRAGON_AI_STUDIO:
        "Golden Dragon AI Studio",
    GOLDEN_DRAGON:
        "Golden Dragon",
    GOLDEN_DRAGON_AI:
        "Golden Dragon AI",
    DRAGON_CHAT:
        "Dragon Chat",
    FOUNDER_NAME:
        "Svetlana Rumyantseva",
    GITHUB:
        "GitHub",
    LINKEDIN:
        "LinkedIn"
};

export const FOUNDER_TEXT = {
    ALT_PORTRAIT:
        "Founder portrait",

    SUBTITLE_LINE_1:
        "Inspired by Ancient Wisdom,",
    SUBTITLE_LINE_2:
        "Transforming Knowledge into Technology for a Better Life.",

    DECLARATION_HEADING:
        "The {{brand}} Declaration",

    PARAGRAPH_VISION:
        "Every great journey begins with a vision.",

    PARAGRAPH_FOUNDED:
        "{{brand}} was founded with a simple but ambitious purpose: to create intelligent technologies that improve life.",

    PARAGRAPH_HISTORY:
        "We believe that throughout history humanity has repeatedly discovered, forgotten, and rediscovered knowledge. Every generation inherits ideas from the past and transforms them into the future.",

    PARAGRAPH_SYMBOL:
        "For us, the {{brand}} is the symbol of this timeless wisdom.",

    PARAGRAPH_MYTH:
        "Not a myth of the past, but a reminder that knowledge never truly disappears. It waits to be rediscovered and reimagined for a new generation.",

    PARAGRAPH_PHILOSOPHY:
        "The {{brand}} was born from this philosophy.",

    PARAGRAPH_GUARDIAN:
        "More than an AI assistant, the {{brand}} is the symbolic guardian of knowledge and the intelligence at the heart of {{studio}}.",

    PARAGRAPH_COMMITMENT:
        "{{brand}} is our commitment to bringing timeless wisdom into the modern world through responsible artificial intelligence.",

    PARAGRAPH_PURPOSE_INTRO:
        "Our technologies are created for one purpose:",

    PARAGRAPH_SERVE_LIFE:
        "To serve life.",

    PARAGRAPH_HELP_PEOPLE:
        "We believe artificial intelligence should help people—not replace them.",

    PARAGRAPH_DECISIONS:
        "It should help us make better decisions, improve health, support businesses, protect animals, preserve nature, and build a better future for generations to come.",

    PARAGRAPH_CHAPTER:
        "Every system we create is another chapter in this journey.",

    PARAGRAPH_PROJECT:
        "Every project reflects the same philosophy while solving real-world challenges.",

    PARAGRAPH_ECOSYSTEM:
        "Together, they form a single ecosystem united by one vision and one purpose.",

    PARAGRAPH_PATH_CHOSEN:
        "This declaration defines the path we have chosen.",

    PARAGRAPH_KNOWLEDGE_SHARED:
        "A path where knowledge is shared.",

    PARAGRAPH_TECHNOLOGY:
        "Technology empowers humanity.",

    PARAGRAPH_INNOVATION:
        "Innovation carries responsibility.",

    PARAGRAPH_FUTURE:
        "And every new chapter brings us one step closer to a better future.",

    CTA_HEADING:
        "Let's Build the Future Together",

    CTA_CONVERSATION:
        "Every great solution begins with a conversation.",

    CTA_READY:
        "Whether you want to automate your business, develop an intelligent AI assistant, build a computer vision system, create a custom machine learning model, or transform an idea into a complete AI product, {{studio}} is ready to build your next intelligent system.",

    CTA_PROJECT:
        "Start by telling us about your project.",

    CTA_CONTACT_PREFIX:
        "You can contact us directly by ",

    CTA_EMAIL_LINK:
        "email",

    CTA_CONTACT_AFTER_EMAIL:
        " or continue to the ",

    CTA_CONTACT_AFTER_CHAT:
        " page, where our AI Business Assistant will help you define your goals, collect your requirements, and prepare the foundation for your future intelligent system.",

    CTA_TRANSFORM:
        "Let's transform your ideas into intelligent technology.",

    FOUNDER_ROLE:
        "Founder • Lead AI Engineer",

    FOUNDER_OWNER:
        "Owner of {{studio}}",

    BUTTON_EMAIL:
        "Email"
};

export const FOUNDER_TEXT_VALUES = {
    DECLARATION_HEADING: {
        brand:
            FOUNDER_BRANDS.GOLDEN_DRAGON
    },

    PARAGRAPH_FOUNDED: {
        brand:
            FOUNDER_BRANDS.GOLDEN_DRAGON_AI
    },

    PARAGRAPH_SYMBOL: {
        brand:
            FOUNDER_BRANDS.GOLDEN_DRAGON
    },

    PARAGRAPH_PHILOSOPHY: {
        brand:
            FOUNDER_BRANDS.GOLDEN_DRAGON
    },

    PARAGRAPH_GUARDIAN: {
        brand:
            FOUNDER_BRANDS.GOLDEN_DRAGON,
        studio:
            FOUNDER_BRANDS.GOLDEN_DRAGON_AI_STUDIO
    },

    PARAGRAPH_COMMITMENT: {
        brand:
            FOUNDER_BRANDS.GOLDEN_DRAGON_AI
    },

    CTA_READY: {
        studio:
            FOUNDER_BRANDS.GOLDEN_DRAGON_AI_STUDIO
    },

    FOUNDER_OWNER: {
        studio:
            FOUNDER_BRANDS.GOLDEN_DRAGON_AI_STUDIO
    }
};

export const DECLARATION_PARAGRAPHS = [
    {
        id: "vision",
        text:
            FOUNDER_TEXT.PARAGRAPH_VISION
    },
    {
        id: "founded",
        text:
            FOUNDER_TEXT.PARAGRAPH_FOUNDED,
        values:
            FOUNDER_TEXT_VALUES.PARAGRAPH_FOUNDED
    },
    {
        id: "history",
        text:
            FOUNDER_TEXT.PARAGRAPH_HISTORY
    },
    {
        id: "symbol",
        text:
            FOUNDER_TEXT.PARAGRAPH_SYMBOL,
        values:
            FOUNDER_TEXT_VALUES.PARAGRAPH_SYMBOL
    },
    {
        id: "myth",
        text:
            FOUNDER_TEXT.PARAGRAPH_MYTH
    },
    {
        id: "philosophy",
        text:
            FOUNDER_TEXT.PARAGRAPH_PHILOSOPHY,
        values:
            FOUNDER_TEXT_VALUES.PARAGRAPH_PHILOSOPHY
    },
    {
        id: "guardian",
        text:
            FOUNDER_TEXT.PARAGRAPH_GUARDIAN,
        values:
            FOUNDER_TEXT_VALUES.PARAGRAPH_GUARDIAN
    },
    {
        id: "commitment",
        text:
            FOUNDER_TEXT.PARAGRAPH_COMMITMENT,
        values:
            FOUNDER_TEXT_VALUES.PARAGRAPH_COMMITMENT
    },
    {
        id: "purpose-intro",
        text:
            FOUNDER_TEXT.PARAGRAPH_PURPOSE_INTRO
    },
    {
        id: "serve-life",
        text:
            FOUNDER_TEXT.PARAGRAPH_SERVE_LIFE
    },
    {
        id: "help-people",
        text:
            FOUNDER_TEXT.PARAGRAPH_HELP_PEOPLE
    },
    {
        id: "decisions",
        text:
            FOUNDER_TEXT.PARAGRAPH_DECISIONS
    },
    {
        id: "chapter",
        text:
            FOUNDER_TEXT.PARAGRAPH_CHAPTER
    },
    {
        id: "project",
        text:
            FOUNDER_TEXT.PARAGRAPH_PROJECT
    },
    {
        id: "ecosystem",
        text:
            FOUNDER_TEXT.PARAGRAPH_ECOSYSTEM
    },
    {
        id: "path-chosen",
        text:
            FOUNDER_TEXT.PARAGRAPH_PATH_CHOSEN
    },
    {
        id: "knowledge-shared",
        text:
            FOUNDER_TEXT.PARAGRAPH_KNOWLEDGE_SHARED
    },
    {
        id: "technology",
        text:
            FOUNDER_TEXT.PARAGRAPH_TECHNOLOGY
    },
    {
        id: "innovation",
        text:
            FOUNDER_TEXT.PARAGRAPH_INNOVATION
    },
    {
        id: "future",
        text:
            FOUNDER_TEXT.PARAGRAPH_FUTURE,
        isLast: true
    }
];
