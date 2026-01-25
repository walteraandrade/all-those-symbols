// Spotify API response types

export interface SpotifyArtist {
  name: string;
  external_urls: {
    spotify: string;
  };
}

export interface SpotifyAlbum {
  name: string;
  images: Array<{
    url: string;
    height: number | null;
    width: number | null;
  }>;
  external_urls: {
    spotify: string;
  };
}

export interface SpotifyTrack {
  id: string;
  name: string;
  artists: SpotifyArtist[];
  album: SpotifyAlbum;
  external_urls: {
    spotify: string;
  };
  duration_ms: number;
  preview_url: string | null;
}

export interface SpotifyPlaylistTrack {
  track: SpotifyTrack | null;
  added_at: string;
}

export interface SpotifyPlaylist {
  id: string;
  name: string;
  description: string | null;
  images: Array<{
    url: string;
    height: number | null;
    width: number | null;
  }>;
  external_urls: {
    spotify: string;
  };
  tracks: {
    total: number;
    items: SpotifyPlaylistTrack[];
    next: string | null;
  };
  owner: {
    display_name: string;
    external_urls: {
      spotify: string;
    };
  };
}

export interface SpotifyCurrentlyPlaying {
  is_playing: boolean;
  item: SpotifyTrack | null;
  progress_ms: number | null;
  timestamp: number;
}

export interface SpotifyTopTracksResponse {
  items: SpotifyTrack[];
  total: number;
  limit: number;
  offset: number;
}

export interface SpotifyPlaylistsResponse {
  items: Array<{
    id: string;
    name: string;
    description: string | null;
    images: Array<{
      url: string;
      height: number | null;
      width: number | null;
    }>;
    external_urls: {
      spotify: string;
    };
    tracks: {
      total: number;
    };
  }>;
  total: number;
  limit: number;
  offset: number;
}


