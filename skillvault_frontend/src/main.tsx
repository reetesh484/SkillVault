import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ThemeProvider } from "./components/ThemeProvider.tsx";

// GLOBAL DEFAULTS FOR ALL QUERIES
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 30_000, // data never becomes stale automatically
      // refetchOnMount: false, // no refetch when navigating back
      refetchOnWindowFocus: false, // no refetch on tab focus
      retry: 1, // retry failed queries once
    },
  },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="system" storageKey="app-theme">
      <QueryClientProvider client={queryClient}>
        <App />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </ThemeProvider>
  </StrictMode>
);
