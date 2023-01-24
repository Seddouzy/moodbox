import { HeaderBar } from "@/components/headerBar";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div>
      <HeaderBar title="MoodBox" />
      <Component {...pageProps} />
    </div>
  );
}
