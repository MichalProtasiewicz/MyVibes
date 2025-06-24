import type { ArtistDetailsData } from 'types/spotify.ts';
import placeholderImage from 'assets/elementor-placeholder-image.webp';

interface ArtistDetailsProps {
  data: ArtistDetailsData;
}

const ArtistDetails = ({ data }: ArtistDetailsProps) => {
  return (
    <div>
      <h2 className="text-3xl font-bold mb-2">{data.name}</h2>
      {data.images?.[0]?.url && (
        <img
          src={data.images?.[0]?.url || placeholderImage}
          alt={data.name}
          className="w-64 rounded-xl my-4"
        />
      )}
      <p>Obserwujący: {data.followers?.total.toLocaleString()}</p>
      <p>Popularność: {data.popularity}/100</p>
      <p>
        <a
          href={data.external_urls?.spotify}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 underline"
        >
          Wyświetl artystę na Spotify
        </a>
      </p>
    </div>
  );
};

export default ArtistDetails;
