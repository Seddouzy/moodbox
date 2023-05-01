import { ChartBarIcon } from "@heroicons/react/24/outline";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import { useRouter } from "next/router";
import { ComponentType, useEffect, useState } from "react";

interface TotalVotesPerPersonProps {
  teamId: string;
  userId: string;
}

const TotalVotesPerPerson: ComponentType<TotalVotesPerPersonProps> = ({
  userId,
  teamId,
}) => {
  const router = useRouter();
  const [numVotes, setNumVotes] = useState();
  const [query, setQuery] = useState("");

  const filteredVotes = query === "";

  const handleTeamSelect = (teamId: string) => {
    if (router.asPath !== `/team/${teamId}`) {
      router.push(`/team/${teamId}`);
    }
  };

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
