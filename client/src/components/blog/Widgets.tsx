import { MotionConfig } from "framer-motion";
import { CertaintyMethod } from "./CertaintyMethod";
import { IfThenSlider } from "./IfThenSlider";
import { LogicCircuitWidget } from "./LogicCircuitWidget";
import { StateMachineWidget } from "./StateMachineWidget";

const widgets: Record<string, (props: { label?: string }) => React.ReactNode> = {
  "#if-then": IfThenSlider,
  "#state-machine": StateMachineWidget,
  "#logic-circuit": LogicCircuitWidget,
  "#certainty-method": CertaintyMethod,
};

export default function Widget({ src, label }: { src: string; label?: string }) {
  const Component = widgets[src];
  return (
    <MotionConfig reducedMotion="user">
      <Component label={label} />
    </MotionConfig>
  );
}
