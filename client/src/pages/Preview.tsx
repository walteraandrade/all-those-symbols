import { useState, lazy, Suspense } from "react";

const BrutalistPreview = lazy(() => import("./preview/Brutalist"));
const EditorialPreview = lazy(() => import("./preview/Editorial"));
const RetroFuturisticPreview = lazy(() => import("./preview/RetroFuturistic"));
const OrganicPreview = lazy(() => import("./preview/Organic"));
const ArtDecoPreview = lazy(() => import("./preview/ArtDeco"));

const DESIGNS = [
  { id: "brutalist", name: "Brutalist", color: "#FF0000", Component: BrutalistPreview },
  { id: "editorial", name: "Editorial", color: "#E63946", Component: EditorialPreview },
  { id: "retro-futuristic", name: "Retro-Futuristic", color: "#00fff9", Component: RetroFuturisticPreview },
  { id: "organic", name: "Organic", color: "#4A5D4A", Component: OrganicPreview },
  { id: "art-deco", name: "Art Deco", color: "#d4a574", Component: ArtDecoPreview },
];

export default function Preview() {
  const [active, setActive] = useState(DESIGNS[0].id);
  const ActiveComponent = DESIGNS.find(d => d.id === active)?.Component;

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <nav style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 10000,
        display: "flex",
        gap: "8px",
        padding: "12px 16px",
        background: "rgba(17, 17, 17, 0.95)",
        backdropFilter: "blur(8px)",
        borderBottom: "1px solid #333",
        flexWrap: "wrap",
      }}>
        <span style={{
          color: "#666",
          fontFamily: "monospace",
          fontSize: "12px",
          alignSelf: "center",
          marginRight: "8px"
        }}>
          DESIGN PROPOSALS:
        </span>
        {DESIGNS.map((d) => (
          <button
            key={d.id}
            onClick={() => setActive(d.id)}
            style={{
              padding: "8px 16px",
              background: active === d.id ? d.color : "transparent",
              color: active === d.id ? (d.id === "retro-futuristic" ? "#000" : "#fff") : "#fff",
              border: `1px solid ${d.color}`,
              borderRadius: "4px",
              cursor: "pointer",
              fontFamily: "monospace",
              fontSize: "12px",
              fontWeight: active === d.id ? "bold" : "normal",
              transition: "all 150ms",
            }}
          >
            {d.name}
          </button>
        ))}
      </nav>

      <div style={{ paddingTop: "60px" }}>
        <Suspense fallback={
          <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100vh",
            background: "#111",
            color: "#fff",
            fontFamily: "monospace"
          }}>
            Loading {active}...
          </div>
        }>
          {ActiveComponent && <ActiveComponent key={active} />}
        </Suspense>
      </div>
    </div>
  );
}
