import { AnonymousVote } from "@/shared/interface/AnonymousVote";
import {
  HandThumbDownIcon,
  HandThumbUpIcon,
} from "@heroicons/react/24/outline";
import { addDoc, collection, doc, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";
import {
  useFirestore,
  useFirestoreDoc,
  useFirestoreDocData,
  useFunctions,
} from "reactfire";
import { VoteButton } from "./voteButton";
import { ComponentType } from "react";
import { httpsCallable } from "@firebase/functions";

interface VoteMoodProps {
  teamId: string;
}

const VoteMood: ComponentType<VoteMoodProps> = ({ teamId }) => {
  const firestore = useFirestore();
  const teamCollection = collection(firestore, "teams", teamId, "votes");
  const functions = useFunctions();

  const vote = httpsCallable(functions, "vote");

  /*
    const teamVotesQuery = query(teamCollection, orderBy('commonName', isAscending ? 'asc' : 'desc'));
    const { status, data: teamVotes } = useFirestoreCollectionData(teamVotesQuery, {
      idField: 'id',
    });
    */

  const voteSentiment = async (sentiment: number) => {
    try {
      await vote({ teamId, sentiment });
      toast.success("Vote sent 👌");
    } catch (error: any) {
      if (
        error.message ===
        "User is not allowed to vote! Already voted in last 24 hours."
      ) {
        toast.error("You have already voted in the last 24 hours 🕛");
      } else {
        console.error(error);
        toast.error("An error occurred while submitting your vote 🤯");
      }
    }
  };

  return (
    <>
      <h2 className="text-2xl text-center">What&apos;s your mood today?</h2>
      <div className="p-8 flex flex-row item-center justify-center h-36">
        <VoteButton
          customClasses={[
            "bg-gradient-to-l from-red-300 to-red-400",
            "text-red-700",
            "hover:flex-1",
            "justify-start",
            "rounded-r-none",
            "duration-500",
          ]}
          sentiment={2}
          vote={voteSentiment}
          icon={<HandThumbDownIcon className="h-6 w-6" />}
        />
        <VoteButton
          customClasses={[
            "bg-gradient-to-r from-emerald-300 to-emerald-400",
            "text-emerald-700",
            "hover:flex-1",
            "justify-end",
            "rounded-l-none",
            "duration-500",
          ]}
          sentiment={1}
          vote={voteSentiment}
          icon={<HandThumbUpIcon className="h-6 w-6" />}
        />
      </div>
    </>
  );
};

export default VoteMood;
