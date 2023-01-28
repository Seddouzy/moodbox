import { getFirestore } from "firebase/firestore";
import { ComponentType, ReactNode } from "react";
import { FirestoreProvider, useFirebaseApp } from "reactfire";

interface Props {
  children: ReactNode;
}

const LocalFirestoreProvider: ComponentType<Props> = ({ children }) => {
  const firestoreInstance = getFirestore(useFirebaseApp());
  return (
    <FirestoreProvider sdk={firestoreInstance}>{children}</FirestoreProvider>
  );
};

export default LocalFirestoreProvider;
