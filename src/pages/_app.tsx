import Context from "@/providers/context/auth";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  const PageComponent = Component as any;
  return (
    <Context>
          <PageComponent {...pageProps} />
      </Context>
  );
}
