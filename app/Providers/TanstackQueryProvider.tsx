"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";

// Créez une instance du client en dehors du composant
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      refetchOnWindowFocus: false,
    },
  },
});

export default function TanstackQueryProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // Le QueryClientProvider est utilisé uniquement dans ce Client Component
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
