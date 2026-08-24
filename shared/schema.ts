import { sql } from "drizzle-orm";
import { pgTable, real, text, timestamp, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const spotifyTokens = pgTable("spotify_tokens", {
  id: varchar("id").primaryKey(), // Single row for site owner (always "site_owner")
  accessToken: text("access_token").notNull(),
  refreshToken: text("refresh_token").notNull(),
  expiresAt: text("expires_at").notNull(), // ISO timestamp
  updatedAt: text("updated_at").notNull().default(sql`now()`),
});

export const webVitals = pgTable("web_vitals", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  metric: text("metric").notNull(), // "LCP" | "INP" | "CLS" | "TTFB"
  value: real("value").notNull(),
  path: text("path").notNull(),
  device: text("device").notNull(), // "mobile" | "desktop"
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().default(sql`now()`),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type SpotifyToken = typeof spotifyTokens.$inferSelect;
export type WebVital = typeof webVitals.$inferSelect;
