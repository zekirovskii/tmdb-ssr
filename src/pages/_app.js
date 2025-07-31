// src/pages/_app.js
import { useEffect } from "react";
import { useRouter } from "next/router";
import { FavoritesProvider } from "@context/FavoritesContext";
import { SearchProvider, useSearch } from "@context/SearchContext";
import Layout from "@components/Layout/Layout";
import "@styles/globals.css";
import SearchInput from "@components/SearchInput/SearchInput";

function AppContent({ Component, pageProps }) {
  const router = useRouter();
  const { isSearchVisible, showSearchInput, hideSearchInput } = useSearch();

useEffect(() => {
  if (router.pathname === "/") {
    showSearchInput();
  } else {
    hideSearchInput();
  }
}, [router.pathname, showSearchInput, hideSearchInput]);

  return (
    <>
      {isSearchVisible && <SearchInput />}
      <Component {...pageProps} />
    </>
  );
}

export default function App(props) {
  return (
    <FavoritesProvider>
      <SearchProvider>
        <Layout>
          <AppContent {...props} />
        </Layout>
      </SearchProvider>
    </FavoritesProvider>
  );
}
