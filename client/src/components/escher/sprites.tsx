// Escher design system: pixel sprites rendered to canvas at 1px per cell and
// upscaled with nearest-neighbor. Canvas avoids the hairline seams box-shadow
// sprites show at fractional zoom. Shapes are generated from geometry.
import { useEffect, useRef } from "react";

type SpriteProps = {
  map: string[];
  palette: Record<string, string>;
  scale?: number;
  style?: React.CSSProperties;
  className?: string;
};

export function Sprite({ map, palette, scale = 4, style, className }: SpriteProps) {
  const ref = useRef<HTMLCanvasElement>(null);
  const cols = Math.max(...map.map((r) => r.length));
  const rows = map.length;

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    // palette entries starting with "--" resolve against the page's CSS vars,
    // so sprites follow the active accent
    const styles = getComputedStyle(canvas);
    const resolve = (c: string) => (c.startsWith("--") ? styles.getPropertyValue(c).trim() || "#f0f" : c);
    ctx.clearRect(0, 0, cols, rows);
    map.forEach((row, y) => {
      [...row].forEach((ch, x) => {
        const color = palette[ch];
        if (color) {
          ctx.fillStyle = resolve(color);
          ctx.fillRect(x, y, 1, 1);
        }
      });
    });
  }, [map, palette, cols, rows]);

  return (
    <canvas
      ref={ref}
      width={cols}
      height={rows}
      className={className}
      aria-hidden
      style={{
        width: cols * scale,
        maxWidth: "100%",
        height: "auto",
        imageRendering: "pixelated",
        ...style,
      }}
    />
  );
}

// A Penrose tribar drawn in 2:1 pixel isometric. Three beams (one per iso axis)
// close a circuit that cannot exist in 3D. Faces: A = top (light), B = left wall
// (mid), C = right wall (dark). The cyclic overdraw at the corners IS the illusion.
// K = triangle edge, TU = beam thickness, TW = wall height, dilate = raster
// dilation (higher fills small nicks, tuned per size).
function makeTribar(K: number, TU: number, TW: number, dilate: number, groove: boolean): string[] {
  const W = K + 2 * TU + 8;
  const H = K + TW + 10;
  const g: string[][] = Array.from({ length: H }, () => Array(W).fill("."));
  const DIR: Record<string, [number, number]> = { u: [1, -0.5], v: [-1, -0.5], w: [0, 1] };

  const quad = (qx: number, qy: number, a: string, la: number, b: string, lb: number, ch: string) => {
    const [ax, ay] = DIR[a];
    const [bx, by] = DIR[b];
    const verts: [number, number][] = [
      [qx, qy],
      [qx + ax * la, qy + ay * la],
      [qx + ax * la + bx * lb, qy + ay * la + by * lb],
      [qx + bx * lb, qy + by * lb],
    ];
    const area =
      (verts[1][0] - verts[0][0]) * (verts[2][1] - verts[0][1]) -
      (verts[2][0] - verts[0][0]) * (verts[1][1] - verts[0][1]);
    const sign = area >= 0 ? 1 : -1;
    const xs = verts.map((p) => p[0]);
    const ys = verts.map((p) => p[1]);
    const x0 = Math.max(0, Math.floor(Math.min(...xs) - 1));
    const x1 = Math.min(W - 1, Math.ceil(Math.max(...xs) + 1));
    const y0 = Math.max(0, Math.floor(Math.min(...ys) - 1));
    const y1 = Math.min(H - 1, Math.ceil(Math.max(...ys) + 1));
    for (let y = y0; y <= y1; y++) {
      for (let x = x0; x <= x1; x++) {
        const cx = x + 0.5;
        const cy = y + 0.5;
        let inside = true;
        for (let i = 0; i < 4; i++) {
          const [vx1, vy1] = verts[i];
          const [vx2, vy2] = verts[(i + 1) % 4];
          const ex = vx2 - vx1;
          const ey = vy2 - vy1;
          const cross = (ex * (cy - vy1) - ey * (cx - vx1)) * sign;
          if (cross < -dilate * Math.hypot(ex, ey)) {
            inside = false;
            break;
          }
        }
        if (inside) g[y][x] = ch;
      }
    }
  };

  // corners of the circuit: O bottom-left, AP apex (right), TC top-left
  const O: [number, number] = [TU + 2, H - TW - 4];
  const TC: [number, number] = [O[0], O[1] - K];
  const AP: [number, number] = [O[0] + K, O[1] - K / 2];

  // Beams and corner elbows in cyclic depth order. Each elbow draws only the
  // faces the canonical figure shows there; the last one closes the loop.
  quad(TC[0], TC[1], "w", K, "u", TU, "C"); // vertical beam
  quad(TC[0], TC[1], "w", K, "v", TU, "B");
  quad(AP[0], AP[1], "v", K, "u", TU, "A"); // top beam
  quad(AP[0], AP[1], "v", K, "w", TW, "B");
  if (groove) quad(AP[0] + 3, AP[1] - 1.5, "v", K, "u", 2, "G");
  quad(TC[0], TC[1], "u", TU, "v", TU, "A"); // top-left elbow: cap + left wall
  quad(TC[0], TC[1], "v", TU, "w", TW, "B");
  quad(O[0], O[1], "u", K, "v", TU, "A"); // bottom beam
  quad(O[0], O[1], "u", K, "w", TW, "C");
  if (groove) quad(O[0] - 3, O[1] - 1.5, "u", K, "v", 2, "G");
  quad(AP[0], AP[1], "u", TU, "v", TU, "A"); // apex elbow: cap + end wall
  quad(AP[0], AP[1], "u", TU, "w", TW, "C");
  quad(O[0], O[1], "u", TU, "v", TU, "A"); // bottom-left elbow: vertical's foot
  quad(O[0], O[1], "v", TU, "w", TW, "B");
  quad(O[0], O[1], "u", TU, "w", TW, "C");

  return g.map((row) => row.join(""));
}

