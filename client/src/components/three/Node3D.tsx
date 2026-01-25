import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import type { Mesh } from "three";
import type { Node3DData } from "./types";

interface Node3DProps {
  node: Node3DData;
  onHover: (id: string | null) => void;
  onClick: (route: string) => void;
  isHovered: boolean;
  onHoverStart?: () => void;
  onClickSound?: () => void;
}

const SCALE_STEPS = 6;
const stepScale = (current: number, target: number): number => {
  const diff = target - current;
  if (Math.abs(diff) < 0.01) return target;
  const step = (target - 1) / SCALE_STEPS;
  return diff > 0
    ? Math.min(current + Math.abs(step), target)
    : Math.max(current - Math.abs(step), target);
};

export function Node3D({ node, onHover, onClick, isHovered, onHoverStart, onClickSound }: Node3DProps) {
  const meshRef = useRef<Mesh>(null);
  const [hoverScale, setHoverScale] = useState(1);

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.3;
      meshRef.current.rotation.y += delta * 0.2;

      const targetScale = isHovered ? 1.3 : 1;
      setHoverScale((prev) => stepScale(prev, targetScale));
    }
  });

  return (
    <mesh
      ref={meshRef}
      position={node.position}
      scale={hoverScale}
      onPointerEnter={(e) => {
        e.stopPropagation();
        onHover(node.id);
        onHoverStart?.();
        document.body.style.cursor = "pointer";
      }}
      onPointerLeave={() => {
        onHover(null);
        document.body.style.cursor = "auto";
      }}
      onClick={(e) => {
        e.stopPropagation();
        onClickSound?.();
        onClick(node.route);
      }}
    >
      <icosahedronGeometry args={[0.5, 1]} />
      <meshStandardMaterial
        color={node.color}
        emissive={node.color}
        emissiveIntensity={isHovered ? 1.2 : 0.3}
        roughness={0.3}
        metalness={0.7}
      />
    </mesh>
  );
}
