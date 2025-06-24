import { Link } from 'react-router-dom';
import type { AlbumDetailsData } from 'types/spotify.ts';
import placeholderImage from 'assets/elementor-placeholder-image.webp';

interface AlbumDetailsProps {
  data: AlbumDetailsData;
}

const AlbumDetails = ({ data }: AlbumDetailsProps) => {
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
      <img
        src={data.images?.[0]?.url || placeholderImage}
        alt={data.name}
        className="w-64 rounded-xl my-4"
      />
      <p>Data wydania: {data.release_date}</p>
      <p>Ilość utworów: {data.total_tracks}</p>
      <p>Dostępny w {data.available_markets?.length} krajach</p>
      <p>
        <a
          href={data.external_urls?.spotify}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 underline"
        >
          Wyświetl album na Spotify
        </a>
      </p>
    </div>
  );
};

export default AlbumDetails;
