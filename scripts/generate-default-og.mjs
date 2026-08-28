// One-off generator for the default OG/Twitter share image. Re-run with
// `node scripts/generate-default-og.mjs` if the brand colors or name change.
// This is a generic branded fallback, not a substitute for real per-article
// featured images.
import sharp from "sharp";
import { mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";

const WIDTH = 1200;
const HEIGHT = 630;

const svg = `
<svg width="${WIDTH}" height="${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${WIDTH}" height="${HEIGHT}" fill="#1c1917" />
  <rect x="0" y="0" width="10" height="${HEIGHT}" fill="#b5502f" />
  <text x="90" y="270" font-family="Georgia, 'Times New Roman', serif" font-size="72" fill="#faf6ee">Aaron Joseph Hall</text>
  <text x="90" y="330" font-family="Georgia, 'Times New Roman', serif" font-size="30" letter-spacing="1" fill="#b5502f">PASTOR · AUTHOR · SPEAKER · TEACHER · CONSULTANT</text>
</svg>
`;

const outDir = fileURLToPath(new URL("../public", import.meta.url));
const outFile = fileURLToPath(new URL("../public/og-default.png", import.meta.url));
mkdirSync(outDir, { recursive: true });

await sharp(Buffer.from(svg)).png().toFile(outFile);

console.log("Wrote public/og-default.png");
