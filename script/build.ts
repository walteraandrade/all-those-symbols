import { build as viteBuild } from "vite";
import { rm } from "fs/promises";
import { prerender } from "./prerender";
import "./build-blog-images";

async function buildAll() {
  await rm("dist", { recursive: true, force: true });

  console.log("building client...");
  await viteBuild();

  console.log("pre-rendering pages...");
  await prerender();
}

buildAll().catch((err) => {
  console.error(err);
  process.exit(1);
});
