import LoadingSpinner from "@/components/general/loadingSpinner";
import NotAuthorized from "@/components/general/notAuthorized";
import { useRouter } from "next/router";
import { useFirestore, useUser } from "reactfire";
import { useEffect, useState } from "react";
import { useHasRole } from "@/hooks/useHasRole";
import UserRole from "@/shared/enum/userRole.enum";
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
import { AnonymousVote } from "@/shared/interface/AnonymousVote";
import TotalVotesPerPerson from "@/components/charts/totalVotesPerPerson";
import PersonMoodCircle from "@/components/charts/personMoodCircle";
import PersonSentimentByDay from "@/components/charts/personSentimentByDay";

const MyReports: NextPage = () => {
  const router = useRouter();
  const { teamId } = router.query;
  const firestore = useFirestore();
  const [error, setError] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<any>(null);
  const userData = useUser();
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
    const userVotes: AnonymousVote[] = [];
    votesSnapshot.forEach((voteSnapshot) => {
      const data = voteSnapshot.data();
      const anonVote: AnonymousVote = {
        createdAt: data.createdAt.toDate(),
        sentiment: data.sentiment,
        userId: data.userId,
      } as AnonymousVote;
      votes.push(anonVote);

      if (anonVote.userId === user?.uid) {
        userVotes.push(anonVote);
      }
    });

    setAllTeamVotes(
      userVotes.sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime())
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
      <div className="container mx-auto text-black dark:text-white flex flex-row justify-between items-center">
        {error && <div>Error: {error.message}</div>}
        {data && !error && teamId && (
          <div className="grid grid-cols-4 gap-10 w-full mt-10">
            <div className="flex flex-col col-span-4 md:col-span-1 gap-4 justify-start p-10 bg-black/10 rounded-xl">
              <div className="relative rounded-full bg-yellow-500 h-12 w-12 flex flex-row justify-center items-center overflow-hidden">
                <div
                  className="absolute top-0 left-0 w-full h-full bg-cover"
                  style={{
                    backgroundImage: `url("${userData.data?.photoURL}")`,
                  }}
                />
              </div>
              <TotalMemberPerTeam teamId={teamId.toString()} />
              <TotalVotesPerPerson
                teamId={teamId?.toString()}
                userId={user?.uid?.toString() ?? ""}
              />
              {allTeamVotes && teamId && (
                <PersonMoodCircle
                  teamId={teamId.toString()}
                  votes={allTeamVotes}
                  userId={user?.uid?.toString() ?? ""}
                />
              )}
            </div>
            <div className="flex flex-col col-span-4 md:col-span-3 gap-10 justify-center items-center p-10 bg-black/10 rounded-xl">
              {allTeamVotes && (
                <PersonSentimentByDay
                  sentiments={allTeamVotes.map((v) => ({
                    date: v.createdAt,
                    sentimentAvg: v.sentiment,
                  }))}
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
