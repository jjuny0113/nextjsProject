import "../styles/globals.css";
import type { AppProps } from "next/app";
import { SWRConfig } from "swr";
import axios from "axios";

function MyApp({ Component, pageProps }: AppProps) {
  const fetcher = async (url: string) => {
    const result = await axios.get(url);
    return result.data;
  };
  return (
    <SWRConfig value={{ fetcher }}>
      <div className="w-full max-w-xl mx-auto">
        <Component {...pageProps} />
      </div>
    </SWRConfig>
  );
}

export default MyApp;
