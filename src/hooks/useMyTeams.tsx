import {
  collection,
  onSnapshot,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { useFirestore, useUser } from "reactfire";

export const useMyTeams = () => {
  const [myTeams, setMyTeams] = useState([]);

  const firestore = useFirestore();
  const user = useUser();

  useEffect(() => {
    if (user.data?.uid) {
      const teamsRef = collection(firestore, "teams");
      const teamsQuery = query(
        teamsRef,
        where(`members.${user.data.uid}`, "==", true)
      );
      const unsubscribe = onSnapshot(teamsQuery, (querySnapshot) => {
        const teams: any = [];
        querySnapshot.forEach((doc) => {
          teams.push({ id: doc.id, ...doc.data() });
        });
        setMyTeams(teams);
      });
      return () => unsubscribe();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return myTeams;
};
