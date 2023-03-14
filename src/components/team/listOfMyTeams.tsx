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
  const [teams, setTeams] = useState<any[]>([]);
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
      <ul className="mt-4">
        {teams.map((team) => (
          <li
            key={team.id}
            className="px-3 py-2 rounded-lg hover:shadow:xl transition-all ease-in-out"
          >
            {team.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListOfMyTeams;
