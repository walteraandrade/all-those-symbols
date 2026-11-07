import { prerender } from "react-dom/static";
import { Router } from "wouter";
import App from "./App";

export async function render(url: string) {
  const { prelude } = await prerender(
    <Router ssrPath={url}>
      <App />
    </Router>,
    { progressiveChunkSize: Number.MAX_SAFE_INTEGER }
  );
  return new Response(prelude).text();
}
