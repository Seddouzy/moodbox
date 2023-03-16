import { ComponentType } from "react";
import TeamDropdown from "./teamDropdown";

interface UserAvatarProps {}

const teamButton: ComponentType<UserAvatarProps> = () => {
  function showTeams(): void {
    throw new Error("Function not implemented.");
  }

  return (
    <TeamDropdown>
      <div className="relative rounded-full bg-yellow-500 h-12 w-12 flex flex-row justify-center items-center overflow-hidden">
      </div>
    </TeamDropdown>
  ) : (
    <button
      className="rounded-full p-2 bg-emerald-300 w-12 h-12 flex flex-row justify-center items-center"
      onClick={() => showTeams()}
    ></button>
  );
};
