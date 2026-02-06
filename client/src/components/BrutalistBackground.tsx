export function BrutalistBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Static black grid */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, #000 1px, transparent 1px),
            linear-gradient(to bottom, #000 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
          opacity: 0.08,
        }}
      />
      {/* Red accent line top */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-red-500" />
      {/* Red accent line bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-red-500" />
    </div>
  );
}
