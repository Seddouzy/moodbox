import UserIcon from "@heroicons/react/24/outline/UserIcon";
import {
  collection,
  doc,
  getDocs,
  getFirestore,
  onSnapshot,
  query,
} from "firebase/firestore";
import { useState, useEffect, ComponentType } from "react";
import { useFirestore, useUser } from "reactfire";

interface TeamMemberListProps {
  teamId: string;
}

const TeamMemberList: ComponentType<TeamMemberListProps> = ({ teamId }) => {
  const [team, setTeam] = useState(null);
  const user = useUser();

  const [members, setMembers] = useState<{ id: string }[]>([]);

  useEffect(() => {
    const firestore = getFirestore();
    const membersRef = collection(firestore, `teams/${teamId}/members`);

    const unsubscribe = onSnapshot(membersRef, (querySnapshot: any) => {
      const data: { id: string }[] = [];
      querySnapshot.forEach((doc: any) => {
        data.push({ id: doc.id, ...doc.data() });
      });
      setMembers(data);
    });

    return unsubscribe;
  }, [teamId]);

  return (
    <div className="flex flex-col">
      {members.map((member: any) => (
        <div
          key={member.id}
          className="flex flex-row items-center justify-between border-b p-4"
        >
          <div className="relative rounded-full bg-yellow-500 h-12 w-12 flex flex-row justify-center items-center overflow-hidden">
            {member.data?.pircture ? (
              <div
                className="absolute top-0 left-0 w-full h-full bg-cover"
                style={{
                  backgroundImage: `url("${member.data.picture}")`,
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
};

export default TeamMemberList;
