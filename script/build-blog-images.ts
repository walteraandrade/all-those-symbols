import { readdir, stat } from "node:fs/promises";
import { extname, join, parse } from "node:path";
import sharp from "sharp";

console.log("building blog images...");

const blogDir = "client/public/blog";
const widths = [480, 960, 1600];
const images = (await readdir(blogDir))
  .filter((file) => [".jpg", ".jpeg"].includes(extname(file).toLowerCase()))
  .sort();

await Promise.all(
  images.map(async (file) => {
    const source = join(blogDir, file);
    const { width, height } = await sharp(source).metadata();

    if (!width || !height || width * 9 !== height * 16) {
      throw new Error(
        `${source} must use a 16:9 aspect ratio to match BlogPost's 1600x900 intrinsic dimensions`,
      );
    }

    const targets = widths.map((targetWidth) => ({
      targetWidth,
      out: join(blogDir, `${parse(file).name}-${targetWidth}.webp`),
    }));
    const sourceMtime = (await stat(source)).mtimeMs;
    const fresh = await Promise.all(
      targets.map(({ out }) =>
        stat(out).then(({ mtimeMs }) => mtimeMs >= sourceMtime).catch(() => false),
      ),
    );
    if (fresh.every(Boolean)) return;

    await Promise.all(
      targets.map(({ targetWidth, out }) =>
        sharp(source)
          .resize({ width: targetWidth })
          .webp({ quality: 82, effort: 6, preset: "photo", smartSubsample: true })
          .toFile(out),
      ),
    );
  }),
);
