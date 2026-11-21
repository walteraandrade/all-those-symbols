import { Link } from "wouter";
import { NeckerScene } from "@/components/escher/sprites";

export default function NotFound() {
  return (
    <div className="esc-page esc-center">
      <NeckerScene scale={2} />
      <h1>404</h1>
      <p>This page only exists from an angle we have not built yet.</p>
      <Link className="esc-btn" href="/">BACK TO THE RIGHT ANGLE</Link>
    </div>
  );
}
