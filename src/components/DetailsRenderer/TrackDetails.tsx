import { Link } from 'react-router-dom';
import type { TrackDetailsData } from 'types/spotify.ts';
import placeholderImage from 'assets/elementor-placeholder-image.webp';

interface TrackDetailsProps {
  data: TrackDetailsData;
}

const TrackDetails = ({ data }: TrackDetailsProps) => {
  return (
    <div>
      <h2 className="text-3xl font-bold mb-2">{data.name}</h2>
      <p className="text-gray-600 mb-1">
        Autor:{' '}
        {data.artists?.map((artist, index: number) => (
          <span key={artist.id}>
            <Link
              to={`/details/artist/${artist.id}`}
              className="underline text-blue-600 hover:text-blue-800"
            >
              {artist.name}
            </Link>
            {index < data.artists.length - 1 && ', '}
          </span>
        ))}
      </p>
      <p className="mb-1">Album: {data.album?.name}</p>
      <img
        src={data.album?.images?.[0]?.url || placeholderImage}
        alt={data.name}
        className="w-64 rounded-xl my-4"
      />
      <p>Czas trwania: {(data.duration_ms / 1000).toFixed(0)} sec</p>
      <p>Popularność: {data.popularity}</p>
      <p>
        Nieodpowiedni dla niektórych odbiorców: {data.explicit ? 'Tak' : 'Nie'}
      </p>
      <p>
        <a
          href={data.external_urls?.spotify}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 underline"
        >
          Posłuchaj na Spotify
        </a>
      </p>
    </div>
  );
};

export default TrackDetails;
