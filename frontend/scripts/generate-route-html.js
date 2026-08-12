import assert from "node:assert/strict";
import {
    mkdir,
    readFile,
    readdir,
    stat,
    writeFile
} from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";

import { seoConfig } from "../src/config/seoConfig.js";

const SCRIPT_DIRECTORY = path.dirname(fileURLToPath(import.meta.url));
const FRONTEND_DIRECTORY = path.resolve(SCRIPT_DIRECTORY, "..");
const DIST_DIRECTORY = path.join(FRONTEND_DIRECTORY, "dist");
const TEMPLATE_PATH = path.join(DIST_DIRECTORY, "index.html");
const SITEMAP_PATH = path.join(FRONTEND_DIRECTORY, "public", "sitemap.xml");
const SITE_ORIGIN = "https://www.goldendragonai.com";

const EXPECTED_ROUTES = [
    "/",
    "/chat",
    "/services",
    "/services/portfolio",
    "/solutions",
    "/solutions/health-support-ai",
    "/solutions/animal-health",
    "/solutions/underwater-ai",
    "/solutions/quantum-trading-ai",
    "/solutions/luxury-concierge-ai",
    "/news"
];

const REQUIRED_METADATA_FIELDS = [
    "title",
    "description",
    "canonical",
    "ogTitle",
    "ogDescription",
    "ogType",
    "twitterTitle",
    "twitterDescription"
];

function escapeText(value) {
    return value
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;");
}

function escapeAttribute(value) {
    return escapeText(value)
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#39;");
}

function getAttribute(tag, attributeName) {
    const escapedName = attributeName.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const pattern = new RegExp(
        `(?:^|\\s)${escapedName}\\s*=\\s*(?:"([^"]*)"|'([^']*)'|([^\\s>]+))`,
        "i"
    );
    const match = tag.match(pattern);

    return match ? (match[1] ?? match[2] ?? match[3]) : null;
}

function findTags(html, tagName, predicate = () => true) {
    const pattern = new RegExp(`<${tagName}\\b[^>]*>`, "gi");

    return [...html.matchAll(pattern)]
        .map((match) => ({
            index: match.index,
            tag: match[0]
        }))
        .filter(({ tag }) => predicate(tag));
}

function hasRel(tag, relValue) {
    return (getAttribute(tag, "rel") || "")
        .split(/\s+/)
        .some((value) => value.toLowerCase() === relValue.toLowerCase());
}

function findMetaTags(html, attributeName, attributeValue) {
    return findTags(
        html,
        "meta",
        (tag) => getAttribute(tag, attributeName)?.toLowerCase()
            === attributeValue.toLowerCase()
    );
}

function findCanonicalTags(html) {
    return findTags(html, "link", (tag) => hasRel(tag, "canonical"));
}

function replaceUniqueMatch(html, matches, replacement, label) {
    assert.equal(
        matches.length,
        1,
        `${label} must appear exactly once; found ${matches.length}`
    );

    const [{ index, tag }] = matches;

    return `${html.slice(0, index)}${replacement}${html.slice(index + tag.length)}`;
}

function replaceTitle(html, title) {
    const matches = [...html.matchAll(/<title\b[^>]*>[\s\S]*?<\/title>/gi)]
        .map((match) => ({ index: match.index, tag: match[0] }));

    return replaceUniqueMatch(
        html,
        matches,
        `<title>${escapeText(title)}</title>`,
        "title"
    );
}

function replaceMeta(html, attributeName, attributeValue, content) {
    return replaceUniqueMatch(
        html,
        findMetaTags(html, attributeName, attributeValue),
        `<meta ${attributeName}="${attributeValue}" content="${escapeAttribute(content)}" />`,
        `meta[${attributeName}="${attributeValue}"]`
    );
}

function replaceCanonical(html, canonical) {
    return replaceUniqueMatch(
        html,
        findCanonicalTags(html),
        `<link rel="canonical" href="${escapeAttribute(canonical)}" />`,
        'link[rel="canonical"]'
    );
}

function getOutputPath(route) {
    const outputPath = route === "/"
        ? TEMPLATE_PATH
        : path.join(DIST_DIRECTORY, ...route.slice(1).split("/"), "index.html");
    const relativePath = path.relative(DIST_DIRECTORY, outputPath);

    assert.ok(relativePath, `Missing output path for ${route}`);
    assert.ok(!path.isAbsolute(relativePath), `Unsafe output path for ${route}`);
    assert.notEqual(relativePath, "..", `Unsafe output path for ${route}`);
    assert.ok(
        !relativePath.startsWith(`..${path.sep}`),
        `Unsafe output path for ${route}`
    );

    return outputPath;
}

