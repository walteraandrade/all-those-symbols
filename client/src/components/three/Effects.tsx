import {
  EffectComposer,
  Bloom,
  DepthOfField,
  ChromaticAberration,
  Noise,
  Vignette,
  Scanline
} from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import { Vector2 } from "three";

interface EffectsProps {
  enabled: boolean;
}

export function Effects({ enabled }: EffectsProps) {
  if (!enabled) return null;

  return (
    <EffectComposer>
      <Bloom
        intensity={0.8}
        luminanceThreshold={0.2}
        luminanceSmoothing={0.9}
        mipmapBlur
      />
      <DepthOfField
        focusDistance={0.01}
        focalLength={0.05}
        bokehScale={3}
      />
      <Scanline
        density={1.5}
        opacity={0.1}
      />
      <ChromaticAberration
        offset={new Vector2(0.002, 0.002)}
        radialModulation={false}
        modulationOffset={0}
      />
      <Noise
        blendFunction={BlendFunction.OVERLAY}
        opacity={0.05}
      />
      <Vignette
        offset={0.3}
        darkness={0.6}
      />
    </EffectComposer>
  );
}
