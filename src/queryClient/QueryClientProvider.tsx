import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';

// Create a client instance
const queryClient = new QueryClient();

export const ReactQueryProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
};
