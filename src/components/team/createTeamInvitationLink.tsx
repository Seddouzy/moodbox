import { ComponentType } from "react";
import { useFirestore } from "reactfire";
import { doc, onSnapshot } from "firebase/firestore";
import { useState, useEffect } from "react";

interface CreateTeamInvitationLinkProps {
  teamId: string;
  teamData: any; // TODO: Create Team Interface
  updateTeam: (data: Record<string, any>) => void;
}

const CreateTeamInvitationLink: ComponentType<
  CreateTeamInvitationLinkProps
> = ({ teamId, teamData, updateTeam }) => {
  const [invitationLink, setInvitationLink] = useState();

  const createTeamInvitationLink = () => {
    const uuid = "someMangoStuff";
    const invitationLink = `${window.location.host}?teamId=${teamId}&token=${uuid}`;
    updateTeam({ invitationLink });
  };

  return (
    <div className="rounded-xl bg-slate-800 text-white p-8">
      <h2>Generate a Team Invitation Link</h2>
      <input type="TeamName" />
      <button
        className="rounded-xl bg-slate-700 hover:bg-slate-600 text-white p-1"
        onClick={() => createTeamInvitationLink()}
      >
        Generate
      </button>
      {teamData?.invitationLink && <div>{teamData.invitationLink}</div>}
    </div>
  );
};

export default CreateTeamInvitationLink;
