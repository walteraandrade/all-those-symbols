import { Sprite, MARK, CUBE, POLY_PAL } from "./sprites";

export function KindLegend() {
  return (
    <ul className="esc-legend" aria-label="Legend">
      <li><Sprite map={MARK} palette={POLY_PAL} scale={1} /> Shipped with a team</li>
      <li><Sprite map={CUBE} palette={POLY_PAL} scale={1} /> Built on my own</li>
    </ul>
  );
}