function assertSameSet(actual, expected, label) {
    const actualSet = new Set(actual);
    const expectedSet = new Set(expected);
    const missing = expected.filter((value) => !actualSet.has(value));
    const extra = actual.filter((value) => !expectedSet.has(value));

    assert.equal(actual.length, actualSet.size, `${label} contains duplicates`);
    assert.equal(
        actualSet.size,
        expectedSet.size,
        `${label} differs (missing: ${missing.join(", ") || "none"}; extra: ${extra.join(", ") || "none"})`
    );
    assert.deepEqual(
        [...actualSet].sort(),
        [...expectedSet].sort(),
        `${label} differs (missing: ${missing.join(", ") || "none"}; extra: ${extra.join(", ") || "none"})`
    );
}

function getAssetReferences(html) {
    const moduleScriptTags = findTags(
        html,
        "script",
        (tag) => getAttribute(tag, "type")?.toLowerCase() === "module"
    );
    const stylesheetTags = findTags(
        html,
        "link",
        (tag) => hasRel(tag, "stylesheet")
    );
    const moduleScripts = moduleScriptTags.map(({ tag }) => getAttribute(tag, "src"));
    const stylesheetUrls = stylesheetTags.map(({ tag }) => getAttribute(tag, "href"));

    for (const [label, urls] of [
        ["module script", moduleScripts],
        ["stylesheet", stylesheetUrls]
    ]) {
        for (const url of urls) {
            assert.ok(url, `${label} must have a URL`);

            const isExternal = /^(?:https?:)?\/\//i.test(url)
                || url.startsWith("data:");

            assert.ok(
                isExternal || url.startsWith("/"),
                `${label} URL must be external or root-absolute: ${url}`
            );
        }
    }

    const scripts = moduleScripts.filter((url) => url.startsWith("/assets/"));
    const stylesheets = stylesheetUrls.filter((url) => url.startsWith("/assets/"));

    assert.equal(scripts.length, 1, "Built HTML must contain one Vite module script");
    assert.ok(stylesheets.length >= 1, "Built HTML must contain a Vite stylesheet");

    return { scripts, stylesheets };
}

async function findIndexHtmlFiles(directory) {
    const entries = await readdir(directory, { withFileTypes: true });
    const files = [];

    for (const entry of entries) {
        const entryPath = path.join(directory, entry.name);

        if (entry.isDirectory()) {
            files.push(...await findIndexHtmlFiles(entryPath));
        } else if (entry.isFile() && entry.name === "index.html") {
            files.push(entryPath);
        }
    }

    return files;
}

function validateTemplate(html) {
    assert.ok(html.trim().length > 0, "Built HTML template is empty");
    assert.match(html, /<!doctype html>/i, "Built HTML template has no doctype");
    assert.equal((html.match(/<head\b/gi) || []).length, 1, "Expected one head");
    assert.equal((html.match(/<body\b/gi) || []).length, 1, "Expected one body");
    assert.equal(
        findTags(html, "div", (tag) => getAttribute(tag, "id") === "root").length,
        1,
        "Expected one React root"
    );

    replaceTitle(html, "validation");
    replaceMeta(html, "name", "description", "validation");
    replaceMeta(html, "property", "og:title", "validation");
    replaceMeta(html, "property", "og:description", "validation");
    replaceMeta(html, "property", "og:type", "validation");
    replaceMeta(html, "property", "og:url", "validation");
    replaceMeta(html, "name", "twitter:title", "validation");
    replaceMeta(html, "name", "twitter:description", "validation");
    replaceCanonical(html, "https://example.com/");

    return getAssetReferences(html);
}

function validateConfiguration(entries, sitemap) {
    const routes = entries.map(([route]) => route);
    const canonicalUrls = [];
    const outputPaths = [];

    assert.equal(entries.length, 11, "seoConfig must contain exactly 11 routes");
    assertSameSet(routes, EXPECTED_ROUTES, "seoConfig routes");

    for (const [route, metadata] of entries) {
        assert.ok(
            route === "/" || /^\/(?:[a-z0-9-]+)(?:\/[a-z0-9-]+)*$/.test(route),
            `Unsafe or non-canonical route: ${route}`
        );
        assert.ok(
            metadata && Object.getPrototypeOf(metadata) === Object.prototype,
            `Invalid metadata object for ${route}`
        );

        for (const field of REQUIRED_METADATA_FIELDS) {
            assert.ok(
                Object.hasOwn(metadata, field)
                    && typeof metadata[field] === "string"
                    && metadata[field].trim() === metadata[field]
                    && metadata[field].length > 0,
                `Invalid ${field} for ${route}`
            );
        }

        const canonical = new URL(metadata.canonical);

        assert.equal(canonical.origin, SITE_ORIGIN, `Wrong canonical origin for ${route}`);
        assert.equal(canonical.protocol, "https:", `Wrong canonical protocol for ${route}`);
        assert.equal(canonical.username, "", `Canonical has credentials for ${route}`);
        assert.equal(canonical.password, "", `Canonical has credentials for ${route}`);
        assert.equal(canonical.search, "", `Canonical has a query for ${route}`);
        assert.equal(canonical.hash, "", `Canonical has a hash for ${route}`);
        assert.equal(canonical.pathname, route, `Canonical path differs for ${route}`);

        canonicalUrls.push(metadata.canonical);
        outputPaths.push(getOutputPath(route));
    }

    assert.equal(new Set(canonicalUrls).size, 11, "Canonical URLs must be unique");
    assert.equal(new Set(outputPaths).size, 11, "Output paths must be unique");

    const sitemapUrls = [...sitemap.matchAll(/<loc>\s*([^<]+?)\s*<\/loc>/gi)]
        .map((match) => match[1]);

    assertSameSet(sitemapUrls, canonicalUrls, "sitemap URLs");
}

