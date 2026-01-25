import { useMemo } from "react";
import { Vector3 } from "three";
import type { NodeSection } from "@/lib/data";
import type { Node3DData } from "./types";
import { NODE_COLORS } from "./types";

const RADIUS = 6;
const Y_OFFSET = 0;

const convert2DTo3D = (x: number, y: number, radius: number): Vector3 => {
  const normalizedX = (x - 50) / 50;
  const normalizedY = (y - 50) / 50;

  const theta = normalizedX * Math.PI * 0.6;
  const phi = normalizedY * Math.PI * 0.3;

  return new Vector3(
    Math.sin(theta) * radius,
    -phi * radius * 0.5 + Y_OFFSET,
    Math.cos(theta) * radius - radius * 0.3
  );
};

export function useNodePositions(nodes: NodeSection[]): Node3DData[] {
  return useMemo(
    () =>
      nodes.map((node) => ({
        id: node.id,
        title: node.title,
        icon: node.icon,
        position: convert2DTo3D(node.x, node.y, RADIUS),
        color: NODE_COLORS[node.id as keyof typeof NODE_COLORS] || "#ffffff",
        route: `/${node.id}`,
      })),
    [nodes]
  );
}
