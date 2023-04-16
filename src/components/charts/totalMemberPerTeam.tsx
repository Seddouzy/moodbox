import { UserGroupIcon } from "@heroicons/react/24/outline";
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
      const getMemberCount = async () => {
        const firestore = getFirestore();
        const memberRef = collection(firestore, `teams/${teamId}/members`);
        const memberSnapshot = await getDocs(memberRef);
        const numMembers = memberSnapshot.size;
        setNumMembers(numMembers);
      };
      getMemberCount();
    }
  }, [teamId]);

  return (
    <div>
      <div className="flex flex-row gap-2 items-center outline outline-2 outline-offset-4 outline-transparent hover:outline-cyan-400 transition-all ease-in-out from-cyan-300 to-cyan-500 text-cyan-900 bg-gradient-to-br px-4 py-2 rounded-lg uppercase disabled:opacity-70">
        <UserGroupIcon className="w-6 h-6" />
        <div className="font-bold">{numMembers}</div>
      </div>
    </div>
  );
};

export default TotalVotesPerTeam;
