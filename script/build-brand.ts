import { writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import sharp from "sharp";
import { makePenrose, standUp } from "../client/src/components/escher/geometry";

// Draws the favicon set from the same tribar the top bar uses.
// Run by hand after changing the mark: bun run script/build-brand.ts

const publicDir = resolve(import.meta.dirname, "../client/public");
const mark = standUp(makePenrose(6, 1, 3, false).map);
const colors: Record<string, string> = { T: "#ece6d4", L: "#8b8778", R: "#3a382f" };

const svg = (box: number) => {
  const size = mark.length;
  const offset = (box - size) / 2;
  const rects = mark.flatMap((row, y) => {
    const runs: string[] = [];
    let x = 0;
    while (x < row.length) {
      const ch = row[x];
      let end = x;
      while (row[end + 1] === ch) end++;
      if (colors[ch]) runs.push(`<rect x="${x + offset}" y="${y + offset}" width="${end - x + 1}" height="1" fill="${colors[ch]}"/>`);
      x = end + 1;
    }
    return runs;
  });
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${box} ${box}" shape-rendering="crispEdges"><rect width="${box}" height="${box}" fill="#14130f"/>${rects.join("")}</svg>`;
};

const favicon = svg(28);
await writeFile(resolve(publicDir, "favicon.svg"), favicon);
await sharp(Buffer.from(svg(28)), { density: 72 }).resize(56, 56, { kernel: "nearest" }).png().toFile(resolve(publicDir, "favicon.png"));
await sharp(Buffer.from(svg(30)), { density: 72 }).resize(180, 180, { kernel: "nearest" }).png().toFile(resolve(publicDir, "apple-touch-icon.png"));
console.log("favicon.svg, favicon.png, apple-touch-icon.png");
