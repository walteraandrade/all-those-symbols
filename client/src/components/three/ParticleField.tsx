import { useRef, useMemo, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import type { Points } from "three";
import * as THREE from "three";

const _tempVec = new THREE.Vector3();
const _tailVec = new THREE.Vector3();

interface ParticleFieldProps {
  count?: number;
  prefersReducedMotion: boolean;
}

interface ShootingStar {
  position: THREE.Vector3;
  velocity: THREE.Vector3;
  lifetime: number;
  maxLifetime: number;
  line: THREE.Line;
}

export function ParticleField({
  count = 100,
  prefersReducedMotion
}: ParticleFieldProps) {
  const pointsRef = useRef<Points>(null);

  const particles = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const radius = 8 + Math.random() * 12;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;

      positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i3 + 1] = radius * Math.cos(phi) - 2;
      positions[i3 + 2] = radius * Math.sin(phi) * Math.sin(theta);

      const colorChoice = Math.random();
      if (colorChoice < 0.3) {
        colors[i3] = 0.17; colors[i3 + 1] = 0.83; colors[i3 + 2] = 0.75;
      } else if (colorChoice < 0.6) {
        colors[i3] = 0.66; colors[i3 + 1] = 0.33; colors[i3 + 2] = 0.97;
      } else {
        colors[i3] = 0.92; colors[i3 + 1] = 0.70; colors[i3 + 2] = 0.03;
      }
    }

    return { positions, colors };
  }, [count]);

  const shootingStarsRef = useRef<ShootingStar[]>([]);

  const shootingStars = useMemo(() => {
    const stars: ShootingStar[] = [];
    for (let i = 0; i < 3; i++) {
      const geometry = new THREE.BufferGeometry();
      const positions = new Float32Array(6);
      geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

      const material = new THREE.LineBasicMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending
      });

      const line = new THREE.Line(geometry, material);

      stars.push({
        position: new THREE.Vector3(15 + Math.random() * 5, 8 + Math.random() * 4, -5 + Math.random() * 10),
        velocity: new THREE.Vector3(-0.3 - Math.random() * 0.2, -0.15 - Math.random() * 0.1, 0),
        lifetime: Math.random() * 2,
        maxLifetime: 2 + Math.random() * 2,
        line
      });
    }
    shootingStarsRef.current = stars;
    return stars;
  }, []);

  useEffect(() => {
    return () => {
      shootingStarsRef.current.forEach((star) => {
        star.line.geometry.dispose();
        (star.line.material as THREE.Material).dispose();
      });
    };
  }, []);

  useFrame((state, delta) => {
    if (prefersReducedMotion) return;

    if (pointsRef.current) {
      const time = state.clock.elapsedTime * 0.05;
      pointsRef.current.rotation.y = time;
      pointsRef.current.rotation.x = Math.sin(time * 0.5) * 0.1;
    }

    shootingStarsRef.current.forEach((star) => {
      star.lifetime += delta;

      if (star.lifetime > star.maxLifetime) {
        star.position.set(15 + Math.random() * 5, 8 + Math.random() * 4, -5 + Math.random() * 10);
        star.velocity.set(-0.3 - Math.random() * 0.2, -0.15 - Math.random() * 0.1, 0);
        star.lifetime = 0;
        star.maxLifetime = 2 + Math.random() * 2;
      }

      _tempVec.copy(star.velocity).multiplyScalar(delta * 60);
      star.position.add(_tempVec);

      _tailVec.copy(star.velocity).multiplyScalar(2);
      _tailVec.subVectors(star.position, _tailVec);
      const positions = star.line.geometry.attributes.position.array as Float32Array;
      positions[0] = star.position.x;
      positions[1] = star.position.y;
      positions[2] = star.position.z;
      positions[3] = _tailVec.x;
      positions[4] = _tailVec.y;
      positions[5] = _tailVec.z;
      star.line.geometry.attributes.position.needsUpdate = true;
    });
  });

  return (
    <>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[particles.positions, 3]}
          />
          <bufferAttribute
            attach="attributes-color"
            args={[particles.colors, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.05}
          vertexColors
          transparent
          opacity={0.6}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>

      {!prefersReducedMotion && shootingStars.map((star, i) => (
        <primitive key={i} object={star.line} />
      ))}
    </>
  );
}
