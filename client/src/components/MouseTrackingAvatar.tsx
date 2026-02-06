import { useEffect, useState, useRef, useCallback } from "react";

type Direction = "nw" | "n" | "ne" | "w" | "c" | "e" | "sw" | "s" | "se";

const DIRECTION_TO_POSITION: Record<Direction, { col: number; row: number }> = {
  nw: { col: 0, row: 0 },
  n: { col: 1, row: 0 },
  ne: { col: 2, row: 0 },
  w: { col: 0, row: 1 },
  c: { col: 1, row: 1 },
  e: { col: 2, row: 1 },
  sw: { col: 0, row: 2 },
  s: { col: 1, row: 2 },
  se: { col: 2, row: 2 },
};

const angleToDirection = (angle: number): Direction => {
  const normalized = ((angle % 360) + 360) % 360;
  if (normalized >= 337.5 || normalized < 22.5) return "e";
  if (normalized >= 22.5 && normalized < 67.5) return "se";
  if (normalized >= 67.5 && normalized < 112.5) return "s";
  if (normalized >= 112.5 && normalized < 157.5) return "sw";
  if (normalized >= 157.5 && normalized < 202.5) return "w";
  if (normalized >= 202.5 && normalized < 247.5) return "nw";
  if (normalized >= 247.5 && normalized < 292.5) return "n";
  return "ne";
};

interface Props {
  spriteSheet?: string;
  frameSize?: number;
  deadZone?: number;
  disableGlow?: boolean;
}

export function MouseTrackingAvatar({
  spriteSheet = "/avatar-sprite.png",
  frameSize = 128,
  deadZone = 50,
  disableGlow = false,
}: Props) {
  const [direction, setDirection] = useState<Direction>("c");
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const dx = e.clientX - centerX;
      const dy = e.clientY - centerY;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < deadZone) {
        setDirection("c");
        return;
      }

      const angle = Math.atan2(dy, dx) * (180 / Math.PI);
      setDirection(angleToDirection(angle));
    },
    [deadZone]
  );

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [handleMouseMove]);

  const pos = DIRECTION_TO_POSITION[direction];
  const bgX = -pos.col * frameSize;
  const bgY = -pos.row * frameSize;

  return (
    <div
      ref={containerRef}
      className="relative z-10"
      style={{
        width: frameSize,
        height: frameSize,
        backgroundImage: `url(${spriteSheet})`,
        backgroundPosition: `${bgX}px ${bgY}px`,
        backgroundRepeat: "no-repeat",
        imageRendering: "pixelated",
        filter: "contrast(1.1) brightness(1.05)",
        boxShadow: disableGlow ? "none" : "0 0 30px hsl(180 80% 60% / 0.4), 0 0 60px hsl(180 80% 60% / 0.2)",
        borderRadius: disableGlow ? 0 : "8px",
      }}
    >
      {/* Scanline overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            rgba(0, 0, 0, ${disableGlow ? 0.15 : 0.1}) 2px,
            rgba(0, 0, 0, ${disableGlow ? 0.15 : 0.1}) 4px
          )`,
          borderRadius: disableGlow ? 0 : "8px",
        }}
      />
    </div>
  );
}
