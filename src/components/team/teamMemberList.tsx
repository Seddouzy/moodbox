import UserIcon from "@heroicons/react/24/outline/UserIcon";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useState, useEffect, Key } from "react";
import { useFirestore } from "reactfire";

function TeamMemberList(teamId: unknown) {
  const [team, setTeam] = useState(null);
  const firestore = useFirestore();

  const [members, setMembers] = useState([]);

  useEffect(() => {
    const teamMembersRef = collection(firestore, "teams", teamId, "members");
    const membersQuery = query(teamMembersRef);

    getDocs(membersQuery)
      .then((querySnapshot) => {
        const membersData = querySnapshot.docs.map((doc) => doc.data());
        setMembers(membersData);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [teamId]);

  if (!team) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col">
      {members.map((member) => (
        <div
          key={member.id}
          className="flex flex-row items-center justify-between border-b p-4"
        >
          <div className="relative rounded-full bg-yellow-500 h-12 w-12 flex flex-row justify-center items-center overflow-hidden">
            {member.data.photoURL ? (
              <div
                className="absolute top-0 left-0 w-full h-full bg-cover"
                style={{
                  backgroundImage: `url("${member.data.photoURL}")`,
                }}
              />
            ) : (
              <UserIcon className="w-8 h-8 m-2" />
            )}
          </div>
          <div>{member.name}</div>
          <div>{member.role}</div>
        </div>
      ))}
    </div>
  );
}

export default TeamMemberList;
