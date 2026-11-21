import { readdir, stat } from "node:fs/promises";
import { extname, join, parse, resolve } from "node:path";
import sharp from "sharp";

// Covers are redrawn in the site's own language: shrunk to a 240x135 pixel
// grid, every pixel snapped to the ink-and-bone ramp (cool, saturated light
// becomes verdigris), then scaled back up nearest-neighbor. Any photo or
// painting comes out as Escher-world pixel art.

console.log("building blog images...");

const blogDir = resolve(import.meta.dirname, "../client/public/blog");
const GRID = { width: 240, height: 135 };
const widths = [480, 960, 1440];
const RAMP: [number, number, number][] = [
  [0x14, 0x13, 0x0f],
  [0x1d, 0x1c, 0x16],
  [0x3a, 0x38, 0x2f],
  [0x6f, 0x6c, 0x5e],
  [0x8b, 0x87, 0x78],
  [0xc4, 0xbe, 0xac],
  [0xec, 0xe6, 0xd4],
];
const ACCENT: [number, number, number][] = [
  [0x1d, 0x4a, 0x41],
  [0x33, 0x79, 0x6a],
  [0x4a, 0xa5, 0x8e],
];
const luma = ([r, g, b]: number[]) => 0.2126 * r + 0.7152 * g + 0.0722 * b;
const RAMP_LUMA = RAMP.map(luma);
const ACCENT_LUMA = ACCENT.map(luma);
const nearest = (l: number, lumas: number[]) =>
  lumas.reduce((best, v, i) => (Math.abs(v - l) < Math.abs(lumas[best] - l) ? i : best), 0);

const scriptMtime = (await stat(import.meta.filename)).mtimeMs;
const images = (await readdir(blogDir))
  .filter((file) => [".jpg", ".jpeg"].includes(extname(file).toLowerCase()) && !/-\d+\.jpe?g$/i.test(file))
  .sort();

await Promise.all(
  images.map(async (file) => {
    const source = join(blogDir, file);
    const { width, height } = await sharp(source).metadata();

    if (!width || !height || width * 9 !== height * 16) {
      throw new Error(
        `${source} must use a 16:9 aspect ratio to match BlogPost's 1440x810 intrinsic dimensions`,
      );
    }

    const name = parse(file).name;
    const outs = [
      ...widths.map((w) => join(blogDir, `${name}-${w}.webp`)),
      join(blogDir, `${name}-1440.jpg`),
    ];
    const newest = Math.max((await stat(source)).mtimeMs, scriptMtime);
    const fresh = await Promise.all(
      outs.map((out) => stat(out).then(({ mtimeMs }) => mtimeMs >= newest).catch(() => false)),
    );
    if (fresh.every(Boolean)) return;

    const { data } = await sharp(source)
      .resize(GRID.width, GRID.height, { kernel: "lanczos3" })
      .modulate({ brightness: 1.08 })
      .removeAlpha()
      .raw()
      .toBuffer({ resolveWithObject: true });

    const pixels = Buffer.alloc(data.length);
    for (let i = 0; i < data.length; i += 3) {
      const rgb = [data[i], data[i + 1], data[i + 2]];
      const max = Math.max(...rgb);
      const min = Math.min(...rgb);
      const sat = max === 0 ? 0 : (max - min) / max;
      const cool = rgb[2] + rgb[1] > 2 * rgb[0] + 40;
      const l = luma(rgb);
      const swatch = sat > 0.45 && cool && l > 60 ? ACCENT[nearest(l, ACCENT_LUMA)] : RAMP[nearest(l, RAMP_LUMA)];
      pixels.set(swatch, i);
    }
    const grid = sharp(pixels, { raw: { width: GRID.width, height: GRID.height, channels: 3 } });
    const png = await grid.png().toBuffer();

    await Promise.all([
      ...widths.map((w, i) =>
        sharp(png)
          .resize({ width: w, kernel: "nearest" })
          .webp({ lossless: true })
          .toFile(outs[i]),
      ),
      sharp(png).resize({ width: 1440, kernel: "nearest" }).jpeg({ quality: 90 }).toFile(outs[widths.length]),
    ]);
  }),
);
