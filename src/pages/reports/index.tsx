import type { AppProps } from "next/app";
import ShowVotes from "./showVotes";

export default function Home({ Component, pageProps }: AppProps) {
  return (
    <div>
      <ShowVotes />
    </div>
  );
}
