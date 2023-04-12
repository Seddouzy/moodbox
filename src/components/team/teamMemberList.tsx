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
    <div className="flex flex-col mp-4 rounded-xl bg-slate-100 dark:bg-slate-800 dark:text-white p-8 ">
      {members.map((member: any) => (
        <div key={member.id} className="flex flex-row md:flex-row p-4">
          <div className="relative rounded-full bg-yellow-500 h-12 w-12 flex flex-row justify-center items-center">
            {member.userPhoto ? (
              <div
                className="absolute top-0 left-0 w-full h-full bg-cover"
                style={{
                  backgroundImage: `url("${member.userPhoto.toString()}")`,
                }}
              />
            ) : (
              <UserIcon className="w-8 h-8 m-2" />
            )}
          </div>
          <div className="flex flex-row justify-center flex-wrap md:flex-nowrap">
            <div className="flex p-2">{member.userEmail}</div>
            <div className="flex p-2">{member.userId}</div>
            <div className="flex p-2">{member.role}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TeamMemberList;
