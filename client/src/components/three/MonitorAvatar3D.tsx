import { useRef, useEffect, useState, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";
import type { Group, Mesh, ShaderMaterial } from "three";

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

const crtVertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const crtFragmentShader = `
  uniform sampler2D uTexture;
  uniform vec2 uOffset;
  uniform float uTime;
  varying vec2 vUv;

  void main() {
    // Apply UV offset and repeat for sprite sheet
    vec2 spriteUv = vUv / 3.0 + uOffset;

    // Barrel distortion
    vec2 centered = vUv - 0.5;
    float dist = length(centered);
    float distortion = 1.0 + dist * dist * 0.1;
    vec2 distortedUv = centered * distortion + 0.5;

    // Apply distortion to sprite UV
    vec2 distortedSpriteUv = (distortedUv - 0.5) / 3.0 + 0.5 / 3.0 + uOffset;

    // Clamp to prevent bleeding from other frames
    vec2 frameMin = uOffset;
    vec2 frameMax = uOffset + vec2(1.0/3.0, 1.0/3.0);
    distortedSpriteUv = clamp(distortedSpriteUv, frameMin + 0.001, frameMax - 0.001);

    vec4 color = texture2D(uTexture, distortedSpriteUv);

    // Scanlines
    float scanline = sin(vUv.y * 300.0) * 0.08 + 0.92;
    color.rgb *= scanline;

    // Edge vignette
    float vignette = 1.0 - dist * 0.5;
    color.rgb *= vignette;

    // CRT glow
    color.rgb += vec3(0.02, 0.04, 0.03);

    // Slight flicker
    float flicker = 0.98 + sin(uTime * 8.0) * 0.02;
    color.rgb *= flicker;

    gl_FragColor = color;
  }
`;

interface MonitorAvatar3DProps {
  prefersReducedMotion: boolean;
}

export function MonitorAvatar3D({ prefersReducedMotion }: MonitorAvatar3DProps) {
  const groupRef = useRef<Group>(null);
  const ringRef = useRef<Mesh>(null);
  const screenMaterialRef = useRef<ShaderMaterial>(null);
  const [direction, setDirection] = useState<Direction>("c");
  const { size } = useThree();

  const texture = useTexture("/avatar-sprite.png");

  useEffect(() => {
    texture.magFilter = THREE.NearestFilter;
    texture.minFilter = THREE.NearestFilter;
    texture.needsUpdate = true;
  }, [texture]);

  const shaderUniforms = useMemo(
    () => ({
      uTexture: { value: texture },
      uOffset: { value: new THREE.Vector2(1 / 3, 1 / 3) },
      uTime: { value: 0 },
    }),
    [texture]
  );

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const centerX = size.width / 2;
      const centerY = size.height / 2;

      const dx = e.clientX - centerX;
      const dy = e.clientY - centerY;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < 80) {
        setDirection("c");
        return;
      }

      const angle = Math.atan2(dy, dx) * (180 / Math.PI);
      setDirection(angleToDirection(angle));
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [size]);

  useEffect(() => {
    if (screenMaterialRef.current) {
      const pos = DIRECTION_TO_POSITION[direction];
      screenMaterialRef.current.uniforms.uOffset.value.set(
        pos.col / 3,
        (2 - pos.row) / 3
      );
    }
  }, [direction]);

  useFrame((state, delta) => {
    if (screenMaterialRef.current) {
      screenMaterialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
    }

    if (prefersReducedMotion) return;

    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
      groupRef.current.rotation.y += delta * 0.05;
    }

    if (ringRef.current) {
      ringRef.current.rotation.z += delta * 0.3;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Screen with CRT shader - double sided */}
      <mesh position={[0, 0, 0]}>
        <planeGeometry args={[2.2, 2.2]} />
        <shaderMaterial
          ref={screenMaterialRef}
          vertexShader={crtVertexShader}
          fragmentShader={crtFragmentShader}
          uniforms={shaderUniforms}
          transparent
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Orbital ring */}
      <mesh ref={ringRef} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2.2, 0.02, 16, 64]} />
        <meshStandardMaterial
          color="#2dd4bf"
          emissive="#2dd4bf"
          emissiveIntensity={0.4}
          transparent
          opacity={0.6}
        />
      </mesh>

      {/* Floating particles */}
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={30}
            array={new Float32Array(
              Array.from({ length: 90 }, () => (Math.random() - 0.5) * 5)
            )}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          color="#2dd4bf"
          size={0.03}
          transparent
          opacity={0.5}
          sizeAttenuation
        />
      </points>
    </group>
  );
}
