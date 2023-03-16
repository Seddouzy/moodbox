import { Popover } from "@headlessui/react";
import { ComponentType, ReactNode } from "react";

interface TeamDropdownProps {
  children: ReactNode;
}

const TeamDropdown: ComponentType<TeamDropdownProps> = ({ children }) => {
  return null;
  /*<Popover className="relative">
      <div>
        <h1>Teams</h1>
        <ul className="mt-4">
          {teams.map((team) => (
            <li
              key={team.id}
              className="px-3 py-2 rounded-lg hover:shadow:xl transition-all ease-in-out"
            >
              {team.name}
            </li>
          ))}
        </ul>
      </div>
    </Popover>
    */
};

export default TeamDropdown;
