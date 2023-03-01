import { ComponentType } from "react";
import { useFirestore } from "reactfire";
import { doc, onSnapshot } from "firebase/firestore";
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

interface CreateTeamInvitationLinkProps {
  teamId: string;
  tokenId: string;
  updateTeam: (data: Record<string, any>) => void;
}

const CreateTeamInvitationLink: ComponentType<
  CreateTeamInvitationLinkProps
> = ({ teamId, tokenId, updateTeam }) => {
  const baseInvitationLink = `${window.location.host}/team/${teamId}/join`;
  const [invitationLink, setInvitationLink] = useState(
    `${baseInvitationLink}?tokenId=${tokenId}`
  );

  const createTeamInvitationLink = () => {
    const tokenId = uuidv4();
    setInvitationLink(`${baseInvitationLink}?tokenId=${tokenId}`);
    updateTeam({ tokenId });
  };

  return (
    <div className="rounded-xl bg-slate-100 dark:bg-slate-800 dark:text-white p-8">
      <h2>Generate a Team Invitation Link</h2>
      <button className="btn" onClick={createTeamInvitationLink}>
        Generate
      </button>
      {tokenId && <div>{invitationLink}</div>}
    </div>
  );
};

export default CreateTeamInvitationLink;
