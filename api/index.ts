import { kv } from "@vercel/kv";
import type { VercelRequest, VercelResponse } from "@vercel/node";

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID || "";
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET || "";
const REDIRECT_URI = process.env.SPOTIFY_REDIRECT_URI || "";
const FRONTEND_URI = process.env.FRONTEND_URI || "";

interface SpotifyToken {
  accessToken: string;
  refreshToken: string;
  expiresAt: string;
}

const getAuthHeader = () => ({
  Authorization: "Basic " + Buffer.from(CLIENT_ID + ":" + CLIENT_SECRET).toString("base64"),
  "Content-Type": "application/x-www-form-urlencoded",
});

const getTokens = async (): Promise<SpotifyToken | null> => {
  return kv.get<SpotifyToken>("spotify_tokens");
};

const saveTokens = async (accessToken: string, refreshToken: string, expiresIn: number) => {
  const tokens: SpotifyToken = {
    accessToken,
    refreshToken,
    expiresAt: new Date(Date.now() + expiresIn * 1000).toISOString(),
  };
  await kv.set("spotify_tokens", tokens);
  return tokens;
};

const getValidAccessToken = async (): Promise<string | null> => {
  const tokens = await getTokens();
  if (!tokens) return null;

  const expiresAt = new Date(tokens.expiresAt).getTime();
  if (Date.now() < expiresAt - 60000) {
    return tokens.accessToken;
  }

  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: getAuthHeader(),
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: tokens.refreshToken,
    }),
  });

  if (!response.ok) return null;

  const data = await response.json();
  await saveTokens(data.access_token, data.refresh_token || tokens.refreshToken, data.expires_in);
  return data.access_token;
};

const generateRandomString = (length: number) => {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  return Array.from({ length }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { url } = req;
  const path = url?.replace(/\?.*$/, "") || "";

  // CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  if (req.method === "OPTIONS") return res.status(200).end();

  try {
    if (path === "/api/spotify/login") {
      const scope = "user-read-currently-playing user-read-playback-state user-top-read playlist-read-private user-read-recently-played";
      const params = new URLSearchParams({
        response_type: "code",
        client_id: CLIENT_ID,
        scope,
        redirect_uri: REDIRECT_URI,
        state: generateRandomString(16),
      });
      return res.redirect(`https://accounts.spotify.com/authorize?${params}`);
    }

    if (path === "/api/spotify/callback") {
      const code = req.query.code as string;
      const state = req.query.state;

      if (!state) {
        return res.redirect(`${FRONTEND_URI}/?error=state_mismatch`);
      }

      const response = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: getAuthHeader(),
        body: new URLSearchParams({
          code,
          redirect_uri: REDIRECT_URI,
          grant_type: "authorization_code",
        }),
      });

      if (!response.ok) {
        return res.redirect(`${FRONTEND_URI}/?error=token_exchange_failed`);
      }

      const data = await response.json();
      await saveTokens(data.access_token, data.refresh_token, data.expires_in);
      return res.redirect(`${FRONTEND_URI}/music?spotify_connected=true`);
    }

    if (path === "/api/spotify/status") {
      const tokens = await getTokens();
      return res.json({ connected: !!tokens });
    }

    if (path === "/api/spotify/currently-playing") {
      const accessToken = await getValidAccessToken();
      if (!accessToken) return res.status(401).json({ error: "Not authenticated" });

      const response = await fetch("https://api.spotify.com/v1/me/player/currently-playing", {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      if (response.status === 204) return res.status(204).end();
      if (!response.ok) return res.status(response.status).json({ error: "Failed to fetch" });

      return res.json(await response.json());
    }

    if (path === "/api/spotify/top-tracks") {
      const accessToken = await getValidAccessToken();
      if (!accessToken) return res.status(401).json({ error: "Not authenticated" });

      const timeRange = req.query.time_range || "medium_term";
      const limit = req.query.limit || "20";

      const response = await fetch(
        `https://api.spotify.com/v1/me/top/tracks?time_range=${timeRange}&limit=${limit}`,
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );

      if (!response.ok) return res.status(response.status).json({ error: "Failed to fetch" });
      return res.json(await response.json());
    }

    if (path === "/api/spotify/playlists") {
      const accessToken = await getValidAccessToken();
      if (!accessToken) return res.status(401).json({ error: "Not authenticated" });

      const limit = req.query.limit || "20";
      const response = await fetch(
        `https://api.spotify.com/v1/me/playlists?limit=${limit}`,
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );

      if (!response.ok) return res.status(response.status).json({ error: "Failed to fetch" });
      return res.json(await response.json());
    }

    if (path.startsWith("/api/spotify/playlist/")) {
      const accessToken = await getValidAccessToken();
      if (!accessToken) return res.status(401).json({ error: "Not authenticated" });

      const id = path.split("/").pop();
      const response = await fetch(`https://api.spotify.com/v1/playlists/${id}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      if (!response.ok) return res.status(response.status).json({ error: "Failed to fetch" });
      return res.json(await response.json());
    }

    return res.status(404).json({ error: "Not found" });
  } catch (error) {
    console.error("API error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
