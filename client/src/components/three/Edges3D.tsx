import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Line } from "@react-three/drei";
import { Vector3 } from "three";
import type { Node3DData } from "./types";

interface Edges3DProps {
  nodes: Node3DData[];
  hoveredId: string | null;
}

export function Edges3D({ nodes, hoveredId }: Edges3DProps) {
  const center = useMemo(() => new Vector3(0, 0, 0), []);
  const posCache = useRef(new Map<string, Vector3>());

  const getPos = (node: Node3DData): Vector3 => {
    let cached = posCache.current.get(node.id);
    if (!cached) {
      cached = node.position instanceof Vector3
        ? node.position
        : new Vector3(...(node.position as [number, number, number]));
      posCache.current.set(node.id, cached);
    }
    return cached;
  };

  return (
    <group>
      {nodes.map((node) => {
        const isHovered = node.id === hoveredId;
        const pos = getPos(node);

        return (
          <Line
            key={node.id}
            points={[center, pos]}
            color={node.color}
            lineWidth={isHovered ? 2 : 1}
            opacity={isHovered ? 0.9 : 0.3}
            transparent
            dashed={!isHovered}
            dashSize={0.2}
            gapSize={0.1}
          />
        );
      })}
    </group>
  );
}
