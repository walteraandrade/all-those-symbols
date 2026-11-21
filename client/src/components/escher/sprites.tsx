// Escher design system: pixel sprites rendered to canvas at 1px per cell and
// upscaled with nearest-neighbor. Canvas avoids the hairline seams box-shadow
// sprites show at fractional zoom. Shapes come from ./geometry.
import { useEffect, useRef, useState } from "react";
import { makeNecker, makePenrose, makeWheel, standUp, type PixelMap } from "./geometry";

type Palette = Record<string, string>;

// palette entries starting with "--" resolve against the page's CSS vars,
// so sprites follow the active theme
const resolver = (el: Element) => {
  const styles = getComputedStyle(el);
  return (c: string) => (c.startsWith("--") ? styles.getPropertyValue(c).trim() || "#f0f" : c);
};

const paint = (canvas: HTMLCanvasElement, map: PixelMap, palette: Palette, color?: (x: number, y: number, ch: string) => string | undefined) => {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  const resolve = resolver(canvas);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  map.forEach((row, y) => {
    [...row].forEach((ch, x) => {
      const c = color?.(x, y, ch) ?? palette[ch];
      if (c) {
        ctx.fillStyle = resolve(c);
        ctx.fillRect(x, y, 1, 1);
      }
    });
  });
};

const size = (map: PixelMap) => ({ cols: Math.max(...map.map((r) => r.length)), rows: map.length });

const canvasStyle = (cols: number, scale: number, style?: React.CSSProperties): React.CSSProperties => ({
  width: cols * scale,
  maxWidth: "100%",
  height: "auto",
  imageRendering: "pixelated",
  ...style,
});

type SpriteProps = {
  map: PixelMap;
  palette: Palette;
  scale?: number;
  style?: React.CSSProperties;
  className?: string;
};

export function Sprite({ map, palette, scale = 4, style, className }: SpriteProps) {
  const ref = useRef<HTMLCanvasElement>(null);
  const { cols, rows } = size(map);

  useEffect(() => {
    if (ref.current) paint(ref.current, map, palette);
  }, [map, palette]);

  return <canvas ref={ref} width={cols} height={rows} className={className} role="presentation" style={canvasStyle(cols, scale, style)} />;
}

// Runs `tick` at `fps` while the canvas is on screen and the reader allows
// motion; otherwise holds frame 0. Steps, never tweens: it stays pixel art.
function useFrames(ref: React.RefObject<HTMLElement | null>, fps: number) {
  const [frame, setFrame] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let timer: number | undefined;
    const start = () => {
      if (timer === undefined) timer = window.setInterval(() => setFrame((f) => f + 1), 1000 / fps);
    };
    const stop = () => {
      window.clearInterval(timer);
      timer = undefined;
    };
    const io = new IntersectionObserver(([entry]) => (entry.isIntersecting ? start() : stop()));
    io.observe(el);
    return () => {
      io.disconnect();
      stop();
    };
  }, [ref, fps]);
  return frame;
}

// --- the cast --------------------------------------------------------------

// The mark: a small tribar stood on its base. Used for the brand, the favicon
// and every "shipped with a team" construction.
export const MARK = standUp(makePenrose(6, 1, 3, false).map);
// A small Necker cube for "built on my own" constructions.
export const CUBE = makeNecker(14, 6, 0);

export const POLY_PAL: Palette = { T: "--bone", L: "--mid", R: "--dark", A: "--bone", M: "--line", F: "--ink-2", D: "--shadow", X: "--accent", Y: "--accent-mid", Z: "--accent-dark" };
export const POLY_PAL_ACCENT: Palette = { T: "--accent", L: "--accent-mid", R: "--accent-dark", A: "--accent", M: "--accent-mid", F: "--ink-2" };

// The waterfall: the isometric tribar with water falling down its wall and
// running back up along the tops, forever.
const FALL = makePenrose(12, 3, 4, true, 0.5);
// shadow cells on the rim get dithered, so the shadow fades instead of ending
const SHADOW_EDGE = FALL.map.map((row, y) =>
  [...row].map((ch, x) => ch === "D" && [[1, 0], [-1, 0], [0, 1], [0, -1], [2, 0], [-2, 0]].some(([dx, dy]) => (FALL.map[y + dy]?.[x + dx] ?? ".") === ".")),
);

export function WaterfallScene({ scale = 5 }: { scale?: number }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const frame = useFrames(ref, 8);
  const { cols, rows } = size(FALL.map);

  useEffect(() => {
    if (!ref.current) return;
    paint(ref.current, FALL.map, POLY_PAL, (x, y, ch) => {
      if (ch === "D") return (x + y) % 2 && SHADOW_EDGE[y][x] ? "" : undefined;
      if (ch !== "W") return undefined;
      const d = (((FALL.flow[y][x] - frame) % 4) + 4) % 4;
      return d === 0 ? "--accent-hi" : d === 1 ? "--accent" : "--accent-mid";
    });
  }, [frame]);

  return <canvas ref={ref} width={cols} height={rows} role="presentation" style={canvasStyle(cols, scale)} />;
}

