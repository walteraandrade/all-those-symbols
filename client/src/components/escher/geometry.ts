// Pure pixel geometry for the Escher sprites. No React, so build scripts can
// draw the favicon and share image from the same shapes the site uses.

export type PixelMap = string[];

type V = [number, number, number];
type Pt = [number, number];

// Fills a polygon at pixel centres (even-odd), so faces share edges cleanly.
const fillPoly = (g: string[][], poly: Pt[], paint: (x: number, y: number) => void) => {
  const xs = poly.map((p) => p[0]);
  const ys = poly.map((p) => p[1]);
  for (let y = Math.max(0, Math.floor(Math.min(...ys))); y <= Math.min(g.length - 1, Math.ceil(Math.max(...ys))); y++) {
    for (let x = Math.max(0, Math.floor(Math.min(...xs))); x <= Math.min(g[0].length - 1, Math.ceil(Math.max(...xs))); x++) {
      const cx = x + 0.5;
      const cy = y + 0.5;
      let inside = false;
      for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
        const [xi, yi] = poly[i];
        const [xj, yj] = poly[j];
        if ((yi > cy) !== (yj > cy) && cx < ((xj - xi) * (cy - yi)) / (yj - yi) + xi) inside = !inside;
      }
      if (inside) paint(x, y);
    }
  }
};

// A Penrose tribar built from voxels in 2:1 pixel isometric, seen from +x+y+z.
// Three bars (along x, y, z), each `thick` voxels square and `len` long, walk
// a path whose end lands, on screen, exactly on its start. Drawing the z bar
// before the x bar puts the x bar's first cubes in front of the z bar's last
// ones, and that one wrong overlap is the impossible joint.
// Faces: T top (light), L the y+ wall (mid), R the x+ wall (dark).
// With `channel`, a groove W runs down the middle of the vertical bar's wall
// and back along the tops of the two slanted bars. `flow` gives each groove
// cell its distance (in voxels) along that closed loop, for animating water.
export function makePenrose(len: number, thick: number, cell: number, channel: boolean, shadow = 0) {
  const P = (x: number, y: number, z: number): Pt => [(x - y) * cell, ((x + y) * cell) / 2 - z * cell];
  const span = len + thick;
  const bars: { p: V; groove: number }[][] = [[], [], []];
  const mid = Math.floor(thick / 2);
  for (let i = 0; i < span; i++) {
    for (let a = 0; a < thick; a++) {
      for (let b = 0; b < thick; b++) {
        // x bar: top face groove, water heading back toward the apex
        bars[0].push({ p: [i, a, b], groove: channel && a === mid && b === thick - 1 ? 2 * span + (span - i) : -1 });
        if (i >= thick) {
          // y bar: top face groove, climbing from the foot to the far corner
          bars[1].push({ p: [len + a, i, b], groove: channel && a === mid && b === thick - 1 ? span + (span - i) : -1 });
          // z bar: groove on its x+ wall, the fall itself
          bars[2].push({ p: [len + a, len + b, i], groove: channel && a === thick - 1 && b === mid ? span - i : -1 });
        }
      }
    }
  }
  const depth = (c: { p: V }) => c.p[0] + c.p[1] + c.p[2];
  bars.forEach((bar) => bar.sort((p, q) => depth(p) - depth(q)));
  const order = [...bars[2], ...bars[0], ...bars[1]];

  // the cast shadow: every voxel slid along the light onto the ground (z = 0)
  const ground = new Map<string, [number, number]>();
  if (shadow) {
    for (const { p: [x, y, z] } of order) {
      for (let k = 0; k <= z * shadow; k++) {
        const gx = x + k;
        const gy = y - Math.floor(k / 2);
        ground.set(`${gx},${gy}`, [gx, gy]);
      }
    }
  }
  const shade = [...ground.values()];

  const corners = [
    ...order.flatMap(({ p: [x, y, z] }) => [P(x, y + 1, z), P(x + 1, y, z), P(x, y, z + 1), P(x + 1, y + 1, z), P(x, y + 1, z + 1), P(x + 1, y, z + 1)]),
    ...shade.flatMap(([x, y]) => [P(x, y, 0), P(x + 1, y, 0), P(x, y + 1, 0), P(x + 1, y + 1, 0)]),
  ];
  const minX = Math.min(...corners.map((p) => p[0]));
  const minY = Math.min(...corners.map((p) => p[1]));
  const w = Math.ceil(Math.max(...corners.map((p) => p[0])) - minX);
  const h = Math.ceil(Math.max(...corners.map((p) => p[1])) - minY);
  const g: string[][] = Array.from({ length: h }, () => Array(w).fill("."));
  const flow: number[][] = Array.from({ length: h }, () => Array(w).fill(-1));
  const at = (x: number, y: number, z: number): Pt => {
    const [px, py] = P(x, y, z);
    return [px - minX, py - minY];
  };

  for (const [x, y] of shade) {
    fillPoly(g, [at(x, y, 0), at(x + 1, y, 0), at(x + 1, y + 1, 0), at(x, y + 1, 0)], (px, py) => { g[py][px] = "D"; });
  }

  for (const { p: [x, y, z], groove } of order) {
    const faces: [string, Pt[]][] = [
      ["T", [at(x, y, z + 1), at(x + 1, y, z + 1), at(x + 1, y + 1, z + 1), at(x, y + 1, z + 1)]],
      ["R", [at(x + 1, y, z), at(x + 1, y + 1, z), at(x + 1, y + 1, z + 1), at(x + 1, y, z + 1)]],
      ["L", [at(x, y + 1, z), at(x + 1, y + 1, z), at(x + 1, y + 1, z + 1), at(x, y + 1, z + 1)]],
    ];
    const wet = z >= thick && groove >= 0 ? "R" : "T";
    for (const [face, poly] of faces) {
      fillPoly(g, poly, (px, py) => {
        const water = groove >= 0 && face === wet;
        g[py][px] = water ? "W" : face;
        flow[py][px] = water ? groove : -1;
      });
    }
  }
  return { map: g.map((r) => r.join("")), flow, loop: 3 * span };
}

