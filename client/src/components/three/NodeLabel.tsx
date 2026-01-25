import { Html } from "@react-three/drei";
import { Vector3 } from "three";
import type { Node3DData } from "./types";

interface NodeLabelProps {
  node: Node3DData;
  visible: boolean;
}

export function NodeLabel({ node, visible }: NodeLabelProps) {
  if (!visible) return null;

  const pos = node.position instanceof Vector3
    ? node.position
    : new Vector3(...node.position);

  return (
    <Html
      position={[pos.x, pos.y + 1, pos.z]}
      center
      style={{
        transition: "opacity 0.2s",
        opacity: visible ? 1 : 0,
        pointerEvents: "none",
      }}
    >
      <div
        className="px-3 py-1.5 bg-background/90 backdrop-blur-sm border border-border rounded-md shadow-lg whitespace-nowrap"
        style={{ borderColor: node.color }}
      >
        <span className="text-sm font-medium text-foreground">
          {node.title}
        </span>
      </div>
    </Html>
  );
}
