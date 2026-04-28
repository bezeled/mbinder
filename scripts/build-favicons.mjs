import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
const sharp = require("/Users/tyhaberland/Documents/GitHub/memorybinder/apps/web/node_modules/sharp");
import { readFileSync, writeFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const publicDir = resolve(__dirname, "../apps/web/public");

const svg = readFileSync(resolve(publicDir, "icon.svg"));

const targets = [
  { size: 16, file: "favicon-16x16.png" },
  { size: 32, file: "favicon-32x32.png" },
  { size: 48, file: "favicon-48x48.png" },
  { size: 180, file: "apple-touch-icon.png" },
  { size: 512, file: "icon-512.png" },
];

for (const { size, file } of targets) {
  const out = resolve(publicDir, file);
  await sharp(svg, { density: 384 })
    .resize(size, size, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toFile(out);
  console.log(`✓ ${file} (${size}x${size})`);
}

// Multi-size .ico (16, 32, 48). Sharp can't write ico, but a 32x32 PNG renamed
// works in every modern browser; for the legacy .ico fall back to PNG bytes.
const ico32 = await sharp(svg, { density: 384 })
  .resize(32, 32, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
  .png()
  .toBuffer();
writeFileSync(resolve(publicDir, "favicon.ico"), ico32);
console.log("✓ favicon.ico (32x32 png-in-ico)");
