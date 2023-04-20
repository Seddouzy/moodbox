import { pickFromGradient } from "@/shared/services/colorService";
import { HeartIcon, UserGroupIcon } from "@heroicons/react/24/outline";
import UserIcon from "@heroicons/react/24/outline/UserIcon";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import { ComponentType, useEffect, useState } from "react";

interface TeamMoodCircleProps {
  teamId: string;
}

const TeamMoodCircle: ComponentType<TeamMoodCircleProps> = ({ teamId }) => {
  const [numAvgVotes, setNumAvgVotes] = useState(0);
  const [moodColor, setMoodColor] = useState(`gold`);

  useEffect(() => {
    if (teamId) {
      const getNumVotes = async () => {
        const firestore = getFirestore();
        const votesRef = collection(firestore, `teams/${teamId}/votes`);
        const votesSnapshot = await getDocs(votesRef);

        let totalSentiment = 0;
        votesSnapshot.forEach((voteDoc) => {
          const sentiment = voteDoc.data().sentiment;
          if (typeof sentiment === "number") {
            totalSentiment += sentiment;
          }
        });

        const rating =
          votesSnapshot.size > 0 ? totalSentiment / votesSnapshot.size : 0;
        setNumAvgVotes(rating);
        setMoodColor(pickFromGradient(rating));
      };
      getNumVotes();
    }
  }, [teamId]);

  return (
    <div>
      <div
        style={{
          backgroundColor: moodColor,
        }}
        className="text-black/50 flex flex-row gap-2 items-center outline outline-2 outline-offset-4 outline-transparent bg-gradient-to-br px-4 py-2 rounded-lg uppercase"
      >
        <UserGroupIcon className="w-6 h-6" />
        <HeartIcon className="w-6 h-6" />
        {Math.round(numAvgVotes * 100) / 100}
      </div>
    </div>
  );
};

export default TeamMoodCircle;
