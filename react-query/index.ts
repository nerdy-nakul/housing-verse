import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
      gcTime: 900000,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
    },
  },
});
