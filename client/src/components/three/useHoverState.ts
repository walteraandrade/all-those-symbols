import { useState, useCallback } from "react";

export function useHoverState() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const onHover = useCallback((id: string | null) => {
    setHoveredId(id);
  }, []);

  return { hoveredId, onHover };
}
