import { AnonymousVote } from "@/shared/interface/AnonymousVote";
import { pickFromGradient } from "@/shared/services/colorService";
import { HeartIcon, UserGroupIcon } from "@heroicons/react/24/outline";
import { ComponentType, useEffect, useState } from "react";

interface TeamMoodCircleProps {
  teamId: string;
  votes: AnonymousVote[];
}

const TeamMoodCircle: ComponentType<TeamMoodCircleProps> = ({
  teamId,
  votes,
}) => {
  const [numAvgVotes, setNumAvgVotes] = useState(0);
  const [moodColor, setMoodColor] = useState(`gold`);

  useEffect(() => {
    if (teamId && votes) {
      let totalSentiment = 0;
      votes.forEach((voteDoc) => {
        const sentiment = voteDoc.sentiment;
        if (typeof sentiment === "number") {
          totalSentiment += sentiment;
        }
      });

      const rating = votes.length > 0 ? totalSentiment / votes.length : 0;
      setNumAvgVotes(rating);
      setMoodColor(pickFromGradient(rating));
    }
  }, [votes, teamId]);

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
