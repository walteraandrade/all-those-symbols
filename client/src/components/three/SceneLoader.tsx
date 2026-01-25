import { Html, useProgress } from "@react-three/drei";

export function SceneLoader() {
  const { progress } = useProgress();
  return (
    <Html center>
      <div className="text-primary/60 font-mono text-sm">
        {progress.toFixed(0)}%
      </div>
    </Html>
  );
}
