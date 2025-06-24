import { QueryClient } from '@tanstack/react-query';

const MINUTE = 1000 * 60;

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 5 * MINUTE,
      gcTime: 30 * MINUTE,
      refetchOnWindowFocus: false,
    },
  },
});
