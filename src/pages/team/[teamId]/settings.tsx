import {
  useFirestoreDocData,
  useFirestore,
  useAuth,
  useUser,
  useFunctions,
} from "reactfire";

import { useRouter } from "next/router";
import { NextPage } from "next";
import { doc, onSnapshot, updateDoc } from "firebase/firestore";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { httpsCallable } from "firebase/functions";
import LoadingSpinner from "@/components/general/loadingSpinner";
import { useHasRole } from "@/hooks/useHasRole";
import CreateTeamInvitationLink from "../../../components/team/createTeamInvitationLink";
import UserRole from "@/shared/enum/userRole.enum";
import NotAuthorized from "@/components/general/notAuthorized";
import TeamMemberList from "@/components/team/teamMemberList";

const TeamSettings: NextPage = () => {
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

  const updateTeam = async (updateData: Record<string, any>) => {
    if (teamId) {
      const docRef = doc(firestore, "teams", teamId.toString());
      await toast
        .promise(updateDoc(docRef, updateData), {
          pending: `Updating Team ${data.name}`,
          success: `Updated Team ${data.name}`,
          error: {
            render({ data }) {
              const err = data as any;
              return `${err.code}: ${err.message} 🤯`;
            },
          },
        })
        .catch((err) => console.error(err));
    }
  };

  useEffect(() => {
    if (teamId) {
      const docRef = doc(firestore, "teams", teamId.toString());
      onSnapshot(
        docRef,
        (doc) => {
          setData(doc.data());
          setLoading(false);
        },
        (error) => {
          setError(error);
          setLoading(false);
        }
      );
    }
  }, [teamId, firestore]);

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
          <h1 className="text-3xl font-black">{data.name}</h1>
          {teamId && (
            <CreateTeamInvitationLink
              teamId={teamId.toString()}
              tokenId={data.tokenId}
              updateTeam={updateTeam}
            />
          )}
          <div>
            <h1 className="text-3xl font-black">
              {"Team Member List" && data.name}
            </h1>
            {teamId && <TeamMemberList teamId={teamId.toString()} />}
          </div>
        </>
      )}
    </div>
  );
};

export default TeamSettings;
