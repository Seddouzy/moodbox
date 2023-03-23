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
      <button className="btn" id="menu-button" onClick={handleDropdownToggle}>
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
