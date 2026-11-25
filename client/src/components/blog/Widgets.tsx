import { MotionConfig } from "framer-motion";
import { AiBugLadder } from "./AiBugLadder";
import { BlackSwanWidget } from "./BlackSwanWidget";
import { CertaintyMethod } from "./CertaintyMethod";
import { ContextWindowWidget } from "./ContextWindowWidget";
import { IfThenSlider } from "./IfThenSlider";
import { LibraryOfBabel } from "./LibraryOfBabel";
import { LogicCircuitWidget } from "./LogicCircuitWidget";
import { StateMachineWidget } from "./StateMachineWidget";

const widgets: Record<string, (props: { label?: string }) => React.ReactNode> = {
  "#if-then": IfThenSlider,
  "#state-machine": StateMachineWidget,
  "#logic-circuit": LogicCircuitWidget,
  "#certainty-method": CertaintyMethod,
  "#context-window": ContextWindowWidget,
  "#ai-bug-ladder": AiBugLadder,
  "#black-swan": BlackSwanWidget,
  "#library-of-babel": LibraryOfBabel,
};

export default function Widget({ src, label }: { src: string; label?: string }) {
  const Component = widgets[src];
  return (
    <MotionConfig reducedMotion="user">
      <Component label={label} />
    </MotionConfig>
  );
}
