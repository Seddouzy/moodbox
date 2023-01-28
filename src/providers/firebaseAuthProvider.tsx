import { getAuth } from "firebase/auth";
import { ComponentType, ReactNode } from "react";
import { AuthProvider, useFirebaseApp } from "reactfire";

interface Props {
  children: ReactNode;
}

const LocalFirebaseAuthProvider: ComponentType<Props> = ({ children }) => {
  const app = useFirebaseApp();
  const auth = getAuth(app);
  return <AuthProvider sdk={auth}>{children}</AuthProvider>;
};

export default LocalFirebaseAuthProvider;
