import { useAuth, useUser, useFunctions } from "reactfire";

import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { httpsCallable } from "firebase/functions";
import UserRole from "@/shared/enum/userRole.enum";

export const useHasRole = ({
  teamId,
  userId,
  role,
}: {
  teamId?: string;
  userId?: string;
  role?: UserRole;
}): boolean | undefined => {
  const functions = useFunctions();
  const { status, data: user } = useUser();
  const [userHasRole, setUserHasRole] = useState<undefined | boolean>(
    undefined
  );

  const hasRole = httpsCallable(functions, "hasRole");
  useEffect(() => {
    if (user) {
      checkUserMembership();
    }
  }, [user]);

  const checkUserMembership = () => {
    if (!userId || !teamId) {
      setUserHasRole(false);
    }
    hasRole({ userId, teamId, role })
      .then((res) => setUserHasRole((res.data as any).state))
      .catch((err) => {
        console.error(err);
        setUserHasRole(false);
      });
  };

  return userHasRole;
};
