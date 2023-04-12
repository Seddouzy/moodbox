import { ComponentType } from "react";
import { useFirestore } from "reactfire";
import { doc, onSnapshot } from "firebase/firestore";
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import CopyButton from "@/components/copyClipboardButton";

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
    <div className="rounded-xl bg-slate-100 dark:bg-slate-800 dark:text-white p-4 sm:p-8">
      <h2 className="text-lg">Generate a Team Invitation Link</h2>
      <button className="btn mt-2 px-3 py-2 text-sm sm:text-base" onClick={createTeamInvitationLink}>
        Generate
      </button>
        {invitationLink && (
          <div className="mt-2 px-3 py-2 text-sm sm:text-base">{invitationLink}</div>
        )}
        {invitationLink && <CopyButton text={invitationLink} />}
    </div>
  );
};

export default CreateTeamInvitationLink;
