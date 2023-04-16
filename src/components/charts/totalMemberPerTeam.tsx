import { collection, getDocs, getFirestore } from "firebase/firestore";
import { ComponentType, useEffect, useState } from "react";

interface TotalVotesPerTeamProps {
  teamId: string;
}

const TotalVotesPerTeam: ComponentType<TotalVotesPerTeamProps> = ({
  teamId,
}) => {
  const [numMembers, setNumMembers] = useState(0);

  useEffect(() => {
    if (teamId) {
      const getNumVotes = async () => {
        const firestore = getFirestore();
        const votesRef = collection(firestore, `teams/${teamId}/members`);
        const votesSnapshot = await getDocs(votesRef);
        const numMembers = votesSnapshot.size;
        setNumMembers(numMembers);
      };
      getNumVotes();
    }
  }, [teamId]);

  return (
    <div>
      <div className="flex flex-row text-xl items-center text-yellow-600 ml-3">
        TOTAL VOTES:
        <div className="flex flex-row text-xl items-center text-yellow-600 ml-3">
          {numMembers}
        </div>
      </div>
    </div>
  );
};

export default TotalVotesPerTeam;
