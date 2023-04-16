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

        const numAvgVotes =
          votesSnapshot.size > 0 ? totalSentiment / votesSnapshot.size : 0;
        setNumAvgVotes(numAvgVotes);

        if (numAvgVotes >= 0.9 && numAvgVotes <= 1.0) {
          setMoodColor(`emerald`);
        } else if (numAvgVotes >= 0.4 && numAvgVotes < 0.7) {
          setMoodColor(`amber`);
        } else if (numAvgVotes >= 0.1 && numAvgVotes < 0.4) {
          setMoodColor(`pink`);
        }
      };
      getNumVotes();
    }
  }, [teamId]);

  return (
    <div>
      <div
        className={`flex flex-row gap-2 items-center outline outline-2 outline-offset-4 outline-transparent hover:outline-${moodColor}-400 from-${moodColor}-300 to-${moodColor}-500 bg-gradient-to-br text-${moodColor}-900 px-4 py-2 rounded-lg uppercase`}
      >
        <UserGroupIcon className="w-6 h-6" />
        <HeartIcon className="w-6 h-6" />
        {numAvgVotes}
      </div>
    </div>
  );
};

export default TeamMoodCircle;
