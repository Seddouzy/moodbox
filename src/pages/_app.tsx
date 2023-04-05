import "@/styles/globals.css";
import "react-toastify/dist/ReactToastify.css";

import { HeaderBar } from "@/components/headerBar";
import type { AppProps } from "next/app";
import { FirebaseAppProvider } from "reactfire";
import getConfig from "next/config";
import Head from "next/head";
import LocalFirebaseAuthProvider from "@/providers/firebaseAuthProvider";
import LocalFirestoreProvider from "@/providers/firestoreProvider";
import LocalFirebaseFunctionsProvider from "@/providers/firebaseFunctionsProvider";
import { ToastContainer } from "react-toastify";

export default function App({ Component, pageProps }: AppProps) {
  const { publicRuntimeConfig } = getConfig();
  return (
    <div className="h-screen">
      <Head>
        <title>Moodbox</title>
        <link rel="shortcut icon" href="/favicon.ico" />
      </Head>
      {publicRuntimeConfig.firebaseConfig && (
        <FirebaseAppProvider
          firebaseConfig={publicRuntimeConfig.firebaseConfig}
          suspense={true}
        >
          <LocalFirebaseAuthProvider>
            <LocalFirestoreProvider>
              <LocalFirebaseFunctionsProvider>
                <div className="dark:bg-slate-700 bg-white text-black dark:text-white font-mono h-full">
                  <HeaderBar title="MoodBox" />
                  <div className="container mx-auto mt-4 p-4">
                    <Component {...pageProps} />
                  </div>
                </div>
              </LocalFirebaseFunctionsProvider>
            </LocalFirestoreProvider>
          </LocalFirebaseAuthProvider>
        </FirebaseAppProvider>
      )}
      <ToastContainer position="bottom-right" />
    </div>
  );
}
