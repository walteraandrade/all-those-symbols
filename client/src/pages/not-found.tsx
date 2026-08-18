import { Link } from "wouter";
import { Sprite, WIRECUBE, POLY_PAL } from "@/components/escher/sprites";

export default function NotFound() {
  return (
    <div className="esc-page" style={{ minHeight: "70dvh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", textAlign: "center" }}>
      <Sprite map={WIRECUBE} palette={POLY_PAL} scale={5} style={{ marginBottom: 28 }} />
      <h1 className="pixfont" style={{ fontSize: "clamp(1.4rem, 5vw, 2.6rem)", marginBottom: 18 }}>404</h1>
      <p className="esc-sub" style={{ maxWidth: 460 }}>
        This page only exists from an angle we have not built yet.
      </p>
      <Link className="esc-btn" href="/">BACK TO THE RIGHT ANGLE</Link>
    </div>
  );
}
