import { prerender } from "react-dom/static";
import { Router } from "wouter";
import App from "./App";

export async function render(url: string) {
  const errors: unknown[] = [];
  const { prelude } = await prerender(
    <Router ssrPath={url}>
      <App />
    </Router>,
    {
      progressiveChunkSize: Number.MAX_SAFE_INTEGER,
      onError: (error) => {
        errors.push(error);
      },
    }
  );
  if (errors.length > 0) throw errors[0];
  return new Response(prelude).text();
}
