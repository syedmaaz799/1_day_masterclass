import sharp from "sharp";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const source = path.join(root, "public/brand-logos/NV LOGO UPDATED.png");

const TRANSPARENT = { r: 0, g: 0, b: 0, alpha: 0 };

/** Circular SVG mask — transparent corners so the tab favicon reads round, not square. */
function circleMask(size) {
  const r = size / 2;
  return Buffer.from(
    `<svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">` +
      `<circle cx="${r}" cy="${r}" r="${r}" fill="white"/></svg>`,
  );
}

/**
 * Crop to the crest only (exclude the bottom "NEURALVARSITY" banner).
 */
async function crestSource() {
  const meta = await sharp(source).metadata();
  const width = meta.width ?? 1331;
  const height = meta.height ?? 1304;

  const side = Math.round(Math.min(width, height * 0.84));
  const left = Math.round((width - side) / 2);

  return sharp(source).extract({ left, top: 0, width: side, height: side });
}

/** Crest scaled inside a circle with transparent outer pixels. */
function roundFavicon(crest, size) {
  const inner = Math.round(size * 0.88);
  const padX = Math.floor((size - inner) / 2);
  const padY = Math.floor((size - inner) / 2);
  /** Wreath is visually top-heavy — nudge crest down for optical center in the tab. */
  const shiftDown = Math.max(1, Math.round(size * 0.07));

  return crest
    .clone()
    .resize(inner, inner, { fit: "contain", background: TRANSPARENT })
    .extend({
      top: padY + shiftDown,
      bottom: Math.max(0, padY - shiftDown),
      left: padX,
      right: size - inner - padX,
      background: TRANSPARENT,
    })
    .composite([{ input: circleMask(size), blend: "dest-in" }])
    .png({ compressionLevel: 9 });
}

const outputs = [
  { file: "src/app/icon.png", size: 32 },
  { file: "src/app/apple-icon.png", size: 180 },
  { file: "public/favicon.png", size: 32 },
  { file: "public/apple-touch-icon.png", size: 180 },
  { file: "public/favicon-16x16.png", size: 16 },
  { file: "public/favicon-32x32.png", size: 32 },
  { file: "public/favicon-48x48.png", size: 48 },
];

const crest = await crestSource();

for (const { file, size } of outputs) {
  const out = path.join(root, file);
  await mkdir(path.dirname(out), { recursive: true });
  await roundFavicon(crest, size).toFile(out);
  console.log(`wrote ${file} (${size}x${size}, round)`);
}

const ico32 = await roundFavicon(crest, 32).toBuffer();

await writeFile(path.join(root, "public/favicon.ico"), ico32);
await writeFile(path.join(root, "src/app/favicon.ico"), ico32);
console.log("wrote favicon.ico (32px, round transparent)");
