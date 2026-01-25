import { useLocation } from "wouter";
import { useMotion } from "@/contexts/MotionContext";
import { useIsMobile } from "@/hooks/use-mobile";
import { useRetroSfx } from "@/hooks/useRetroSfx";
import { nodes } from "@/lib/data";
import { HeroScene } from "./HeroScene";
import { Node3D } from "./Node3D";
import { NodeLabel } from "./NodeLabel";
import { CentralHub3D } from "./CentralHub3D";
import { Edges3D } from "./Edges3D";
import { ParticleField } from "./ParticleField";
import { PerspectiveGrid } from "./PerspectiveGrid";
import { Effects } from "./Effects";
import { useNodePositions } from "./useNodePositions";
import { useHoverState } from "./useHoverState";

export function Hero3D() {
  const isMobile = useIsMobile();
  const { prefersReducedMotion } = useMotion();
  const [, navigate] = useLocation();
  const nodes3D = useNodePositions(nodes);
  const { hoveredId, onHover } = useHoverState();
  const sfx = useRetroSfx();

  if (isMobile) return null;

  const handleClick = (route: string) => {
    sfx.navigate();
    navigate(route);
  };

  return (
    <div
      className="absolute inset-0 z-0"
      aria-hidden="true"
      role="presentation"
    >
      <HeroScene prefersReducedMotion={prefersReducedMotion}>
        <PerspectiveGrid prefersReducedMotion={prefersReducedMotion} />

        <CentralHub3D prefersReducedMotion={prefersReducedMotion} />

        <Edges3D nodes={nodes3D} hoveredId={hoveredId} />

        {nodes3D.map((node) => (
          <group key={node.id}>
            <Node3D
              node={node}
              onHover={onHover}
              onClick={handleClick}
              isHovered={hoveredId === node.id}
              onHoverStart={sfx.hover}
              onClickSound={sfx.click}
            />
            <NodeLabel node={node} visible={hoveredId === node.id} />
          </group>
        ))}

        <ParticleField
          count={80}
          prefersReducedMotion={prefersReducedMotion}
        />

        <Effects enabled={!prefersReducedMotion} />
      </HeroScene>
    </div>
  );
}
