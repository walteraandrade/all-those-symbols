export function RetroHeroBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Perspective grid */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            linear-gradient(to bottom, transparent 0%, hsl(var(--background)) 100%),
            repeating-linear-gradient(
              90deg,
              transparent,
              transparent 59px,
              hsl(var(--primary) / 0.1) 59px,
              hsl(var(--primary) / 0.1) 60px
            ),
            repeating-linear-gradient(
              0deg,
              transparent,
              transparent 59px,
              hsl(var(--primary) / 0.1) 59px,
              hsl(var(--primary) / 0.1) 60px
            )
          `,
          animation: "grid-scroll 3s linear infinite",
          transform: "perspective(500px) rotateX(60deg)",
          transformOrigin: "center top",
          height: "200%",
          top: "40%",
        }}
      />

      {/* Vignette overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(
            ellipse at center,
            transparent 0%,
            transparent 30%,
            hsl(var(--background) / 0.7) 70%,
            hsl(var(--background)) 100%
          )`,
        }}
      />
    </div>
  );
}
