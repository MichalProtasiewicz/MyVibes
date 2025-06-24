import {
  useInfiniteQuery,
  type UseInfiniteQueryResult,
} from '@tanstack/react-query';
import { searchSpotify } from './spotify.ts';
import type { ResourceKey, SearchType } from '../types/searchType.ts';
import type { SpotifySearchResponse } from '../types/spotify.ts';

interface UseSpotifySearchParams {
  query: string;
  type: SearchType;
}

export const useSpotifySearch = (
  params: UseSpotifySearchParams,
  enabled: boolean
): UseInfiniteQueryResult<SpotifySearchResponse, Error> => {
  return useInfiniteQuery<
    SpotifySearchResponse,
    Error,
    SpotifySearchResponse,
    [string, string, string],
    number
  >({
    queryKey: ['spotifySearch', params.query, params.type],
    queryFn: ({ pageParam = 0 }) =>
      searchSpotify(params.query, params.type, pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      const resourceKey = `${params.type}s` as ResourceKey; // np. 'tracks', 'albums'
      const nextUrl = lastPage?.[resourceKey]?.next;

      if (!nextUrl) return undefined;

      const url = new URL(nextUrl);
      const offset = url.searchParams.get('offset');
      return offset ? Number(offset) : undefined;
    },
    enabled,
    retry: false,
  });
};
