import { Suspense, ReactNode } from "react";
import { Canvas } from "@react-three/fiber";
import { SceneLoader } from "./SceneLoader";
import { OrbitController } from "./OrbitController";
import { DEFAULT_SCENE_CONFIG } from "./types";

interface HeroSceneProps {
  children: ReactNode;
  prefersReducedMotion: boolean;
}

export function HeroScene({ children, prefersReducedMotion }: HeroSceneProps) {
  const { cameraDistance, fov } = DEFAULT_SCENE_CONFIG;

  return (
    <Canvas
      camera={{
        position: [0, 3, cameraDistance],
        fov,
        near: 0.1,
        far: 100
      }}
      dpr={[1, 2]}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: "high-performance"
      }}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "auto"
      }}
    >
      <Suspense fallback={<SceneLoader />}>
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={0.8} />
        <pointLight position={[-10, -10, -10]} intensity={0.4} color="#a855f7" />

        <fog attach="fog" args={["#0a0a0f", 12, 30]} />

        <OrbitController
          autoRotate={!prefersReducedMotion}
          rotationSpeed={0.1}
        />

        {children}
      </Suspense>
    </Canvas>
  );
}
