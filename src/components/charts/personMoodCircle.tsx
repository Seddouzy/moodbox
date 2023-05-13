import { AnonymousVote } from "@/shared/interface/AnonymousVote";
import { pickFromGradient } from "@/shared/services/colorService";
import {
  HeartIcon,
  UserGroupIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import {
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import { ComponentType, useEffect, useState } from "react";

interface PersonMoodCircleProps {
  teamId: string;
  votes: AnonymousVote[];
  userId: string;
}

const PersonMoodCircle: ComponentType<PersonMoodCircleProps> = ({
  teamId,
  votes,
  userId,
}) => {
  const [numAvgVotes, setNumAvgVotes] = useState(0);
  const [moodColor, setMoodColor] = useState(`gold`);

  useEffect(() => {
    if (teamId && votes && userId) {
      const getNumAvgVotes = async () => {
        const firestore = getFirestore();
        const votesRef = collection(firestore, `teams/${teamId}/votes`);
        const userVotesQuery = query(votesRef, where("userId", "==", userId));
        const votesSnapshot = await getDocs(userVotesQuery);
        const userVotes = votesSnapshot.docs.map((doc) => doc.data());
        const totalSentiment = userVotes.reduce(
          (sum, voteDoc) =>
            sum +
            (typeof voteDoc.sentiment === "number" ? voteDoc.sentiment : 0),
          0
        );
        const rating =
          userVotes.length > 0 ? totalSentiment / userVotes.length : 0;
        setNumAvgVotes(rating);
        setMoodColor(pickFromGradient(rating));
      };
      getNumAvgVotes();
    }
  }, [teamId, userId]);

  return (
    <div>
      <div
        style={{
          backgroundColor: moodColor,
        }}
        className="text-black/50 flex flex-row gap-2 items-center outline outline-2 outline-offset-4 outline-transparent bg-gradient-to-br px-4 py-2 rounded-lg uppercase"
      >
        <UserIcon className="w-6 h-6" />
        <HeartIcon className="w-6 h-6" />
        {Math.round(numAvgVotes * 100) / 100}
      </div>
    </div>
  );
};

export default PersonMoodCircle;
