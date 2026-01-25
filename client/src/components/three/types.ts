import type { LucideIcon } from "lucide-react";
import type { Vector3 } from "three";

export interface Node3DData {
  id: string;
  title: string;
  icon: LucideIcon;
  position: Vector3 | [number, number, number];
  color: string;
  route: string;
}

export interface SceneConfig {
  cameraDistance: number;
  fov: number;
  orbitSpeed: number;
  bloomIntensity: number;
  particleCount: number;
}

export const NODE_COLORS = {
  bio: "#3b82f6",      // blue
  projects: "#22c55e", // green
  music: "#a855f7",    // purple
  blog: "#eab308",     // gold
} as const;

export const DEFAULT_SCENE_CONFIG: SceneConfig = {
  cameraDistance: 15,
  fov: 50,
  orbitSpeed: 60,
  bloomIntensity: 0.5,
  particleCount: 100,
};
