import "react-toastify/dist/ReactToastify.css";

import { HeaderBar } from "@/components/headerBar";
import Head from "next/head";
import type { AppProps } from "next/app";
import { ToastContainer } from "react-toastify";
import { ShowVotes } from "./showVotes";

export default function Home({ Component, pageProps }: AppProps) {
  return (
    <div>
      <ShowVotes />
    </div>
  );
}
