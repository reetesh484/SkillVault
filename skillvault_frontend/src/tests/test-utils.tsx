import React from "react";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

export function createTestQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        staleTime: 0,
      },
    },
  });
}

export function renderWithClient(ui: React.ReactElement, { route = "/" } = {}) {
  const client = createTestQueryClient();

  return {
    ...render(
      <MemoryRouter initialEntries={[route]}>
        <QueryClientProvider client={client}>{ui}</QueryClientProvider>
      </MemoryRouter>
    ),
    queryClient: client,
  };
}
