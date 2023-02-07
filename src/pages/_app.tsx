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
    <div className="h-screen">
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
              <div className="bg-slate-700 font-mono h-full">
                <HeaderBar title="MoodBox" />
                <Component {...pageProps} />
              </div>
            </LocalFirestoreProvider>
          </LocalFirebaseAuthProvider>
        </FirebaseAppProvider>
      )}
      <ToastContainer position="bottom-right" />
    </div>
  );
}
