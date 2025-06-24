import { useSpotifySearch } from 'api/useSpotifySearch.ts';
import SearchForm from 'components/SearchForm';
import { CircularProgress } from '@mui/material';
import type { SearchType } from '../types/searchType.ts';
import { useState } from 'react';
import CardList from 'components/CardList.tsx';
import type { InfiniteData } from '@tanstack/react-query';
import type { SpotifySearchResponse } from '../types/spotify.ts';

const SearchPage = () => {
  const [submitParams, setSubmitParams] = useState<{
    query: string;
    type: SearchType;
  }>({ query: '', type: 'track' });

  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useSpotifySearch(
    { query: submitParams.query, type: submitParams.type },
    !!submitParams?.query
  );

  return (
    <div>
      <SearchForm onSubmit={(q, t) => setSubmitParams({ query: q, type: t })} />
      <div className="w-full mx-auto p-4">
        {isLoading && <CircularProgress />}
        {error && <p className="text-red-500">Error fetching data</p>}
        {data && (
          <CardList
            data={data as InfiniteData<SpotifySearchResponse>}
            submitParams={submitParams}
            fetchNextPage={fetchNextPage}
            hasNextPage={hasNextPage}
            isFetchingNextPage={isFetchingNextPage}
          />
        )}
      </div>
    </div>
  );
};

export default SearchPage;
