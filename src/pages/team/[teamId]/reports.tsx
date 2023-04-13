import LoadingSpinner from "@/components/general/loadingSpinner";
import NotAuthorized from "@/components/general/notAuthorized";
import { useRouter } from "next/router";
import { useFirestore, useUser } from "reactfire";
import { useEffect, useState } from "react";
import { useHasRole } from "@/hooks/useHasRole";
import UserRole from "@/shared/enum/userRole.enum";
import TotalVotesPerTeam from "@/components/charts/totalVotesPerTeam";
import { NextPage } from "next";
import { doc, onSnapshot, updateDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import TeamQuickActions from "@/components/team/teamQuickActions";

const TeamReports: NextPage = () => {
  const router = useRouter();
  const { teamId } = router.query;
  const firestore = useFirestore();
  const [error, setError] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<any>(null);
  const { data: user } = useUser();

  const hasRole = useHasRole({
    teamId: teamId as string,
    userId: user?.uid,
    role: UserRole.MEMBER,
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
    return <LoadingSpinner text="Fetching Team reports" />;
  }

  if (!hasRole) {
    return <NotAuthorized text="no access to team reports" />;
  }

  return (
    <div>
      <TeamQuickActions teamName={data.name} />
      <div className="container p-4 text-black dark:text-white">
        {error && <div>Error: {error.message}</div>}
        {data &&
          !error &&
          teamId && ( // add a check for teamId
            <>{teamId && <TotalVotesPerTeam teamId={teamId.toString()} />}</>
          )}
      </div>
    </div>
  );
};

export default TeamReports;
