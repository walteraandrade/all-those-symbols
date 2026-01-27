interface NetworkBackgroundProps {
  nodes: { id: string; x: number; y: number }[];
  activeNodeId: string | null;
}

export function NetworkBackground({ nodes }: NetworkBackgroundProps) {
  const centerX = 50;
  const centerY = 50;

  return (
    <div
      aria-hidden="true"
      role="presentation"
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-background"
    >
      {/* Background texture */}
      <div className="absolute inset-0 opacity-5 bg-[url('@assets/generated_images/dark_abstract_geometric_network_background.png')] bg-cover bg-center mix-blend-overlay grayscale" />

      {/* Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.8)_100%)]" />

      {/* SVG lines */}
      <svg className="absolute inset-0 w-full h-full">
        {nodes.map((node) => (
          <line
            key={node.id}
            x1={`${centerX}%`}
            y1={`${centerY}%`}
            x2={`${node.x}%`}
            y2={`${node.y}%`}
            stroke="currentColor"
            className="text-primary/5"
            strokeWidth="1"
          />
        ))}
      </svg>
    </div>
  );
}
