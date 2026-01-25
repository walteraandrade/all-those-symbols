import { URLSearchParams } from "url";
import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import axios from "axios";

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID || "YOUR_SPOTIFY_CLIENT_ID";
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET || "YOUR_SPOTIFY_CLIENT_SECRET";
const REDIRECT_URI = process.env.SPOTIFY_REDIRECT_URI || "http://127.0.0.1:3000/api/spotify/callback";
const FRONTEND_URI = process.env.FRONTEND_URI || "http://127.0.0.1:3000";

const getAuthHeader = () => ({
  "Authorization": "Basic " + Buffer.from(CLIENT_ID + ":" + CLIENT_SECRET).toString("base64"),
  "Content-Type": "application/x-www-form-urlencoded"
});

const getValidAccessToken = async (): Promise<string | null> => {
  const tokens = await storage.getSpotifyTokens();
  if (!tokens) return null;

  const expiresAt = new Date(tokens.expiresAt).getTime();
  const now = Date.now();

  if (now < expiresAt - 60000) {
    return tokens.accessToken;
  }

  try {
    const response = await axios.post(
      "https://accounts.spotify.com/api/token",
      new URLSearchParams({
        grant_type: "refresh_token",
        refresh_token: tokens.refreshToken,
      }).toString(),
      { headers: getAuthHeader() }
    );
    const { access_token, expires_in, refresh_token } = response.data;
    await storage.saveSpotifyTokens(
      access_token,
      refresh_token || tokens.refreshToken,
      expires_in
    );
    return access_token;
  } catch (error) {
    console.error("Token refresh failed:", error);
    return null;
  }
};

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  app.get("/api/spotify/login", (req, res) => {
    const scope = "user-read-currently-playing user-read-playback-state user-top-read playlist-read-private user-read-recently-played";
    const queryParams = new URLSearchParams({
      response_type: "code",
      client_id: CLIENT_ID,
      scope: scope,
      redirect_uri: REDIRECT_URI,
      state: generateRandomString(16),
    }).toString();

    res.redirect(`https://accounts.spotify.com/authorize?${queryParams}`);
  });

  app.get("/api/spotify/callback", async (req, res) => {
    const code = req.query.code || null;
    const state = req.query.state || null;

    if (state === null) {
      res.redirect(`${FRONTEND_URI}/?${new URLSearchParams({ error: "state_mismatch" }).toString()}`);
      return;
    }

    try {
      const response = await axios.post(
        "https://accounts.spotify.com/api/token",
        new URLSearchParams({
          code: code as string,
          redirect_uri: REDIRECT_URI,
          grant_type: "authorization_code",
        }).toString(),
        { headers: getAuthHeader() }
      );

      const { access_token, refresh_token, expires_in } = response.data;
      await storage.saveSpotifyTokens(access_token, refresh_token, expires_in);

      res.redirect(`${FRONTEND_URI}/music?spotify_connected=true`);
    } catch (error) {
      console.error("Error during Spotify token exchange:", error);
      res.redirect(`${FRONTEND_URI}/?${new URLSearchParams({ error: "token_exchange_failed" }).toString()}`);
    }
  });

  app.get("/api/spotify/status", async (req, res) => {
    const tokens = await storage.getSpotifyTokens();
    res.json({ connected: !!tokens });
  });

  app.get("/api/spotify/currently-playing", async (req, res) => {
    const accessToken = await getValidAccessToken();
    if (!accessToken) {
      return res.status(401).json({ error: "Not authenticated" });
    }

    try {
      const response = await axios.get("https://api.spotify.com/v1/me/player/currently-playing", {
        headers: { Authorization: `Bearer ${accessToken}` }
      });
      if (response.status === 204 || !response.data) {
        return res.status(204).send();
      }
      res.json(response.data);
    } catch (error: any) {
      console.error("Error fetching currently playing:", error.response?.data || error.message);
      res.status(error.response?.status || 500).json({ error: "Failed to fetch currently playing" });
    }
  });

  app.get("/api/spotify/top-tracks", async (req, res) => {
    const accessToken = await getValidAccessToken();
    if (!accessToken) {
      return res.status(401).json({ error: "Not authenticated" });
    }

    const timeRange = req.query.time_range || "medium_term";
    const limit = req.query.limit || "20";

    try {
      const response = await axios.get(`https://api.spotify.com/v1/me/top/tracks`, {
        headers: { Authorization: `Bearer ${accessToken}` },
        params: { time_range: timeRange, limit }
      });
      res.json(response.data);
    } catch (error: any) {
      console.error("Error fetching top tracks:", error.response?.data || error.message);
      res.status(error.response?.status || 500).json({ error: "Failed to fetch top tracks" });
    }
  });

  app.get("/api/spotify/playlists", async (req, res) => {
    const accessToken = await getValidAccessToken();
    if (!accessToken) {
      return res.status(401).json({ error: "Not authenticated" });
    }

    const limit = req.query.limit || "20";

    try {
      const response = await axios.get("https://api.spotify.com/v1/me/playlists", {
        headers: { Authorization: `Bearer ${accessToken}` },
        params: { limit }
      });
      res.json(response.data);
    } catch (error: any) {
      console.error("Error fetching playlists:", error.response?.data || error.message);
      res.status(error.response?.status || 500).json({ error: "Failed to fetch playlists" });
    }
  });

  app.get("/api/spotify/playlist/:id", async (req, res) => {
    const accessToken = await getValidAccessToken();
    if (!accessToken) {
      return res.status(401).json({ error: "Not authenticated" });
    }

    try {
      const response = await axios.get(`https://api.spotify.com/v1/playlists/${req.params.id}`, {
        headers: { Authorization: `Bearer ${accessToken}` }
      });
      res.json(response.data);
    } catch (error: any) {
      console.error("Error fetching playlist:", error.response?.data || error.message);
      res.status(error.response?.status || 500).json({ error: "Failed to fetch playlist" });
    }
  });

  return httpServer;
}

function generateRandomString(length: number) {
  let text = "";
  const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}