// A Necker wireframe cube: solid iso cube, then only the edge pixels kept.
function makeWireCube(): string[] {
  const W = 16;
  const H = 16;
  const solid: string[][] = Array.from({ length: H }, () => Array(W).fill("."));
  for (let y = 0; y < 8; y++) {
    const k = y < 4 ? y : 7 - y;
    const half = 2 * k + 2;
    for (let x = 8 - half; x < 8 + half; x++) solid[y][x] = "T";
  }
  for (let y = 4; y < 8; y++) {
    for (let x = 0; x < W; x++) {
      if (solid[y][x] === ".") solid[y][x] = x < 8 ? "L" : "R";
    }
  }
  for (let y = 8; y < 16; y++) {
    if (y < 12) {
      for (let x = 0; x < W; x++) solid[y][x] = x < 8 ? "L" : "R";
    } else {
      const k = 15 - y;
      const half = 2 * k + 2;
      for (let x = 8 - half; x < 8 + half; x++) solid[y][x] = x < 8 ? "L" : "R";
    }
  }
  const g: string[][] = Array.from({ length: H }, () => Array(W).fill("."));
  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      if (solid[y][x] === ".") continue;
      const neighbors: [number, number][] = [[1, 0], [-1, 0], [0, 1], [0, -1]];
      const edge = neighbors.some(([dx, dy]) => {
        const nx = x + dx;
        const ny = y + dy;
        return nx < 0 || nx >= W || ny < 0 || ny >= H || solid[ny][nx] === "." || solid[ny][nx] !== solid[y][x];
      });
      if (edge) g[y][x] = "A";
    }
  }
  return g.map((row) => row.join(""));
}

export const TRIBAR = makeTribar(52, 8, 8, 0.45, true);
export const MINI_TRIBAR = makeTribar(28, 6, 6, 0.45, false);
export const WIRECUBE = makeWireCube();

export const POLY_PAL = { A: "#ece6d4", B: "#8b8778", C: "#3a382f", G: "#b9b3a0" };
export const POLY_PAL_ACCENT = { A: "--accent", B: "--accent-mid", C: "--accent-dark" };

// The impossible triangle, standing alone.
export function TribarScene() {
  return <Sprite map={TRIBAR} palette={POLY_PAL} scale={5} />;
}
