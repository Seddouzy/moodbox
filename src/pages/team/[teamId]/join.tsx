import { ComponentType, useState } from "react";
import { useRouter } from "next/router";
import { useUser } from "reactfire";
import { useIsTeamMember } from "@/hooks/useIsTeamMember";
import JoinTeamButton from "@/components/team/joinTeamButton";

const JoinTeam: ComponentType = () => {
  const router = useRouter();
  const { tokenId, teamId } = router.query;
  const [joinStatus, setJoinStatus] = useState("loading");
  const { status, data: user } = useUser();

  const isMember = useIsTeamMember({
    teamId: teamId as string,
    userId: user?.uid,
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
