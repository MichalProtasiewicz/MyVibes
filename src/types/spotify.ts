export interface AlbumDetailsData {
  id: string;
  name: string;
  release_date: string;
  total_tracks: number;
  available_markets: string[];
  external_urls: {
    spotify: string;
  };
  images: {
    url: string;
    height?: number;
    width?: number;
  }[];
  artists: {
    id: string;
    name: string;
  }[];
}

export interface ArtistDetailsData {
  id: string;
  name: string;
  popularity: number;
  genres: string[];
  followers: {
    total: number;
  };
  images: {
    url: string;
    height?: number;
    width?: number;
  }[];
  external_urls: {
    spotify: string;
  };
}

export interface TrackDetailsData {
  id: string;
  name: string;
  duration_ms: number;
  explicit: boolean;
  popularity: number;
  preview_url: string | null;
  external_urls: {
    spotify: string;
  };
  artists: {
    id: string;
    name: string;
    external_urls: {
      spotify: string;
    };
  }[];
  album: {
    id: string;
    name: string;
    release_date: string;
    images: {
      url: string;
      height?: number;
      width?: number;
    }[];
    external_urls: {
      spotify: string;
    };
  };
}
export interface SpotifySearchResponse {
  tracks?: SpotifyPaging<TrackDetailsData>;
  artists?: SpotifyPaging<ArtistDetailsData>;
  albums?: SpotifyPaging<AlbumDetailsData>;
}

export interface SpotifyPaging<T> {
  href: string;
  items: T[];
  limit: number;
  next: string | null;
  offset: number;
  previous: string | null;
  total: number;
}

export type SpotifySearchItem =
  | (AlbumDetailsData & { type: 'album' })
  | (ArtistDetailsData & { type: 'artist' })
  | (TrackDetailsData & { type: 'track' });
