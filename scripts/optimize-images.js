#!/usr/bin/env node
/**
 * Generate optimized hero image variants (webp + jpg) and rasterize the OG image.
 * Run: node scripts/optimize-images.js
 * Sources:  src/assets/jay-egger-headshot.JPG, src/assets/og-image.svg
 * Outputs:  src/assets/jay-egger-headshot-800.webp, -800.jpg, og-image.png
 */
const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const ASSETS = path.join(__dirname, "..", "src", "assets");
const SRC = path.join(__dirname, "..", "assets-src");
const HERO_SRC = path.join(SRC, "jay-egger-headshot.JPG");
const OG_SVG = path.join(ASSETS, "og-image.svg");
const FAVICON_SVG = path.join(ASSETS, "favicon.svg");

async function hero() {
  const base = sharp(HERO_SRC).rotate().resize({ width: 800, withoutEnlargement: true });
  await base.clone().webp({ quality: 78 }).toFile(path.join(ASSETS, "jay-egger-headshot-800.webp"));
  await base.clone().jpeg({ quality: 82, mozjpeg: true }).toFile(path.join(ASSETS, "jay-egger-headshot-800.jpg"));
}

async function og() {
  const svg = fs.readFileSync(OG_SVG);
  await sharp(svg, { density: 192 })
    .resize(1200, 630)
    .png({ compressionLevel: 9 })
    .toFile(path.join(ASSETS, "og-image.png"));
}

async function appleTouch() {
  const svg = fs.readFileSync(FAVICON_SVG);
  await sharp(svg, { density: 512 })
    .resize(180, 180)
    .png({ compressionLevel: 9 })
    .toFile(path.join(ASSETS, "apple-touch-icon.png"));
}

async function main() {
  await Promise.all([hero(), og(), appleTouch()]);
  const files = [
    "jay-egger-headshot-800.webp",
    "jay-egger-headshot-800.jpg",
    "og-image.png",
    "apple-touch-icon.png",
  ];
  for (const f of files) {
    const stat = fs.statSync(path.join(ASSETS, f));
    console.log(`${f.padEnd(36)} ${(stat.size / 1024).toFixed(1)} KB`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
