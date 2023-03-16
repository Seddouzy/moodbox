import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { ComponentType } from "react";
import TeamDropdown from "./teamDropdown";

interface UserAvatarProps {}

const TeamButton: ComponentType<UserAvatarProps> = () => {
  function showTeams(): void {
    throw new Error("Function not implemented.");
  }

  return null;
  /* return TeamButton.data ? (
    <TeamDropdown>
      <div className="relative rounded-md h-12 w-12 ">Teams</div>
    </TeamDropdown>
  ) : (
    <button className="btn" onClick={() => showTeams()}>
      Teams
      <ChevronDownIcon className="flex flex-row p-0.5 h-6 w-6 items-center justify-center" />
    </button>
  );
  */
};

export default TeamButton;
