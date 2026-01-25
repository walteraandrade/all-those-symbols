import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import type { OrbitControls as OrbitControlsType } from "three-stdlib";

interface OrbitControllerProps {
  autoRotate: boolean;
  rotationSpeed?: number;
}

export function OrbitController({
  autoRotate,
  rotationSpeed = 0.1
}: OrbitControllerProps) {
  const controlsRef = useRef<OrbitControlsType>(null);

  useFrame(() => {
    if (controlsRef.current && autoRotate) {
      controlsRef.current.autoRotate = true;
      controlsRef.current.autoRotateSpeed = rotationSpeed;
    }
  });

  return (
    <OrbitControls
      ref={controlsRef}
      enableZoom={false}
      enablePan={false}
      autoRotate={autoRotate}
      autoRotateSpeed={rotationSpeed}
      minPolarAngle={Math.PI / 3}
      maxPolarAngle={Math.PI / 1.8}
    />
  );
}
