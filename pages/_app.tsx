import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { SearchContextProvider } from "@/context/SearchContext";
import { CurrentUserContextProvider } from "@/context/CurrentUserContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <CurrentUserContextProvider>
      <SearchContextProvider>
        <Component {...pageProps} />
      </SearchContextProvider>
    </CurrentUserContextProvider>
  );
}
