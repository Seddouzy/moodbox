import type { AppProps } from "next/app";
import ShowVotes from "./showVotes";
import LoadingSpinner from "@/components/general/loadingSpinner";
import NotAuthorized from "@/components/general/notAuthorized";
import { useRouter } from "next/router";
import { useAuth, useFirestore, useFunctions, useUser } from "reactfire";
import { useState } from "react";
import { useHasRole } from "@/hooks/useHasRole";
import UserRole from "@/shared/enum/userRole.enum";

export default function Reports({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const { teamId } = router.query;
  const firestore = useFirestore();
  const functions = useFunctions();
  const auth = useAuth();
  const [error, setError] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<any>(null);
  const { status, data: user } = useUser();

  const hasRole = useHasRole({
    teamId: teamId as string,
    userId: user?.uid,
    role: UserRole.OWNER,
  });

  if (loading || hasRole === undefined) {
    return <LoadingSpinner text="Fetching Team Settings" />;
  }

  if (!hasRole) {
    return <NotAuthorized text="no access to team settings" />;
  }

  //TODO: Hier zweispaltig join team und create Team? Oder einfach Team join nur über invitation link ganz ohne extra page?
  return (
    <div className="container p-4 text-black dark:text-white">
      {error && <div>Error: {error.message}</div>}
      {data && !error && (
        <>
          <ShowVotes />
        </>
      )}
    </div>
  );
}
