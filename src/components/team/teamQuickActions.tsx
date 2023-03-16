import { ComponentType } from "react";

interface TeamQuickActionsProps {
  teamName: string;
}

const TeamQuickActions: ComponentType<TeamQuickActionsProps> = ({
  teamName,
}) => {
  return (
    <div className="flex flex-row gap-2 justify-start items-center">
      <div className="text-xl">{teamName}</div>
      <span className="flex-1"></span>
      <button></button>
    </div>
  );
};

export default TeamQuickActions;
