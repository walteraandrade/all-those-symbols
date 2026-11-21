import { makeVoxels, type PixelMap, type Voxel } from "./geometry";

// One small voxel construction per featured project, each a picture of what
// the software does, in the same projection and light as the tribar.

const box = (x0: number, y0: number, z0: number, x1: number, y1: number, z1: number, m: 0 | 1 = 0): Voxel[] => {
  const out: Voxel[] = [];
  for (let x = x0; x < x1; x++) for (let y = y0; y < y1; y++) for (let z = z0; z < z1; z++) out.push([x, y, z, m]);
  return out;
};

const CELL = 3;

const MODELS: Record<string, Voxel[]> = {
  // a chat bubble with the typing dots
  "SmartHow Workspace Agent": [
    ...box(0, 0, 0, 7, 5, 1),
    ...box(1, 5, 0, 2, 6, 1),
    ...box(1, 2, 1, 2, 3, 2, 1),
    ...box(3, 2, 1, 4, 3, 2, 1),
    ...box(5, 2, 1, 6, 3, 2, 1),
  ],
  // pages dropping into an open crate
  "Document Asset Ingestion": [
    ...box(0, 0, 0, 5, 5, 1),
    ...box(0, 0, 1, 1, 5, 4),
    ...box(1, 0, 1, 5, 1, 4),
    ...box(4, 1, 1, 5, 5, 2),
    ...box(1, 4, 1, 4, 5, 2),
    ...box(1, 1, 1, 4, 4, 2, 1),
    ...box(1, 1, 5, 4, 4, 6, 1),
  ],
  // a live bar chart, the busiest process lit
  "Mr. Argus": [
    ...box(0, 0, 0, 7, 3, 1),
    ...box(0, 1, 1, 1, 2, 3),
    ...box(2, 1, 1, 3, 2, 5),
    ...box(4, 1, 1, 5, 2, 7, 1),
    ...box(6, 1, 1, 7, 2, 4),
  ],
  // a briefcase
  "Smells Like Job Spirit": [
    ...box(0, 0, 0, 6, 2, 4),
    ...box(1, 0, 4, 2, 2, 5),
    ...box(4, 0, 4, 5, 2, 5),
    ...box(1, 0, 5, 5, 2, 6),
    ...box(2, 2, 1, 4, 3, 2, 1),
  ],
  // a commit graph: a branch forks off the main line and merges back
  "Arachne": [
    ...box(0, 0, 0, 1, 1, 9),
    ...box(1, 0, 2, 4, 1, 3),
    ...box(4, 0, 2, 5, 1, 7),
    ...box(1, 0, 6, 4, 1, 7),
    ...box(4, 0, 4, 5, 1, 5, 1),
    ...box(0, 0, 9, 1, 1, 10, 1),
  ],
  // a door frame with a parcel at the step
  "NaPorta Platform": [
    ...box(0, 0, 0, 1, 1, 7),
    ...box(4, 0, 0, 5, 1, 7),
    ...box(0, 0, 7, 5, 1, 8),
    ...box(1, 0, 0, 4, 1, 1),
    ...box(1, 2, 0, 4, 4, 2, 1),
  ],
};

export const CONSTRUCTIONS: Record<string, PixelMap> = Object.fromEntries(
  Object.entries(MODELS).map(([title, voxels]) => [title, makeVoxels(voxels, CELL)]),
);
