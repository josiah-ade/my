import Context from "@/providers/context/auth";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import "../providers/services/config";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import Loader from "@/components/loader/loader";
import NotificationComponent from "@/components/notification/notification";
import React from "react";
import { NextPage } from "next";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
    },
  },
});

type Page = NextPage & { Layout?: React.FC };

export default function App({ Component, pageProps }: AppProps) {
  const PageComponent = Component as Page;
  const Layout = PageComponent.Layout ? PageComponent.Layout : React.Fragment;

  return (
    <>
      <Loader />
      <NotificationComponent />
      <QueryClientProvider client={queryClient}>
        <Context>
          <Layout>
            <PageComponent {...pageProps} />
          </Layout>
        </Context>
      </QueryClientProvider>
    </>
  );
}
