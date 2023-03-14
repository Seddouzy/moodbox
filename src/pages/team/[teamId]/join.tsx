import { ComponentType, useState } from "react";
import { useRouter } from "next/router";
import { useUser } from "reactfire";
import { useHasRole } from "@/hooks/useHasRole";
import JoinTeamButton from "@/components/team/joinTeamButton";
import UserRole from "@/shared/enum/userRole.enum";

const JoinTeam: ComponentType = () => {
  const router = useRouter();
  const { tokenId, teamId } = router.query;
  const [joinStatus, setJoinStatus] = useState("loading");
  const { status, data: user } = useUser();

  const isMember = useHasRole({
    teamId: teamId as string,
    userId: user?.uid,
    role: UserRole.MEMBER,
  });

  return (
    <div className="container">
      <JoinTeamButton
        teamId={teamId?.toString() ?? ""}
        tokenId={tokenId?.toString() ?? ""}
        userIsTeamMember={isMember}
      />
    </div>
  );
};

export default JoinTeam;