function renderRouteHtml(template, metadata) {
    let html = template;

    html = replaceTitle(html, metadata.title);
    html = replaceMeta(html, "name", "description", metadata.description);
    html = replaceMeta(html, "property", "og:title", metadata.ogTitle);
    html = replaceMeta(html, "property", "og:description", metadata.ogDescription);
    html = replaceMeta(html, "property", "og:type", metadata.ogType);
    html = replaceMeta(html, "property", "og:url", metadata.canonical);
    html = replaceMeta(html, "name", "twitter:title", metadata.twitterTitle);
    html = replaceMeta(
        html,
        "name",
        "twitter:description",
        metadata.twitterDescription
    );
    html = replaceCanonical(html, metadata.canonical);

    return html;
}

function validateRenderedHtml(html, route, metadata, templateAssets) {
    const titleMatches = [...html.matchAll(/<title\b[^>]*>([\s\S]*?)<\/title>/gi)];
    const expectations = [
        ["name", "description", metadata.description],
        ["property", "og:title", metadata.ogTitle],
        ["property", "og:description", metadata.ogDescription],
        ["property", "og:type", metadata.ogType],
        ["property", "og:url", metadata.canonical],
        ["name", "twitter:title", metadata.twitterTitle],
        ["name", "twitter:description", metadata.twitterDescription]
    ];

    assert.equal(titleMatches.length, 1, `Expected one title for ${route}`);
    assert.equal(titleMatches[0][1], escapeText(metadata.title), `Wrong title for ${route}`);

    for (const [attributeName, attributeValue, expectedContent] of expectations) {
        const matches = findMetaTags(html, attributeName, attributeValue);

        assert.equal(matches.length, 1, `Wrong ${attributeValue} count for ${route}`);
        assert.equal(
            getAttribute(matches[0].tag, "content"),
            escapeAttribute(expectedContent),
            `Wrong ${attributeValue} for ${route}`
        );
    }

    const canonicalTags = findCanonicalTags(html);

    assert.equal(canonicalTags.length, 1, `Wrong canonical count for ${route}`);
    assert.equal(
        getAttribute(canonicalTags[0].tag, "href"),
        escapeAttribute(metadata.canonical),
        `Wrong canonical for ${route}`
    );
    assert.deepEqual(getAssetReferences(html), templateAssets, `Assets differ for ${route}`);
    assert.equal(
        findTags(html, "div", (tag) => getAttribute(tag, "id") === "root").length,
        1,
        `React root differs for ${route}`
    );
}

async function main() {
    const [template, sitemap] = await Promise.all([
        readFile(TEMPLATE_PATH, "utf8"),
        readFile(SITEMAP_PATH, "utf8")
    ]);
    const entries = Object.entries(seoConfig);
    const templateAssets = validateTemplate(template);

    validateConfiguration(entries, sitemap);

    const renderedRoutes = entries.map(([route, metadata]) => {
        const html = renderRouteHtml(template, metadata);
        const outputPath = getOutputPath(route);

        validateRenderedHtml(html, route, metadata, templateAssets);

        return { html, metadata, outputPath, route };
    });

    for (const { html, outputPath } of renderedRoutes) {
        await mkdir(path.dirname(outputPath), { recursive: true });
        await writeFile(outputPath, html, "utf8");
    }

    for (const { metadata, outputPath, route } of renderedRoutes) {
        const outputStat = await stat(outputPath);
        const html = await readFile(outputPath, "utf8");

        assert.ok(outputStat.isFile(), `Generated output is not a file for ${route}`);
        assert.ok(outputStat.size > 0, `Generated output is empty for ${route}`);
        validateRenderedHtml(html, route, metadata, templateAssets);
    }

    const expectedOutputPaths = renderedRoutes
        .map(({ outputPath }) => outputPath)
        .sort();
    const actualOutputPaths = (await findIndexHtmlFiles(DIST_DIRECTORY)).sort();

    assert.deepEqual(
        actualOutputPaths,
        expectedOutputPaths,
        "dist must contain exactly the 11 configured route shells"
    );

    console.log(`Generated ${renderedRoutes.length} route-specific HTML shells:`);
    for (const { outputPath, route } of renderedRoutes) {
        console.log(`- ${route} -> ${path.relative(FRONTEND_DIRECTORY, outputPath)}`);
    }
}

main().catch((error) => {
    console.error(`Route HTML generation failed: ${error.message}`);
    process.exitCode = 1;
});
