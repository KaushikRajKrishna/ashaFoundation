// One-off downloader for real, freely-licensed stock photography from
// Unsplash (https://unsplash.com/license — free for commercial and
// non-commercial use, no attribution legally required; credited anyway
// in src/assets/images/CREDITS.md as good practice).
// Run manually with: node scripts/download-stock-photos.mjs
import { writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import https from "node:https";

const rootDir = path.dirname(fileURLToPath(import.meta.url));
const imagesDir = path.join(rootDir, "..", "src", "assets", "images");

const PHOTOS = [
  // Carousel — wide 16:9
  { id: "1758962036781-c0dc907aea7b", out: "carousel/carousel-1-together.jpg", w: 1600, h: 900, photographer: "Emma", desc: "Family walking together on a wooded path" },
  { id: "1536011820821-64b5688ed99b", out: "carousel/carousel-2-conversation.jpg", w: 1600, h: 900, photographer: "Priscilla Du Preez", desc: "Two people in warm conversation, sitting on a log" },
  { id: "1656577796467-e049bfc98376", out: "carousel/carousel-3-compassion.jpg", w: 1600, h: 900, photographer: "Jametlene Reskp", desc: "Group hug between friends" },
  { id: "1500534623283-312aade485b7", out: "carousel/carousel-4-hope.jpg", w: 1600, h: 900, photographer: "Ivana Cajina", desc: "Silhouette of mountains at sunset" },
  { id: "1542601906990-b4d3fb778b09", out: "carousel/carousel-5-growth.jpg", w: 1600, h: 900, photographer: "Noah Buscher", desc: "Hands holding a small plant seedling in soil" },

  // Gallery — square
  { id: "1541978675-b88a2953aef3", out: "gallery/gallery-1-quiet-morning.jpg", w: 1200, h: 1200, photographer: "Todd Trapani", desc: "Sea during golden hour" },
  { id: "1702599057905-d3859caa8b61", out: "gallery/gallery-2-circle-of-support.jpg", w: 1200, h: 1200, photographer: "Joel Frank", desc: "Group of people standing in a circle" },
  { id: "1466094899371-97b327dff551", out: "gallery/gallery-3-gentle-waves.jpg", w: 1200, h: 1200, photographer: "Mathyas Kurmann", desc: "Calm body of water" },
  { id: "1524247108137-732e0f642303", out: "gallery/gallery-4-rooted-and-growing.jpg", w: 1200, h: 1200, photographer: "Quilia", desc: "People planting flowers together" },
  { id: "1582213782179-e0d53f98f2ca", out: "gallery/gallery-5-shared-light.jpg", w: 1200, h: 1200, photographer: "Hannah Busing", desc: "Group stacking hands together" },
  { id: "1781255543271-ff15b084f621", out: "gallery/gallery-6-breathing-space.jpg", w: 1200, h: 1200, photographer: "Jason Leung", desc: "Cozy, quiet room with floor cushions" },
  { id: "1581224463294-908316338239", out: "gallery/gallery-7-new-beginnings.jpg", w: 1200, h: 1200, photographer: "Nic Y-C", desc: "Clouds and sun during sunset" },
  { id: "1527610236083-418266bf5c0e", out: "gallery/gallery-8-steady-hands.jpg", w: 1200, h: 1200, photographer: "KaLisa Veer", desc: "Two people in supportive conversation on a dock" },

  // Feature illustrations (now real photos) — square, used in parallax sections
  { id: "1506126613408-eca07ce68773", out: "features/feature-1-mindfulness.jpg", w: 1200, h: 1200, photographer: "Jared Rice", desc: "Woman meditating on the floor" },
  { id: "1590682680695-43b964a3ae17", out: "features/feature-2-growth.jpg", w: 1200, h: 1200, photographer: "GreenForce Staffing", desc: "Hands planting a small seedling in soil" },
  { id: "1511632765486-a01980e01a18", out: "features/feature-3-connection.jpg", w: 1200, h: 1200, photographer: "Helena Lopes", desc: "Friends with arms around each other's shoulders" },
  { id: "1490730141103-6cac27aaab94", out: "features/feature-4-hope.jpg", w: 1200, h: 1200, photographer: "Mohamed Nohassi", desc: "Silhouette of a person standing on a rock surrounded by water" },
  { id: "1458501534264-7d326fa0ca04", out: "features/feature-5-balance.jpg", w: 1200, h: 1200, photographer: "Jeremy Thomas", desc: "Stacked balancing rocks on a seashore" },
  { id: "1720760585814-5c5280ea72d5", out: "features/feature-6-journey.jpg", w: 1200, h: 1200, photographer: "Anton Sobotyak", desc: "A path through a forest" },
];

function download(url, destPath) {
  return new Promise((resolve, reject) => {
    https
      .get(url, { headers: { "User-Agent": "AshaFoundationSiteBuild/1.0" } }, (res) => {
        if (res.statusCode !== 200) {
          reject(new Error(`HTTP ${res.statusCode} for ${url}`));
          return;
        }
        const chunks = [];
        res.on("data", (c) => chunks.push(c));
        res.on("end", () => {
          writeFileSync(destPath, Buffer.concat(chunks));
          resolve();
        });
      })
      .on("error", reject);
  });
}

const credits = [
  "# Photo Credits",
  "",
  "Stock photography sourced from [Unsplash](https://unsplash.com), used under the",
  "[Unsplash License](https://unsplash.com/license) (free for commercial and",
  "non-commercial use; attribution not legally required, listed here anyway).",
  "",
  "Replace any of these with your own photography at any time — just overwrite",
  "the file at the same path (or add new files; see src/content/README.md for",
  "how the carousel/gallery folders are auto-discovered).",
  "",
  "| File | Photographer | Description | Unsplash photo ID |",
  "| --- | --- | --- | --- |",
];

for (const photo of PHOTOS) {
  const url = `https://images.unsplash.com/photo-${photo.id}?w=${photo.w}&h=${photo.h}&fit=crop&q=80&fm=jpg`;
  const destPath = path.join(imagesDir, photo.out);
  await download(url, destPath);
  console.log(`Downloaded ${photo.out}`);
  credits.push(`| \`${photo.out}\` | ${photo.photographer} | ${photo.desc} | \`${photo.id}\` |`);
}

credits.push(
  "",
  "To view or re-download any of these at a different crop, use:",
  "`https://images.unsplash.com/photo-<id>?w=<width>&h=<height>&fit=crop&q=80`"
);

writeFileSync(path.join(imagesDir, "CREDITS.md"), credits.join("\n") + "\n", "utf8");
console.log(`\nWrote ${PHOTOS.length} photos and CREDITS.md`);
