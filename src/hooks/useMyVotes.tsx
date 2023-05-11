import { useState, useEffect } from "react";
import { getDocs, collection, where, query } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";

const db = getFirestore();

type Vote = {
  id: string;
  createdAt: Date;
  userId: string;
  sentiment: number;
};

const useMyVotes = (teamId: string, userId: string) => {
  const [votes, setVotes] = useState<Vote[]>([]);

  useEffect(() => {
    const getVotes = async () => {
      try {
        const teamVotesRef = collection(db, "teams", teamId, "votes");
        const userVotesQuery = query(
          teamVotesRef,
          where("userId", "==", userId)
        );
        const userVotesSnapshot = await getDocs(userVotesQuery);
        const newVotes = userVotesSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Vote[];
        setVotes(newVotes);
      } catch (error) {
        console.error("Error fetching user votes:", error);
      }
    };

    getVotes();

    // unsubscribe when component unmounts
    return () => {};
  }, [teamId, userId]);

  return votes;
};

export default useMyVotes;