// Quarter turn counter-clockwise: the isometric tribar stood on its base.
// The 2:1 diagonals become 1:2, still whole-pixel steps.
export function standUp(map: PixelMap): PixelMap {
  const h = map.length;
  const w = Math.max(...map.map((r) => r.length));
  const out: string[] = [];
  for (let x = w - 1; x >= 0; x--) {
    let row = "";
    for (let y = 0; y < h; y++) row += map[y][x] ?? ".";
    out.push(row);
  }
  return out;
}

const ink = (g: string[][], x: number, y: number, ch: string) => {
  const cur = g[y]?.[x];
  if (cur === undefined) return;
  if (ch !== "M" || cur === ".") g[y][x] = ch;
  else if (cur === "F") g[y][x] = "H";
};

const line = (g: string[][], x0: number, y0: number, x1: number, y1: number, ch: string) => {
  const dx = Math.abs(x1 - x0);
  const dy = -Math.abs(y1 - y0);
  const sx = x0 < x1 ? 1 : -1;
  const sy = y0 < y1 ? 1 : -1;
  let err = dx + dy;
  for (;;) {
    ink(g, x0, y0, ch);
    if (x0 === x1 && y0 === y1) break;
    const e2 = 2 * err;
    // a diagonal step also inks the corner cell, so lines stay solid
    // staircases instead of dotted chains when scaled up
    if (e2 >= dy && e2 <= dx) ink(g, x0 + sx, y0, ch);
    if (e2 >= dy) { err += dy; x0 += sx; }
    if (e2 <= dx) { err += dx; y0 += sy; }
  }
};

// A Necker cube: all twelve edges, so it has no single reading. `front`
// picks which square reads as nearer: its face is filled (F) and its edges
// drawn light (A); the other square's edges go mid (M), and where they
// cross the filled face they stay visible as H. Swap it and the
// cube turns inside out without a pixel of the outline moving.
export function makeNecker(size: number, depth: number, front: 0 | 1, weight = 1): PixelMap {
  const w = size + depth + weight;
  const h = size + depth + weight;
  const g: string[][] = Array.from({ length: h }, () => Array(w).fill("."));
  const sq = [
    { x: 0, y: depth },
    { x: depth, y: 0 },
  ];
  const near = sq[front];
  const far = sq[1 - front];
  for (let y = near.y + 1; y < near.y + size; y++) {
    for (let x = near.x + 1; x < near.x + size; x++) g[y][x] = "F";
  }
  const stroke = (x0: number, y0: number, x1: number, y1: number, ch: string) => {
    for (let o = 0; o < weight; o++) line(g, x0 + o, y0 + o, x1 + o, y1 + o, ch);
  };
  const square = (s: { x: number; y: number }, ch: string) => {
    stroke(s.x, s.y, s.x + size, s.y, ch);
    stroke(s.x + size, s.y, s.x + size, s.y + size, ch);
    stroke(s.x + size, s.y + size, s.x, s.y + size, ch);
    stroke(s.x, s.y + size, s.x, s.y, ch);
  };
  square(far, "M");
  for (const [dx, dy] of [[0, 0], [size, 0], [0, size], [size, size]]) {
    stroke(far.x + dx, far.y + dy, near.x + dx, near.y + dy, "M");
  }
  square(near, "A");
  return g.map((r) => r.join(""));
}

