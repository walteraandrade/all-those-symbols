import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface PerspectiveGridProps {
  prefersReducedMotion: boolean;
}

export function PerspectiveGrid({ prefersReducedMotion }: PerspectiveGridProps) {
  const groupRef = useRef<THREE.Group>(null);
  const timeRef = useRef(0);

  const gridDepth = 30;
  const gridWidth = 20;
  const lineCount = 15;
  const vertCount = 10;

  const cyanColor = new THREE.Color(0x00d4aa);
  const purpleColor = new THREE.Color(0x9944ff);

  const horizontalLines = useMemo(() => {
    const lines: THREE.Line[] = [];

    for (let i = 0; i < lineCount; i++) {
      const z = -gridDepth + (i / lineCount) * gridDepth;
      const perspectiveFactor = 1 - Math.abs(z) / gridDepth;
      const width = gridWidth * perspectiveFactor;

      const geometry = new THREE.BufferGeometry();
      const positions = new Float32Array([
        -width / 2, 0, z,
        width / 2, 0, z
      ]);
      geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

      const material = new THREE.LineBasicMaterial({
        color: cyanColor,
        transparent: true,
        opacity: 0.3 + (i / lineCount) * 0.4,
        blending: THREE.AdditiveBlending
      });

      lines.push(new THREE.Line(geometry, material));
    }

    return lines;
  }, []);

  const verticalLines = useMemo(() => {
    const lines: THREE.Line[] = [];

    for (let i = 0; i < vertCount; i++) {
      const xRatio = (i / (vertCount - 1)) - 0.5;
      const nearX = xRatio * gridWidth;
      const farX = xRatio * 2;

      const geometry = new THREE.BufferGeometry();
      const positions = new Float32Array([
        nearX, 0, 0,
        farX, 0, -gridDepth
      ]);
      geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

      const material = new THREE.LineBasicMaterial({
        color: purpleColor,
        transparent: true,
        opacity: 0.2,
        blending: THREE.AdditiveBlending
      });

      lines.push(new THREE.Line(geometry, material));
    }

    return lines;
  }, []);

  useFrame((_, delta) => {
    if (prefersReducedMotion) return;
    timeRef.current += delta * 0.5;

    horizontalLines.forEach((line, i) => {
      const positions = line.geometry.attributes.position.array as Float32Array;
      const baseZ = -gridDepth + (i / lineCount) * gridDepth;
      const animatedZ = ((baseZ + timeRef.current * 5) % gridDepth) - gridDepth;
      const perspectiveFactor = 1 - Math.abs(animatedZ) / gridDepth;
      const width = gridWidth * perspectiveFactor;

      positions[0] = -width / 2;
      positions[2] = animatedZ;
      positions[3] = width / 2;
      positions[5] = animatedZ;
      line.geometry.attributes.position.needsUpdate = true;
    });
  });

  return (
    <group ref={groupRef} position={[0, -3, 5]} rotation={[-0.2, 0, 0]}>
      {horizontalLines.map((line, i) => (
        <primitive key={`h-${i}`} object={line} />
      ))}
      {verticalLines.map((line, i) => (
        <primitive key={`v-${i}`} object={line} />
      ))}
    </group>
  );
}
