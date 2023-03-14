import { Popover } from "@headlessui/react";
import { ComponentType, ReactNode } from "react";

interface TeamDropdownProps {
  children: ReactNode;
}

const TeamDropdown: ComponentType<TeamDropdownProps> = ({ children }) => {
  return <Popover className="relative"></Popover>;
};

export default TeamDropdown;
