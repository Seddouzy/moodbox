import { ComponentType, useState } from "react";
import { useRouter } from "next/router";
import JoinTeamButton from "@/components/team/joinTeamButton";

const JoinTeam: ComponentType = () => {
  const router = useRouter();
  const { tokenId, teamId } = router.query;
  const [joinStatus, setJoinStatus] = useState("loading");

  return (
    <div className="container">
      <JoinTeamButton
        teamId={teamId?.toString() ?? ""}
        tokenId={tokenId?.toString() ?? ""}
      />
    </div>
  );
};

export default JoinTeam;
