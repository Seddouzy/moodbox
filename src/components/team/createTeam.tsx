import { toast } from "react-toastify";
import { useFirestore } from "reactfire";
import { useState } from "react";
import { useUser } from "reactfire";
import { addDoc, setDoc, collection, doc } from "firebase/firestore";
import { useRouter } from "next/router";
import UserRole from "@/shared/enum/userRole.enum";

const CreateTeam = () => {
  const firestore = useFirestore();
  const [name, setName] = useState("");
  const user = useUser().data;
  const router = useRouter();

  const createNewTeam = async () => {
    try {
      const newTeamData = {
        name,
        createdAt: new Date(),
      };
      const newMemberRef = {
        role: UserRole.OWNER,
        userEmail: user?.email,
        displayName: user?.displayName,
        userPhoto: user?.photoURL,
        userId: user?.uid,
      };

      const teamRef = collection(firestore, "teams");
      const docRef = await addDoc(teamRef, newTeamData); // Add new team to Teams collection TODO: add members into a members sub collection
      console.log("New team added:", newTeamData);
      const memberRef = doc(collection(docRef, "members"), user?.uid);
      const memberDocRef = await setDoc(memberRef, newMemberRef);

      // Show success toast message
      toast.success("Team created 👌");
      router.push(`/team/${docRef.id}`);
    } catch (error) {
      console.error("Error creating team: 🤯", error);

      // Show error toast message
      toast.error("Error creating team. Please try again. 🤯");
    }
  };

  return (
    <div className="">
      <label className="rounded-md text-black dark:text-white">
        Your future Team Name:
        <input
          type="text"
          className="mt-2 px-3 py-2 dark:bg-black bg-white  border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      <button className="btn mt-2" onClick={createNewTeam}>
        Create Team
      </button>
    </div>
  );
};

export default CreateTeam;
