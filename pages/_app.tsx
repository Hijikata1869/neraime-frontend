import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { SearchContextProvider } from "@/context/SearchContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SearchContextProvider>
      <Component {...pageProps} />
    </SearchContextProvider>
  );
}
