import "../styles/globals.css";
import { AuthProvider } from "../services/authentication/auth";
import { SearchProvider } from "../services/search/searchState";

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <SearchProvider>
        <Component {...pageProps} />
      </SearchProvider>
    </AuthProvider>
  );
}

export default MyApp;
