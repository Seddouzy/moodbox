import { toast } from "react-toastify";
import { useFirestore } from "reactfire";
import { useState } from "react";
import { useUser } from "reactfire";
import { addDoc, collection } from "firebase/firestore";
import { useRouter } from "next/router";

const CreateTeam = () => {
  const firestore = useFirestore();
  const [name, setName] = useState("");
  const user = useUser().data?.email?.toString();
  const router = useRouter();

  const createNewTeam = async () => {
    try {
      const newTeamData = {
        name,
        createdAt: new Date(),
        owners: user,
      };

      const teamRef = collection(firestore, "Teams");
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
    <div>
      <label>
        Team Name:
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      <button onClick={createNewTeam}>Create Team</button>
    </div>
  );
};

export default CreateTeam;
