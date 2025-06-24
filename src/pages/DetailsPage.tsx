import { useSpotifyDetails } from 'api/useSpotifyDetails';
import { useParams } from 'react-router-dom';
import type { SearchType } from 'types/searchType.ts';
import { DetailsRenderer } from 'components/DetailsRenderer/DetailsRenderer.tsx';

const DetailsPage = () => {
  const { id, type } = useParams<{ id: string; type: SearchType }>();

  const { data, error, isLoading } = useSpotifyDetails(
    id!,
    type!,
    Boolean(id && type)
  );

  if (isLoading) return <p>Loading details...</p>;
  if (error) return <p>Error: {(error as Error).message}</p>;

  return (
    <div className="p-4 mx-auto">
      <DetailsRenderer type={type!} data={data} />
    </div>
  );
};

export default DetailsPage;
