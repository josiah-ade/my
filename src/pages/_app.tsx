import getQueryClientConfig from "@/core/config/query.config";
import Loader from "@/shared/components/common/loader";
import NotificationComponent from "@/shared/components/common/notification";
import AuthContext from "@/shared/context/auth";
import "@/styles/globals.css";
import { NextPage } from "next";
import type { AppProps } from "next/app";
import React from "react";
import { QueryClientProvider } from "react-query";

type Page = NextPage & { Layout?: React.FC };

const queryClient = getQueryClientConfig();

export default function App({ Component, pageProps }: AppProps) {
  const PageComponent = Component as Page;
  const Layout = PageComponent.Layout ? PageComponent.Layout : React.Fragment;

  return (
    <>
      <Loader />
      <NotificationComponent />
      <QueryClientProvider client={queryClient}>
        <AuthContext>
          <Layout>
            <PageComponent {...pageProps} />
          </Layout>
        </AuthContext>
      </QueryClientProvider>
    </>
  );
}
