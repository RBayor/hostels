import "../styles/globals.css";
import { AuthProvider } from "../services/authentication/auth";
import { SearchProvider } from "../services/search/searchState";
import { FavouriteProvider } from "../services/favourite/favourite";

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <SearchProvider>
        <FavouriteProvider>
          <Component {...pageProps} />
        </FavouriteProvider>
      </SearchProvider>
    </AuthProvider>
  );
}

export default MyApp;
