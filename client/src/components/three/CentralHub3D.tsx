import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import type { Mesh, Group } from "three";

interface CentralHub3DProps {
  prefersReducedMotion: boolean;
}

export function CentralHub3D({ prefersReducedMotion }: CentralHub3DProps) {
  const coreRef = useRef<Mesh>(null);
  const ring1Ref = useRef<Mesh>(null);
  const ring2Ref = useRef<Mesh>(null);
  const ring3Ref = useRef<Mesh>(null);
  const groupRef = useRef<Group>(null);

  useFrame((_, delta) => {
    if (prefersReducedMotion) return;

    if (coreRef.current) {
      coreRef.current.rotation.y += delta * 0.5;
    }
    if (ring1Ref.current) {
      ring1Ref.current.rotation.z += delta * 0.3;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.x += delta * 0.2;
    }
    if (ring3Ref.current) {
      ring3Ref.current.rotation.y -= delta * 0.15;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Core sphere */}
      <mesh ref={coreRef}>
        <icosahedronGeometry args={[0.6, 2]} />
        <meshStandardMaterial
          color="#2dd4bf"
          emissive="#2dd4bf"
          emissiveIntensity={0.5}
          roughness={0.2}
          metalness={0.8}
          wireframe
        />
      </mesh>

      {/* Inner ring */}
      <mesh ref={ring1Ref} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.2, 0.02, 16, 64]} />
        <meshStandardMaterial
          color="#2dd4bf"
          emissive="#2dd4bf"
          emissiveIntensity={0.4}
          transparent
          opacity={0.6}
        />
      </mesh>

      {/* Middle ring */}
      <mesh ref={ring2Ref} rotation={[Math.PI / 3, Math.PI / 4, 0]}>
        <torusGeometry args={[1.8, 0.015, 16, 64]} />
        <meshStandardMaterial
          color="#a855f7"
          emissive="#a855f7"
          emissiveIntensity={0.3}
          transparent
          opacity={0.4}
        />
      </mesh>

      {/* Outer ring */}
      <mesh ref={ring3Ref} rotation={[Math.PI / 4, 0, Math.PI / 6]}>
        <torusGeometry args={[2.4, 0.01, 16, 64]} />
        <meshStandardMaterial
          color="#eab308"
          emissive="#eab308"
          emissiveIntensity={0.2}
          transparent
          opacity={0.3}
        />
      </mesh>
    </group>
  );
}
