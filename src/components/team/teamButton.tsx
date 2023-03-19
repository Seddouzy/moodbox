import { useMyTeams } from "@/hooks/useMyTeams";
import { ComponentType, useState } from "react";
import TeamDropdown from "./teamDropdown";

interface UserAvatarProps {}

const TeamButton: ComponentType<UserAvatarProps> = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const myTeams = useMyTeams();

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="relative inline-block text-left">
      <button
        type="button"
        className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        id="menu-button"
        onClick={handleDropdownToggle}
      >
        Teams
        {/* Show count of teams next to Teams label */}
        {myTeams.length > 0 && (
          <span className="ml-2 bg-gray-100 px-2 py-0.5 rounded-full text-xs font-medium text-gray-500">
            {myTeams.length}
          </span>
        )}
      </button>
      {isDropdownOpen && <TeamDropdown teams={myTeams} />}
    </div>
  );
};

export default TeamButton;