// A water wheel, three-quarter view: a dark back rim set off up and right,
// then the front rim, spokes and paddle boards, turned by `turn` (radians).
// R front rim, K back rim and back boards, S spokes, P paddle faces, H hub.
export function makeWheel(radius: number, turn: number): PixelMap {
  const reach = radius + 5;
  const depth = 4;
  const size = 2 * reach + depth + 2;
  const cx = reach + 1;
  const cy = reach + depth + 1;
  const g: string[][] = Array.from({ length: size }, () => Array(size).fill("."));
  const set = (ch: string) => (x: number, y: number) => {
    g[y][x] = ch;
  };
  const board = (ox: number, oy: number, t: number, r0: number, r1: number, half: number, ch: string) => {
    const ux = Math.cos(t);
    const uy = Math.sin(t);
    const corner = (r: number, s: number): Pt => [ox + ux * r - uy * s, oy + uy * r + ux * s];
    fillPoly(g, [corner(r0, -half), corner(r1, -half), corner(r1, half), corner(r0, half)], set(ch));
  };
  const ring = (ox: number, oy: number, inner: number, outer: number, ch: string) => {
    for (let y = 0; y < size; y++) {
      for (let x = 0; x < size; x++) {
        const d = Math.hypot(x + 0.5 - ox, y + 0.5 - oy);
        if (d >= inner && d <= outer) g[y][x] = ch;
      }
    }
  };
  const paddles = 12;
  const angles = Array.from({ length: paddles }, (_, i) => turn + (i * Math.PI * 2) / paddles);
  const bx = cx + depth;
  const by = cy - depth;
  ring(bx, by, radius - 2, radius, "K");
  angles.forEach((t) => board(bx, by, t, radius - 1, reach, 1.3, "K"));
  // axle-wise edges of each board join back and front
  angles.forEach((t) => {
    for (let k = 0; k <= depth; k++) board(cx + k, cy - k, t, radius, reach, 1.3, "S");
  });
  angles.forEach((t) => board(cx, cy, t, radius - 1, reach, 1.3, "P"));
  angles.filter((_, i) => i % 2 === 0).forEach((t) => board(cx, cy, t, 0, radius - 1, 0.8, "S"));
  ring(cx, cy, radius - 2.2, radius, "R");
  ring(cx, cy, 0, 3.2, "R");
  ring(cx, cy, 0, 1.4, "H");
  return g.map((r) => r.join(""));
}

// Free voxel models in the tribar's projection, drawn back to front.
// Stone voxels take T/L/R, accent voxels X/Y/Z (top, y+ wall, x+ wall).
export type Voxel = [number, number, number, 0 | 1];

export function makeVoxels(voxels: Voxel[], cell: number): PixelMap {
  const P = (x: number, y: number, z: number): Pt => [(x - y) * cell, ((x + y) * cell) / 2 - z * cell];
  const corners = voxels.flatMap(([x, y, z]) => [P(x, y + 1, z), P(x + 1, y, z), P(x, y, z + 1), P(x + 1, y + 1, z), P(x, y + 1, z + 1), P(x + 1, y, z + 1)]);
  const minX = Math.min(...corners.map((p) => p[0]));
  const minY = Math.min(...corners.map((p) => p[1]));
  const w = Math.ceil(Math.max(...corners.map((p) => p[0])) - minX);
  const h = Math.ceil(Math.max(...corners.map((p) => p[1])) - minY);
  const g: string[][] = Array.from({ length: h }, () => Array(w).fill("."));
  const at = (x: number, y: number, z: number): Pt => {
    const [px, py] = P(x, y, z);
    return [px - minX, py - minY];
  };
  const sorted = [...voxels].sort((a, b) => a[0] + a[1] + a[2] - (b[0] + b[1] + b[2]) || a[2] - b[2]);
  for (const [x, y, z, m] of sorted) {
    const faces: [string, Pt[]][] = [
      [m ? "X" : "T", [at(x, y, z + 1), at(x + 1, y, z + 1), at(x + 1, y + 1, z + 1), at(x, y + 1, z + 1)]],
      [m ? "Z" : "R", [at(x + 1, y, z), at(x + 1, y + 1, z), at(x + 1, y + 1, z + 1), at(x + 1, y, z + 1)]],
      [m ? "Y" : "L", [at(x, y + 1, z), at(x + 1, y + 1, z), at(x + 1, y + 1, z + 1), at(x, y + 1, z + 1)]],
    ];
    for (const [face, poly] of faces) fillPoly(g, poly, (px, py) => { g[py][px] = face; });
  }
  return g.map((r) => r.join(""));
}
