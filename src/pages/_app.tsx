import "@/styles/globals.css";
import "react-toastify/dist/ReactToastify.css";

import { HeaderBar } from "@/components/headerBar";
import type { AppProps } from "next/app";
import { FirebaseAppProvider } from "reactfire";
import { ReactNode } from "react";
import getConfig from "next/config";
import Head from "next/head";
import LocalFirebaseAuthProvider from "@/providers/firebaseAuthProvider";
import LocalFirestoreProvider from "@/providers/firestoreProvider";
import { ToastContainer } from "react-toastify";

interface FirebaseAppWrapperProps {
  children: ReactNode;
}

export default function App({ Component, pageProps }: AppProps) {
  const { publicRuntimeConfig } = getConfig();
  return (
    <>
      <Head>
        <title>Moodbox</title>
      </Head>
      {publicRuntimeConfig.firebaseConfig && (
        <FirebaseAppProvider
          firebaseConfig={publicRuntimeConfig.firebaseConfig}
          suspense={true}
        >
          <LocalFirebaseAuthProvider>
            <LocalFirestoreProvider>
              <>
                <HeaderBar title="MoodBox" />
                <Component {...pageProps} />
              </>
            </LocalFirestoreProvider>
          </LocalFirebaseAuthProvider>
        </FirebaseAppProvider>
      )}
      <ToastContainer position="bottom-right" />
    </>
  );
}
