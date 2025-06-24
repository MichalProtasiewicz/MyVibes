import type { SearchType } from 'types/searchType.ts';
import TrackDetails from './TrackDetails.tsx';
import AlbumDetails from './AlbumDetails.tsx';
import ArtistDetails from './ArtistDetails.tsx';
import type {
  AlbumDetailsData,
  ArtistDetailsData,
  TrackDetailsData,
} from '../../types/spotify.ts';

type DetailsData = AlbumDetailsData | ArtistDetailsData | TrackDetailsData;

interface DetailsRendererProps {
  type: SearchType;
  data: DetailsData;
}

export const DetailsRenderer = ({ type, data }: DetailsRendererProps) => {
  if (type === 'track') {
    return <TrackDetails data={data as TrackDetailsData} />;
  }

  if (type === 'album') {
    return <AlbumDetails data={data as AlbumDetailsData} />;
  }

  if (type === 'artist') {
    return <ArtistDetails data={data as ArtistDetailsData} />;
  }

  return <p>Unsupported content type.</p>;
};
