import { initializeApp } from "firebase/app";
import { addDoc, collection, doc, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";
import { useFirestore, useFirestoreDoc, useFirestoreDocData } from "reactfire";

const CreateTeam = () => {
  const firestore = useFirestore();
  const teamCollection = collection(firestore, "Teams");

  {
    /*const createTeam = async (teamname: string, user: string) => {
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
  };*/
  }
};
