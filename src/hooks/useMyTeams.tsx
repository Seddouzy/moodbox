import {
  collection,
  onSnapshot,
  query,
  where,
  getDocs,
  getDoc,
  doc,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { useFirestore, useUser } from "reactfire";

export const useMyTeams = () => {
  const [myTeams, setMyTeams] = useState<{ name: string; id: string }[]>([]);

  const firestore = useFirestore();
  const user = useUser();

  useEffect(() => {
    const fetchTeams = async () => {
      if (user.data?.uid) {
        const teamsRef = collection(firestore, "teams");
        const teamsQuery = query(
          teamsRef,
          where(`members.${user.data.uid}`, "!=", null)
        );

        console.log("why");
        getDocs(teamsQuery)
          .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              console.log(doc.id, " => ", doc.data());
            });
          })
          .catch((error) => {
            console.log("Error getting documents: ", error);
          });

        const unsubscribe = onSnapshot(
          teamsQuery,
          (querySnapshot) => {
            const teams: { id: string; name: string }[] = [];
            querySnapshot.forEach((doc) => {
              const data = doc.data();

              teams.push({ id: doc.id, name: data.name });
            });
            setMyTeams(teams);
          },
          (error) => {
            console.log("Error getting documents: ", error);
          }
        );

        return () => unsubscribe();
      }
    };

    fetchTeams();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return myTeams;
};
