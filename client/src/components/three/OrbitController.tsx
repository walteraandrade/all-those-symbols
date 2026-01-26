import { OrbitControls } from "@react-three/drei";

interface OrbitControllerProps {
  autoRotate: boolean;
  rotationSpeed?: number;
}

export function OrbitController({
  autoRotate,
  rotationSpeed = 0.1
}: OrbitControllerProps) {
  return (
    <OrbitControls
      enableZoom={false}
      enablePan={false}
      autoRotate={autoRotate}
      autoRotateSpeed={rotationSpeed}
      minPolarAngle={Math.PI / 3}
      maxPolarAngle={Math.PI / 1.8}
    />
  );
}
