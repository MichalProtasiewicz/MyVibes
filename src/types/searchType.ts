export type SearchType = 'track' | 'artist' | 'album';

export type ResourceKey = 'tracks' | 'artists' | 'albums';

export const searchVariants: { label: string; value: SearchType }[] = [
  { label: 'Utwory', value: 'track' },
  { label: 'Artyści', value: 'artist' },
  { label: 'Albumy', value: 'album' },
];
