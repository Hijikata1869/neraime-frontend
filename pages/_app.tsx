import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { SearchContextProvider } from "@/context/SearchContext";
import { CurrentUserContextProvider } from "@/context/CurrentUserContext";
import { NotificationProvider } from "@/context/notificationContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <CurrentUserContextProvider>
      <SearchContextProvider>
        <NotificationProvider>
          <Component {...pageProps} />
        </NotificationProvider>
      </SearchContextProvider>
    </CurrentUserContextProvider>
  );
}
