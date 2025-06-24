import { useEffect, useRef } from 'react';
import { Grid, CircularProgress } from '@mui/material';
import CardElement from './CardElement';
import type { SearchType } from 'types/searchType.ts';
import type { SpotifySearchResponse } from '../types/spotify.ts';
import type { InfiniteData } from '@tanstack/react-query';

interface CardListProps {
  data: InfiniteData<SpotifySearchResponse>;
  submitParams: {
    type: SearchType;
  };
  fetchNextPage: () => void;
  hasNextPage?: boolean;
  isFetchingNextPage?: boolean;
}

const CardList = ({
  data,
  submitParams,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
}: CardListProps) => {
  const observerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!hasNextPage || isFetchingNextPage) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          fetchNextPage();
        }
      },
      {
        rootMargin: '100px',
      }
    );

    const el = observerRef.current;
    if (el) observer.observe(el);

    return () => {
      if (el) observer.unobserve(el);
    };
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <>
      <Grid container spacing={2}>
        {data?.pages.map((page, pageIndex: number) => {
          if (submitParams.type === 'track') {
            return page.tracks?.items.map((item) => (
              <CardElement
                key={`${item.id}-${pageIndex}`}
                item={{ ...item, type: 'track' }}
              />
            ));
          }
          if (submitParams.type === 'album') {
            return page.albums?.items.map((item) => (
              <CardElement
                key={`${item.id}-${pageIndex}`}
                item={{ ...item, type: 'album' }}
              />
            ));
          }
          if (submitParams.type === 'artist') {
            return page.artists?.items.map((item) => (
              <CardElement
                key={`${item.id}-${pageIndex}`}
                item={{ ...item, type: 'artist' }}
              />
            ));
          }
          return null;
        })}
      </Grid>

      {hasNextPage && (
        <div
          ref={observerRef}
          className="w-full h-16 flex justify-center items-center"
        >
          {isFetchingNextPage && <CircularProgress />}
        </div>
      )}
    </>
  );
};

export default CardList;