// The Necker cube: every edge drawn, the face read as nearer tinted, and
// every few seconds the other face takes the tint. Nothing moves but the
// reading. With `flip`, a click or Enter turns it by hand.
// a flat shadow of the cube's outline, dropped down and right
const dropShadow = (map: PixelMap, d: number): PixelMap => {
  const w = map[0].length + d;
  const out = [...map, ...Array.from({ length: d }, () => "")].map((row) => row.padEnd(w, "."));
  const hull = (row = "") => {
    const ink = [...row].map((ch, x) => (ch !== "." ? x : -1)).filter((x) => x >= 0);
    return ink.length ? [Math.min(...ink), Math.max(...ink)] : [1, 0];
  };
  return out.map((row, y) => {
    const [from, to] = hull(map[y - d]).map((x) => x + d);
    const [ownFrom, ownTo] = hull(map[y]);
    return [...row].map((ch, x) => (ch === "." && x >= from && x <= to && (x < ownFrom || x > ownTo) ? "D" : ch)).join("");
  });
};
const NECKER = [makeNecker(40, 16, 0, 2), makeNecker(40, 16, 1, 2)].map((m) => dropShadow(m, 3));
const NECKER_PAL: Palette = { ...POLY_PAL, F: "--accent-dark" };

export function NeckerScene({ scale = 5, className, flip }: { scale?: number; className?: string; flip?: boolean }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const frame = useFrames(ref, 1 / 3);
  const [turns, setTurns] = useState(0);
  const side = (frame + turns) % 2;
  const map = NECKER[side];
  const { cols, rows } = size(map);

  useEffect(() => {
    if (ref.current) paint(ref.current, map, NECKER_PAL);
  }, [map]);

  const canvas = <canvas ref={ref} width={cols} height={rows} className={flip ? undefined : className} role="presentation" style={canvasStyle(cols, scale)} />;
  if (!flip) return canvas;
  return (
    <button
      type="button"
      className={`esc-flip ${className ?? ""}`}
      aria-label="Necker cube: flip which face is in front"
      aria-pressed={side === 1}
      onClick={() => setTurns((t) => t + 1)}
    >
      {canvas}
      <span className="hint" aria-hidden="true">&gt; click to flip</span>
    </button>
  );
}

// The wheel the waterfall turns. Twelve paddles, so four steps of 7.5
// degrees bring it back to where it started. The stream falls from the top
// edge onto the paddles on the right.
const WHEEL_R = 18;
const DROP = 16;
const STREAM_X = WHEEL_R + 6 + Math.round(WHEEL_R * 0.55);
// the flume the stream pours from: back lip, water, front plank, underside
const FLUME = (width: number) => {
  const from = STREAM_X - 16;
  const to = STREAM_X + 3;
  const row = (ch: string) => ".".repeat(from) + ch.repeat(to - from) + ".".repeat(width - to);
  return [row("K"), row("w"), row("w"), row("R"), row("S")];
};
const WHEEL = [0, 1, 2, 3].map((i) => {
  const wheel = makeWheel(WHEEL_R, (i * Math.PI) / 24);
  const blank = () => ".".repeat(wheel[0].length);
  return [blank(), ...FLUME(wheel[0].length), ...Array.from({ length: DROP - 6 }, blank), ...wheel];
});
const WHEEL_PAL: Palette = { R: "--bone", S: "--mid", H: "--dark", P: "--soft", K: "--dark" };
const STREAM_END = DROP + 4 + WHEEL_R + 6 - Math.round(Math.sqrt((WHEEL_R + 4) ** 2 - (WHEEL_R * 0.55) ** 2));

export function WheelScene({ scale = 6 }: { scale?: number }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const frame = useFrames(ref, 8);
  const map = WHEEL[Math.floor(frame / 2) % WHEEL.length];
  const { cols, rows } = size(map);

  useEffect(() => {
    if (!ref.current) return;
    paint(ref.current, map, WHEEL_PAL, (x, y, ch) => {
      if (ch === "w") return (((x - frame) % 4) + 4) % 4 < 2 ? "--accent" : "--accent-mid";
      if (ch === "." && y === STREAM_END - 1 - (frame % 2) && (x === STREAM_X - 1 - (frame % 2) || x === STREAM_X + 3 + (frame % 2))) return "--accent-hi";
      if (x < STREAM_X || x > STREAM_X + 2 || y < 6 || y > STREAM_END || ch === "R") return undefined;
      return (((y - frame) % 4) + 4) % 4 < 2 ? "--accent" : "--accent-mid";
    });
  }, [map, frame]);

  return <canvas ref={ref} width={cols} height={rows} role="presentation" style={canvasStyle(cols, scale)} />;
}
