import { AnonymousVote } from "@/shared/interface/AnonymousVote";
import {
  HandThumbDownIcon,
  HandThumbUpIcon,
} from "@heroicons/react/24/outline";
import { addDoc, collection, doc, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";
import { useFirestore, useFirestoreDoc, useFirestoreDocData } from "reactfire";
import { VoteButton } from "./voteButton";

const VoteMood = () => {
  const firestore = useFirestore();
  const teamCollection = collection(firestore, "BDA"); // TODO: Dynamically listen to collection according to current selected Team

  /*
    const teamVotesQuery = query(teamCollection, orderBy('commonName', isAscending ? 'asc' : 'desc'));
    const { status, data: teamVotes } = useFirestoreCollectionData(teamVotesQuery, {
      idField: 'id',
    });
    */

  const voteSentiment = async (sentiment: number) => {
    await toast.promise(
      addDoc(teamCollection, {
        createdAt: new Date(),
        sentiment,
      } as AnonymousVote),
      {
        pending: "We're setting your vote",
        success: "Vote sent 👌",
        error: {
          render({ data }) {
            return `${data} 🤯`;
          },
        },
      }
    );
  };

  return (
    <div className="p-8 flex flex-row item-center gap-4">
      <VoteButton
        customClasses={["bg-red-300", "text-red-700"]}
        sentiment={2}
        vote={voteSentiment}
        icon={<HandThumbDownIcon className="h-6 w-6" />}
      />
      <VoteButton
        sentiment={1}
        vote={voteSentiment}
        icon={<HandThumbUpIcon className="h-6 w-6" />}
      />
    </div>
  );
};

export default VoteMood;
