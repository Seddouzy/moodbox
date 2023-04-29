import LoadingSpinner from "@/components/general/loadingSpinner";
import NotAuthorized from "@/components/general/notAuthorized";
import { useRouter } from "next/router";
import { useFirestore, useUser } from "reactfire";
import { useEffect, useState } from "react";
import { useHasRole } from "@/hooks/useHasRole";
import UserRole from "@/shared/enum/userRole.enum";
import TotalVotesPerTeam from "@/components/charts/totalVotesPerTeam";
import { NextPage } from "next";
import {
  collection,
  doc,
  getDocs,
  getFirestore,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { toast } from "react-toastify";
import TeamQuickActions from "@/components/team/teamQuickActions";
import TeamMoodCircle from "@/components/charts/teamMoodCircle";
import TotalMemberPerTeam from "@/components/charts/totalMemberPerTeam";
import SentimentByDay from "@/components/charts/sentimentByDay";
import { AnonymousVote } from "@/shared/interface/AnonymousVote";

const MyReports: NextPage = () => {
  const router = useRouter();
  const { teamId } = router.query;
  const firestore = useFirestore();
  const [error, setError] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<any>(null);
  const { data: user } = useUser();
  const [allTeamVotes, setAllTeamVotes] = useState<AnonymousVote[]>([]);

  const hasRole = useHasRole({
    teamId: teamId as string,
    userId: user?.uid,
    role: UserRole.MEMBER,
  });

  const fetchVotes = async () => {
    const firestore = getFirestore();
    const votesRef = collection(firestore, `teams/${teamId}/votes`);
    const votesSnapshot = await getDocs(votesRef);
    const votes: AnonymousVote[] = [];
    votesSnapshot.forEach((voteSnapshot) => {
      const data = voteSnapshot.data();
      const anonVote: AnonymousVote = {
        createdAt: data.createdAt.toDate(),
        sentiment: data.sentiment,
      } as AnonymousVote;
      votes.push(anonVote);
    });

    setAllTeamVotes(
      votes.sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime())
    );
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
      fetchVotes();
    }
  }, [teamId]);

  if (loading || hasRole === undefined) {
    return <LoadingSpinner text="Fetching Team reports" />;
  }

  if (!hasRole) {
    return <NotAuthorized text="no access to team reports" />;
  }

  return (
    <div>
      <TeamQuickActions teamName={data.name} />
      Your personal Reports... Work in Progress... coming soon :)
      <div className="container mx-auto text-black dark:text-white flex flex-row justify-between items-center">
        {error && <div>Error: {error.message}</div>}
        {data && !error && teamId && (
          <div className="grid grid-cols-4 gap-10 w-full mt-10">
            <div className="flex flex-col col-span-4 md:col-span-1 gap-4 justify-start p-10 bg-black/10 rounded-xl">
              <TotalMemberPerTeam teamId={teamId.toString()} />
              <TotalVotesPerTeam teamId={teamId.toString()} />
              {allTeamVotes && teamId && (
                <TeamMoodCircle
                  teamId={teamId.toString()}
                  votes={allTeamVotes}
                />
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyReports;
