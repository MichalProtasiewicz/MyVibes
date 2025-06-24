import { useQuery } from '@tanstack/react-query';
import { fetchSpotifyDetails } from './spotify';
import type { SearchType } from '../types/searchType.ts';

export const useSpotifyDetails = (
  id: string,
  type: SearchType,
  enabled: boolean
) => {
  return useQuery({
    queryKey: ['spotifyDetails', type, id],
    queryFn: () => fetchSpotifyDetails(id, type),
    enabled,
    retry: false,
    staleTime: 1000 * 60 * 5,
  });
};
