import { useState, useEffect, useCallback } from "react";
import { Music, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Skeleton } from "@/components/ui/skeleton";

interface SpotifyTrack {
  name: string;
  artist: string;
  albumImageUrl: string;
  isPlaying: boolean;
  externalUrl: string;
}

interface TopTrack {
  name: string;
  artists: { name: string }[];
  external_urls: { spotify: string };
  album?: {
    images: Array<{ url: string }>;
    name: string;
  };
}

interface SpotifyPlaylist {
  id: string;
  name: string;
  description: string | null;
  images: Array<{ url: string }>;
  external_urls: { spotify: string };
  tracks: {
    total: number;
    items: Array<{
      track: {
        name: string;
        artists: Array<{ name: string }>;
        external_urls: { spotify: string };
        album: {
          name: string;
          images: Array<{ url: string }>;
        };
      };
    }>;
  };
}

export function MusicSection() {
  const [isConnected, setIsConnected] = useState<boolean | null>(null);
  const [spotifyTrack, setSpotifyTrack] = useState<SpotifyTrack | null>(null);
  const [topTracks, setTopTracks] = useState<TopTrack[]>([]);
  const [playlists, setPlaylists] = useState<SpotifyPlaylist[]>([]);
  const [loading, setLoading] = useState(true);
  const [initialLoadDone, setInitialLoadDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Check connection status on mount
  useEffect(() => {
    checkConnectionStatus();
    
    // Check for OAuth callback success
    const params = new URLSearchParams(window.location.search);
    if (params.get("spotify_connected") === "true") {
      setIsConnected(true);
      window.history.replaceState({}, document.title, window.location.pathname);
    } else if (params.get("error")) {
      setError(`Spotify authentication failed: ${params.get("error")}`);
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []);

  const checkConnectionStatus = async () => {
    try {
      const response = await fetch("/api/spotify/status");
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error("Expected JSON response");
      }
      const data = await response.json();
      setIsConnected(data.connected);
      if (data.connected) {
        fetchCurrentPlaying();
        fetchTopTracks();
        fetchPlaylists();
      }
    } catch (err) {
      console.error("Failed to check connection status:", err);
      setIsConnected(false);
    }
  };

  const fetchCurrentPlaying = useCallback(async (isInitial = false) => {
    if (isInitial) {
      setLoading(true);
      setError(null);
    }
    try {
      const response = await fetch("/api/spotify/currently-playing");

      if (response.status === 204) {
        setSpotifyTrack(null);
        if (isInitial) setLoading(false);
        return;
      }

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `HTTP ${response.status}`);
      }

      const data = await response.json();
      if (data && data.item) {
        setSpotifyTrack({
          name: data.item.name,
          artist: data.item.artists.map((artist: any) => artist.name).join(", "),
          albumImageUrl: data.item.album.images[0]?.url || "https://via.placeholder.com/48",
          isPlaying: data.is_playing,
          externalUrl: data.item.external_urls.spotify,
        });
      } else {
        setSpotifyTrack(null);
      }
    } catch (err: any) {
      console.error("Failed to fetch currently playing track:", err);
      if (isInitial) {
        setError(err.message || "Failed to fetch current track.");
      }
      setSpotifyTrack(null);
    } finally {
      if (isInitial) {
        setLoading(false);
        setInitialLoadDone(true);
      }
    }
  }, []);

  const fetchTopTracks = useCallback(async () => {
    try {
      const response = await fetch("/api/spotify/top-tracks?time_range=long_term&limit=5");
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `HTTP ${response.status}`);
      }
      const data = await response.json();
      setTopTracks(data.items || []);
    } catch (err: any) {
      console.error("Failed to fetch top tracks:", err);
      setError(err.message || "Failed to fetch top tracks.");
      setTopTracks([]);
    }
  }, []);

  const fetchPlaylists = useCallback(async () => {
    try {
      const response = await fetch("/api/spotify/playlists?limit=20");
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `HTTP ${response.status}`);
      }
      const data = await response.json();
      setPlaylists(data.items || []);
    } catch (err: any) {
      console.error("Failed to fetch playlists:", err);
      // Don't set error for playlists, it's not critical
    }
  }, []);

  const fetchPlaylistDetails = useCallback(async (playlistId: string): Promise<SpotifyPlaylist | null> => {
    try {
      const response = await fetch(`/api/spotify/playlist/${playlistId}`);
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      return await response.json();
    } catch (err) {
      console.error("Failed to fetch playlist details:", err);
      return null;
    }
  }, []);

  // Poll for currently playing track every 5 seconds
  useEffect(() => {
    if (!isConnected) return;

    fetchCurrentPlaying(!initialLoadDone);
    const interval = setInterval(() => {
      fetchCurrentPlaying(false);
    }, 5000);

    return () => clearInterval(interval);
  }, [isConnected, fetchCurrentPlaying, initialLoadDone]);

  const handleSpotifyLogin = () => {
    window.location.href = "/api/spotify/login";
  };

  if (isConnected === null) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-64 w-full rounded-xl" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Currently Playing Section */}
      <div className="bg-gradient-to-br from-card to-background p-8 rounded-xl border border-primary/20 flex flex-col items-center text-center space-y-6 min-h-[360px]">
        <div className="w-32 h-32 rounded-full bg-primary/20 flex items-center justify-center relative overflow-hidden animate-pulse-slow">
          <Music className="w-16 h-16 text-primary" />
          <div className="absolute inset-0 border-4 border-primary/30 rounded-full border-t-primary animate-spin-slow" />
        </div>
        
        <div>
          <h3 className="text-2xl font-display font-bold">Currently Listening</h3>
          {loading ? (
            <p className="text-muted-foreground">Loading Spotify data...</p>
          ) : error ? (
            <p className="text-destructive">{error}</p>
          ) : isConnected ? (
            spotifyTrack ? (
              <>
                <p className="text-muted-foreground text-lg">{spotifyTrack.name}</p>
                <p className="text-sm text-accent">{spotifyTrack.artist}</p>
              </>
            ) : (
              <p className="text-muted-foreground">Nothing currently playing on Spotify.</p>
            )
          ) : (
            <p className="text-muted-foreground">Connect to Spotify to see what Walter is listening to.</p>
          )}
        </div>

        {isConnected ? (
          spotifyTrack && (
            <a
              href={spotifyTrack.externalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full max-w-sm bg-secondary/50 p-4 rounded-lg flex items-center gap-4 hover:bg-secondary/70 transition-colors"
            >
              {spotifyTrack.albumImageUrl && (
                <div className="w-12 h-12 bg-black rounded flex items-center justify-center overflow-hidden">
                  <img src={spotifyTrack.albumImageUrl} alt="Album Art" className="w-full h-full object-cover" />
                </div>
              )}
              <div className="flex-1 text-left">
                <div className="text-sm font-bold text-foreground">{spotifyTrack.name}</div>
                <div className="text-xs text-muted-foreground">{spotifyTrack.artist}</div>
              </div>
              <ExternalLink className="w-4 h-4 text-primary" />
            </a>
          )
        ) : (
          <Button onClick={handleSpotifyLogin} className="mt-4">
            Connect to Spotify
          </Button>
        )}
      </div>

      {isConnected && (
        <Tabs defaultValue="tracks" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="tracks">Top Tracks</TabsTrigger>
            <TabsTrigger value="playlists">Playlists</TabsTrigger>
          </TabsList>
          
          <TabsContent value="tracks" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded border border-border bg-card/30">
                <h4 className="font-bold mb-2 text-accent">Top Tracks</h4>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  {topTracks.length > 0 ? (
                    topTracks.map((track, index) => (
                      <li key={index}>
                        • <a 
                          href={track.external_urls.spotify} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="hover:underline text-foreground hover:text-primary transition-colors"
                        >
                          {track.name} by {track.artists.map(artist => artist.name).join(', ')}
                        </a>
                      </li>
                    ))
                  ) : (
                    <li>No top tracks available.</li>
                  )}
                </ul>
              </div>
              <div className="p-4 rounded border border-border bg-card/30">
                <h4 className="font-bold mb-2 text-accent">Recent Obsessions</h4>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>• Bach - Goldberg Variations</li>
                  <li>• Aphex Twin</li>
                  <li>• Steve Reich</li>
                </ul>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="playlists" className="space-y-4">
            {playlists.length > 0 ? (
              <Accordion type="single" collapsible className="w-full">
                {playlists.map((playlist) => (
                  <AccordionItem key={playlist.id} value={playlist.id}>
                    <AccordionTrigger className="hover:no-underline">
                      <div className="flex items-center gap-3">
                        {playlist.images && playlist.images[0] && (
                          <img 
                            src={playlist.images[0].url} 
                            alt={playlist.name}
                            className="w-12 h-12 rounded object-cover"
                          />
                        )}
                        <div className="text-left">
                          <div className="font-bold">{playlist.name}</div>
                          {playlist.description && (
                            <div className="text-sm text-muted-foreground">{playlist.description}</div>
                          )}
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <PlaylistContent playlistId={playlist.id} fetchPlaylistDetails={fetchPlaylistDetails} />
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            ) : (
              <p className="text-muted-foreground text-center py-8">No playlists available.</p>
            )}
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
}

function PlaylistContent({ playlistId, fetchPlaylistDetails }: { playlistId: string; fetchPlaylistDetails: (id: string) => Promise<SpotifyPlaylist | null> }) {
  const [playlist, setPlaylist] = useState<SpotifyPlaylist | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPlaylistDetails(playlistId).then((data) => {
      setPlaylist(data);
      setLoading(false);
    });
  }, [playlistId, fetchPlaylistDetails]);

  if (loading) {
    return <div className="py-4"><Skeleton className="h-32 w-full" /></div>;
  }

  if (!playlist || !playlist.tracks.items.length) {
    return <p className="text-muted-foreground py-4">No tracks in this playlist.</p>;
  }

  return (
    <div className="space-y-2 py-4">
      {playlist.tracks.items.slice(0, 10).map((item, index) => (
        item.track && (
          <div key={index} className="flex items-center gap-3 p-2 rounded hover:bg-secondary/50 transition-colors">
            {item.track.album.images && item.track.album.images[0] && (
              <img 
                src={item.track.album.images[0].url} 
                alt={item.track.name}
                className="w-10 h-10 rounded object-cover"
              />
            )}
            <div className="flex-1 min-w-0">
              <div className="font-medium text-sm truncate">{item.track.name}</div>
              <div className="text-xs text-muted-foreground truncate">
                {item.track.artists.map(a => a.name).join(", ")} • {item.track.album.name}
              </div>
            </div>
            <a 
              href={item.track.external_urls.spotify} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary hover:text-primary/80"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        )
      ))}
      {playlist.tracks.total > 10 && (
        <p className="text-xs text-muted-foreground text-center pt-2">
          Showing 10 of {playlist.tracks.total} tracks
        </p>
      )}
    </div>
  );
}
