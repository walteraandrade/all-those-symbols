import { type User, type InsertUser, type SpotifyToken } from "@shared/schema";
import { randomUUID } from "crypto";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  getSpotifyTokens(): Promise<SpotifyToken | undefined>;
  saveSpotifyTokens(accessToken: string, refreshToken: string, expiresIn: number): Promise<SpotifyToken>;
  clearSpotifyTokens(): Promise<void>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private spotifyTokens: SpotifyToken | undefined;

  constructor() {
    this.users = new Map();
    this.spotifyTokens = undefined;
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getSpotifyTokens(): Promise<SpotifyToken | undefined> {
    return this.spotifyTokens;
  }

  async saveSpotifyTokens(accessToken: string, refreshToken: string, expiresIn: number): Promise<SpotifyToken> {
    const expiresAt = new Date(Date.now() + expiresIn * 1000).toISOString();
    const updatedAt = new Date().toISOString();
    const tokens: SpotifyToken = {
      id: "site_owner",
      accessToken,
      refreshToken,
      expiresAt,
      updatedAt,
    };
    this.spotifyTokens = tokens;
    return tokens;
  }

  async clearSpotifyTokens(): Promise<void> {
    this.spotifyTokens = undefined;
  }
}

export const storage = new MemStorage();
