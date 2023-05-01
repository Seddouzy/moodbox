import {
  collection,
  getDocs,
  Firestore,
  getDoc,
  doc,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { useFirestore, useUser } from "reactfire";
import { MoodTeam } from "../shared/interface/MoodTeam";

export const useMyVotes = () => {
  const [myTeams, setMyTeams] = useState<MoodTeam[]>([]);
  const [myVotes, setMyVotes] = useState("");

  const firestore = useFirestore();
  const user = useUser();

  useEffect(() => {
    const fetchVotes = async () => {
      if (user.data?.uid) {
        const votes = await getVotesUserIsMemberOf(user.data.uid, firestore);
        setMyVotes(user.data?.uid);
      }
    };

    fetchVotes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return myTeams;
};

const getVotesUserIsMemberOf = async (
  userId: string,
  firestore: Firestore
): Promise<MoodTeam[]> => {
  const teamsRef = collection(firestore, "teams");
  const teamSnapshots = await getDocs(teamsRef);
  const teams = [];

  for (const teamDoc of teamSnapshots.docs) {
    const teamId = teamDoc.id;
    const memberDocRef = doc(firestore, `teams/${teamId}/members/${userId}`);
    const memberDocSnapshot = await getDoc(memberDocRef);

    if (memberDocSnapshot.exists()) {
      const teamData = teamDoc.data();
      teamData.id = teamId; // Include the team ID in the team data
      teams.push(teamData);
    }
  }

  return teams as MoodTeam[];
};
