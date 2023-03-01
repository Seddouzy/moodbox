import { useAuth, useUser, useFunctions } from "reactfire";

import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { httpsCallable } from "firebase/functions";

export const useIsTeamMember = ({
  teamId,
  userId,
}: {
  teamId?: string;
  userId?: string;
}): boolean => {
  const functions = useFunctions();
  const { status, data: user } = useUser();
  const [userIsTeamMember, setUserIsTeamMember] = useState(false);

  const isMember = httpsCallable(functions, "isMember");
  useEffect(() => {
    if (user) {
      checkUserMembership();
    }
  }, [user]);

  const checkUserMembership = () => {
    if (!userId || !teamId) {
      setUserIsTeamMember(false);
    }
    isMember({ userId, teamId })
      .then((res) => setUserIsTeamMember((res.data as any).state))
      .catch((err) => {
        console.error(err);
        setUserIsTeamMember(false);
      });
  };

  return userIsTeamMember;
};
