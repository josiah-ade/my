import Context from "@/providers/context/auth";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import "../providers/services/config"
import { QueryClient, QueryClientProvider, useQuery } from "react-query";

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  const PageComponent = Component as any;
  return (
    <QueryClientProvider client={queryClient}>
    <Context>
          <PageComponent {...pageProps} />
      </Context>
    </QueryClientProvider>
  );
}
