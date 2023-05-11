import { ChartBarIcon } from "@heroicons/react/24/outline";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import { ComponentType, useEffect, useState } from "react";

interface TotalVotesPerPersonProps {
  teamId: string;
  userId: string;
}

const TotalVotesPerPerson: ComponentType<TotalVotesPerPersonProps> = ({
  teamId,
  userId,
}) => {
  const [numVotes, setNumVotes] = useState(0);

  useEffect(() => {
    if (teamId && userId) {
      const getNumVotes = async () => {
        const firestore = getFirestore();
        const votesRef = collection(firestore, `teams/${teamId}/votes`);
        const votesSnapshot = await getDocs(votesRef);
        const filteredVotes = votesSnapshot.docs.filter(
          (doc) => doc.data().user_id === userId
        );
        const numVotes = filteredVotes.length;
        setNumVotes(numVotes);
      };
      getNumVotes();
    }
  }, [teamId, userId]);

  return (
    <div>
      <div className="flex flex-row gap-2 items-center outline outline-2 outline-offset-4 outline-transparent hover:outline-cyan-400 transition-all ease-in-out from-cyan-300 to-cyan-500 text-cyan-900 bg-gradient-to-br px-4 py-2 rounded-lg uppercase disabled:opacity-70">
        <ChartBarIcon className="w-6 h-6" />
        <div className="font-bold">{numVotes}</div>
      </div>
    </div>
  );
};

export default TotalVotesPerPerson;
