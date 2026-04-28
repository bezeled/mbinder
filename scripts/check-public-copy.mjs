import { readdir, readFile, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(scriptDir, "..");
const distDir = path.join(projectRoot, "apps", "web", "dist");

const bannedPatterns = [
  { pattern: /\bSanity\b/i, label: "internal CMS reference" },
  { pattern: /\bsurface here first\b/i, label: "internal workflow language" },
  { pattern: /\bcoming soon\b/i, label: "placeholder copy" },
  { pattern: /\blorem ipsum\b/i, label: "placeholder copy" },
  { pattern: /\bdummy text\b/i, label: "placeholder copy" },
  { pattern: /\bplaceholder\b/i, label: "placeholder copy" },
  { pattern: /\binsert\b.{0,40}\bhere\b/i, label: "placeholder copy" },
  { pattern: /\bTODO\b/, label: "unfinished copy marker" },
];

async function getHtmlFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = await Promise.all(entries.map(async (entry) => {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      return getHtmlFiles(fullPath);
    }

    if (entry.isFile() && fullPath.endsWith(".html")) {
      return [fullPath];
    }

    return [];
  }));

  return files.flat();
}

function getLineNumber(source, matchIndex) {
  return source.slice(0, matchIndex).split("\n").length;
}

function decodeEntities(source) {
  return source
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&quot;/gi, "\"")
    .replace(/&#39;/gi, "'");
}

function extractVisibleText(html) {
  return decodeEntities(
    html
      .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, " ")
      .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, " ")
      .replace(/<noscript\b[^>]*>[\s\S]*?<\/noscript>/gi, " ")
      .replace(/<!--[\s\S]*?-->/g, " ")
      .replace(/<\/(p|div|section|article|header|footer|nav|main|li|ul|ol|h1|h2|h3|h4|h5|h6|br|hr|time|form|label|textarea|button|a)>/gi, "\n")
      .replace(/<[^>]+>/g, " ")
      .replace(/[ \t]+\n/g, "\n")
      .replace(/\n[ \t]+/g, "\n")
      .replace(/\n{3,}/g, "\n\n")
      .trim(),
  );
}

async function main() {
  const distStats = await stat(distDir).catch(() => null);

  if (!distStats?.isDirectory()) {
    console.error(`Public copy check failed: build output not found at ${distDir}`);
    console.error("Run the web build before checking public copy.");
    process.exit(1);
  }

  const htmlFiles = await getHtmlFiles(distDir);
  const findings = [];

  for (const filePath of htmlFiles) {
    const source = await readFile(filePath, "utf8");
    const visibleText = extractVisibleText(source);

    for (const { pattern, label } of bannedPatterns) {
      const match = pattern.exec(visibleText);

      if (!match || match.index === undefined) {
        continue;
      }

      findings.push({
        filePath,
        line: getLineNumber(visibleText, match.index),
        label,
        snippet: match[0],
      });
    }
  }

  if (findings.length > 0) {
    console.error("Public copy check failed. Suspicious copy found in generated HTML:");

    for (const finding of findings) {
      const relativePath = path.relative(projectRoot, finding.filePath);
      console.error(
        `- ${relativePath}:${finding.line} (${finding.label}) matched "${finding.snippet}"`,
      );
    }

    process.exit(1);
  }

  console.log(`Public copy check passed across ${htmlFiles.length} generated HTML files.`);
}

main().catch((error) => {
  console.error("Public copy check failed with an unexpected error.");
  console.error(error);
  process.exit(1);
});
