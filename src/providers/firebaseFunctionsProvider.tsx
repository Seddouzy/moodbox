import { getFunctions } from "firebase/functions";
import { ComponentType, ReactNode } from "react";
import { FunctionsProvider, useFirebaseApp } from "reactfire";

interface Props {
  children: ReactNode;
}

const LocalFirebaseFunctionsProvider: ComponentType<Props> = ({ children }) => {
  const firebaseFunctionsInstance = getFunctions(useFirebaseApp());
  return (
    <FunctionsProvider sdk={firebaseFunctionsInstance}>
      {children}
    </FunctionsProvider>
  );
};

export default LocalFirebaseFunctionsProvider;
