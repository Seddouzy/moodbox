import { useState, useEffect } from "react";
import { useUser } from "reactfire";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";

const ListOfMyTeams = () => {
  const [teams, setTeams] = useState([]);
  const userId = useUser().data?.uid;

  useEffect(() => {
    const fetchTeams = async () => {
      const db = getFirestore();
      const teamsRef = collection(db, "teams");
      const q = query(teamsRef, where("members", "array-contains", userId));
      const querySnapshot = await getDocs(q);
      const teams = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTeams(teams);
    };

    fetchTeams();
  }, [userId]);

  return (
    <div>
      <h1>Teams</h1>
      <ul>
        {teams.map((team) => (
          <li key={team.id}>{team.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default ListOfMyTeams;
