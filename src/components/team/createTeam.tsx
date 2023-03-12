import { toast } from "react-toastify";
import { useFirestore } from "reactfire";
import { useState } from "react";
import { useUser } from "reactfire";
import { addDoc, collection } from "firebase/firestore";
import { useRouter } from "next/router";

const CreateTeam = () => {
  const firestore = useFirestore();
  const [name, setName] = useState("");
  const user = useUser().data?.uid;
  const router = useRouter();

  const createNewTeam = async () => {
    try {
      const newTeamData = {
        name,
        createdAt: new Date(),
        owners: user,
        members: user,
      };

      const teamRef = collection(firestore, "teams");
      const docRef = await addDoc(teamRef, newTeamData); // Add new team to Teams collection
      console.log("New team added:", newTeamData);

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
